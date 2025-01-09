//this file is use to manage the state of the user authentication
import { create } from "zustand";          //this is a state management library
import axios, { Axios } from "axios";                 //this is a axios library to make http request

const API_URL = "http://localhost:5001/api/auth";        //this is the base base url for api request

axios.defaults.withCredentials = true;                    //this is use to set the withCredentials to true so that the cookies can be stored in the browser

export const useAuthStore = create((set) => ({
    user: null,                                  //this is the user state that is used to store the user data from the backend
    isAuthenticated: false,                      //this is the state that is used to check if the user is authenticated or not acording to the user data
    error:null,                                 //this is the state that is used to store the error message if any error occurs
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {             //this is the signup function that is used to make the http request to the backend to signup the user
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, {email,password,name});
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });            //if the request is successfull then update the all states(user,isAuthenticated,isLoading). user data from backedn using "esponse.data.user" that is returned from backend user data
        } catch (error) {
            set({ error: error.response.data.message || "User already exist", isLoading: false });
            throw error;
        }
    },


    verifyEmail: async (code) => {                       //this is the verifyEmail function that is used to make the http request to the backend to verify the email of the user
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verifyemail`, { code });               //this line shows calling the verifyemail API of the backend and passing the code as the parameter(code).
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Invalid verification code", isLoading: false });
            throw error;
        }
    },


    checkAuth: async () => {                    //this is the checkAuth function that is used to make the http request to the backend to check if the user is authenticated or not
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/checkauth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },


    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, {email,password});
            set({ user: response.data.user, isAuthenticated: true, error: null, isLoading: false });            //if the request is successfull then update the all states(user,isAuthenticated,isLoading). user data from backedn using "esponse.data.user" that is returned from backend user data
        } catch (error) {
            set({ error: error.response.data.message || "Invalid creentials", isLoading: false });
            throw error;
        }
    },


    logout: async() => {                    //this is the logout function that is used to make the http request to the backend to logout the user
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error loging out", isLoading: false });
            throw error;
        }
    },


    ForgotPassword: async (email) => {                       //this is the ForgotPassword function that is used to make the http request to the backend to send the email to the user to reset the password
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${API_URL}/forgotpassword`, { email });            //this line shows calling the forgotpassword API of the backend and passing the email as the parameter(email) and send the reset password email to the entered email.
            set({ message: response.data.message , isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    }


}));