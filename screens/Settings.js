import React from "react";
import { StyleSheet, Dimensions, BackHandler } from "react-native";
import {
  Layout,
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from "@ui-kitten/components";
import { ThemeContext } from "../src/theme-context";
import SwitchRow from "../src/SwitchRow";
import NavigateRow from "../src/NavigateRow";
import SectionRow from "../src/SectionRow";

const Settings = ({ navigation }) => {
  const themeContext = React.useContext(ThemeContext);
  const [checked, setChecked] = React.useState(
    themeContext.theme === "light" ? false : true
  );
  const theme = useTheme();
  const onCheckedChange = () => {
    setChecked(!checked);
    themeContext.toggleTheme();
  };
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
        title="Settings"
        style={styles.titleContainer}
      />
      <Layout>
        <Text
          category="p2"
          appearance="hint"
          style={{
            fontWeight: "bold",
            marginHorizontal: 10,
            marginVertical: 10,
            color:
              themeContext.theme == "light"
                ? theme["color-basic-600"]
                : theme["color-basic-100"],
          }}
        >
          Preference
        </Text>
        <SwitchRow
          icon="moon"
          icon_bg_color={
            theme[
              themeContext.theme === "light"
                ? "color-basic-700"
                : "color-basic-500"
            ]
          }
          checked={checked}
          onPress={() => onCheckedChange()}
        >
          Dark Mode
        </SwitchRow>
        <NavigateRow
          icon="info"
          icon_bg_color={theme["color-info-300"]}
          icon_color={theme["color-basic-100"]}
          onPress={() => navigation.navigate('About')}
        >
          About
        </NavigateRow>
        <SectionRow
          icon="log-out-outline"
          icon_bg_color={theme["color-danger-500"]}
          onPress={() => BackHandler.exitApp()}
        >
          Exit
        </SectionRow>
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

export default Settings;
