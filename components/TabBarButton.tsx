import { Pressable, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/constants/Icons"; // Mengimpor objek ikon
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: string;
  label: string;
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 50 }
    );
  }, [opacity, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacityValue = interpolate(opacity.value, [0, 1], [1, 0]);

    return {
      opacity: opacityValue,
    };
  });

  // Cek apakah icon[routeName] valid sebelum digunakan
  const IconComponent = icon[routeName];

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}
    >
      {IconComponent ? (
        // Jika IconComponent valid, panggil
        <IconComponent
          color={isFocused ? Colors.tabIconSelected : Colors.tabIconDefault}
          focused={isFocused}
        />
      ) : (
        <></>
      )}

      <Animated.Text
        style={[
          {
            color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        <Text>{label}</Text>
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
