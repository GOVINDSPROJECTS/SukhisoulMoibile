import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Clock, Download, Share2, Volume2, X } from 'lucide-react-native';

interface PlayerMenuModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PlayerMenuModal: React.FC<PlayerMenuModalProps> = ({
  visible,
  onClose,
}) => {
  const handleAction = (title: string, message: string) => {
    onClose();
    setTimeout(() => {
      Alert.alert(title, message, [{ text: 'OK' }]);
    }, 200);
  };

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
              <View style={styles.header}>
                <AppText style={styles.headerTitle} weight="bold">
                  Session Options
                </AppText>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <X size={normalize(18)} color="#64748B" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  handleAction('Sleep Timer', 'Timer set! Audio will fade out after 20 minutes.')
                }
              >
                <Clock size={normalize(18)} color="#2563EB" />
                <AppText style={styles.menuItemText} weight="medium">
                  Set Sleep Timer
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  handleAction('Download Session', 'Session downloaded for offline meditation listening!')
                }
              >
                <Download size={normalize(18)} color="#2563EB" />
                <AppText style={styles.menuItemText} weight="medium">
                  Download Offline
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  handleAction('Share Session', 'Link copied! Share peace with friends and family.')
                }
              >
                <Share2 size={normalize(18)} color="#2563EB" />
                <AppText style={styles.menuItemText} weight="medium">
                  Share Session
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  handleAction('Audio Quality', 'HD 432Hz spatial audio profile active.')
                }
              >
                <Volume2 size={normalize(18)} color="#2563EB" />
                <AppText style={styles.menuItemText} weight="medium">
                  Audio Quality: 432Hz HD
                </AppText>
              </TouchableOpacity>
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
    paddingHorizontal: normalize(24),
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(24),
    padding: normalize(20),
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.12)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  headerTitle: {
    fontSize: normalize(16),
    color: '#1E293B',
  },
  closeBtn: {
    padding: normalize(4),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(12),
    gap: normalize(12),
    backgroundColor: '#F8FAFC',
    marginBottom: normalize(8),
  },
  menuItemText: {
    fontSize: normalize(13),
    color: '#334155',
  },
});
