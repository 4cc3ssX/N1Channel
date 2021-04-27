import React from 'react';
import {StyleSheet, Animated, TouchableOpacity, View, StatusBar, Linking} from 'react-native';
import IdleTimerManager from 'react-native-idle-timer';
import {
  Layout,
  Text,
  useTheme,
  Spinner,
  Modal,
} from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import Slider from "react-native-smooth-slider";
import Orientation from 'react-native-orientation-locker';
import { ThemeContext } from '../src/theme-context';

const Player = ({route, navigation}) => {
    const { dramaTitle, epTitle, epVidUrl } = route.params;
    const [isFullScreen, setFullScreen] = React.useState(false);
    const [isMuted, setMuted] = React.useState(false);
    const [VidProperty, setVidProperty] = React.useState({});
    const doubleTapRef = React.createRef();
    const [isLocked, setLocked] = React.useState(false);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const [isPaused, setPaused] = React.useState(false);
    const [isShowedControls, setShowedControls] = React.useState(false);
    const [controlTimeout, setControlTimeout] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);
    const player = React.useRef(null);
    const theme = useTheme();
    const controlsOpacity = React.useRef(new Animated.Value(0)).current;
    const themeContext = React.useContext(ThemeContext);

    const styles = StyleSheet.create({
        titleContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderBottomWidth: 1,
          borderBottomColor: theme['color-basic-transparent-600'],
          paddingHorizontal: 12,
          paddingVertical: 10,
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
        },
        track: {
            height: 2,
            backgroundColor: theme['color-primary-transparent-600'],
        },
        thumb: {
            width: 10,
            height: 10,
            backgroundColor: theme['color-primary-400'],
            borderRadius: 5,
            shadowColor: theme['color-primary-400'],
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 2,
            shadowOpacity: 1,
        }
      });
    const hideControlsAnimation = () => {
        Animated.timing(controlsOpacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: false,
        }).start(() => {
            setShowedControls(false);
        });
    }
    const showControlsAnimation = () => {
        Animated.timing(controlsOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
        }).start(() => {
            setShowedControls(true);
        });
    }
    const LockAnimation = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
        ]).start();
    }
    const toggleControls = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if ( !isLoading && !isLocked) {
                if (isShowedControls) {
                    clearTimeout(controlTimeout);
                    hideControlsAnimation();
                } else {
                    showControlsAnimation();
                }
            } else if (!isLoading && isLocked) {
                LockAnimation();
            }
        }
    }
    const PauseControls = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (!isLoading && !isLocked) {
                clearTimeout(controlTimeout);
                setPaused(!isPaused);
            } else if (!isLoading && isLocked) {
                setLocked(false);
            }
        }
    }
    const ReadyToPlay = (data) => {
        setVidProperty(data);
        setLoading(false);
        Orientation.getOrientation((ori) => {
            if (ori === "LANDSCAPE-LEFT" && !isFullScreen) {
                setFullScreen(true);
            }
        });
    }
    const backSkip = () => {
        player.current.seek(VidProperty.currentTime-10);
    }
    const forwardSkip = () => {
        player.current.seek(VidProperty.currentTime+10);
    }
    const duration = () => {
        const m = Math.floor(VidProperty.duration/60);
        const s = Math.floor(VidProperty.duration%60);
        return VidProperty?.duration ? `${m}:${s<10 ? "0"+s : s}` : 'N/A';
    }
    const ProgressHandler = (data) => {
        setVidProperty({...VidProperty, currentTime: data.currentTime});
    }
    const SeekHandler = (data) => {
        setVidProperty({...VidProperty, currentTime: data.currentTime});
    }
    const timeLeft = () => {
        const leftFor = VidProperty.duration-VidProperty.currentTime;
        const m = Math.floor(leftFor/60);
        const s = Math.floor(leftFor%60);
        return VidProperty?.duration ? `-${m}:${s<10 ? "0"+s : s}` : 'N/A';
    }
    const switchFullScreen = () => {
        if ( isFullScreen ) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscapeLeft();
        }
        setFullScreen(!isFullScreen);
    }
    const ChangeHandler = (s) => {
        player.current.seek(s);
    }
    const SlideHandler = (s) => {
        player.current.seek(s);
    }
    React.useEffect(() => {
        if(!isLoading && !isPaused) {
            showControlsAnimation();
            setControlTimeout(setTimeout(() => {
                hideControlsAnimation();
            }, 8000))
        }
    }, [isLoading]);
    React.useEffect(() => {
        if(isShowedControls && !isPaused) {
            showControlsAnimation();
            setControlTimeout(setTimeout(() => {
                hideControlsAnimation();
            }, 8000));
        } else {
            clearTimeout(controlTimeout);
        }
    }, [isShowedControls, isPaused, isMuted, isFullScreen])
    React.useEffect(() => {
        if (isShowedControls) {
            hideControlsAnimation();
        }
    }, [isLocked])
    React.useEffect(() => {
        IdleTimerManager.setIdleTimerDisabled(isPaused ? false : true);
    }, [isPaused])
    React.useEffect(() => {
        Orientation.getDeviceOrientation((deviceOri) => {
            if (deviceOri === "LANDSCAPE-LEFT") {
                Orientation.lockToLandscapeLeft();
                setFullScreen(true);
            } else if (deviceOri === "LANDSCAPE-RIGHT") {
                Orientation.lockToLandscapeRight();
                setFullScreen(true);
            } else {
                Orientation.lockToLandscapeLeft();
                setFullScreen(true);
            }
        })
        return () => {
            IdleTimerManager.setIdleTimerDisabled(false);
            Orientation.lockToPortrait();
            Orientation.unlockAllOrientations();
        }
    }, []);
    return (
        <Layout style={{flex: 1, backgroundColor: theme['color-basic-800'], justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar hidden={isFullScreen}/>
            <Animated.View style={[styles.titleContainer, {opacity: isLoading ? 1 : controlsOpacity, zIndex: 3}]}>
                <TouchableOpacity onPress={() => {
                    Orientation.lockToPortrait();
                    Orientation.unlockAllOrientations();
                    navigation.goBack();
                }} style={{padding: 8, marginHorizontal: 10, borderRadius: 50, backgroundColor: theme['color-basic-transparent-600']}}>
                    <Icon name="arrow-ios-back" width={24} height={24} fill={theme['color-basic-100']}/>
                </TouchableOpacity>
                <Text category="s1" style={{color: theme['color-basic-100'], marginLeft: 4, flexGrow: 2}}>{dramaTitle} - {epTitle}</Text>
            </Animated.View>
            <Video
                paused={isPaused}
                muted={isMuted}
                onSeek={data => SeekHandler(data)}
                onProgress={data => ProgressHandler(data)}
                source={{ uri: epVidUrl}}
                onLoad={property => ReadyToPlay(property)}
                ref={player}
                onEnd={() => setPaused(true)}
                resizeMode="contain"
                style={{alignSelf: 'stretch', flex: 1, backgroundColor: theme['color-basic-900']}}
            />
            <TapGestureHandler
                maxDelayMs={300}
                onHandlerStateChange={e => toggleControls(e)}
                waitFor={doubleTapRef}>
                <TapGestureHandler onHandlerStateChange={e => PauseControls(e)} ref={doubleTapRef} numberOfTaps={2}>
                <View style={{zIndex: 2, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}>
                <Animated.View style={{paddingHorizontal: 10, opacity: isLocked ? fadeAnim : 0.8, flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
                    { isLoading && <Spinner size="medium" />}
                    { !isLoading && !isShowedControls && isPaused && !isLocked && (
                        <TouchableOpacity onPress={() => setPaused(false)}>
                            <Icon width={72} height={72} name="arrow-right" fill={theme['color-primary-100']}/>
                        </TouchableOpacity>
                    )
                    }
                    { isLocked && (
                        <View style={{marginVertical: 10, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 30, borderColor: theme['color-primary-300'], backgroundColor: theme['color-primary-transparent-600']}}>
                            <Icon width={32} height={32} name="lock-outline" fill={theme['color-primary-100']}/>
                        </View>
                    )}
                </Animated.View>
                </View>
                </TapGestureHandler>
            </TapGestureHandler>
            <Animated.View style={{flexDirection: 'column', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.45)', zIndex: 3, opacity: controlsOpacity, backgroundColor: 'rgba(0, 0, 0, 0.3)', paddingTop: 10, paddingBottom: 6, borderRadius: 30, position: 'absolute', left: 10, right: 10, bottom: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Layout style={{flexDirection: 'row', paddingHorizontal: 12, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text category="label" style={{color: theme['color-basic-100'], paddingHorizontal: 4}} appearance="hint">{duration()}</Text>
                    <Slider
                        value={VidProperty.currentTime}
                        maximumValue={VidProperty.duration}
                        trackStyle={styles.track}
                        style={{flexGrow: 2, marginHorizontal: 10}}
                        thumbStyle={styles.thumb}
                        onValueChange={s => ChangeHandler(s)}
                        onSlidingComplete={s => SlideHandler(s)}
                        thumbTouchSize={{width: 10, height: 10}}
                        thumbTintColor={theme['color-primary-400']}
                        minimumTrackTintColor={theme['color-primary-400']}
                        maximumTrackTintColor={theme['color-primary-transparent-600']}
                    />
                    <Text category="label" style={{color: theme['color-basic-100'], paddingHorizontal: 4}} appearance="hint">{timeLeft()}</Text>
                </Layout>
            <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'stretch', justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => switchFullScreen()} style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon width={22} height={22} name={ isFullScreen ? "collapse-outline" : "expand-outline"} fill={theme['color-primary-100']}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLocked(true)} style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon width={22} height={22} name="lock-outline" fill={theme['color-primary-100']}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => backSkip()} style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon width={24} height={24} name="chevron-left-outline" fill={theme['color-primary-100']}/>
                    <Text category="s2" style={{color: theme['color-basic-100']}} appearance="hint">10</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPaused(!isPaused)} style={{marginVertical: 10}}>
                    <Icon width={58} height={58} name={isPaused ? "arrow-right" : "pause-circle"} fill={theme['color-primary-100']}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => forwardSkip()} style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text category="s2" style={{color: theme['color-basic-100']}} appearance="hint">10</Text>
                    <Icon width={24} height={24} name="chevron-right-outline" fill={theme['color-primary-100']}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(epVidUrl)}>
                    <Icon width={24} height={24} name="download-outline" fill={theme['color-primary-100']}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMuted(!isMuted)}>
                    <Icon width={22} height={22} name={!isMuted ? "volume-off-outline" : "volume-down-outline"} fill={theme['color-primary-100']}/>
                </TouchableOpacity>
            </Layout>
            </Animated.View>
        </Layout>
    );
};

export default Player;
