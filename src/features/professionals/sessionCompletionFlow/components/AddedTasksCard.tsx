import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components/atoms/AppText';
import { normalize } from '@utils/responsive';
import { Minus, Check, Trash2 } from 'lucide-react-native';
import { TaskItem } from './SuggestedTasksCard';
import { colors } from '@/theme';

interface AddedTasksCardProps {
  addedTasks: TaskItem[];
  onRemoveTask: (id: string) => void;
}

export const AddedTasksCard: React.FC<AddedTasksCardProps> = ({
  addedTasks,
  onRemoveTask,
}) => {
  if (!addedTasks || addedTasks.length === 0) {
    return null;
  }

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Minus size={normalize(22)} color="#FFFFFF" strokeWidth={3} />
        </View>
        <View style={styles.headerTextCol}>
          <AppText family="primary" weight="extraBold" style={styles.title}>
            Added Tasks
          </AppText>
          <AppText family="primary" weight="regular" style={styles.subtitle}>
            These tasks will be assigned to the client.
          </AppText>
        </View>
      </View>

      {/* Added Tasks List */}
      <View style={styles.taskList}>
        {addedTasks.map((item, index) => {
          const isLast = index === addedTasks.length - 1;
          const displayTitle = item.addedTitle || item.title;

          return (
            <View
              key={item.id}
              style={[styles.taskItem, !isLast && styles.taskItemBorder]}
            >
              {/* Blue Circular Check Icon */}
              <View style={styles.checkCircle}>
                <Check size={normalize(12)} color="#FFFFFF" strokeWidth={3} />
              </View>

              {/* Text Info Column */}
              <View style={styles.textCol}>
                <AppText family="primary" weight="bold" style={styles.taskTitle}>
                  {displayTitle}
                </AppText>
                <AppText
                  family="primary"
                  weight="regular"
                  style={styles.taskDesc}
                  numberOfLines={2}
                >
                  {item.description}
                </AppText>
              </View>

              {/* Delete / Trash Button */}
              <TouchableOpacity
                style={styles.trashBtn}
                onPress={() => onRemoveTask(item.id)}
                activeOpacity={0.7}
              >
                <Trash2 size={normalize(18)} color="#FB7185" />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  iconContainer: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(10),
    backgroundColor: colors.typographyColor['Dark 2'],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: normalize(15),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(0),
  },
  subtitle: {
    fontSize: normalize(11),
    color: colors.tintsGrey[300],
    lineHeight: normalize(15),
  },
  taskList: {},
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(6),
  },
  taskItemBorder: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#F8FAFC',
  },
  checkCircle: {
    width: normalize(22),
    height: normalize(22),
    borderRadius: normalize(11),
    backgroundColor: colors.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
  },
  textCol: {
    flex: 1,
    paddingRight: normalize(8),
  },
  taskTitle: {
    fontSize: normalize(13),
    color: colors.typographyColor.Medium,
    marginBottom: normalize(2),
  },
  taskDesc: {
    fontSize: normalize(11),
    color: colors.tintsGrey[300],
    lineHeight: normalize(15),
  },
  trashBtn: {
    padding: normalize(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
