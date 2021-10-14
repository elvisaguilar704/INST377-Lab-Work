const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const arrayName = await request.json();
  const ACCESSTOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  // Leaflet map
  const mymap = L.map('mapid').setView([38.989, -76.93], 12);
  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESSTOKEN}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

//   const marker = L.marker([38.990, -76.93]).addTo(mymap);

//   const circle = L.circle([38.995, -76.95], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
//   }).addTo(mymap);

//   const polygon = L.polygon([
//     [38.996, -76.92],
//     [38.988, -76.90],
//     [38.998, -76.887]
//   ]).addTo(mymap);

  // temporary
  //   marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  //   circle.bindPopup('I am a circle.');
  //   polygon.bindPopup('I am a polygon.');

  //   const popup = L.popup()
  //     .setLatLng([38.990, -76.93])
  //     .setContent('I am a standalone popup.')
  //     .openOn(mymap);

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(`You clicked the map at ${e.latlng.toString()}`)
      .openOn(mymap);
  }

  mymap.on('click', onMapClick);



  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');

      return place.name.match(regex) || place.category.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);

    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.city;
      const placeName = place.name;
      const categoryName = place.category;
      const addressName = place.address_line_1;
      const zipName = place.zip;
      
      console.log(cityName);
      const stateName = place.state;

      return `
                <li>
                    <span class="name">${placeName}</span> </br>
                    <span class="name">${categoryName}</span> </br>
                    <span class="name">${addressName}</span> </br>
                    <span class="name">${cityName}</span> </br>
                    <span class="name">${zipName}</span> 

                    
                </li>
            `;
    }).join('');
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', displayMatches);

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;