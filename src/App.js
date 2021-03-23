import './App.css';
import Header from './components/header'
import Subheader from './components/subheader';
import Board from './components/board';
import SideBar from './components/sideBar';
import IntroModal from './components/introModal'

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";



import { useState } from 'react'

function App() {

  let [sideBarState,setSideBarState] = useState("hide");
  
  let [loading, setLoading] = useState(true);
  let color = ("#111");
  const override = css`
  display: block;
  color:black;
  margin: 0 auto;
`;


  let showSideBar = ()=>{
    setSideBarState("show")
  }
  let hideSideBar = ()=>{
    setSideBarState("hide");
  }
  setTimeout(()=>{
    setLoading(false);
  },3000)

 
  
  if(loading){
    return (
      <div className="loaderContainer">
         <HashLoader color={color} loading={loading} css={override} size={80} />
      </div>
    )
  }
  else{
    return (
      <div >
        <IntroModal/>
        <Header/>
        <Subheader showSideBar = {showSideBar} />
        <Board/>
        <SideBar sideBarState={sideBarState} hideSideBar={hideSideBar} />
      </div>
    );
  }
}

export default App;
