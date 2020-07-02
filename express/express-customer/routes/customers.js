const express = require('express');
const router = express.Router();
const db = require('../db/conf');
const { route } = require('.');


/************** REQUETE GET **********************/
router.get('/', function(req, res, next) { 
  const query = {
    text: `SELECT * FROM customer`
  }
  db.query(query, (error, result) => {
    
    if(error){ //On passe un objet en argument à next, pour qu'il reconnaisse le middleware d'erreur (avec les 4paramètres)
      next({
        status: 500,
        message: 'Erreur de la requête !'
      });
      return;
    }
    console.log(error, result);
    const customer = result.rows;
    if (customer){
      res.send(customer);
    } else {
      res.status(404).send({
        error: 'NOT_FOUND',
        message: 'Customer not found'
      });
    }
    
  });

});

/************** REQUETE GET *****************************/
router.get('/:id', function(req, res, next) { // "/:id" là on lui dit que ca peut prendre n'importe quelle valeur, il la recupere dans la valeur id 
  const customerId = +req.params.id; // le "+" c'est pour convertir en number
  const query = {
    text: `SELECT * FROM customer WHERE id = $1`,
    values: [customerId]
  }
  db.query(query, (error, result) => {
    
    // if(error){
    //   throw error; // On lève l'excéption, et ensuite il regarde si il y a un catch dans la fonction, ou dans les fonctions parent, sinon le serveur node s'arrète
    // }
    if(error){ //On passe un objet en argument à next, pour qu'il reconnaisse le middleware d'erreur (avec les 4paramètres)
      next({
        status: 500,
        message: 'Erreur de la requête !'
      });
      return;
    }
    console.log(error, result);
    const customer = result.rows[0];
    if (customer){
      res.send(customer);
    } else {
      res.status(404).send({
        error: 'NOT_FOUND',
        message: 'Customer not found'
      });
    }
    
  });

});

/************** REQUETE POST *************************/
router.post('/', function(req, res, next) {
  const customer = req.body;
  const query = {
    text: `INSERT INTO customer (firstname, lastname, email)
           values ($1, $2, $3)
           RETURNING *`,
    values: [customer.firstname, customer.lastname, customer.email]
  }

  db.query(query, (error, result) => {
    if(error){
      throw error;
    }
    const insertedCustomer = result.rows[0];
    res.send(insertedCustomer);
  })
})

/************** REQUETE DELETE *****************************/
router.delete('/:id', function(req, res, next) {
  const customerId = req.params.id;
  const query = {
    text: "DELETE FROM customer WHERE id = $1",
    values: [customerId]
  }
  db.query(query, (error, result) => {
    if(error){
      throw error;
    }
    if(result.rowCount === 0){
      next({
        status: 404,
        message: 'Customer not found'
      });
      return;
    }
    res.status(204).send();
  })
})

/************** REQUETE PUT *************************/
router.put('/:id', function(req, res, next) {
  const customerId = +req.params.id;
  const customer = req.body;
  if (customer.id && customerId !== customerId){
    return next({
      status: 400,
      message: 'Customer identifier must not be modified'
    });
  }
  const query = {
    text: `UPDATE customer 
           SET firstname = $1, lastname = $2, email = $3
           WHERE id = $4
           RETURNING *`,
    values: [customer.firstname, customer.lastname, customer.email, customerId]
  }

  db.query(query, (error, result) => {
    if(error){
      throw error;
    }
    const updateCustomer = result.rows[0];
    res.send(updateCustomer);
  })
})

// Exemple de parametre de la route (url) : /customers/123/adresses/45 , on recupere avec req.params.customerId et req.params.addressId
// Exemple de paramètre d'une querystring : /search?q=lobi&order=desc, on recupere avec req.query.q et req.query.order
module.exports = router;
