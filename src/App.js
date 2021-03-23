import './App.css';
import Header from './components/header'
import Subheader from './components/subheader';
import Board from './components/board';
import SideBar from './components/sideBar';

import { useState } from 'react'

function App() {

  let [sideBarState,setSideBarState] = useState("hide");

  let showSideBar = ()=>{
    setSideBarState("show")
  }
  let hideSideBar = ()=>{
    setSideBarState("hide");
  }


  return (
    <div >
      <Header/>
      <Subheader showSideBar = {showSideBar} />
      <Board/>
      <SideBar sideBarState={sideBarState} hideSideBar={hideSideBar} />
    </div>
  );
}

export default App;
