import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type TabKey = 'dailyTask' | 'earnedPoints';

interface TaskTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const TaskTabBar: React.FC<TaskTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const handlePress = (tab: TabKey) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {/* Daily Task Tab */}
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'dailyTask' && styles.tabActive1,
        ]}
        activeOpacity={0.85}
        onPress={() => handlePress('dailyTask')}
      >
        <AppText
          variant="body"
          weight={activeTab === 'dailyTask' ? 'bold' : 'bold'}
          color={
            activeTab === 'dailyTask'
              ? colors.typographyColor.Black
              : colors.typographyColor.Black
          }
          style={styles.tabText}
        >
          Daily Task
        </AppText>
        {activeTab === 'dailyTask' && (
          <View style={styles.activeUnderline} />
        )}
      </TouchableOpacity>

      {/* Earned Points Tab */}
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'earnedPoints' && styles.tabActive2,
        ]}
        activeOpacity={0.85}
        onPress={() => handlePress('earnedPoints')}
      >
        <AppText
          variant="body"
          weight={activeTab === 'earnedPoints' ? 'bold' : 'bold'}
          color={
            activeTab === 'earnedPoints'
              ? colors.typographyColor.Black
              : colors.typographyColor.Black
          }
          style={styles.tabText}
        >
          Earned Points
        </AppText>
        {activeTab === 'earnedPoints' && (
          <View style={styles.activeUnderline} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.lightTints.blueLightTint[100],
    borderRadius: normalize(0),
    marginBottom: normalize(8),
    padding: normalize(0),
    paddingTop: normalize(10),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: normalize(15),
    paddingTop: normalize(20),
  },
  tabActive1: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderTopLeftRadius: normalize(30),
    borderTopRightRadius: normalize(30),
  },
  tabActive2: {
    backgroundColor: colors.lightTints.blueLightTint[50],
    borderTopLeftRadius: normalize(30),
    borderTopRightRadius: normalize(30),
  },
  tabText: {
    fontSize: normalize(13),
  },
  activeUnderline: {
    position: 'absolute',
    bottom: normalize(5),
    width: '35%',
    height: normalize(3),
    backgroundColor: colors.lightAppTheme[700],
    borderRadius: normalize(99)
  },
});
