import { Text } from "@/components";
import { HEALTH_STACK, HealthStackParamList } from "@/navigation/screenTypes";
import { colors, images, sizes } from "@/utils";
import PlayIcon from "@/utils/icons/playIcon";
import { getStorage, setStorage, storageEnumKeys } from "@/utils/storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Image,
} from "react-native";

const HealthPage = ({}: NativeStackScreenProps<
  HealthStackParamList,
  HEALTH_STACK.LIST
>) => {
  const [sounds, setSounds] = useState([]);
  const [mood, setMood] = useState<string | null>(null);
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

  useEffect(() => {
    searchSounds();
  }, [mood]);
  const searchSounds = async () => {
    const today = new Date().toISOString().split("T")[0];
    const saved = await setStorage(
      `${storageEnumKeys.MOOD}${today}`,
      JSON.stringify(mood)
    );
    if (saved) {
      try {
        const response = await axios.get(
          `https://freesound.org/apiv2/search/text/?query=${mood}&token=t0SHTKzQauXwksKHduALUgtWzfuzgInIpfNicZP5`
        );
        console.log(response.data);
        setSounds(response.data.results);
      } catch (error) {
        console.error("Error fetching sounds:", error);
      }
    }
  };

  const playSound = (previewUrl) => {
    Linking.openURL(
      `https://www.youtube.com/results?search_query=${previewUrl}`
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.list, styles.colorGreen]}>
        <Text style={styles.title}>
          Happiness is not something ready-made. It comes from your own actions.
        </Text>
      </View>
      <Text style={styles.title}>Mood tracker:</Text>
      <View style={styles.btns}>
        <TouchableOpacity
          style={[
            styles.btn,
            mood === "happy" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMood("happy")}
        >
          <Image style={styles.image} source={images.happy} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            mood === "loving" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMood("loving")}
        >
          <Image style={styles.image} source={images.loving} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            mood === "calm" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMood("calm")}
        >
          <Image style={styles.image} source={images.calm} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            mood === "sad" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMood("sad")}
        >
          <Image style={styles.image} source={images.sad} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            mood === "angry" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMood("angry")}
        >
          <Image style={styles.image} source={images.angry} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            mood === "stress" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMood("stress")}
        >
          <Image style={styles.image} source={images.stress} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            mood === "sick" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMood("sick")}
        >
          <Image style={styles.image} source={images.sick} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={sounds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.soundItem}>
            <Text style={styles.soundTitle}>
              {item.name.replace(".wav", "") ||
                item.name.replace(".mp3", "") ||
                item.name.replace(" 120", "")}
            </Text>
            <TouchableOpacity
              onPress={() =>
                playSound(
                  item.name.replace(".wav", "") || item.name.replace(".mp3", "")
                )
              }
            >
              <PlayIcon size={24} color={colors.primary80} />
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.primary10,
    padding: sizes.sizeSm,
    gap: sizes.sizeSm,
  },
  list: {
    height: 100,
    borderRadius: sizes.radiusMd,
    borderBottomWidth: 2,
    borderWidth: 0.5,
    gap: sizes.sizeXs,
    padding: sizes.sizeSm,
  },
  colorYellow: {
    backgroundColor: "#fff4a1",
    borderColor: "#dbc93d",
  },
  colorGreen: {
    backgroundColor: colors.secondary100,
    borderColor: colors.secondary,
  },
  title: {
    fontSize: sizes.h7,
    color: colors.dark,
    fontWeight: 500,
  },
  subtitle: {
    fontSize: sizes.body1,
    color: colors.dark,
    fontWeight: 500,
    height: 75,
    overflow: "hidden",
  },
  btns: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  btn: {
    width: sizes.height,
    height: sizes.height,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizes.radiusFull,
    backgroundColor: colors.light50,
    borderColor: colors.light,
    borderWidth: 1,
  },
  soundItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  soundTitle: {
    fontSize: 16,
    flex: 1,
    fontWeight: "bold",
  },
  soundDesc: {
    fontSize: 14,
    color: "#666",
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default HealthPage;
