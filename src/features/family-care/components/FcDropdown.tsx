import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  ListRenderItemInfo,
  LayoutRectangle,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FcDropdownProps {
  options: string[];
  value: string | null;
  onChange: (val: string) => void;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FcDropdown: React.FC<FcDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  hasError = false,
  errorMessage,
}) => {
  const { borderRadius } = useTheme();
  const triggerRef = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<
    (LayoutRectangle & { pageX: number; pageY: number }) | null
  >(null);

  const openDropdown = useCallback(() => {
    triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setTriggerLayout({ x, y, width, height, pageX, pageY });
      setIsOpen(true);
    });
  }, []);

  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const handleSelect = useCallback(
    (opt: string) => {
      onChange(opt);
      closeDropdown();
    },
    [onChange, closeDropdown],
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.option,
          item === value && styles.optionSelected,
          index === options.length - 1 && styles.optionLast,
        ]}
        onPress={() => handleSelect(item)}
      >
        <AppText
          variant="caption"
          weight={item === value ? 'semiBold' : 'regular'}
          style={[styles.optionText, item === value && styles.optionTextSelected]}
        >
          {item}
        </AppText>
        {item === value && <View style={styles.checkDot} />}
      </TouchableOpacity>
    ),
    [value, options.length, handleSelect],
  );

  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <View style={styles.container}>
      {/* ── Trigger ─────────────────────────────────────────────────────── */}
      <View ref={triggerRef} collapsable={false}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openDropdown}
          style={[
            styles.trigger,
            hasError && styles.triggerError,
            isOpen && styles.triggerOpen,
          ]}
        >
          <AppText
            variant="caption"
            weight="regular"
            style={[styles.triggerText, value != null && styles.triggerTextSelected]}
          >
            {value ?? placeholder}
          </AppText>
          <ChevronDown
            size={normalize(16)}
            color={isOpen ? colors.lightAppTheme[700] : colors.typographyColor.Medium}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      {/* ── Error ───────────────────────────────────────────────────────── */}
      {hasError && errorMessage ? (
        <AppText variant="caption" weight="regular" style={styles.errorText}>
          {errorMessage}
        </AppText>
      ) : null}

      {/* ── Overlay Modal ───────────────────────────────────────────────── */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {triggerLayout ? (
          <View
            style={[
              styles.list,
              {
                top: triggerLayout.pageY + triggerLayout.height + normalize(4),
                left: triggerLayout.pageX,
                width: triggerLayout.width,
                borderRadius: borderRadius.l,
              },
            ]}
            pointerEvents="box-none"
          >
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={styles.flatList}
            />
          </View>
        ) : null}
      </Modal>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(12),
  },
  // Trigger
  trigger: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.appThemeColor[200],
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(14),
    fontSize: normalize(13),
    color: colors.appThemeColor[900],
    borderRadius: normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  triggerOpen: {
    borderColor: colors.lightAppTheme[700],
  },
  triggerError: {
    borderColor: '#FF3B30',
  },
  triggerText: {
    flex: 1,
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
  },
  triggerTextSelected: {
    color: colors.appThemeColor[900],
    fontFamily: 'Manrope-SemiBold',
  },
  // Error
  errorText: {
    color: '#FF3B30',
    fontSize: normalize(11),
    marginTop: normalize(4),
    marginLeft: normalize(4),
  },
  // Modal
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  list: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    maxHeight: normalize(220),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  flatList: {
    flexGrow: 0,
  },
  option: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(13),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.appThemeColor[50],
  },
  optionLast: {
    borderBottomWidth: 0,
  },
  optionSelected: {
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  optionText: {
    color: colors.appThemeColor[800],
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
    flex: 1,
  },
  optionTextSelected: {
    color: colors.lightAppTheme[900],
    fontFamily: 'Manrope-SemiBold',
  },
  checkDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.lightAppTheme[700],
  },
});
