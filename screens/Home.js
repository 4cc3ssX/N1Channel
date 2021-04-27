import React from 'react';
import {StyleSheet, Dimensions, FlatList, View, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  useTheme,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { Icon as EvaIcon } from 'react-native-eva-icons';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

export const VirtualizedView = ({children}) => {
  return (
    <FlatList
      data={[]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{children}</React.Fragment>
      )}
    />
  );
}

export const DramaFlatList = ({dramaList}) => {
      const theme = useTheme();
      const navigation = useNavigation();
      
      return (
        <FlatList
          data={dramaList}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          listKey={(item) => item.drama_id.toString()}
          contentContainerStyle={styles.dramaList}
          ListEmptyComponent={() => (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No drama available.</Text>
            </View>
          )}
          renderItem={({item, index}) => (
            <TouchableNativeFeedback style={{borderRadius: 15}} key={index.toString()} onPress={() => navigation.navigate('Details', {dramaId: item.drama_id, dramaTitle: item.drama_title, dramaCover: item.drama_cover})}>
            <Layout style={styles.dramaListChild}>
              <FastImage
                style={{alignSelf: 'stretch', flex:1, borderRadius: 15}}
                source={{
                  uri: item.drama_cover,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{paddingHorizontal: 10, position: 'absolute', top: 0, left: 0, right: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderRadius: 2, backgroundColor: theme["color-primary-transparent-500"], paddingVertical: 5, alignItems: 'center'}}>
                <Text category='s1' numberOfLines={1} style={{color: theme['color-primary-100'], fontWeight: '600'}}>{item.drama_title}</Text>
              </View>
              <View style={{paddingHorizontal: 10, position: 'absolute', top: 50, bottom: 50, left: 0, right: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderRadius: 2, paddingVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
                <EvaIcon width={45} height={45} name="arrow-right" fill={theme['color-primary-100']}/>
              </View>
              <View style={{paddingHorizontal: 10, justifyContent: 'space-around', flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderRadius: 2, backgroundColor: theme["color-primary-transparent-400"], paddingVertical: 7}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text category='s1' numberOfLines={1} style={{color: theme['color-primary-100'], paddingEnd: 5, fontWeight: '600'}}>{item.rating}</Text>
                <EvaIcon width={15} height={15} name="star-outline" fill={theme['color-primary-100']}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text category='s1' numberOfLines={1} style={{color: theme['color-primary-100'], paddingEnd: 5, fontWeight: '600'}}>{item.duration_min}</Text>
                <EvaIcon width={15} height={15} name="clock-outline" fill={theme['color-primary-100']}/>
                </View>
              </View>
              </Layout>
            </TouchableNativeFeedback>
          )}
          keyExtractor={item => item.drama_id}
        />
  )
}

const Home = ({route, navigation}) => {
  const theme = useTheme();
  const recentDramaList = useSelector(state => state.recentDramaList);
  const dramaList = useSelector(state => state.dramaList);
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
        title={() => <Text category="h6">Home</Text>}
        accessoryRight={props => (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TopNavigationAction
            icon={props_ => <Icon {...props_} name="search-outline" />}
            onPress={() => navigation.navigate('Search')}
          />
          <TopNavigationAction
            icon={props_ => <Icon {...props_} name="settings-outline" />}
            onPress={() => navigation.navigate('Settings')}
          />
          </View>
        )}
        style={styles.titleContainer}
      />
      <Layout style={styles.container}>
        <VirtualizedView>
          <Text category="h4">Recent</Text>
          <DramaFlatList dramaList={recentDramaList} />
        </VirtualizedView>
        </Layout>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
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
  dramaListChild: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.38,
    shadowRadius: 4.84,  
    elevation: 5,
    alignItems: 'center',
    marginVertical: 8,
    width: 210,
    height: 210,
    marginHorizontal: 8,
    borderRadius: 15,
  },
  dramaList: {
    paddingVertical: 5,
  },
});

export default Home;
