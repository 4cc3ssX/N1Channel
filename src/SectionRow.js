import React from 'react';
import {Layout, Text, Icon, useTheme, Toggle} from '@ui-kitten/components';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const SectionRow = ({icon_bg_color, onPress, icon, children}) => {
  const theme = useTheme();
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Layout style={styles.container}>
        <Layout
          style={{
            backgroundColor: icon_bg_color,
            ...styles.content_style,
          }}>
          <Icon
            name={icon}
            {...{
              style: {
                height: 24,
                tintColor: theme['color-basic-100'],
                width: 24,
              },
            }}
          />
        </Layout>
        <Text category="s1" style={styles.children_style}>
          {children}
        </Text>
      </Layout>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 2,
  },
  children_style: {
    flexGrow: 2,
    marginHorizontal: 10,
  },
  content_style: {
    padding: 10,
    borderRadius: 100,
  },
});

export default SectionRow;
