import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import {
  ChevronDown,
  X,
  Plus,
  Calendar,
  Clock,
  Check,
} from 'lucide-react-native';

interface SessionFormInputsProps {
  formData: {
    sessionDate: string;
    startTime: string;
    duration: string;
    recurrence: string;
    reason: string;
    notes: string;
    focusAreas: string[];
  };
  setFormData: (data: any) => void;
  errors: { [key: string]: string };
}

const PRESET_TAGS = [
  'Anxiety',
  'CBT',
  'Stress',
  'Depression',
  'Trauma',
  'Mindfulness',
  'Sleep',
  'Self-Esteem',
  'Relationships',
  'Work-Life Balance',
  'Burnout',
  'Grief',
];

const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strHours = hours.toString().padStart(2, '0');
  return `${strHours}:${minutes} ${ampm}`;
};

const parseDateString = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const parsed = new Date(year, month, day);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  const fallback = new Date(dateStr);
  return isNaN(fallback.getTime()) ? new Date() : fallback;
};

const parseTimeString = (timeStr: string): Date => {
  const now = new Date();
  if (!timeStr) return now;
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3]?.toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  }
  return now;
};

export const SessionFormInputs: React.FC<SessionFormInputsProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const { colors } = useTheme();
  const inputBg = colors.purple[50];

  // Dropdown states
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [showRecurrencePicker, setShowRecurrencePicker] = useState(false);

  // Date & Time Picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(parseDateString(formData.sessionDate));
  const [tempTime, setTempTime] = useState<Date>(parseTimeString(formData.startTime));

  // Tag Modal states
  const [showTagModal, setShowTagModal] = useState(false);
  const [customTagInput, setCustomTagInput] = useState('');

  const durationOptions = [
    '30 Minutes',
    '50 Minutes (Standard)',
    '60 Minutes',
    '90 Minutes',
  ];
  const recurrenceOptions = [
    'One-time Session',
    'Weekly',
    'Bi-weekly',
    'Monthly',
  ];

  // Date picker handlers
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setFormData({
          ...formData,
          sessionDate: formatDate(selectedDate),
        });
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleIosDateConfirm = () => {
    setFormData({
      ...formData,
      sessionDate: formatDate(tempDate),
    });
    setShowDatePicker(false);
  };

  // Time picker handlers
  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      if (event.type === 'set' && selectedTime) {
        setFormData({
          ...formData,
          startTime: formatTime(selectedTime),
        });
      }
    } else {
      if (selectedTime) {
        setTempTime(selectedTime);
      }
    }
  };

  const handleIosTimeConfirm = () => {
    setFormData({
      ...formData,
      startTime: formatTime(tempTime),
    });
    setShowTimePicker(false);
  };

  // Tag toggle/add/remove handlers
  const handleToggleTag = (tag: string) => {
    const isSelected = formData.focusAreas.includes(tag);
    if (isSelected) {
      setFormData({
        ...formData,
        focusAreas: formData.focusAreas.filter((t) => t !== tag),
      });
    } else {
      if (formData.focusAreas.length >= 3) {
        Alert.alert('Limit Reached', 'You can select a maximum of 3 focus areas.');
        return;
      }
      setFormData({
        ...formData,
        focusAreas: [...formData.focusAreas, tag],
      });
    }
  };

  const handleAddCustomTag = () => {
    const trimmed = customTagInput.trim();
    if (!trimmed) return;

    if (formData.focusAreas.includes(trimmed)) {
      setCustomTagInput('');
      return;
    }

    if (formData.focusAreas.length >= 3) {
      Alert.alert('Limit Reached', 'You can select a maximum of 3 focus areas.');
      return;
    }

    setFormData({
      ...formData,
      focusAreas: [...formData.focusAreas, trimmed],
    });
    setCustomTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      focusAreas: formData.focusAreas.filter((t) => t !== tagToRemove),
    });
  };

  const renderDropdownList = (
    visible: boolean,
    options: string[],
    selectedValue: string,
    onSelect: (val: string) => void,
    closeDropdown: () => void,
  ) => {
    if (!visible) return null;
    return (
      <View style={styles.dropdownList}>
        {options.map((option, idx) => {
          const isSelected = selectedValue === option;
          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.dropdownOption,
                idx === options.length - 1 && { borderBottomWidth: 0 },
                isSelected && { backgroundColor: colors.purple[50] },
              ]}
              onPress={() => {
                onSelect(option);
                closeDropdown();
              }}
              activeOpacity={0.7}
            >
              <AppText
                family="primary"
                weight={isSelected ? 'bold' : 'medium'}
                style={{
                  fontSize: normalize(13),
                  color: isSelected ? colors.purple[700] : colors.typographyColor.Dark,
                }}
              >
                {option}
              </AppText>
              {isSelected && <Check size={normalize(16)} color={colors.purple[700]} />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const Label = ({
    text,
    required = false,
    errorText,
  }: {
    text: string;
    required?: boolean;
    errorText?: string;
  }) => (
    <View style={styles.labelRow}>
      <AppText
        family="primary"
        weight="semiBold"
        style={{
          fontSize: normalize(10),
          color: errorText ? '#D32F2F' : colors.typographyColor.Medium,
          textTransform: 'uppercase',
        }}
      >
        {text}
      </AppText>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {errorText && (
          <AppText
            family="primary"
            weight="medium"
            style={{ fontSize: normalize(9), color: '#D32F2F', marginRight: normalize(8) }}
          >
            {errorText}
          </AppText>
        )}
        {required && (
          <View style={styles.requiredBadge}>
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(8), color: '#FFFFFF' }}>
              Required
            </AppText>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Date & Time Row */}
      <View style={styles.row}>
        {/* Session Date Picker */}
        <View style={styles.halfWidth}>
          <Label text="Session Date" required errorText={errors.sessionDate} />
          <TouchableOpacity
            style={[
              styles.inputBox,
              styles.pickerButton,
              { backgroundColor: inputBg },
              errors.sessionDate ? styles.errorBorder : null,
            ]}
            activeOpacity={0.7}
            onPress={() => {
              setTempDate(parseDateString(formData.sessionDate));
              setShowDatePicker(true);
              setShowDurationPicker(false);
              setShowRecurrencePicker(false);
            }}
          >
            <AppText
              family="primary"
              weight="semiBold"
              style={{
                fontSize: normalize(12.5),
                color: formData.sessionDate
                  ? colors.typographyColor.Dark
                  : colors.typographyColor.Light,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {formData.sessionDate || 'Select Date'}
            </AppText>
            <Calendar size={normalize(16)} color={colors.purple[700]} />
          </TouchableOpacity>
        </View>

        {/* Start Time Picker */}
        <View style={styles.halfWidth}>
          <Label text="Start Time" required errorText={errors.startTime} />
          <TouchableOpacity
            style={[
              styles.inputBox,
              styles.pickerButton,
              { backgroundColor: inputBg },
              errors.startTime ? styles.errorBorder : null,
            ]}
            activeOpacity={0.7}
            onPress={() => {
              setTempTime(parseTimeString(formData.startTime));
              setShowTimePicker(true);
              setShowDurationPicker(false);
              setShowRecurrencePicker(false);
            }}
          >
            <AppText
              family="primary"
              weight="semiBold"
              style={{
                fontSize: normalize(12.5),
                color: formData.startTime
                  ? colors.typographyColor.Dark
                  : colors.typographyColor.Light,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {formData.startTime || 'Select Time'}
            </AppText>
            <Clock size={normalize(16)} color={colors.purple[700]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Android Date Picker */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={parseDateString(formData.sessionDate)}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* iOS Date Picker Modal */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showDatePicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.iosPickerContainer}>
            <View style={styles.iosPickerHeader}>
              <AppText family="primary" weight="bold" style={styles.pickerModalTitle}>
                Select Session Date
              </AppText>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <X size={normalize(20)} color={colors.typographyColor.Dark} />
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
            <TouchableOpacity
              style={[styles.doneBtn, { backgroundColor: colors.purple[700] }]}
              onPress={handleIosDateConfirm}
            >
              <AppText
                family="primary"
                weight="bold"
                style={{ color: '#FFFFFF', fontSize: normalize(14) }}
              >
                Done
              </AppText>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Android Time Picker */}
      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePicker
          value={parseTimeString(formData.startTime)}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* iOS Time Picker Modal */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showTimePicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowTimePicker(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowTimePicker(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.iosPickerContainer}>
            <View style={styles.iosPickerHeader}>
              <AppText family="primary" weight="bold" style={styles.pickerModalTitle}>
                Select Start Time
              </AppText>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <X size={normalize(20)} color={colors.typographyColor.Dark} />
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempTime}
              mode="time"
              display="spinner"
              is24Hour={false}
              onChange={handleTimeChange}
            />
            <TouchableOpacity
              style={[styles.doneBtn, { backgroundColor: colors.purple[700] }]}
              onPress={handleIosTimeConfirm}
            >
              <AppText
                family="primary"
                weight="bold"
                style={{ color: '#FFFFFF', fontSize: normalize(14) }}
              >
                Done
              </AppText>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Duration Field */}
      <View style={[styles.field, { zIndex: showDurationPicker ? 20 : 2 }]}>
        <Label text="Duration" />
        <TouchableOpacity
          style={[
            styles.inputBox,
            {
              backgroundColor: inputBg,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
          activeOpacity={0.7}
          onPress={() => {
            setShowDurationPicker(!showDurationPicker);
            setShowRecurrencePicker(false);
          }}
        >
          <AppText
            family="primary"
            weight="semiBold"
            style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}
          >
            {formData.duration}
          </AppText>
          <ChevronDown
            size={normalize(18)}
            color={colors.typographyColor.Medium}
            style={{
              transform: [{ rotate: showDurationPicker ? '180deg' : '0deg' }],
            }}
          />
        </TouchableOpacity>
        {renderDropdownList(
          showDurationPicker,
          durationOptions,
          formData.duration,
          (val) => setFormData({ ...formData, duration: val }),
          () => setShowDurationPicker(false),
        )}
      </View>

      {/* Recurrence Field */}
      <View style={[styles.field, { zIndex: showRecurrencePicker ? 20 : 1 }]}>
        <Label text="Recurrence" />
        <TouchableOpacity
          style={[
            styles.inputBox,
            {
              backgroundColor: inputBg,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
          activeOpacity={0.7}
          onPress={() => {
            setShowRecurrencePicker(!showRecurrencePicker);
            setShowDurationPicker(false);
          }}
        >
          <AppText
            family="primary"
            weight="semiBold"
            style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}
          >
            {formData.recurrence}
          </AppText>
          <ChevronDown
            size={normalize(18)}
            color={colors.typographyColor.Medium}
            style={{
              transform: [{ rotate: showRecurrencePicker ? '180deg' : '0deg' }],
            }}
          />
        </TouchableOpacity>
        {renderDropdownList(
          showRecurrencePicker,
          recurrenceOptions,
          formData.recurrence,
          (val) => setFormData({ ...formData, recurrence: val }),
          () => setShowRecurrencePicker(false),
        )}
      </View>

      {/* Focus Areas (Tags) */}
      <View style={styles.field}>
        <View style={styles.labelRow}>
          <AppText
            family="primary"
            weight="semiBold"
            style={{
              fontSize: normalize(10),
              color: colors.typographyColor.Medium,
              textTransform: 'uppercase',
            }}
          >
            Focus Areas (Max 3)
          </AppText>
          <AppText
            family="primary"
            weight="medium"
            style={{
              fontSize: normalize(10),
              color:
                formData.focusAreas.length >= 3
                  ? colors.purple[700]
                  : colors.typographyColor.Light,
            }}
          >
            {formData.focusAreas.length}/3 Selected
          </AppText>
        </View>

        <View style={styles.tagsContainer}>
          {formData.focusAreas.map((area, index) => (
            <View
              key={index}
              style={[styles.tag, { backgroundColor: colors.purple[100] }]}
            >
              <AppText
                family="primary"
                weight="semiBold"
                style={{ fontSize: normalize(12), color: colors.purple[800] }}
              >
                {area}
              </AppText>
              <TouchableOpacity
                style={styles.tagClose}
                activeOpacity={0.5}
                onPress={() => handleRemoveTag(area)}
              >
                <X size={normalize(12)} color={colors.purple[800]} />
              </TouchableOpacity>
            </View>
          ))}

          {formData.focusAreas.length < 3 && (
            <TouchableOpacity
              style={[
                styles.addTag,
                { borderColor: colors.purple[300] || colors.typographyColor.Light },
              ]}
              activeOpacity={0.6}
              onPress={() => setShowTagModal(true)}
            >
              <Plus size={normalize(13)} color={colors.purple[700]} />
              <AppText
                family="primary"
                weight="semiBold"
                style={{
                  fontSize: normalize(12),
                  color: colors.purple[700],
                  marginLeft: normalize(4),
                }}
              >
                Add Tag
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Focus Areas Selection Modal */}
      <Modal
        visible={showTagModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTagModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowTagModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.tagModalContainer}>
          <View style={styles.tagModalHeader}>
            <View>
              <AppText family="primary" weight="bold" style={styles.modalTitle}>
                Select Focus Areas
              </AppText>
              <AppText
                family="primary"
                weight="regular"
                style={{
                  fontSize: normalize(11.5),
                  color: colors.typographyColor.Light,
                  marginTop: normalize(2),
                }}
              >
                Choose up to 3 focus areas ({formData.focusAreas.length}/3 selected)
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => setShowTagModal(false)}
              style={styles.modalCloseBtn}
            >
              <X size={normalize(20)} color={colors.typographyColor.Dark} />
            </TouchableOpacity>
          </View>

          {/* Custom Tag Input */}
          <View style={[styles.customTagInputRow, { backgroundColor: inputBg }]}>
            <TextInput
              style={[styles.customTextInput, { color: colors.typographyColor.Dark }]}
              placeholder="Type a custom focus area..."
              placeholderTextColor={colors.typographyColor.Light}
              value={customTagInput}
              onChangeText={setCustomTagInput}
              onSubmitEditing={handleAddCustomTag}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[
                styles.customAddBtn,
                {
                  backgroundColor: customTagInput.trim()
                    ? colors.purple[700]
                    : colors.purple[200],
                },
              ]}
              activeOpacity={0.7}
              onPress={handleAddCustomTag}
              disabled={!customTagInput.trim()}
            >
              <Plus size={normalize(16)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Preset Suggestions */}
          <AppText
            family="primary"
            weight="semiBold"
            style={{
              fontSize: normalize(11),
              color: colors.typographyColor.Medium,
              textTransform: 'uppercase',
              marginBottom: normalize(10),
            }}
          >
            Popular Focus Areas
          </AppText>

          <View style={styles.presetsGrid}>
            {PRESET_TAGS.map((tag, idx) => {
              const isSelected = formData.focusAreas.includes(tag);
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.presetChip,
                    isSelected
                      ? {
                          backgroundColor: colors.purple[700],
                          borderColor: colors.purple[700],
                        }
                      : {
                          backgroundColor: '#FFFFFF',
                          borderColor: colors.purple[200] || '#E0E0E0',
                        },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handleToggleTag(tag)}
                >
                  {isSelected && (
                    <Check
                      size={normalize(12)}
                      color="#FFFFFF"
                      style={{ marginRight: normalize(4) }}
                    />
                  )}
                  <AppText
                    family="primary"
                    weight={isSelected ? 'bold' : 'medium'}
                    style={{
                      fontSize: normalize(11.5),
                      color: isSelected ? '#FFFFFF' : colors.typographyColor.Dark,
                    }}
                  >
                    {tag}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Modal Done Button */}
          <TouchableOpacity
            style={[styles.doneBtn, { backgroundColor: colors.purple[700] }]}
            activeOpacity={0.8}
            onPress={() => setShowTagModal(false)}
          >
            <AppText
              family="primary"
              weight="bold"
              style={{ color: '#FFFFFF', fontSize: normalize(14) }}
            >
              Done ({formData.focusAreas.length}/3)
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Reason for session */}
      <View style={styles.field}>
        <Label text="Reason for Session" required errorText={errors.reason} />
        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: inputBg,
              minHeight: normalize(64),
              alignItems: 'flex-start',
              paddingTop: normalize(12),
              paddingBottom: normalize(12),
            },
            errors.reason ? styles.errorBorder : null,
          ]}
        >
          <TextInput
            style={[styles.textInput, { color: colors.typographyColor.Dark }]}
            placeholder="e.g. Workplace anxiety follow-up, cognitive assessment..."
            placeholderTextColor={colors.typographyColor.Light}
            multiline
            value={formData.reason}
            onChangeText={(text) => setFormData({ ...formData, reason: text })}
          />
        </View>
      </View>

      {/* Additional Notes */}
      <View style={styles.field}>
        <Label text="Additional Notes & Observations" />
        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: inputBg,
              minHeight: normalize(80),
              alignItems: 'flex-start',
              paddingTop: normalize(12),
              paddingBottom: normalize(12),
            },
          ]}
        >
          <TextInput
            style={[styles.textInput, { color: colors.typographyColor.Dark }]}
            placeholder="Note specific observations from intake or previous follow-ups..."
            placeholderTextColor={colors.typographyColor.Light}
            multiline
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
  },
  halfWidth: {
    width: '48%',
  },
  field: {
    marginBottom: normalize(16),
    position: 'relative',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  requiredBadge: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2),
    borderRadius: normalize(4),
  },
  inputBox: {
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    minHeight: normalize(48),
    justifyContent: 'center',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(13),
    flex: 1,
    width: '100%',
    textAlignVertical: 'top',
    padding: 0,
    margin: 0,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(7),
    borderRadius: normalize(20),
    marginRight: normalize(8),
    marginBottom: normalize(8),
  },
  tagClose: {
    marginLeft: normalize(6),
    padding: normalize(2),
  },
  addTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(7),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: normalize(8),
    backgroundColor: '#FFFFFF',
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  dropdownList: {
    position: 'absolute',
    top: normalize(72),
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    overflow: 'hidden',
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  iosPickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    paddingBottom: normalize(32),
  },
  iosPickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(12),
  },
  pickerModalTitle: {
    fontSize: normalize(16),
  },
  doneBtn: {
    borderRadius: normalize(12),
    paddingVertical: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(12),
  },
  tagModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(24),
    borderTopRightRadius: normalize(24),
    paddingHorizontal: normalize(20),
    paddingTop: normalize(18),
    paddingBottom: normalize(32),
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  tagModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
  },
  modalTitle: {
    fontSize: normalize(16),
  },
  modalCloseBtn: {
    padding: normalize(4),
  },
  customTagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(12),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(4),
    marginBottom: normalize(18),
  },
  customTextInput: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(13),
    flex: 1,
    paddingVertical: normalize(8),
  },
  customAddBtn: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(8),
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(8),
    marginBottom: normalize(16),
  },
  presetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(7),
    borderRadius: normalize(20),
    borderWidth: 1,
  },
});
