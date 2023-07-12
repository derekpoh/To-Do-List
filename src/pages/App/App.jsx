import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getUser} from "../../utilities/user-services"
import HomePage from '../HomePage/Homepage'
import LoginPage from '../Login/LoginPage'
import RegisterPage from '../Register/RegisterPage'
import ToDoList from '../ToDoList/ToDoList'
import AddToDoItem from '../AddToDoItem/AddToDoItem'
import UpdateToDoItem from '../UpdateToDoItem/UpToDoItem'




function App() {
  
  const [user, setUser] = useState(getUser())
  console.log(user)

  return (
    <>
    <Routes>
    <Route path='/' element={<HomePage />}></Route>
      <Route path='/users/login' element={<LoginPage setUser={setUser} />}></Route>
      <Route path='/users/register' element={<RegisterPage setUser={setUser}/>}></Route>
      <Route path='/todolist' element={<ToDoList user={user} setUser={setUser}/>}></Route>
      <Route path='/todolist/add' element={<AddToDoItem user={user} />}></Route>
      <Route path='/todolist/:id/update' element={<UpdateToDoItem user={user} />}></Route>
    </Routes>
    </>
  )
}

export default App
