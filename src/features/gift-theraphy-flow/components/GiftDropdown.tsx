import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface DropdownOption {
  label: string;
  icon?: React.ReactNode;
}

interface GiftDropdownProps {
  label?: string;
  leftIcon?: React.ReactNode;
  options: (string | DropdownOption)[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const GiftDropdown: React.FC<GiftDropdownProps> = ({
  label,
  leftIcon,
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionLabel: string) => {
    onSelect(optionLabel);
    toggleDropdown();
  };

  const getOptionLabel = (opt: string | DropdownOption): string => {
    return typeof opt === 'string' ? opt : opt.label;
  };

  const getOptionIcon = (opt: string | DropdownOption): React.ReactNode | null => {
    return typeof opt === 'string' ? null : opt.icon || null;
  };

  const currentOption = options.find((opt) => getOptionLabel(opt) === selectedValue);
  const currentIcon = currentOption ? getOptionIcon(currentOption) : leftIcon;

  return (
    <View style={styles.container}>
      {label ? (
        <AppText variant="body" family="primary" weight="bold" style={styles.labelText}>
          {label}
        </AppText>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.header, isOpen && styles.headerOpen]}
        onPress={toggleDropdown}
      >
        <View style={styles.leftContainer}>
          {currentIcon ? <View style={styles.leftIconWrapper}>{currentIcon}</View> : null}
          <AppText
            variant="body"
            family="secondary"
            weight="medium"
            style={[styles.selectedText, !selectedValue && styles.placeholderText]}
          >
            {selectedValue || placeholder}
          </AppText>
        </View>

        {isOpen ? (
          <ChevronUp size={normalize(20)} color={colors.typographyColor.Medium} />
        ) : (
          <ChevronDown size={normalize(20)} color={colors.typographyColor.Medium} />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={true}
            style={styles.scrollView}
          >
            {options.map((opt, index) => {
              const optLabel = getOptionLabel(opt);
              const optIcon = getOptionIcon(opt);
              const isSelected = selectedValue === optLabel;

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                  onPress={() => handleSelect(optLabel)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionLeft}>
                    {optIcon ? <View style={styles.optionIconWrapper}>{optIcon}</View> : null}
                    <AppText
                      family="secondary"
                      weight={isSelected ? 'semiBold' : 'regular'}
                      style={[styles.optionText, isSelected && styles.optionTextSelected]}
                    >
                      {optLabel}
                    </AppText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: normalize(20),
  },
  labelText: {
    color: "#1F2937",
    fontSize: normalize(13),
    marginBottom: normalize(8),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: normalize(13),
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  headerOpen: {
    borderColor: '#FF6B6B',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: normalize(10),
  },
  leftIconWrapper: {
    marginRight: normalize(12),
  },
  selectedText: {
    color: colors.typographyColor.Black,
    fontSize: normalize(14),
  },
  placeholderText: {
    color: colors.tintsGrey[400],
  },
  dropdownContainer: {
    marginTop: normalize(8),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: normalize(13),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: normalize(80)
  },
  scrollView: {
    maxHeight: normalize(220),
  },
  optionItem: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  optionItemSelected: {
    backgroundColor: '#FFF0F0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconWrapper: {
    marginRight: normalize(12),
  },
  optionText: {
    color: colors.typographyColor.Dark,
    fontSize: normalize(14),
  },
  optionTextSelected: {
    color: '#FF5252',
  },
});
