import store from './store';

// On "dispatche" une action
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug 1"
  }
});

store.dispatch({
    type: "bugAdded",
    payload: {
      description: "Bug 2"
    }
  });
  console.log("store : ", store.getState());
  store.dispatch({
    type: "bugUpdated",
    payload: {
      id: 1,
      description: "bug 1 modifié"
    }
  });

console.log("store : ", store.getState());
store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1
  }
});
console.log("store : ", store.getState());