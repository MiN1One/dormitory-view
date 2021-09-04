import { useEffect, useRef } from 'react';

const usePrevious = (val) => {
  const prev = useRef();
  useEffect(() => prev.current = val);
  return prev.current;
}

export default usePrevious;
