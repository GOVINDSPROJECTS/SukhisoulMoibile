import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated, LayoutChangeEvent } from 'react-native';
import { useTheme } from '@theme/index';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { CategoryType } from '../../../components/atoms/types';

type QuickCategoriesProps = {
  activeCategory: CategoryType;
  onChangeTab: (tab: CategoryType) => void;
};


export const QuickCategories: React.FC<QuickCategoriesProps> = ({
  activeCategory,
  onChangeTab,
}) => {
  const { colors, borderRadius } = useTheme();

  const categories: {
    id: CategoryType;
    label: string;
    image: any;
    bgColor: string;
  }[] = [
      { id: 'psychologist', label: 'Psychologist', image: require('../assets/icon-tab1.png'), bgColor: colors.lightTints.blueLightTint['50'] },
      { id: 'manifest', label: 'Manifest', image: require('../assets/icon-tab2.png'), bgColor: colors.lightTints.purpleLightTint['50'] },
      { id: 'daily-task', label: 'Daily Task', image: require('../assets/icon-tab3.png'), bgColor: colors.typographyColor.White },
      { id: 'health', label: 'Health', image: require('../assets/icon-tab4.png'), bgColor: colors.green[50] },
    ];
  const translateX = React.useRef(new Animated.Value(0)).current;
  const [bubbleColor, setBubbleColor] = useState('transparent');

  const [layouts, setLayouts] = useState<
    Record<string, { x: number; width: number }>
  >({});

  useEffect(() => {
    if (activeCategory === 'home') {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();

      setBubbleColor('transparent');
      return;
    }

    const layout = layouts[activeCategory];

    if (!layout) return;

    setBubbleColor(
      categories.find(c => c.id === activeCategory)?.bgColor ?? 'transparent',
    );

    Animated.spring(translateX, {
      toValue: layout.x,
      useNativeDriver: false,
      speed: 15,
      bounciness: 6,
    }).start();
  }, [activeCategory, layouts]);

  const scaleAnimations = React.useRef(
    categories.reduce((acc, category) => {
      acc[category.id] = new Animated.Value(
        activeCategory === category.id ? 1.15 : 1,
      );
      return acc;
    }, {} as Record<CategoryType, Animated.Value>),
  ).current;
  useEffect(() => {
    categories.forEach(category => {
      Animated.spring(scaleAnimations[category.id], {
        toValue: activeCategory === category.id ? 1.15 : 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 6,
      }).start();
    });
  }, [activeCategory]);

  return (
    <View style={styles.container}>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.activeBubble,
          {
            opacity: activeCategory === 'home' ? 0 : 1,
            backgroundColor: bubbleColor,
            width:
              activeCategory !== 'home'
                ? layouts[activeCategory]?.width
                : 0,
            transform: [{ translateX }],
            borderRadius: borderRadius.l,
            bottom: activeCategory === 'daily-task' ? 0 : normalize(-15)
          },
        ]}
      />

      {categories.map((category) => (
        <TouchableOpacity
          onLayout={(event: LayoutChangeEvent) => {
            const { x, width } = event.nativeEvent.layout;

            setLayouts(prev => ({
              ...prev,
              [category.id]: { x, width },
            }));
          }}
          key={category.id}
          style={styles.categoryItem}
          activeOpacity={0.7}
          onPress={() => {
            if (activeCategory === category.id) {
              onChangeTab('home');
            } else {
              onChangeTab(category.id);
            }
          }}
        >
          <View style={[styles.card, { backgroundColor: activeCategory != category.id ? colors.typographyColor.White : 'transparent', borderRadius: borderRadius.l }]}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: scaleAnimations[category.id],
                  },
                ],
              }}
            >
              <Image
                source={category.image}
                style={styles.categoryImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          <AppText
            variant="caption"
            style={[styles.label, { color: colors.typographyColor['Dark 2'] }]}
            numberOfLines={1}
          >
            {category.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(16),
    paddingBottom: normalize(0),
    marginHorizontal: normalize(-17),
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    paddingTop: normalize(8),
    borderRadius: normalize(12),
    paddingBottom: normalize(20),
    marginBottom: normalize(-12),
    position: 'relative',
  },
  activeBubble: {
    position: 'absolute',
    top: 0,
    bottom: normalize(-15),
  },
  bgActive: {
    width: '100%',
    borderRadius: normalize(36),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  card: {
    width: normalize(64),
    height: normalize(45),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(7),
    borderRadius: normalize(10),
    overflow: 'hidden',
  },
  categoryImage: {
    width: normalize(27),
    height: normalize(27),
  },
  label: {
    fontSize: normalize(11),
    textAlign: 'center',
  },
});
