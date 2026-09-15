import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Pencil } from 'lucide-react-native';
import { colors } from '@/theme';

interface AddMoreTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: { title: string; description: string }) => void;
}

export const AddMoreTaskModal: React.FC<AddMoreTaskModalProps> = ({
  visible,
  onClose,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (visible) {
      setTitle('');
      setDescription('');
    }
  }, [visible]);

  const isValid = title.trim().length > 0;

  const handleDone = () => {
    if (!isValid) return;
    onAddTask({
      title: title.trim(),
      description: description.trim() || 'Complete this task before next session',
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardAvoid}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                {/* Header Row */}
                <View style={styles.headerRow}>
                  <View style={styles.iconWrapper}>
                    <Pencil size={normalize(16)} color="#2563EB" />
                  </View>
                  <AppText family="primary" weight="bold" style={styles.modalTitle}>
                    Add more task
                  </AppText>
                </View>

                {/* Title Input Field */}
                <AppText family="primary" weight="bold" style={styles.inputLabel}>
                  Title
                </AppText>
                <TextInput
                  style={styles.titleInput}
                  placeholder="Enter task title"
                  placeholderTextColor="#94A3B8"
                  value={title}
                  onChangeText={setTitle}
                  maxLength={100}
                />
                <AppText family="primary" weight="medium" style={styles.charCounter}>
                  {title.length}/100
                </AppText>

                {/* Description Input Field */}
                <AppText family="primary" weight="bold" style={styles.inputLabel}>
                  Description
                </AppText>
                <TextInput
                  style={styles.descInput}
                  placeholder="Enter task description"
                  placeholderTextColor="#94A3B8"
                  value={description}
                  onChangeText={setDescription}
                  maxLength={200}
                  multiline={true}
                  textAlignVertical="top"
                />
                <AppText family="primary" weight="medium" style={styles.charCounter}>
                  {description.length}/200
                </AppText>

                {/* Done Button */}
                <TouchableOpacity
                  style={[
                    styles.doneBtn,
                    isValid ? styles.doneBtnActive : styles.doneBtnDisabled,
                  ]}
                  activeOpacity={isValid ? 0.8 : 1}
                  onPress={handleDone}
                  disabled={!isValid}
                >
                  <AppText
                    family="primary"
                    weight="bold"
                    style={[
                      styles.doneBtnText,
                      isValid ? styles.doneBtnTextActive : styles.doneBtnTextDisabled,
                    ]}
                  >
                    Done
                  </AppText>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
  },
  keyboardAvoid: {
    width: '100%',
    alignItems: 'center',
  },
  modalCard: {
    width: '100%',
    maxWidth: normalize(330),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(20),
    paddingTop: normalize(22),
    paddingBottom: normalize(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(18),
  },
  iconWrapper: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(10),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  modalTitle: {
    fontSize: normalize(15),
    color: '#1E293B',
  },
  inputLabel: {
    fontSize: normalize(12),
    color: '#1E293B',
    marginBottom: normalize(6),
  },
  titleInput: {
    backgroundColor: colors.tintsGrey[50],
    borderRadius: normalize(10),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(10),
    fontSize: normalize(12),
    color: '#1E293B',
  },
  descInput: {
    backgroundColor: colors.tintsGrey[50],
    borderRadius: normalize(10),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(10),
    fontSize: normalize(12),
    color: '#1E293B',
    minHeight: normalize(80),
  },
  charCounter: {
    fontSize: normalize(9),
    color: colors.typographyColor.Medium,
    textAlign: 'right',
    marginTop: normalize(4),
    marginBottom: normalize(10),
  },
  doneBtn: {
    width: '62%',
    alignSelf: 'center',
    paddingVertical: normalize(11),
    borderRadius: normalize(11),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(6),
  },
  doneBtnDisabled: {
    backgroundColor: colors.blue[50],
  },
  doneBtnActive: {
    backgroundColor: colors.typographyColor['Dark 2'],
  },
  doneBtnText: {
    fontSize: normalize(13),
  },
  doneBtnTextDisabled: {
    color: colors.blue[400],
  },
  doneBtnTextActive: {
    color: '#FFFFFF',
  },
});
