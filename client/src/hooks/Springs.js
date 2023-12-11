import { useSpring, useSprings, useTransition } from '@react-spring/web';

export const gallerySpring = () => {
  return useSpring({
    from: {
      opacity: 0,
      transition: '2s ease-in'
     },
    to: {
      opacity: 1,
    }
  });
}

// export const headerSpring = () => {
//   return useSpring({
//     from: {
//       opacity: 0,
//       color: '#808080',
//       transition: '1s ease-in',
//       y: 280,
//       x: 65
//     },
//     to: {
//       opacity: 1,
//       color:'#338BA8',
//       transition: '1s ease-in',
//       y: 280,
//       x: 0
//     }
//   });
// }

export const headerSpring = (XYRef) => {
  console.log('headerSpring{XYRef}:', XYRef);
  return useSpring({
    from: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      color: '#808080',
      transition: '1s ease-in',
      y: XYRef.y,
      x: XYRef.x
    },
    to: {
      color: '#338BA8',
      transition: '1s ease-in',
      y: 300,
      x: 50,
      position: 'absolute'
    }
  });
}

export const mobileHeaderSpring = (XYRef) => {
  console.log('headerSpring{XYRef}:', XYRef);
  return useSpring({
    from: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      color: '#808080',
      transition: '1s ease-in',
      y: 280,
      x: 65
    },
    to: {
      backgroundColor: '#001133',
      color: '#fff',
      transition: '1s ease-in',
      y: 0,
      x: 0
    }
  });
}