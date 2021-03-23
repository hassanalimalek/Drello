import React from 'react'
import { useState,useEffect } from 'react'

import drello1 from '../../assets/img/drello_1.jpg'
import drello2 from '../../assets/img/drello2.gif'
import drello3 from '../../assets/img/drello3.gif'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { indigo, blue, blueGrey } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";

function Index() {
    const [handleOpen, setHandleOpen] = useState({ open: true });

    
    useEffect(() =>{
        let modalState = localStorage.getItem('modalState');
        if(modalState){
            setHandleOpen({ open:false})
        }
    },[])

    const matches = useMediaQuery("(max-width:800px)");

    // Carousel Modal
    const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
    return (
        <div>
        <AutoRotatingCarousel
            label="Get started"
            open={handleOpen.open}
            interval = {15000}
            onClose={() => 
            { localStorage.setItem('modalState',JSON.stringify('true'));
            setHandleOpen({ open: false })}}
            onStart={() => setHandleOpen({ open: false })}
            autoplay={true}
            mobile={isMobile}
            style={{ position: "absolute" }}
        >
            <Slide
            media={
                <img alt="intoImg" className="stylesImg" src={drello1} />
            }
            mediaBackgroundStyle={{ backgroundColor: indigo[500] }}
            style={{ backgroundColor: indigo[900] }}
            title="Welcome to Drello"
            subtitle="Your Go to app for managing your tasks"
            />
            <Slide
            media={
                <img alt="intoImg" className="stylesImg" src={drello2} />
            }
            mediaBackgroundStyle={{ backgroundColor: blue[600] }}
            style={{ backgroundColor: blue[900] }}
            title="Manage Tasks"
            subtitle="Manage your tasks across the Todo,Doing and Done Task lists. Drag and drop tasks among them or outside to remove a task"
            />
            <Slide
            media={
                <img alt="intoImg" className="stylesImg" src={drello3} />
            }
            mediaBackgroundStyle={{ backgroundColor: blueGrey[600] }}
            style={{ backgroundColor: blueGrey[800] }}
            title="Change Background"
            subtitle="Change the background just the way you like it. Either be it an image from unsplash or a color of your choice"
            />
        </AutoRotatingCarousel>
        </div>
    );
    };

    return (
        <div>
             <AutoRotatingCarouselModal
              autoplay = {true}
              interval = {500}
                isMobile={matches}
                handleOpen={handleOpen}
                setHandleOpen={setHandleOpen}
            />
            
        </div>
    )
}

export default Index
