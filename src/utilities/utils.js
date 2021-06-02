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

export const convertISOString = (iso) => {
  const format = (inp) => +inp < 10 ? `0${inp}` : inp;

  const 
    d = new Date(iso),
    month = d?.getMonth(),
    year = d?.getFullYear(),
    date = format(d?.getDate()),
    hours = format(d?.getHours()),
    mins = format(d?.getMinutes());

  return { year, month, date, hours, minutes: mins };
};