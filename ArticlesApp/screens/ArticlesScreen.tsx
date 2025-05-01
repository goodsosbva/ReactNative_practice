import {RouteProp, useRoute} from "@react-navigation/core";
import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native'
import {useQuery} from "react-query";
import {getArticles} from "../api/articles.ts";
import Articles from "../components/Article.tsx";


function ArticlesScreen() {
    const {data, isLoading} = useQuery('articles', getArticles);

    if (!data) {
        return <ActivityIndicator size="large" style={styles.spinner} />
    }
    console.log({data, isLoading});

    return (
        <Articles articles={data} />
    )
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
    },
});

export default ArticlesScreen;
