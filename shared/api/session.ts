import { API_BASE_URL } from "shared/const/strings";
import { NewCard, newSession, Session } from "types";
import { json2Card, json2Sesssion } from "./schemas";

const base_url = API_BASE_URL + '/session'

export const APIgetLastSession = async (token: string): Promise<Session|null> => {
    try{
        const res = await fetch(API_BASE_URL+'/last-review', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+token
                }
            }
        );

        if(!res.ok) throw new Error(await res.text());

        const json = await res.json();

        return json2Sesssion(json);
    }catch(err){
        console.log('FAILED TO GET LAST REVIEW SESSION: ', err);
        return null
        
    }
}

export const APIsaveSession = async (session: newSession, token: string): Promise<Session|null> => {
    const body = JSON.stringify(session);
    try{
        const res = await fetch(base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer '+token
            },
            body: body
        });

        if(res.status!=201) throw new Error(await res.text());

        return json2Sesssion(await res.json());
    }catch(err){
        console.log('Failed to save session: ', err);
        return null;
        
    }
}