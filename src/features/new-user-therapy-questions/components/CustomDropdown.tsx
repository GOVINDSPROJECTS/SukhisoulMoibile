import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CustomDropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  placeholder?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  placeholder = 'Select',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.header, isOpen && styles.headerOpen]}
        onPress={toggleDropdown}
      >
        <AppText
          variant="body"
          style={[styles.selectedText, !selectedOption && styles.placeholderText]}
        >
          {selectedOption || placeholder}
        </AppText>
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
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionItem, selectedOption === item && styles.optionItemSelected]}
                onPress={() => handleSelect(item)}
              >
                <AppText style={[styles.optionText, selectedOption === item && styles.optionTextSelected]}>
                  {item}
                </AppText>
              </TouchableOpacity>
            ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    borderWidth: 1,
    borderColor: colors.tintsGrey[400],
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
  },
  headerOpen: {
    borderColor: colors.blue[600],
  },
  selectedText: {
    color: colors.typographyColor.Black,
    fontSize: normalize(13),
  },
  placeholderText: {
    color: colors.tintsGrey[400],
  },
  dropdownContainer: {
    marginTop: normalize(8),
    borderWidth: 1,
    borderColor: colors.lightTints.blueLightTint[100],
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    boxShadow: '0 5px 5px rgba(0,0,0,0.05)',
  },
  scrollView: {
    maxHeight: normalize(200),
  },
  optionItem: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(195,198,214,0.19)',
  },
  optionItemSelected: {
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  optionText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(13),
  },
  optionTextSelected: {
    color: colors.blue[800],
    fontWeight: '500',
  },
});
