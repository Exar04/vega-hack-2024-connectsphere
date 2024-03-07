import { async } from "@firebase/util"
import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../config/firebase"
import { useAuth } from "../context/authContext"
import { useCreatePost } from "../hooks/CreatePost"

export function Home() {
    const [wok, setwok] = useState(false)
    const [userWantsToPost, setIfUserWantsToPost] = useState(false)

    const [Posts, setPosts] = useState([
        { id: 1, Username: "Yash", data: "this is my first twitt" },
        { id: 2, Username: "Vinyas", data: "this is my first twitt" },
        { id: 3, Username: "Sajal", data: "this is my first twitt" },
    ])
    const postCollectionRef = collection(db, "posts")
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef)
            var lops = []
            data.docs.map((doc) => {
                var mox = doc.data()
                var managedData = {
                    id: mox.userId,
                    Username: mox.userEmail,
                    data: mox.text,
                }
                lops.push(managedData)

            })
            setPosts([...Posts, ...lops])
            lops = []
        }
        getPosts()
    }, [])

    const listOfPostsDiv = Posts.map(post =>
        <div key={post.id} className="w-11/12 h-fit border text-white p-3 border-slate-400 rounded-lg m-3 flex-none">
            <div className="flex items-center">
                <div className="bg-gray-700 w-12 h-12 rounded-full mr-4"></div>
                <div>{post.Username}</div>
            </div>
            <div className=" w-10/12 relative left-16 flex-wrap flex">{post.data}</div>
        </div>
    )

    return (
        <div className="h-screen w-screen flex">
            {userWantsToPost ? <PostComponent setIfUserWantsToPost={setIfUserWantsToPost} /> : ""}
            <Sidebar setIfUserWantsToPost={setIfUserWantsToPost} />

            <div className="h-screen w-full overflow-scroll">{/*homepage*/}
            <Timeline />
            {/* <Profile /> */}
            </div>
        </div>
    )
}

function Profile(props) {
    const { currentUser } = useAuth()
    const [userData, setuserData] = useState({})
    useEffect(() => {
        const getUserData = async () => {
            const q = query(
                collection(db, 'users'), // Replace 'posts' with the name of your collection
                where('userId', '==', currentUser?.uid ) // Replace 'example@example.com' with the desired userEmail
            );

            const querySnapshot = await getDocs(q);
            // const data = await getDocs(userCollectionRef)
            const fetchedUserData = [];
            querySnapshot.forEach((doc) => {
                fetchedUserData.push({ id: doc.id, ...doc.data() });
            });
            console.log(fetchedUserData)

            setuserData(fetchedUserData[0])
        }

        getUserData()
    },[])

    return(
        <div className=" bg-zinc-950 w-full h-full">
            <div className="p-4 h-48">
                <div className="border-2 border-slate-400 w-full h-full rounded-lg flex justify-between items-center">
                    <div className=" text-white bg-slate-400 basis-1/5 h-full flex justify-center items-center"><div className="bg-slate-800 rounded-full w-4/5 h-4/5"></div></div>
                    <div className=" text-white basis-4/5 h-full w-full p-4">
                        <div className=" font-bold text-2xl">{userData.username}</div>
                        <div className="">
                            <div>Events Organised 23</div>
                            <div>Followers 1001</div>
                            <div>{userData.bio}</div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="text-white bg-zinc-950 h-screen flex flex-col">
                    <div className=" h-16 w-full flex flex-none">
                        <div role={"button"} className=" basis-1/2 flex items-center justify-center font-bold text-2xl border border-l-0 border-slate-400">Posts</div>
                        <div role={"button"} className=" basis-1/2 flex items-center justify-center font-bold text-2xl border border-r-0 border-slate-400">Events</div>
                    </div>
                    <div className="w-full flex-grow">
                    </div>
                </div>
        </div>
    )
}

function Timeline(props){
    const [Posts, setPosts] = useState([
        { id: 1, Username: "Yash", data: "this is my first twitt" },
        { id: 2, Username: "Vinyas", data: "this is my first twitt" },
        { id: 3, Username: "Sajal", data: "this is my first twitt" },
    ])
    const postCollectionRef = collection(db, "posts")
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef)
            var lops = []
            data.docs.map((doc) => {
                var mox = doc.data()
                var managedData = {
                    id: mox.userId,
                    Username: mox.userEmail,
                    data: mox.text,
                }
                lops.push(managedData)

            })
            setPosts([...Posts, ...lops])
            lops = []
        }
        getPosts()
    }, [])

    const listOfPostsDiv = Posts.map(post =>
        <div key={post.id} className="w-11/12 h-fit border text-white p-3 border-slate-400 rounded-lg m-3 flex-none">
            <div className="flex items-center">
                <div className="bg-gray-700 w-12 h-12 rounded-full mr-4"></div>
                <div>{post.Username}</div>
            </div>
            <div className=" w-10/12 relative left-16 flex-wrap flex">{post.data}</div>
        </div>
    )

    return(
                <div className="flex lg:flex-row flex-col">
                    <div className="bg-zinc-950  h-screen lg:basis-4/6 flex flex-col items-center overflow-scroll">
                        {listOfPostsDiv}
                    </div>
                    <div className="bg-zinc-950 h-screen lg:basis-2/6 border-l border-0 border-slate-400 text-white">Page</div>
                </div>

    )
}

function Sidebar(props) {
    const [SidebarPages, setSidebarPages] = useState(
        [
            { id: 1, pagevar: "Home", link: "/home" },
            { id: 2, pagevar: "Messages", link: "/messages" },
            { id: 3, pagevar: "Events", link: "/events" },
            { id: 4, pagevar: "Post", link: "/Post" }
        ])

    const listOfSidebarPages = SidebarPages.map(Page =>
        <div key={Page.id} className="p-3 m-2 text-2xl text-white hover:bg-zinc-700 rounded-full text-center">{Page.pagevar}</div>
    )
    const createpost = useCreatePost()
    function userCreatesPost() {
        // createpost.addPost({ textData: "heodoe" })
        props.setIfUserWantsToPost(true)
    }

    return (
        <div className="md:w-72 w-0 flex-none bg-zinc-950 h-screen flex flex-col border-r border-0 border-slate-400">{/*SideBar*/}
            <div className=" text-3xl text-white font-bold font-serif p-4 flex-none flex items-center  border-zinc-400 border-b border-0">Connect<img width="60" height="60" className="ml-3" src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/FFFFFF/external-sphere-graphic-design-vitaliy-gorbachev-fill-vitaly-gorbachev.png" alt="external-sphere-graphic-design-vitaliy-gorbachev-fill-vitaly-gorbachev" /></div>
            <div className=" bg-black flex-grow overflow-scroll">
                <div className="p-3 m-2 text-2xl text-white hover:bg-zinc-700 rounded-full text-center">Home</div>
                <div onClick={() => { userCreatesPost() }} className="p-3 m-2 text-2xl text-white hover:bg-zinc-700 rounded-full text-center">Post</div>
            </div>
            <div role={"button"} className="bg-black h-24 flex-none text-xl border-zinc-400 text-white border-t border-0 flex items-center p-4 justify-between">
                <div>Username</div>
                <div className="bg-gray-700 w-12 h-12 rounded-full"></div>
            </div>
        </div>

    )
}


function PostComponent(props) {
    return (
        <div className=" w-screen h-screen absolute flex justify-center items-center">
            <div className="bg-red-300 w-8/12 h-2/6 z-10 rounded-3xl">
            </div>
            <div onClick={() => { props.setIfUserWantsToPost(false) }} className="bg-white opacity-35 absolute w-full h-full"></div>
        </div>
    )
}

function PopUpSidebar({ setwok, wok }) {
    return (
        <div className={`flex absolute items-center text-white w-screen h-screen overflow-x-hidden `}>
            <div className="absolute bg-slate-300 opacity-40 w-screen h-screen" onClick={() => { setwok(!wok) }}></div>
            <div className=" m-3 p-3 w-64 bg-gray-800 rounded-lg h-2/3 overflow-y-scroll z-30">
                <div className="mx-4 text-xl text-center overflow-y-scroll">
                    <div className="p-2 m-1 bg-green-300 rounded-lg">Home</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Messages</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                    <hr class="h-px mt-4 mb-4 bg-gray-500 border-0 " />
                    <div className="p-2 m-1">Notification</div>
                </div>
            </div>
        </div>
    )
}

function NavBar() {
    return (
        <div className="bg-slate-500 w-screen h-16 flex justify-between">
            <div className=" text-3xl text-white ">C</div>
            <div className="flex w-full justify-center">
                <div className=" mx-5 p-3">wo</div>
                <div className=" mx-5 p-3">wo</div>
                <div className=" mx-5 p-3">wo</div>
            </div>
            <div className="">wo</div>
        </div>
    )
}