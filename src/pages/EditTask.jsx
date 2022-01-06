import Forms from "../components/Forms";
import { useEffect, useState } from "react";
import { useTasks } from "../context/tasksContext";
import { useParams } from "react-router-dom"

export default function EditTask() {
    const {id} = useParams()

    const [task, setTask] = useState({})
    const { tasks } = useTasks();
    useEffect(() => {
        if (id) {
          const taskFound = tasks.find((task) => task.id == id);
          setTask(taskFound)          
        }
      }, [tasks]);

    return (

        <div className=" flex justify-center mt-28">
          {task?.title ? (
            <Forms task={task} />

          ):
          (<h1>No client was found</h1>)
          }
        </div>
    )
}
