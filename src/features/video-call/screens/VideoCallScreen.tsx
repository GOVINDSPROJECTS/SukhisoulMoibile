import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  PermissionsAndroid,
  Text,
  BackHandler,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { PhoneOff, Shield, Users, ArrowLeft } from 'lucide-react-native';
import { colors } from '@theme/index';
import { normalize } from '@utils/responsive';
import { AppText } from '@components/atoms/AppText';
import type { AppStackParamList, NavigationProp } from '@navigation/types';

type VideoCallRouteProp = RouteProp<AppStackParamList, 'VideoCall'>;

export const VideoCallScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VideoCallRouteProp>();

  const { roomUrl, therapistName = 'Therapist', sessionUuid } = route.params || {};

  const [isLoading, setIsLoading] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(Platform.OS === 'ios');
  const [callSeconds, setCallSeconds] = useState(0);
  const webViewRef = useRef<WebView<{}>>(null);

  // Request Android Camera & Microphone permissions on mount
  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          const cameraOk = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED;
          const audioOk = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED;

          if (!cameraOk || !audioOk) {
            Alert.alert(
              'Permissions Required',
              'Camera and Microphone permissions are needed to join your therapy video call.',
              [{ text: 'OK' }]
            );
          }
          setPermissionsGranted(true);
        } catch (err) {
          console.warn('Failed to request permissions:', err);
          setPermissionsGranted(true);
        }
      }
    }

    requestPermissions();
  }, []);

  // Call duration counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const confirmLeave = useCallback(() => {
    Alert.alert(
      'Leave Session',
      'Are you sure you want to end or leave this therapy session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]
    );
  }, [navigation]);

  // Intercept Android hardware back button
  useEffect(() => {
    const backAction = () => {
      confirmLeave();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [confirmLeave]);

  // Jitsi postMessage handling (if user presses hangup in Jitsi UI)
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data?.event === 'video-conference-left' || data?.type === 'hangup') {
        navigation.goBack();
      }
    } catch {
      // Non-JSON message, ignore
    }
  };

  // Modern mobile user agent to prevent Jitsi desktop/unsupported browser banners
  const customUserAgent =
    Platform.OS === 'android'
      ? 'Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
      : undefined;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#111827' }]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" translucent={false} />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={confirmLeave} activeOpacity={0.7}>
          <ArrowLeft size={normalize(20)} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <AppText variant="body" weight="bold" style={styles.therapistTitle} numberOfLines={1}>
            {therapistName}
          </AppText>
          <View style={styles.badgeRow}>
            <View style={styles.liveDot} />
            <AppText variant="caption" weight="semiBold" style={styles.timerText}>
              {formatTimer(callSeconds)}
            </AppText>
            <View style={styles.divider} />
            <Shield size={normalize(12)} color="#10B981" />
            <AppText variant="caption" style={styles.encryptedText}>
              Encrypted
            </AppText>
          </View>
        </View>

        <TouchableOpacity style={styles.leaveBtn} onPress={confirmLeave} activeOpacity={0.8}>
          <PhoneOff size={normalize(16)} color="#FFFFFF" />
          <AppText variant="caption" weight="bold" style={styles.leaveText}>
            End
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Video Call View */}
      <View style={styles.videoContainer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.blue[500]} />
            <AppText variant="body" weight="medium" style={styles.loadingText}>
              Connecting to secure room...
            </AppText>
          </View>
        )}

        {permissionsGranted && roomUrl ? (
          <WebView
            ref={webViewRef}
            source={{ uri: roomUrl }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            userAgent={customUserAgent}
            onLoadEnd={() => setIsLoading(false)}
            onMessage={handleMessage}
            mediaCapturePermissionGrantType="grant"
          />
        ) : (
          <View style={styles.errorContainer}>
            <AppText variant="body" style={{ color: '#FFFFFF', textAlign: 'center' }}>
              Preparing your video consultation...
            </AppText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerBackBtn: {
    padding: normalize(6),
    borderRadius: normalize(8),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: normalize(12),
  },
  therapistTitle: {
    color: '#FFFFFF',
    fontSize: normalize(15),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(3),
  },
  liveDot: {
    width: normalize(7),
    height: normalize(7),
    borderRadius: normalize(4),
    backgroundColor: '#EF4444',
    marginRight: normalize(6),
  },
  timerText: {
    color: '#E2E8F0',
    fontSize: normalize(11),
  },
  divider: {
    width: 1,
    height: normalize(10),
    backgroundColor: '#475569',
    marginHorizontal: normalize(8),
  },
  encryptedText: {
    color: '#10B981',
    fontSize: normalize(10),
    marginLeft: normalize(4),
  },
  leaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    borderRadius: normalize(18),
  },
  leaveText: {
    color: '#FFFFFF',
    fontSize: normalize(12),
    marginLeft: normalize(6),
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: '#94A3B8',
    marginTop: normalize(12),
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(20),
  },
});
