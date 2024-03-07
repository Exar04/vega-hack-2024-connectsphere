import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuth } from "../context/authContext";

export const useCreatePost = () => {
    const {currentUser} = useAuth()

    const postCollectionRef = collection(db, "posts")
    const userCollectionRef = doc(db, "users", currentUser.uid)

    const addPost = async ({textData}) => {
        await addDoc(postCollectionRef, {
            userId: currentUser.uid,
            // userName: currentUser.userName,
            userEmail: currentUser.email,
            text: textData,
        })

        await updateDoc(userCollectionRef, {
            posts: arrayUnion({
                text: textData,
                userid: currentUser.uid,
                userEmail: currentUser.email,
                img: "",
            })
        })
    }
    return {addPost}
}