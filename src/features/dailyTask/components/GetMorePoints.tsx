import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Star, ShoppingCart, ChevronRight } from 'lucide-react-native';

interface GetMoreCard {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  iconBg: string;
  icon: React.ReactNode;
  cardBg: string;
  accentBg: string;
  onPress?: () => void;
}

interface GetMorePointsProps {
  onEarnPress?: () => void;
  onBuyPress?: () => void;
}

export const GetMorePoints: React.FC<GetMorePointsProps> = ({
  onEarnPress,
  onBuyPress,
}) => {
  const CARDS: GetMoreCard[] = [
    {
      id: 'earn',
      title: 'Earn Points',
      description: 'Complete daily tasks to earn more points and unlock exclusive features',
      buttonLabel: 'Earn now',
      iconBg: '#B3DDFF',
      icon: <Star size={normalize(23)} color={"#ffffff"} fill={"#ffffff"} />,
      cardBg: '#EBF4FC',
      accentBg: 'transparent',
      onPress: onEarnPress,
    },
    {
      id: 'buy',
      title: 'Buy Points',
      description: 'If you wish to avail premium features immediately, purchase points',
      buttonLabel: 'Earn now',
      iconBg: colors.lightTints.redLightTint[200],
      icon: <ShoppingCart size={normalize(23)} color="#ffffff" />,
      cardBg: '#FFF5F5',
      accentBg: 'transparent',
      onPress: onBuyPress,
    },
  ];

  return (
    <View style={styles.container}>
      <AppText
        variant="h4"
        weight="extraBold"
        family="primary"
        color={"#1E293B"}
        style={styles.sectionTitle}
      >
        Get More Points
      </AppText>

      <View style={styles.row}>
        {CARDS.map(card => (
          <View
            key={card.id}
            style={[styles.card, { backgroundColor: "#ffffff" }]}
          >
            {/* Decorative accent circle top-right */}
            <View
              style={[
                styles.accentCircle,
                {
                  backgroundColor:
                    card.id === 'buy' ? colors.lightTints.redLightTint[50] : 'rgba(179,221,255,0.20)',
                },
              ]}
            />

            {/* Icon */}
            <View style={[styles.iconWrapper, { backgroundColor: card.iconBg }]}>
              {card.icon}
            </View>

            {/* Title */}
            <AppText
              variant="body"
              weight="extraBold"
              family="primary"
              color={"#0F172A"}
              style={styles.cardTitle}
            >
              {card.title}
            </AppText>

            {/* Description */}
            <AppText
              variant="caption"
              weight="regular"
              color={"#64748B"}
              style={styles.cardDesc}
            >
              {card.description}
            </AppText>

            {/* Button */}
            <TouchableOpacity
              style={[styles.actionBtn, { borderColor: card.iconBg, boxShadow: `0px 3px 0px ${card.iconBg}` }]}
              activeOpacity={0.85}
              onPress={card.onPress}
            >
              <AppText
                variant="caption"
                weight="bold"
                family='secondary'
                color={"#1E293B"}
                style={styles.actionBtnText}
              >
                {card.buttonLabel}
              </AppText>
              <ChevronRight size={normalize(13)} color={card.iconBg} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(24),
    paddingBottom: normalize(32),
  },
  sectionTitle: {
    marginBottom: normalize(16),
  },
  row: {
    flexDirection: 'row',
    gap: normalize(12),
  },
  card: {
    flex: 1,
    borderRadius: normalize(24),
    padding: normalize(18),
    overflow: 'hidden',
    position: 'relative',
    borderWidth: normalize(1),
    borderColor: colors.tintsBlue[950],
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)'
  },
  accentCircle: {
    position: 'absolute',
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    top: normalize(-20),
    right: normalize(-20),
  },
  iconWrapper: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
  },
  cardTitle: {
    fontSize: normalize(16),
    marginBottom: normalize(8),
  },
  cardDesc: {
    fontSize: normalize(11),
    lineHeight: normalize(16),
    marginBottom: normalize(16),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(12),
    paddingHorizontal: normalize(14),
    paddingVertical: normalize(8),
    alignSelf: 'flex-start',
    gap: normalize(4),
    boxShadow: '0px 3px 0px #B3DDFF',
    borderWidth: normalize(2),
    borderColor: "#B3DDFF",
  },
  actionBtnText: {
    fontSize: normalize(12),
  },
});
