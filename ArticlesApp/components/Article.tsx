import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator, RefreshControl} from "react-native";
import {Article} from '../api/types';
import ArticleItem from "./ArticleItem.tsx";
import WriteButton from './WriteButton';

export interface ArtilcesProps {
    articles: Article[];
    showWriteButton?: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage(): void;
    refresh(): void;
    isFetching: boolean;
}

function Articles({articles, showWriteButton, isFetchingNextPage, fetchNextPage, refresh, isFetching}: ArtilcesProps) {
    return (
        <FlatList
            data={articles} 
            renderItem={({item}) => (
                <ArticleItem
                    id={item.id}
                    title={item.title}
                    publishedAt={item.published_at}
                    username={item.user.username}
                />
            )}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} /> }
            ListFooterComponent={() => (
                <>
                    {isFetchingNextPage && (
                        <ActivityIndicator
                            size="small"
                            color='blakc'
                            style={styles.spinner}
                        />
                    )}
                </>
            )}
            ListHeaderComponent={() =>
                showWriteButton ? <WriteButton /> : null
            }
            onEndReachedThreshold={0.5}
            onEndReached={fetchNextPage}
            refreshControl={
                <RefreshControl
                    refreshing={isFetching}
                    onRefresh={refresh}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#cfd8dc',
    },
    spinner: {
        backgroundColor: 'white',
        paddingTop: 32,
        paddingBottom: 32,
    }
});

export default Articles;
