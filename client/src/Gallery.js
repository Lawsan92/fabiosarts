import React, { useState , useEffect} from 'react';
const axios = require('axios');


const Gallery = ({exhibits}) => {

  const [gallery, getGallery] = useState([]);

  const fetchGallery = () => {
    axios({
      url: '/cloudinary',
      method: 'get'
    })
      .then((response) => {
        console.log('response:', response);
        getGallery(response.data.data)
      })
      .catch((err) => {
        console.log('error:', err.stack)
      })
  }

  useEffect(() => {
    fetchGallery();
  }, [])

  return (
    <div className='gallery'>
      <h1>{exhibits.exhibit}</h1>
      {gallery.map((url) => {
        return <img src={url}/>
      })}
    </div>
  )
}

export default Gallery;