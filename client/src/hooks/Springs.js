import { useSpring, useSprings } from '@react-spring/web';

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

export const headerSpring = () => {
  return useSpring({
    from: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      color: '#808080',
      transition: '1s ease-in',
      top: '310px',
      left: '78px',
      position: 'absolute'
    },
    to: {
      backgroundColor: '#001133',
      color: '#fff',
      transition: '1s ease-in',
      top: '0px',
      left: '0px',
      position: 'absolute'
    }
  });
}
