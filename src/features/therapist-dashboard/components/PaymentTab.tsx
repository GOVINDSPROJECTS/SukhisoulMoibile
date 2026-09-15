import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Download, History, HelpCircle, ExternalLink, CreditCard, CalendarCheck, ReceiptText, ArrowRight } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';

import { useTherapistDashboard } from '../hooks/useTherapistDashboard';

// ─── Transaction Item ─────────────────────────────────────────────────────────

interface TransactionItem {
    id: string;
    invoiceNo: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Refund';
}

const TransactionRow: React.FC<{ item: TransactionItem }> = ({ item }) => {
    const { borderRadius } = useTheme();
    return (
        <View style={[styles.transactionRow, { borderRadius: borderRadius.l }]}>
            <View style={[styles.txIconWrapper, { borderRadius: borderRadius.m }]}>
                <ReceiptText size={normalize(18)} color={colors.typographyColor['Dark 2']} />
            </View>
            <View style={styles.txInfo}>
                <AppText variant="body" family='secondary' weight="bold" style={styles.txInvoice}>
                    {item.invoiceNo}
                </AppText>
                <AppText variant="caption" weight="regular" style={styles.txDate}>
                    {item.date} • {"\n"}{item.status}
                </AppText>
            </View>
            <AppText variant="body" weight="extraBold" style={styles.txAmount}>
                ₹{item.amount}
            </AppText>
            <TouchableOpacity
                activeOpacity={0.75}
                style={[styles.downloadBtn, { borderRadius: borderRadius.full }]}
            >
                <Download size={normalize(13)} color={colors.green[700]} />
                <AppText variant="caption" weight="semiBold" style={styles.downloadText}>
                    Download
                </AppText>
            </TouchableOpacity>
        </View>
    );
};

// ─── Payment Tab ──────────────────────────────────────────────────────────────

export const PaymentTab: React.FC = () => {
    const { borderRadius } = useTheme();
    const { data: dashboardData } = useTherapistDashboard();

    const summary = dashboardData?.summary;
    const progress = dashboardData?.progress;
    const recent = dashboardData?.recentSessions;

    const sessionsRemaining = summary?.sessionsLeft ?? 0;
    const planName = progress?.planName || '1:1 Therapy Session';

    const transactions: TransactionItem[] = recent && recent.length > 0
        ? recent.map(r => ({
            id: r.id,
            invoiceNo: `#SS${1000 + Number(r.id)}`,
            date: r.date,
            amount: r.amount ?? 500,
            status: 'Paid',
        }))
        : (dashboardData?.has_booking ? [{
            id: '1',
            invoiceNo: '#SS1001',
            date: dashboardData.nextSession?.dateFormatted || 'Recent',
            amount: 500,
            status: 'Paid',
        }] : []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{ marginTop: normalize(20) }}>
                <AppText variant="h4" weight="extraBold" style={styles.title}>
                    Manage Payment Details
                </AppText>
                <AppText variant="caption" weight="regular" style={styles.subtitle}>
                    Plan, receipts and transaction history
                </AppText>
            </View>

            {/* Active Plan Card */}
            <LinearGradient
                colors={[colors.lightTints.blueLightTint[400], colors.blue[800]]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.planCard, { borderRadius: borderRadius.xl }]}
            >
                {/* Active Badge */}
                <View style={styles.badgeWrapper}>
                    <View style={styles.badgeWrapperIcon}>
                        <CreditCard size={normalize(20)} color="white" />
                    </View>
                    <View style={styles.activeBadgeRow}>
                        <AppText variant="caption" weight="extraBold" style={styles.activeBadgeText}>
                            ACTIVE PLAN
                        </AppText>
                    </View>
                </View>

                <AppText variant="caption" weight="medium" style={styles.planLabel}>
                    {planName.toUpperCase()}
                </AppText>
                <AppText variant="h3" weight="extraBold" style={styles.planPrice}>
                    ₹500
                    <AppText variant="body" weight="regular" style={styles.planPriceUnit}>
                        / session
                    </AppText>
                </AppText>

                <View style={styles.planSessionsRow}>
                    <CalendarCheck size={normalize(16)} color={colors.lightTints.blueLightTint[50]} />
                    <AppText variant="body" family='secondary' weight="semiBold" style={styles.planSessionsText}>
                        {sessionsRemaining} {sessionsRemaining === 1 ? 'session' : 'sessions'} remaining
                    </AppText>
                </View>
            </LinearGradient>

            {/* Transaction History */}
            <View style={[styles.sectionCard, { borderRadius: borderRadius.xl, marginTop: normalize(20) }]}>
                <View style={styles.txHeaderRow}>
                    <History size={normalize(18)} color={colors.typographyColor['Dark 2']} />
                    <AppText variant="h4" family='secondary' weight="extraBold" style={styles.sectionTitle}>
                        Transaction History
                    </AppText>
                </View>

                <View style={styles.transactionList}>
                    {transactions.length === 0 ? (
                        <View style={{ paddingVertical: normalize(20), alignItems: 'center' }}>
                            <AppText variant="caption" style={{ color: colors.typographyColor.Medium }}>
                                No transactions recorded yet.
                            </AppText>
                        </View>
                    ) : (
                        transactions.map((item, idx) => (
                            <React.Fragment key={`${item.id}-${idx}`}>
                                <TransactionRow item={item} />
                                {idx < transactions.length - 1 && <View style={styles.separator} />}
                            </React.Fragment>
                        ))
                    )}
                </View>
            </View>

            {/* Need Help Card */}
            <View style={[styles.helpCard, { borderRadius: normalize(32) }]}>
                <View style={styles.helpHeader}>
                    <AppText variant="body" family='secondary' weight="extraBold" style={styles.helpTitle}>
                        Need help with payments?
                    </AppText>
                </View>
                <AppText variant="caption" weight="regular" style={styles.helpSubtitle}>
                    Our support team is available 24/7 to resolve any billing issues or plan queries.
                </AppText>
                <TouchableOpacity activeOpacity={0.8} style={styles.contactRow}>
                    <AppText variant="body" weight="bold" style={styles.contactText}>
                        Contact Support
                    </AppText>
                    <ArrowRight size={normalize(14)} color={colors.typographyColor['Dark 2']} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: normalize(20),
        paddingTop: normalize(20),
        paddingBottom: normalize(20),
        gap: normalize(25),
        backgroundColor: "#ffffff"
    },
    title: {
        color: colors.typographyColor.Black,
    },
    subtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(12),
        marginTop: normalize(2),
    },
    badgeWrapper: {
        marginBottom: normalize(10),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    badgeWrapperIcon: {
        width: normalize(44),
        height: normalize(44),
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: normalize(7),
    },

    // Active Plan Card
    planCard: {
        padding: normalize(32),
        overflow: 'hidden',
    },
    activeBadgeRow: {
        alignSelf: 'center',
        backgroundColor: colors.lightTints.blueLightTint2[400],
        borderRadius: normalize(99),
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(5),
        marginBottom: normalize(14),
    },
    activeBadgeText: {
        color: colors.lightTints.blueLightTint[50],
        fontSize: normalize(11),
        letterSpacing: 1.2,
    },
    planLabel: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: normalize(11),
        letterSpacing: 0.8,
        marginBottom: normalize(-8),
    },
    planPrice: {
        color: '#FFFFFF',
        fontSize: normalize(30),
        marginBottom: normalize(14),
    },
    planPriceUnit: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: normalize(13),
    },
    planSessionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
        marginTop: normalize(15),
    },
    planSessionsText: {
        color: colors.lightTints.blueLightTint[50],
        fontSize: normalize(13),
    },

    // Section Card
    sectionCard: {
        backgroundColor: '#FFFFFF',
        padding: normalize(5),

    },
    txHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(8),
        marginBottom: normalize(12),
    },
    sectionTitle: {
        color: colors.typographyColor.Black,
    },
    transactionList: {
        gap: 0,
    },
    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: normalize(10),
        gap: normalize(10),
    },
    txIconWrapper: {
        width: normalize(43),
        height: normalize(48),
        backgroundColor: colors.tintsBlue[400],
        justifyContent: 'center',
        alignItems: 'center',
    },
    txInfo: {
        flex: 1,
    },
    txInvoice: {
        color: colors.typographyColor.Black,
        fontSize: normalize(12),
    },
    txDate: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(10),
        marginTop: normalize(2),
    },
    txAmount: {
        color: colors.appThemeColor[800],
        fontSize: normalize(13),
    },
    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(4),
        backgroundColor: colors.green[100],
        paddingHorizontal: normalize(14),
        paddingVertical: normalize(7),

    },
    downloadText: {
        color: colors.green[700],
        fontSize: normalize(10),
    },
    separator: {
        height: 1,
        backgroundColor: colors.appThemeColor[50],
    },

    // Help Card
    helpCard: {
        backgroundColor: 'rgba(228,233,231,0.4)',
        padding: normalize(24),
    },
    helpHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(8),
    },
    helpTitle: {
        color: colors.typographyColor.Black,
        fontSize: normalize(15),
    },
    helpSubtitle: {
        color: colors.typographyColor.Medium,
        fontSize: normalize(11.5),
        lineHeight: normalize(17),
        marginBottom: normalize(12),
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(6),
    },
    contactText: {
        color: colors.typographyColor['Dark 2'],
        fontSize: normalize(13),
    },
});
