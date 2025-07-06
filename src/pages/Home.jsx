import React, { useEffect } from 'react'
import Items from '../components/Items'
import '../styels/Home.css';

const Home = ({searchTerm}) => {

  
  return (
    <div >
      <div className='img-container'>
      <img className='img' src="https://images.pexels.com/photos/8361544/pexels-photo-8361544.jpeg" alt="vial" />
      <img src="https://bcassetcdn.com/social/6ru57xswrs/preview.png" alt='icon' className='icon'/>
      </div>
      <Items searchTerm={searchTerm}/>
    </div>
  )
}

export default Home