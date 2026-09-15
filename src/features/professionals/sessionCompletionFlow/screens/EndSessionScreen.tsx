import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, CheckCircle2, PhoneCall, ChevronRight, Minus, Plus, FileText, Goal } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const EndSessionScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  
  const [riskLevel, setRiskLevel] = useState<'low' | 'moderate' | 'high'>('low');
  const [recommendedSessions, setRecommendedSessions] = useState(5);
  const [reasonText, setReasonText] = useState('Client is still experiencing anxiety triggers and would benefit from continued CBT support.');
  const [sessionSummary, setSessionSummary] = useState('');
  const [mood, setMood] = useState<'very_low' | 'low' | 'neutral' | 'good' | 'very_good' | 'great'>('neutral');

  const handleDecrement = () => setRecommendedSessions(prev => Math.max(0, prev - 1));
  const handleIncrement = () => setRecommendedSessions(prev => prev + 1);

  return (
    <SafeAreaView 
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header Gradient Block */}
      <LinearGradient 
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={normalize(20)} color={colors.appThemeColor[600]} />
          </TouchableOpacity>
          
          <AppText family="primary" weight="bold" style={styles.headerTitle}>
            End session
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Client Profile Section */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder} />
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.profileDetails}>
              <View style={styles.clientBadge}>
                <AppText family="primary" weight="bold" style={styles.clientBadgeText}>CLIENT</AppText>
              </View>
              <View style={styles.nameRow}>
                <AppText family="primary" weight="bold" style={styles.clientName}>Dr. Ananya Sharma</AppText>
                <CheckCircle2 size={normalize(14)} color="#3B82F6" style={{ marginLeft: normalize(4) }} />
              </View>
              <AppText family="primary" weight="medium" style={styles.clientInfo}>
                ID: CL-10234 • 28 Yrs • Female
              </AppText>
              <TouchableOpacity style={styles.viewProfileBtn} activeOpacity={0.7}>
                <UserIcon size={normalize(12)} color="#3B82F6" style={{ marginRight: normalize(4) }} />
                <AppText family="primary" weight="bold" style={styles.viewProfileBtnText}>View Profile</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 2. Risk & Emergency Section */}
        <View style={styles.card}>
          <AppText family="primary" weight="bold" style={styles.sectionLabel}>RISK INDICATOR</AppText>
          <View style={styles.riskRow}>
            <TouchableOpacity 
              style={[styles.riskBtn, riskLevel === 'low' && styles.riskBtnActiveLow]}
              onPress={() => setRiskLevel('low')}
            >
              <View style={[styles.riskDot, { backgroundColor: '#10B981' }]} />
              <AppText family="primary" weight="medium" style={styles.riskBtnText}>Low Risk</AppText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.riskBtn, riskLevel === 'moderate' && styles.riskBtnActiveMod]}
              onPress={() => setRiskLevel('moderate')}
            >
              <View style={[styles.riskDot, { backgroundColor: '#F59E0B' }]} />
              <AppText family="primary" weight="medium" style={styles.riskBtnText}>Moderate{'\n'}Risk</AppText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.riskBtn, riskLevel === 'high' && styles.riskBtnActiveHigh]}
              onPress={() => setRiskLevel('high')}
            >
              <View style={[styles.riskDot, { backgroundColor: '#EF4444' }]} />
              <AppText family="primary" weight="medium" style={styles.riskBtnText}>High Risk</AppText>
            </TouchableOpacity>
          </View>

          <AppText family="primary" weight="bold" style={styles.sectionLabel}>EMERGENCY CONTACT</AppText>
          <View style={styles.contactRow}>
            <View style={styles.contactIconWrapper}>
              <PhoneCall size={normalize(16)} color="#3B82F6" />
            </View>
            <View style={styles.contactDetails}>
              <AppText family="primary" weight="bold" style={styles.contactName}>Ramesh Sharma</AppText>
              <AppText family="primary" weight="medium" style={styles.contactPhone}>+91 98765 43210</AppText>
            </View>
            <ChevronRight size={normalize(16)} color="#94A3B8" />
          </View>

          <AppText family="primary" weight="bold" style={[styles.sectionLabel, { marginTop: normalize(16), color: '#1E293B' }]}>
            CONFIDENTIAL SUPPORT
          </AppText>
          <TouchableOpacity style={styles.reportBtn} activeOpacity={0.8}>
            <AppText family="primary" weight="bold" style={styles.reportBtnText}>Report Issue</AppText>
          </TouchableOpacity>
        </View>

        {/* 3. Recommended Sessions Section */}
        <View style={styles.card}>
          <View style={styles.numberedTitleRow}>
            <View style={styles.numberIconWrapper}>
              <FileText size={normalize(12)} color="#2563EB" />
            </View>
            <AppText family="primary" weight="bold" style={styles.numberedTitle}>1. Recommended Sessions</AppText>
          </View>
          <AppText family="primary" weight="medium" style={styles.subText}>
            How many additional sessions do you recommend?
          </AppText>

          <AppText family="primary" weight="medium" style={styles.inputLabel}>Select sessions</AppText>
          <View style={styles.counterRow}>
            <TouchableOpacity style={styles.counterBtn} onPress={handleDecrement}>
              <Minus size={normalize(16)} color="#475569" />
            </TouchableOpacity>
            <AppText family="primary" weight="bold" style={styles.counterText}>{recommendedSessions}</AppText>
            <TouchableOpacity style={styles.counterBtn} onPress={handleIncrement}>
              <Plus size={normalize(16)} color="#475569" />
            </TouchableOpacity>
          </View>

          <AppText family="primary" weight="medium" style={styles.inputLabel}>Reason for recommendation (Optional):</AppText>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              multiline
              value={reasonText}
              onChangeText={setReasonText}
              textAlignVertical="top"
            />
            <AppText family="primary" weight="medium" style={styles.charCount}>
              {reasonText.length}/200
            </AppText>
          </View>
          
          <View style={styles.saveBtnWrapper}>
            <TouchableOpacity style={styles.saveSmallBtn} activeOpacity={0.8}>
              <AppText family="primary" weight="bold" style={styles.saveSmallBtnText}>Save</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Session Overview Section */}
        <View style={styles.cardTransparent}>
          <View style={styles.numberedTitleRow}>
            <View style={styles.numberIconWrapper}>
              <FileText size={normalize(12)} color="#2563EB" />
            </View>
            <AppText family="primary" weight="bold" style={styles.numberedTitle}>2. SESSION OVERVIEW</AppText>
          </View>

          <View style={styles.cardOutline}>
            <AppText family="primary" weight="bold" style={styles.outlineLabel}>Session Summary</AppText>
            <TextInput
              style={styles.textAreaOutline}
              multiline
              placeholder="Type session summary here..."
              placeholderTextColor="#94A3B8"
              value={sessionSummary}
              onChangeText={setSessionSummary}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.listItemBtn}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('WeeklyGoal')}
            >
              <Goal size={normalize(16)} color="#3B82F6" style={{ marginRight: normalize(12) }} />
              <AppText family="primary" weight="bold" style={styles.listItemText}>Weekly Goal</AppText>
              <ChevronRight size={normalize(16)} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listItemBtn}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('CareNotes')}
            >
              <FileText size={normalize(16)} color="#3B82F6" style={{ marginRight: normalize(12) }} />
              <AppText family="primary" weight="bold" style={styles.listItemText}>Care Notes</AppText>
              <ChevronRight size={normalize(16)} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Mood Assessment Section */}
        <View style={styles.cardTransparent}>
          <View style={styles.numberedTitleRow}>
            <View style={styles.numberIconWrapper}>
              <AppText family="primary" weight="bold" style={{ color: '#2563EB', fontSize: normalize(10) }}>M</AppText>
            </View>
            <AppText family="primary" weight="bold" style={styles.numberedTitle}>3. MOOD ASSESSMENT</AppText>
          </View>
          <AppText family="primary" weight="medium" style={styles.subTextDark}>
            How was the client's mood after today's session?
          </AppText>

          <View style={styles.moodRow}>
            {[
              { id: 'very_low', emoji: '😞', label: 'Very Low' },
              { id: 'low', emoji: '🙁', label: 'Low' },
              { id: 'neutral', emoji: '😐', label: 'Neutral' },
              { id: 'good', emoji: '🙂', label: 'Good' },
              { id: 'very_good', emoji: '😊', label: 'Very Good' },
              { id: 'great', emoji: '😁', label: 'Great' },
            ].map((m) => (
              <TouchableOpacity 
                key={m.id} 
                style={styles.moodItem}
                onPress={() => setMood(m.id as any)}
                activeOpacity={0.7}
              >
                <View style={[styles.emojiWrapper, mood === m.id && styles.emojiWrapperActive]}>
                  <AppText style={styles.emojiText}>{m.emoji}</AppText>
                </View>
                <AppText family="primary" weight="medium" style={[styles.moodLabel, mood === m.id && styles.moodLabelActive]}>
                  {m.label}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.paymentBox}>
          <View>
            <AppText family="primary" weight="medium" style={styles.paymentLabel}>PAYMENT INFORMATION</AppText>
            <AppText family="primary" weight="bold" style={styles.paymentValue}>Session Fee: ₹1,000</AppText>
          </View>
          <View style={styles.paidBadge}>
            <CheckCircle2 size={normalize(12)} color="#10B981" style={{ marginRight: normalize(4) }} />
            <AppText family="primary" weight="bold" style={styles.paidBadgeText}>PAID</AppText>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveContinueBtn}
          onPress={() => {
            console.log('[End Session] Saved and finalized session');
            navigation.goBack();
          }}
          activeOpacity={0.8}
        >
          <AppText family="primary" weight="bold" style={styles.saveContinueBtnText}>
            Save & Continue
          </AppText>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

// Simple User Icon SVG for the view profile button since it wasn't imported initially
const UserIcon = (props: any) => (
  <View style={{ width: props.size, height: props.size, borderRadius: props.size/2, borderWidth: 1, borderColor: props.color, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: props.size*0.4, height: props.size*0.4, borderRadius: props.size*0.2, backgroundColor: props.color, marginBottom: 1 }} />
    <View style={{ width: props.size*0.6, height: props.size*0.3, borderTopLeftRadius: props.size*0.3, borderTopRightRadius: props.size*0.3, backgroundColor: props.color }} />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  headerGradient: {
    paddingBottom: normalize(12),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
    paddingBottom: normalize(40),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTransparent: {
    paddingHorizontal: normalize(4),
    marginBottom: normalize(16),
  },
  cardOutline: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: normalize(16),
  },
  avatarPlaceholder: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
    backgroundColor: '#CBD5E1',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: normalize(2),
    right: normalize(2),
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(7),
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileDetails: {
    flex: 1,
    alignItems: 'flex-start',
  },
  clientBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(2),
    borderRadius: normalize(12),
    marginBottom: normalize(4),
  },
  clientBadgeText: {
    fontSize: normalize(8),
    color: '#2563EB',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(2),
  },
  clientName: {
    fontSize: normalize(16),
    color: '#1E293B',
  },
  clientInfo: {
    fontSize: normalize(11),
    color: '#64748B',
    marginBottom: normalize(8),
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(16),
  },
  viewProfileBtnText: {
    fontSize: normalize(10),
    color: '#3B82F6',
  },
  sectionLabel: {
    fontSize: normalize(10),
    color: '#94A3B8',
    marginBottom: normalize(8),
  },
  riskRow: {
    flexDirection: 'row',
    gap: normalize(8),
    marginBottom: normalize(16),
  },
  riskBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(8),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(4),
  },
  riskBtnActiveLow: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  riskBtnActiveMod: {
    borderColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  riskBtnActiveHigh: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  riskDot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    marginRight: normalize(6),
  },
  riskBtnText: {
    fontSize: normalize(10),
    color: '#475569',
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: normalize(12),
    padding: normalize(12),
  },
  contactIconWrapper: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(2),
  },
  contactPhone: {
    fontSize: normalize(11),
    color: '#64748B',
  },
  reportBtn: {
    backgroundColor: '#1D64B5',
    paddingVertical: normalize(12),
    borderRadius: normalize(24),
    alignItems: 'center',
  },
  reportBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
  numberedTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  numberIconWrapper: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(6),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  numberedTitle: {
    fontSize: normalize(13),
    color: '#1E293B',
    textTransform: 'uppercase',
  },
  subText: {
    fontSize: normalize(11),
    color: '#64748B',
    marginLeft: normalize(34),
    marginBottom: normalize(16),
  },
  subTextDark: {
    fontSize: normalize(12),
    color: '#475569',
    marginLeft: normalize(34),
    marginBottom: normalize(20),
  },
  inputLabel: {
    fontSize: normalize(11),
    color: '#475569',
    marginBottom: normalize(8),
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5F9',
    borderRadius: normalize(8),
    padding: normalize(4),
    marginBottom: normalize(20),
  },
  counterBtn: {
    padding: normalize(10),
  },
  counterText: {
    fontSize: normalize(16),
    color: '#1E293B',
  },
  textAreaContainer: {
    position: 'relative',
    marginBottom: normalize(16),
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(8),
    padding: normalize(12),
    height: normalize(80),
    fontSize: normalize(12),
    color: '#1E293B',
    fontFamily: 'Inter-Medium',
  },
  charCount: {
    position: 'absolute',
    bottom: normalize(8),
    right: normalize(12),
    fontSize: normalize(9),
    color: '#94A3B8',
  },
  saveBtnWrapper: {
    alignItems: 'center',
  },
  saveSmallBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(32),
    borderRadius: normalize(20),
  },
  saveSmallBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(13),
  },
  outlineLabel: {
    fontSize: normalize(11),
    color: '#1E293B',
    marginBottom: normalize(8),
  },
  textAreaOutline: {
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: normalize(8),
    padding: normalize(12),
    height: normalize(80),
    fontSize: normalize(12),
    color: '#1E293B',
    fontFamily: 'Inter-Medium',
    marginBottom: normalize(16),
  },
  listItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  listItemText: {
    flex: 1,
    fontSize: normalize(12),
    color: '#1E293B',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
  },
  moodItem: {
    alignItems: 'center',
    width: '16%',
  },
  emojiWrapper: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(8),
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emojiWrapperActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  emojiText: {
    fontSize: normalize(20),
  },
  moodLabel: {
    fontSize: normalize(9),
    color: '#94A3B8',
    textAlign: 'center',
  },
  moodLabelActive: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    paddingBottom: Platform.OS === 'ios' ? normalize(16) : normalize(24),
    backgroundColor: '#EAF2F9',
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    padding: normalize(16),
    marginBottom: normalize(16),
  },
  paymentLabel: {
    fontSize: normalize(10),
    color: '#94A3B8',
    marginBottom: normalize(2),
  },
  paymentValue: {
    fontSize: normalize(14),
    color: '#1E293B',
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(6),
    borderRadius: normalize(16),
  },
  paidBadgeText: {
    fontSize: normalize(11),
    color: '#10B981',
  },
  saveContinueBtn: {
    backgroundColor: '#1D64B5',
    paddingVertical: normalize(16),
    borderRadius: normalize(24),
    alignItems: 'center',
  },
  saveContinueBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
});
