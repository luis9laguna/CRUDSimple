import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { TasksProvider } from './context/tasksContext'
import Layout from './layout/Layout'
import Index from './pages/Index'
import NewTask from './pages/NewTask'
import EditTask from './pages/EditTask'

function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Layout />}>
            <Route index element={<Index />}/>
            <Route path ="/new" element={<NewTask />}/>
            <Route path ="/edit/:id" element={<EditTask />}/>
          </Route>
        </Routes>
      </BrowserRouter>
   </TasksProvider>
  )
}

export default App
