import React, {useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import {Container} from './FeedStyles';
import PostCard from '../../../components/PostCard';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedScreen = ({navigation}) => {

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

   
    
   useEffect(() => {
    fetchPosts();
   }, []);

  
   
   const fetchPosts = async() => {
        try {
            const list = [];
            await firestore()
            .collection('posts').orderBy("postTime", "desc")
            .get()
            .then((querySnapshot) => {
                console.log('Total Posts: ', querySnapshot.size);
                querySnapshot.forEach(doc => {
                    const {userId, postImg, postTime, caption, userImg, username} = doc.data();
                    list.push({
                        id: doc.id,
                        userId,
                        userName: username,
                        postTime,
                        postText: caption,
                        postImg,
                        userImg
                    });
                })
           
            }) 
            setPosts(list);
            if(loading) {
                setLoading(false);
            }
            
        } catch (e) {
            console.log(e);
        }
    
    }

    return (
        
        <Container>
            <View style={{height: 44, opacity: .5}}>

            </View>
            <FlatList
                data={posts}
                renderItem={({item}) => <PostCard item={item} navigation={navigation}/>}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
                }
                />
        </Container>
        
     );
};

export default FeedScreen;