import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { FileText, ChevronDown, Check } from 'lucide-react-native';
import { colors } from '@/theme';

const DUE_DATE_OPTIONS = [
  'Next Session',
  'Tomorrow',
  'In 3 Days',
  'In 1 Week',
  'Custom Date',
];

interface AssignHomeworkCardProps {
  selectedDueDate?: string;
  onDueDateChange?: (date: string) => void;
}

export const AssignHomeworkCard: React.FC<AssignHomeworkCardProps> = ({
  selectedDueDate: controlledDate,
  onDueDateChange,
}) => {
  const [internalDate, setInternalDate] = useState('Next Session');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedDate = controlledDate ?? internalDate;

  const handleSelect = (option: string) => {
    setInternalDate(option);
    onDueDateChange?.(option);
    setDropdownOpen(false);
  };

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <FileText size={normalize(22)} color="#FFFFFF" />
        </View>
        <View style={styles.headerTextCol}>
          <AppText family="secondary" weight="medium" style={styles.title}>
            Assign Homework / Tasks
          </AppText>
          <AppText family="secondary" weight="regular" style={styles.subtitle}>
            Assign tasks to support your client's progress.
          </AppText>
        </View>
      </View>

      {/* Due Date Section */}
      <View style={styles.dueDateSection}>
        <AppText family="secondary" weight="medium" style={styles.label}>
          DUE DATE
        </AppText>
        <TouchableOpacity
          style={styles.dropdownButton}
          activeOpacity={0.7}
          onPress={() => setDropdownOpen(true)}
        >
          <AppText family="secondary" weight="medium" style={styles.selectedDateText}>
            {selectedDate}
          </AppText>
          <ChevronDown size={normalize(18)} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Due Date Modal / Dropdown */}
      <Modal
        visible={dropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <AppText family="secondary" weight="bold" style={styles.modalTitle}>
                  Select Due Date
                </AppText>
                {DUE_DATE_OPTIONS.map((option) => {
                  const isSelected = option === selectedDate;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[styles.modalOption, isSelected && styles.modalOptionSelected]}
                      onPress={() => handleSelect(option)}
                      activeOpacity={0.7}
                    >
                      <AppText
                        family="secondary"
                        weight={isSelected ? 'bold' : 'medium'}
                        style={[styles.modalOptionText, isSelected && styles.modalOptionTextSelected]}
                      >
                        {option}
                      </AppText>
                      {isSelected && <Check size={normalize(16)} color="#1D64B5" />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(16),
    marginBottom: normalize(16),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(12),
    backgroundColor: colors.typographyColor['Dark 2'],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: normalize(15),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(2),
  },
  subtitle: {
    fontSize: normalize(11),
    color: colors.typographyColor.Light,
    lineHeight: normalize(15),
  },
  dueDateSection: {
    marginTop: normalize(24),
  },
  label: {
    fontSize: normalize(10),
    color: colors.typographyColor.Medium,
    letterSpacing: 0.5,
    marginBottom: normalize(8),
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(12),
    backgroundColor: '#FFFFFF',
  },
  selectedDateText: {
    fontSize: normalize(12),
    color: colors.typographyColor.Light,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(24),
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: normalize(16),
    color: '#1E293B',
    marginBottom: normalize(12),
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalOptionSelected: {
    backgroundColor: '#F0F7FF',
    borderRadius: normalize(8),
  },
  modalOptionText: {
    fontSize: normalize(14),
    color: '#334155',
  },
  modalOptionTextSelected: {
    color: '#1D64B5',
  },
});
