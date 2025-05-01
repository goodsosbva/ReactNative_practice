import {RouteProp, useRoute} from "@react-navigation/core";
import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet, FlatList} from 'react-native'
import {RootStackParamList} from "./tpyes.ts";
import {useQuery} from "react-query";
import {getArticle} from "../api/articles.ts";
import {getComments} from "../api/comments.ts";
import ArticleView from "../components/ArticleView.tsx";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import CommentItem from "../components/CommentItem.tsx";

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticlesScreen() {
    const {params} = useRoute<ArticleScreenRouteProp>();
    const {id} = params;

    const articleQuery = useQuery(['article', id], () => getArticle(id));
    const commentsQuery = useQuery(['comments', id], () => getComments(id));

    const {bottom} = useSafeAreaInsets();

    if (!articleQuery.data || !commentsQuery.data) {
        return (
            <ActivityIndicator size="large" style={styles.spinner} color="black" />
        )
    }

    const {title, body, published_at, user} = articleQuery.data;

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={[styles.flatListContent, {paddingBottom: bottom}]}
            data={commentsQuery.data}
            renderItem={({item}) => (
                <CommentItem
                    id={item.id}
                    message={item.message}
                    publishedAt={item.published_at}
                    username={item.user.username}
                />
            )}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={
                <ArticleView
                    title={title}
                    body={body}
                    publishedAt={published_at}
                    username={user.username}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
    },
    flatList: {
        backgroundColor: 'white',
        flex: 1,
    },
    flatListContent: {
        paddingHorizontal: 12,
    },
});

export default ArticlesScreen;
