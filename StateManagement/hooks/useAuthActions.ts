// import {bindActionCreators} from "redux";
// import {useDispatch} from "react-redux";
// import {authorize, logout} from "../slices/auth.ts";
import {useMemo} from "react";
import {useSetRecoilState} from "recoil";
import {authState, User} from "../atoms/auth.ts";

// export default function useAuthActions() {
//     const dispatch = useDispatch();
//
//     return useMemo(() => bindActionCreators({authorize, logout}, dispatch), [
//     ]);
//
// }

export default function useAuthActions() {
    const set = useSetRecoilState(authState);

    return useMemo(
        () => ({
            authorize: (user: User) => {
                set({user});
            },
            logout: () => {
                set({user: null});
            }
        }),
        [set],
    );
}
