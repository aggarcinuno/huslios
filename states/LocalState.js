import { useEffect, useState } from "react";
import { useBetween } from "use-between";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "./AuthContext";


const localState = () => {
    const [img, setImg] = useState(null);
    const [caption, setCaption] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [didRest, setDidRest] = useState(false);

    const [postArray] = useState([]);
    const [userData, setUserData] = useState(null);
    const [hasPostedTracker, setHasPostedTracker] = useState(false);
    return {
        img, 
        setImg,
        caption,
        setCaption,
        postArray,
        userData,
        setUserData,
        hasPostedTracker,
        setHasPostedTracker,
        elapsedTime,
        setElapsedTime,
        didRest,
        setDidRest
    }
};

const sharedLocalState = () => useBetween(localState);



export {sharedLocalState};