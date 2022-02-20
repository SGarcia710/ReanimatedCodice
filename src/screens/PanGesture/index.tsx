import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const PanGestureScreen = () => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      posX: number;
      posY: number;
    }
  >({
    onStart: (_, context) => {
      context.posX = posX.value;
      context.posY = posY.value;
    },
    onActive: (event, context) => {
      posX.value = event.translationX + context.posX;
      posY.value = event.translationY + context.posY;
    },
    onEnd: () => {
      posX.value = withTiming(0);
      posY.value = withTiming(0);
    },
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: posX.value,
      },
      {
        translateY: posY.value,
      },
    ],
  }));
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View style={animatedStyles}>
          <Text
            style={{
              fontSize: 32,
            }}
          >
            🐤
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default PanGestureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
