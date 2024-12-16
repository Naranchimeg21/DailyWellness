import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  View,
  Platform,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

//import theme
import { colors, images, sizes } from "@/utils";
import { Text } from "./typography/Text";
import { MAIN_STACK, TRACKER_STACK } from "@/navigation/screenTypes";
import BackIcon from "@/utils/icons/backIcon";
import { useAppContext } from "@/context/providers/app.provider";
import PlusIcon from "@/utils/icons/plusIcon";
import { getStorage, storageEnumKeys } from "@/utils/storage";
import CommentIcon from "@/utils/icons/commentIcon";

interface HeaderProps {
  title?: string;
  backPress?: () => void;
  customBack?: boolean;
  noBack?: boolean;
  type?: "report" | "habit" | "default";
}

const Header = ({
  title,
  backPress = () => {},
  customBack = false,
  noBack = false,
  type = "default",
}: HeaderProps) => {
  const navigation = useNavigation();
  const {
    appDispatch,
    appState: { user },
  } = useAppContext();
  const back = () => {
    !customBack ? navigation.goBack() : backPress();
  };
  const [mood, setMood] = useState<string | null>(null);

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  };
  useFocusEffect(
    React.useCallback(() => {
      const today = new Date().toISOString().split("T")[0];
      const getMood = async () => {
        setMood(
          JSON.parse(await getStorage(`${storageEnumKeys.MOOD}${today}`))
        );
      };
      getMood();
    }, [])
  );

  return (
    <LinearGradient
      colors={[colors.primary, colors.primary700]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <SafeAreaView
        style={[
          type === "report"
            ? Platform.OS === "ios"
              ? styles.proContainer
              : [{ height: 250, paddingVertical: 20 }]
            : Platform.OS === "ios"
            ? styles.mainContainer
            : { height: 70, justifyContent: "center" },
        ]}
      >
        <View style={styles.viewContainer}>
          <StatusBar
            translucent={false}
            backgroundColor={colors.neutral100}
            barStyle={"light-content"}
          />
          <TouchableOpacity
            style={noBack && styles.hidden}
            activeOpacity={0.8}
            disabled={noBack}
            onPress={back}
          >
            <BackIcon color={colors.white} size={sizes.sizeMd} />
          </TouchableOpacity>
          <TouchableOpacity
            style={type !== "habit" && styles.hidden}
            activeOpacity={0.8}
            disabled={type !== "habit"}
            onPress={() => navigation.navigate(TRACKER_STACK.ADD as never)}
          >
            <PlusIcon color={colors.white} size={sizes.sizeMd} />
          </TouchableOpacity>
          <Text style={styles.midText}>{title}</Text>
          <TouchableOpacity
            style={!noBack ? styles.hidden : styles.profileContainer}
            activeOpacity={0.8}
            disabled={!noBack}
            onPress={() => navigation.navigate(MAIN_STACK.DASHBOARD as never)}
          >
            <Image
              style={styles.profileImage}
              source={user?.gender === "male" ? images.genderY : images.genderX}
            />
          </TouchableOpacity>
        </View>
        {type === "report" && (
          <View style={styles.profileHeader}>
            <Image
              style={styles.proImage}
              source={user?.gender === "male" ? images.genderY : images.genderX}
            />
            {mood && (
              <View style={styles.bubbleContainer}>
                <CommentIcon size={50} color={colors.white} />
                <Image
                  source={images[mood]}
                  style={{
                    width: 26,
                    height: 26,
                    position: "relative",
                    bottom: "56%",
                    left: "25%",
                  }}
                />
              </View>
            )}

            <Text style={styles.name}>
              {user?.name}, {calculateAge(user?.birthday)}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  mainContainer: {
    height: 120,
  },
  viewContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  midText: {
    flex: 1,
    fontSize: sizes.h6,
    fontWeight: "600",
    textAlign: "center",
    color: colors.white,
  },
  profileImage: {
    width: sizes.height,
    height: sizes.height,
    borderRadius: sizes.radiusFull,
    backgroundColor: colors.primary,
    borderColor: colors.light,
    borderWidth: 0.6,
  },
  proImage: {
    width: 100,
    height: 100,
    borderRadius: sizes.radiusFull,
    backgroundColor: colors.primary,
    borderColor: colors.light,
    borderWidth: 0.6,
  },
  profileContainer: {
    width: sizes.height,
    height: sizes.height,
  },
  proContainer: {
    height: 300,
  },
  hidden: {
    display: "none",
  },
  profileHeader: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    color: colors.white,
    fontWeight: 600,
    marginTop: 10,
  },
  bubbleContainer: {
    position: "absolute",
    bottom: "65%",
    left: "30%",
  },

  bubbleText: {
    fontSize: 14,
    color: "#000",
  },
});

export default Header;
