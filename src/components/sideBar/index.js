import React from 'react'
import cx from 'classnames'
import styles from '../../assets/css/sidebar.module.scss'
import photosImg from '../../assets/img/photos.jpg'
import colorsImg from '../../assets/img/colors.jpg'


import {SketchPicker} from 'react-color';
import { createApi } from 'unsplash-js';
import {useState,useEffect} from 'react'

import {BsArrowLeft,BsSearch} from 'react-icons/bs'
import {FaTimesCircle} from 'react-icons/fa'
import ClipLoader from "react-spinners/ClipLoader";


function Index(props) {

    // Loader State
    let [loading, setLoading] = useState(false);
    let color = "#ffffff"

    let [buttonsState,setButtonsState] = useState(true);
    let [photoState,setPhotoState] = useState(false);
    let [colorPickerState,setColorPickerState] = useState(false);

    // Background State
    let [images,setImages] = useState('');
    let [bgColor,setBgColor] = useState('');
    let [bgImg,setBgImg] = useState('https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&regular=format&fit=crop&w=1500&q=80');
    let [imgInputTxt,setImgInputTxt] = useState('');

    // Getting saved background State
    useEffect(() =>{

        let bgUrl = JSON.parse(localStorage.getItem("bgUrl"))
        let bgColor = JSON.parse(localStorage.getItem("bgColor"))
        if(bgColor){
            setBgColor(bgColor);
            setBgImg('');
        }
        else{
            setBgImg('https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&regular=format&fit=crop&w=1500&q=80');
        }
        if(bgUrl){
            setBgImg(bgUrl)
        }
       
    },[])

    
   
    // Fetch Images From Unsplash
    const unsplash = createApi({ accessKey: "HWuhCHW11ItQv6h4O66Aw0EBGvimFjejWweXr3F4A2E" });
    let fetchImages=  async (searchQuery)=>{
        setLoading(true);
        if(!searchQuery){
            searchQuery = "nature landscape"
        }
        let result = await unsplash.search.getPhotos({
            query: searchQuery,
            perPage: 14,
            page:1,
            orientation: 'landscape'
          })
       
        setImages(result.response.results);
        setLoading(false);
    }

    // Handle Background Change
    let handleBgImage = (url)=>{
        setBgColor('');
        setBgImg(url);
        localStorage.setItem('bgUrl',JSON.stringify(url));
    }
    let onBgColorChange = (color) => {
        localStorage.setItem('bgColor',JSON.stringify(color.hex));
        localStorage.setItem('bgUrl',JSON.stringify(''));
        setBgColor(color.hex);
        setBgImg(null);
    };

    // Images Jsx
    let renderImages = ()=>{
        if(images){
            return images.map(image =>{
                return (
                    <div key={image.id} className={styles.board_boarder}>
                         <span onClick={()=>{handleBgImage(image.urls.regular)}} className={styles.bgImg} style={{ backgroundImage: `url(${image.urls.small})` }}>
                        </span>
                    </div>
                )
            })
        }
    }

    // Showing JSX elements 
    let showPhotos =()=>{
        setImgInputTxt('');
        setPhotoState(true);
        setButtonsState(false);
        fetchImages();
    }
    let showColorPicker=()=>{
        setButtonsState(false);
        setPhotoState(false);
        setColorPickerState(true);
    }

    let hideSideBar = ()=>{
        setColorPickerState(false);
        setImgInputTxt('');
        setPhotoState(false)
        props.hideSideBar();
        setButtonsState(true)
    }
    
    return (
        <div  className={cx(styles.sideBar,props.sideBarState==='hide'? styles.hideSideBar:styles.showSideBar )}>
          <div className={styles.sideBarWrapper}>
            <style>{`body {background: url(${bgImg}) ${bgColor} no-repeat center/cover fixed !important;}`}</style>
            <h4 className={styles.sideBarTitle}>Change Background </h4>
            <span  onClick={hideSideBar}><FaTimesCircle className={styles.hideSideBarBtn}/></span>
            {/* Initial Option Buttons */}
            <div className={cx(styles.buttonsContainer,buttonsState ? styles.buttonsContainerShow: styles.buttonsContainerHide)}>  
                <div className={styles.buttonWrapper}
                onClick={showPhotos}>
                     <img alt="randImg" className={styles.photosImg} src={photosImg}></img>
                     <h3>Photos</h3>
                </div>
                <div className={styles.buttonWrapper}
                onClick={showColorPicker}>
                    <img alt="randImg 1" className={styles.colorsImg} src={colorsImg}></img>
                    <h3>Colors</h3>
                </div>
            </div>
            <div>
            {/* Images Section */}
            <div className={cx(styles.imageSectionContainer,photoState ? styles.photoContainerShow: styles.photoContainerHide)}>
                    <BsArrowLeft className={styles.backArrow} onClick={()=>{setButtonsState(true);setPhotoState(false)}}/>
                    <h4 className={styles.sideBarSubTitle}>Photos by Unsplash</h4>
                    <div></div>           
                <div className={styles.imgInputWrapper}>     
                    <input placeholder="Search..." className={styles.imgInput} value = {imgInputTxt} type="text" onChange={(e)=>{setImgInputTxt(e.target.value);fetchImages(imgInputTxt)}}/><BsSearch onClick={()=>{fetchImages(imgInputTxt)}} className={styles.searchIcon}/>
                </div>
                <div className={styles.imageGalleryWrapper}>
                  {renderImages()}
                </div>
            </div>
            {/* Color Picker */}
            <div className={cx(styles.colorPalette,colorPickerState ? styles.colorPickerShow: styles.colorPickerHide)}> 
                <BsArrowLeft className={styles.backArrow} onClick={()=>{setButtonsState(true);setColorPickerState(false)}}/>
                <SketchPicker width={220} className={styles.colorPaletteActual} color={bgColor} onChangeComplete={ onBgColorChange }/>
            </div>  
            </div>  
            <div className={styles.loaderContainer}>
                <ClipLoader css={styles.cliploader} color={color} loading={loading}  size={50}  />
            </div>  
          </div>        
        </div>
    )
}

export default Index
