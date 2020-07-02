"use strict";

(function () {
  const fruits = ['Banana', 'Pomme', 'Kiwi'];
  console.log(fruits);
  console.log("Nombre d'elements ", fruits.length);
  console.log("Le premier élément ", fruits[0]);
  console.log("Le dernier élément ", fruits[fruits.length-1]);
  
  //Ajouter un élement à un tableau
  fruits.push('Orange');
  console.log(fruits);
  //Trouver l'index du fruit pomme
  const index_of = fruits.indexOf('Pomme');
  console.log("Index de pomme : ", index_of);

  //transformation du tableau en un nouveau tableau
  const fruits_upper = fruits.map(function(fruit){
    return fruit.toUpperCase();
  } );

  console.log(fruits_upper);
  fruits.push('Fraise');
  console.log(fruits);
  console.log(fruits_upper);
  //Passage par référence ou par valeur ?
  const fruits_bis = fruits; //On fait la référence sur le tableau fruits, c-à-d si on ajoute un élément dans fruits, l'élement sera ajouter aussi à fruis_bis
  fruits.push('Melon');
  console.log(fruits_bis);
  
  const fruits_short = fruits.filter(fruit => fruit.length < 6);

  console.log('fruits short : ',fruits_short);
  
  
  
}) ();