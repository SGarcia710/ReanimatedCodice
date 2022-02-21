import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export enum ToastType {
  Top,
  Bottom,
}

const Toast = ({
  type,
  showToast,
  message,
}: {
  showToast: boolean;
  message?: string;
  type?: ToastType;
}) => {
  const positionY = useSharedValue(type === ToastType.Top ? -100 : 100);

  if (showToast) {
    if (type === ToastType.Top) {
      positionY.value = 0;
    }
    if (type === ToastType.Bottom) {
      positionY.value = -16;
    }
  }

  if (!showToast) {
    if (type === ToastType.Top) {
      positionY.value = -100;
    }
    if (type === ToastType.Bottom) {
      positionY.value = 100;
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(positionY.value) }],
    };
  });
  return (
    <Animated.View
      style={[
        styles.commonToastStyle,
        type === ToastType.Top ? styles.topToastStyle : styles.bottomToastStyle,
        animatedStyle,
      ]}
    >
      <Text>{message}</Text>
    </Animated.View>
  );
};

const ToastNotificationScreen = () => {
  const [showTopToast, setShowTopToast] = React.useState(false);
  const [showBottomToast, setShowBottomToast] = React.useState(false);

  const onPressshowTopToast = (): void => {
    setShowTopToast(!showTopToast);
  };

  const onPressShowBottomToast = (): void => {
    setShowBottomToast(!showBottomToast);
  };

  const renderTopButtonLabel = (): string => {
    return showTopToast ? 'Ocultar Toast superior' : 'Mostrar Toast superior';
  };

  const renderBottomButtonLabel = (): string => {
    return showBottomToast
      ? 'Ocultar Toast inferior'
      : 'Mostrar Toast inferior';
  };

  return (
    <View style={styles.container}>
      <Toast showToast={showTopToast} type={ToastType.Top} message="Holap" />
      <Toast
        showToast={showBottomToast}
        type={ToastType.Bottom}
        message="Hey que tal"
      />

      <TouchableOpacity onPress={onPressshowTopToast}>
        <Text>{renderTopButtonLabel()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressShowBottomToast}>
        <Text>{renderBottomButtonLabel()}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToastNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 8,
  },
  commonToastStyle: {
    height: 72,
    borderRadius: 8,
    margin: 8,
    padding: 16,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 100,
  },
  topToastStyle: {
    backgroundColor: '#FCFCFC',
    top: 0,
  },
  bottomToastStyle: {
    backgroundColor: '#FFCCCB',
    bottom: 0,
  },
});
