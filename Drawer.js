import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Icon, Drawer, IndexPath, Text, DrawerItem, useTheme} from '@ui-kitten/components';
import Home from './screens/Home';
import Search from './screens/Search';
import Favourite from './screens/Favourite';
import { Icon as EvaIcon } from 'react-native-eva-icons';
import {ThemeContext} from './src/theme-context';
import { Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

const { Navigator, Screen } = createDrawerNavigator();

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);
const DrawerContent = ({ navigation, state }) => {
  const theme = useTheme();
  const themeContext = React.useContext(ThemeContext);
  const [checked, setChecked] = React.useState(
    themeContext.theme === 'light' ? false : true,
  );
  const onCheckedChange = () => {
    setChecked(!checked);
    themeContext.toggleTheme();
  };
  const styles = StyleSheet.create({
    header: {
      height: 128,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });
  return (
    <Drawer
    selectedIndex={new IndexPath(state.index)}
    header={(props) => (
      <View style={[props.style, styles.header]}>
        <Image
          style={{height: 75, width: 75, marginHorizontal: 10, borderRadius: 50}}
          source={require('./assets/logo.png')}
        />
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text category="h4">N1 Channel</Text>
          <TouchableOpacity onPress={() => Linking.openURL("https://n1channel.org")}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text category="s1" style={{marginHorizontal: 3}}>n1channel.org</Text>
                <EvaIcon name="external-link-outline" fill={ themeContext.theme==='light' ? theme['color-primary-500'] : theme['color-basic-100']} width={12} height={12}/>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    )}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title='Home' accessoryRight={ForwardIcon}/>
    <DrawerItem title='Search' accessoryRight={ForwardIcon}/>
    <DrawerItem title='Favourites' accessoryRight={ForwardIcon}/>
  </Drawer>
)}

const DrawerS = () => {
  return (
    <Navigator
      drawerType="slide"
      overlayColor="transparent"
      initialRouteName="Home"
      backBehavior="initialRoute" drawerContent={props => <DrawerContent {...props}/>}>
      <Screen
        name="Home"
        component={Home}
      />
      <Screen
        name="Search"
        component={Search}
      />
      <Screen
        name="Favourites"
        component={Favourite}
      />
    </Navigator>
  );
};


export default DrawerS;
