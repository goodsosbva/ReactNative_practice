import {useNavigation} from "@react-navigation/core";
import React, {useState} from "react";
import {View, StyleSheet, Pressable, Text} from "react-native";
import {RootStackNavigationProp, RootStackParamList} from "../screens/types";
import AskDialog from "./AskDialog";
import {InfiniteData, useMutation, useQueryClient} from "react-query";
import {deleteArticle} from "../api/articles";
import {Article} from "../api/types";

export interface ArticleActionButtonProps {
    articleId: number;
}

function ArticleActionButton({articleId}: ArticleActionButtonProps) {
    const [askRemove, setAskRemove] = useState(false);
    const navigation = useNavigation<RootStackNavigationProp>();
    const queryClient = useQueryClient();

    const {mutate} = useMutation(deleteArticle, {
        onSuccess: () => {
          navigation.goBack();
          queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
            if (!data) {
              return {pageParams: [], pages: []};
            }
    
            return {
              pageParams: data!.pageParams,
              pages: data!.pages.map(page =>
                page.find(a => a.id === articleId) // 우리가 수정할 항목이 있는 페이지를 찾고
                  ? page.filter(a => a.id !== articleId) // articleId와 일치하는것은 제외
                  : page,
              ),
            };
          });
        },
      });
    
    const onPressModify = () => {
        navigation.navigate('Write', {articleId});
    }

    const onPressRemove = () => {
        setAskRemove(true);
    }

    const onCloseRemove = () => {
        setAskRemove(false);
    }
    
    const onConfirmRemove = () => {
        setAskRemove(false);
        mutate(articleId);
    }


    return (
        <>
            <View style={styles.block}>
                <Pressable 
                    style={({pressed}) => pressed && styles.pressed} 
                    onPress={onPressModify}
                >
                    <Text style={styles.buttonText}>수정</Text>
                </Pressable>
                <View style={styles.separator} />
                <Pressable 
                    style={({pressed}) => pressed && styles.pressed} 
                    onPress={onPressRemove}
                >
                    <Text style={styles.buttonText}>삭제</Text>
                </Pressable>
            </View>
            <AskDialog
                visible={askRemove}
                title="삭제"
                message="이 게시글을 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                isDestructive={true}
                onClose={onCloseRemove}
                onConfirm={onConfirmRemove}
            />
        </>
    )
}

const styles = StyleSheet.create({
    block: {
        marginTop: -16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    separator: {
        width: 8,
    },
    buttonText: {
        color: '#21963f',
        fontSize: 14,
    },
    pressed: {
        opacity: 0.75,
    },
});

export default ArticleActionButton;
