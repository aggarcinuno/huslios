import React, {useState} from 'react';
import { Card, CommentText, Container, PostImg, PostText, PostTime, UserImg, UserInfo, UserInfoText, UserName, PostOptionsComp } from '../screens/user/feed/FeedStyles';
import moment from 'moment/moment';
import { View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { transform } from '@babel/core';
import PostOptions from './PostOptions';
import PostOptionsModal from '../screens/post/PostOptionsModal';
import { useNavigationState } from '@react-navigation/native';

//<Ionicons name={'chatbox'} color={'white'} size={35} style={[styles.chatbox, {transform: [{scaleX: 1}]}]}/>
//<CommentText>Add a comment...</CommentText>
const PostCard = ({item, navigation}) => {

    const [optionsPressed, setOptionsPressed] = useState(false);

    const renderOptions = () => {
        return <PostOptionsModal></PostOptionsModal>
    }

    return(
        <Card>
            <View style={{justifyContent: 'center'}}>
            {optionsPressed == true ? <PostOptionsModal/> : null}
            </View>
            
            <UserInfo>
                <UserImg source={{uri:item.userImg}} />
                <UserInfoText>
                    <UserName>
                        {item.userName}
                    </UserName>
                    <PostTime>
                        {moment(item.postTime.toDate()).fromNow()}
                    </PostTime>
                    
                    
                </UserInfoText>
            </UserInfo>
            <PostOptionsComp>
                        <PostOptions onPress={null}/>
            </PostOptionsComp>
            <View style={{elevation: 4, borderRadius: 10}}>
                <PostImg source={{uri:item.postImg}}/>
            </View>
            
            <PostText>{item.postText}</PostText>
            
        </Card>
    )
};

export default PostCard;

const styles = StyleSheet.create({
   chatbox: {
    position: 'absolute',
    bottom: 10,
    right: 12
   }
})