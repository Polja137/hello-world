import { TouchableOpacity, Text, View, StyleSheet, Alert, } from "react-native"
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
  
    //access actionSheet modules
    const actionSheet = useActionSheet();

    // on press function that will get the options for the user to send photo,send location, or choose a photo.
    const onActionPress = () => {
        const options = ['Choose From Library', 'Take a Photo', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;

        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                        return;
                    default:
                }
            },
        );
    };

    //ask permission to choose a photo from the users library and upload it to the chat
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
          let result = await ImagePicker.launchImageLibraryAsync();
          if (!result.canceled) {
            const imageURI = result.assets[0].uri;
            const uniqueRefString = generateReference(imageURI);
            const response = await fetch(imageURI);
            const blob = await response.blob();
            const newUploadRef = ref(storage, uniqueRefString);
            uploadBytes(newUploadRef, blob).then(async (snapshot) => {
              console.log('File has been uploaded successfully');
              const imageURL = await getDownloadURL(snapshot.ref)
              onSend({ image: imageURL })
            }) 
          }
          else Alert.alert("Permissions haven't been granted.");
        }
      }

    //ask permission to take a photo and upload it to the chat
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }

    //get the location of the user and upload it to the chat.
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
    }

    //generate a reference to upload multiple photos 
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
    }

    // upload the photo as a blob with a new ref and use uploadbytes to push the image to firebase.
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend({ image: imageURL })
        });
    }


    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>
                    +
                </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },

    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },

    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center'
    }
})

export default CustomActions