import { Scrollbars } from 'react-custom-scrollbars';

const Scrollbar = (props) => 
  <Scrollbars 
    {...props}
    // style={{ width: '100vw', height: '100vh' }}
    // renderThumbVertical={() => <div className="scroll__thumb" />}
    autoHide
    autoHideTimeout={1500}
    autoHideDuration={250}>
      {props.children}
  </Scrollbars>;

export default Scrollbar;