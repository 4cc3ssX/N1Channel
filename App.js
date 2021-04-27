import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './redux/reducers/counter_reducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {ThemeContext} from './src/theme-context';
import {default as customTheme} from './theme.json';
import CoreStack from './stacks/CoreStack';
enableScreens();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const App = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  const scheme = useColorScheme();
  const [theme, setTheme] = React.useState(scheme);
  const themeContext = React.useContext(ThemeContext);
  const strictTheme = {['text-font-family']: 'SourceSansPro-Regular'};
  const customMapping = {strict: strictTheme};
  const Dark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      card: '#12092C',
    },
  };
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    AsyncStorage.setItem('ACTIVE_THEME', nextTheme).then(() => {
      setTheme(nextTheme);
    });
  };
  React.useEffect(() => {
    AsyncStorage.getItem('ACTIVE_THEME').then((value) => {
      if (value) {
        setTheme(value);
      }
    })
  }, [])
  return (
    <SafeAreaProvider>
      <StatusBar
        style={
          themeContext.theme === 'light' ? 'dark-content' : 'light-content'
        }
        animated={true}
      />
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeContext.Provider value={{theme, toggleTheme}}>
            <ApplicationProvider
              {...eva}
              theme={{...eva[theme], ...customTheme}}
              customMapping={customMapping}>
              <NavigationContainer
                theme={theme === 'light' ? DefaultTheme : Dark}>
                <CoreStack />
              </NavigationContainer>
            </ApplicationProvider>
          </ThemeContext.Provider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
