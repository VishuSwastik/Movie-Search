
const API_KEY = '16c0e8d4'; 
const imdbID = 'tt3896198';

const BASE_URL = 'https://www.omdbapi.com/';
const SEARCH_DELAY = 500; 
let searchTimeout = null;

// const BASE_URL = ' http://www.omdbapi.com/?i=tt3896198&apikey=16c0e8d4';

document.addEventListener('DOMContentLoaded', function () {
    fetchMovies();

    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('movieModal').style.display = 'none';
    });


    window.addEventListener('click', function(event) {
        const modal = document.getElementById('movieModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

   
     const searchInput = document.querySelector('input[type="search"]');
     searchInput.addEventListener('input', debounceSearch);
});

function debounceSearch(event) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchMovies(event.target.value);
    }, SEARCH_DELAY);
}

async function searchMovies(query) {
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
   
        fetchMovies();
        return;
    }

    let allMovies = [];
    let page = 1;
    let totalResults = 0;

    do {
        const url = `${BASE_URL}?s=${trimmedQuery}&apikey=${API_KEY}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            allMovies = allMovies.concat(data.Search);
            totalResults = parseInt(data.totalResults, 10);
            page++;
        } else {
            alert(`Error: ${data.Error}`);
            return;
        }
    } while (allMovies.length < totalResults && allMovies.length < 100); 

    displayMovies(allMovies.slice(0, 8)); 
}

function displayMovies(movies) {
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = ''; 

    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
            `;
            movieItem.addEventListener('click', () => {
                showMovieDetails(movie.imdbID);
            });
            movieContainer.appendChild(movieItem);
        });
    } else {
        movieContainer.innerHTML = '<p>No movies found.</p>';
    }
}

function fetchMovies() {
    // const url = `http://www.omdbapi.com/?s=latest&apikey=${API_KEY}&page=1`;
    const url = `${BASE_URL}?s=latest&apikey=${API_KEY}&page=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movies = data.Search; 
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = ''; 

            if (movies && movies.length > 0) {
                const limitedMovies = movies.slice(0, 8);

                limitedMovies.forEach(movie => {
                    const movieItem = document.createElement('div');
                    movieItem.classList.add('movie-item');
                    movieItem.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                    `;
                    movieItem.addEventListener('click', () => {
                       
                        console.log(`Fetching details for IMDb ID: ${movie.imdbID}`);
                        showMovieDetails(movie.imdbID); 
                    });
                    movieContainer.appendChild(movieItem);
                });
            } else {
                movieContainer.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function showMovieDetails(imdbID) {
    const detailUrl = `http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;

    fetch(detailUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data); 
            // if (data.Response === "False") {
            //     alert(`Error: ${data.Error}`); 
            //     return;
            // }

         
            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
             
                <h2>${data.Title} (${data.Year})</h2>
                <p><strong>Rated:</strong> ${data.Rated}</p>
                <p><strong>Released:</strong> ${data.Released}</p>
                <p><strong>Runtime:</strong> ${data.Runtime}</p>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Writer:</strong> ${data.Writer}</p>
                <p><strong>Actors:</strong> ${data.Actors}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
            `;
            
          
            document.getElementById('movieModal').style.display = 'block';
        })
        .catch(error => console.error('Error fetching movie details:', error));
}