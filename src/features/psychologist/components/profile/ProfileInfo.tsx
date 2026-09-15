import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors, useTheme } from '@theme/index';
import {
  Verified,
  MessageSquare,
  Heart,
  Globe,
  Clock,
  Video,
  ChevronRight,
  Star,
  X,
  CalendarCheck2,
  StarIcon,
  Play,
} from 'lucide-react-native';
import WebView from 'react-native-webview';
import { resolveImageUrl } from '@api/professionals';

interface ProfileInfoProps {
  onMessage?: () => void;
  onLike?: () => void;
  onWatchVideo?: () => void;
  name?: string;
  avatarUrl?: string;
  specialty?: string;
  rating?: string;
  experience?: string;
  totalSessions?: string;
  languages?: string[];
  tags?: string[];
  bio?: string;
}

const DEFAULT_SPECIALTY_TAGS = ['CBT', 'Anxiety Specialist', 'Stress Management'];

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400';

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  onMessage,
  onLike,
  onWatchVideo,
  name = 'Dr. Expert',
  avatarUrl = DEFAULT_AVATAR,
  specialty = 'Clinical Psychologist',
  rating = '4.9',
  experience = '7+',
  totalSessions = '1.2k+',
  languages = ['English', 'Hindi'],
  tags,
  bio,
}) => {
  const { borderRadius } = useTheme();
  const [liked, setLiked] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [imgError, setImgError] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const activeTags = tags && tags.length > 0 ? tags : DEFAULT_SPECIALTY_TAGS;

  React.useEffect(() => {
    setImgError(false);
  }, [avatarUrl]);

  const openVideo = () => {
    setVideoVisible(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeVideo = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.7,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => setVideoVisible(false));
  };

  const finalAvatarUri = !imgError && avatarUrl
    ? (resolveImageUrl(avatarUrl) || DEFAULT_AVATAR)
    : DEFAULT_AVATAR;

  return (
    <>
      {/* ── Gradient top block ─────────────────────────────────────────── */}
      <LinearGradient
        colors={[
          colors.tintsBlue[200],
          colors.lightTints.blueLightTint[100],
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientWrapper}
      >
        <View style={styles.gradientInnerWrapper}>
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: finalAvatarUri }}
              style={[styles.avatar]}
              onError={() => setImgError(true)}
            />
            <View style={styles.availableBadge}>
              <View style={styles.availableDot} />
              <AppText variant="caption" weight="medium" style={styles.availableText}>
                Available today
              </AppText>
            </View>
          </View>

          {/* Name + Verified */}
          <View style={styles.nameRow}>
            <AppText variant="h2" weight="extraBold" style={styles.name}>
              {name}
            </AppText>
            <Verified
              size={normalize(20)}
              fill={colors.blue[600]}
              stroke={colors.appThemeColor[50]}
              style={{ marginTop: 5 }}
            />
          </View>

          {/* Specialty */}
          <AppText variant="body" weight="medium" style={styles.specialty}>
            {specialty}
          </AppText>

          {/* Specialty Tags */}
          <View style={styles.tagsRow}>
            {activeTags.map((tag) => (
              <View key={tag} style={[styles.tag, { borderRadius: borderRadius.full }]}>
                <AppText variant="caption" weight="medium" style={styles.tagText}>
                  {tag}
                </AppText>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={onMessage}
              activeOpacity={0.85}
              style={styles.messageBtn}
            >
              <LinearGradient
                colors={[colors.lightAppTheme[700], colors.lightAppTheme[950]]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.messageBtnGradient, { borderRadius: borderRadius.full }]}
              >
                <MessageSquare size={normalize(15)} color="#fff" style={{ marginRight: normalize(6) }} />
                <AppText variant="body" weight="bold" style={styles.messageBtnText}>
                  Message
                </AppText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLiked((prev) => !prev)}
              activeOpacity={0.8}
              style={[styles.likeBtn, { borderRadius: borderRadius.full }]}
            >
              <Heart
                size={normalize(18)}
                color={liked ? '#E53935' : colors.appThemeColor[700]}
                fill={liked ? '#E53935' : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          {/* Info Card: Languages */}
          <View style={[styles.infoCard, { borderRadius: borderRadius.l }]}>
            <Globe size={normalize(20)} color={colors.blue[600]} style={{ marginRight: normalize(10) }} />
            <View>
              <AppText variant="caption" weight="extraBold" style={styles.infoCardLabel}>
                Languages
              </AppText>
              <AppText variant="caption" weight="regular" family="secondary" style={styles.infoCardValue}>
                {languages && languages.length > 0 ? languages.join(', ') : 'Hindi, English'}
              </AppText>
            </View>
          </View>

          {/* Info Card: Status */}
          <View style={[styles.infoCard, { borderRadius: borderRadius.l, marginTop: normalize(8), paddingHorizontal: normalize(20), }]}>
            <CalendarCheck2 size={normalize(20)} color={colors.blue[600]} style={{ marginRight: normalize(10) }} />

            <View style={styles.statusLeft}>
              <AppText variant="caption" weight="semiBold" style={styles.busyText}>
                Busy in Therapy
              </AppText>
              <AppText variant="caption" weight="semiBold" style={styles.busyText}>
                Session
              </AppText>
            </View>
            <View style={styles.divider} />
            <View>
              <AppText variant="caption" weight="regular" style={styles.availableInLabel}>
                Available in
              </AppText>
              <AppText variant="caption" weight="bold" style={styles.availableInValue}>
                2 min
              </AppText>
            </View>
            <Clock size={normalize(20)} color={colors.blue[400]} style={{ marginLeft: normalize(10) }} />
          </View>
        </View>
      </LinearGradient>

      {/* ── White block below gradient ─────────────────────────────────── */}
      <View style={styles.whiteBlock}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <AppText variant="h2" weight="extraBold" style={styles.statNumber}>
              {experience || '7+'}
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.statLabel}>
              YEARS EXP
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText variant="h2" weight="extraBold" style={[styles.statNumber, { color: colors.green[800] }]}>
              {totalSessions || '1.2k+'}
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.statLabel}>
              SESSIONS
            </AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.ratingRow}>
              <Star size={normalize(16)} color={colors.colorPalet['Color 8']} fill={colors.colorPalet['Color 8']} style={{ marginRight: 5, marginTop: 5 }} />
              <AppText variant="h2" weight="extraBold" style={[styles.statNumber, { color: colors.appThemeColor[950] }]}>
                {rating || '4.9'}
              </AppText>
            </View>
            <AppText variant="caption" weight="regular" style={styles.statLabel}>
              RATING
            </AppText>
          </View>
        </View>

        {/* About Approach */}
        <View style={styles.aboutSection}>
          <AppText variant="h3" weight="extraBold" style={styles.aboutTitle}>
            About Approach
          </AppText>
          <AppText variant="body" weight="regular" style={styles.aboutText}>
            {bio || "Therapy is not a one-size-fits-all journey. My approach is rooted in creating a safe, compassionate space where we work collaboratively to understand the patterns that keep you stuck."}
          </AppText>
        </View>

        {/* Short Intro Video card */}
        <TouchableOpacity
          onPress={openVideo}
          activeOpacity={0.85}
          style={[styles.videoCard, { borderRadius: borderRadius.l }]}
        >
          <View style={styles.videoThumbnailWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=400',
              }}
              style={[styles.videoThumbnail, { borderRadius: normalize(12) }]}
            />
            <View style={styles.playBtn}>
              <Play size={normalize(16)} color="#fff" fill="#fff" />
            </View>
            <View style={styles.videoDurationBadge}>
              <AppText variant="caption" weight="medium" style={styles.videoDuration}>
                0:15
              </AppText>
            </View>
          </View>
          <View style={styles.videoInfo}>
            <AppText variant="body" weight="extraBold" style={styles.videoTitle}>
              Short Intro Video
            </AppText>
            <AppText variant="caption" weight="regular" style={styles.videoSubtitle}>
              Get to know Dr. Ananya
            </AppText>
            <View style={styles.watchLink}>
              <AppText variant="body" weight="semiBold" style={styles.watchLinkText}>
                Watch intro video
              </AppText>
              <ChevronRight size={normalize(13)} color={colors.blue[600]} style={{ marginTop: normalize(4), marginLeft: normalize(5) }} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Video Modal ─────────────────────────────────────────────────── */}
      <Modal
        visible={videoVisible}
        transparent
        statusBarTranslucent
        animationType="none"
        onRequestClose={closeVideo}
      >
        <TouchableWithoutFeedback onPress={closeVideo}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContainer,
                  { borderRadius: borderRadius.xl },
                  { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
                ]}
              >
                {/* Close Button */}
                <TouchableOpacity
                  onPress={closeVideo}
                  activeOpacity={0.8}
                  style={styles.closeBtn}
                >
                  <X size={normalize(18)} color="#FFFFFF" strokeWidth={2.5} />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.modalHeader}>
                  <AppText variant="body" weight="extraBold" style={styles.modalTitle}>
                    Short Intro Video
                  </AppText>
                  <AppText variant="caption" weight="regular" style={styles.modalSubtitle}>
                    Dr. Ananya Sharma · Clinical Psychologist
                  </AppText>
                </View>

                {/* WebView Player */}
                <View style={[styles.webviewWrapper, { borderRadius: borderRadius.l }]}>
                  <WebView
                    source={{
                      uri: 'https://www.youtube.com/embed/4pKly2JojMw?autoplay=1&rel=0&modestbranding=1',
                    }}
                    style={styles.webview}
                    allowsFullscreenVideo
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled
                  />
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // ── Gradient block ─────────────────────────────────────────────────────────
  gradientWrapper: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(30),
    paddingTop: normalize(20),
    alignItems: 'center',
    borderBottomLeftRadius: normalize(64),
    borderBottomRightRadius: normalize(64),
  },
  gradientInnerWrapper: {
    maxWidth: normalize(300),
    marginHorizontal: 'auto',
    textAlign: 'center'
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  avatar: {
    width: normalize(127),
    height: normalize(127),
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: normalize(32),
  },
  availableBadge: {
    marginTop: normalize(-15),
    position: 'relative'
  },
  availableDot: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(99),
    backgroundColor: colors.green[500],
    marginRight: normalize(4),
    borderWidth: 4,
    borderColor: colors.typographyColor.White,
    position: 'absolute',
    top: -15,
    right: -25,
    zIndex: 111
  },
  availableText: {
    color: colors.typographyColor.Black,
    fontSize: normalize(9),
    backgroundColor: colors.appThemeColor[50],
    borderRadius: 99,
    paddingVertical: 2,
    paddingHorizontal: 10,
    letterSpacing: -0.3
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(6),
    marginBottom: normalize(8),
  },
  name: {
    color: '#2D3432',
    fontSize: normalize(25),
    lineHeight: 30
  },
  specialty: {
    color: colors.blue[600],
    fontSize: normalize(13),
    marginBottom: normalize(10),
    textAlign: 'center'
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: normalize(6),
    marginBottom: normalize(16),
  },
  tag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(6),
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
  },
  tagText: {
    color: '#59615F',
    fontSize: normalize(11),
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
    marginBottom: normalize(14),
    width: '100%',
    justifyContent: 'center',

  },
  messageBtn: {
    // flex: 1,
  },
  messageBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(24),
  },
  messageBtnText: {
    color: '#FFFFFF',
    fontSize: normalize(14),
  },
  likeBtn: {
    width: normalize(48),
    height: normalize(48),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.tintsGrey[100],
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tintsBlue[200],
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(25),
  },
  infoCardLabel: {
    color: colors.blue[950],
    fontSize: normalize(11),
    marginBottom: normalize(2),
  },
  infoCardValue: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(12),
  },
  calendarIcon: {
    width: normalize(22),
    height: normalize(22),
    marginRight: normalize(10),
  },
  statusLeft: {
    // flex: 1,
  },
  busyText: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(10),
  },
  divider: {
    width: 1,
    height: normalize(28),
    backgroundColor: colors.typographyColor['Dark 2'],
    marginHorizontal: normalize(12),
  },
  availableInLabel: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(10),
    marginBottom: normalize(-4),
    textAlign: 'center'
  },
  availableInValue: {
    color: colors.typographyColor['Dark 2'],
    fontSize: normalize(12),
    textAlign: 'center'
  },

  // ── White block ────────────────────────────────────────────────────────────
  whiteBlock: {
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(10),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: normalize(24),
    marginBottom: normalize(4),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: normalize(36),
    backgroundColor: colors.tintsGrey[100],
  },
  statNumber: {
    fontSize: normalize(28),
    color: colors.blue[800],
  },
  statLabel: {
    fontSize: normalize(9),
    color: "#59615F",
    letterSpacing: 0.5,
    marginTop: normalize(2),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutSection: {
    width: '100%',
    marginTop: normalize(18),
    marginBottom: normalize(10),
  },
  aboutTitle: {
    color: '#2D3432',
    marginBottom: normalize(10),
  },
  aboutText: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(14),
    lineHeight: normalize(26),
    textAlign: 'justify',
  },
  highlightText: {
    color: colors.blue[600],
  },

  // ── Video card ─────────────────────────────────────────────────────────────
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(16),
    marginTop: normalize(30),
    gap: normalize(12),
    borderWidth: 1,
    borderColor: '#ddd'
  },
  videoThumbnailWrapper: {
    position: 'relative',
  },
  videoThumbnail: {
    width: normalize(160),
    height: normalize(96),
  },
  // playBtn uses fixed offsets to centre on the 90×65 thumbnail
  playBtn: {
    position: 'absolute',
    top: normalize(30),
    left: normalize(60),
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(99),
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoDurationBadge: {
    position: 'absolute',
    bottom: normalize(4),
    right: normalize(4),
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: normalize(4),
    paddingHorizontal: normalize(4),
    paddingVertical: normalize(2),
  },
  videoDuration: {
    color: '#FFFFFF',
    fontSize: normalize(9),
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    color: colors.appThemeColor[900],
    fontSize: normalize(15),
    lineHeight: normalize(28),
  },
  videoSubtitle: {
    color: colors.typographyColor.Medium,
    fontSize: normalize(11.65),
    lineHeight: normalize(16),
    marginTop: normalize(2),
  },
  watchLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(8),
  },
  watchLinkText: {
    color: '#2563EB',
    fontSize: normalize(12),
  },

  // ── Modal ──────────────────────────────────────────────────────────────────
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 40, 0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(20),
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.appThemeColor[900],
    overflow: 'hidden',
    paddingTop: normalize(16),
    paddingBottom: normalize(20),
  },
  closeBtn: {
    position: 'absolute',
    top: normalize(12),
    right: normalize(12),
    zIndex: 10,
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(16),
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    paddingHorizontal: normalize(16),
    marginBottom: normalize(14),
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
  modalSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(11),
    marginTop: normalize(2),
  },
  webviewWrapper: {
    marginHorizontal: normalize(16),
    height: normalize(200),
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});
