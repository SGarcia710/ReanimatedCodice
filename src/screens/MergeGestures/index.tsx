import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const IMAGE_SIZE = {
  w: 200,
  h: 170,
};

const MergeGesturesScreen = () => {
  const scale = useSharedValue(1);
  const translation = useSharedValue([0, 0]);

  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      translation: number[];
    }
  >({
    onStart: (_, context) => {
      context.translation = translation.value;
    },
    onActive: (event, context) => {
      const translateX = event.translationX + context.translation[0];
      const translateY = event.translationY + context.translation[1];
      translation.value = [translateX, translateY];
    },
  });

  const onPinchGestureEvent = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    { scale: number }
  >({
    onStart: (_, context) => {
      context.scale = scale.value;
    },
    onActive: (event, context) => {
      scale.value = context.scale * event.scale;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const toScale = (v: number) => v / scale.value;
    return {
      transform: [
        { scale: scale.value },
        { translateX: toScale(translation.value[0]) },
        { translateY: toScale(translation.value[1]) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Animated.View
          style={[
            {
              width: IMAGE_SIZE.w,
              height: IMAGE_SIZE.h,
            },
            animatedStyles,
          ]}
        >
          <PanGestureHandler onGestureEvent={onPanGestureEvent}>
            <Animated.Image
              source={require('@assets/images/Avatar.png')}
              style={[
                {
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                },
              ]}
            />
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

export default MergeGesturesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
