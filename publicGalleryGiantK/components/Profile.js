import React, {useEffect} from "react";
import {useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image, RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {getUser} from "../lib/users";
import Avatar from "./Avatar";
import PostGriditem from "./PostGriditem";
import usePosts from "../hooks/usePosts";
import {useUserContext} from "../contexts/UserContext";
import events from '../lib/events';

function Profile({userId}) {
    const [user, setUser] = useState(null);
    const {posts, noMorePost, refreshing, onLoadMore, onRefresh} = usePosts(userId);

    const {user: me} = useUserContext();
    const isMyProfile = me.id === userId;

    useEffect(() => {
        getUser(userId).then(setUser);
    }, [userId]);

    if (!user || !posts) {
        return (
            <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
        );
    }

    return (
        <FlatList
            style={styles.block}
            data={posts}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <View style={styles.userInfo}>
                    <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
                    <Text style={styles.username}>{user.displayName}</Text>
                </View>
            }
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.25}
            ListFooterComponent={
                !noMorePost && (
                    <ActivityIndicator
                        style={styles.bottomSpinner}
                        size={32}
                        color="#6200ee"
                    />
                )
            }
            refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
        />
    )
}

const renderItem = ({item}) => <PostGriditem post={item} />

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
    },
    block: {
        flex: 1,
    },
    userInfo: {
        paddingTop: 80,
        paddingBottom: 64,
        alignItems: 'center',
    },
    username: {
        marginTop: 8,
        fontSize: 24,
        color: '#424242',
    },
    bottomSpinner: {
        height: 128,
    }
})

export default Profile;
