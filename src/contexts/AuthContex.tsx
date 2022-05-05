import { auth, firebase } from '../services/firebase';
import { createContext, ReactNode, useEffect, useState } from "react";

type User={
    id: string;
    name:string;
    avatar: string;
  }
  type AuthContextType ={
    user: User | undefined;
    sighInWithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps ={
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    //autenticação em contexto
  const[user, setUser] = useState<User>();

  //useEffect executa assim quem o App aparece em tela
    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          const {displayName, photoURL, uid} = user
    
          if(!displayName || !photoURL){
              throw new Error('Missing information from Google Acount');
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
      return()=>{
        unsubscribe();
      }
    },[])
  
  
     //autenticação em contexto
    async function sighInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
  
      const result = await auth.signInWithPopup(provider);
  
      if(result.user){
        const {displayName, photoURL, uid} = result.user
  
        if(!displayName || !photoURL){
            throw new Error('Missing information from Google Acount');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }

    return(
    <AuthContext.Provider value={{user, sighInWithGoogle}}>
        {props.children}
    </AuthContext.Provider>
    );
}