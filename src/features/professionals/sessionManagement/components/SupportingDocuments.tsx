import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
} from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppText } from '@components/atoms/AppText';
import { useTheme } from '@theme/index';
import { normalize } from '@utils/responsive';
import {
  FileText,
  X,
  Plus,
  ImageIcon,
  FolderOpen,
  File,
} from 'lucide-react-native';

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  uri?: string;
  type?: string;
}

interface SupportingDocumentsProps {
  documents: DocumentItem[];
  setDocuments: (docs: DocumentItem[]) => void;
}

const formatFileSize = (bytes?: number | null): string => {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const SupportingDocuments: React.FC<SupportingDocumentsProps> = ({
  documents,
  setDocuments,
}) => {
  const { colors } = useTheme();
  const [showPickerMenu, setShowPickerMenu] = useState(false);

  const handlePickDocument = async () => {
    setShowPickerMenu(false);
    try {
      const results = await pick({
        allowMultiSelection: true,
        type: [types.allFiles],
      });

      const newDocs: DocumentItem[] = results.map((file, idx) => ({
        id: `${Date.now()}_doc_${idx}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name || 'Untitled_Document',
        size: formatFileSize(file.size),
        uri: file.uri,
        type: file.type || undefined,
      }));

      setDocuments([...documents, ...newDocs]);
    } catch (err) {
      if (isErrorWithCode(err) && err.code === errorCodes.OPERATION_CANCELED) {
        // User cancelled selection, do nothing
        return;
      }
      if (isErrorWithCode(err) && err.code === errorCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'A document picker is already open.');
        return;
      }
      console.error('Document picker error:', err);
      Alert.alert('Error', 'Could not open document picker. Please try again.');
    }
  };

  const handlePickPhotos = () => {
    setShowPickerMenu(false);
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick photos.');
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const newDocs: DocumentItem[] = response.assets.map((asset, idx) => ({
            id: `${Date.now()}_img_${idx}_${Math.random().toString(36).substring(2, 6)}`,
            name: asset.fileName || `Photo_${Date.now()}.jpg`,
            size: formatFileSize(asset.fileSize),
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
          }));
          setDocuments([...documents, ...newDocs]);
        }
      },
    );
  };

  const handleRemove = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const getFileIcon = (type?: string, name?: string) => {
    const isImage =
      type?.startsWith('image/') ||
      /\.(jpg|jpeg|png|webp|gif)$/i.test(name || '');
    const isPdf =
      type?.includes('pdf') ||
      /\.pdf$/i.test(name || '');

    if (isImage) {
      return <ImageIcon size={normalize(18)} color={colors.purple[700]} />;
    }
    if (isPdf) {
      return <FileText size={normalize(18)} color="#D32F2F" />;
    }
    return <File size={normalize(18)} color={colors.purple[700]} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <AppText
          family="primary"
          weight="semiBold"
          style={{
            fontSize: normalize(10),
            color: colors.typographyColor.Medium,
            textTransform: 'uppercase',
          }}
        >
          Supporting Documents
        </AppText>
        {documents.length > 0 && (
          <AppText
            family="primary"
            weight="medium"
            style={{
              fontSize: normalize(10),
              color: colors.purple[700],
            }}
          >
            {documents.length} {documents.length === 1 ? 'file' : 'files'} attached
          </AppText>
        )}
      </View>

      {/* Upload Button */}
      <TouchableOpacity
        style={[styles.uploadButton, { borderColor: colors.typographyColor.Light }]}
        activeOpacity={0.7}
        onPress={() => setShowPickerMenu(true)}
      >
        <Image
          source={require('../assets/upload.png')}
          style={{
            width: normalize(22),
            height: normalize(22),
            tintColor: colors.purple[700],
            marginBottom: normalize(4),
          }}
          resizeMode="contain"
        />
        <AppText
          family="primary"
          weight="semiBold"
          style={{
            fontSize: normalize(12),
            color: colors.purple[800],
          }}
        >
          {documents.length > 0 ? 'Upload More Documents' : 'Upload File from Phone'}
        </AppText>
        <AppText
          family="primary"
          weight="regular"
          style={{
            fontSize: normalize(10),
            color: colors.typographyColor.Light,
            marginTop: normalize(2),
          }}
        >
          PDF, Word, or images up to 10MB
        </AppText>
      </TouchableOpacity>

      {/* Selected Files List with Name, Size, and Delete Option */}
      {documents.map((doc) => (
        <View
          key={doc.id}
          style={[
            styles.fileCard,
            { backgroundColor: colors.purple[50], marginBottom: normalize(8) },
          ]}
        >
          <View style={styles.fileCardLeft}>
            <View
              style={[
                styles.fileIconBox,
                { backgroundColor: colors.purple[100] },
              ]}
            >
              {getFileIcon(doc.type, doc.name)}
            </View>
            <View style={styles.fileDetails}>
              <AppText
                family="primary"
                weight="bold"
                style={{
                  fontSize: normalize(12),
                  color: colors.typographyColor.Dark,
                }}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {doc.name}
              </AppText>
              <AppText
                family="primary"
                weight="medium"
                style={{
                  fontSize: normalize(10),
                  color: colors.typographyColor.Medium,
                  marginTop: normalize(2),
                }}
              >
                {doc.size || 'Unknown size'}
              </AppText>
            </View>
          </View>

          {/* Delete Button Before Upload */}
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.removeBtn, { backgroundColor: colors.purple[100] }]}
            onPress={() => handleRemove(doc.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <X size={normalize(14)} color={colors.typographyColor.Dark} />
          </TouchableOpacity>
        </View>
      ))}

      {/* Bottom Sheet Menu for Selecting Document vs Photos */}
      <Modal
        visible={showPickerMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPickerMenu(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPickerMenu(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.menuSheet}>
          <View style={styles.menuHeader}>
            <AppText family="primary" weight="bold" style={styles.menuTitle}>
              Upload Supporting Document
            </AppText>
            <TouchableOpacity onPress={() => setShowPickerMenu(false)}>
              <X size={normalize(20)} color={colors.typographyColor.Dark} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.menuOption, { backgroundColor: colors.purple[50] }]}
            activeOpacity={0.7}
            onPress={handlePickDocument}
          >
            <View style={[styles.menuOptionIcon, { backgroundColor: colors.purple[100] }]}>
              <FolderOpen size={normalize(20)} color={colors.purple[700]} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
                Choose File from Phone
              </AppText>
              <AppText family="primary" weight="regular" style={{ fontSize: normalize(10.5), color: colors.typographyColor.Light }}>
                Select PDFs, documents, clinical records
              </AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuOption, { backgroundColor: colors.purple[50], marginTop: normalize(10) }]}
            activeOpacity={0.7}
            onPress={handlePickPhotos}
          >
            <View style={[styles.menuOptionIcon, { backgroundColor: colors.purple[100] }]}>
              <ImageIcon size={normalize(20)} color={colors.purple[700]} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Dark }}>
                Choose from Gallery
              </AppText>
              <AppText family="primary" weight="regular" style={{ fontSize: normalize(10.5), color: colors.typographyColor.Light }}>
                Upload photos, charts, or snapshots
              </AppText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowPickerMenu(false)}
          >
            <AppText family="primary" weight="bold" style={{ fontSize: normalize(13), color: colors.typographyColor.Medium }}>
              Cancel
            </AppText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(20),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  uploadButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: normalize(12),
    paddingVertical: normalize(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(12),
    backgroundColor: '#FAFAFA',
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(12),
    borderRadius: normalize(12),
  },
  fileCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: normalize(12),
  },
  fileIconBox: {
    width: normalize(38),
    height: normalize(38),
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  fileDetails: {
    flex: 1,
  },
  removeBtn: {
    width: normalize(26),
    height: normalize(26),
    borderRadius: normalize(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  menuSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: normalize(24),
    borderTopRightRadius: normalize(24),
    paddingHorizontal: normalize(20),
    paddingTop: normalize(18),
    paddingBottom: normalize(32),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
  },
  menuTitle: {
    fontSize: normalize(15),
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(14),
    borderRadius: normalize(12),
  },
  menuOptionIcon: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(14),
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(14),
    marginTop: normalize(8),
  },
});
