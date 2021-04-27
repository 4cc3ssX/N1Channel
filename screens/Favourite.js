import React from 'react';
import {StyleSheet, FlatList, View, Share, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  useTheme,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { Icon as EvaIcon } from 'react-native-eva-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../src/theme-context';
import FastImage from 'react-native-fast-image';
import { deleteFavItem, updateFavList } from '../redux/actions/counter_action';

const Favourite = ({route, navigation}) => {
  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  const dispatch = useDispatch();
  const favList = useSelector(state => state.favList);

  const toggleFavList = (dramaId) => {
    if(dramaId) {
      dispatch(deleteFavItem(dramaId))
    }
  }
  return (
      <Layout style={{flex: 1}}>
        <TopNavigation
          alignment="center"
          accessoryLeft={() => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}
            style={{
              backgroundColor: theme['color-primary-100'],
              ...styles.tab_nav,
            }}>
            <EvaIcon width={20} height={20} name="menu-2-outline" fill={theme['color-primary-500']}/>
            <Text
              style={{
                color: theme['color-primary-500'],
              }}
              category="s1">
              Menu
            </Text>
          </TouchableOpacity>
          )}
          title={() => <Text category="h6">Favourites</Text>}
          accessoryRight={props => (
            <TopNavigationAction
              icon={props_ => <Icon {...props_} name="settings-outline" />}
              onPress={() => navigation.navigate('Settings')}
            />
          )}
          style={styles.titleContainer}
        />
        <FlatList
        data={favList}
        progressViewOffset={30}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{backgroundColor: themeContext.theme==='light' ? theme['color-basic-100'] : theme['color-basic-800']}}
        ListEmptyComponent={() => (
          <View
            style={{alignItems: 'center' }}>
              <Text category="h6">No favourite drama yet!</Text>
          </View>
        )}
      renderItem={({ item, index }) => (
        <TouchableNativeFeedback key={index.toString()} onPress={() => navigation.navigate('Details', item)}>
          <Layout style={{flexDirection: 'row', backgroundColor: themeContext.theme==='light' ? theme['color-basic-100'] : theme['color-basic-700'], marginHorizontal: 14, shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.23, shadowRadius: 2.84, elevation: 4, borderRadius: 10, marginVertical: 4, paddingVertical: 14, flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'space-evenly', alignItems: 'center'}}>
            <FastImage
              style={{
                borderRadius: 5,
                width: 80,
                height: 80,
                marginLeft: 12,
                marginRight: 4,
              }}
              source={{
                uri: item.dramaCover,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text category="s1" numberOfLines={1} style={{marginVertical: 4}}>
                {item.dramaTitle}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                  onPress={() => toggleFavList(item.dramaId)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginHorizontal: 10,
                    marginTop: 4,
                    borderWidth: 1,
                    borderColor: theme['color-primary-transparent-600'],
                    backgroundColor: themeContext.theme==='light' ? theme['background-basic-color-1'] : theme['color-basic-transparent-600'],
                    padding: 8,
                    paddingHorizontal: 12,
                    borderRadius: 50,
                  }}>
                  <EvaIcon
                    name="trash-2-outline"
                    width={15}
                    height={15}
                    fill={
                      themeContext.theme === 'light'
                        ? theme['color-primary-500']
                        : theme['color-basic-400']
                    }
                  />
                  <Text category="c1" style={{color: themeContext.theme==='light' ? theme['color-primary-500'] : theme['color-basic-400'], marginLeft: 4}}>
                    Remove from Favourite
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Share.share({
                      message: `Click to watch on N1 Channel ^_^
                      https://www.n1channel.org/drama/?id=${item.dramaId}`,
                    })}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: themeContext.theme==='light' ? theme['color-primary-100'] : theme['color-basic-transparent-600'],
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
                  <Text category="c1" style={{color: themeContext.theme==='light' ? theme['color-primary-500'] : theme['color-basic-400'], marginLeft: 4}}>
                    Share
                </Text>
                </TouchableOpacity>
                </View>
            </View>
          </Layout>
        </TouchableNativeFeedback>
      )}
      keyExtractor={item => item.dramaId}
    />
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
    paddingVertical: 6,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Favourite;
