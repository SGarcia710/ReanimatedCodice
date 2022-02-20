import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const TikTokDiskScreen = () => {
  const rotate = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${rotate.value}deg`,
      },
    ],
  }));

  React.useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          animatedStyles,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Image
          source={{
            uri: 'https://res.cloudinary.com/sgarciacloud/image/upload/v1614217280/disc_knxnbm.png',
          }}
          style={[
            {
              width: 80,
              height: 80,
            },
          ]}
        />

        <Text
          style={{
            fontSize: 30,
            position: 'absolute',
          }}
        >
          🔥
        </Text>
      </Animated.View>
    </View>
  );
};

export default TikTokDiskScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
