import {useNavigation, RouteProp, useRoute} from '@react-navigation/core';
import React, {use, useState, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Pressable} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackNavigationProp, RootStackParamList} from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InfiniteData, useMutation, useQueryClient} from 'react-query';
import {modifyArticle, writeArticle} from '../api/articles';
import {Article} from '../api/types';
import { panGestureHandlerCustomNativeProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

function WriteScreen() {
    const {params} = useRoute<WriteScreenRouteProp>();
    const queryClient = useQueryClient();
    const cachedArticle = useMemo(() => 
        params.articleId ? queryClient.getQueryData<Article>(['article', params.articleId]) : null,
        [queryClient, params.articleId]
    )
    const {top} = useSafeAreaInsets();
    const [title, setTitle] = useState(cachedArticle?.title || '');
    const [body, setBody] = useState(cachedArticle?.body || '');
    const {mutate: write} = useMutation(writeArticle, {
        onSuccess: (article) => {
            // queryClient.invalidateQueries('articles');
            queryClient.setQueryData<InfiniteData<Article[]>>(
                'articles',
                (data) => {
                    if (!data) {
                        return {
                            pages: [[article]],
                            pageParams: [undefined],
                        }
                    }
                    const [firstPage, ...rest] = data.pages;
                    return {
                        ...data,
                        pages: [[article, ...firstPage], ...rest],
                    }
                }
            )
            navigation.goBack();
        },
    });

    const {mutate: modify} = useMutation(modifyArticle, {
        onSuccess: (article) => {
            queryClient.setQueryData<InfiniteData<Article[]>>(
                'articles',
                (data) => {
                    if (!data) {
                        return {pageParams: [], pages: []}
                    }
                    return {
                        pageParams: data!.pageParams,
                        page: data!.pages.map((page) => 
                        page.find((a) => a.id === params.articleId)
                            ? page.map((a) => (a.id === params.articleId ? article : a))
                            : page
                        ),              
                    };
            });
            queryClient.setQueryData<Article>(['article', params.articleId], article);
            navigation.goBack();
        },
    });

    const navigation = useNavigation<RootStackNavigationProp>();

    const onSubmit = useCallback(() => {
        if (params.articleId) {
            modify({id: params.articleId, title, body});
        } else {
            write({title, body});
        }
    }, [write, title, body, modify, params.articleId])

   useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <Pressable
                hitSlop={8}
                onPress={onSubmit}
                style={({pressed}) => pressed && styles.headerRightPressed}>
                    <MaterialIcons name="sand" size={24} color="#2196f3" />
                </Pressable>
            )
    });
   }, [onSubmit, navigation])

    return (
        <SafeAreaView style={styles.block}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.select({ios: 'padding'})}
                keyboardVerticalOffset={Platform.select({ios: top + 60})}>
                    <TextInput
                        placeholder="제목을 입력하세요"
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                    />
                    <TextInput
                        placeholder="내용을 입력하세요"
                        style={[styles.input, styles.body]}
                        multiline
                        textAlignVertical="top"
                        onChangeText={setBody}
                        value={body}
                    />
                </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    block: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 16,
        flexDirection: 'column',
    },
    keyboardAvoiding: {
        flex: 1,
    },
    input: {
        backgroundColor: 'white',
        fontSize: 14,
        lineHeight: 18,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
    },
    body: {
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 16,
        flex: 1,
    },
    headerRightContainer: {
        marginRight: 16,
    },
    headerRightPressed: {
        opacity: 0.75,
    },
});

export default WriteScreen;
