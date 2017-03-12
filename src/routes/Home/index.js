import { injectReducer } from '../../store/reducers';
import { injectSagas } from '../../store/sagas';

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Email = require('./containers/EmailContainer').default;
      const reducer = require('./modules/reducer').default;
      const sagas = require('./modules/sagas').default;

      /*  Add the reducer to the store on key 'email'  */
      injectReducer(store, { key: 'mail', reducer });
      injectSagas(store, sagas);

      /*  Return getComponent   */
      cb(null, Email);

    /* Webpack named bundle   */
    }, 'home');
  }
});
