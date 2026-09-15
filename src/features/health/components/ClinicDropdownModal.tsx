import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Check, Building2, X } from 'lucide-react-native';

export const DUMMY_CLINICS = [
  "MY CLINIC - Dr. Arisaka's Care",
  'Mind Wellness Hub - Serenity Clinic',
  'Zenith Health Center - Dr. Patel',
  'Inner Peace Studio - Dr. Emily Chen',
  'Lotus Harmony Clinic - Dr. Rajiv Sharma',
];

interface ClinicDropdownModalProps {
  visible: boolean;
  selectedClinic: string;
  onSelectClinic: (clinic: string) => void;
  onClose: () => void;
}

export const ClinicDropdownModal: React.FC<ClinicDropdownModalProps> = ({
  visible,
  selectedClinic,
  onSelectClinic,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.headerRow}>
                <View style={styles.headerLeft}>
                  <Building2 size={normalize(20)} color="#1E5692" />
                  <AppText style={styles.headerTitle} weight="bold">
                    Select Your Clinic
                  </AppText>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <X size={normalize(18)} color="#64748B" />
                </TouchableOpacity>
              </View>

              {/* Clinic Options List */}
              <View style={styles.optionsList}>
                {DUMMY_CLINICS.map((clinic) => {
                  const isSelected = clinic === selectedClinic;
                  return (
                    <TouchableOpacity
                      key={clinic}
                      style={[
                        styles.optionItem,
                        isSelected && styles.optionItemSelected,
                      ]}
                      activeOpacity={0.75}
                      onPress={() => {
                        onSelectClinic(clinic);
                        onClose();
                      }}
                    >
                      <AppText
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                        weight={isSelected ? 'bold' : 'regular'}
                      >
                        {clinic}
                      </AppText>
                      {isSelected && (
                        <Check size={normalize(16)} color="#1E5692" strokeWidth={2.5} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(20),
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  headerTitle: {
    fontSize: normalize(16),
    color: '#1E293B',
  },
  closeBtn: {
    padding: normalize(4),
  },
  optionsList: {
    gap: normalize(6),
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(14),
    borderRadius: normalize(12),
    backgroundColor: '#F8FAFC',
  },
  optionItemSelected: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  optionText: {
    fontSize: normalize(13),
    color: '#334155',
    flex: 1,
    paddingRight: normalize(8),
  },
  optionTextSelected: {
    color: '#1E5692',
  },
});
