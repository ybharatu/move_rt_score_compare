import { apiKey } from "./config.js";

// Get references to the placeholder elements and buttons
      const placeholder1 = document.getElementById("placeholder1");
      const placeholder2 = document.getElementById("placeholder2");
      const higherButton = document.getElementById("higherButton");
      const lowerButton = document.getElementById("lowerButton");

      // Set up the Open Movie Database API endpoint and API key
      const omdbEndpoint = "https://www.omdbapi.com/";
      const omdbAPIKey = apiKey

      // Set up a function to get a random movie from the API
      async function getRandomMovie() {
        // Build the API request URL
        const requestURL = `${omdbEndpoint}?apikey=${omdbAPIKey}&type=movie&s=*&page=${Math.floor(
          Math.random() * 100
        ) + 1}`;

        console.log(requestURL)

        // Make the API request
        const response = await fetch(requestURL);
        const data = await response.json();

        // Choose a random movie from the response data
        const randomIndex = Math.floor(Math.random() * data.Search.length);
        const randomMovie = data.Search[randomIndex];

        return randomMovie;
      }

      // Set up a function to display the poster of a movie on a placeholder
      async function displayMoviePoster(movie, placeholder) {
        // Build the API request URL to get the poster image
        const requestURL = `${omdbEndpoint}?apikey=${omdbAPIKey}&i=${movie.imdbID}&plot=full`;

        // Make the API request to get the poster image
        const response = await fetch(requestURL);
        const data = await response.json();

        // Set the background image of the placeholder to the poster image
        placeholder.style.backgroundImage = `url(${data.Poster})`;
      }

      // Set up the initial display of the movie posters
      async function initialize() {
        console.log("Got to Init Function")
        // Get two random movies from the API
        const movie1 = await getRandomMovie();
        const movie2 = await getRandomMovie();

        // Display the posters of the two movies on the placeholders
        await displayMoviePoster(movie1, placeholder1);
        await displayMoviePoster(movie2, placeholder2);
      }

      // Add event listeners to the buttons
      higherButton.addEventListener("click", async () => {
        // Get a new random movie for the first placeholder
        const movie = await getRandomMovie();
        await displayMoviePoster(movie, placeholder1);
      });

      lowerButton.addEventListener("click", async () => {
        // Get a new random movie for the first placeholder
        const movie = await getRandomMovie();
        await displayMoviePoster(movie, placeholder1);
      });

      console.log("Started script")
      // Initialize the display of the movie posters
      initialize();