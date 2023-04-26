import React from 'react'
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "../../components";
import ProgressLoader from '../../components/ProgressLoader';


const Home = ({ user,isLoading }) => {
  return (
    <div className='relative z-0 bg-primary'>
      {isLoading && (<ProgressLoader />)} 
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar user={user} />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  )
}

export default Home