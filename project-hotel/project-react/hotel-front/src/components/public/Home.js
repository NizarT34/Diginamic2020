import React, { Component } from 'react';
import Header from '../common/Header';
import FetchData from '../../services/FetchData';
import './home.css';
//Bonjour

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: null,
      reservationAvailable: null,
      error: null,
      isDeleted: null,
      showInfo: "block",
    }
    this.fd = new FetchData();
  }
  handleSubmit = async (event) => {
    console.log('Dans handleSubmit');
    event.preventDefault();

    const payloadReservationAvailable = {
      start: event.target.querySelector("#start-date").value,
      end: event.target.querySelector("#end-date").value,
      persons: event.target.querySelector("#nb-person").value,
    }

    console.log('Request : ', payloadReservationAvailable);
    

    // Liste des réservations disponibles 
    try {
      const reservationsAvailable = await this.fd.getReservationsAvailable(payloadReservationAvailable);
      // copie du state
      const copy_state = { ...this.state };
      // Modification de la copie du state
      copy_state.reservationAvailable = reservationsAvailable;
      copy_state.showInfo = "none";

      this.setState(copy_state);
    } catch (err){
      console.log('Erreur ', err);
      const copy_state = { ...this.state };
      // Modification de la copie du state
      copy_state.showInfo = "none";
      this.setState(copy_state);
    }

  }

  handleAddReservation = async (event, categoryId) => {
    event.preventDefault();

    const payload_reservation = {
      start: document.getElementById('start-date').value,
      end: document.getElementById('end-date').value,
      persons: document.getElementById('nb-person').value,
      category: categoryId 
    }
    console.log('request : ', payload_reservation);

    // // POST
    try {
      const reservation = await this.fd.postReservation(payload_reservation);
      console.log('reservation ', reservation);
      // copie du state
      const copy_state = { ...this.state };
      // Modification de la copie du state
      copy_state.reservation = reservation;
      copy_state.reservationAvailable.list = copy_state.reservationAvailable.list.filter(e => !e.available);

      copy_state.showInfo = "none";
      this.setState(copy_state);
      
    } catch (error) {
      const copy_state = { ...this.state };
      // Modification de la copie du state
      copy_state.error = error;
      copy_state.showInfo = "none";
      this.setState(copy_state);
    }
  }

  render() {
    return (
      <div>
        <Header path="/" />
        <div className="container">
          <div className="row headband">
            <div className="col-md-8">

            </div>
            <div className="col-md-4">
              <div id="wrapper-form">
                <h2 className="">Réserver cet hôtel</h2>
                <form onSubmit={this.handleSubmit} className="form-group" id="form-reservation">
                  <label htmlFor="start-date" id="startdate">
                    Date d'arrivée :
                  <input required className="form-control" id="start-date" type="date" defaultValue={""} />
                  </label>
                  <label htmlFor="end-date" id="enddate">
                    Date de départ :
                  <input required className="form-control" id="end-date" type="date" defaultValue={""} />
                  </label>
                  <label htmlFor="nb-person" id="nbperson">
                    Nb de personnes :
                  <input required className="form-control" id="nb-person" type="number" min="1" max="3" />
                  </label>
                  <input className="bg-dark text-light btn" type="submit" value="Réserver" id="submit-reservation" />
                </form>
              </div>
            </div>
          </div>
          <div className="row bg-dark">
            <div className="col-12 text-light">
              <ul className="list-unstyled d-flex" id="list-services">
                <li>Parking</li>
                <li>WIFI/Accès Internet</li>
                <li>Petit-Déjeuner</li>
                <li>Bar</li>
                <li>Restaurant</li>
                <li>Air Conditionné</li>
                <li>+ 17 services</li>
              </ul>
            </div>
          </div>
          <section className={`d-${this.state.showInfo}`}>
            <article>
              <h3 className="h3-presentation">Présentation </h3>
              <p> La Residence Hotel est situé en plein cœur du centre-ville et centre plage des Sables d’Olonne. Ainsi, il vous sera très facile de venir découvrir et profiter des animations qu’offre la station balnéaire des Sables d’Olonne toute au long de l’année. <br/> <br/>

                Entièrement rénové en fin d’année 2015, l’Hôtel SPA Arc En Ciel vous invite à un voyage entre le charme intemporel de notre salle du XIXème siècle et le confort de la modernité de nos 39 chambres et de nos espaces d’accueil ouvert à tous. <br/> <br/>

                En effet, plus qu’un simple hôtel, vous trouverez au sein de l’Hôtel SPA Arc En Ciel, toute une gamme de services annexes afin de répondre à chacune de vos demandes. Outre nos 39 chambres à thème, nous vous invitons à venir essayer les équipements de nos espaces détentes : Spa, Institue de soins, bar, espace fitness, sauna, fauteuil massant et espace pique-nique vous séduirons que vous soyez en famille entre amis ou en couple. <br/> <br/>

                Ouvert toute l’année, nous vous proposons de bénéficier de tarifs exclusifs lors de vos déplacements professionnels. Formule BandB (bed and breakfast) ou Soirée Etape sont au programme. Ne disposant pas de restaurant au sein même de notre établissement, l’Hôtel SPA Arc En Ciel travaille en partenariat avec plusieurs restaurants du centre-ville et du port de pêche des Sables d’Olonne. <br/> 
                Tous sont accessibles rapidement et facilement à pied. De plus, il est à noter, que nous offrons dans nos forfaits, à nos clients VRP un place dans notre parking privé et sécurisé. <br/> <br/>

                Notre salle de réunion de 40 m² pouvant accueillir 35 personnes, vous est également proposée pour l’organisation de vos séminaires, journées d’études et autre show-rooms. N’hésitez pas à nous contacter pour plus de renseignements. <br/> <br/>

                La rigueur, la disponibilité et la fantaisie de notre équipe vous garantissent propreté, écoute et réactivité, alors n’attendez plus, et réservez votre séjour à l’Hôtel SPA Arc En Ciel, vous ne serez pas déçu !
              </p>
            </article>
          </section>
          {this.state.reservationAvailable &&
            (<div> 
               <h3 className="h3-presentation" >Toutes les réservations disponibles</h3>
               <ul className="list-unstyled">
                <li>Date d'arrivée : {document.getElementById('start-date').value}</li>
                <li>Date de départ : {document.getElementById('end-date').value}</li>
                <li>Nombre de nuit(s) : {this.state.reservationAvailable.nights}</li>
                <li>Nombre de personne(s) : {document.getElementById('nb-person').value}</li>
               </ul>
               <div className="table-responsive"> 
                <table className="table table-striped table-borderless">
                  <thead className="thead-dark">
                      <tr>
                        <th>Catégorie de chambres</th>
                        <th>Description</th>
                        <th>Prix</th>
                        <th>Réservation</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.state.reservationAvailable.list.map((available, index) => {
                      return(
                      <tr key={index}>
                        <td>{available.category.name}</td>
                        <td>{available.category.description}</td>
                        <td>{available.price}</td>
                        <td><button className="btn btn-success" onClick={(event) => this.handleAddReservation(event, available.category.id)}>Réserver</button></td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            </div>)}
          
          {(this.state.error && (<section>
                  <h3 className="h3-presentation" >Réservation</h3>
                  <p>Une erreur est survenue lors de la réservation ! </p>
                  <p>Code erreur {this.state.error.statusCode}: {this.state.error.message}</p>
                </section>))}
        </div>

      </div>
    );
  }
}

export default Home;