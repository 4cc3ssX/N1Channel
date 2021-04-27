import React from 'react';
import { View, Linking, Animated, Image, TouchableOpacity, StatusBar} from 'react-native';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import { Icon as EvaIcon } from 'react-native-eva-icons';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateRecentDramaList } from '../redux/actions/counter_action';
import { ThemeContext } from '../src/theme-context';

const Loading = ({navigation}) => {
  const [isReady, setReady] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0.2)).current;
  const [loading, setLoading] = React.useState('...');
  const themeContext = React.useContext(ThemeContext);
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const loads = [
    "I'm loading please wait...OwO",
    "Be sure you have an active connection.",
    "A moment please, I'm getting ready..!",
    "Wait a second, I'm connecting to the server..!",
    "Yo! Did you turn on the internet connection?",
  ];
  const theme = useTheme();
  React.useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 750,
            useNativeDriver: false,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 750,
            useNativeDriver: false,
          }),
        ]),
      ).start();
      const sload = setInterval(() => {
        setLoading(loads[Math.floor(Math.random() * loads.length)]);
      }, 2500);
      axios.get('https://creator.n1channel.org/drama/read.php').then(rec => {
        dispatch(updateRecentDramaList(rec.data.drama.splice(0, 21)));
        setReady(true);
    }).catch((e) => {
      setError(true);
      setLoading(e);
    });
    return () => {
      clearInterval(sload);
    };
  }, []);
  React.useEffect(() => {
    if(isReady && !error) {
      navigation.replace('botTab');
    }
  }, [isReady, error])
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar hidden={true} />
      <Image 
        source={require('../assets/logo.png')}
        resizeMode="cover"
        style={{borderRadius: 100, width: 100, height: 100, marginVertical: 10}}
      />
      <Animated.Text
        style={{
          opacity: fadeAnim,
          fontFamily: 'Roboto',
          fontSize: 14,
          color: error ? theme['color-danger-400'] : themeContext.theme==='light' ? theme['color-basic-400'] : theme['color-primary-100'],
          marginVertical: 10,
        }}>
        {loading}
      </Animated.Text>
      <TouchableOpacity onPress={() => Linking.openURL("https://m.me/n1channel182019")} style={{position: 'absolute', bottom: 30, left: 20, right: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text category="s1" style={{marginHorizontal: 3, color: '#bbb'}}>@m.me/N1Channel</Text>
            <EvaIcon name="external-link-outline" fill="#bbb" width={12} height={12}/>
          </View>
          </TouchableOpacity>
    </Layout>
  );
};

export default Loading;
