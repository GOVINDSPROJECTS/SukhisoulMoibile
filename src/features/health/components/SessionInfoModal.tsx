import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { X, CheckCircle2, Sparkles, HeartHandshake, Brain } from 'lucide-react-native';

interface SessionInfoModalProps {
  visible: boolean;
  initialTab?: 'about' | 'instructions';
  onClose: () => void;
}

export const SessionInfoModal: React.FC<SessionInfoModalProps> = ({
  visible,
  initialTab = 'about',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'instructions'>(initialTab);

  React.useEffect(() => {
    if (visible) {
      setActiveTab(initialTab);
    }
  }, [visible, initialTab]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalSheet}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.tabsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      activeTab === 'about' && styles.tabButtonActive,
                    ]}
                    onPress={() => setActiveTab('about')}
                  >
                    <AppText
                      style={[
                        styles.tabText,
                        activeTab === 'about' && styles.tabTextActive,
                      ]}
                      weight="bold"
                    >
                      About Session
                    </AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      activeTab === 'instructions' && styles.tabButtonActive,
                    ]}
                    onPress={() => setActiveTab('instructions')}
                  >
                    <AppText
                      style={[
                        styles.tabText,
                        activeTab === 'instructions' && styles.tabTextActive,
                      ]}
                      weight="bold"
                    >
                      Instructions
                    </AppText>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={normalize(20)} color="#64748B" />
                </TouchableOpacity>
              </View>

              {/* Body Content */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {activeTab === 'about' ? (
                  <View style={styles.tabContent}>
                    <AppText style={styles.contentTitle} weight="bold">
                      Body Relaxing Music Patterns
                    </AppText>
                    <AppText style={styles.contentParagraph} weight="regular" family='secondary'>
                      This guided audio meditation blends 432 Hz therapeutic
                      harmonics with organic ambient soundscapes to gently lower
                      your heart rate and activate the parasympathetic nervous
                      system.
                    </AppText>

                    <View style={styles.benefitBox}>
                      <AppText style={styles.benefitHeader} weight="semiBold">
                        Key Benefits:
                      </AppText>

                      <View style={styles.benefitRow}>
                        <CheckCircle2 size={normalize(16)} color="#10B981" />
                        <AppText style={styles.benefitText} weight="regular" family='secondary'>
                          Releases muscular tension in neck and shoulders
                        </AppText>
                      </View>
                      <View style={styles.benefitRow}>
                        <CheckCircle2 size={normalize(16)} color="#10B981" />
                        <AppText style={styles.benefitText} weight="regular" family='secondary'>
                          Reduces cortisol and physiological stress
                        </AppText>
                      </View>
                      <View style={styles.benefitRow}>
                        <CheckCircle2 size={normalize(16)} color="#10B981" />
                        <AppText style={styles.benefitText} weight="regular" family='secondary'>
                          Promotes deep alpha brainwave state
                        </AppText>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.tabContent}>
                    <AppText style={styles.contentTitle} weight="bold">
                      How to Practice
                    </AppText>

                    <View style={styles.instructionStep}>
                      <View style={styles.stepNumberBadge}>
                        <AppText style={styles.stepNumber} weight="bold">
                          1
                        </AppText>
                      </View>
                      <View style={styles.stepTextContainer}>
                        <AppText style={styles.stepTitle} weight="semiBold">
                          Find a Quiet Posture
                        </AppText>
                        <AppText style={styles.stepDesc} weight="regular" family='secondary'>
                          Sit comfortably cross-legged on a mat or upright in a
                          chair with spine elongated and shoulders relaxed.
                        </AppText>
                      </View>
                    </View>

                    <View style={styles.instructionStep}>
                      <View style={styles.stepNumberBadge}>
                        <AppText style={styles.stepNumber} weight="bold">
                          2
                        </AppText>
                      </View>
                      <View style={styles.stepTextContainer}>
                        <AppText style={styles.stepTitle} weight="semiBold">
                          Gentle Belly Breathing
                        </AppText>
                        <AppText style={styles.stepDesc} weight="regular" family='secondary'>
                          Inhale slowly through your nose for 4 counts, hold for
                          2, then release softly through parted lips for 6
                          counts.
                        </AppText>
                      </View>
                    </View>

                    <View style={styles.instructionStep}>
                      <View style={styles.stepNumberBadge}>
                        <AppText style={styles.stepNumber} weight="bold">
                          3
                        </AppText>
                      </View>
                      <View style={styles.stepTextContainer}>
                        <AppText style={styles.stepTitle} weight="semiBold">
                          Observe Without Judgment
                        </AppText>
                        <AppText style={styles.stepDesc} weight="regular" family='secondary'>
                          When wandering thoughts arise, simply notice them
                          like passing clouds and gently return your attention to
                          the music.
                        </AppText>
                      </View>
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.doneButton}
                  activeOpacity={0.85}
                  onPress={onClose}
                >
                  <AppText style={styles.doneButtonText} weight="bold">
                    Continue Meditation
                  </AppText>
                </TouchableOpacity>
              </ScrollView>
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
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(28),
    borderTopRightRadius: normalize(28),
    paddingTop: normalize(20),
    paddingHorizontal: normalize(20),
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: normalize(12),
    padding: normalize(4),
  },
  tabButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(14),
    borderRadius: normalize(10),
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
  },
  tabText: {
    fontSize: normalize(12),
    color: '#64748B',
  },
  tabTextActive: {
    color: '#2563EB',
  },
  closeButton: {
    padding: normalize(6),
  },
  scrollContent: {
    paddingVertical: normalize(18),
  },
  tabContent: {
    marginBottom: normalize(20),
  },
  contentTitle: {
    fontSize: normalize(17),
    color: '#1E293B',
    marginBottom: normalize(8),
  },
  contentParagraph: {
    fontSize: normalize(12.5),
    color: '#475569',
    lineHeight: normalize(19),
    marginBottom: normalize(16),
  },
  benefitBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(16),
    padding: normalize(14),
    gap: normalize(10),
  },
  benefitHeader: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(4),
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  benefitText: {
    fontSize: normalize(12),
    color: '#334155',
    flex: 1,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(16),
    gap: normalize(12),
  },
  stepNumberBadge: {
    width: normalize(26),
    height: normalize(26),
    borderRadius: normalize(13),
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(2),
  },
  stepNumber: {
    fontSize: normalize(12),
    color: '#2563EB',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  stepDesc: {
    fontSize: normalize(11.5),
    color: '#64748B',
    lineHeight: normalize(16),
  },
  doneButton: {
    backgroundColor: '#2563EB',
    paddingVertical: normalize(12),
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    fontSize: normalize(13),
    color: '#FFFFFF',
  },
});
