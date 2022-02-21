import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  AnimatedStyleProp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const BATTERY_WIDTH = width / 2;
const BATTERY_HEIGHT = BATTERY_WIDTH / 2;
const BATTERY_PEAK_HEIGHT = BATTERY_WIDTH / 4;
const BAR_ANIMATION_DURATION = 500;

interface BateryAnimationScreenProps {}

export interface BatteryBarProps {
  customStyle: StyleProp<ViewStyle>;
  animatedStyle: AnimatedStyleProp<ViewStyle>;
}

const BatteryBar = ({
  customStyle,
  animatedStyle,
}: BatteryBarProps): JSX.Element => (
  <Animated.View
    style={[styles.batteryBaseStyle, customStyle, animatedStyle]}
  />
);

const BateryAnimationScreen = (props: BateryAnimationScreenProps) => {
  const firstBarOpacity = useSharedValue(0);
  const secondBarOpacity = useSharedValue(0);
  const thirdBarOpacity = useSharedValue(0);
  const fourthBarOpacity = useSharedValue(0);

  React.useEffect(() => {
    const animateValues = () => {
      firstBarOpacity.value = withTiming(1, {
        duration: BAR_ANIMATION_DURATION,
      });
      secondBarOpacity.value = withDelay(
        BAR_ANIMATION_DURATION,
        withTiming(1, {
          duration: BAR_ANIMATION_DURATION,
        })
      );
      thirdBarOpacity.value = withDelay(
        BAR_ANIMATION_DURATION * 2,
        withTiming(1, {
          duration: BAR_ANIMATION_DURATION,
        })
      );
      fourthBarOpacity.value = withDelay(
        BAR_ANIMATION_DURATION * 3,
        withTiming(1, {
          duration: BAR_ANIMATION_DURATION,
        })
      );
    };
    animateValues();
    const interval = setInterval(() => {
      firstBarOpacity.value = 0;
      secondBarOpacity.value = 0;
      thirdBarOpacity.value = 0;
      fourthBarOpacity.value = 0;
      animateValues();
    }, BAR_ANIMATION_DURATION * 4);
    return () => clearInterval(interval);
  }, []);

  const animatedStyleFirstBar = useAnimatedStyle(() => ({
    opacity: firstBarOpacity.value,
  }));

  const animatedStyleSecondBar = useAnimatedStyle(() => ({
    opacity: secondBarOpacity.value,
  }));

  const animatedStyleThirdBar = useAnimatedStyle(() => ({
    opacity: thirdBarOpacity.value,
  }));

  const animatedStyleFourthBar = useAnimatedStyle(() => ({
    opacity: fourthBarOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.batteryContainer}>
        <View style={styles.batteryMainContainerStyle}>
          <View style={styles.batteryMainStyle}>
            <BatteryBar
              customStyle={styles.firstBatteryBarStyle}
              animatedStyle={animatedStyleFirstBar}
            />
            <BatteryBar
              customStyle={styles.middleBatteryBarStyle}
              animatedStyle={animatedStyleSecondBar}
            />
            <BatteryBar
              customStyle={styles.middleBatteryBarStyle}
              animatedStyle={animatedStyleThirdBar}
            />
            <BatteryBar
              customStyle={styles.lastBatteryBarStyle}
              animatedStyle={animatedStyleFourthBar}
            />
          </View>
        </View>
        <View style={styles.batteryPeakStyle} />
      </View>
    </View>
  );
};

export default BateryAnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryContainer: {
    flexDirection: 'row',
    height: BATTERY_HEIGHT,
    width: BATTERY_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryMainContainerStyle: {
    flex: 10,
    borderWidth: 8,
    borderRadius: 10,
    borderColor: '#CCC',
  },
  batteryMainStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  batteryPeakStyle: {
    flex: 1,
    backgroundColor: '#CCC',
    height: BATTERY_PEAK_HEIGHT,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  firstBatteryBarStyle: {
    marginStart: 8,
    marginTop: 8,
    marginBottom: 8,
    marginEnd: 4,
  },
  middleBatteryBarStyle: {
    marginStart: 4,
    marginTop: 8,
    marginBottom: 8,
    marginEnd: 4,
  },
  lastBatteryBarStyle: {
    marginStart: 4,
    marginTop: 8,
    marginBottom: 8,
    marginEnd: 8,
  },

  batteryBaseStyle: {
    backgroundColor: 'green',
    flex: 1,
    borderRadius: 4,
  },
});
