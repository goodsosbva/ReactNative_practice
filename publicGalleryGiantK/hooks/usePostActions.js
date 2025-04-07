import {ActionSheetIOS, Platform} from "react-native";
import React, {useState, useEffect} from 'react';
import {removePost} from "../lib/posts";
import {useNavigation, useRoute} from "@react-navigation/native";
import events from '../lib/events';

export default function usePostActions({id, description}) {
    const [isSelecting, setIsSelecting] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    const edit = () => {
        navigation.navigate('Modify', {
            id,
            description,
        });
    }

    const remove = async () => {
        await removePost(id);

        if (route.name === 'Post') {
            navigation.pop();
        }

        events.emit('removePost', id);
    }

    const onPressMore = () => {
        if (Platform.OS === 'android') {
            setIsSelecting(true);
        } else {
            ActionSheetIOS.showActionSheetWithOptions(
            {
                    options: ['설명 수정', '게시물 삭제', '취소'],
                    destructiveButtonIndex: 1,
                    cancelButtonTintColor: 2,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        edit();
                    } else if (buttonIndex === 1) {
                        remove();
                    }
                }
            )
        }
    };

    const actions = [
        {
            icon: 'edit',
            text: '설명 수정',
            onPress: edit,
        },
        {
            icon: 'delete',
            text: '게시물 삭제',
            onPress: remove,
        },
    ];

    const onClose = () => {
        setIsSelecting(false);
    };

    useEffect(() => {
        console.log('isSelecting >> ', isSelecting);
    }, [isSelecting])

    return {
        isSelecting,
        onPressMore,
        onClose,
        actions,
    }
}
