import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { colors, useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { useTopRatedProfessionals } from '@features/home/hooks/useProfessionals';
import { getProfessionalAvatar, getPrimaryExpertise, type Professional } from '@api/professionals';
import { MessageSquare } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@navigation/types';

export const OnlinePsychologists: React.FC = () => {
  const { borderRadius } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { data, isLoading: profLoading, isError: profError, refetch } = useTopRatedProfessionals(6);
  const professionals: Professional[] = data?.data ?? [];
  const miniAvatars = professionals.slice(0, 3).map((p) => getProfessionalAvatar(p));

  const handleChat = (pro: Professional) => {
    navigation.navigate('Chat', {
      professionalUuid: pro.uuid,
      doctorName: pro.user?.name ?? 'Dr. Expert',
      avatarUrl: getProfessionalAvatar(pro),
      role: getPrimaryExpertise(pro),
    });
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.onlineSectionHeader}>
        <View>
          <AppText variant="h3" weight="extraBold" style={styles.sectionTitle}>
            Online Psychologists
          </AppText>
          <AppText variant="caption" style={styles.sectionSubtitle}>
            Instant chat support available now
          </AppText>
        </View>
        <View style={[styles.onlineCountBadge, { borderRadius: borderRadius.full }]}>
          <AppText variant="caption" weight="bold" style={styles.onlineCountText}>
            ● {professionals.length || 12} Online
          </AppText>
        </View>
      </View>

      {/* Live online therapist list from API */}
      {profLoading ? (
        <ActivityIndicator size="small" color="#0066CC" style={{ marginVertical: normalize(16) }} />
      ) : profError ? (
        <TouchableOpacity onPress={() => refetch()} style={styles.errorBanner}>
          <AppText variant="caption" weight="semiBold" style={{ color: '#E53935', textAlign: 'center' }}>
            Could not load therapists. Tap to retry.
          </AppText>
        </TouchableOpacity>
      ) : (
        professionals.map((pro) => (
          <TouchableOpacity
            key={pro.uuid}
            activeOpacity={0.85}
            onPress={() => handleChat(pro)}
            style={[styles.onlineTherapistCard, { borderRadius: borderRadius.xl }]}
          >
            <Image source={{ uri: getProfessionalAvatar(pro) }} style={styles.onlineAvatar} />
            <View style={styles.onlineInfoWrapper}>
              <AppText variant="body" weight="bold" style={styles.onlineName}>
                {pro.user?.name ?? 'Dr. —'}
              </AppText>
              <AppText variant="caption" style={styles.onlineSpecialty}>
                {getPrimaryExpertise(pro)}
              </AppText>
              <AppText
                variant="caption"
                weight="semiBold"
                style={{ color: '#3E6752', fontSize: normalize(10), marginTop: 2 }}
              >
                Available now
              </AppText>
            </View>
            <TouchableOpacity
              style={[styles.chatBtn, { borderRadius: borderRadius.xl }]}
              activeOpacity={0.8}
              onPress={() => handleChat(pro)}
            >
              <MessageSquare size={14} color="#FFFFFF" style={{ marginRight: normalize(4) }} />
              <AppText variant="caption" weight="bold" style={styles.chatBtnText}>
                Chat
              </AppText>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}

      {/* See all Therapist button */}
      {!profLoading && !profError && miniAvatars.length > 0 && (
        <TouchableOpacity
          style={[styles.seeAllBtn, { borderRadius: borderRadius.xl }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ExplorePsychologists')}
        >
          <View style={styles.avatarsOverlap}>
            {miniAvatars.map((url, i) => (
              <Image
                key={i}
                source={{ uri: url }}
                style={[styles.miniAvatar, { left: i * normalize(14), zIndex: 3 - i }]}
              />
            ))}
          </View>
          <AppText
            variant="body"
            weight="semiBold"
            style={[
              styles.btnText,
              {
                color: colors.typographyColor.Black,
                marginLeft: normalize(14 + (miniAvatars.length - 1) * 14),
              },
            ]}
          >
            See all Therapist
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: normalize(24),
    paddingHorizontal: normalize(20),
  },
  sectionTitle: {
    color: '#2D3432',
  },
  sectionSubtitle: {
    fontSize: normalize(11.5),
    color: '#59615F',
    marginTop: normalize(2),
  },
  onlineSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: normalize(12),
  },
  onlineCountBadge: {
    backgroundColor: '#BFEDD1',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
  },
  onlineCountText: {
    color: '#315A45',
    fontSize: normalize(10),
  },
  onlineTherapistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E4E7EC',
    padding: normalize(12),
    marginBottom: normalize(10),
    shadowColor: '#162731',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  onlineAvatar: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    marginRight: normalize(12),
  },
  onlineInfoWrapper: {
    flex: 1,
  },
  onlineName: {
    fontSize: normalize(14),
    color: '#2D3432',
  },
  onlineSpecialty: {
    fontSize: normalize(11),
    color: '#59615F',
    marginTop: normalize(2),
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightAppTheme[950],
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(14),
    shadowColor: '#005BC2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  chatBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(11),
  },
  errorBanner: {
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(10),
    backgroundColor: '#FFF3F3',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    marginBottom: normalize(12),
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: normalize(48),
    marginTop: normalize(8),
    marginBottom: normalize(12),
    position: 'relative',
  },
  avatarsOverlap: {
    position: 'absolute',
    left: '26%',
    height: normalize(28),
    width: normalize(56),
    justifyContent: 'center',
  },
  miniAvatar: {
    position: 'absolute',
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  btnText: {
    fontSize: normalize(13),
  },
});
