"use strict";

(function() {

  const jc = {
    nom: "Dusse",
    prenom: "Jean-Claude",
    sePresenter: function(){
      console.log("Bonjour, je m'appelle " +
      this.prenom + " " + this.nom);
    }
  }
  // utilisation de la boucle for in
  // en JS, les objets sont des tableaux associatifs
  for(let key in jc) {
    // Si la valeur est une fonction, on l'appelle
    if(typeof(jc[key]) == "function"){
      jc[key]();
    } else { //Sinon, on affiche la clé et la valeur de la propriété
      console.log("clé : ", key);
      console.log("valeur : ", jc[key]);
    }
  }

  // Tableau littéral à index
  var personnages = ["Harry","Hermione","Ron","Voldemore"];

  let taille = personnages.length;

  for(var i = 0; i < personnages.length; i ++) {
    console.log(personnages[i]);
  }

}) ();