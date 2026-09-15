import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export type DashboardTab = 'Overview' | 'Task' | 'Journal' | 'History' | 'Payment';

const TABS: DashboardTab[] = ['Overview', 'Task', 'Journal', 'History', 'Payment'];

interface DashboardTabsProps {
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {TABS.map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            activeOpacity={0.75}
                            onPress={() => onTabChange(tab)}
                            style={styles.tabItem}
                        >
                            {isActive ? (
                                <LinearGradient
                                    colors={[colors.lightAppTheme[950], colors.lightAppTheme[950]]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.activeTabBg}
                                >
                                    <AppText variant="body" family='secondary' weight="bold" style={styles.activeTabText}>
                                        {tab}
                                    </AppText>
                                </LinearGradient>
                            ) : (
                                <View style={styles.inactiveTab}>
                                    <AppText variant="body" family='secondary' weight="bold" style={styles.inactiveTabText}>
                                        {tab}
                                    </AppText>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.tintsBlue[600],
        paddingVertical: normalize(20),
        paddingHorizontal: normalize(8),
        marginTop: normalize(20),
    },
    scrollContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(6),
        gap: normalize(6),
    },
    tabItem: {
        // pressed state handled by activeOpacity
    },
    activeTabBg: {
        borderRadius: normalize(99),
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(12),
    },
    activeTabText: {
        color: colors.typographyColor.White,
        fontSize: normalize(13),
    },
    inactiveTab: {
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(7),
    },
    inactiveTabText: {
        color: colors.appThemeColor[800],
        fontSize: normalize(15),
    },
});
