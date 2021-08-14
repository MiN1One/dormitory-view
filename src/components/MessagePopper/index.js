import ReactDOM from 'react-dom';
import Message from './Message';

export const messageCreator = (message) => {
  const container = document.querySelector('.m-pop');

  const item = document.createElement('div');
  item.dataset.id = message.id;
  item.className = 'm-pop__item-wrapper';
  container.insertAdjacentElement('afterbegin', item);

  const props = {
    onEndMessage: () => {
      ReactDOM.unmountComponentAtNode(item);
      item.remove();
    },
    message,
    key: message.id
  };
  
  ReactDOM.render(<Message {...props} />, item);
};

const MessagePopper = () => <div className="m-pop" />;

export default MessagePopper;