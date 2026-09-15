import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { normalize } from '@utils/responsive';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react-native';

interface MeditationPlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const MeditationPlayerControls: React.FC<MeditationPlayerControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
}) => {
  return (
    <View style={styles.controlsRow}>
      {/* Previous Button */}
      <TouchableOpacity
        style={styles.navButton}
        activeOpacity={0.7}
        onPress={onPrevious}
      >
        <SkipBack size={normalize(26)} color="#1E293B" fill="#1E293B" />
      </TouchableOpacity>

      {/* Main Play/Pause Button */}
      <TouchableOpacity
        style={styles.playPauseButton}
        activeOpacity={0.85}
        onPress={onTogglePlay}
      >
        {isPlaying ? (
          <Pause size={normalize(28)} color="#FFFFFF" fill="#FFFFFF" />
        ) : (
          <Play
            size={normalize(28)}
            color="#FFFFFF"
            fill="#FFFFFF"
            style={{ marginLeft: normalize(3) }}
          />
        )}
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.navButton}
        activeOpacity={0.7}
        onPress={onNext}
      >
        <SkipForward size={normalize(26)} color="#1E293B" fill="#1E293B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(24),
    gap: normalize(36),
    marginBottom: normalize(10)
  },
  navButton: {
    padding: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: normalize(76),
    height: normalize(76),
    borderRadius: normalize(38),
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 10px 15px -3px rgba(74, 144, 226, 0.3), 0px 4px 6px -4px rgba(74, 144, 226, 0.3)',
  },
});
