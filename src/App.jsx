import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Mainfront from './components/Mainfront'
import Login from './components/Login'
import Register from './components/Register'
import ForgetPassword from './components/ForgetPassword'
import RecoverPassword from './components/RecoverPassword'
import ConfirmCount from './components/ConfirmCount'
import { AuthProvider } from './context/AuthContext'
import Private from './components/Private'
import Profile from './components/Profile'
import { Find } from './components/Find'
import MyVotes from './components/MyVotes'
import MyFilms from './components/MyFilms'
import Film from './components/Film'
import MyVotes2 from './components/MyVotes2'
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Mainfront />} />
            <Route path='/public/Login' element={<Login />} />
            <Route path='/public/Register' element={<Register />} />
            <Route path='/public/forgetPassword' element={<ForgetPassword />} />
            <Route path='/public/recuperatePassword/:token' element={<RecoverPassword />} />
            <Route path='/public/confirmCount/:id' element={<ConfirmCount />} />

            <Route path='/private' element={<Private />}>
              <Route index element={<Find />} />
              <Route path='myVotes/:id' element={<MyVotes />} />
              <Route path='myVotes2/:id' element={<MyVotes2 />} />
              <Route path='myFilms' element={<MyFilms />} />
              <Route path='profile' element={<Profile />} />
              <Route path='film/:id' element={<Film />} />
              <Route path='myFilms/film/:id' element={<Film />} />
              {/* <Route path='logaut' element={<MyFilms />} /> */}



            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
