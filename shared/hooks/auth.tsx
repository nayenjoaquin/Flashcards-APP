import { API_BASE_URL } from "shared/const/strings";
import { useState } from "react"
import { AuthStore } from "shared/stores/auth";
import { getLocal, removeLocaL, saveLocal } from "shared/utils/common";
import { addWhitelistedNativeProps } from "react-native-reanimated/lib/typescript/ConfigHelper";
import { User } from "types";

export const useAuth = () => {

    const auth = AuthStore();

    const signIn = async (email: string, password: string) => {
        
        try{
            const res = await fetch(API_BASE_URL+'/users/sign-in', {
                method: 'POST',
                headers:{
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            if(!res.ok){
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const body = await res.json();
            auth.setUser(body.data);
            saveLocal('JWT', body.token);
            return body.data;
        }catch(err){
            console.log('Failed to sign in:', err);
            
        }
    }

    const signUp = async(email: string, password: string, username: string) =>{
        try{
            const res = await fetch(API_BASE_URL+'/users/sign-up',{
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });

            if(!res.ok){
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const body = await res.json();

            auth.setUser({...body['data'], token: body['token']} as User)
            saveLocal('JWT', body.token);
            return body.data
        }catch(err){
            console.log("Couldn't register new user: ", err);
            return null
            
        }
    }

    const detectUser = async () => {
        const token = await getLocal('JWT');
        

        if(!token){
            return null;
        }

        try{
            const res = await fetch(API_BASE_URL+'/users/sign-in', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+token
                }
            });

            if(!res.ok){
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const body = await res.json();
            

            auth.setUser({
                ...body.data,
                token: body.token
            });
            saveLocal('JWT', body.token);
            return body.data
        }catch(err){
            console.log('Failed to verify user: ',err);
            return null;
            
        }
    }

    const signOut = async () => {
        auth.setUser(null);
        await removeLocaL('JWT')
    }

    return {signIn, detectUser, user: auth.user, signOut, signUp}
}