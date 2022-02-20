import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const COLORS = [
  '#63cdda',
  '#778beb',
  '#786fa6',
  '#cf6a87',
  '#ea8685',
  '#f3a683',
  '#f8a5c2',
  '#f7d794',
];

const ColorInterpolationScreen = () => {
  const scrollX = useSharedValue(0);

  // bug version de react native
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {},
    onBeginDrag: (e) => {},
    onEndDrag: (e) => {},
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: 'red',
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyles]} />

      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        {COLORS.map((color, index) => {
          return (
            <View
              key={index}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                justifyContent: 'center',
              }}
            >
              <Text>{color}</Text>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default ColorInterpolationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
