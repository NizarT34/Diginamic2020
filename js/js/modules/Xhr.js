//http://jsonplaceholder.typicode.com/todos/
/**
 * @param  {string} url
 * @param  {string} method='GET'
 * @param  {boolean} async=true
 * @param  {function} getData
 */
export default class Xhr {
  constructor(url, sucess, fail, method = 'GET', async = true){
    this.url = url;
    this.method = method;
    this.async = async;

    this.req = new XMLHttpRequest();
    this.req.open(this.method, this.url, this.async);
    this.req.send(null);

    // Gestiondes evenement
    // Ceci n'est pas un appel direct de la fonction mais bien une référence à la fonction à appeler quand l'événement se produira
    //Asynchrone donc on donne la référence sans appel immédiat !!
    this.req.onload = () => {
      this.getData(event, sucess, fail);
    };

  }

  getData(event, sucess, fail){
    // On teste directement le status de notre instance de XMLHttpRequest
    if (this.req.status === 200) {
      // Tout baigne, voici le contenu de la réponse
      //verification que le json est valide
      try {
        //Verification que le json soit valide
        const data = JSON.parse(this.req.responseText);
        console.log("Contenu parsé : ", data);
        sucess(data);
        
      } catch (e){
        console.error("Parsing error in getData : ", e);
        fail(e.message);
      }
      console.log("Contenu", this.req.responseText);
    } else {
      // On y est pas encore, voici le statut actuel
      console.log("Statut actuel", this.req.status, this.req.statusText);
    }     
  }
  

}


