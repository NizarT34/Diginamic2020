"use strict";

( function() {

  // Récupération d'un élément du DOM
  const h1 = window.document.getElementById("h1"); //Qd on utilise un const, on ne pas le réaffecter, donc quand on est pas sûr on met un const
  function Test(msg){
    this.msg = msg;
    console.log("this dans Test ", this);
    h1.onclick = event => {
      console.log("click sur le h1");
      console.log("event target : ", event.target);
      // Supprime le comportement par défaut (ici le chargement de l'url)
      event.preventDefault();
      // this
      console.log("this : ", this);
      
    };
  }

  const test1 = new Test("msg");
  
  
}) ();