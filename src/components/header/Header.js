import React from 'react'
import { Carousel } from 'react-carousel-minimal';
import { imagesData } from '../../data/sliderImages'
import './header.css'

export default function Header() {

    const images = imagesData;
    const carStyle = {
        textAlign: "center",
        maxWidth: "15350px",
        maxHeight: "450px",
      }

    return (
        <>
            <div className='header'>
                GraffiTEE
            </div>
            <div style={{ textAlign: "center" }}>
                <Carousel
                    data={images}
                    time={2000}
                    width="1535px"
                    height="450px"
                    captionPosition="bottom"
                    automatic={true}
                    dots={true}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="darkgrey"
                    slideImageFit="cover"
                    style={carStyle}
                />
            </div>
        </>
    )
}
