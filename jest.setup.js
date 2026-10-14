/* eslint-disable no-undef */

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-razorpay
jest.mock('react-native-razorpay', () => ({
  open: jest.fn(() =>
    Promise.resolve({
      razorpay_payment_id: 'rzp_test_mock123',
      razorpay_order_id: 'order_mock456',
      razorpay_signature: 'sig_mock789',
    })
  ),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
  };
});

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Mock Lucide icons
jest.mock('lucide-react-native', () => {
  const React = require('react');
  return new Proxy(
    {},
    {
      get: (target, prop) => {
        return (props) => React.createElement('IconMock', { ...props, name: String(prop) });
      },
    }
  );
});

// Mock @react-native-firebase/auth
jest.mock('@react-native-firebase/auth', () => () => ({
  currentUser: { uid: 'test_uid_123', email: 'test@sukhisoul.com' },
  signInWithCredential: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
  onAuthStateChanged: jest.fn((callback) => {
    callback({ uid: 'test_uid_123', email: 'test@sukhisoul.com' });
    return jest.fn();
  }),
}));
