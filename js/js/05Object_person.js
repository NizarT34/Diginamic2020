"use strict";

(function () {
  /**
   * Classe pour construire un objet constructor
   * @param {string} lastname
   * @param {string} firstname
   */
  class Person {
    constructor(lastname, firstname){
      this.lastname = lastname;
      this.firstname = firstname;
    }

    introduceMyself() {
      console.log(`Bonjour je m'appelle ${this.firstname} ${this.lastname}`);
    }

  }
  /**
   * Constructeur de la classe Teacher qui hérite de la classe Person
   * @param  {string} lastname
   * @param  {string} firstname
   * @param  {string} diploma
   * @param  {function} introduceMyself
   * @param  {function} teach
   */
  class Teacher extends Person{
    constructor(lastname, firstname, diploma){
      super(lastname, firstname);
      this.diploma = diploma;
    }

    introduceMyself() {
      super.introduceMyself();
      console.log(`... et j'ai un diplôme de ${this.diploma}`);
    }

    teach(){
      console.log("J'enseigne");
    }
  }

  /**
   * Constructeur de la classe DeveloperTeacher qui hérite de la classe Teacher
   * @param  {string} lastname
   * @param  {string} firstname
   * @param  {string} diploma
   * @param  {function} teachJs
   */
  class DeveloperTeacher extends Teacher{
    teachJs(){
      console.log("J'enseigne le JS et c'est de la bombe ! ! !");
    }
  }

  const p1 = new Person("Stallman", "Richard");
  p1.introduceMyself();

  const teacher1 = new Teacher("Douenelle", "Yvan", "Master");
  teacher1.introduceMyself();
  teacher1.teach();

  const teacher2 = new DeveloperTeacher("Tialati", "Nizar", "Master");
  teacher2.introduceMyself();
  teacher2.teachJs();

}) ();