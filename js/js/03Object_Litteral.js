"use strict"; //Cette instruction permet de ne pas mettre "let, var, ou const" devant les variables

// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function () {
  /**
   * Objet littéral ou plain object qui est à l'origine de 
   * la syntaxe Json (format de donnée avec une propriété et sa valeur) javascript object notation 
   * @param {string}: lastname
   * @param {string}: firstname
   * @param {number}: age 
   */
  const p1 = {
    lastname: "Dylan", 
    firstname: "Bob",
    age: 79,
    introduceMyself: function () {
      console.log("Bonjour, je m'appelle " + 
      this.firstname + " " + this.lastname);
      
    }
  }
  
  console.log("first name : ", p1.firstname); //Difference entre la "," et le "+", c'est qu
  //une fonction appelée depuis l'instance d'un objet est une méthode
  p1.introduceMyself();
  


})(); //Appel de la fonction anonyme