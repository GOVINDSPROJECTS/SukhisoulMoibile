import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { Search } from 'lucide-react-native';

interface SearchInputProps {
    label?: string;
    error?: string;
    placeholder?: string;
    style?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    error,
    placeholder = "Search by name, ID, or phone...",
    style,
}) => {
    const { colors, typography, borderRadius } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!error?.trim();

    return (
        <View style={[styles.container, style]}>
            <View
                style={[
                    styles.inputContainer,
                    {
                        backgroundColor: colors.typographyColor.White,
                        borderColor: hasError ? colors.error : isFocused ? colors.appThemeColor[100] : 'transparent',
                        borderRadius: normalize(16),
                        ...(Platform.OS === 'ios' && isFocused && {
                            shadowColor: colors.lightAppTheme[700],
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                        }),
                        ...(Platform.OS === 'ios' && hasError && {
                            shadowColor: colors.error,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 4,
                        })
                    },
                ]}
            >
                <View style={{ paddingRight: normalize(5), marginRight: normalize(5) }} >
                    <Search size={normalize(18)} color={colors.appThemeColor[300]} />
                </View>
                <TextInput
                    style={[styles.input, { color: colors.typographyColor.Light }]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.typographyColor.Light}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    errorLabel: {
        marginBottom: normalize(6),
        marginRight: normalize(4),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(44),
        paddingHorizontal: normalize(16),
        borderWidth: normalize(1),
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
    },
    input: {
        flex: 1,
        height: '100%',
        padding: 0,
    },
});
