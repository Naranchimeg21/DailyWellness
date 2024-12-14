import { Button, Text } from "@/components";
import InputForm from "@/components/forms/input.form";
import { TRACKER_STACK, TrackerStackParamList } from "@/navigation/screenTypes";
import { colors, sizes } from "@/utils";
import { getStorage, setStorage, storageEnumKeys } from "@/utils/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
const color = [
  {
    name: "Light Blue",
    hex: "#5AA9FF",
  },

  {
    name: "Sky Blue",
    hex: "#87CEEB",
  },
  {
    name: "Deep Blue",
    hex: "#1C4E80",
  },
  {
    name: "Teal",
    hex: "#20B2AA",
  },
  {
    name: "Soft Cyan",
    hex: "#A1EFFF",
  },
  {
    name: "Coral",
    hex: "#FF7F50",
  },
  {
    name: "Sunset Orange",
    hex: "#FF4500",
  },
  {
    name: "Lime Green",
    hex: "#32CD32",
  },
  {
    name: "Golden Yellow",
    hex: "#FFD700",
  },
];
export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const repeats = ["Daily", "Weekly"];
export type DayStatus = "complete" | "skip" | "incomplete";

export type HabitType = {
  title: string;
  color: string;
  repeat: "Daily" | "Weekly";
  days: string[];
  archive: boolean;
  weeks:
    | {
        weekStartDate: string;
        days: {
          date: string;
          day: string;
          status: DayStatus;
        }[];
      }[]
    | null;
};
const TrackerAddPage = ({
  navigation,
}: NativeStackScreenProps<TrackerStackParamList, TRACKER_STACK.ADD>) => {
  const [habit, setHabit] = useState<HabitType>({
    title: "",
    color: color[0].hex,
    repeat: "Daily",
    days: days,
    archive: false,
    weeks: null,
  });
  const [error, setError] = useState<string | null>(null);
  const save = async () => {
    if (habit.title.length > 1) {
      const savedHabit = await getStorage(storageEnumKeys.HABIT);
      let updateHabit: HabitType[] = [];
      if (savedHabit) updateHabit = [...JSON.parse(savedHabit), habit];
      else updateHabit = [habit];
      const saved = await setStorage(
        storageEnumKeys.HABIT,
        JSON.stringify(updateHabit)
      );
      if (saved) navigation.goBack();
    } else {
      setError("Fill all field!");
    }
  };
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>Title</Text>
      <InputForm
        value={habit?.title}
        onChangeText={(e) => setHabit({ ...habit, title: e })}
      />
      <Text style={styles.title}>Color</Text>
      <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
        {color.map((item) => (
          <TouchableOpacity
            style={[
              {
                width: sizes.heightSm,
                height: sizes.heightSm,
                borderRadius: 5,
                backgroundColor: item.hex,
              },
              habit.color === item.hex && {
                borderWidth: 2,
                borderColor: colors.primary,
              },
            ]}
            key={item.hex}
            onPress={() => setHabit({ ...habit, color: item.hex })}
          />
        ))}
      </View>
      <Text style={styles.title}>Repeat</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "space-between",
        }}
      >
        {repeats.map((item) => (
          <TouchableOpacity
            style={[
              {
                flex: 1,
                height: sizes.height,
                backgroundColor: colors.primary20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              },
              habit.repeat === item && {
                borderWidth: 2,
                borderColor: colors.primary,
              },
            ]}
            key={item}
            onPress={() => setHabit({ ...habit, repeat: item as never })}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {habit.repeat === "Weekly" && (
        <>
          <Text style={styles.title}>On these days</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            {days.map((item) => (
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    height: sizes.height,
                    backgroundColor: colors.primary20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                  },
                  habit.days.includes(item) && {
                    borderWidth: 2,
                    borderColor: colors.primary,
                  },
                ]}
                key={item}
                onPress={() => {
                  setHabit({
                    ...habit,
                    days: habit.days.includes(item)
                      ? habit.days.filter((day) => day !== item)
                      : [...habit.days, item],
                  });
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <Button title="Save" buttonStyle={styles.title} onPress={save} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.sizeMd,
  },
  title: {
    fontSize: sizes.body1,
    marginBottom: 10,
    marginTop: 24,
  },
  errorContainer: {
    flexDirection: "row",
  },
  errorText: {
    color: colors.error600,
    fontSize: sizes.body1,
  },
});

export default TrackerAddPage;
