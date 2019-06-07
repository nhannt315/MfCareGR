import loadable from 'loadable-components';

import LoadingIndicator from '../LoadingIndicator';

export default loadable(() => import('./index.js'), {
  LoadingComponent: LoadingIndicator
});
