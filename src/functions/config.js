import { initializeApp } from "firebase/app";

export const domain = "https://xclone-api-git-master-aymanechabat.vercel.app"

export async function fetchTemplate(endpoint, type, method, token, body) {
  return await fetch(domain + endpoint, {
    method,
    headers: (type === "json" ? {
      "Content-Type": "application/json",
      Authorization: token,
    } : {
      Authorization: token,
    }),
    body: method !== "GET" ? (type === "json" ? JSON.stringify(body) : body) : undefined
  })
  .then(async(res)=>
    await res.json()
    )
  .catch((error)=>{
    console.error(error.message);
    return null;
  })
}

const firebaseConfig = {
    apiKey: "AIzaSyAtTWWX097PvnlRXBBYXXivJqwp9r1Byy4",
    authDomain: "realchat-4fd5d.firebaseapp.com",
    databaseURL: "https://realchat-4fd5d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "realchat-4fd5d",
    storageBucket: "realchat-4fd5d.appspot.com",
    messagingSenderId: "755565534952",
    appId: "1:755565534952:web:5f480371b90b3bbafcf35d"  
  };

const app = initializeApp(firebaseConfig)

export default app;
