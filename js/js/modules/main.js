// import {Person} from "./Person.js";
// import store from "./createStore.js";
// const p1 = new Person("Bob");
// console.log(p1);
// p1.introduceSelf();
// console.log("store state : ", store.getState());
// console.log("Fonction createStore ", store);


import Xhr from "./Xhr.js";
let data = [];

const xhr = new Xhr("http://127.0.0.1:5500/js/json/users.json", sucessGetData, failureGetData);

function sucessGetData(data){
  data = data;
}

function failureGetData(msg){
  console.error(msg);
  
}



