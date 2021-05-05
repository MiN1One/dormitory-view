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

export const parseQuery = (query, queryString) => {
  const queries = queryString 
    ? queryString.substr(1).split('&') 
    : window.location.search.substr(1).split('&');

  for (let i = 0; i < queries.length; i++) {
    const element = queries[i].split('=');
    if (element[0] === query)
      return element[1];
  }
};