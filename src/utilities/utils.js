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

export const copyToClipboard = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const parseQuery = (query) => {
  const queries = window.location.search.substr(1).split('&');

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

export const formatPrice = (price) => {
  let p = `${price}`;
  let decimal, arr = [], firstPart;

  if (p.includes('.')) {
    const [main, dec] = p.split('.');
    p = main;
    decimal = dec;
  }

  if (p.length % 3 !== 0) {
    firstPart = p.slice(0, p.length % 3);
    arr.unshift(firstPart);
  }
  
  for (let i = p.length % 3; i < p.length; i+=3) {
    arr.push(p.slice(i, i + 3));
  }

  if (arr.length > 1) {
    p = arr.join(',');
  }

  return `${p}${decimal ? `.${decimal}` : ''}`;
};

export const objectsEqual = (obj1, obj2) => {
  if (isEmptyObject(obj1) && isEmptyObject(obj2)) {
    return true;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  
  for (let key in obj1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') 
      if (!objectsEqual(obj1[key], obj2[key])) return false;

    else if (obj1[key] instanceof Array && obj2[key] instanceof Array)
      if (!obj1[key].isEqual(obj2[key])) return false;

    else if (obj1[key] !== obj2[key])
      return false;
  }
  
  return true;
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

export const calculateNavTopOffset = () => {
  const headerHeight = document.querySelector('[role="navigation"]')?.offsetHeight;
  const spyNavHeight = document.querySelector('.snav')?.offsetHeight;

  return +headerHeight + +spyNavHeight;
};

export const scrollToElement = (elId, offsetMarginal) => {
  const el = document.getElementById(elId);

  if (!el) return;
  const { top } = el.getBoundingClientRect();

  const y = top + window.pageYOffset - (calculateNavTopOffset() + offsetMarginal);
  console.log(y);
  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
};