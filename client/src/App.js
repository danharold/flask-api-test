import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios'

import Header from './components/Header';

import Error404 from './pages/404';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [user, setUser] = useState(()=>{
    return undefined
  })

  console.log("App render")

  useEffect(() => {
    console.log("App useEffect")
    // decode username from jwt if available for lookup
    try {
      const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('a'))
      ?.split('=')[1]
      const token_deconstructed = token.split('.');
      const username = JSON.parse(atob(token_deconstructed[1])).username
      axios.get('/api/users/' + username, {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.valid_session) {
          setUser(res.data)
        }
      })
    }
    catch(err) {
      //
    }
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
          <Header user={user} />
          <Routes>
            <Route path="*" element={<Error404/>}/>
            <Route path="/" element={<HomePage user={user}/>}/>
            <Route path="/user/:username" element={<ProfilePage/>}/>
            {user ? 
            <>
              <Route path="/login" element={<HomePage user={user}/>}/>
              <Route path="/register" element={<HomePage user={user}/>}/>
            </> :
            <>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
            </>
            }
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
