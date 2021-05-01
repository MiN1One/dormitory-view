import { Scrollbars } from 'react-custom-scrollbars';

const Scrollbar = (props) => 
  <Scrollbars 
    className="auth"
    style={{ width: '100vw', height: '100vh' }}
    renderThumbVertical={() => <div className="scroll__thumb" />}>
      {props.children}
  </Scrollbars>;

export default Scrollbar;