import { sessionStore } from "shared/stores/last-session"
import { getLocal, saveLocal } from "shared/utils/common";
import { Deck, Progress, Session } from "types";
import { useProgress } from "./progress";
import { API_BASE_URL } from "shared/const/strings";
import { APIgetLastSession } from "shared/api/session";
import { AuthStore } from "shared/stores/auth";

export const useSession = ()=>{
    const {lastSession, setLastSession} = sessionStore();
    const {saveProgress} = useProgress();
    const {user} = AuthStore();

    const getLastSession = async(token?: string): Promise<Session | null> =>{

       const lastSession = await APIgetLastSession(user?.token??await getLocal('JWT'));
       setLastSession(lastSession);
       return lastSession;
    }

    const saveSession = async( session: Session, token?: string): Promise<boolean> => {
        try{
            const {deck_id, wrong, good, perfect, duration} = session
            const res = await fetch(API_BASE_URL+'/session', {
                method: 'POST',
                headers: {
                    "Content-Type": 'Application/json',
                    "Authorization": 'Bearer '+ (token ?? await getLocal('JWT'))
                },
                body: JSON.stringify({deck_id, wrong, good, perfect, duration})
            })

            if(!res.ok){
                throw new Error('Failed to save session to API: '+ await res.text())
            }

            const body = await res.json();

            return true
        }catch(err){
            console.log('Error to save deck session: ', err);
            return false
            
        }

    }

    return{lastSession, setLastSession, getLastSession, saveSession}
}