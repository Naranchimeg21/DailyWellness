import { Button, Text } from "@/components";
import { HOME_STACK, HomeStackParamList } from "@/navigation/screenTypes";
import { colors, images, sizes } from "@/utils";
import { getStorage, storageEnumKeys } from "@/utils/storage";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";

const HomePage = ({
  navigation,
}: NativeStackScreenProps<HomeStackParamList, HOME_STACK.LIST>) => {
  const [quote, setQuote] = useState<object[] | null>(null);
  const [weatherData, setWeatherData] = useState<object[] | null>(null);
  const getWeather = async () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar&appid=0a9b20862dce1755236c4ac6fcec7f7e"
      )
      .then((res) => {
        console.log(res.data);
        setWeatherData(res.data);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      const today = new Date().toISOString().split("T")[0];

      const getQuote = async () => {
        setQuote(
          JSON.parse(await getStorage(`${storageEnumKeys.QUOTE}${today}`))
        );
      };
      getQuote();
      getWeather();
    }, [])
  );

  const kelvinToCelsius = (tempK: number) => (tempK - 273.15).toFixed(1); // Convert temperature from Kelvin to Celsius

  return (
    <View style={[styles.container]}>
      <View style={[styles.list, styles.colorYellow]}>
        <Text style={styles.title}>Today's positive quote</Text>
        {quote ? (
          <>
            <Text style={styles.subtitle}>{quote.q}</Text>
            <Button
              type="outlined"
              title="More..."
              size="middle"
              onPress={() => navigation.navigate(HOME_STACK.QUOTE)}
            />
          </>
        ) : (
          <Button
            type="outlined"
            title="View"
            onPress={() => navigation.navigate(HOME_STACK.QUOTE)}
          />
        )}
      </View>
      <View style={[styles.list, styles.colorGreen]}>
        <Text style={styles.title}>Today's weather</Text>
        {weatherData && (
          <View style={styles.weather}>
            <View style={styles.temperature}>
              <Text style={styles.temperatureVal}>
                {kelvinToCelsius(weatherData.main.temp)}°C
              </Text>
            </View>

            <View style={{ marginLeft: 5 }}>
              <Text style={styles.cityName}>
                {weatherData.name}, {weatherData.sys.country}
              </Text>
              <Text style={styles.description}>
                {weatherData.weather[0].description}
              </Text>
            </View>
          </View>
        )}
        <Button
          type="outlined"
          title="More..."
          size="middle"
          onPress={() => navigation.navigate(HOME_STACK.WEATHER)}
        />
      </View>
      {/* <View style={styles.list}>
        <Text style={styles.title}>Today's health tip</Text>
      </View> */}
      <ScrollView>
        <Text style={styles.title}>Today's to do:</Text>
        <Image source={images.comingSoon} style={styles.images} />
      </ScrollView>
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
    height: 200,
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
    fontSize: sizes.body1,
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
  images: {
    height: 200,
    width: "auto",
  },
  weather: {
    flexDirection: "row",
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: sizes.radiusSm,
    overflow: "hidden",
    alignItems: "center",
    paddingRight: 4,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary100,
  },
  cityName: {
    fontSize: sizes.h7,
    fontWeight: "bold",
  },
  temperature: {
    width: 120,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureVal: {
    fontSize: sizes.h5,
    fontWeight: "bold",
    color: colors.primary,
    padding: 10,
  },
  description: {
    fontSize: sizes.body1,
    color: "#333",
  },
});

export default HomePage;
