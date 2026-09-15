import { getAuth, signInWithCredential, GoogleAuthProvider, signInWithPhoneNumber, signOut, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

class AuthService {
  constructor() {
    // Note: WebClientId should be from Firebase Console -> Auth -> Google -> Web SDK configuration
    // Or from google-services.json -> client -> oauth_client (type 3)
    GoogleSignin.configure({
      webClientId: '328609962954-o8kg6okj714ca4d16jlkdjrniqgtd1hv.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }

  /**
   * Google Sign In
   */
  async signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the users ID token (v16+ and legacy structure support)
      const response = await GoogleSignin.signIn();
      console.log('Google Sign-In Full Response:', JSON.stringify(response));

      // Support both { data: { idToken } } and { idToken } structures
      const data = response.data as any;
      const idToken = data?.idToken || (response as any).idToken;
      const accessToken = data?.accessToken || (response as any).accessToken;

      console.log('Extracted Tokens:', { hasIdToken: !!idToken, hasAccessToken: !!accessToken });

      if (!idToken) {
        throw new Error('Google Sign-In succeeded but no ID Token was returned. Check your Firebase/Google Console configuration.');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);

      // Sign-in the user with the credential
      return signInWithCredential(getAuth(), googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  /**
   * Phone Authentication - Send OTP
   */
  async signInWithPhoneNumber(phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> {
    try {
      // This returns a confirmationResult object which has a confirm method
      const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
      return confirmation;
    } catch (error) {
      console.error('Phone Auth Error (Send OTP):', error);
      throw error;
    }
  }

  /**
   * Sign Out
   */
  async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
      await signOut(getAuth());
    } catch (error) {
      console.error('Sign-Out Error:', error);
      throw error;
    }
  }

  /**
   * Get Firebase ID Token
   * This is what you will send to your Laravel backend for verification
   */
  async getIdToken(): Promise<string | undefined> {
    try {
      const user = getAuth().currentUser;
      if (user) {
        return await user.getIdToken(true); // forceRefresh = true
      }
      return undefined;
    } catch (error) {
      console.error('Get Token Error:', error);
      throw error;
    }
  }

  /**
   * Current User
   */
  /**
   * Sync Firebase User with Laravel Backend
   */
  async syncWithBackend(idToken: string): Promise<any> {
    try {
      // Use the pre-configured axios client
      const { api } = require('../../../api/client');
      const response = await api.post('/auth/firebase', {
        id_token: idToken,
      });
      return response.data;
    } catch (error) {
      console.error('Backend Sync Error:', error);
      throw error;
    }
  }

  /**
   * Update User Profile in Laravel
   */
  async updateProfile(data: { name?: string; email?: string }): Promise<any> {
    try {
      const { api } = require('../../../api/client');
      const response = await api.post('/user/profile', data);
      return response.data;
    } catch (error) {
      console.error('Update Profile Error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
