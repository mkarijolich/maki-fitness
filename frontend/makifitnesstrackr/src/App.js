import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "../src/Home"
import Activities from './Activities';
import Routines from './Routines';
import NavBar from './NavBar';
import MyRoutines from './MyRoutines';

import { fetchAllActivities, fetchAllRoutines, createNewActivity, createNewRoutine, login, register } from "../src/API/index";



function App() {
  
  let savedUsername = localStorage.getItem('username')
  let savedToken = localStorage.getItem('token')
  let savedUser = {};
  if(savedUsername && savedToken) {
    savedUser = {
      username: savedUsername,
      token: savedToken
    }
  }
  const [user, setUser] = useState(savedUser ? savedUser : {});
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    Promise.all( 
      [
        fetchAllRoutines()
      ]
    )
    .then(([routinesFromAPI]) => {
      setRoutines(routinesFromAPI);
      // console.log(routinesFromAPI)
    })
  }, [])

  useEffect(() => {
    Promise.all( 
      [
        fetchAllActivities()
      ]
    )
    .then(([activitiesFromAPI]) => {
      setActivities(activitiesFromAPI);
    })
  }, [])

  

  return (
    <Router>
      <NavBar handleLogout={handleLogout} user={user} activities={activities} routines={routines}/>
      <Routes>
        <Route path='/' element={<Home setUser={setUser} user={user}/>}/>
        <Route path='/activities' element={<Activities user={user} activities={activities} setActivities={setActivities} />} />
        <Route path='/routines' element={<Routines routines={routines} setRoutines={setRoutines}/>} />
        <Route path='/myroutines' element={<MyRoutines activities={activities} setActivities={setActivities} user={user}/>}/>
        {/* <Route path='/posts/:id/edit' element={<Edit currentPostInput={currentPostInput} />} /> */}
        {/* <Route path='/posts/:id/delete' element={<Delete  post={currentPostInput}/>} /> */}
        {/* <Route path='/posts/:id/message' element={<Message post={currentPostInput}/>} /> */}
        {/* <Route path='/posts' element={<Posts posts={filteredPosts} user={user} setCurrentPostInput={setCurrentPostInput} setPosts={setPosts} setFilteredPosts={setFilteredPosts}/>} /> */}
        {/* <Route path='/profile' element={<Profile user={user} posts={posts}/>} /> */}
        {/* <Route path='/createpost' element={<CreatePost user={user} posts={posts}/>} */}
      </Routes>
    </Router>
  );
}

export default App;
