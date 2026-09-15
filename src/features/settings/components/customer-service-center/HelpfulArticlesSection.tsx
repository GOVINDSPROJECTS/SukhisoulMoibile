import React, { useCallback } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

export interface ArticleItem {
  id: string;
  title: string;
  readTime: string;
  imageUrl: string;
  category?: string;
  summary?: string;
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Managing Anxiety Everyday',
    readTime: '5 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=600&auto=format&fit=crop&q=80',
    category: 'Anxiety',
    summary:
      'Practical techniques and mindful routines to reduce daily stress and regain emotional composure.',
  },
  {
    id: 'art-2',
    title: 'How Therapy Works',
    readTime: '4 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
    category: 'Therapy',
    summary:
      'A compassionate guide on what to expect during your first therapy consultation and how healing unfolds.',
  },
  {
    id: 'art-3',
    title: 'Mindful Breathing Basics',
    readTime: '3 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    category: 'Mindfulness',
    summary:
      'Simple breathing rituals you can perform anywhere to ground your thoughts and ease your nervous system.',
  },
];

interface HelpfulArticlesSectionProps {
  articles?: ArticleItem[];
  onArticlePress?: (article: ArticleItem) => void;
}

export const HelpfulArticlesSection: React.FC<HelpfulArticlesSectionProps> = ({
  articles = ARTICLES_DATA,
  onArticlePress,
}) => {
  const handlePress = useCallback(
    (article: ArticleItem) => {
      console.log(`[Customer Service Center] Article tapped: ${article.title}`);
      onArticlePress?.(article);
      Alert.alert(
        article.title,
        `${article.summary || ''}\n\nEstimated reading time: ${article.readTime}`,
        [{ text: 'Close', style: 'default' }]
      );
    },
    [onArticlePress]
  );

  const handleViewAll = useCallback(() => {
    console.log('[Customer Service Center] View all articles tapped');
    Alert.alert(
      'Wellness Library',
      'Browsing full archive of certified mental wellness and mindfulness articles.',
      [{ text: 'OK', style: 'default' }]
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <AppText
          weight="bold"
          family="secondary"
          style={styles.sectionTitle}
          color={colors.typographyColor['Dark 2'] || '#003CA3'}
        >
          HELPFUL ARTICLES
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleViewAll}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <AppText
            weight="medium"
            family="secondary"
            style={styles.viewAllText}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
          >
            View all
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Articles Horizontal / Row Layout */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsRow}
      >
        {articles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => handlePress(article)}
          >
            <Image
              source={{ uri: article.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <AppText
                weight="light"
                family="secondary"
                style={styles.title}
                color={colors.typographyColor.Medium || '#003CA3'}
                numberOfLines={2}
              >
                {article.title}
              </AppText>
              <AppText
                weight="light"
                family="secondary"
                style={styles.readTime}
                color={colors.typographyColor.Medium || '#003CA3'}
              >
                {article.readTime}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(26),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(16),
  },
  sectionTitle: {
    fontSize: normalize(13.5),
    letterSpacing: 0.2,
  },
  viewAllText: {
    fontSize: normalize(12.5),
  },
  cardsRow: {
    gap: normalize(14),
    paddingRight: normalize(10),
  },
  card: {
    width: normalize(158),
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    marginBottom: normalize(10)
  },
  image: {
    width: '100%',
    height: normalize(105),
    backgroundColor: '#E2E8F0',
  },
  content: {
    padding: normalize(12),
  },
  title: {
    fontSize: normalize(13),
    lineHeight: normalize(17),
    marginBottom: normalize(4),
  },
  readTime: {
    fontSize: normalize(11),
  },
});
