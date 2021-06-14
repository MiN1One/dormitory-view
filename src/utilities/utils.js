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
      return decodeURI(element[1]);
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
    minutes = format(d?.getMinutes());

  return {
    year: year && year,
    month: month && month,
    date: date && date,
    hours: hours && hours,
    minutes: minutes && minutes
  };
};

export const isEmptyObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

export const sort = ({ list, property, order, isDate }) => {
  function getMs(el) {
    return new Date(el)?.getTime();
  }

  const temp = [...list];
  if (order === '+') {
    temp.sort((a, b) => {
      property && property.forEach((el) => {
        a = a[el];
        b = b[el];

        if (isDate) {
          a = getMs(a);
          b = getMs(b);
        }
      });

      return +a - +b;
    });
  } else if (order === '-') {
    temp.sort((a, b) => {
      property && property.forEach(el => {
        a = a[el];
        b = b[el];

        if (isDate) {
          a = getMs(a);
          b = getMs(b);
        }
      });

      return +b - +a;
    });
  }

  return temp;
};

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Array.prototype.isEqual = function(arr) {
  if (!arr) return false;

  if (this.length !== arr.length)
    return false;

  for (let i = 0; i < arr.length; i++) {
    if (this[i] instanceof Array && arr[i] instanceof Array) {
      if (!this[i].isEqual(arr[i]))
        return false;
    } else if (this[i] !== arr[i]) {
      return false;
    }
  }

  return true;
}

Object.defineProperty(Array.prototype, 'isEqual', { enumerable: false });