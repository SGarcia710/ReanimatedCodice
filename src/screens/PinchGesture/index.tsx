import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const PinchGestureScreen = () => {
  const scale = useSharedValue(1);

  const onPinchGestureEvent = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    { scale: number }
  >({
    onStart: (_, context) => {
      context.scale = scale.value;
    },
    onActive: (event, context) => {
      scale.value = event.scale * context.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Animated.Image
          source={require('@assets/images/Avatar.png')}
          style={[
            {
              width: '100%',
              height: 400,
              resizeMode: 'contain',
            },
            animatedStyles,
          ]}
        />
      </PinchGestureHandler>
    </View>
  );
};

export default PinchGestureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
