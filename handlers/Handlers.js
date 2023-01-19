import { useBetween } from "use-between";
import { sharedLocalState } from '../screens/post/PostState';
import ImagePicker from 'react-native-image-crop-picker';
import { useState } from "react";

const chooseProfilePicture = async () => {
    const [profilePicture, setProfilePicture] = useState(null);
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    }).then(image => {setProfilePicture(image.path)})
    return profilePicture
}

export default chooseProfilePicture;