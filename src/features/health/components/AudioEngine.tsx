import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export interface AudioEngineRef {
  playChime: (pitch?: number) => void;
  stopAudio: () => void;
}

interface AudioEngineProps {
  isPlaying?: boolean;
}

/**
 * Lightweight, zero-native-dependency Audio Engine.
 * Uses Web Audio API inside a 0-size WebView to generate authentic
 * calming meditation singing bowl / chime tones (2-5 seconds).
 */
export const AudioEngine = forwardRef<AudioEngineRef, AudioEngineProps>(
  ({ isPlaying }, ref) => {
    const webViewRef = useRef<WebView<{}>>(null);

    const audioHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:transparent; margin:0; padding:0;">
  <script>
    var audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        var AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    // Play an organic, soothing meditation singing bowl sound (3.5 seconds)
    function playMeditationChime(baseFreq) {
      try {
        var ctx = getAudioContext();
        var now = ctx.currentTime;
        var fundamental = baseFreq || 432; // 432Hz healing / calming frequency

        // Harmonic overtones for rich singing bowl sound
        var harmonics = [
          { mult: 1.0, gain: 0.35, decay: 3.5 },
          { mult: 2.76, gain: 0.15, decay: 2.8 },
          { mult: 5.4, gain: 0.08, decay: 2.0 },
          { mult: 8.9, gain: 0.04, decay: 1.5 }
        ];

        harmonics.forEach(function(h) {
          var osc = ctx.createOscillator();
          var gainNode = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(fundamental * h.mult, now);

          // Attack (soft swell) -> Exponential Decay
          gainNode.gain.setValueAtTime(0.0001, now);
          gainNode.gain.exponentialRampToValueAtTime(h.gain, now + 0.08);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + h.decay);
        });
      } catch (e) {
        console.error('WebAudio Error', e);
      }
    }

    function stopAll() {
      if (audioCtx && audioCtx.state === 'running') {
        audioCtx.suspend();
      }
    }

    window.addEventListener('message', function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.action === 'play') {
          playMeditationChime(data.pitch);
        } else if (data.action === 'stop') {
          stopAll();
        }
      } catch (err) {}
    });
  </script>
</body>
</html>
`;

    useImperativeHandle(ref, () => ({
      playChime: (pitch = 432) => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({ action: 'play', pitch })
          );
        }
      },
      stopAudio: () => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(JSON.stringify({ action: 'stop' }));
        }
      },
    }));

    return (
      <View style={styles.hiddenContainer} pointerEvents="none">
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: audioHtml }}
          style={styles.hiddenWebView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  hiddenContainer: {
    width: 0,
    height: 0,
    opacity: 0,
    position: 'absolute',
  },
  hiddenWebView: {
    width: 1,
    height: 1,
    opacity: 0,
  },
});
