import React, { useState } from 'react'
import Main from './components/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NodesDetails from "./components/NodesDetails";
import ManageNodes from "./components/ManageNodes";
import AllRecord from './components/AllRecord';


export default function App() {
  const [showAlert, setShowAlert] = useState(false)
  const myAlert = () => {
    setShowAlert(true)
  }
  const closeAl = () => {
    setShowAlert(false)
  }
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/nodes-details' element={<NodesDetails/>} />
        <Route path='/manage-nodes' element={<ManageNodes showAlert={showAlert} closeAl={closeAl} myAlert={myAlert} />} />
        <Route path='/all-record' element={<AllRecord/>} />
      </Routes>
    </Router>
    </>
  )
}
