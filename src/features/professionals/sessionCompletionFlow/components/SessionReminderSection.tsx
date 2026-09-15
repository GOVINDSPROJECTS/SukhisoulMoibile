import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, TextInput } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import {
  Bell,
  Calendar,
  CalendarCheck,
  Clock,
  Check,
  ChevronDown,
  MessageSquare,
  Mail,
  CheckCircle,
  CheckCircle2
} from 'lucide-react-native';
import { CustomReminderModal } from './CustomReminderModal';
import { colors } from '@/theme';

export const SessionReminderSection: React.FC = () => {
  const [enableReminder, setEnableReminder] = useState(true);
  const [remindBefore, setRemindBefore] = useState('5 Days Before');
  const [remindAfter, setRemindAfter] = useState('5 Days After');
  const [beforeDate, setBeforeDate] = useState('06-06-2026');
  const [afterDate, setAfterDate] = useState('16-06-2026');
  const [notificationType, setNotificationType] = useState<'push' | 'sms' | 'email'>('push');
  const [continuationReason, setContinuationReason] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTarget, setActiveTarget] = useState<'before' | 'after'>('before');

  const handleOpenModal = (target: 'before' | 'after') => {
    setActiveTarget(target);
    setModalVisible(true);
  };

  const handleConfirmCustom = ({ date, time }: { date: string; time: string }) => {
    if (activeTarget === 'before') {
      setBeforeDate(date);
      setRemindBefore(`Custom: ${time}`);
    } else {
      setAfterDate(date);
      setRemindAfter(`Custom: ${time}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Enable Reminder Toggle Row */}
      <View style={styles.toggleRow}>
        <AppText family="primary" weight="bold" style={styles.toggleLabel}>
          Toggle: Enable Reminder
        </AppText>
        <Switch
          trackColor={{ false: '#CBD5E1', true: colors.blue[500] }}
          thumbColor="#FFFFFF"
          value={enableReminder}
          onValueChange={setEnableReminder}
        />
      </View>

      {/* Remind Me Before Card */}
      <View style={styles.reminderCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.blueBellWrapper}>
            <Bell size={normalize(18)} color={colors.blue[600]} />
          </View>
          <View style={styles.cardHeaderCol}>
            <AppText family="primary" weight="bold" style={styles.blueCardTitle}>
              Remind Me Before
            </AppText>
            <AppText family="primary" weight="regular" style={styles.cardSubtitle}>
              Get reminded before your session
            </AppText>
          </View>
        </View>

        {/* Dropdown Box */}
        <TouchableOpacity
          style={styles.dropdownBox}
          activeOpacity={0.7}
          onPress={() => handleOpenModal('before')}
        >
          <AppText family="primary" weight="medium" style={styles.dropdownText}>
            {remindBefore}
          </AppText>
          <ChevronDown size={normalize(16)} color={colors.blue[600]} />
        </TouchableOpacity>

        {/* Date Row Bottom */}
        <TouchableOpacity
          style={styles.dateTagRow}
          activeOpacity={0.7}
          onPress={() => handleOpenModal('before')}
        >
          <Calendar size={normalize(12)} color="#64748B" style={{ marginRight: normalize(4) }} />
          <AppText family="primary" weight="regular" style={styles.dateTagText}>
            Date: {beforeDate}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Selected Slot Solid Blue Card */}
      <View style={styles.selectedSlotCard}>
        <View style={styles.slotCardTop}>
          <View style={styles.slotCardTopLeft}>
            <CalendarCheck size={normalize(24)} color="#FFFFFF" style={{ marginRight: normalize(10) }} />
            <View>
              <AppText family="primary" weight="bold" style={styles.slotCardTitle}>
                Selected Slot
              </AppText>
              <AppText family="primary" weight="regular" style={styles.slotCardDate}>
                Wed, Oct 12, 2026
              </AppText>
            </View>
          </View>

          {/* Confirmed Badge */}
          <View style={styles.confirmedBadge}>
            <CheckCircle2 size={normalize(20)} fill={colors.green[800]} color={colors.green[100]} strokeWidth={2} style={{ marginRight: normalize(3) }} />
            <AppText family="primary" weight="bold" style={styles.confirmedBadgeText}>
              Confirmed
            </AppText>
          </View>
        </View>

        {/* Inner Light Blue Time Bar - Tappable to open reminder modal */}
        <TouchableOpacity
          style={styles.innerTimeBar}
          onPress={() => handleOpenModal('before')}
          activeOpacity={0.8}
        >
          <Clock size={normalize(16)} color="#1E3A8A" style={{ marginRight: normalize(6) }} />
          <AppText family="primary" weight="bold" style={styles.innerTimeText}>
            11:00 AM
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Remind Me After Card */}
      <View style={styles.reminderCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.greenBellWrapper}>
            <Bell size={normalize(18)} color={colors.green[800]} />
          </View>
          <View style={styles.cardHeaderCol}>
            <AppText family="primary" weight="bold" style={styles.greenCardTitle}>
              Remind Me After
            </AppText>
            <AppText family="primary" weight="regular" style={styles.cardSubtitle}>
              Get reminded after your session
            </AppText>
          </View>
        </View>

        {/* Dropdown Box */}
        <TouchableOpacity
          style={styles.dropdownBox}
          activeOpacity={0.7}
          onPress={() => handleOpenModal('after')}
        >
          <AppText family="primary" weight="medium" style={[styles.dropdownText, { color: colors.green[800] }]}>
            {remindAfter}
          </AppText>
          <ChevronDown size={normalize(16)} color={colors.green[800]} />
        </TouchableOpacity>

        {/* Date Row Bottom */}
        <TouchableOpacity
          style={styles.dateTagRow}
          activeOpacity={0.7}
          onPress={() => handleOpenModal('after')}
        >
          <Calendar size={normalize(12)} color="#64748B" style={{ marginRight: normalize(4) }} />
          <AppText family="primary" weight="regular" style={styles.dateTagText}>
            Date: {afterDate}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Custom Reminder Modal */}
      <CustomReminderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmCustom}
        initialDate={activeTarget === 'before' ? beforeDate : afterDate}
        initialTime="11:00 AM"
      />

      {/* Notification Type Section */}
      <View style={styles.notificationTypeSection}>
        <AppText family="primary" weight="bold" style={styles.subHeading}>
          Notification Type
        </AppText>
        <View style={styles.notificationButtonsRow}>
          {/* Push Notification */}
          <TouchableOpacity
            style={[
              styles.notificationBtn,
              notificationType === 'push' && styles.notificationBtnActive,
            ]}
            onPress={() => setNotificationType('push')}
            activeOpacity={0.7}
          >
            <Bell
              size={normalize(14)}
              color={notificationType === 'push' ? '#1D64B5' : '#64748B'}
              style={styles.notifIcon}
            />
            <AppText
              family="primary"
              weight="medium"
              style={[
                styles.notificationBtnText,
                notificationType === 'push' && styles.notificationBtnTextActive,
              ]}
            >
              {'Push\nNotification'}
            </AppText>
          </TouchableOpacity>

          {/* SMS */}
          <TouchableOpacity
            style={[
              styles.notificationBtn,
              notificationType === 'sms' && styles.notificationBtnActive,
            ]}
            onPress={() => setNotificationType('sms')}
            activeOpacity={0.7}
          >
            <MessageSquare
              size={normalize(14)}
              color={notificationType === 'sms' ? '#1D64B5' : '#64748B'}
              style={styles.notifIcon}
            />
            <AppText
              family="primary"
              weight="medium"
              style={[
                styles.notificationBtnText,
                notificationType === 'sms' && styles.notificationBtnTextActive,
              ]}
            >
              SMS
            </AppText>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            style={[
              styles.notificationBtn,
              notificationType === 'email' && styles.notificationBtnActive,
            ]}
            onPress={() => setNotificationType('email')}
            activeOpacity={0.7}
          >
            <Mail
              size={normalize(14)}
              color={notificationType === 'email' ? '#1D64B5' : '#64748B'}
              style={styles.notifIcon}
            />
            <AppText
              family="primary"
              weight="medium"
              style={[
                styles.notificationBtnText,
                notificationType === 'email' && styles.notificationBtnTextActive,
              ]}
            >
              Email
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reason For Continuation Section */}
      <View style={styles.continuationSection}>
        <AppText family="primary" weight="bold" style={styles.continuationHeading}>
          REASON FOR CONTINUATION
        </AppText>
        <View style={styles.continuationInputBox}>
          <TextInput
            style={styles.continuationInput}
            placeholder="Enter specific goals for next therapy phase..."
            placeholderTextColor="#94A3B8"
            multiline={true}
            value={continuationReason}
            onChangeText={setContinuationReason}
            textAlignVertical="top"
          />
          <ChevronDown size={normalize(16)} color="#94A3B8" style={styles.inputChevron} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(8),
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
  },
  toggleLabel: {
    fontSize: normalize(13),
    color: '#1E293B',
  },
  reminderCard: {
    borderWidth: 1,
    borderColor: '#C6CFD8',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
    borderRadius: normalize(12),
    padding: normalize(14),
    marginBottom: normalize(20),
    backgroundColor: '#FFFFFF',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  blueBellWrapper: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(8),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  greenBellWrapper: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(8),
    backgroundColor: colors.green[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(10),
  },
  cardHeaderCol: {
    flex: 1,
  },
  blueCardTitle: {
    fontSize: normalize(13),
    color: colors.blue[600],
    marginBottom: normalize(2),
  },
  greenCardTitle: {
    fontSize: normalize(13),
    color: '#065F46',
    marginBottom: normalize(2),
  },
  cardSubtitle: {
    fontSize: normalize(10.5),
    color: colors.tintsGrey[600],
  },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#C6CFD8',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(10),
    marginBottom: normalize(10),
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: normalize(12),
    color: colors.blue[600],
  },
  dateTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dateTagText: {
    fontSize: normalize(10),
    color: colors.typographyColor.Medium,
  },
  selectedSlotCard: {
    backgroundColor: colors.blue[300],
    borderRadius: normalize(12),
    padding: normalize(20),
    marginBottom: normalize(20),
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
  slotCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(12),
  },
  slotCardTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotCardTitle: {
    fontSize: normalize(14),
    color: '#FFFFFF',
    marginBottom: normalize(1),
  },
  slotCardDate: {
    fontSize: normalize(11),
    color: 'rgba(255,255,255,0.85)',
  },
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green[100],
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(12),
  },
  confirmedBadgeText: {
    fontSize: normalize(10),
    color: colors.green[800],
  },
  innerTimeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue[100],
    borderRadius: normalize(10),
    paddingVertical: normalize(10),
  },
  innerTimeText: {
    fontSize: normalize(15),
    color: colors.typographyColor['Dark 2'],
  },
  notificationTypeSection: {
    marginBottom: normalize(16),
  },
  subHeading: {
    fontSize: normalize(13),
    color: '#1E293B',
    marginBottom: normalize(10),
  },
  notificationButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(8),
    marginHorizontal: normalize(3),
    backgroundColor: '#FFFFFF',
  },
  notificationBtnActive: {
    borderWidth: 2,
    borderColor: colors.blue[500],
    backgroundColor: colors.blue[50],
  },
  notifIcon: {
    marginRight: normalize(4),
  },
  notificationBtnText: {
    fontSize: normalize(10),
    color: colors.typographyColor.Black,
    textAlign: 'left',
  },
  notificationBtnTextActive: {
    color: '#1D64B5',
  },
  continuationSection: {
    marginBottom: normalize(8),
  },
  continuationHeading: {
    fontSize: normalize(12),
    color: '#1E293B',
    letterSpacing: 0.5,
    marginBottom: normalize(8),
  },
  continuationInputBox: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: normalize(12),
    backgroundColor: '#FFFFFF',
    padding: normalize(12),
    minHeight: normalize(110),
  },
  continuationInput: {
    fontSize: normalize(12),
    color: '#1E293B',
    paddingRight: normalize(20),
  },
  inputChevron: {
    position: 'absolute',
    top: normalize(12),
    right: normalize(12),
  },
});
