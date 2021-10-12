const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);

  const arrayName = await request.json();

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