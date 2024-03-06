import { useState } from "react"

export function Home() {
    const [wok, setwok] = useState(false)

    const [Posts, setPosts] = useState(
        [
            { id: 1, Username: "Yash", data: "this is my first twitt" },
            { id: 2, Username: "Vinyas", data: "this is my first twitt" },
            { id: 3, Username: "Sajal", data: "this is my first twitt" },
        ])

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
            <Sidebar />

            <div className="h-screen w-full overflow-scroll">{/*homepage*/}
                <div className="flex lg:flex-row flex-col">
                    <div className="bg-zinc-950 border-l border-0 border-slate-400 h-screen lg:basis-4/6 flex flex-col items-center overflow-scroll">
                        {listOfPostsDiv}
                    </div>
                    <div className="bg-zinc-950 h-screen lg:basis-2/6 border-l border-0 border-slate-400">Page</div>
                </div>
            </div>
        </div>
    )
}

function Sidebar() {
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

    return (
        <div className="md:w-72 w-0 flex-none bg-zinc-950 h-screen flex flex-col">{/*SideBar*/}
            <div className=" text-3xl text-white font-bold font-serif p-4 flex-none flex items-center  border-zinc-400 border-b border-0">Connect<img width="60" height="60" className="ml-3" src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/FFFFFF/external-sphere-graphic-design-vitaliy-gorbachev-fill-vitaly-gorbachev.png" alt="external-sphere-graphic-design-vitaliy-gorbachev-fill-vitaly-gorbachev" /></div>
            <div className=" bg-black flex-grow overflow-scroll">
                {listOfSidebarPages}
            </div>
            <div className="bg-black h-24 flex-none text-xl border-zinc-400 text-white border-t border-0 flex items-center p-4 justify-between">
                <div>Username</div>
                <div className="bg-gray-700 w-12 h-12 rounded-full"></div>
            </div>
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