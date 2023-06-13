import React, { useEffect } from "react";
import { Alert,LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getFirestore,disableNetwork,enableNetwork} from "firebase/firestore";
//import "react-native-gesture-handler";
import { initializeApp } from "firebase/app";
import Start from "./components/Start";
import Chat from "./components/Chat";

// Create navigation stack
const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBfokOFLJu5RfaIMFXss0kGUo6oW0FNwvU",
  authDomain: "chat-app-888e.firebaseapp.com",
  projectId: "chat-app-888e",
  storageBucket: "chat-app-888e.appspot.com",
  messagingSenderId: "87374128361",
  appId: "1:87374128361:web:48353e1e740959f11afc78",
  measurementId: "G-GFVDZBYTWN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }} // Hide header
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;