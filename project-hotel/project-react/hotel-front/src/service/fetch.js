fetch("http://localhost:8000/admin/reservations", {
  credentials: "same-origin",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa( "admin:admin") // btoa = encodage en base 64
  }
}).then(function(response) {
  if(response.status != 200){
    throw new Error ("Error " + response.status);
  }
  return response.json();
})
.then(function(data) {
  console.log('data : ', data);
})
.catch(error => {console.log("Erreur attrapée : ", error)});