import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { User, Calendar, ShieldCheck, ChevronDown, ChevronUp, Shield, ShieldEllipsis } from 'lucide-react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { colors } from '@theme/index';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FaqItem {
  id: string;
  iconType: 'user' | 'calendar' | 'shield';
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    iconType: 'user',
    question: 'How do I book a therapy session?',
    answer:
      'You can book a session by browsing therapists in the Psychologist tab, selecting an expert that matches your needs, and choosing an available date and time slot.',
  },
  {
    id: 'faq-2',
    iconType: 'calendar',
    question: 'How can I reschedule or cancel a session?',
    answer:
      'Go to your scheduled sessions list. You can reschedule or cancel anytime up to 4 hours prior to your scheduled consultation without any penalty.',
  },
  {
    id: 'faq-3',
    iconType: 'shield',
    question: 'Is my data safe and private?',
    answer:
      'Yes, all sessions, notes, and profile details are protected with bank-grade encryption and adhere to strict medical confidentiality standards.',
  },
  {
    id: 'faq-4',
    iconType: 'user',
    question: 'Can I switch my therapist at any time?',
    answer:
      'Yes, you have complete flexibility to explore different specialists anytime to find the therapist you feel most comfortable with.',
  },
  {
    id: 'faq-5',
    iconType: 'calendar',
    question: 'What if I miss my scheduled appointment?',
    answer:
      'If you accidentally miss a session, reach out directly through our chat support and we will help arrange the earliest available replacement slot.',
  },
  {
    id: 'faq-6',
    iconType: 'shield',
    question: 'Are my audio and video consultations recorded?',
    answer:
      'No. In compliance with strict privacy regulations, live audio and video therapy sessions are never recorded or stored on our servers.',
  },
];

export const FaqAccordionSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleViewAll = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAll((prev) => !prev);
    console.log(`[Customer Service Center] FAQs view all toggled: ${!showAll}`);
  }, [showAll]);

  const toggleFaq = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
    console.log(`[Customer Service Center] FAQ item tapped: ${id}`);
  }, []);

  const visibleFaqs = showAll ? FAQS_DATA : FAQS_DATA.slice(0, 3);

  const renderIcon = (type: FaqItem['iconType']) => {
    const iconSize = normalize(17);
    const iconColor = colors.typographyColor['Dark 2'] || '#003CA3';
    switch (type) {
      case 'user':
        return <User size={iconSize} color={iconColor} strokeWidth={2.2} />;
      case 'calendar':
        return <Calendar size={iconSize} color={iconColor} strokeWidth={2.2} />;
      case 'shield':
        return <Shield size={iconSize} color={iconColor} strokeWidth={2.2} />;
    }
  };

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
          FREQUENTLY ASKED QUESTIONS
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleViewAll}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <AppText
            weight="medium"
            family="secondary"
            style={styles.viewAllText}
            color={colors.typographyColor['Dark 2'] || '#003CA3'}
          >
            {showAll ? 'Show less' : 'View all'}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* FAQs List */}
      <View style={styles.faqList}>
        {visibleFaqs.map((faq) => {
          const isExpanded = expandedId === faq.id;
          return (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              activeOpacity={0.8}
              onPress={() => toggleFaq(faq.id)}
            >
              <View style={styles.questionRow}>
                <View style={styles.iconCircle}>{renderIcon(faq.iconType)}</View>

                <AppText
                  weight="light"
                  family="secondary"
                  style={styles.questionText}
                  color={colors.typographyColor.Medium}
                >
                  {faq.question}
                </AppText>

                {isExpanded ? (
                  <ChevronUp
                    size={normalize(18)}
                    color={colors.typographyColor.Light}
                    strokeWidth={2}
                  />
                ) : (
                  <ChevronDown
                    size={normalize(18)}
                    color={colors.typographyColor.Light}
                    strokeWidth={2}
                  />
                )}
              </View>

              {isExpanded ? (
                <View style={styles.answerContainer}>
                  <AppText
                    weight="regular"
                    family="secondary"
                    style={styles.answerText}
                    color={colors.typographyColor.Light}
                  >
                    {faq.answer}
                  </AppText>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(22),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
  sectionTitle: {
    fontSize: normalize(13.5),
    letterSpacing: 0.2,
  },
  viewAllText: {
    fontSize: normalize(12.5),
  },
  faqList: {
    gap: normalize(8),
  },
  faqCard: {
    backgroundColor: '#fff',
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(8),
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },
  iconCircle: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: normalize(12),
    lineHeight: normalize(16),
  },
  answerContainer: {
    marginTop: normalize(10),
    paddingTop: normalize(10),
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingLeft: normalize(48),
  },
  answerText: {
    fontSize: normalize(12.5),
    lineHeight: normalize(18),
  },
});
