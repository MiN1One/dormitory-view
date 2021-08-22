
import { FcUnlock } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <main className="post__success">
      <FcUnlock className="post__success__icon" />
      <div className="flex fdc mb-3 aic">
        <h1 className="heading heading--3 post__success__heading">Your post has successfully been sent for review!</h1>
        <h2 className="c-grey-l f-lg f-normal">It will be posted once it passes review</h2>
      </div>
      <Link to="/post/preview" className="btn btn--primary btn--wide btn--green c-white mb-15">
        Preview
      </Link>
      <div className="flex aic">
        <Link to="/" className="undl--h f-mid mr-3">
          Home
        </Link>
        <Link to="/profile/posts" className="undl--h f-mid">
          My posts
        </Link>
      </div>
    </main>
  );
}

export default Success;
