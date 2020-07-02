"use strict"; //Cette instruction permet de ne pas mettre "let, var, ou const" devant les variables


// fonction anonyme immédiate IIFES qui permet d'isoler le code
(function () {
  //Création d'une arrow function, et d'une First Class Citizen (C'est une fonction qui retourne une fonction)
  let msg = "";
  /**
   * @param  {"+lastname+"} nomdefamille
   * @return  {string} nomdefamille
   */
  const helloLast = lastname => msg + "(nom de famille : " + lastname + ")";
  //Fonction qui renvoie une autre fonction 
  const helloFirst = firstname => {
    msg = "Hello " + firstname;
    return helloLast
  };
  console.log(helloFirst("Bob")("Dylan"));
  /**
   * fonction qui attend en paramètre une autre fonction (high order function)
   * @param  {string} toto
   * @return {void}
   */
  function test(toto) {
    toto(); // appel de la fonction passée en argument
  }
  test(() => { console.log("test") });

})(); //Appel de la fonction anonyme