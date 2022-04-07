import { createContext, useContext, useState, useEffect  } from "react";


const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(0);


    useEffect(() => {
        setLoading(!loading)
        const getTaskAPI = async () =>{
            try {
                const url = ''
                const response = await fetch(url)
                const result = await response.json()

                const loadedStasks = []

                for(const key in result){
                    loadedStasks.push({
                      id: key,
                      title: result[key].title,
                      description: result[key].description,
                    })
                  }
                setTasks(loadedStasks)
            }catch(error){
                console.log(error);
            }
            setLoading(false)
        }
        getTaskAPI()
    }, [update]);

    return <TaskContext.Provider
        value=
        {{
            tasks,
            setTasks,
            loading,
            update,
            setUpdate
        }}
    >
        {children}
        </TaskContext.Provider>
};