import {Text} from '@/components';
import {TRACKER_STACK, TrackerStackParamList} from '@/navigation/screenTypes';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Touchable} from 'react-native';
import {HabitType, days} from './trackerAdd.page';
import {getStorage, storageEnumKeys} from '@/utils/storage';
import ReactNativeModal from 'react-native-modal';
import CompleteIcon from '@/utils/icons/completeIcon';
import {colors} from '@/utils';
import EditIcon from '@/utils/icons/editIcon';
import DeleteIcon from '@/utils/icons/deleteIcon';
import SkipIcon from '@/utils/icons/skipIcon';

const getWeekDates = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
  return days.map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.getDate();
  });
};

const TrackerPage = ({}: NativeStackScreenProps<
  TrackerStackParamList,
  TRACKER_STACK.LIST
>) => {
  const [habits, setHabits] = useState<HabitType[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const getHabit = async () => {
        setHabits(JSON.parse(await getStorage(`${storageEnumKeys.HABIT}`)));
      };
      getHabit();
    }, []),
  );
  const weekDates = getWeekDates();
  const todayDay = new Date().getDay() - 1 === -1 ? 6 : new Date().getDay() - 1;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.container}>
      {habits &&
        habits.map((habit, index) => (
          <View key={index} style={styles.habitCard}>
            <View style={styles.header}>
              <Text style={styles.title}>{habit.title}</Text>
              <Text style={[styles.repeat, {color: habit.color}]}>
                {habit.repeat === 'Daily' ? 'Everyday' : 'Weekly'}
              </Text>
            </View>
            <View style={styles.daysRow}>
              {days.map((day, i) => (
                <TouchableOpacity
                  disabled={todayDay !== i}
                  key={i}
                  onPress={() => setIsOpen(true)}
                  style={styles.dayContainer}>
                  <Text style={todayDay === i && {color: habit.color}}>
                    {day}
                  </Text>
                  <View
                    style={[
                      styles.dayCircle,
                      habit.days.includes(day) && {
                        backgroundColor: habit.color,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.dayText,
                        habit.days.includes(day) && {color: '#fff'},
                      ]}>
                      {weekDates[i]}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      <ReactNativeModal
        isVisible={isOpen}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Option</Text>
          <View style={{gap: 10}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>Options</Text>
            <TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <CompleteIcon color={colors.secondary600} size={24} />
                <Text>Complete</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <SkipIcon color={colors.gray} size={24} />
                <Text>Skip</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <EditIcon color={colors.dark} size={24} />
                <Text>Edit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <DeleteIcon color={colors.tertiary} size={24} />
                <Text>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  repeat: {
    fontSize: 12,
    fontWeight: '500',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  showModalText: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 250,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default TrackerPage;
