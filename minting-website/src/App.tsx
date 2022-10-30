import React from 'react';
import logo from "./assets/images/bithumb-logo.png";
import './App.scss';
import {Button} from '@mui/material';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainPage />
      {/* <Navbar />
      <div className='main-expl'>
        <div className='main-expl-head'>
          BTA-NFT
        </div>
        <div>
          <img src={logo} className="bt-logo-img" alt='빗썸 로고' />
        </div>
        <div className='main-expl-body'>
          빗썸 테크 아카데미 NFT를 민팅하고 크롬 익스텐션을 다운로드 받아 뱃지를 트위터에서 확인해보세요.
        </div>
      </div>
      <Button variant="contained">Minting</Button>
      <Button variant="outlined">Download extension</Button> */}
    </div>
  );
}

export default App;
