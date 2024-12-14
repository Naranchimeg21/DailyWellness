import {Button, Text} from '@/components';
import {HOME_STACK, HomeStackParamList} from '@/navigation/screenTypes';
import {colors, images, sizes} from '@/utils';
import HeartFilledIcon from '@/utils/icons/heartFilledIcon';
import RepeatIcon from '@/utils/icons/repeatIcon';
import ShareIcon from '@/utils/icons/shareIcon';
import {getStorage, setStorage, storageEnumKeys} from '@/utils/storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const QuotePage = ({}: NativeStackScreenProps<
  HomeStackParamList,
  HOME_STACK.QUOTE
>) => {
  const [quote, setQuote] = useState<Object[] | null>(null);
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const getQuote = async () => {
      const savedQ = await getStorage(`${storageEnumKeys.QUOTE}${today}`);
      if (savedQ) {
        setQuote(JSON.parse(savedQ));
      } else {
        axios.get('https://zenquotes.io/api/random').then(res => {
          setQuote(res.data);
          setStorage(
            `${storageEnumKeys.QUOTE}${today}`,
            JSON.stringify(res.data),
          );
        });
      }
      axios
        .get('https://api.thecatapi.com/v1/images/search', {
          headers: {
            'x-api-key':
              'live_WscMyecHmVEdxfwdMSLUDD2x31erwtRVKw8KNiNEysF12l427sCD0DPNBkGP1ldE',
          },
        })
        .then(res => {
          console.log(res.data[0]['url']);
          setImage(res.data[0]['url']);
        });
    };
    getQuote();
  }, []);
  return (
    <View style={[styles.container]}>
      <View style={styles.list}>
        {image && <Image source={{uri: image}} style={styles.images} />}
        <View style={styles.content}>
          <View>
            {quote && <Text style={styles.title}>{quote[0]['q']}</Text>}
          </View>
          <View>
            {quote && <Text style={styles.author}>- {quote[0]['a']} -</Text>}
          </View>
          <View style={styles.btns}>
            <TouchableOpacity style={styles.btn}>
              <RepeatIcon size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <HeartFilledIcon size={28} color={colors.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
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
    backgroundColor: '#fff4a1',
    borderColor: '#dbc93d',
    gap: sizes.sizeSm,
    padding: sizes.sizeSm,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: sizes.body1,
    color: colors.dark,
    fontWeight: 500,
    marginTop: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: sizes.h6,
    color: colors.dark,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 24,
  },
  images: {
    height: 350,
    width: 335,
    borderStartEndRadius: sizes.radiusMd,
    borderStartStartRadius: sizes.radiusMd,
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  btn: {
    width: sizes.height,
    height: sizes.height,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes.radiusFull,
    backgroundColor: colors.light50,
    borderColor: colors.light,
    borderWidth: 1,
  },
});

export default QuotePage;
