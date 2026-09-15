import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export const DashboardPagination: React.FC = () => {
  const { colors } = useTheme();

  const pages = [1, 2, 3];
  const activePage = 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.arrowButton, { backgroundColor: '#FFFFFF' }]} activeOpacity={0.7}>
        <ChevronLeft size={normalize(16)} color={colors.appThemeColor[500]} />
      </TouchableOpacity>

      {pages.map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.pageButton,
            { backgroundColor: page === activePage ? colors.purple[900] : '#FFFFFF' }
          ]}
          activeOpacity={0.7}
        >
          <AppText
            family="secondary"
            weight={page === activePage ? "medium" : "medium"}
            style={{
              fontSize: normalize(14),
              color: page === activePage ? '#FFFFFF' : colors.appThemeColor[700]
            }}
          >
            {page}
          </AppText>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={[styles.arrowButton, { backgroundColor: '#FFFFFF' }]} activeOpacity={0.7}>
        <ChevronRight size={normalize(16)} color={colors.appThemeColor[500]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(25),
    marginBottom: normalize(16),
  },
  arrowButton: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: normalize(4),
  },
  pageButton: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(9),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: normalize(4),
  }
});
