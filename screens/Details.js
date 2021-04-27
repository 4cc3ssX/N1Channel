import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Share,
} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import { ThemeContext } from '../src/theme-context';
import axios from 'axios';
import { Icon as EvaIcon } from 'react-native-eva-icons';
import FastImage from 'react-native-fast-image';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavItem, updateFavList } from '../redux/actions/counter_action';
import Rabbit from '../src/Rabbit';

const Tab = createBottomTabNavigator();

const Summary = ({ navigation, route }) => {
  const { dramaId, dramaTitle, dramaCover } = route.params;
  const [dramaDetails, setDramaDetails] = React.useState([]);
  const [isUnicode, setUnicode] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const favList = useSelector(state => state.favList);
  const [isFav, setIsFav] = React.useState((favList.filter((item) => item.dramaId===dramaId).length==1));
  const themeContext = React.useContext(ThemeContext);
  const theme = useTheme();

  const toggleFavList = () => {
    if(isFav) {
      dispatch(deleteFavItem(dramaId))
      setIsFav(false);
    } else {
      dispatch(updateFavList({dramaId, dramaTitle, dramaCover}))
      setIsFav(true);
    }
  }
  React.useEffect(() => {
    let isMounted = true;
    axios
      .get(
        `https://creator.n1channel.org/drama/read_one.php?drama_id=${dramaId}`,
      )
      .then(res => {
        if (isMounted) {
          setDramaDetails(res.data);
          setLoading(false);
        };
      })
      .catch(error => {
        console.log(error);
      });
      return () => {
        isMounted = false;
      }
  }, []);
  return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment="center"
          accessoryLeft={() => (
            <TopNavigationAction
              style={{
                padding: 8,
                borderRadius: 50,
                backgroundColor: theme['background-basic-color-2'],
              }}
              icon={props => <Icon {...props} name="arrow-ios-back" />}
              onPress={() => navigation.goBack()}
            />
          )}
          accessoryRight={props_ => (
            <TopNavigationAction
              icon={props_ => <Icon {...props_} name="search-outline" />}
              onPress={() => navigation.navigate('Search')}
            />
          )}
          title={dramaTitle}
          style={styles.titleContainer}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20, paddingVertical: 10}} automaticallyAdjustContentInsets={true}>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              style={{
                borderRadius: 10,
                width: 140,
                height: 140,
                marginLeft: 20,
                marginRight: 4,
              }}
              source={{
                uri: dramaCover,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ flexDirection: 'column', marginRight: 20, marginLeft: 4, justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 6,
                  marginLeft: 3,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text category="h4" numberOfLines={2}>
                  {dramaTitle}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 4,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => toggleFavList()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginHorizontal: 10,
                    backgroundColor: themeContext.theme==='light' ? theme['background-basic-color-2'] : theme['color-basic-transparent-600'],
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 50,
                  }}>
                  <EvaIcon
                    name={isFav ? "heart" : "heart-outline"}
                    width={17}
                    height={17}
                    fill={
                      themeContext.theme === 'light'
                        ? theme['color-primary-500']
                        : theme['color-basic-400']
                    }
                  />
                  <Text category="s1" style={{color: themeContext.theme==='light' ? theme['color-primary-500'] : theme['color-basic-400'], marginLeft: 4}}>
                    {isFav ? "Remove from" : "Add to"} Favourite
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Share.share({
                      message: `Click to watch on N1 Channel ^_^
                      https://www.n1channel.org/drama/?id=${dramaId}`,
                    })}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderWidth: 1,
                    borderColor: themeContext.theme==='light' ? theme['color-primary-300'] : theme['color-primary-500'],
                    backgroundColor: themeContext.theme==='light' ? theme['color-primary-100'] : theme['color-basic-transparent-600'],
                    paddingVertical: 8,
                    marginHorizontal: 10,
                    paddingHorizontal: 12,
                    borderRadius: 50,
                  }}>
                  <EvaIcon
                    name="share-outline"
                    width={17}
                    height={17}
                    fill={
                      themeContext.theme === 'light'
                        ? theme['color-primary-500']
                        : theme['color-basic-400']
                    }
                  />
                  <Text category="s1" style={{color: themeContext.theme==='light' ? theme['color-primary-500'] : theme['color-basic-400'], marginLeft: 4}}>
                    Share
                </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 4, paddingVertical: 10, paddingHorizontal: 10}}>
              {!isLoading && !dramaDetails.drama_summary ? (
                <Text category="s1"
                 style={{textAlign: 'center'}}>No summary available.</Text>
              ) : (
                <>
                <TouchableOpacity style={{marginVertical: 4, alignSelf: 'center'}} onPress={() => {
                  setDramaDetails({...dramaDetails, drama_summary: isUnicode ? Rabbit.uni2zg(dramaDetails.drama_summary) : Rabbit.zg2uni(dramaDetails.drama_summary)})
                  setUnicode(!isUnicode)
                }}>
                  <Text status="info" style={{textDecorationLine: 'underline'}}>Can't read summary?</Text>
                </TouchableOpacity>
                <Text
                  category="p1"
                  style={{
                    fontSize: 16,
                    color: themeContext.theme==='light' ? "#000" : "#dfdfdf",
                    fontFamily: 'Roboto',
                    textAlign: 'justify',
                  }}>{dramaDetails.drama_summary}</Text>
                </>
              )}
          </View>
        </ScrollView>
      </Layout>
  );
};

const Episodes = ({ navigation, route }) => {
  const { dramaId, dramaTitle } = route.params;
  const [episodeList, setEpisodeList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const themeContext = React.useContext(ThemeContext);
  const theme = useTheme();
  React.useEffect(() => {
    if (isLoading) {
      let isMounted = true;
        axios.get(`https://creator.n1channel.org/drama/readEpisode.php?drama_id=${dramaId}`)
          .then(res => {
            if (isMounted) {
              setEpisodeList(res.data.episodes)
              setLoading(false);
            }
          })
          .catch(error => {
            setError(error);
          });
          return () => {
            isMounted = false;
          }
    }
  }, [isLoading]);
  return (
    <Layout style={{flex: 1}}>
    <View style={styles.titleContainer}>
        <Text category="h3">Episodes</Text>
    </View>
    <FlatList
      progressViewOffset={10}
      showsVerticalScrollIndicator={false}
      data={episodeList}
      contentContainerStyle={{backgroundColor: themeContext.theme==='light' ? theme['color-basic-100'] : theme['color-basic-800']}}
      ListEmptyComponent={() => (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {!isLoading && !episodeList && (
            <Text>No episode available.</Text>
          )}
          {error && (
            <Text status="danger">{error}</Text>
          )}
        </View>
      )}
      refreshing={isLoading}
      onRefresh={() => setLoading(true)}
      renderItem={({ item, index }) => (
        <TouchableNativeFeedback onPress={() => navigation.navigate('Player', {dramaTitle: dramaTitle, epTitle: item.ep_title, epVidUrl: item.vid_url})}>
          <Layout style={styles.container}>
            <View style={styles.content_style}>
              <EvaIcon width={24} height={24} name="film-outline" fill={theme['color-primary-400']} />
            </View>
            <Text category="s1" style={styles.children_style}>
              {item.ep_title}
            </Text>
            <EvaIcon name="arrow-ios-forward" width={24} height={24} fill={themeContext.theme === 'light' ? theme['color-primary-500'] : theme['color-basic-400']} />
          </Layout>
        </TouchableNativeFeedback>
      )}
      keyExtractor={item => item.ep_id}
    />
    </Layout>
  );
};

const Details = ({ navigation, route }) => {
  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  return (
    <Tab.Navigator
    initialRouteName="Summary"
    backBehavior={() => navigation.navigate('Home')}
    tabBarOptions={{
      activeTintColor: theme['color-primary-400'],
      showLabel: false,
      style: {
        borderTopColor: themeContext.theme==='light' ? theme['color-basic-100'] : theme['color-basic-700']
      }
    }}>
      <Tab.Screen name="Summary" component={Summary} options={{
        tabBarIcon: ({focused, color, size}) => (
          <EvaIcon name={focused ? "book-open" : "book-open-outline"} fill={color} width={size} height={size}/>
        )
      }} initialParams={route.params} />
      <Tab.Screen name="Episodes" component={Episodes} options={{
        tabBarIcon: ({focused, color, size}) => (
          <EvaIcon name={focused ? "tv" : "tv-outline"} fill={color} width={size} height={size}/>
        )
      }} initialParams={route.params} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 4,
  },
  subtitle_style: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 2,
  },
  children_style: {
    flexGrow: 3,
    marginHorizontal: 10,
  },
  content_style: {
    padding: 5,
    borderRadius: 100,
  },
});

export default Details;
