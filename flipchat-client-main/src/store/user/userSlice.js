import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: "",
            email: "",
            hasPlan: false,
            accessToken: ""
        }
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        removeUser(state, action) {
            state.user = {
                name: "",
                email: "",
                hasPlan: false,
                accessToken: ""
            }
        }
    }
})



export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;