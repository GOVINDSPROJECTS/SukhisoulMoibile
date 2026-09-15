import React, { useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Pressable,
} from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

// ─── Constants ────────────────────────────────────────────────────────────────

export const PERIOD_OPTIONS = [
    'This week',
    'Last week',
    'This month',
    'Last month',
    'Last 3 months',
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface TaskPeriodDropdownProps {
    selected: string;
    visible: boolean;
    onToggle: () => void;
    onSelect: (period: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TaskPeriodDropdown: React.FC<TaskPeriodDropdownProps> = ({
    selected,
    visible,
    onToggle,
    onSelect,
}) => {
    const dropdownAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(dropdownAnim, {
            toValue: visible ? 1 : 0,
            duration: 180,
            useNativeDriver: true,
        }).start();
    }, [visible, dropdownAnim]);

    const dropdownTranslateY = dropdownAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-8, 0],
    });

    return (
        <View>
            {/* Trigger Button */}
            <TouchableOpacity
                style={styles.trigger}
                onPress={onToggle}
                activeOpacity={0.75}
            >
                <Calendar size={normalize(13)} color={colors.blue[600]} />
                <AppText
                    variant="caption"
                    family="secondary"
                    weight="semiBold"
                    style={styles.triggerText}
                >
                    {selected}
                </AppText>
                <ChevronDown size={normalize(13)} color={colors.blue[500]} />
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal
                visible={visible}
                transparent
                animationType="none"
                onRequestClose={onToggle}
            >
                <Pressable style={styles.overlay} onPress={onToggle}>
                    <Pressable
                        style={styles.dropdownWrapper}
                    // Prevent close when clicking inside list
                    >
                        <Animated.View
                            style={[
                                styles.dropdown,
                                {
                                    opacity: dropdownAnim,
                                    transform: [{ translateY: dropdownTranslateY }],
                                },
                            ]}
                        >
                            {PERIOD_OPTIONS.map((option, idx) => {
                                const isSelected = option === selected;
                                const isLast = idx === PERIOD_OPTIONS.length - 1;
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.option,
                                            isSelected && styles.optionSelected,
                                            !isLast && styles.optionBorder,
                                        ]}
                                        onPress={() => onSelect(option)}
                                        activeOpacity={0.7}
                                    >
                                        <AppText
                                            variant="body"
                                            family="secondary"
                                            weight={isSelected ? 'bold' : 'regular'}
                                            style={[
                                                styles.optionText,
                                                isSelected && styles.optionTextSelected,
                                            ]}
                                        >
                                            {option}
                                        </AppText>
                                        {isSelected && (
                                            <View style={styles.selectedDot} />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </Animated.View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(5),
        borderRadius: normalize(8),
        borderWidth: 1,
        borderColor: colors.tintsGrey[100],
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(7),
        backgroundColor: '#FFFFFF',
    },
    triggerText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
    },

    // Modal overlay
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: normalize(130),
        paddingRight: normalize(20),
    },
    dropdownWrapper: {},
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: normalize(12),
        minWidth: normalize(160),
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(13),
    },
    optionSelected: {
        backgroundColor: colors.lightTints.blueLightTint[50],
    },
    optionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightTints.blueLightTint[100],
    },
    optionText: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(13),
    },
    optionTextSelected: {
        color: colors.blue[700],
    },
    selectedDot: {
        width: normalize(7),
        height: normalize(7),
        borderRadius: normalize(99),
        backgroundColor: colors.blue[600],
    },
});
