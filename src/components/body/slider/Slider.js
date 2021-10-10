import React, { useState, useEffect } from 'react'
import './slider.css'
import { imagesData } from '../../../data/sliderImages'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function Slider() {
    const images = imagesData;
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const lastIndex = images.length - 1;
      if(index < 0){
        setIndex(lastIndex);
      }
      if(index > lastIndex){
        setIndex(0);
      }
    },[index, images]);
  
    useEffect(() => {
      let slider = setInterval(() =>{
        setIndex(index + 1);
      }, 3000);
      return () => clearInterval(slider);
    }, [index]);
  
    return (
      <section className='section'>
        <div className='section-center'>
          {images.map((image, imageIndex) => {
            const {id, img} = image;
            let position = 'nextSlide';
            if(imageIndex === index){
              position = 'activeSlide';
            }
            if(imageIndex === index-1 || (index === 0 && imageIndex === images.lenght - 1)){
              position = 'lastSlide';
            }
            return(
              <article className={position} key={id}>
                <img src={img} alt={id} className='image-img'/>
              </article>
            );
          })}
          <button className='prev' onClick = {() => setIndex(index-1)}>
            <FiChevronLeft/>
          </button>
          <button className='next' onClick = {() => setIndex(index+1)}>
            <FiChevronRight/>
          </button>
        </div>
      </section>
    );
}
