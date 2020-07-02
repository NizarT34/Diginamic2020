class FetchData {
  constructor() {
    this.url = 'http://localhost:8000/';
    this.headers = {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("admin:admin") // btoa = encodage en base 64
    };
    this.credentials = "same-origin";
  }
  getReservations = () => {
    return fetch(`${this.url}admin/reservations`, {
      credentials: this.credentials,
      method: "GET",
      headers: this.headers
    }).then(function (response) {
      console.log('response ', response);
      
      if (response.status !== 200) {
        throw new Error("Erreur " + response.status);
      }
      return response.json();// teste si c'est bien du json
    })
      .then(function (data) {
        console.log('data : ', data);// J'ai ma donnée au format json
        return data;
      });

  }

  getReservationsAvailable = ({start, end, persons}) => {
    const query_string = `?start=${start}&end=${end}&persons=${persons}`;
    return fetch(`${this.url}booking/available${query_string}`, {
      credentials: this.credentials,
      method: "GET",
      headers: this.headers,
    }).then(async function (response) {
        if(response.status !== 200){
          throw await response.json();
        }
        return response.json();
    }).then(function (data) {
      console.log('data : ', data);
      return data;
    });
  }
  postReservation = ({ start, end, persons, category }) => {
    const query_string = `?start=${start}&end=${end}&persons=${persons}&category=${category}`;
    return fetch(`
        ${this.url}booking/try-booking${query_string}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        "customer": {
          "firstName": "string",
          "lastName": "string",
          "phone": "string",
          "email": "string",
          "address": {
            "street": "string",
            "zipcode": "string",
            "city": "string",
            "country": "string"
          }
        }
      })
    }).then(async function (response) {
      if (response.status !== 201) {
        throw await response.json();
      }
      return response.json();// teste si c'est bien du json
    })
      .then(function (data) {
        console.log('data : ', data);// J'ai ma donnée au format json
        return data;
      });
  }

  deleteReservation = (code) => {
    return fetch(`${this.url}booking/${code}`, {
      credentials: this.credentials,
      method: "DELETE",
      headers: this.headers
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error("Erreur " + response.status);
      }
      return response.json();// teste si c'est bien du json
    })
    .then(function (data) {
      console.log('data : ', data);// J'ai ma donnée au format json
      return data;
    });
  }
}

export default FetchData;