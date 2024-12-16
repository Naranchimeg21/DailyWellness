import { Text } from "@/components";
import {
  DASHBOARD_STACK,
  DashboardStackParamList,
} from "@/navigation/screenTypes";
import { colors, sizes } from "@/utils";
import { getStorage, storageEnumKeys } from "@/utils/storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const FavoritesPage = ({}: NativeStackScreenProps<
  DashboardStackParamList,
  DASHBOARD_STACK.FAV
>) => {
  const [quotes, setQuotes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getQuotes = async () => {
        setQuotes(JSON.parse(await getStorage(`${storageEnumKeys.FAVQUOTE}`)));
      };
      getQuotes();
    }, [])
  );

  return (
    <View style={[styles.container]}>
      {quotes.map((item) => (
        <TouchableOpacity style={styles.listButton}>
          <View>
            <Text>{item.q}</Text>

            <Text style={styles.text}>- {item.a} -</Text>
          </View>
        </TouchableOpacity>
      ))}
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
    textAlign: "right",
  },
});

export default FavoritesPage;
