import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useRef} from 'react';
import {Animated, Platform, Pressable, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

function FloatingWriteButton({hidden}) {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Write');
    };

    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: hidden ? 1: 0,
            useNativeDriver: true,
        }).start();
    }, [animation, hidden]);

    return (
        <Animated.View
            style={[
                styles.wrapper,
                {
                    transform: [
                        {
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 88],
                            }),
                        },
                    ],
                    opacity: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }),
                },
            ]}
        >
            <Pressable
                style={({pressed}) => [
                    styles.button,
                    Platform.OS === 'ios' && {
                        opacity: pressed ? 0.6 : 1,
                    },
                ]}
                android_ripple={{color: 'white'}}
                onPress={onPress}
            >

                <Icon name="add" size={24} style={styles.icon} />
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        // ios 전용
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // android 전용
        elevation: 5,
        overflow: Platform.select({android: 'hidden'}),
    },
    button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#009688',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: 'white',
    },
});

export default FloatingWriteButton;