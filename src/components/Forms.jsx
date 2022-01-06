import { useTasks } from "../context/tasksContext";
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'



export default function Forms({task}) {

    const { setUpdate, update, loading } = useTasks()
     const navigate = useNavigate()


    const newClientSchema = Yup.object().shape({
        title: Yup.string()
                    .min(3, 'Title is too short')
                    .max(30, 'Title is too long')
                    .required('Title is required'),
        description: Yup.string()
                    .min(3, 'Description is too short')
                    .required('Description is required')
    })

    const handleSubmit = async (values) =>{
            try{ 
                let response
                if(task){
                    const url = `http://localhost:4000/tasks/${task.id}`

                    response = await fetch(url, {
                        method: "PUT",
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }else{
                    const url = "http://localhost:4000/tasks"

                    response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }
                await response.json()
                setUpdate(update + 1);
                navigate('/')
            }catch(error){
                console.log(error);
            }
        }


    return (
        !loading && (
        <Formik
            initialValues={{
                title: task?.title ?? '',
                description: task?.description ?? ''
            }}
            enableReinitialize={true}
            onSubmit={ async (values, {resetForm}) => {
                await handleSubmit(values)

                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({errors, touched}) => {
                return (
                <Form className="bg-gray-700 md:p-10 p-4 h-2/4 flex flex-col ">
                    <h1 className="text-3xl mb-7">{task ? "Update a Task" : "Create a Task"}</h1>
                    <Field
                    className="bg-gray-800 focus:text-gray-100 focus:outline-none sm:w-96 py-3 px-4  mb-5" 
                    placeholder="Write a title"
                    type="text"
                    name="title"
                    />
                    {errors.title && touched.title ? (
                        <div className="text-center my-2 bg-red-700 p-1 uppercase">
                            {errors.title}
                        </div>
                    ): null}
                    <Field
                    as="textarea"
                    className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full h-48 py-3 px-4 mb-5"
                    placeholder="Write a Description"
                    type="text"
                    name="description"
                    />
                    {errors.description && touched.description ? (
                        <div className="text-center my-2 bg-red-700 p-1 uppercase">
                            {errors.description}
                        </div>
                    ): null}
                    <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30"
                    >
                        Save
                    </button>
                    
                </Form>
            )}}
        </Formik>
        )
    )
}







// const initialState = {
//     title: "",
//     description: ""
// };


// const handleSubmit = (e) =>{
//     e.preventDefault();
//     createTask(task.title, task.description);
// }

// const handleChange = (e) =>{
//     setTask({...task, [e.target.name]: e.target.value})
// }


// <form  className="bg-gray-700 p-10 h-2/4 flex flex-col" onSubmit={handleSubmit}>
//     <h1 className="text-3xl mb-7">Task</h1>
//     <input 
//     name="title" 
//     className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5" 
//     type="text"
//     placeholder="Write a title"
//     autoFocus
//     onChange={handleChange}
//     value={task.title}
//     />
//     <textarea
//     name="description"
//     placeholder="Write a Description"
//     className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
//     onChange={handleChange}
//     value={task.description}
//     ></textarea>
//     <button
//     className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30"
//     >
//     Save
//     </button>
// </form>