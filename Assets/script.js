$(document).ready(function () {
    console.log("ready!");

    // const city = "Atlanta";
    // const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&us&appid=a8fecac46b320f94a3eca3d84b946ced";
    const icon = $('.icon')
    const temp = $('.temp');
    const humid = $('.humid');
    const wind = $('.wind');
    const uv = $('.uv');

    const weather = {
        temperature: {
            value: 0,
            unit: 'farenheit'
        },
        description: 'few clouds',
        iconId: 'old',
        city: 'Atlanta',
        country: 'US'

    };


    const city = ($('#citySearch').text());
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&us&appid=a8fecac46b320f94a3eca3d84b946ced";
    // console.log(city);
    // console.log(queryURL);
    
    $('#sBtn').on('click', function () {
        const searchText = $('#searchBox').val().trim();
        console.log(searchText);

        if(city.innerHTML !== ''){
            
        }
        

        displayWeatherInfo();
    })

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayWeatherInfo() {

        icon.innerHTML = `<i class="${weather.iconId}" id="iconToday"></i>`
        temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        humid.innerHTML = weather.humidity;
        wind.innerHTML = weather.wind;
        uv.innerHTML = weather.uv;
        city.innerHTML = `${weather.city}`;



        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            const results = response.data;
            console.log(results);


        });
    };

    function celsiusToF(temperature) {
        return (temperature * 9 / 5) + 32;
    };



        // // Function for displaying movie data
        // function renderButtons() {

    //   // Deleting the movies prior to adding new movies
    //   // (this is necessary otherwise you will have repeat buttons)
    //   $("#buttons-view").empty();

    //   // Looping through the array of movies
    //   for (let i = 0; i < movies.length; i++) {

    //     // Then dynamicaly generating buttons for each movie in the array
    //     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    //     const a = $("<button>");
    //     // Adding a class of movie-btn to our button
    //     a.addClass("movie-btn");
    //     // Adding a data-attribute
    //     a.attr("data-name", movies[i]);
    //     // Providing the initial button text
    //     a.text(movies[i]);
    //     // Adding the button to the buttons-view div
    //     $("#buttons-view").append(a);
    //   }
    // }

    // This function handles events where a movie button is clicked
    // $("#add-movie").on("click", function(event) {
    //   event.preventDefault();
    //   // This line grabs the input from the textbox
    //   const movie = $("#movie-input").val().trim();

    //   // Adding movie from the textbox to our array
    //   movies.push(movie);

    //   // Calling renderButtons which handles the processing of our movie array
    //   renderButtons();
    // });

    // // Adding a click event listener to all elements with a class of "movie-btn"
    // $(document).on("click", ".movie-btn", displayMovieInfo);

    // // Calling the renderButtons function to display the initial buttons
    // renderButtons();




























});