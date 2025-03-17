import { createContext, useContext, useEffect, useState } from "react";
import { getUserByid } from "../utils/apis";

const STORAGE_NAME = "flipchat_user"

const AuthContext = createContext(null);

export const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    // handle set user
    const handleSetUser = (values) => {
        localStorage.setItem(STORAGE_NAME, JSON.stringify(values))
        setCurrentUser(values)
    };

    // handle logout user
    const handleLogout = () => {
        localStorage.removeItem(STORAGE_NAME)
        setCurrentUser(null)
    }

    const fetchUserDetails = async (id) => {
        setIsFetching(true);
        try {
            const res = await getUserByid(id);
            if (res.data) {
                setUserDetails(res.data?.user)
            }
            return res.data?.user ?? null

        } catch (error) {
            return error
        } finally {
            setIsFetching(false)
        }
    }

        // presist user
        useEffect(() => {
            const user = JSON.parse(localStorage.getItem(STORAGE_NAME))
            if (user) {
                setCurrentUser(user)
            }
        }, [])

        let values = {
            currentUser,
            handleSetUser,
            userDetails,
            setUserDetails,
            fetchUserDetails,
            handleLogout,
            isFetching
        }


        return (
            <AuthContext.Provider value={values}>
                {children}
            </AuthContext.Provider>
        )
    }

    export default AuthProvider;
