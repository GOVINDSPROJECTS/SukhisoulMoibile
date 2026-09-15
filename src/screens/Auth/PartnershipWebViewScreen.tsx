import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft, RefreshCw, WifiOff } from 'lucide-react-native';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import { AuthStackParamList } from '../../navigation/types';

type PartnershipWebViewRouteProp = RouteProp<AuthStackParamList, 'PartnershipWebView'>;

export const PartnershipWebViewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<PartnershipWebViewRouteProp>();
  const { colors, typography } = useTheme();
  const webViewRef = useRef<any>(null);

  // In dev: use WiFi IP. In production: replace with your domain.
  const SETTINGS_API_URL = 'http://192.168.29.98:8000/api/settings';
  const FALLBACK_URL = 'https://sukhisoul.com/professionals';

  const [resolvedUrl, setResolvedUrl] = useState<string | null>(route.params?.url || null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch the URL from admin-controlled settings API
  useEffect(() => {
    if (resolvedUrl) return; // already provided via route params
    fetch(SETTINGS_API_URL, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(data => {
        const url = data?.settings?.partnership_form_url;
        setResolvedUrl(url && url.startsWith('http') ? url : FALLBACK_URL);
      })
      .catch(() => {
        setResolvedUrl(FALLBACK_URL);
      });
  }, []);

  // Safety timeout — if still loading after 15s, show error
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    if (!resolvedUrl) return; // wait until URL is resolved
    timeoutRef.current = setTimeout(() => {
      if (isLoading && !hasError) {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(
          `Cannot reach the server.\n\nMake sure:\n1. Laravel is running with --host=0.0.0.0\n2. Your phone and PC are on the same WiFi`,
        );
      }
    }, 15000);
    return () => clearTimeout(timeoutRef.current);
  }, [resolvedUrl]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(
          `Still cannot reach.\n\nRun: php artisan serve --host=0.0.0.0`,
        );
      }
    }, 15000);
    webViewRef.current?.reload();
  };

  const themeBlue = colors.lightAppTheme?.[700] ?? '#0B3A9B';
  const themeText = colors.lightAppTheme?.[950] ?? colors.text;
  const themeBorder = colors.lightAppTheme?.[100] ?? colors.border;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Premium Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: themeBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
          <ChevronLeft size={normalize(24)} color={themeBlue} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: themeText, fontFamily: typography.fontFamily.secondary.medium }]}>
          Partnership Application
        </Text>

        <TouchableOpacity
          onPress={handleRetry}
          style={styles.refreshButton}
          activeOpacity={0.7}
        >
          <RefreshCw size={normalize(18)} color={themeBlue} />
        </TouchableOpacity>
      </View>

      {/* WebView Container */}
      <View style={styles.webviewWrapper}>
        {!hasError && resolvedUrl && (
          <WebView
            ref={webViewRef}
            source={{ uri: resolvedUrl }}
            style={styles.webview}
            onLoadStart={() => { setIsLoading(true); setHasError(false); }}
            onLoadEnd={() => { setIsLoading(false); clearTimeout(timeoutRef.current); }}
            onError={(e) => {
              clearTimeout(timeoutRef.current);
              setIsLoading(false);
              setHasError(true);
              setErrorMessage(
                `Failed to load page.\nError: ${e.nativeEvent.description}\n\nMake sure Laravel is running with:\nphp artisan serve --host=0.0.0.0`,
              );
            }}
            onHttpError={(e) => {
              if (e.nativeEvent.statusCode >= 500) {
                setHasError(true);
                setErrorMessage(`Server error ${e.nativeEvent.statusCode}.`);
              }
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            originWhitelist={['*']}
            mixedContentMode="always"
          />
        )}

        {/* Loading overlay */}
        {isLoading && !hasError && (
          <View style={[styles.overlay, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={themeBlue} />
            <Text style={[styles.loadingText, { color: themeBlue, fontFamily: typography.fontFamily.primary.medium }]}>
              Loading portal...
            </Text>
            <Text style={[styles.loadingHint, { color: colors.lightAppTheme?.[400] ?? '#94a3b8', fontFamily: typography.fontFamily.primary.medium }]}>
              Connecting to {SETTINGS_API_URL}
            </Text>
          </View>
        )}

        {/* Error state */}
        {hasError && (
          <View style={[styles.overlay, { backgroundColor: colors.background }]}>
            <WifiOff size={normalize(40)} color={colors.lightAppTheme?.[300] ?? '#cbd5e1'} />
            <Text style={[styles.errorTitle, { color: themeText, fontFamily: typography.fontFamily.secondary.medium }]}>
              Connection Failed
            </Text>
            <Text style={[styles.errorMessage, { color: colors.lightAppTheme?.[500] ?? '#64748b', fontFamily: typography.fontFamily.primary.medium }]}>
              {errorMessage}
            </Text>
            <TouchableOpacity onPress={handleRetry} style={[styles.retryBtn, { backgroundColor: themeBlue }]} activeOpacity={0.8}>
              <Text style={[styles.retryBtnText, { fontFamily: typography.fontFamily.primary.medium }]}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: normalize(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
    borderBottomWidth: 1,
  },
  backButton: { padding: normalize(4) },
  refreshButton: { padding: normalize(4) },
  headerTitle: { fontSize: normalize(15), fontWeight: 'bold' },
  webviewWrapper: { flex: 1 },
  webview: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(32),
    gap: normalize(12),
  },
  loadingText: {
    fontSize: normalize(13),
    fontWeight: 'bold',
    marginTop: normalize(4),
  },
  loadingHint: {
    fontSize: normalize(10),
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginTop: normalize(8),
  },
  errorMessage: {
    fontSize: normalize(11),
    textAlign: 'center',
    lineHeight: normalize(18),
  },
  retryBtn: {
    marginTop: normalize(8),
    paddingHorizontal: normalize(28),
    paddingVertical: normalize(12),
    borderRadius: normalize(24),
  },
  retryBtnText: {
    color: '#fff',
    fontSize: normalize(13),
    fontWeight: 'bold',
  },
});
