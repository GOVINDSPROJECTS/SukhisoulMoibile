import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { normalize } from '@utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '@/theme';
import { SearchInput } from './SearchInput';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

export const Search: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <LinearGradient
            colors={[
                colors.lightTints.blueLightTint[50],
                colors.lightTints.blueLightTint[100],
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientWrapper}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ExplorePsychologists')}
                style={styles.sectionContainer}
            >
                <SearchInput
                    placeholder="Search for therapists, specialties..."
                    onPressIn={() => navigation.navigate('ExplorePsychologists')}
                />
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        paddingHorizontal: normalize(20),
    },
    gradientWrapper: {
        paddingVertical: normalize(9),
    },
});
