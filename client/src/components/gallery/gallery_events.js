export const handleSelectPosition = () => {
  window.addEventListener('scroll', () => {
    getScrollPosition(document.documentElement.scrollTop + (window.innerHeight / 10))
  })
};