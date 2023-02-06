'use strict';

/* tady bude tvůj kód */
let movies = []

fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies')
  .then((response) => response.json())
  .then((data) => {
    movies = data;
    showMovies();
  }); 



// Parametry musi mit stejny nazev, jako jsou jednotlive klice v jsonu

// Pred destrukturalizaci
/* const movieItem = (movie) => {
  return `
      <div class="movie">
      <img class="movie__img" src="${movie.posterUrl}" alt="${movie.title}">
          <a href="${movie.url}"><h2 class="movie__title">${movie.title}</h2></a>
          <p class="movie__year">${movie.year}</p>
          <p class="movie__genre">${movie.genres}</p>
      </div>
  `;
}*/

//Destrukturalizovany objekt
const Movie = ({ title, posterUrl, url, year, genres }) => {
  return `
      <div class="movie">
      <img class="movie__img" src="${posterUrl}" alt="${title}">
          <a href="${url}"><h2 class="movie__title">${title}</h2></a>
          <p class="movie__year">${year}</p>
          <p class="movie__genre">${genres}</p>
      </div>
  `;
};

// div s id "movies" do ktereho vypisuji jednotlive filmy
const movieList = document.querySelector('#movies')

const showMovies = (asc = true) => {
  //porovnava nazvy filmu, vzdy dva proti sobe
  //localeCompare je kvuli diakritice
  // movies funguji proto, ze jsou globalni promenna definovana ve druhem callbacku
  movies.sort((movieA, movieB) => movieA.title.localeCompare(movieB.title, 'cs'));
  if (asc === false ) {
    movies.reverse();
  }

// z kazdeho filmu udela komponentu a tu pak nahraje do HTML, nahrava jednu komponentu po druhe.\
  movieList.innerHTML = '';
  movies.forEach((movie) => {
    movieList.innerHTML += Movie(movie);
  });

  // Vytvori seznam komponent a ty pak najednou nahraje do HTML
  //movieList.innerHTML = movies.map((movie) => Movie(movie)).join('');
}

document.querySelector('#button-asc').addEventListener("click", () => showMovies(true));
document.querySelector('#button-desc').addEventListener("click", () => showMovies(false));