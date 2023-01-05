import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios'

import Header from './components/Header';

import Error404 from './pages/404';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [user, setUser] = useState(()=>{
    return undefined
  })

  console.log("RENDER APP")

  useEffect(() => {
    console.log("USEEFFECT: GET USER")
    // decode username from jwt if available for lookup
    try {
      const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('a'))
      ?.split('=')[1]
      const token_deconstructed = token.split('.');
      const username = JSON.parse(atob(token_deconstructed[1])).username
      axios.get('/api/users/' + username, {}, {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((res) => {
        setUser(res.data)
      })
    }
    catch(err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
          <Header user={user} />
          <Routes>
            <Route path="*" element={<Error404/>}/>
            <Route path="/" element={<HomePage user={user}/>}/>
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
