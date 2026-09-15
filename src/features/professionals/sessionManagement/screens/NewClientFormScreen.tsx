import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const NewClientFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('Riya Mehta');
  const [dob, setDob] = useState('15 Aug 1995');
  const [email, setEmail] = useState('riya.mehta@email.com');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [phoneNum, setPhoneNum] = useState('98765 43210');
  const [gender, setGender] = useState('Female');
  const [language, setLanguage] = useState('English');
  const [occupation, setOccupation] = useState('Marketing Manager');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [address, setAddress] = useState('12, Green Park, South Delhi, Delhi - 110016');

  const genderOptions = ['Female', 'Male', 'Non-Binary', 'Other'];
  const languageOptions = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Spanish', 'French'];
  const maritalOptions = ['Single', 'Married', 'Divorced', 'Widowed'];

  const Label = ({ text }: { text: string }) => (
    <AppText family="primary" weight="semiBold" style={styles.labelText}>
      {text}
    </AppText>
  );

  const DropdownInput = ({ value, options, onSelect }: { value: string, options: string[], onSelect: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <TouchableOpacity
          style={[styles.inputContainer, isOpen && styles.inputContainerOpen]}
          activeOpacity={0.7}
          onPress={() => setIsOpen(!isOpen)}
        >
          <AppText family="primary" weight="medium" style={styles.inputValue}>
            {value}
          </AppText>
          <ChevronDown size={normalize(16)} color={colors.typographyColor.Medium} style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }} />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.inlineDropdownMenu}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.dropdownItem,
                  index !== options.length - 1 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }
                ]}
                onPress={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                <AppText family="primary" weight="medium" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
                  {item}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightTints.blueLightTint[50]} translucent={false} />
      <View style={{ paddingTop: insets.top }} />

      {/* Header Block */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
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
            Dashboard
          </AppText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
      >
        <LinearGradient
          colors={[
            colors.tintsBlue[400],
            colors.appThemeColor[75],
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.1 }}
          style={styles.gradientBg}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.breadcrumbRow}>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Light }}>
                New Session
              </AppText>
              <AppText family="primary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Light, marginHorizontal: normalize(4) }}>
                •
              </AppText>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(10), color: colors.purple[700] }}>
                Create New
              </AppText>
            </View>

            <AppText family="primary" weight="black" style={{ fontSize: normalize(24), color: colors.typographyColor.Dark, marginTop: normalize(4) }}>
              New Session
            </AppText>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: colors.typographyColor.Dark, marginBottom: normalize(4) }}>
              Client Details
            </AppText>
            <AppText family="primary" weight="medium" style={{ fontSize: normalize(11), color: colors.typographyColor.Medium, marginBottom: normalize(20) }}>
              Fill in the client's information to create a new profile.
            </AppText>

            <View style={styles.fieldGroup}>
              <Label text="FULL NAME *" />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholderTextColor={colors.typographyColor.Light}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="DATE OF BIRTH *" />
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={dob}
                  onChangeText={setDob}
                  placeholderTextColor={colors.typographyColor.Light}
                />
                <Image
                  source={require('../assets/calender.png')}
                  style={{ width: normalize(16), height: normalize(16), tintColor: colors.typographyColor.Medium }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="EMAIL ADDRESS *" />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={colors.typographyColor.Light}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="PHONE NUMBER *" />
              <View style={styles.phoneRow}>
                <View style={[styles.inputContainer, styles.phoneCode]}>
                  <TextInput
                    style={styles.textInput}
                    value={phoneCode}
                    onChangeText={setPhoneCode}
                    keyboardType="phone-pad"
                    placeholderTextColor={colors.typographyColor.Light}
                  />
                </View>
                <View style={[styles.inputContainer, styles.phoneNum]}>
                  <TextInput
                    style={styles.textInput}
                    value={phoneNum}
                    onChangeText={setPhoneNum}
                    keyboardType="phone-pad"
                    placeholderTextColor={colors.typographyColor.Light}
                  />
                </View>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="GENDER *" />
              <DropdownInput value={gender} options={genderOptions} onSelect={setGender} />
            </View>

            <View style={styles.fieldGroup}>
              <Label text="PREFERRED LANGUAGE" />
              <DropdownInput value={language} options={languageOptions} onSelect={setLanguage} />
            </View>

            <View style={styles.fieldGroup}>
              <Label text="OCCUPATION" />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={occupation}
                  onChangeText={setOccupation}
                  placeholderTextColor={colors.typographyColor.Light}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Label text="MARITAL STATUS" />
              <DropdownInput value={maritalStatus} options={maritalOptions} onSelect={setMaritalStatus} />
            </View>

            <View style={styles.fieldGroup}>
              <Label text="ADDRESS / NOTES" />
              <View style={[styles.inputContainer, { height: normalize(80), alignItems: 'flex-start', paddingTop: normalize(12) }]}>
                <TextInput
                  style={[styles.textInput, { textAlignVertical: 'top' }]}
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  placeholderTextColor={colors.typographyColor.Light}
                />
              </View>
            </View>
          </View>

          {/* Generate Client ID Button */}
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.purple[700] }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ClientIdGeneratedScreen')}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(14), color: '#FFFFFF', marginRight: normalize(8) }}>
              Generate Client ID
            </AppText>
            <Image
              source={require('../assets/right.png')}
              style={{ width: normalize(16), height: normalize(16), tintColor: '#FFFFFF' }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  headerGradient: { paddingBottom: normalize(12) },
  headerContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: normalize(20), paddingVertical: normalize(14),
  },
  backButton: { padding: normalize(4) },
  headerTitle: { fontSize: normalize(15), color: '#155B92' },
  headerRight: { width: normalize(24) },
  scrollContent: {
  },
  gradientBg: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
  },


  titleSection: { marginBottom: normalize(20) },
  breadcrumbRow: { flexDirection: 'row', alignItems: 'center' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(20),
    marginBottom: normalize(24),
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3,
  },

  fieldGroup: { marginBottom: normalize(16) },
  labelText: {
    fontSize: normalize(10), color: colors.typographyColor.Light,
    textTransform: 'uppercase', marginBottom: normalize(8),
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#E8ECEF',
    borderRadius: normalize(8),
    height: normalize(48), paddingHorizontal: normalize(14),
  },
  inputContainerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  textInput: {
    flex: 1, fontFamily: 'Outfit-Medium', fontSize: normalize(13), color: colors.appThemeColor[800],
    padding: 0,
  },
  inputValue: {
    fontSize: normalize(13), color: colors.appThemeColor[800],
  },
  phoneRow: { flexDirection: 'row', gap: normalize(12) },
  phoneCode: { flex: 0.25 },
  phoneNum: { flex: 0.75 },

  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: normalize(52), borderRadius: normalize(16),
  },

  inlineDropdownMenu: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E8ECEF',
    borderTopWidth: 0,
    borderBottomLeftRadius: normalize(8),
    borderBottomRightRadius: normalize(8),
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: normalize(12), paddingHorizontal: normalize(14),
  },
});
