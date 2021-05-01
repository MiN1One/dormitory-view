export const preloadImages = (img, cbStart, cbFin) => {
  if (img) {
    cbStart();
    const imagePreloader = new Image();

    imagePreloader.src = img;

    if (imagePreloader.complete) {
      cbFin();
      imagePreloader.onload = null;
    } else {
      imagePreloader.onload = () => {
        cbFin();
        imagePreloader.onload = null;
      };
    }
  }
};