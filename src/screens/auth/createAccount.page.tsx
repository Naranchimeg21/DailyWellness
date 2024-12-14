import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  AUTH_STACK,
  AuthStackParamList,
  ROOT_STACK,
} from "@/navigation/screenTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@/components";
import { colors, images, sizes } from "@/utils";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import InputForm from "@/components/forms/input.form";
import { useAppContext } from "@/context/providers/app.provider";
import { setAppState } from "@/context/reducers/app.reducer";
import { DatePicker } from "@/components/forms/datepicker.form";
import { setStorage, storageEnumKeys } from "@/utils/storage";

const CreateAccountPage = ({}: NativeStackScreenProps<
  AuthStackParamList,
  AUTH_STACK.CREATE_ACCOUNT
>) => {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { appDispatch } = useAppContext();

  const create = async () => {
    if (gender && name && birthday) {
      await setStorage(
        storageEnumKeys.USERW,
        JSON.stringify({ gender: gender, name: name, birthday: birthday })
      );
      appDispatch(
        setAppState({
          user: { gender: gender, name: name, birthday: birthday },
          rootStack: ROOT_STACK.MAIN,
        })
      );
    } else {
      setError("Fill all field!");
    }
  };
  return (
    <LinearGradient
      colors={[colors.primary50, colors.primary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Fill your information</Text>
        <View style={styles.content}>
          <Text style={styles.subTitle}>Select your gender:</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.imageContainer,
                gender === "female" && styles.selected,
              ]}
              onPress={() => setGender("female")}
            >
              <Image
                source={images.genderX}
                style={[styles.image, { top: 10 }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.imageContainer,
                gender === "male" && styles.selected,
              ]}
              onPress={() => setGender("male")}
            >
              <Image source={images.genderY} style={styles.image} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitle}>Nickname:</Text>
          <InputForm value={name} onChangeText={(e) => setName(e)} />
          <Text style={styles.subTitle}>Birthday:</Text>
          <DatePicker mode="date" onDateChanged={setBirthday} />
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <Button
            type="outlined"
            title="Create account"
            onPress={() => create()}
            style={styles.button}
            buttonStyle={styles.button}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: sizes.sizeLg,
  },
  title: {
    fontSize: sizes.h4,
    fontWeight: 600,
    textAlign: "center",
    color: colors.white,
    marginTop: 24,
  },
  content: {
    flex: 1,
    marginTop: 50,
    gap: sizes.sizeSm,
    paddingHorizontal: sizes.sizeMd,
  },
  subTitle: {
    fontSize: sizes.h6,
    fontWeight: 600,
    color: colors.white,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: sizes.sizeMd,
  },
  imageContainer: {
    backgroundColor: colors.light,
    borderRadius: 150,
    overflow: "hidden",
    opacity: 80,
    borderColor: colors.light,
    borderWidth: 1,
  },
  selected: {
    borderColor: colors.white,
    backgroundColor: colors.primary,
  },
  image: {
    width: 160,
    height: 160,
  },
  errorContainer: {
    flexDirection: "row",
  },
  errorText: {
    color: colors.error600,
    fontSize: sizes.body1,
  },
  button: {
    height: sizes.heightLg,
    backgroundColor: colors.white,
    marginTop: 50,
  },
});

export default CreateAccountPage;
