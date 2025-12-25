import React, { useState } from 'react';

const useGeoApify = () => {

  var requestOptions = {
    method: 'GET',
  };

  return fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.GEOAPIFY_API_KEY}`, requestOptions);
};

export default useGeoApify;