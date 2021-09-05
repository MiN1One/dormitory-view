import { LazyLoadComponent } from 'react-lazy-load-image-component';

import Spinner from '../components/UI/Spinner/Spinner';

export const Loader = ({ sectionId }) => (
  <div className="container" id={sectionId}>
    <div className="flex jcc">
      <Spinner className="loader-lazy loader--lg" />
    </div>
  </div>
);

const LazyLoad = ({ children, sectionId }) => (
  <LazyLoadComponent
    placeholder={<Loader sectionId={sectionId} />}>
      {children}
  </LazyLoadComponent>
);

export default LazyLoad;
