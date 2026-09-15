import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Search, X } from 'lucide-react-native';

interface SearchInputProps {
    label?: string;
    error?: string;
    placeholder?: string;
    style?: ViewStyle;
    value?: string;
    onChangeText?: (text: string) => void;
    onPressIn?: () => void;
    editable?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    error,
    placeholder = 'Search for therapists, specialties...',
    style,
    value,
    onChangeText,
    onPressIn,
    editable = true,
}) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!error?.trim();

    return (
        <View style={[styles.container, style]}>
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: colors.typographyColor.White,
                        borderColor: hasError ? colors.error : isFocused ? colors.appThemeColor[500] : colors.appThemeColor[400],
                        borderRadius: 16,
                        ...(Platform.OS === 'ios' && isFocused && {
                            shadowColor: colors.lightAppTheme[700],
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                        }),
                    },
                ]}
            >
                <View style={{ paddingHorizontal: normalize(4), marginRight: normalize(6) }}>
                    <Search size={normalize(18)} color={colors.typographyColor.Light} />
                </View>
                <TextInput
                    style={[styles.input, { color: '#1E293B' }]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.typographyColor.Light}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onPressIn={onPressIn}
                    editable={editable}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                {value && value.trim().length > 0 && onChangeText && (
                    <TouchableOpacity
                        onPress={() => onChangeText('')}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        style={styles.clearBtn}
                    >
                        <X size={normalize(14)} color="#64748B" strokeWidth={2.5} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(48),
        paddingHorizontal: normalize(14),
        borderWidth: 1.2,
    },
    input: {
        flex: 1,
        height: '100%',
        padding: 0,
        fontSize: normalize(13),
        fontWeight: '500',
    },
    clearBtn: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
