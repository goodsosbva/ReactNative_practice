import React, {useRef} from 'react';
import BorderedInput from "./BorderedInput";

function SignForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    return (
        <>
            <BorderedInput
                hasMarginBottom
                placeholder='email'
                value={form.email}
                onChangeText={createChangeTextHandler('email')}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
            />
            <BorderedInput
                placeholder='password'
                secureTextEntry
                hasMarginBottom={isSignUp}
                value={form.password}
                onChangeText={createChangeTextHandler('password')}
                ref={passwordRef}
                returnKeyType={isSignUp ? 'next' : 'done'}
                onSubmitEditing={() => {
                    if(isSignUp) {
                        confirmPasswordRef.current.focus();
                    } else {
                        onSubmit()
                    }
                }}
            />
            {isSignUp && (<BorderedInput
                placeholder='password check'
                value={form.confirmPassword}
                onChangeText={createChangeTextHandler('confirmPassword')}
                secureTextEntry
                ref={confirmPasswordRef}
                returnKeyType="done"
                onSubmitEditing={onSubmit}
            />)}
        </>
    )
}

export default SignForm;
