import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: name });
}, []);

  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <Text style={color !== "white" ? [{ color: "white" }, styles.title] : styles.title}>
        Welcome back {name} !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default Chat;