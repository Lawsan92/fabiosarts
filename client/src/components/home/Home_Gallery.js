import React, { useState, useEffect, useRef } from 'react';
import { animated, useTransition } from '@react-spring/web';

const Home_Gallery = () => {

  const functionCalls = useRef(0);

  useEffect(() => {

  }, []);

  /*
        Width | Height
  body: 1512      686
    1 : 511       461 => 33.8% | 67.2%
    2:  887       486 => 58.7% | 70.8%
    3:  794       610 => 52.5% | 88.9%
    4:  567       558 => 37.5% | 81.3%
    5:  459       496 => 30.4% | 72.3%
    6;  770       586 => 51%% |  86.4%
  */

  const imageList = [
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200221/FABIO/2016/Sanzogni_Starry_night_40_x_30_mixed_media_on_canvas_e806sj.jpg',
      enterX: 0,
      inFrameX: 0,
      enterY: -200,
      inFrameY: 0,
      width: '33.8%',
      height:'67.2%',
      zIndex: 6
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200234/FABIO/2012/Time_1_acrylic_and_resin_on_aluminum_4_panel_48_x_96_p6pqmj.jpg',
      enterX: 500,
      inFrameX: -400,
      enterY: 0,
      inFrameY: 125,
      width: '58.7%',
      height:'70.8%',
      zIndex: 4
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200225/FABIO/2016/Sanzogni_Palmistry_36_x_54_mixed_media_on_canvas_JPG_wtkzwh.png',
      enterX: 500,
      inFrameX: 250,
      enterY: 0,
      inFrameY: 0,
      width: '52.5%',
      height:'88.9%',
      zIndex: 5
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200235/FABIO/2013/Sanzogni_Slum_city_mixed_media_on_aluminum_72_x_48_3_panels_znla3l.jpg',
      enterX: 500,
      inFrameX: -200,
      enterY: 0,
      inFrameY: 125,
      width: '37.5%',
      height:'81.3%',
      zIndex: 4
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200270/FABIO/oil%20on%20canvas%20abstract/Sanzogni_Upswing_68_x_53_oil_on_canvas_hjufwm.jpg',
      enterX: 500,
      inFrameX: 620,
      enterY: 0,
      inFrameY: 200,
      width: '30.4%',
      height:'72.3%',
      zIndex: 4
    },
    {
      url: 'https://res.cloudinary.com/ducqdbpaw/image/upload/v1685200235/FABIO/2013/Sanzogni_Megalopolis_mixed_media_on_aluminum_4_panels_96_x_48_ihxsuc.jpg',
      enterX: 500,
      inFrameX: -400,
      enterY: 700,
      inFrameY: 0,
      width: '51%',
      height:'86.4%',
      zIndex: 0
    }
  ]

    return imageList.map((img, i) => {
      return <img src={img.url} className={`img${i}`}/>
    });
};

export default Home_Gallery;

  // const image_Styles = imageList.map((image, i) =>  {
  //   const image_styles = {
  //     ...image, // <= "spread" operator, breaks down the image obj and gives iterable acces to its props
  //     enterFrameX: image.enterX,
  //     inFrameX: image.inFrameX,
  //     enterFrameY: image.enterY,
  //     inFrameY:
  //     image.inFrameY,
  //     i: i
  //   };
  //   // console.log(`image_styles:[${i}]`, image_styles);
  //   return image_styles;
  // });

  // const image_spring_Config = {
  //   from: (/*arg = image_Styles =>*/{ enterFrameX, color, enterFrameY }) => ({ opacity: 0, x: enterFrameX,y: enterFrameY, transition: '1s ease-in', color }),
  //   enter: (({ inFrameX, inFrameY }) => ({ opacity: 1, x: inFrameX, y: inFrameY, transition: '1s ease-in' })),
  //   leave: { opacity: 1, transition: '1s ease-in', x: 0, y: 0 },
  // };

  // const imageList_springTransitions = useTransition(image_Styles, image_spring_Config);;

  // const animateimageList = () => {
  //   functionCalls.current = functionCalls.current + 1;
  //   if (functionCalls.current <= 1) {
  //     return imageList_springTransitions((springStyles, state) => {
  //       return <animated.img src={state.url} style={{height: state.height, width: state.width, position: 'absolute', zIndex: state.zIndex, ...springStyles}} className={`image ${state.i}`} key={state.i}/>;
  //     });
  //   } else {
  //     const divStyle = {
  //       height: '74vh',
  //       width: '100vw',
  //       position: 'absolute',
  //       background: 'url("https://res.cloudinary.com/darp0mj9i/image/upload/v1702090971/Screenshot_2023-12-08_at_20.59.14_nruow6.jpg")',
  //       backgroundSize: 'cover'
  //     }

  //     return <div style={divStyle}></div>;
  //   }
  // }

  // // return <div style={{position: 'absolute', width: '100vw', height: '73vh', top: '16vh', overflow: 'hidden'}}>{animateimageList()}</div>
  // return animateimageList();

  // const divStyle = {
  //   height: '50vh',
  //   width: '100vw',
  //   position: 'absolute'
  // }

  // // return (
  // //   <div style={divStyle}>
  // //     {imageList.map((img) => {return <img src={img.url}/>})}
  // //   </div>
  // // );

  // // return imageList.map((img) => { functionCalls.current = functionCalls.current + 1;return <img src={img.url}/>});