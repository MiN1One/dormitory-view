import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const Scrollbar = React.forwardRef((props, ref) => 
  <Scrollbars 
    {...props}
    ref={ref}
    // style={{ width: '100vw', height: '100vh' }}
    // renderThumbVertical={() => <div className="scroll__thumb" />}
    autoHide
    autoHideTimeout={1500}
    autoHideDuration={250}>
      {props.children}
  </Scrollbars>);

export default Scrollbar;