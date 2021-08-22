const Spinner = ({ className, message, warnMessage, warnIcon }) => (
  <div className={`loader ${className ? className : ''}`}>
    <div className="loader__spinner"></div>
    {message && <p className="loader__message">{message}</p>}
    {warnMessage && (
      <div className="loader__message-warn">
        {warnIcon}
        {warnMessage}
      </div>
    )}
  </div>
);

export default Spinner;
