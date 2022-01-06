import { useTasks } from "../context/tasksContext"
import { VscTrash, VscTasklist } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'


export default function Index() {

    
    const { tasks, loading, setTasks } = useTasks();
    const navigate = useNavigate()

    const deleteTask = async id => {
        const confirmDelete = confirm('Are you sure about deleting the task?')

        if(confirmDelete){
            try {
                const url = `http://localhost:4000/tasks/${id}`
                const response = await fetch(url, {
                    method: 'DELETE'
                })
                await response.json()

                const arrayTasks = tasks.filter( task => task.id !== id)
                setTasks(arrayTasks)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
       <div className="flex justify-center">

        {tasks.length === 0 && !loading ? (
            <div className="block">
                <h2 className="text-2xl">There are no tasks</h2>
                <VscTasklist size="8rem" />
            </div>
        ) : (
            <div className="w-7/10 my-20 items-center">
            {tasks.map((task, i) => (
                <div
                key={task.id}
                className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-0 py-0 m-2 md:px-20 md:py-5 flex flex-col justify-between items-center md:flex-row "
                >
                    <span className="text-2xl md:mr-10 my-5 md:mt-0">{i + 1}</span>
                    <div className="flex flex-col mx-10 justify-between items-center">
                        <h1 className="font-bold">{task.title}</h1>    
                        <p className="text-gray-300 max-w-sm text-center">{task.description}</p>
                    </div>
                    <div className="flex flex-col md:ml-10 my-5">
                        <button
                        className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
                        onClick={() => {
                            deleteTask(task.id);
                        }}
                        >
                        <VscTrash className="mr-2" /> Delete
                        </button>
                        <button
                        className="bg-green-700 hover:bg-green-600 px-3 py-1 inline-flex items-center mt-5 "
                        onClick={() => {
                            navigate("/edit/" + task.id)
                        }}
                        >
                        <VscTrash className="mr-2" /> Edit
                        </button>
                    </div>
                </div>
            ))}
          </div>
        )}
        </div>
    )
}
