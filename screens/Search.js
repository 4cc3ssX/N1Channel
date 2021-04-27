import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, TouchableNativeFeedback, View, Share } from 'react-native';
import {
  Layout,
  Text,
  Icon,
  useTheme,
  Input,
} from '@ui-kitten/components';
import { Icon as EvaIcon } from 'react-native-eva-icons';
import axios from 'axios';
import { ThemeContext } from '../src/theme-context';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const Search = ({ route, navigation }) => {
  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  const ref = React.useRef();
  const [suggests, setSuggests] = React.useState([]);

  const search = (s) => {
    if (String(s).toLowerCase().length > 1) {
      axios.get(`https://creator.n1channel.org/drama/search.php?s=${s}`).then((res) => {
        setSuggests(res.data.drama)
      }).catch(e => {
        setSuggests([]);
      })
    } else {
      setSuggests([]);
    }
  }
  return (
    <Layout style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 10, justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}
          style={{
            backgroundColor: theme['color-primary-100'],
            ...styles.tab_nav,
          }}>
          <EvaIcon width={20} height={20} name="menu-2-outline" fill={theme['color-primary-500']} />
        </TouchableOpacity>

        <Input
          ref={ref}
          accessoryLeft={(props) => (
           <Icon {...props} name="search-outline" />
          )}
          accessoryRight={(props) => (
            <TouchableOpacity onPress={() => {
              ref.current.clear();
              setSuggests([]);
            }}>
              <Icon {...props} name="close-outline" />
            </TouchableOpacity>
          )}
          onPressIn={() => ref.current.focus()}
          onSubmitEditing={e => console.log(e.nativeEvent.text)}
          onPressOut={() => ref.current.blur()} 
          onChangeText={s => search(s)}
          status="basic" 
          style={{ flexGrow: 2, paddingHorizontal: 2, borderColor: themeContext.theme==='light' ? '#eee' : theme['color-primary-600'], borderRadius: 20, marginHorizontal: 4 }}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ marginHorizontal: 4 }}>
          <EvaIcon name="settings-outline" width={24} height={24} fill={themeContext.theme === 'light' ? theme['color-basic-800'] : theme['color-primary-100']} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginHorizontal: 10, paddingHorizontal: 4 }}>
        <FlatList
          data={suggests}
          contentContainerStyle={{ paddingBottom: 4 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <EvaIcon name="search-outline" style={{ marginRight: 4 }} width={18} height={18} fill={themeContext.theme === 'light' ? theme['color-primary-400'] : theme['color-basic-400']} />
              <Text category="h6" style={{ textDecorationStyle: "dashed" }} status="primary">Let's find somthing on N1!</Text>
            </View>
          )}
          renderItem={({ item, index }) => {
            return (
              <TouchableNativeFeedback key={index.toString()} onPress={() => navigation.navigate('Details', { dramaId: item.drama_id, dramaTitle: item.drama_title, dramaCover: item.drama_cover })}>
                <Layout style={{ flexDirection: 'row', backgroundColor: themeContext.theme==='light' ? theme['color-basic-100'] : theme['color-basic-700'], marginHorizontal: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2.84, elevation: 4, borderRadius: 10, marginVertical: 4, marginBottom: 8, paddingVertical: 14, flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                  <FastImage
                    style={{
                      borderRadius: 5,
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      marginLeft: 12,
                      marginRight: 4,
                    }}
                    source={{
                      uri: item.drama_cover,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text category="h6" numberOfLines={1} style={{ marginVertical: 4 }}>
                        {item.drama_title}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', marginRight: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <EvaIcon name="clock-outline" style={{ marginRight: 4 }} width={15} height={15} fill={themeContext.theme === 'light' ? theme['color-basic-800'] : theme['color-basic-100']} />
                        <Text category="s2">{moment(item.created, "YYYY-MM-dd hh:mm:ss").fromNow()}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => Share.share({
                          message: `Click to watch on N1 Channel ^_^
                            https://www.n1channel.org/drama/?id=${item.drama_id}`,
                        })}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          backgroundColor: themeContext.theme === 'light' ? theme['color-primary-100'] : theme['color-basic-transparent-600'],
                          padding: 8,
                          marginHorizontal: 8,
                          paddingHorizontal: 12,
                          borderRadius: 50,
                        }}>
                        <EvaIcon
                          name="share-outline"
                          width={15}
                          height={15}
                          fill={
                            themeContext.theme === 'light'
                              ? theme['color-primary-500']
                              : theme['color-basic-400']
                          }
                        />
                        <Text category="c1" style={{ color: themeContext.theme === 'light' ? theme['color-primary-500'] : theme['color-basic-400'], marginLeft: 4 }}>
                          Share
                      </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Layout>
              </TouchableNativeFeedback>
            )
          }}
          keyExtractor={item => item.drama_id}
        />
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  tab_nav: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Search;
