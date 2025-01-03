import { Text } from "@/components";
import { useAppContext } from "@/context/providers/app.provider";
import { setAppState } from "@/context/reducers/app.reducer";
import {
  DASHBOARD_STACK,
  DashboardStackParamList,
  ROOT_STACK,
} from "@/navigation/screenTypes";
import { colors, sizes } from "@/utils";
import ChartIcon from "@/utils/icons/chartIcon";
import HeartIcon from "@/utils/icons/heartIcon";
import LogoutIcon from "@/utils/icons/logoutIcon";
import ReminderIcon from "@/utils/icons/reminderIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const DashboardPage = ({
  navigation,
}: NativeStackScreenProps<DashboardStackParamList, DASHBOARD_STACK.LIST>) => {
  const { appDispatch } = useAppContext();

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      appDispatch(
        setAppState({
          user: null,
          rootStack: ROOT_STACK.SPLASH,
        })
      );
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.listButton}>
        <View style={styles.icon}>
          <ChartIcon color={colors.primary} />
        </View>
        <View>
          <Text style={styles.text}>Dashboard</Text>
          <Text>Charts of habits</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listButton}
        onPress={() => navigation.navigate(DASHBOARD_STACK.FAV)}
      >
        <View style={styles.icon}>
          <HeartIcon color={colors.primary} />
        </View>
        <View>
          <Text style={styles.text}>Favorites</Text>
          <Text>Liked quotes list</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listButton}>
        <View style={styles.icon}>
          <ReminderIcon color={colors.primary} />
        </View>
        <View>
          <Text style={styles.text}>Reminder</Text>
          <Text>Chuhal ajluud</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listButton} onPress={clearAllData}>
        <View style={[styles.icon, { borderColor: colors.tertiary }]}>
          <LogoutIcon color={colors.tertiary} />
        </View>
        <View>
          <Text style={styles.text}>Delete account</Text>
          <Text>Clear all data and delete account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.sizeMd,
    gap: sizes.sizeSm,
  },
  listButton: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: sizes.radiusSm,
    padding: sizes.sizeSm,
    flexDirection: "row",
    gap: sizes.sizeSm,
    alignItems: "center",
    borderBottomWidth: 2,
  },
  icon: {
    width: sizes.heightLg,
    height: sizes.heightLg,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: sizes.radiusSm,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: sizes.h7,
    fontWeight: 600,
  },
});

export default DashboardPage;
