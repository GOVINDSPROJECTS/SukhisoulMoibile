import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { colors, useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { SearchInput } from '../components/SearchInput';

import { ClientCard } from '../components/ClientCard';
import { DashboardActionRow } from '../components/DashboardActionRow';
import { NewClientCard } from '../components/NewClientCard';
import { DashboardPagination } from '../components/DashboardPagination';
import { ClinicalTipCard } from '../components/ClinicalTipCard';
import { PendingOnboardingCard } from '../components/PendingOnboardingCard';

export const SelectAClient: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // Mock data for the dashboard
  const clients = [
    {
      id: "1",
      name: "Prathmesh Deokar",
      patientId: "#TP-3842",
      lastSession: "Oct 12, 2023",
      isActive: true,
      imageSource: { uri: 'https://i.pravatar.cc/150?u=prathmesh' }
    },
    {
      id: "2",
      name: "Riya Mehta",
      patientId: "#TP-2311",
      lastSession: "Oct 15, 2023",
      isActive: true,
      imageSource: { uri: 'https://i.pravatar.cc/150?u=riya' }
    },
    {
      id: "3",
      name: "Samuel Thompson",
      patientId: "#TP-1058",
      lastSession: "Sep 28, 2023",
      isActive: false,
      imageSource: { uri: 'https://i.pravatar.cc/150?u=samuel' }
    }
  ];

  const pendingClients = [
    {
      id: "p1",
      name: "Aarav Sharma",
      subtitle: "DETAILS SUBMITTED",
      lastActivity: "2 hours ago",
      buttonText: "Resume Setup",
    },
    {
      id: "p2",
      name: "Sarah Jenkins",
      subtitle: "INTAKE PENDING",
      lastActivity: "Yesterday",
      buttonText: "Track Progress",
    }
  ];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.lightTints.blueLightTint[50] }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightTints.blueLightTint[50]} translucent={false} />
      <View style={{ paddingTop: insets.top }} />

      {/* Header */}
      <LinearGradient
        colors={[
          colors.lightTints.blueLightTint[50],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerContainer}
      >
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
              <AppText family="secondary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Light }}>
                Dashboard
              </AppText>
              <AppText family="secondary" weight="medium" style={{ fontSize: normalize(10), color: colors.typographyColor.Light, marginHorizontal: normalize(4) }}>
                •
              </AppText>
              <AppText family="secondary" weight="bold" style={{ fontSize: normalize(10), color: colors.purple[700] }}>
                New Session
              </AppText>
            </View>

            <AppText family="primary" weight="extraBold" style={{ fontSize: normalize(26), color: colors.typographyColor.Black, marginTop: normalize(0) }}>
              Select a Client
            </AppText>
          </View>


          {/* Search Bar */}
          <View style={styles.searchSection}>
            <SearchInput
              placeholder="Search by name, ID, or phone..."
              style={{ backgroundColor: 'transparent', borderRadius: normalize(12) }}
            />
          </View>

          {/* Filters */}
          <DashboardActionRow />

          {/* Client List */}
          <View style={styles.listSection}>
            {clients.map(client => (
              <ClientCard
                key={client.id}
                name={client.name}
                id={client.patientId}
                lastSession={client.lastSession}
                isActive={client.isActive}
                imageSource={client.imageSource}
                onSelect={() => {
                  if (client.id === '2') {
                    navigation.navigate('SessionConfirmedStatus');
                  } else {
                    navigation.navigate('SessionConfiguration');
                  }
                }}
              />
            ))}
          </View>

          {/* New Client Card */}
          <NewClientCard />

          {/* Pagination */}
          <DashboardPagination />

          {/* Pending Onboarding Section */}
          <View style={styles.sectionHeaderContainer}>
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(16), color: colors.typographyColor.Black }}>
              Pending Onboarding
            </AppText>
          </View>

          <View style={styles.pendingListSection}>
            {pendingClients.map(client => (
              <PendingOnboardingCard
                key={client.id}
                name={client.name}
                subtitle={client.subtitle}
                lastActivity={client.lastActivity}
                buttonText={client.buttonText}
                onPress={() => {
                  if (client.buttonText === 'Track Progress') {
                    navigation.navigate('OnboardingStatusScreen');
                  } else {
                    navigation.navigate('NewClientFormScreen');
                  }
                }}
              />
            ))}
          </View>

          {/* Clinical Tip Footer */}
          <ClinicalTipCard />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
  },
  backButton: {
    padding: normalize(4),
  },
  headerTitle: {
    fontSize: normalize(15),
    color: '#155B92',
  },
  headerRight: {
    width: normalize(24),
  },
  scrollContent: {
  },
  gradientBg: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(30),
    paddingBottom: normalize(40),
  },
  titleSection: {
    marginBottom: normalize(25),
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchSection: {
    marginBottom: normalize(12),
  },
  sectionHeaderContainer: {
    marginBottom: normalize(16),
    marginTop: normalize(24),
  },
  listSection: {
    marginBottom: normalize(16),
  },
  pendingListSection: {
    marginBottom: normalize(24),
  }
});
