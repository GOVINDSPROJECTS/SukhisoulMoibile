import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TextInput, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Calendar, User2 } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import { DcHeader } from '../components/DcHeader';
import { PrivacyNote } from '../../not-the-right-fit/components/PrivacyNote';
import { CommonContinueButton } from '../../../components/atoms/CommonContinueButton';

export const DcNameDobScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[50] }} />

      <DcHeader
        title="Data Collection"
        currentStep={1}
        totalSteps={4}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <User2 size={normalize(32)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
          </View>
        </View>

        <AppText variant="body" family="secondary" weight="medium" style={styles.questionText}>
          What is your full name?
        </AppText>

        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor={colors.tintsGrey[400]}
          value={name}
          onChangeText={setName}
        />

        <View style={styles.questionRow}>
          <Calendar size={normalize(18)} color={colors.typographyColor['Dark 2']} strokeWidth={2} />
          <AppText variant="body" family="secondary" weight="medium" style={styles.questionTextRow}>
            What is your date of birth?
          </AppText>
        </View>

        <Pressable onPress={() => setShowDatePicker(true)}>
          <View pointerEvents="none">
            <TextInput
              style={styles.input}
              placeholder="DD / MM / YYYY"
              placeholderTextColor={colors.tintsGrey[400]}
              value={dob ? formatDate(dob) : ''}
              editable={false}
            />
          </View>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={dob ?? new Date(2000, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(Platform.OS === 'ios');

              if (selectedDate) {
                setDob(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.spacer} />

        <PrivacyNote />

        <CommonContinueButton
          label="Continue"
          onPress={() => navigation.navigate('DcGender')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(40),
    flexGrow: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: normalize(15),
    marginBottom: normalize(20),
  },
  iconCircle: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(99),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(18),
    textAlign: 'center',
    marginBottom: normalize(32),
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(10),
    marginTop: normalize(25),
    marginBottom: normalize(20),
  },
  questionTextRow: {
    color: colors.typographyColor['Theme Medium'],
    fontSize: normalize(15),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
    borderRadius: normalize(10),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16),
    fontSize: normalize(13),
    fontFamily: 'Outfit-Regular',
    color: colors.typographyColor.Black,
    backgroundColor: '#FFFFFF',
  },
  spacer: {
    flex: 1,
    minHeight: normalize(40),
  },
});
