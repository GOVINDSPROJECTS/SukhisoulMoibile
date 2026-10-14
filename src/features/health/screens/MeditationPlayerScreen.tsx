import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, MoreVertical } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { MeditationPlayerHero } from '../components/MeditationPlayerHero';
import { MeditationPlayerControls } from '../components/MeditationPlayerControls';
import { MeditationActionCards } from '../components/MeditationActionCards';
import { MeditationCompletionCard } from '../components/MeditationCompletionCard';
import { AudioEngine, AudioEngineRef } from '../components/AudioEngine';
import { SessionInfoModal } from '../components/SessionInfoModal';
import { PlayerMenuModal } from '../components/PlayerMenuModal';
import { colors } from '@/theme';

interface TrackItem {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  durationSec: number;
  initialElapsedSec: number;
  pitch: number;
}

const PLAYLIST: TrackItem[] = [
  {
    id: 'track-1',
    title: 'Body Relaxing Music Patterns',
    subtitle: 'Calm your mind and relax your body',
    genre: 'AMBIENT',
    durationSec: 1200, // 20:00
    initialElapsedSec: 435, // 07:15
    pitch: 432,
  },
  {
    id: 'track-2',
    title: 'Deep Breathing Wave Harmony',
    subtitle: 'Synchronize breath with restorative flow',
    genre: 'BREATHWORK',
    durationSec: 900, // 15:00
    initialElapsedSec: 300, // 05:00
    pitch: 528,
  },
  {
    id: 'track-3',
    title: 'Morning Forest Mindfulness',
    subtitle: 'Awaken your inner clarity and tranquility',
    genre: 'NATURE',
    durationSec: 600, // 10:00
    initialElapsedSec: 120, // 02:00
    pitch: 396,
  },
];

export const MeditationPlayerScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const audioEngineRef = useRef<AudioEngineRef>(null);

  // Track State
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const currentTrack = PLAYLIST[currentTrackIndex];

  // Playback State (On / Off)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = useState<number>(
    currentTrack.initialElapsedSec
  );

  // Modals
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [infoModalTab, setInfoModalTab] = useState<'about' | 'instructions'>(
    'about'
  );
  const [menuModalVisible, setMenuModalVisible] = useState<boolean>(false);

  // Timer simulation when playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSec((prev) => {
          if (prev >= currentTrack.durationSec) {
            setIsPlaying(false);
            return currentTrack.durationSec;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.durationSec]);

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentTimeStr = formatTime(elapsedSec);
  const totalTimeStr = formatTime(currentTrack.durationSec);
  const remainingSec = Math.max(0, currentTrack.durationSec - elapsedSec);
  const minLeftStr = formatTime(remainingSec);
  const progressRatio = elapsedSec / currentTrack.durationSec;

  // Stop audio when screen unmounts
  useEffect(() => {
    return () => {
      audioEngineRef.current?.stopAudio();
    };
  }, []);

  // Toggle Play/Pause (On/Off)
  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      audioEngineRef.current?.playTrack(currentTrack);
    } else {
      audioEngineRef.current?.pauseAudio();
    }
  };

  // Next Track
  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    setElapsedSec(PLAYLIST[nextIdx].initialElapsedSec);
    if (isPlaying) {
      audioEngineRef.current?.playTrack(PLAYLIST[nextIdx]);
    }
  };

  // Previous Track
  const handlePrevTrack = () => {
    const prevIdx =
      (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setCurrentTrackIndex(prevIdx);
    setElapsedSec(PLAYLIST[prevIdx].initialElapsedSec);
    if (isPlaying) {
      audioEngineRef.current?.playTrack(PLAYLIST[prevIdx]);
    }
  };

  // Seek on scrubber
  const handleSeek = (ratio: number) => {
    const newElapsed = Math.floor(ratio * currentTrack.durationSec);
    setElapsedSec(newElapsed);
    audioEngineRef.current?.seekAudio(ratio);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F8FD" />

      {/* Hidden Web Audio Engine */}
      <AudioEngine ref={audioEngineRef} isPlaying={isPlaying} />

      {/* Soft Gradient Background */}
      <LinearGradient
        colors={['#F6FAFF', colors.tintsBlue[600]]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Scrollable Container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: insets.bottom + normalize(40) },
        ]}
      >
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          {/* Circular Back Button */}
          <TouchableOpacity
            style={styles.circleHeaderBtn}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={normalize(20)} color="#1E293B" />
          </TouchableOpacity>

          {/* Center Title & Segmented Indicator */}
          <View style={styles.headerCenter}>
            <AppText style={styles.headerTitle} weight="bold">
              Meditation
            </AppText>
            {/* Segmented Progress Indicator Bar */}
            <View style={styles.segmentedBar}>
              <View style={[styles.segment, styles.segmentActive]} />
              <View style={[styles.segment, styles.segmentInactive]} />
            </View>
          </View>

          {/* Circular 3-Dots Menu Button */}
          <TouchableOpacity
            style={styles.circleHeaderBtn}
            activeOpacity={0.8}
            onPress={() => setMenuModalVisible(true)}
          >
            <MoreVertical size={normalize(20)} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {/* Track Title & Subtitle */}
        <View style={styles.titleSection}>
          <AppText style={styles.mainTitle} weight="bold">
            {currentTrack.title}
          </AppText>
          <AppText style={styles.mainSubtitle} weight="regular">
            {currentTrack.subtitle}
          </AppText>
        </View>

        {/* Main Player Hero Card with Scrubber */}
        <MeditationPlayerHero
          genreTag={currentTrack.genre}
          minLeft={minLeftStr}
          currentTimeStr={currentTimeStr}
          totalTimeStr={totalTimeStr}
          progressRatio={progressRatio}
          onSeek={handleSeek}
        />

        {/* Player Controls (Prev, Play/Pause, Next) */}
        <MeditationPlayerControls
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onPrevious={handlePrevTrack}
          onNext={handleNextTrack}
        />

        {/* Side-by-side Action Cards */}
        <MeditationActionCards
          onOpenAbout={() => {
            setInfoModalTab('about');
            setInfoModalVisible(true);
          }}
          onOpenInstructions={() => {
            setInfoModalTab('instructions');
            setInfoModalVisible(true);
          }}
        />

        {/* Bottom Progress Card */}
        <MeditationCompletionCard completedPercent={35} />
      </ScrollView>

      {/* About & Instructions Modal */}
      <SessionInfoModal
        visible={infoModalVisible}
        initialTab={infoModalTab}
        onClose={() => setInfoModalVisible(false)}
      />

      {/* 3-Dots Menu Modal */}
      <PlayerMenuModal
        visible={menuModalVisible}
        onClose={() => setMenuModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6FAFF',
  },
  scrollContainer: {
    paddingTop: normalize(10),
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(12),
  },
  circleHeaderBtn: {
    width: normalize(44),
    height: normalize(44),
    borderRadius: normalize(22),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: normalize(18),
    color: '#1E293B',
    marginBottom: normalize(6),
  },
  segmentedBar: {
    flexDirection: 'row',
    gap: normalize(4),
  },
  segment: {
    width: normalize(32),
    height: normalize(3),
    borderRadius: normalize(2),
  },
  segmentActive: {
    backgroundColor: '#3B82F6',
  },
  segmentInactive: {
    backgroundColor: '#CBD5E1',
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: normalize(24),
    marginTop: normalize(12),
    marginBottom: normalize(4),
  },
  mainTitle: {
    fontSize: normalize(20),
    color: '#1A2B4B',
    textAlign: 'center',
    marginBottom: normalize(4),
  },
  mainSubtitle: {
    fontSize: normalize(13),
    color: '#64748B',
    textAlign: 'center',
  },
});
