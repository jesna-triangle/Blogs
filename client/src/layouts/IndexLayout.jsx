import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const IndexLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default IndexLayout