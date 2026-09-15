import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@/theme';

interface LicenseSectionItem {
  id: string;
  title: string;
  description: string;
  additionalInfo?: string;
}

const LICENSE_DATA: LicenseSectionItem[] = [
  {
    id: 'app-license',
    title: 'App License',
    description:
      'Sukhi Soul is a licensed digital mental wellness platform. All content, branding, and software are protected under applicable intellectual property laws.',
  },
  {
    id: 'therapist-credentials',
    title: 'Therapist Credentials',
    description:
      'All therapists on the platform are required to hold valid professional qualifications and licenses in accordance with local regulations.',
  },
  {
    id: 'third-party-services',
    title: 'Third-Party Services',
    description:
      'This app uses trusted third-party services such as Firebase, payment gateways, and analytics tools. Their respective licenses and terms apply.',
  },
  {
    id: 'open-source-libraries',
    title: 'Open Source Libraries',
    description:
      'Sukhi Soul incorporates open-source software components. We acknowledge and comply with their respective license requirements.',
  },
  {
    id: 'compliance',
    title: 'Compliance',
    description:
      'We are committed to protecting your data and maintaining industry-standard security and privacy practices.',
  },
  {
    id: 'version',
    title: 'Version',
    description: 'Sukhi Soul v2.4.1',
    additionalInfo: '© 2026 Sukhi Soul. All Rights Reserved.',
  },
];

export const LicensesCard: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      {/* Section Header */}
      <AppText
        weight="light"
        family="secondary"
        style={styles.sectionLabel}
        color={colors.typographyColor.Medium}
      >
        LICENSES
      </AppText>

      {/* Licenses Content Card */}
      <View style={styles.card}>
        {LICENSE_DATA.map((item, index) => {
          const isLast = index === LICENSE_DATA.length - 1;
          return (
            <View
              key={item.id}
              style={[styles.sectionItem, isLast && styles.lastSectionItem]}
            >
              <AppText
                weight="light"
                family="secondary"
                style={styles.itemTitle}
                color={colors.typographyColor.Light}
              >
                {item.title}
              </AppText>

              <AppText
                weight="light"
                family="secondary"
                style={styles.itemBody}
                color={colors.typographyColor.Light}
              >
                {item.description}
              </AppText>

              {item.additionalInfo ? (
                <AppText
                  weight="light"
                  family="secondary"
                  style={[styles.itemBody, styles.additionalInfo]}
                  color={colors.typographyColor.Light}
                >
                  {item.additionalInfo}
                </AppText>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: normalize(20),
  },
  sectionLabel: {
    fontSize: normalize(12.5),
    letterSpacing: 0.6,
    marginBottom: normalize(16),
    paddingHorizontal: normalize(2),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(18),
    borderWidth: 1,
    borderColor: colors.tintsGrey[50],

  },
  sectionItem: {
    marginBottom: normalize(19),
  },
  lastSectionItem: {
    marginBottom: 0,
  },
  itemTitle: {
    fontSize: normalize(13.5),
    marginBottom: normalize(5),
  },
  itemBody: {
    fontSize: normalize(12.5),
    lineHeight: normalize(18.5),
  },
  additionalInfo: {
    marginTop: normalize(3),
  },
});
