import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const useCreateUser = () => {
    const userCollectionRef = collection(db, "users")

    const addUser = async ({userId}) => {
        await addDoc(userCollectionRef, {
            userId: userId ,
            posts: {},
            userName:{},
            userType:{}
        })
    }
    return {addUser}
}