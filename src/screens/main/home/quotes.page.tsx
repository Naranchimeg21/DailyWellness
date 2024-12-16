import { Text } from "@/components";
import { HOME_STACK, HomeStackParamList } from "@/navigation/screenTypes";
import { colors, sizes } from "@/utils";
import HeartFilledIcon from "@/utils/icons/heartFilledIcon";
import HeartIcon from "@/utils/icons/heartIcon";
import RepeatIcon from "@/utils/icons/repeatIcon";
import ShareIcon from "@/utils/icons/shareIcon";
import { getStorage, setStorage, storageEnumKeys } from "@/utils/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Share } from "react-native";

const QuotePage = ({}: NativeStackScreenProps<
  HomeStackParamList,
  HOME_STACK.QUOTE
>) => {
  const [quote, setQuote] = useState<Object[] | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fav, setFav] = useState(false);

  const fetchQuote = async () => {
    const today = new Date().toISOString().split("T")[0];

    axios.get("https://zenquotes.io/api/random").then((res) => {
      setQuote(res.data[0]);
      setStorage(
        `${storageEnumKeys.QUOTE}${today}`,
        JSON.stringify(res.data[0])
      );
    });

    axios
      .get("https://api.thecatapi.com/v1/images/search", {
        headers: {
          "x-api-key":
            "live_WscMyecHmVEdxfwdMSLUDD2x31erwtRVKw8KNiNEysF12l427sCD0DPNBkGP1ldE",
        },
      })
      .then((res) => {
        console.log(res.data[0]["url"]);
        setImage(res.data[0]["url"]);
      });
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const getQuote = async () => {
      const savedQuotes = await getStorage(`${storageEnumKeys.FAVQUOTE}`);
      if (savedQuotes) {
        const parsedQuotes = JSON.parse(savedQuotes);
        const hasQ = parsedQuotes.some((item) => item.q === quote.q);
        if (hasQ) {
          setFav(true);
        }
      }
      const savedQ = await getStorage(`${storageEnumKeys.QUOTE}${today}`);
      if (savedQ) {
        setQuote(JSON.parse(savedQ));
      } else {
        fetchQuote();
      }
    };
    getQuote();
  }, []);
  const shareText = async () => {
    try {
      const result = await Share.share({
        message: quote.q,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: " + result.activityType);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing text: ", error.message);
    }
  };
  const addFavorite = async () => {
    const savedQuotes = await getStorage(`${storageEnumKeys.FAVQUOTE}`);
    let updatedQuotes = [];

    if (savedQuotes) {
      const parsedQuotes = JSON.parse(savedQuotes);
      const hasQ = parsedQuotes.some((item) => item.q === quote.q);

      if (hasQ) {
        setFav(false);
        updatedQuotes = parsedQuotes.filter((item) => item.q !== quote.q);
      } else {
        setFav(true);
        updatedQuotes = [...parsedQuotes, quote];
      }
    } else {
      setFav(true);
      updatedQuotes = [quote];
    }

    await setStorage(
      `${storageEnumKeys.FAVQUOTE}`,
      JSON.stringify(updatedQuotes)
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.list}>
        {image && <Image source={{ uri: image }} style={styles.images} />}
        <View style={styles.content}>
          <View>{quote && <Text style={styles.title}>{quote.q}</Text>}</View>
          <View>
            {quote && <Text style={styles.author}>- {quote.a} -</Text>}
          </View>
          <View style={styles.btns}>
            <TouchableOpacity style={styles.btn} onPress={fetchQuote}>
              <RepeatIcon size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, fav && { backgroundColor: colors.primary }]}
              onPress={addFavorite}
            >
              {fav ? (
                <HeartFilledIcon size={28} color={colors.tertiary} />
              ) : (
                <HeartIcon size={28} color={colors.tertiary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={shareText}>
              <ShareIcon size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.sizeSm,
    gap: sizes.sizeSm,
  },
  list: {
    flex: 1,
    borderRadius: sizes.radiusMd,
    borderBottomWidth: 2,
    borderWidth: 0.5,
    backgroundColor: "#fff4a1",
    borderColor: "#dbc93d",
    gap: sizes.sizeSm,
    padding: sizes.sizeSm,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: sizes.body1,
    color: colors.dark,
    fontWeight: 500,
    marginTop: 24,
    textAlign: "center",
  },
  author: {
    fontSize: sizes.h6,
    color: colors.dark,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 24,
  },
  images: {
    height: 350,
    width: 335,
    borderStartEndRadius: sizes.radiusMd,
    borderStartStartRadius: sizes.radiusMd,
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
});

export default QuotePage;
