import { AiOutlinePlus } from 'react-icons/ai'
import { Outlet, Link } from "react-router-dom"
import { useTasks } from "../context/tasksContext"


export default function Layout() {

    const { tasks } = useTasks();

    return (
        <div>
            <header className=" sticky flex bg-gray-800 md:px-28 py-5 items-center px-8">
                <h1  className="font-black text-lg">
                    <Link to="/">
                        Task App ({tasks.length})
                    </Link>
                </h1>
                

                <div className="flex-grow text-right ml-8">
                    <Link to="/new">
                        <button className="bg-green-500 md:px-5 px-2 py-2 font-bold rounded-sm hover:bg-green-400 inline-flex items-center">
                            <AiOutlinePlus className='mr-2'/>Add Task
                        </button>
                    </Link>

                </div>
            </header>
            <main className="px-10" >
            <Outlet />
            </main>
        </div>
    )
}
