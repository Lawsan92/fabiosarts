const HandleKeyEvents = (scrollRef, galleryRef, handleSphereSelect, scrollToImg, getScrollIndex, getModalImgSource, handleModal) => {

  document.addEventListener('keydown', (e) => {

    const [UP, DOWN, ESCAPE] = [e.keyCode === 38, e.keyCode === 40, e.key === 'Escape'];

    if (UP) {
      e.preventDefault();
      scrollRef.current <= 0 ? scrollRef.current = galleryRef.current.length - 1 : scrollRef.current = scrollRef.current - 1;
      handleSphereSelect(scrollRef.current);
      scrollToImg(scrollRef.current);
      getScrollIndex(scrollRef.current);
      let galleryArr = Array.from(galleryRef.current)
      getModalImgSource(galleryArr[scrollRef.current].url);
    } else if (DOWN) {
      e.preventDefault();
      scrollRef.current >= galleryRef.current.length - 1 ? scrollRef.current = 0 : scrollRef.current =  scrollRef.current + 1;
      handleSphereSelect(scrollRef.current);
      scrollToImg(scrollRef.current);
      getScrollIndex(scrollRef.current);
      let galleryArr = Array.from(galleryRef.current)
      getModalImgSource(galleryArr[scrollRef.current].url);
    } else if ( ESCAPE) {
      handleModal(false);
    }
  });
}

export default HandleKeyEvents;