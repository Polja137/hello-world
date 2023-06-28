import { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView, Platform} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ db, route, navigation, isConnected }) => {
  const { name, userID, color } = route.params;
  const [messages, setMessages] = useState([]);

 //customize chat bubble
 const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      right: {backgroundColor: "#000"},
      left: {backgroundColor: "#FFF"}
    }}
  />
}

  // Only render text iput toolbar when online
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {

      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        setMessages(newMessages);
      })
    }

    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  // Save messages to offline storage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("chat", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get messages from offline storage
  const loadCachedMessages = async () => {
    const cachedChat = await AsyncStorage.getItem("chat");
    cachedChat ? setMessages(JSON.parse(cachedChat)) : setMessages([]);
  };

  // Append new message to firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  return (
  <View style={[ styles.container, {backgroundColor: color} ]}>
   <GiftedChat
     messages={messages}
     renderBubble={renderBubble}
     renderInputToolbar={renderInputToolbar}
     onSend={messages => onSend(messages)}
     user={{
       _id: userID,
       name: name
     }}
   />
   {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
   {Platform.OS === "ios"?<KeyboardAvoidingView behavior="height" />: null}
   </View> 
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;

