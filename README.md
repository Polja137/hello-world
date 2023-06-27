# React Native Chat App built using Expo development platform and Google Firebase and Firestore
------------------------------------------------------------------------------------------------
# Tools and Platforms 

- React Native - front end framework for mobile development 
- Expo - native app development platform
- Android Studio - mobile development environemnt with Emulator
- Google Firebase - non-relational database for storing messages and locations. 
- Google Firestore - storage solution for media based chat messages. 


# User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

# Key Features: 

- A screen where users can enter their name and choose a background color for the chat screen before joining the chat .
- A screen displaying the conversation, as well as an input field and submit button.
- The app leverages firebase's anonymous sign in feature to generate and record user ID/ message authors.
- Utilizes React Navigation to switch between two views, Start screen and a Chat screen.
- Data gets stored online and offline .

# Development environment:

-   npm install expo-cli -g to install the Expo CLI.
-   expo login.
-   npm install.
-   install the Expo Go App on your mobile device.
-   create your test environment with Android Emulator or iOS Simulator.
-   start project with npm expo start or expo start in the terminal.

# Dependencies:

    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "expo": "~48.0.6",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.13.0",
    "react": "18.2.0",
    "react-native": "0.71.4",
    "react-native-gifted-chat": "^2.0.1",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "react-native-svg": "13.4.0",
    "@react-native-async-storage/async-storage": "1.17.11",
    "@react-native-community/netinfo": "9.3.7",
    "expo-speech": "~11.1.1",
    "expo-image-picker": "~14.1.1",
    "expo-location": "~15.1.1",
    "react-native-maps": "1.3.2",
    "expo-av": "~13.2.1"

 
 
