import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { COLORS } from "../../theme/colors";

const PressableAnitamed = Animated.createAnimatedComponent(Pressable);

const IconButton = ({ icon, onPress }) => {
  const backgroundColor = useSharedValue(COLORS.gray300);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    transform: [{ scale: scale.value }],
  }));

  async function onPressIn() {
    scale.value = withSpring(1.2);
    backgroundColor.value = withTiming("#4CAF50", { duration: 150 });
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  function onPressOut() {
    scale.value = withSpring(1);
    backgroundColor.value = withDelay(150, withTiming(COLORS.gray300));
    onPress();
  }

  return (
    <PressableAnitamed onPressIn={onPressIn} onPressOut={onPressOut} style={[styles.button, animatedStyle]}>
      <Ionicons name={icon} size={36} color={COLORS.white200} />
    </PressableAnitamed >
  );
};

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    marginBottom: 20,
  },
})

export default IconButton;
