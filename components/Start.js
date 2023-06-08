import { useState } from "react";
import {StyleSheet,Text,TextInput,TouchableOpacity,View,ImageBackground} from "react-native";

const Start = ({ navigation }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");

  return (
    <ImageBackground
      source={require("../assets/Background_Image.png")}
      resizeMode='cover'
      style={styles.backgroundImage}>
        
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Chat App!</Text>
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder='Your name'
            style={styles.input}
            onChangeText={setText}/>

          <Text>Choose Background Color</Text>

          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#ff5e5e" }]}
              onPress={() => setColor("#ff5e5e")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#69cfff" }]}
              onPress={() => setColor("#69cfff")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#54ffd4" }]}
              onPress={() => setColor("#54ffd4")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#fff869" }]}
              onPress={() => setColor("#fff869")}
            ></TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}//Go-to-chat button
            onPress={() =>
              navigation.navigate("Chat", {
                name: text ? text : "User",
                color: color ? color : "white",
              })
            }>
            <Text>Go to Chat</Text>
          </TouchableOpacity>

        </View>
      </View>
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",

  },
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  radioButton: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  input: {
    height: 40,
    width: "88%",
    margin: 12,
    borderWidth: 3,
    borderColor: "white",
    padding: 10,
    color: "white"
  },
});

export default Start;