export function injectSagas(store, sagas) {
  // if (Object.hasOwnProperty.call(store, 'runSaga')) return;
  sagas.map(store.runSaga);
}
