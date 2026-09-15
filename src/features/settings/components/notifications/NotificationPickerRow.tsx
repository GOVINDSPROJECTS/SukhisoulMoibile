import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { ChevronRight, Check, X } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

interface NotificationPickerRowProps {
  title: string;
  subtitle?: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}

export const NotificationPickerRow: React.FC<NotificationPickerRowProps> = ({
  title,
  subtitle,
  value,
  options,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectOption = (opt: string) => {
    console.log(`[Notification Settings] ${title} changed to: ${opt}`);
    onSelect(opt);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.textCol}>
          <AppText
            weight="bold"
            family="primary"
            style={styles.title}
            color={colors.typographyColor.Medium || '#1E293B'}
          >
            {title}
          </AppText>
          {subtitle ? (
            <AppText
              weight="regular"
              family="secondary"
              style={styles.subtitle}
              color={colors.typographyColor.Light || '#64748B'}
            >
              {subtitle}
            </AppText>
          ) : null}
        </View>

        {/* Selected Value with Chevron */}
        <View style={styles.valueWrapper}>
          <AppText
            weight="bold"
            family="primary"
            style={styles.valueText}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
            numberOfLines={2}
          >
            {value}
          </AppText>
          <ChevronRight
            size={normalize(16)}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
            strokeWidth={2}
          />
        </View>
      </TouchableOpacity>

      {/* ── Dropdown Modal ────────────────────────────────────────────── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.sheetContainer}>
          <View style={styles.sheetHeader}>
            <AppText weight="bold" family="primary" style={styles.sheetTitle}>
              {title}
            </AppText>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={normalize(20)} color={colors.typographyColor.Dark || '#1E293B'} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: normalize(280) }} showsVerticalScrollIndicator={false}>
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionItem, isSelected && styles.optionItemActive]}
                  onPress={() => handleSelectOption(option)}
                  activeOpacity={0.7}
                >
                  <AppText
                    weight={isSelected ? 'bold' : 'regular'}
                    family="primary"
                    style={[
                      styles.optionText,
                      isSelected && { color: colors.typographyColor['Dark 2'] || '#003CA3' },
                    ]}
                  >
                    {option}
                  </AppText>
                  {isSelected && (
                    <Check
                      size={normalize(18)}
                      color={colors.typographyColor['Dark 2'] || '#003CA3'}
                      strokeWidth={2.5}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(10),
    gap: normalize(16),
    paddingHorizontal: normalize(10)
  },
  textCol: {
    flex: 1,
    gap: normalize(2.5),
  },
  title: {
    fontSize: normalize(13.5),
  },
  subtitle: {
    fontSize: normalize(11),
    lineHeight: normalize(15),
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
  },
  valueText: {
    fontSize: normalize(12.5),
    maxWidth: normalize(80),

  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(24),
    borderTopRightRadius: normalize(24),
    paddingHorizontal: normalize(20),
    paddingTop: normalize(18),
    paddingBottom: normalize(32),
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(14),
  },
  sheetTitle: {
    fontSize: normalize(16),
    color: colors.typographyColor.Black
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(12),
  },
  optionItemActive: {
    backgroundColor: '#EDF5FD',
  },
  optionText: {
    fontSize: normalize(13.5),
    color: '#1E293B',
  },
});
