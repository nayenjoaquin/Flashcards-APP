import { API_BASE_URL } from "const/strings";
import { useState } from "react"
import { getLocal, saveLocal } from "utils/functions";

export const useAuth = () => {

    const[user, setUser] = useState<User|null>();

    const signIn = async (email: string, password: string, remember: boolean = false) => {
        
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
            setUser(body.data);
            if(remember){
                saveLocal('JWT', body.token);
            }
            return body.data;
        }catch(err){
            console.error('Failed to sign in:', err);
            
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
            

            setUser(body.data);
            saveLocal('JWT', body.token);
            return body.data
        }catch(err){
            console.error('Failed to verify user: ',err);
            return null;
            
        }
    }

    return {user, signIn, detectUser}
}