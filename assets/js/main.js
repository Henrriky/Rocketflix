const informationsApi = {
  API_KEY: '?api_key=1ec078b7c8718685ba313f4666458d27',
  BASE_URL: 'https://api.themoviedb.org/3/movie/',
  IMG_URL: 'https://image.tmdb.org/t/p/w500/',
  language: 'language=pt-BR'
}

const imgContentElement = document.querySelector('.content-image');
const titleContentElement = document.querySelector('.content-title');
const synopsisContentElement = document.querySelector('.content-synopsis');
const button = document.querySelector("button");

button.addEventListener('click', () => getRandomMovie(informationsApi.IMG_URL));


async function requestApi(BASE_URL, API_KEY, randomNumber) {
  const response = await fetch(`${BASE_URL}${randomNumber}${API_KEY}&${informationsApi.language}`)
  const data = await response.json();
  return data;
}

async function getRandomMovie(IMG_URL) {
  const currentDay = new Date().getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  synopsisContentElement.innerText = "";
  imgContentElement.src = "";

  const random = Math.floor(Math.random() * (1200 - 0 + 1)) + 0;
  const data = await requestApi(informationsApi.BASE_URL, informationsApi.API_KEY, random);

  if (daysOfWeek[currentDay] === "Sun" | daysOfWeek[currentDay] === "Sat" | daysOfWeek[currentDay] === "Mon" | daysOfWeek[currentDay] === "Tue" | daysOfWeek[currentDay] === "Wed") {
    if (data.original_title === undefined){
      imgContentElement.setAttribute("hidden", "hidden");
      titleContentElement.removeAttribute("hidden");
      titleContentElement.innerText = "Não foi possível achar o filme :("
      titleContentElement.style.color = "#FF0000"
      return false;
    } else {
      synopsisContentElement.removeAttribute("hidden");
      titleContentElement.removeAttribute("hidden");
      imgContentElement.removeAttribute("hidden");
    
      titleContentElement.style.color = "#fffcf9"
      titleContentElement.innerText = data.original_title;
      synopsisContentElement.innerText = data.overview;
      imgContentElement.src = `${IMG_URL}${data.poster_path}`;
      return true;
    }
  }

  titleContentElement.removeAttribute("hidden");
  imgContentElement.removeAttribute("hidden");

  titleContentElement.style.color = "#fffcf9"
  titleContentElement.innerText = "Ops, hoje não é dia de assistir filme. Bora codar! 🚀";
  synopsisContentElement.innerText = "";
  imgContentElement.src = `./assets/img/Poster.png`;
}




