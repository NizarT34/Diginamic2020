"use strict"; //Cette instruction permet de ne pas mettre "let, var, ou const" devant les variables

// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function () {
  /**
   * Constructeur 
   * @param {number} radius 
   * @param {string} name 
   */
  function Circle(radius, name){
    this.radius = radius;
    this.name = name;
    
  }
  // Chaque objet créé, une propriété privée contient un lien vers un objet prototype
  Circle.prototype.pi = 3.14;
  Circle.prototype.area = function () {
    let area = this.pi * (Math.pow(this.radius, 2));
    console.log("l'aire du "+ this.name + " est égal : "+ area);
  }
  const circle1 = new Circle(2, "petit_cercle");
  const circle2 = new Circle(4, "grand_cercle");

  circle1.area();
  circle2.area();

  console.log("Circle : "+circle1);
  

})(); //Appel de la fonction anonyme