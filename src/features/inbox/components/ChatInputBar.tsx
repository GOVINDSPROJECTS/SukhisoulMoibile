import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';
import { Calendar, FileText, User, Smile, Paperclip, Mic, Send, CheckCircle, FilePlus } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatInputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({ value, onChangeText, onSend }) => {
  const insets = useSafeAreaInsets();
  const isTyping = value.trim().length > 0;

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, normalize(12)) }]}>
      {/* Floating Action Buttons */}
      <View style={styles.fabRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.fabScrollContent}>
          <TouchableOpacity style={styles.fabButton} activeOpacity={0.8}>
            <Calendar size={normalize(12)} color={colors.lightAppTheme[700]} style={styles.fabIcon} />
            <AppText style={styles.fabText} weight="medium">Schedule Session</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fabButton} activeOpacity={0.8}>
            <FilePlus size={normalize(12)} color={colors.lightAppTheme[700]} style={styles.fabIcon} />
            <AppText style={styles.fabText} weight="medium">Share Notes</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fabButton} activeOpacity={0.8}>
            <CheckCircle size={normalize(12)} color={colors.lightAppTheme[700]} style={styles.fabIcon} />
            <AppText style={styles.fabText} weight="medium">View Tasks</AppText>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Smile size={normalize(20)} color={colors.appThemeColor[700]} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#C4C7C9"
            value={value}
            onChangeText={onChangeText}
            multiline
            maxLength={1000}
          />

          <TouchableOpacity style={styles.iconButton}>
            <Paperclip size={normalize(20)} color={colors.appThemeColor[700]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={isTyping ? onSend : undefined}
        >
          {isTyping ? (
            <Send size={normalize(21)} color="#FFFFFF" />
          ) : (
            <Mic size={normalize(21)} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: normalize(12),
  },
  fabRow: {
    marginBottom: normalize(12),
  },
  fabScrollContent: {
    paddingHorizontal: normalize(16),
    gap: normalize(8),
  },
  fabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(6),
    borderRadius: normalize(99),
    borderWidth: 1,
    borderColor: colors.blue[200],
    backgroundColor: colors.lightTints.blueLightTint[50],
  },
  fabIcon: {
    marginRight: normalize(6),
  },
  fabText: {
    fontSize: normalize(11.5),
    color: colors.typographyColor['Color 2'],
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: normalize(16),
    gap: normalize(12),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: normalize(99),
    borderWidth: 1,
    borderColor: colors.tintsGrey[200],
    paddingHorizontal: normalize(8),
    minHeight: normalize(50),
    maxHeight: normalize(120),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: normalize(8),
    paddingVertical: Platform.OS === 'ios' ? normalize(12) : normalize(8),
    fontSize: normalize(14),
    color: '#0F172A',
  },
  iconButton: {
    padding: normalize(8),
  },
  actionButton: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(99),
    backgroundColor: colors.lightAppTheme[950],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(1), // align visually with input box
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
  },
});
