import React, { Component } from 'react';
import FetchData from '../../../services/FetchData';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Reservation extends Component {
  constructor(props) {
      super(props);
      this.state = {
          reservations: [],
          error: false,
          
      };
      this.fd = new FetchData(); // Singleton

  }
  successReservation = (data) => {
      console.log('Dans successReservation');
      // copie du state
      const copy_state = { ...this.state };
      // Modification de la copie du state
      copy_state.reservations = data;

      this.setState(copy_state);
  }
  failedReservation = (error) => {
      console.log('Dans failedReservation ', error);
      // copie du state
      const copy_state = { ...this.state };
      // Modification de la copie du state
      copy_state.error = error;

      this.setState(copy_state);

  }


  handleDeleteRow = (event, code) => {
    event.preventDefault();

    confirmAlert( {
      title: 'Annulation de la réservation',
      message: 'Êtes vous sûr de vouloir annuler cette réservation ?',
      buttons: [
        {
          label: 'Oui',
          onClick: async () => {
              try {
                const rowDelete = await this.fd.deleteReservation(code);
                // window.location.reload(false);
                const copy_state = { ...this.state };
                // Modification de la copie du state
                copy_state.reservations = copy_state.reservations.filter(reservation => reservation.code !== rowDelete.code);
                this.setState(copy_state);
              } catch (err){
                console.log('Error : ', err);
              }
          }
        }, 
        {
          label: 'Non',
          onClick: () => console.log('NON')
        }
        
      ],
      }
    );

  }

  componentDidMount = async () => {
      try {
          const data = await this.fd.getReservations(); // il faut obligatoirement
          // que getReservations retourne une promesse
          console.log('data après le await : ', data);
          this.successReservation(data);

      } catch (error){
          this.failedReservation(error);
      }
  }
  render() {
      return (
          <div className="col">
              <h2>Réservation</h2>
              {this.state.error && (
                  <div>
                      <h2 className="text-danger">Erreur</h2>
                      <p className="text-danger">Code de l'erreur : {this.state.error.message}</p>
                      <p>Merci de contacter l'administrateur : admin@hotel.com</p>
                  </div>
              )}
              <table className="table table-responsive-lg">
                  <thead className="table-dark">
                      <tr>
                          <th>ID</th>
                          <th>Catégorie</th>
                          <th>Date de début</th>
                          <th>Date de fin</th>
                          <th>Nb de personnes</th>
                          <th>Nb de nuits</th>
                          <th>Annulation</th>

                      </tr>
                  </thead>
                  <tbody>
                  {this.state.reservations.map(reservation => {
                      return (
                          <tr key={reservation.id}>
                              <td>{reservation.id}</td>
                              <td>{reservation.categoryId}</td>
                              <td>{reservation.startDate}</td>
                              <td>{reservation.endDate}</td>
                              <td>{reservation.data.persons}</td>
                              <td>{reservation.data.nights}</td>
                              <td><button className="btn btn-danger text-white" onClick={(event) => this.handleDeleteRow(event, reservation.code)}>Annuler</button></td>
                          </tr>
                      )

                  })}
                  
                  </tbody>
              </table>
          </div>
      );
    }
  }

export default Reservation;
