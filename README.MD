# Movie Search Application

This is a simple web application that allows users to search for movies using the OMDb API. Users can enter a movie title in the search bar, and the application will display a list of movies that match the search query. Users can also click on a movie to view more details in a modal.

## Features

- Search for movies by title.
- Display movie posters, titles, and brief descriptions.
- View detailed information about a selected movie in a modal.
- Debounce search input to improve user experience.

## Technologies Used

- HTML
- CSS
- JavaScript
- OMDb API


## API Key
To use the OMDb API, you need an API key. You can obtain one by signing up at OMDb API. Replace the placeholder API key in the JavaScript code with your actual API key.

const API_KEY = 'YOUR_API_KEY'; // Replace with your OMDb API key

## Usage
Open the application in your web browser.
Type a movie title in the search bar and press Enter or click the search icon.
The application will display a list of movies that match your search query.
Click on a movie to view more details in a modal.


## Code Overview
The main functionality is implemented in the script.js file. Key functions include:

fetchMovies(): Fetches the latest movies from the OMDb API.
searchMovies(query): Searches for movies based on the user's input.
displayMovies(movies): Displays the list of movies in the UI.
showMovieDetails(imdbID): Fetches and displays detailed information about a selected movie.