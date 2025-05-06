import {RouteProp, useRoute} from "@react-navigation/core";
import React, {useMemo} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native'
import {useQuery} from "react-query";
import {getArticles} from "../api/articles.ts";
import Articles from "../components/Article.tsx";
import {useUserState} from '../contexts/UserContext';
import {useInfiniteQuery} from "react-query";
import {Article} from "../api/types.ts";


function ArticlesScreen() {
    const {
        data, 
        isFetchingNextPage, 
        fetchNextPage,
        fetchPreviousPage,
        isFetchingPreviousPage,
    } = useInfiniteQuery(
        'articles',
        ({pageParam}) => getArticles({...pageParam}),
        {
            getNextPageParam: (lastPage) =>
                lastPage.length  === 10 ? lastPage[lastPage.length - 1].id : undefined,
            getPreviousPageParam: (_, allPages) => {
                const validPage = allPages.find((page) => page.length > 0);
                if (!validPage) {
                    return undefined;
                }
                return validPage[0].id;
            }
        }
    )

    const items= useMemo(() => {
        if (!data) {
            return null;
        }

        return ([] as Article[]).concat(...data.pages);
    }, [data]);

    const [user] = useUserState();
    if (!items) {
        return <ActivityIndicator size="large" style={styles.spinner} />
    }

    return (
        <Articles 
            articles={items} 
            showWriteButton={!!user}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            refresh={fetchPreviousPage}
            isFetching={isFetchingPreviousPage}
        />
    )
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
    },
});

export default ArticlesScreen;
