import React from 'react'
import './App.css'
import Header from './components/header/Header'
import Body from './components/body/Body'
import Footer from './components/footer/Footer'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');
export default function App() {
  return (
    <div className='app'>
      <div>
        <Header/>
      </div>
      <div>
        <Body/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}
