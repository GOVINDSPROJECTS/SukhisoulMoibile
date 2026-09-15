import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { X, Lightbulb, Calendar, Video, Tag, Globe, Star, type LucideIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { colors } from '@theme/index';
import { normalize } from '@utils/responsive';
import LinearGradient from 'react-native-linear-gradient';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface FilterState {
  concerns: string[];
  availability: string[];
  modes: string[];
  priceRange: string[];
  languages: string[];
  rating: string[];
}

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Fixed sheet height — 78% of screen */
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.78;
/** translateY = 0 means sheet is fully visible at bottom */
const SNAP_OPEN = 0;
/** translateY = SHEET_HEIGHT means sheet is fully hidden below screen */
const SNAP_HIDDEN = SHEET_HEIGHT;
/** How far user must drag down (dy) to trigger dismiss */
const DISMISS_DY = SHEET_HEIGHT * 0.3;

const CONCERNS = [
  { key: 'anxiety', label: '🧠 Anxiety' },
  { key: 'stress', label: '⚡ Stress' },
  { key: 'depression', label: '♟ Depression' },
  { key: 'relationships', label: '👫 Relationships' },
  { key: 'sleep', label: '😊 Sleep' },
  { key: 'stressMgmt', label: '🧑 Stress Mgmt' },
  { key: 'adhd', label: '🎯 ADHD' },
  { key: 'trauma', label: '🖋 Trauma' },
];

const AVAILABILITY = [
  { key: 'now', label: 'Available Now' },
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
  { key: 'week', label: 'This Week' },
];

const MODES = [
  { key: 'video', label: '🖥 Video Call' },
  { key: 'audio', label: '📞 Audio Call' },
  { key: 'chat', label: '💬 Chat' },
  { key: 'inPerson', label: '🧑 In-Person' },
];

const PRICE_RANGES = [
  { key: 'free', label: 'Free / Intro' },
  { key: 'under500', label: 'Under ₹500' },
  { key: '500to1000', label: '₹500 – ₹1000' },
  { key: '1000plus', label: '₹1000+' },
];

const LANGUAGES = [
  { key: 'english', label: 'English' },
  { key: 'hindi', label: 'Hindi' },
  { key: 'marathi', label: 'Marathi' },
  { key: 'tamil', label: 'Tamil' },
  { key: 'bengali', label: 'Bengali' },
];

const RATINGS = [
  { key: '3plus', label: '⭐ 3.0+' },
  { key: '4.5plus', label: '⭐ 4.5+' },
  { key: '4.8plus', label: '⭐ 4.8+' },
];

const DEFAULT_FILTERS: FilterState = {
  concerns: [],
  availability: [],
  modes: [],
  priceRange: [],
  languages: [],
  rating: [],
};



// ─── Component ─────────────────────────────────────────────────────────────────

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const insets = useSafeAreaInsets();
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Only translateY is animated — native driver only
  const translateY = useRef(new Animated.Value(SNAP_HIDDEN)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const isAnimatingRef = useRef(false);


  // ─── Open / Close animation ──────────────────────────────────────────────────

  useEffect(() => {
    if (visible) {
      setFilters(initialFilters);
      // Start hidden below the fold, spring up to open position
      translateY.setValue(SNAP_HIDDEN);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: SNAP_OPEN,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const animateClose = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SNAP_HIDDEN,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isAnimatingRef.current = false;
      onClose();
    });
  }, [onClose, translateY, backdropOpacity]);

  const snapToOpen = useCallback(() => {
    Animated.spring(translateY, {
      toValue: SNAP_OPEN,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [translateY]);

  // ─── Pan Responder (drag handle only — swipe down to dismiss) ────────────────

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dy) > 4 && Math.abs(gs.dy) > Math.abs(gs.dx),
      onPanResponderGrant: () => {
        translateY.stopAnimation((val) => {
          translateY.setOffset(val);
          translateY.setValue(0);
        });
      },
      onPanResponderMove: (_, gs) => {
        // Only allow downward drag
        if (gs.dy > 0) {
          translateY.setValue(gs.dy);
        }
      },
      onPanResponderRelease: (_, gs) => {
        translateY.flattenOffset();
        const dy = gs.dy;
        const vy = gs.vy;

        if (dy > DISMISS_DY || vy > 1.2) {
          // Drag down past threshold → dismiss
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: SNAP_HIDDEN,
              duration: 280,
              useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
              toValue: 0,
              duration: 280,
              useNativeDriver: true,
            }),
          ]).start(() => onClose());
        } else {
          // Partial drag — snap back to open
          snapToOpen();
        }
      },
    }),
  ).current;

  // ─── Filter helpers ───────────────────────────────────────────────────────────

  const toggleFilter = useCallback(
    <K extends keyof FilterState>(category: K, key: string) => {
      setFilters((prev) => {
        const arr = prev[category] as string[];
        const exists = arr.includes(key);
        return {
          ...prev,
          [category]: exists ? arr.filter((k) => k !== key) : [...arr, key],
        };
      });
    },
    [],
  );

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const handleApply = useCallback(() => {
    onApply(filters);
    animateClose();
  }, [filters, onApply, animateClose]);

  const totalActive = Object.values(filters).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  // ─── Sub-components ───────────────────────────────────────────────────────────

  const Chip = ({
    label,
    selected,
    onPress,
    styleCustom
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
    styleCustom: StyleProp<ViewStyle>;
  }) => (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected, styleCustom]}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <AppText
        variant="body"
        weight="medium"
        family='secondary'
        color={
          selected
            ? colors.typographyColor['Dark 2']
            : colors.typographyColor.Medium
        }
        style={styles.chipText}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );

  const ICON_MAP: Record<string, LucideIcon> = {
    bulb: Lightbulb,
    calendar: Calendar,
    video: Video,
    tag: Tag,
    global: Globe,
    star: Star,
  };

  const SectionHeader = ({
    icon,
    title,
  }: {
    icon: string;
    title: string;
  }) => {
    const IconComponent = ICON_MAP[icon] ?? X;
    return (
      <View style={styles.sectionHeader}>
        <IconComponent size={normalize(17)} color={colors.lightAppTheme[700]} strokeWidth={2} />
        <AppText
          variant="h4"
          weight="semiBold"
          family='secondary'
          color={colors.typographyColor['Color 2']}
          style={{ fontSize: normalize(14) }}
        >
          {title}
        </AppText>
      </View>
    );
  };

  const GridChips = ({
    items,
    selected,
    onToggle,
    itemStyle
  }: {
    items: { key: string; label: string }[];
    selected: string[];
    onToggle: (key: string) => void;
    itemStyle?: StyleProp<ViewStyle>;
  }) => (
    <View style={[styles.chipGrid]}>
      {items.map((item) => (
        <Chip
          key={item.key}
          label={item.label}
          selected={selected.includes(item.key)}
          onPress={() => onToggle(item.key)}
          styleCustom={itemStyle}
        />
      ))}
    </View>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={animateClose}
    >
      {/* ── Backdrop ── */}
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={animateClose}
        />
      </Animated.View>

      {/* ── Sheet ── */}
      <Animated.View
        style={[
          styles.sheet,
          { transform: [{ translateY }] },
        ]}
      >
        {/* Drag Handle */}
        <View {...panResponder.panHandlers} style={styles.dragZone}>
          <View style={styles.dragHandle} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={animateClose}
          >
            <X
              size={normalize(18)}
              color={colors.lightAppTheme[600]}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <AppText
            variant="h4"
            weight="semiBold"
            color={colors.typographyColor.Black}
          >
            Filter Therapists
          </AppText>

          <TouchableOpacity activeOpacity={0.7} onPress={handleReset}>
            <AppText
              variant="body"
              weight="semiBold"
              color={colors.typographyColor['Dark 2']}
            >
              Reset
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <SectionHeader icon="bulb" title="Concern" />
          <GridChips
            items={CONCERNS}
            selected={filters.concerns}
            onToggle={(k) => toggleFilter('concerns', k)}
            itemStyle={[styles.minWidth2, styles.alignLeft]}
          />

          <SectionHeader icon="calendar" title="Availability" />
          <GridChips
            items={AVAILABILITY}
            selected={filters.availability}
            onToggle={(k) => toggleFilter('availability', k)}
            itemStyle={styles.minWidth3}
          />

          <SectionHeader icon="video" title="Mode" />
          <GridChips
            items={MODES}
            selected={filters.modes}
            onToggle={(k) => toggleFilter('modes', k)}
            itemStyle={styles.minWidth2}
          />

          <SectionHeader icon="tag" title="Price Range" />
          <GridChips
            items={PRICE_RANGES}
            selected={filters.priceRange}
            onToggle={(k) => toggleFilter('priceRange', k)}
            itemStyle={styles.minWidth3}
          />

          <SectionHeader icon="global" title="Language" />
          <GridChips
            items={LANGUAGES}
            selected={filters.languages}
            onToggle={(k) => toggleFilter('languages', k)}
            itemStyle={styles.minWidth4}
          />

          <SectionHeader icon="star" title="Rating" />
          <GridChips
            items={RATINGS}
            selected={filters.rating}
            onToggle={(k) => toggleFilter('rating', k)}
            itemStyle={styles.minWidth3}
          />

          <View style={{ height: normalize(16) }} />
        </ScrollView>

        {/* Footer */}
        <View
          style={[
            styles.footer,
            {
              // Guarantee at least 16dp bottom breathing room regardless of safe area
              paddingBottom: Math.max(insets.bottom, normalize(16)),
            },
          ]}
        >
          <TouchableOpacity
            style={styles.clearBtn}
            activeOpacity={0.8}
            onPress={handleReset}
          >
            <AppText
              variant="body"
              weight="semiBold"
              color={colors.typographyColor['Dark 2']}
            >
              Clear All
            </AppText>
          </TouchableOpacity>

          <LinearGradient
            colors={[
              colors.lightAppTheme[700],
              colors.lightAppTheme[950],
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.applyBtn}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleApply}
            >
              <AppText
                variant="body"
                weight="bold"
                color={colors.typographyColor.White}
              >
                Show Results
              </AppText>
              <AppText
                variant="caption"
                weight="regular"
                color={colors.appThemeColor[200]}
                style={styles.applySubtext}
              >
                {totalActive > 0
                  ? `${totalActive} filter${totalActive > 1 ? 's' : ''} applied`
                  : '128 Therapists'}
              </AppText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animated.View>
    </Modal>
  );
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const totalAvailableWidth = SCREEN_WIDTH - normalize(20) * 2;

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SHEET_HEIGHT,
    backgroundColor: colors.typographyColor.White,
    borderTopLeftRadius: normalize(24),
    borderTopRightRadius: normalize(24),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  dragZone: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: normalize(12),
  },
  dragHandle: {
    width: normalize(40),
    height: normalize(4),
    borderRadius: normalize(99),
    backgroundColor: colors.tintsGrey[200],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(14),
    borderBottomWidth: 1,
    borderBottomColor: colors.tintsGrey[50],
  },
  headerIconBtn: {
    width: normalize(32),
    height: normalize(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
    marginBottom: normalize(12),
    marginTop: normalize(4),
  },
  sectionIcon: {
    fontSize: normalize(16),
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(0),
    marginBottom: normalize(20),
  },
  chip: {
    paddingHorizontal: normalize(11),
    paddingVertical: normalize(10),
    borderRadius: normalize(10),
    borderWidth: 1.3,
    borderColor: colors.appThemeColor[200],
    backgroundColor: colors.typographyColor.White,
    alignItems: 'center',
    justifyContent: 'center',
    margin: normalize(5)
  },
  chipSelected: {
    borderColor: colors.blue[100],
    borderWidth: normalize(2),
    backgroundColor: colors.blue[50],
  },
  chipText: {
    fontSize: normalize(12),
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: normalize(20),
    paddingTop: normalize(12),
    gap: normalize(12),
    borderTopWidth: 1,
    borderTopColor: colors.tintsGrey[50],
    backgroundColor: colors.typographyColor.White,
  },
  clearBtn: {
    flex: 1,
    height: normalize(52),
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.typographyColor['Dark 2'],
    backgroundColor: colors.typographyColor.White,
    paddingVertical: normalize(7),
    minWidth: normalize(80)
  },
  applyBtn: {
    flex: 2,
    minHeight: normalize(52),
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appThemeColor[700],
    paddingVertical: normalize(7)
  },
  applySubtext: {
    marginTop: normalize(2),
    fontSize: normalize(11),
  },
  minWidth2: {
    minWidth: totalAvailableWidth / 2 - normalize(10),
  },
  minWidth3: {
    minWidth: totalAvailableWidth / 3.2 - normalize(10),
  },
  minWidth4: {
    minWidth: totalAvailableWidth / 4 - normalize(10),
  },
  alignLeft: {
    alignItems: 'flex-start'
  },
});
