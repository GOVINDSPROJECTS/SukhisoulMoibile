import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Modal,
    ScrollView,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    ChevronDown,
    Check,
    Calendar as CalendarIcon,
    MapPin,
    X,
    CheckSquare,
    Square,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { PersonalInfoData } from './PersonalInfoView';

// ─── Country Codes JSON ───────────────────────────────────────────────────────

export interface CountryCodeItem {
    code: string;
    country: string;
    flag: string;
}

export const COUNTRY_CODES: CountryCodeItem[] = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
];

// ─── Options ──────────────────────────────────────────────────────────────────

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const RELATIONSHIP_OPTIONS = [
    'Single',
    'In a relationship',
    'Engaged',
    'Married',
    'Separated',
    'Divorced',
    'Widowed',
    'Prefer not to say',
];

const LANGUAGE_OPTIONS = [
    'English',
    'Hindi',
    'Marathi',
    'Gujarati',
    'Bengali',
    'Tamil',
    'Telugu',
    'Kannada',
    'Malayalam',
    'Punjabi',
    'Odia',
    'Urdu',
    'Spanish',
    'French',
    'German',
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditPersonalInfoFormProps {
    data: PersonalInfoData;
    onSave: (updated: PersonalInfoData) => void;
    onCancel?: () => void;
}

interface InputBoxProps {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}

const InputWrapper: React.FC<InputBoxProps> = ({ label, required, children }) => (
    <View style={styles.fieldWrapper}>
        <AppText weight="medium" family="secondary" style={styles.fieldLabel} color={colors.typographyColor.Medium}>
            {label}
            {required && <AppText color={colors.error || '#FF3B30'}> *</AppText>}
        </AppText>
        {children}
    </View>
);

// ─── Main Form Component ──────────────────────────────────────────────────────

export const EditPersonalInfoForm: React.FC<EditPersonalInfoFormProps> = ({
    data,
    onSave,
}) => {
    const [form, setForm] = useState<PersonalInfoData>({ ...data });

    // Modals visibility states
    const [showDobPicker, setShowDobPicker] = useState(false);
    const [showCountryPicker, setShowCountryPicker] = useState<'phone' | 'emergency' | null>(null);
    const [showRelationshipPicker, setShowRelationshipPicker] = useState(false);
    const [showLanguagePicker, setShowLanguagePicker] = useState(false);

    // Selected languages in multi-select mode
    const selectedLanguages = useMemo(() => {
        if (!form.preferredLanguage) return [];
        return form.preferredLanguage
            .split(',')
            .map((lang) => lang.trim())
            .filter(Boolean);
    }, [form.preferredLanguage]);

    const update = useCallback(<K extends keyof PersonalInfoData>(key: K, value: PersonalInfoData[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleSave = useCallback(() => {
        onSave(form);
    }, [form, onSave]);

    // Parse phone numbers
    const parsePhone = (raw: string) => {
        const parts = (raw || '').trim().split(' ');
        if (parts[0]?.startsWith('+')) {
            return { code: parts[0], number: parts.slice(1).join(' ') };
        }
        return { code: '+91', number: raw || '' };
    };

    const phone = parsePhone(form.phone);
    const emergency = parsePhone(form.emergencyContact);

    // Parse Date of Birth to Date object
    const parseDobDate = (dateStr: string): Date => {
        if (!dateStr) return new Date(1996, 6, 3);
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) return parsed;
        return new Date(1996, 6, 3);
    };

    const formatDob = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    // Toggle multi-select language
    const toggleLanguage = (language: string) => {
        let updated: string[];
        if (selectedLanguages.includes(language)) {
            updated = selectedLanguages.filter((l) => l !== language);
        } else {
            updated = [...selectedLanguages, language];
        }
        update('preferredLanguage', updated.join(', '));
    };

    return (
        <View style={styles.container}>
            {/* Full Name */}
            <InputWrapper label="Full Name" required>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={form.fullName}
                        onChangeText={(v) => update('fullName', v)}
                        placeholder="Enter full name"
                        placeholderTextColor={colors.typographyColor.Light}
                    />
                </View>
            </InputWrapper>

            {/* Email */}
            <InputWrapper label="Email" required>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.textInput, { flex: 1 }]}
                        value={form.email}
                        onChangeText={(v) => update('email', v)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="Enter email"
                        placeholderTextColor={colors.typographyColor.Light}
                    />
                    <View style={styles.verifiedBadge}>
                        <AppText weight="semiBold" family="secondary" style={styles.verifiedText} color={colors.green[500] || '#10B981'}>
                            Verified
                        </AppText>
                        <Check size={normalize(12)} color={colors.green[500] || '#10B981'} strokeWidth={2.5} />
                    </View>
                </View>
            </InputWrapper>

            {/* Phone */}
            <InputWrapper label="Phone" required>
                <View style={styles.phoneRow}>
                    <TouchableOpacity
                        style={styles.countryCodeBox}
                        activeOpacity={0.8}
                        onPress={() => setShowCountryPicker('phone')}
                    >
                        <AppText weight="medium" family="primary" style={styles.countryCodeText} color={colors.typographyColor.Dark}>
                            {phone.code}
                        </AppText>
                        <ChevronDown size={normalize(14)} color={colors.typographyColor.Medium} strokeWidth={2} />
                    </TouchableOpacity>
                    <View style={[styles.inputContainer, styles.phoneInputBox]}>
                        <TextInput
                            style={styles.textInput}
                            value={phone.number}
                            onChangeText={(v) => update('phone', `${phone.code} ${v}`)}
                            keyboardType="phone-pad"
                            placeholder="Phone number"
                            placeholderTextColor={colors.typographyColor.Light}
                        />
                    </View>
                </View>
            </InputWrapper>

            {/* Emergency Contact */}
            <InputWrapper label="Emergency" required>
                <View style={styles.phoneRow}>
                    <TouchableOpacity
                        style={styles.countryCodeBox}
                        activeOpacity={0.8}
                        onPress={() => setShowCountryPicker('emergency')}
                    >
                        <AppText weight="medium" family="primary" style={styles.countryCodeText} color={colors.typographyColor.Dark}>
                            {emergency.code}
                        </AppText>
                        <ChevronDown size={normalize(14)} color={colors.typographyColor.Medium} strokeWidth={2} />
                    </TouchableOpacity>
                    <View style={[styles.inputContainer, styles.phoneInputBox]}>
                        <TextInput
                            style={styles.textInput}
                            value={emergency.number}
                            onChangeText={(v) => update('emergencyContact', `${emergency.code} ${v}`)}
                            keyboardType="phone-pad"
                            placeholder="Emergency contact"
                            placeholderTextColor={colors.typographyColor.Light}
                        />
                    </View>
                </View>
            </InputWrapper>

            {/* Gender */}
            <View style={styles.fieldWrapper}>
                <AppText weight="medium" family="secondary" style={styles.fieldLabel} color={colors.typographyColor.Medium}>
                    Gender
                </AppText>
                <View style={styles.radioRow}>
                    {GENDER_OPTIONS.map((opt) => {
                        const isSelected = form.gender.toLowerCase() === opt.toLowerCase();
                        return (
                            <TouchableOpacity
                                key={opt}
                                style={styles.radioOption}
                                onPress={() => update('gender', opt)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                                    {isSelected && <View style={styles.radioDot} />}
                                </View>
                                <AppText
                                    weight={isSelected ? 'medium' : 'regular'}
                                    family="secondary"
                                    style={styles.radioLabel}
                                    color={colors.typographyColor.Dark}
                                >
                                    {opt}
                                </AppText>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Date of Birth (Past Dates Picker) */}
            <InputWrapper label="Date of Birth">
                <TouchableOpacity
                    style={styles.inputContainer}
                    activeOpacity={0.8}
                    onPress={() => setShowDobPicker(true)}
                >
                    <AppText
                        weight="regular"
                        family="secondary"
                        style={[styles.textInputText, !form.dateOfBirth && { color: colors.typographyColor.Light }]}
                    >
                        {form.dateOfBirth || 'DD Mon YYYY'}
                    </AppText>
                    <CalendarIcon size={normalize(18)} color={colors.typographyColor.Light} strokeWidth={1.8} />
                </TouchableOpacity>
            </InputWrapper>

            {/* Relationship Status (Single Selection Custom Dropdown) */}
            <InputWrapper label="Relationship Status">
                <TouchableOpacity
                    style={[styles.inputContainer, styles.dropdownContainer]}
                    activeOpacity={0.8}
                    onPress={() => setShowRelationshipPicker(true)}
                >
                    <AppText
                        weight="regular"
                        family="secondary"
                        style={[styles.dropdownValueText, !form.relationship && { color: colors.typographyColor.Light }]}
                    >
                        {form.relationship || 'Select relationship status'}
                    </AppText>
                    <ChevronDown size={normalize(18)} color={colors.typographyColor.Light} strokeWidth={2} />
                </TouchableOpacity>
            </InputWrapper>

            {/* Location */}
            <InputWrapper label="Location">
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.textInput, { flex: 1 }]}
                        value={form.location}
                        onChangeText={(v) => update('location', v)}
                        placeholder="City, State"
                        placeholderTextColor={colors.typographyColor.Light}
                    />
                    <MapPin size={normalize(18)} color={colors.blue[400] || '#2E7BFF'} strokeWidth={1.8} />
                </View>
            </InputWrapper>

            {/* Preferred Language (Multiple Selection Custom Dropdown) */}
            <InputWrapper label="Preferred Language">
                <TouchableOpacity
                    style={[styles.inputContainer, styles.dropdownContainer]}
                    activeOpacity={0.8}
                    onPress={() => setShowLanguagePicker(true)}
                >
                    <AppText
                        weight="regular"
                        family="secondary"
                        style={[styles.dropdownValueText, !form.preferredLanguage && { color: colors.typographyColor.Light }]}
                        numberOfLines={1}
                    >
                        {form.preferredLanguage || 'Select languages'}
                    </AppText>
                    <ChevronDown size={normalize(18)} color={colors.typographyColor.Light} strokeWidth={2} />
                </TouchableOpacity>
            </InputWrapper>

            {/* Education */}
            <InputWrapper label="Education">
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={form.education}
                        onChangeText={(v) => update('education', v)}
                        placeholder="Bachelor of Engineering"
                        placeholderTextColor={colors.typographyColor.Light}
                    />
                </View>
            </InputWrapper>

            {/* Career */}
            <InputWrapper label="Career">
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={form.career}
                        onChangeText={(v) => update('career', v)}
                        placeholder="Software Engineer"
                        placeholderTextColor={colors.typographyColor.Light}
                    />
                </View>
            </InputWrapper>

            {/* ── Save Button ────────────────────────────────────────────── */}
            <TouchableOpacity
                onPress={handleSave}
                activeOpacity={0.85}
                style={styles.saveBtnTouch}
            >
                <LinearGradient
                    colors={['#2480C8', '#1C639D']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.saveBtnGradient}
                >
                    <AppText weight="bold" family="primary" style={styles.saveBtnText} color="#FFFFFF">
                        SAVE
                    </AppText>
                </LinearGradient>
            </TouchableOpacity>

            {/* ══════════════════════════════════════════════════════════════════
                MODALS / POPUPS
            ══════════════════════════════════════════════════════════════════ */}

            {/* 1. Date of Birth Calendar Picker (Past Dates Only) */}
            {showDobPicker && (
                Platform.OS === 'ios' ? (
                    <Modal
                        visible={showDobPicker}
                        transparent
                        animationType="slide"
                        onRequestClose={() => setShowDobPicker(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setShowDobPicker(false)}>
                            <View style={styles.modalOverlay} />
                        </TouchableWithoutFeedback>
                        <View style={styles.bottomSheetContainer}>
                            <View style={styles.sheetHeader}>
                                <AppText weight="bold" family="primary" style={styles.sheetTitle}>
                                    Select Date of Birth
                                </AppText>
                                <TouchableOpacity onPress={() => setShowDobPicker(false)}>
                                    <X size={normalize(20)} color={colors.typographyColor.Dark} />
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={parseDobDate(form.dateOfBirth)}
                                mode="date"
                                display="spinner"
                                maximumDate={new Date()}
                                minimumDate={new Date(1920, 0, 1)}
                                onChange={(_, selectedDate) => {
                                    if (selectedDate) {
                                        update('dateOfBirth', formatDob(selectedDate));
                                    }
                                }}
                            />
                            <TouchableOpacity
                                style={styles.sheetDoneBtn}
                                onPress={() => setShowDobPicker(false)}
                            >
                                <AppText weight="bold" color="#FFFFFF">Done</AppText>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                ) : (
                    <DateTimePicker
                        value={parseDobDate(form.dateOfBirth)}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        minimumDate={new Date(1920, 0, 1)}
                        onChange={(event, selectedDate) => {
                            setShowDobPicker(false);
                            if (event.type !== 'dismissed' && selectedDate) {
                                update('dateOfBirth', formatDob(selectedDate));
                            }
                        }}
                    />
                )
            )}

            {/* 2. Country Code Dropdown Modal */}
            <Modal
                visible={showCountryPicker !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setShowCountryPicker(null)}
            >
                <TouchableWithoutFeedback onPress={() => setShowCountryPicker(null)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.sheetHeader}>
                        <AppText weight="bold" family="primary" style={styles.sheetTitle}>
                            Select Country Code
                        </AppText>
                        <TouchableOpacity onPress={() => setShowCountryPicker(null)}>
                            <X size={normalize(20)} color={colors.typographyColor.Dark} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ maxHeight: normalize(260) }} showsVerticalScrollIndicator={false}>
                        {COUNTRY_CODES.map((item) => {
                            const currentCode = showCountryPicker === 'phone' ? phone.code : emergency.code;
                            const isSelected = currentCode === item.code;
                            return (
                                <TouchableOpacity
                                    key={item.country}
                                    style={[styles.modalListItem, isSelected && styles.modalListItemActive]}
                                    onPress={() => {
                                        if (showCountryPicker === 'phone') {
                                            update('phone', `${item.code} ${phone.number}`);
                                        } else if (showCountryPicker === 'emergency') {
                                            update('emergencyContact', `${item.code} ${emergency.number}`);
                                        }
                                        setShowCountryPicker(null);
                                    }}
                                >
                                    <View style={styles.countryRowLeft}>
                                        <AppText style={styles.flagEmoji}>{item.flag}</AppText>
                                        <AppText weight="medium" style={styles.countryNameText}>
                                            {item.country}
                                        </AppText>
                                    </View>
                                    <View style={styles.countryRowRight}>
                                        <AppText weight="semiBold" color={colors.typographyColor['Dark 2'] || '#003CA3'}>
                                            {item.code}
                                        </AppText>
                                        {isSelected && <Check size={normalize(16)} color={colors.green[500]} strokeWidth={2.5} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </Modal>

            {/* 3. Relationship Status Custom Dropdown Modal (Single Selection) */}
            <Modal
                visible={showRelationshipPicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowRelationshipPicker(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowRelationshipPicker(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.sheetHeader}>
                        <AppText weight="bold" family="primary" style={styles.sheetTitle}>
                            Relationship Status
                        </AppText>
                        <TouchableOpacity onPress={() => setShowRelationshipPicker(false)}>
                            <X size={normalize(20)} color={colors.typographyColor.Dark} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ maxHeight: normalize(300) }} showsVerticalScrollIndicator={false}>
                        {RELATIONSHIP_OPTIONS.map((option) => {
                            const isSelected = form.relationship.toLowerCase() === option.toLowerCase();
                            return (
                                <TouchableOpacity
                                    key={option}
                                    style={[styles.modalListItem, isSelected && styles.modalListItemActive]}
                                    onPress={() => {
                                        update('relationship', option);
                                        setShowRelationshipPicker(false);
                                    }}
                                >
                                    <AppText
                                        weight={isSelected ? 'bold' : 'regular'}
                                        style={[styles.modalItemText, isSelected && { color: colors.typographyColor['Dark 2'] || '#003CA3' }]}
                                    >
                                        {option}
                                    </AppText>
                                    {isSelected && <Check size={normalize(16)} color={colors.typographyColor['Dark 2'] || '#003CA3'} strokeWidth={2.5} />}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </Modal>

            {/* 4. Preferred Language Custom Dropdown Modal (Multiple Selection) */}
            <Modal
                visible={showLanguagePicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowLanguagePicker(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowLanguagePicker(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.sheetHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: normalize(8) }}>
                            <AppText weight="bold" family="primary" style={styles.sheetTitle}>
                                Preferred Languages
                            </AppText>
                            {selectedLanguages.length > 0 && (
                                <View style={styles.countBadge}>
                                    <AppText weight="bold" style={styles.countBadgeText} color="#FFFFFF">
                                        {selectedLanguages.length}
                                    </AppText>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => setShowLanguagePicker(false)}>
                            <X size={normalize(20)} color={colors.typographyColor.Dark} />
                        </TouchableOpacity>
                    </View>

                    <AppText variant="caption" color={colors.typographyColor.Light} style={styles.sheetSubtitle}>
                        Select all languages you are comfortable speaking in
                    </AppText>

                    <ScrollView style={{ maxHeight: normalize(280) }} showsVerticalScrollIndicator={false}>
                        {LANGUAGE_OPTIONS.map((language) => {
                            const isChecked = selectedLanguages.includes(language);
                            return (
                                <TouchableOpacity
                                    key={language}
                                    style={[styles.modalListItem, isChecked && styles.modalListItemActive]}
                                    onPress={() => toggleLanguage(language)}
                                    activeOpacity={0.7}
                                >
                                    <AppText
                                        weight={isChecked ? 'semiBold' : 'regular'}
                                        style={[styles.modalItemText, isChecked && { color: colors.typographyColor['Dark 2'] || '#003CA3' }]}
                                    >
                                        {language}
                                    </AppText>
                                    {isChecked ? (
                                        <CheckSquare size={normalize(19)} color={colors.blue[600] || '#1E88E5'} />
                                    ) : (
                                        <Square size={normalize(19)} color={colors.tintsGrey[300] || '#CBD5E1'} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.sheetDoneBtn}
                        onPress={() => setShowLanguagePicker(false)}
                        activeOpacity={0.85}
                    >
                        <AppText weight="bold" color="#FFFFFF" style={styles.sheetDoneText}>
                            Done ({selectedLanguages.length} selected)
                        </AppText>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        paddingTop: normalize(12),
        gap: normalize(2),
    },
    fieldWrapper: {
        marginBottom: normalize(12),
    },
    fieldLabel: {
        fontSize: normalize(11),
        marginBottom: normalize(6),
        letterSpacing: 0.1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: colors.tintsGrey[50] || '#EDF2F7',
        borderRadius: normalize(10),
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(10),
        minHeight: normalize(44),
    },
    textInput: {
        flex: 1,
        fontSize: normalize(12),
        color: colors.typographyColor.Medium,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    textInputText: {
        flex: 1,
        fontSize: normalize(12),
        color: colors.typographyColor.Medium,
    },
    dropdownContainer: {
        justifyContent: 'space-between',
    },
    dropdownValueText: {
        fontSize: normalize(12),
        color: colors.typographyColor.Medium,
        flex: 1,
    },
    // Verified badge
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(4),
        backgroundColor: '#EDFDF5',
        paddingHorizontal: normalize(8),
        paddingVertical: normalize(4),
        borderRadius: normalize(6),
        borderWidth: 1,
        borderColor: '#D1FADF',
    },
    verifiedText: {
        fontSize: normalize(11),
    },
    // Phone
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
    },
    countryCodeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: colors.tintsGrey[50] || '#EDF2F7',
        borderRadius: normalize(10),
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(10),
        minHeight: normalize(44),
    },
    countryCodeText: {
        fontSize: normalize(12),
    },
    phoneInputBox: {
        flex: 1,
    },
    // Radio
    radioRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: normalize(12),
        marginTop: normalize(4),
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
        paddingVertical: normalize(4),
    },
    radioCircle: {
        width: normalize(18),
        height: normalize(18),
        borderRadius: normalize(9),
        borderWidth: 1.8,
        borderColor: '#CBD5E1',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    radioCircleSelected: {
        borderColor: colors.typographyColor['Dark 2'] || '#003CA3',
        backgroundColor: colors.typographyColor['Dark 2'] || '#003CA3',
    },
    radioDot: {
        width: normalize(7),
        height: normalize(7),
        borderRadius: normalize(3.5),
        backgroundColor: '#FFFFFF',
    },
    radioLabel: {
        fontSize: normalize(11),
    },
    // Save button
    saveBtnTouch: {
        alignSelf: 'center',
        marginTop: normalize(16),
        marginBottom: normalize(20),
    },
    saveBtnGradient: {
        overflow: 'hidden',
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(32),
        minWidth: normalize(160),
        minHeight: normalize(48),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(99),
        shadowColor: '#1C639D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    saveBtnText: {
        fontSize: normalize(14),
        letterSpacing: 0.8,
    },

    // ── Modal Bottom Sheets ───────────────────────────────────────────────────
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    bottomSheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: normalize(24),
        borderTopRightRadius: normalize(24),
        paddingHorizontal: normalize(20),
        paddingTop: normalize(18),
        paddingBottom: normalize(30),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: normalize(8),
    },
    sheetTitle: {
        fontSize: normalize(16),
        color: colors.typographyColor.Dark,
    },
    sheetSubtitle: {
        fontSize: normalize(11.5),
        marginBottom: normalize(12),
    },
    countBadge: {
        backgroundColor: colors.blue[600] || '#1E88E5',
        borderRadius: normalize(10),
        paddingHorizontal: normalize(7),
        paddingVertical: normalize(2),
    },
    countBadgeText: {
        fontSize: normalize(10),
    },
    modalListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: normalize(12),
        paddingHorizontal: normalize(12),
        borderRadius: normalize(10),
        marginBottom: normalize(4),
    },
    modalListItemActive: {
        backgroundColor: colors.blue[50] || '#F0F6FF',
    },
    modalItemText: {
        fontSize: normalize(13.5),
        color: colors.typographyColor.Dark,
    },
    countryRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
    },
    flagEmoji: {
        fontSize: normalize(18),
    },
    countryNameText: {
        fontSize: normalize(13.5),
        color: colors.typographyColor.Dark,
    },
    countryRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
    },
    sheetDoneBtn: {
        backgroundColor: colors.blue[600] || '#1E88E5',
        borderRadius: normalize(24),
        paddingVertical: normalize(12),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(14),
    },
    sheetDoneText: {
        fontSize: normalize(13.5),
    },
});
