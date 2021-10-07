const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  

  const request = await fetch(endpoint)

  const arrayName = await request.json();
    

   // .then((blob) => blob.json())
   // .then((data) => arrayName.push(...data));

  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter((place) => {
        //console.log(place)
      // here we need to figure out if city and state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  }

 // function numberWithCommas(x) {
  //  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');}

  
  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    //console.log(matchArray)
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.city   
      const placeName = place.name
      const categoryName = place.category
      //.replace(regex, `<span class="h1">${event.target.value}</span>`);
      console.log(cityName) 
      const stateName = place.state  
      //.replace(regex, `<span class="h1">${event.target.value}</span>`);
      return `
                <li>
                    <span class="name">${placeName}</span>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="name">${categoryName}</span>
                </li>
            `;
    }).join('');
    suggestions.innerHTML = html;
  }

  //const searchInput = document.querySelector('.search');
  //const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);

  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;
