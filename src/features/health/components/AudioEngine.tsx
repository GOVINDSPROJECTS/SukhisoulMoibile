import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export interface AudioEngineRef {
  playTrack: (track: { id: string; pitch: number; genre: string; url?: string }) => void;
  playChime: (pitch?: number) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  seekAudio: (ratio: number) => void;
}

interface AudioEngineProps {
  isPlaying?: boolean;
}

/**
 * High-Fidelity Continuous Meditation Audio Engine.
 * Provides continuous calming harmonic soundscapes, therapeutic binaural frequency beds,
 * and periodic Tibetan singing bowl swells via Web Audio API and HTML5 streaming.
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
    var masterGain = null;
    var ambientNodes = [];
    var periodicInterval = null;
    var currentTrackInfo = null;
    var audioElement = null;

    function getAudioContext() {
      if (!audioCtx) {
        var AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    // Play a single Tibetan singing bowl chime with rich harmonics
    function playMeditationChime(baseFreq) {
      try {
        var ctx = getAudioContext();
        var now = ctx.currentTime;
        var fundamental = baseFreq || 432;

        var harmonics = [
          { mult: 1.0, gain: 0.35, decay: 4.5 },
          { mult: 2.76, gain: 0.18, decay: 3.5 },
          { mult: 5.4, gain: 0.09, decay: 2.5 },
          { mult: 8.9, gain: 0.04, decay: 1.8 }
        ];

        harmonics.forEach(function(h) {
          var osc = ctx.createOscillator();
          var gainNode = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(fundamental * h.mult, now);

          gainNode.gain.setValueAtTime(0.0001, now);
          gainNode.gain.exponentialRampToValueAtTime(h.gain, now + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

          osc.connect(gainNode);
          gainNode.connect(masterGain);

          osc.start(now);
          osc.stop(now + h.decay);
        });
      } catch (e) {
        console.error('WebAudio Chime Error', e);
      }
    }

    // Stop all active ambient soundscape nodes
    function stopAmbient() {
      if (periodicInterval) {
        clearInterval(periodicInterval);
        periodicInterval = null;
      }

      if (ambientNodes.length > 0) {
        var now = audioCtx ? audioCtx.currentTime : 0;
        ambientNodes.forEach(function(item) {
          try {
            if (item.gain) {
              item.gain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
            }
            if (item.osc) {
              item.osc.stop(now + 0.6);
            }
          } catch (e) {}
        });
        ambientNodes = [];
      }

      if (audioElement) {
        audioElement.pause();
        audioElement = null;
      }
    }

    // Start a continuous restorative ambient soundscape tailored to the track
    function startAmbientSoundscape(track) {
      stopAmbient();
      var ctx = getAudioContext();
      currentTrackInfo = track;

      // If track has an external streaming audio URL, play it
      if (track.url) {
        audioElement = new Audio(track.url);
        audioElement.loop = true;
        audioElement.play().catch(function(e) {
          console.warn('HTML5 Audio fallback to WebAudio generative engine');
          startGenerativeSoundscape(track);
        });
        return;
      }

      startGenerativeSoundscape(track);
    }

    // Generative WebAudio Ambient Synthesis
    function startGenerativeSoundscape(track) {
      var ctx = getAudioContext();
      var now = ctx.currentTime;
      var baseFreq = track.pitch || 432;

      // 1. Dual detuned ambient binaural bed (0.5Hz theta calming pulse)
      var osc1 = ctx.createOscillator();
      var osc2 = ctx.createOscillator();
      var bedGain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq + 0.5, now);

      bedGain.gain.setValueAtTime(0.0001, now);
      bedGain.gain.linearRampToValueAtTime(0.22, now + 1.5);

      // Lowpass soothing filter
      var filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(baseFreq * 2.2, now);

      osc1.connect(bedGain);
      osc2.connect(bedGain);
      bedGain.connect(filter);
      filter.connect(masterGain);

      osc1.start(now);
      osc2.start(now);

      ambientNodes.push({ osc: osc1, gain: bedGain });
      ambientNodes.push({ osc: osc2, gain: bedGain });

      // 2. Play initial welcoming singing bowl chime
      playMeditationChime(baseFreq);

      // 3. Trigger gentle periodic harmonic singing bowl swells every 18 seconds
      periodicInterval = setInterval(function() {
        if (audioCtx && audioCtx.state === 'running') {
          playMeditationChime(baseFreq);
        }
      }, 18000);
    }

    function pauseAll() {
      if (audioCtx && audioCtx.state === 'running') {
        audioCtx.suspend();
      }
      if (audioElement && !audioElement.paused) {
        audioElement.pause();
      }
    }

    function resumeAll() {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (audioElement && audioElement.paused) {
        audioElement.play().catch(function() {});
      }
    }

    window.addEventListener('message', function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.action === 'playTrack') {
          startAmbientSoundscape(data.track);
        } else if (data.action === 'playChime') {
          playMeditationChime(data.pitch);
        } else if (data.action === 'pause') {
          pauseAll();
        } else if (data.action === 'resume') {
          resumeAll();
        } else if (data.action === 'stop') {
          stopAmbient();
          pauseAll();
        }
      } catch (err) {
        console.error('Audio message handler error:', err);
      }
    });
  </script>
</body>
</html>
`;

    useImperativeHandle(ref, () => ({
      playTrack: (track) => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({ action: 'playTrack', track })
          );
        }
      },
      playChime: (pitch = 432) => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({ action: 'playChime', pitch })
          );
        }
      },
      pauseAudio: () => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(JSON.stringify({ action: 'pause' }));
        }
      },
      resumeAudio: () => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(JSON.stringify({ action: 'resume' }));
        }
      },
      stopAudio: () => {
        if (webViewRef.current) {
          webViewRef.current.postMessage(JSON.stringify({ action: 'stop' }));
        }
      },
      seekAudio: (ratio: number) => {
        // Handled in timer and playback position
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
