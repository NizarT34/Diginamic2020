"use strict"; //Cette instruction permet de ne pas mettre "let, var, ou const" devant les variables

// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function () {
  //Declaration de la fonction constructeur
  /**
   * Constructeur de Card
   * @param  {string} question
   * @param  {string} answer
   */
  function Card(question, answer) {
    //Propriétés de l'objet
    this.question = question;
    this.answer = answer;

    //Méthode Getter de question
    this.getQuestion = function () {
      return this.question;
    }
    // méthodes Getter de reponse
    this.getAnswer = function () {
      return this.answer;
    }

    console.log(this);
  }
  //Instanciation d'une carte
  const card1 = new Card("Comment s'appelle le créateur du Web ?", "Tim Berners Lee");
  const card2 = new Card("Question", "Reponse");
  // console.log(card1.getQuestion);
  // console.log(card1.getAnswer);
  console.log(card1);
  console.log(card2);


})(); //Appel de la fonction anonyme