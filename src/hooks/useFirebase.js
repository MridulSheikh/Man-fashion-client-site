import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInitialize from "../Firebase/firebase.init";

firebaseInitialize()

const useFirebase = () =>{

const [user, setUser] = useState({})

//google probider
const Googleprovider = new GoogleAuthProvider();

//auth creator
const auth = getAuth();

const singinWithGoogle = () => {
    signInWithPopup(auth, Googleprovider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const data = result.user;
        //set user on userstate
        console.log(result)
        setUser(data);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error)
        // ...
      });
}

const logout = () => {
  signOut(auth).then(() => {
    setUser({});
  }).catch((error) => {
    // An error happened.
  });
}

useEffect(()=>{
  onAuthStateChanged(auth, user =>{
      if (user) {
          setUser(user)
        } 
  })
},[])

return{
    singinWithGoogle,
    user,
    logout
}
}

export default useFirebase;