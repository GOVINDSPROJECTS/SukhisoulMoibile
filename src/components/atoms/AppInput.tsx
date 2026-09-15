import React from 'react';
import {
    TextInput,
    TextInputProps,
    StyleProp,
    TextStyle,
} from 'react-native';
import { useTheme } from '@theme/index';

interface AppInputProps extends TextInputProps {
    family?: 'primary' | 'secondary' | 'tertiary';
    weight?:
    | 'thin'
    | 'extraLight'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'extraBold'
    | 'black';
    style?: StyleProp<TextStyle>;
}

const AppInput: React.FC<AppInputProps> = ({
    family = 'primary',
    weight = 'regular',
    style,
    placeholderTextColor,
    ...props
}) => {
    const { colors, typography } = useTheme();

    return (
        <TextInput
            {...props}
            placeholderTextColor={
                placeholderTextColor ?? colors.typographyColor.Medium
            }
            style={[
                {
                    color: colors.text,
                    fontFamily: typography.fontFamily[family][weight],
                },
                style,
            ]}
        />
    );
};

export default React.memo(AppInput);