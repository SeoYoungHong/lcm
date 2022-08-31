import React, {useEffect, useState} from 'react'
import Navi from './Navi'

import {BrowserRouter, Routes, Route,} from 'react-router-dom';
  
import Home from './Home';
import About from './About';
import Mission from './Mission';
import Challenge from './Challenge';
import CareSession from './CareSession';
import {Amplify} from 'aws-amplify'
import {withAuthenticator} from '@aws-amplify/ui-react'
import configure from './aws-exports'
import HomeFoodDetail from './HomeFoodDetail';
import HomeFood from './HomeFood';
import logo from './icons/logo_manjil.png' 
import './css/Router.css'

//asd
Amplify.configure(configure)
  
  function Router() {
    const [usenav, setusenav]=useState(1)
    return (
      <div className='Router'>
      
        {usenav===1 ? <header><img src={logo} width='140' height='50'/></header>: null}  
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={(<Home setusenav={setusenav} />)} />
              <Route path="/about" element={About} /> 
              <Route path="/mission" element={(<Mission/>)} /> 
              <Route path="/challenge" element={(<Challenge setusenav={setusenav}/>)} /> 
              <Route path="/food/:id" element={(<HomeFoodDetail setusenav={setusenav}/>)} />
              <Route path="/food" element={(<Home setusenav={setusenav} title={'Food'}/>)} />
              <Route path="/caresession" element={(<CareSession/>)} /> 
            </Routes> 
              
            <Navi usenav={usenav} class='Navi'/>
          </BrowserRouter>
        </div>
        
    );
  }

export default Router