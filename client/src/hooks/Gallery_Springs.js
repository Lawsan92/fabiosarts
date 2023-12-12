import { useSpring, useSprings, useTransition } from '@react-spring/web';

const Gallery_Springs = {
  gallery_footer_spring: () => {
    const springStyles = {
      from: {
        opacity: 0,
        transition: '1s ease-in',
      },
      to: {
        opacity: 1,
        transition: '1s ease-in',
      }
    }
    return useSpring(springStyles);
  }
}

export default Gallery_Springs;