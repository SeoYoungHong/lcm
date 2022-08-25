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
//asd
Amplify.configure(configure)
  
 function Router() {
    const [usenav, setusenav]=useState(1)
    return (
      <div className='Router'>
      
        <header>
        <h1>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={(<Home setusenav={setusenav}/>)} />
                <Route path="/about" element={About} /> 
                <Route path="/mission" element={(<Mission/>)} /> 
                <Route path="/challenge" element={(<Challenge setusenav={setusenav}/>)} /> 
                <Route path="/caresession" element={(<CareSession/>)} /> 
            </Routes> 
          <Navi usenav={usenav}/>
        </BrowserRouter>
        </h1>
        </header>
        
    </div>
    );
  }

export default Router