import {Text} from '@/components';
import {HOME_STACK, HomeStackParamList} from '@/navigation/screenTypes';
import {colors, sizes} from '@/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
type RecommendedType = {
  outfit: string;
};
const WeatherPage = ({}: NativeStackScreenProps<
  HomeStackParamList,
  HOME_STACK.WEATHER
>) => {
  const [weatherData, setWeatherData] = useState<object[] | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendedType | null>(
    null,
  );

  useEffect(() => {
    const getWeather = async () => {
      axios
        .get(
          'https://api.openweathermap.org/data/2.5/weather?q=Ulaanbaatar&appid=0a9b20862dce1755236c4ac6fcec7f7e',
        )
        .then(res => {
          console.log(res.data);
          setWeatherData(res.data);
          recommendFashion(
            kelvinToCelsius(res.data.main.temp),
            res.data.weather[0].description,
          );
        });
    };
    getWeather();
  }, []);

  const kelvinToCelsius = tempK => (tempK - 273.15).toFixed(1);
  const formatTime = timestamp => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const recommendFashion = (temp, description) => {
    console.log(temp);
    if (temp < 5) {
      setRecommendation({
        outfit: 'Wool coat, cashmere sweater, Chelsea boots, knit scarf',
      });
    } else if (temp >= 5 && temp < 15) {
      setRecommendation({
        outfit: 'Trench coat, leather jacket, jeans, ankle boots',
      });
    } else if (temp >= 15 && temp < 25) {
      setRecommendation({
        outfit: 'Cotton dress, chinos, linen shirt, loafers, sunglasses',
      });
    } else {
      setRecommendation({
        outfit: 'Light sundress, shorts, breathable fabrics, sandals, hats',
      });
    }

    if (description.includes('rain')) {
      setRecommendation(prev => ({
        ...prev,
        outfit: prev.outfit + ' Plus a stylish waterproof jacket and umbrella!',
      }));
    }
  };
  if (!weatherData) return <Text style={styles.loading}>Loading...</Text>;

  const {
    name,
    sys: {country, sunrise, sunset},
    main: {
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      pressure,
      grnd_level,
    },
    visibility,
    wind: {speed, deg},
    weather,
    clouds: {all: cloudiness},
  } = weatherData;

  return (
    <View style={[styles.container]}>
      <View style={styles.list}>
        {weatherData && (
          <View>
            <View style={styles.weather}>
              <View>
                <Image
                  style={styles.weatherIcon}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={styles.temperature}>
                  {kelvinToCelsius(weatherData?.main?.temp)}°C
                </Text>
              </View>
              <View>
                <Text style={styles.cityName}>
                  {weatherData.name}, {weatherData.sys.country}
                </Text>
                <Text style={styles.description}>
                  {weatherData.weather[0].description}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.infoText}>{formatTime(sunrise)}</Text>
                <Text style={styles.infoText}>{formatTime(sunset)}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 12}}>
              <View style={styles.extraInfo}>
                <Text style={styles.infoText}>Humidity (%)</Text>
                <Text style={styles.info}>{humidity}</Text>
              </View>
              <View style={styles.extraInfo}>
                <Text style={styles.infoText}>Pressure (hPa)</Text>
                <Text style={styles.info}>{pressure} </Text>
              </View>
              <View style={styles.extraInfo}>
                <Text style={styles.infoText}>Cloudness (%)</Text>
                <Text style={styles.info}>{cloudiness}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 12}}>
              {grnd_level && (
                <View style={styles.extraInfo}>
                  <Text style={styles.infoText}>Ground Pressure</Text>
                  <Text style={styles.info}>{grnd_level} </Text>
                </View>
              )}
              <View style={styles.extraInfo}>
                <Text style={styles.infoText}>Visibility (km)</Text>
                <Text style={styles.info}>{visibility / 1000}</Text>
              </View>
              <View style={styles.extraInfo}>
                <Text style={styles.infoText}>Wind {'   '}(m/s)</Text>
                <Text style={styles.info}>{speed}</Text>
              </View>
            </View>
            {recommendation && (
              <View>
                <Text style={styles.outfit}>
                  Recommended Outfit: {recommendation?.outfit}
                </Text>
              </View>
            )}
          </View>
        )}
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
    backgroundColor: colors.primary,
    borderColor: colors.primary900,
    gap: sizes.sizeSm,
    padding: sizes.sizeSm,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  weather: {
    backgroundColor: colors.primary50,
    alignItems: 'center',
    paddingBottom: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: sizes.body1,
    color: colors.dark,
    fontWeight: 500,
    marginTop: 24,
    textAlign: 'center',
  },

  weatherIcon: {
    width: 200,
    height: 120,
  },
  cityName: {
    fontSize: sizes.h5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  temperature: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
    paddingVertical: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: sizes.h7,
    color: '#333',
    textAlign: 'center',
  },
  extraInfo: {
    marginTop: 16,
    flex: 1,
    padding: 16,
    backgroundColor: colors.light20,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 600,
    textAlign: 'center',
  },
  temp: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  outfit: {
    fontSize: 16,
    color: colors.white,
    marginTop: 12,
  },
});

export default WeatherPage;
