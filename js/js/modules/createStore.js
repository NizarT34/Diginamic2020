function createStore() {
  let state = 0;
  function getState() {
    return state;
  }
  return {
    getState // Ca renvoit la référence de la fonction getState (le code de la fonction) /!\ 
  }
}
export default createStore();