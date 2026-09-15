import React, { useCallback } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import { Check, Settings } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { PermissionLevel } from './PermissionRowItem';

interface OptionItem {
  key: PermissionLevel;
  title: string;
  description: string;
}

const PERMISSION_OPTIONS: OptionItem[] = [
  {
    key: 'Allow',
    title: 'Allow',
    description: 'Grant access and open device native settings to enable permissions.',
  },
  {
    key: 'Ask Every Time',
    title: 'Ask Every Time',
    description: 'Request permission every time this feature is accessed in the app.',
  },
  {
    key: "Don't Allow",
    title: "Don't Allow",
    description: 'Prevent access to this feature across all wellness tools.',
  },
];

interface PermissionPickerModalProps {
  visible: boolean;
  permissionLabel: string;
  currentValue: PermissionLevel;
  onClose: () => void;
  onSelect: (val: PermissionLevel) => void;
}

export const PermissionPickerModal: React.FC<PermissionPickerModalProps> = ({
  visible,
  permissionLabel,
  currentValue,
  onClose,
  onSelect,
}) => {
  const handleOptionPress = useCallback(
    async (option: PermissionLevel) => {
      console.log(
        `[General Settings] Permission "${permissionLabel}" changed to: ${option}`
      );
      onSelect(option);
      onClose();

      // If user selected "Allow", open mobile native settings as requested!
      if (option === 'Allow') {
        console.log('[General Settings] Opening mobile native settings page...');
        try {
          await Linking.openSettings();
        } catch (err) {
          console.log('[General Settings] Failed to open native settings:', err);
        }
      }
    },
    [permissionLabel, onSelect, onClose]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <AppText
              weight="bold"
              family="primary"
              style={styles.modalTitle}
              color={colors.typographyColor['Dark 2'] || '#003CA3'}
            >
              {permissionLabel}
            </AppText>
            <AppText
              weight="regular"
              family="secondary"
              style={styles.modalSubtitle}
              color={colors.typographyColor.Medium}
            >
              Select access preference for this feature
            </AppText>
          </View>

          {/* Options List */}
          <View style={styles.optionsList}>
            {PERMISSION_OPTIONS.map((opt) => {
              const isSelected = opt.key === currentValue;
              return (
                <TouchableOpacity
                  key={opt.key}
                  style={[
                    styles.optionItem,
                    isSelected && styles.optionItemSelected,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => handleOptionPress(opt.key)}
                >
                  <View style={styles.optionTextCol}>
                    <View style={styles.titleRow}>
                      <AppText
                        weight="bold"
                        family="primary"
                        style={styles.optionTitle}
                        color={
                          isSelected
                            ? colors.typographyColor['Dark 2'] || '#003CA3'
                            : '#1E293B'
                        }
                      >
                        {opt.title}
                      </AppText>
                      {opt.key === 'Allow' ? (
                        <View style={styles.settingsBadge}>
                          <Settings size={normalize(12)} color={colors.typographyColor['Dark 2'] || '#003CA3'} />
                          <AppText
                            weight="medium"
                            family="secondary"
                            style={styles.settingsBadgeText}
                            color={colors.typographyColor['Dark 2'] || '#003CA3'}
                          >
                            Device Settings
                          </AppText>
                        </View>
                      ) : null}
                    </View>

                    <AppText
                      weight="regular"
                      family="secondary"
                      style={styles.optionDesc}
                      color={colors.typographyColor.Medium}
                    >
                      {opt.description}
                    </AppText>
                  </View>

                  {isSelected ? (
                    <View style={styles.checkCircle}>
                      <Check
                        size={normalize(16)}
                        color="#FFFFFF"
                        strokeWidth={2.5}
                      />
                    </View>
                  ) : (
                    <View style={styles.uncheckCircle} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    padding: normalize(20),
    width: '100%',
    maxWidth: normalize(340),
    boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    marginBottom: normalize(16),
  },
  modalTitle: {
    fontSize: normalize(16),
    marginBottom: normalize(4),
  },
  modalSubtitle: {
    fontSize: normalize(12.5),
  },
  optionsList: {
    gap: normalize(10),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(14),
    borderRadius: normalize(14),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
  },
  optionItemSelected: {
    borderColor: colors.typographyColor['Dark 2'] || '#003CA3',
    backgroundColor: '#EDF5FD',
  },
  optionTextCol: {
    flex: 1,
    paddingRight: normalize(10),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
    marginBottom: normalize(4),
  },
  optionTitle: {
    fontSize: normalize(14),
  },
  settingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(4),
    backgroundColor: '#DBEAFE',
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2),
    borderRadius: normalize(6),
  },
  settingsBadgeText: {
    fontSize: normalize(10),
  },
  optionDesc: {
    fontSize: normalize(11.5),
    lineHeight: normalize(16),
  },
  checkCircle: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    backgroundColor: colors.typographyColor['Dark 2'] || '#003CA3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckCircle: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
});
