import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { useNavigation } from '@react-navigation/native';

interface ClientCardProps {
  name: string;
  id: string;
  lastSession: string;
  isActive?: boolean; // legacy fallback
  status?: 'active' | 'ended' | 'pending';
  onSelect?: () => void;
  // Use a placeholder image or pass an actual source
  imageSource?: any;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  name,
  id,
  lastSession,
  isActive,
  status,
  imageSource,
  onSelect
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  // Determine actual status
  const currentStatus = status || (isActive ? 'active' : 'ended');

  const getStatusStyle = () => {
    switch (currentStatus) {
      case 'pending':
        return { bg: colors.lightTints.redLightTint[50], text: colors.colorPalet['color 1'], label: 'Paused' }; // yellow/orange
      case 'active':
        return { bg: colors.green[50], text: colors.green[700], label: 'Active' };
      case 'ended':
      default:
        return { bg: colors.lightTints.redLightTint[50], text: colors.colorPalet['color 1'], label: 'Ended' };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <View style={styles.contentRow}>
        <Image
          source={imageSource ? imageSource : { uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />

        <View style={styles.infoContainer}>
          <AppText family="primary" weight="bold" style={{ fontSize: normalize(15), color: colors.typographyColor.Black }}>
            {name}
          </AppText>
          <AppText family="secondary" weight="light" style={{ fontSize: normalize(12), color: colors.typographyColor.Light, marginTop: normalize(-2) }}>
            ID: {id}
          </AppText>

          <AppText family="secondary" weight="light" style={{ fontSize: normalize(9), color: colors.typographyColor.Light, marginTop: normalize(5), textTransform: 'uppercase' }}>
            Last Session
          </AppText>
          <AppText family="secondary" weight="medium" style={{ fontSize: normalize(11.5), color: colors.typographyColor.Black }}>
            {lastSession}
          </AppText>
        </View>

        <View style={styles.rightContainer}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: statusStyle.bg }
          ]}>
            <AppText family="primary" weight="bold" style={{
              fontSize: normalize(8),
              color: statusStyle.text,
              textTransform: 'uppercase'
            }}>
              {statusStyle.label}
            </AppText>
          </View>

          <TouchableOpacity
            style={[styles.selectButton, { backgroundColor: colors.purple[800] }]}
            activeOpacity={0.8}
            onPress={() => {
              if (onSelect) {
                onSelect();
              } else {
                navigation.navigate('SessionConfiguration');
              }
            }}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(12), color: '#FFFFFF' }}>
              Select
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(17),
    padding: normalize(16),
    marginBottom: normalize(16),
    width: '100%',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(12),
    backgroundColor: '#F0F4F8'
  },
  infoContainer: {
    flex: 1,
    marginLeft: normalize(12),
    justifyContent: 'center'
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: normalize(60),
  },
  statusBadge: {
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(99),
  },
  selectButton: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    borderRadius: normalize(9),
    marginTop: 'auto',
  }
});
