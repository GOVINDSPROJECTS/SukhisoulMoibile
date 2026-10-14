import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, CircleSlash, Phone, ShieldCheck, Siren, Venus, HeartPulse } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import type { NavigationProp } from '@navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import { api } from '@api/client';

interface HelplineEntry {
  id: string;
  name: string;
  number: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

const DEFAULT_HELPLINES: HelplineEntry[] = [
  {
    id: '1',
    name: 'National Emergency Response',
    number: '112',
    iconBg: colors.lightTints.redLightTint2[50],
    iconColor: colors.colorPalet['Color 5'],
    icon: <AppText style={{ fontSize: normalize(14), color: colors.colorPalet['Color 5'], fontWeight: '700' }}>112</AppText>,
  },
  {
    id: '2',
    name: 'Tele-MANAS (Mental Health Govt of India)',
    number: '14416',
    iconBg: colors.green[50],
    iconColor: colors.green[500],
    icon: <HeartPulse size={normalize(23)} color={colors.green[500]} />,
  },
  {
    id: '3',
    name: 'KIRAN Mental Health Helpline',
    number: '18005990019',
    iconBg: colors.blue[50],
    iconColor: colors.blue[600],
    icon: <CircleSlash size={normalize(23)} color={colors.blue[600]} />,
  },
  {
    id: '4',
    name: "Women's Helpline",
    number: '181',
    iconBg: colors.lightTints.pinkLightTint[50],
    iconColor: colors.colorPalet['Color 4'],
    icon: <Venus size={normalize(23)} color={colors.colorPalet['Color 4']} />,
  },
  {
    id: '5',
    name: 'Vandrevala Mental Health Foundation',
    number: '9999666555',
    iconBg: colors.lightTints.blueLightTint[100],
    iconColor: colors.blue[700],
    icon: <Siren size={normalize(23)} color={colors.blue[700]} />,
  },
];

export const SosHelplineScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [helplines, setHelplines] = useState<HelplineEntry[]>(DEFAULT_HELPLINES);

  useEffect(() => {
    let isMounted = true;
    api.get('/v1/crisis/resources')
      .then((res) => {
        if (!isMounted) return;
        const apiResources = res.data?.data;
        if (Array.isArray(apiResources) && apiResources.length > 0) {
          const dynamicEntries: HelplineEntry[] = apiResources.map((item: any, idx: number) => ({
            id: `api_${item.id || idx}`,
            name: item.title,
            number: item.content || item.url || '112',
            iconBg: colors.blue[50],
            iconColor: colors.blue[600],
            icon: <Phone size={normalize(20)} color={colors.blue[600]} />,
          }));
          setHelplines([...DEFAULT_HELPLINES, ...dynamicEntries]);
        }
      })
      .catch((e) => {
        console.log('[Crisis resources load]:', e?.message);
      });
    return () => { isMounted = false; };
  }, []);

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number.replace(/[^0-9]/g, '')}`);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={false} />
      <View style={{ paddingTop: insets.top, backgroundColor: colors.lightTints.blueLightTint[100] }} />


      {/* Header */}

      <LinearGradient
        colors={[colors.typographyColor.White, colors.lightTints.blueLightTint[100]]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.5}
          style={styles.backBtn}
        >
          <ArrowLeft size={normalize(24)} color={colors.lightAppTheme[950]} strokeWidth={2} />
        </TouchableOpacity>

        {/* Shield Illustration Area */}
        <View style={styles.illustrationArea}>
          <Image source={require('../assets/shield.png')} style={styles.shield} />
        </View>

        {/* Title */}
        <AppText variant="h2" weight="extraBold" style={styles.title}>
          Government{'\n'}Helpline Numbers
        </AppText>
        <AppText variant="caption" weight="medium" style={styles.subtitle}>
          Call any one of these helpline numbers for government assistance.
        </AppText>

      </LinearGradient>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + normalize(40) }]}
        showsVerticalScrollIndicator={false}
      >

        {/* Helpline Cards */}
        <View style={styles.helplinesContainer}>
          {helplines.map((entry) => (
            <View key={entry.id} style={styles.helplineRow}>
              <View style={[styles.helplineIcon, { backgroundColor: entry.iconBg }]}>
                {entry.icon}
              </View>
              <View style={styles.helplineInfo}>
                <AppText variant="body" weight="extraBold" style={styles.helplineName}>
                  {entry.name}
                </AppText>
                <AppText variant="caption" weight="extraBold" style={styles.helplineNumber}>
                  {entry.number}
                </AppText>
              </View>
              <TouchableOpacity
                style={styles.callBtn}
                activeOpacity={0.8}
                onPress={() => handleCall(entry.number)}
              >
                <Phone size={normalize(16)} strokeWidth={1} fill={colors.blue[400]} color={colors.blue[400]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Disclaimer Card */}
        <View style={styles.disclaimerCard}>
          <ShieldCheck size={normalize(20)} color={colors.blue[300]} style={{ marginRight: normalize(10) }} />
          <AppText variant="caption" weight="semiBold" style={styles.disclaimerText}>
            Your call will be free and confidential.{'\n'}In case of emergency, please call immediately.
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
    justifyContent: 'space-between',
    marginBottom: normalize(15),
  },
  backBtn: {
    width: normalize(36),
    height: normalize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: normalize(36),
  },


  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(8),
  },
  illustrationArea: {
    alignItems: 'center',
    marginBottom: normalize(-60),
    marginLeft: 'auto',
    marginTop: normalize(-40),
    marginRight: normalize(-10)
  },
  shield: {
    width: normalize(180),
    height: normalize(180),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto'
  },
  title: {
    fontSize: normalize(26),
    color: colors.blue[900],
    lineHeight: normalize(38),
    marginBottom: normalize(8),
  },
  subtitle: {
    fontSize: normalize(14),
    color: colors.lightAppTheme[600],
    lineHeight: normalize(19),
    marginBottom: normalize(24),
  },
  helplinesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(22),
    paddingVertical: normalize(6),
    borderWidth: 1,
    borderColor: colors.blue[100],
    shadowColor: colors.appThemeColor[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: normalize(16),
  },
  helplineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: colors.blue[50],
  },
  helplineIcon: {
    width: normalize(42),
    height: normalize(42),
    borderRadius: normalize(21),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(14),
  },
  helplineInfo: {
    flex: 1,
  },
  helplineName: {
    fontSize: normalize(13.5),
    color: colors.blue[900],
    marginBottom: normalize(2),
  },
  helplineNumber: {
    fontSize: normalize(12),
    color: colors.blue[400],
  },
  callBtn: {
    width: normalize(38),
    height: normalize(38),
    borderRadius: normalize(19),
    backgroundColor: colors.blue[50],
    borderWidth: 1,
    borderColor: colors.blue[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimerCard: {
    backgroundColor: colors.blue[50],
    borderRadius: normalize(18),
    padding: normalize(24),
    paddingHorizontal: normalize(35),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  disclaimerText: {
    flex: 1,
    fontSize: normalize(11.5),
    color: colors.appThemeColor[700],
    lineHeight: normalize(18),
  },
});
