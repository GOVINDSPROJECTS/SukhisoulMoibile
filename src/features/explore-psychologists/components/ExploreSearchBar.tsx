import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import { colors } from '@theme/index';
import { normalize } from '@utils/responsive';

interface ExploreSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

export const ExploreSearchBar: React.FC<ExploreSearchBarProps> = ({
  value,
  onChangeText,
  onFilterPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Search Field */}
      <View style={styles.inputWrapper}>
        <Search
          size={normalize(18)}
          color={colors.typographyColor.Light}
          strokeWidth={2}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search for therapists, specialties..."
          placeholderTextColor="#94A3B8"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
        />
        {value.trim().length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.clearBtn}
            activeOpacity={0.7}
          >
            <X size={normalize(15)} color="#64748B" strokeWidth={2.5} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter icon button */}
      <TouchableOpacity
        style={styles.filterBtn}
        activeOpacity={0.75}
        onPress={onFilterPress}
      >
        <SlidersHorizontal
          size={normalize(18)}
          color={colors.typographyColor.Dark}
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    gap: normalize(10),
    marginBottom: normalize(14),
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.typographyColor.White,
    borderRadius: normalize(19),
    borderWidth: 1.2,
    borderColor: colors.tintsGrey[100],
    paddingLeft: normalize(16),
    paddingRight: normalize(12),
    height: normalize(48),
    gap: normalize(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: normalize(13),
    color: '#1E293B',
    padding: 0,
    fontWeight: '500',
  },
  clearBtn: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtn: {
    width: normalize(46),
    height: normalize(46),
    borderRadius: normalize(99),
    backgroundColor: colors.typographyColor.White,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    borderColor: colors.tintsGrey[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
});
