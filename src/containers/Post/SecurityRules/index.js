import Rules from './Rules';
import Security from './Security';

const SecurityRules = (props) => {
  return (
    <div className="post__section" id="securityrules">
      <div className="container">
        <div className="post__section__item">
          <div className="post__list-wrapper">
            <Security {...props} />
          </div>
          <div className="post__list-wrapper">
            <Rules {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityRules;