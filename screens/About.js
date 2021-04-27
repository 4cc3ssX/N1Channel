import React from "react";
import { StyleSheet, View, Linking } from "react-native";
import {
  Layout,
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from "@ui-kitten/components";
import { ThemeContext } from "../src/theme-context";
import { Icon as EvaIcon } from 'react-native-eva-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const About = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const theme = useTheme();
  const openUrl = async (url, webUrl) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        await Linking.openURL(webUrl);
    }
  }
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavigation
        alignment="center"
        accessoryLeft={() => (
          <TopNavigationAction
            style={{
              padding: 8,
              borderRadius: 50,
              backgroundColor: theme["background-basic-color-2"],
            }}
            icon={(props) => <Icon {...props} name="arrow-ios-back" />}
            onPress={() => navigation.goBack()}
          />
        )}
        accessoryRight={() => (
            <TopNavigationAction
            icon={props_ => <Icon {...props_} name="search-outline" />}
            onPress={() => navigation.navigate('Search')}
          />
        )}
        title="About"
        style={styles.titleContainer}
      />
      <Layout style={{flex: 1}}>
      <View style={{marginHorizontal: 15}}>
        <Text
          category="p2"
          appearance="hint"
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            color:
              themeContext.theme == "light"
                ? theme["color-basic-600"]
                : theme["color-basic-100"],
          }}>
            Features
            </Text>
            <View style={{marginHorizontal: 4}}>
                <Text category="s1">{`\u2022`} Dark mode added</Text>
                <Text category="s1">{`\u2022`} Zawgyi, Unicode font conversion added</Text>
                <Text category="s1">{`\u2022`} In-app video player</Text>
                <Text category="s1">{`\u2022`} Favourite drama can be saved</Text>
            </View>
        </View>
        <View style={{marginHorizontal: 15}}>
        <Text
          category="p2"
          appearance="hint"
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            color:
              themeContext.theme == "light"
                ? theme["color-basic-600"]
                : theme["color-basic-100"],
          }}>
            Developer Note
            </Text>
            <View style={{marginHorizontal: 4}}>
                <Text category="s1" style={{marginBottom: 10, marginHorizontal: 4}}>Your feedback may help to improve app quality. Feel free to share feedback with us.</Text>
                <View style={{paddingHorizontal: 12, paddingVertical: 10, borderRadius: 15, backgroundColor: theme['color-primary-100']}}>
                    <Text category="s1" status="primary">You can request app new feature and bug report to below contact us list.</Text>
                </View>
            </View>
        </View>
        <View style={{marginHorizontal: 15}}>
        <Text
          category="p2"
          appearance="hint"
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            color:
              themeContext.theme == "light"
                ? theme["color-basic-600"]
                : theme["color-basic-100"],
          }}>
            Player Guide
            </Text>
            <View style={{marginHorizontal: 4}}>
                <Text category="s1">{`\u2022`} Double tap to play/pause. </Text>
                <Text category="s1">{`\u2022`} To download the video, click download icon and open with external downloader. </Text>
                <Text category="s1">{`\u2022`} When you locked the player, double tap to unlock back.</Text>
            </View>
        </View>
        <View style={{marginHorizontal: 15}}>
        <Text
          category="p2"
          appearance="hint"
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            color:
              themeContext.theme == "light"
                ? theme["color-basic-600"]
                : theme["color-basic-100"],
          }}>
            Contact Us
            </Text>
            <View style={{marginHorizontal: 4, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => openUrl("fb://page/115777733601033", "https://www.facebook.com/n1channel182019")}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, borderColor: theme['color-primary-400'], backgroundColor: theme['color-primary-100']}}>
                    <EvaIcon name="facebook-outline" style={{marginRight: 4}} width={18} height={18} fill={theme['color-primary-500']} />
                    <Text status="primary">N1Channel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openUrl("fb://page/107824730730320", "https://www.facebook.com/softintelligenceltd")}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, borderColor: theme['color-danger-400'], backgroundColor: theme['color-danger-100']}}>
                    <EvaIcon name="facebook-outline" style={{marginRight: 4}} width={18} height={18} fill={theme['color-danger-500']} />
                    <Text status="danger">SI Ltd</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openUrl("fb://profile/100053206101043", "https://www.facebook.com/ryam.47")}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, borderColor: theme['color-info-400'], backgroundColor: theme['color-info-100']}}>
                    <EvaIcon name="facebook-outline" style={{marginRight: 4}} width={18} height={18} fill={theme['color-info-500']} />
                    <Text status="info">ryam.47</Text>
                    </View>
                </TouchableOpacity>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 10, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
        <Text
          category="p2"
          appearance="hint"
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            color:
              themeContext.theme == "light"
                ? theme["color-basic-600"]
                : theme["color-basic-100"],
          }}>
            Version
            </Text>
            <Text
          category="p2"
          appearance="hint"
          style={{
            fontWeight: "bold",
            marginVertical: 10,
            color:
              themeContext.theme == "light"
                ? theme["color-basic-600"]
                : theme["color-basic-100"],
          }}>
            1.1
            </Text>
        </View>
      </Layout>
    </Layout>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});

export default About;
