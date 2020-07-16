$(document).ready(function () {
    console.log("ready!");


    const city = ($('#citySearch').text());
    console.log(city);


    $('#sBtn').on('click', function (event) {
        event.preventDefault();

        const searchText = $('#searchBox').val().trim();
        console.log(searchText);


        const currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&us&appid=a8fecac46b320f94a3eca3d84b946ced";
        console.log(currentURL);


        // ;http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}


        const fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchText + "&us&appid=448783439c89c99c207044f26dae3207";
        // const fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` +"&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=448783439c89c99c207044f26dae3207";
        //      api.openweathermap.org/data/2.5/forecast/daily?q=    {city name}   &cnt={5}&appid={your api key}

        console.log(fiveDayURL);


        displayWeatherInfo(currentURL, fiveDayURL);
    })

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayWeatherInfo(currentURL, fiveDayURL) {


        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: currentURL,
            method: "GET"
        }).then(function (response) {


            console.log(response);
            // storing the data from the AJAX request in the results variable
            $('#citySearch').text(response.name);
            $('#temp').text(Math.floor(((response.main.temp) - 273.15) * 1.8 + 32));
            $('#humid').text(response.main.humidity);
            $('#wind').text(response.wind.speed);
            $('#uv').text(response.name);

            const todayIcon = response.weather[0].icon;
            console.log(todayIcon);


            $('#iconToday').html(`<img src="http://openweathermap.org/img/w/${todayIcon}.png"></img>`)

            //"coord": {
            // "lon": ,
            // "lat": 


            //this then places the lat and lon for the uvi URL
            const lat = response.coord.lon;
            const lon = response.coord.lat;
            console.log(lon)
            console.log(lat)
            const currentUvi = "https://api.openweathermap.org/data/2.5/uvi?appid=a8fecac46b320f94a3eca3d84b946ced&lat=" + `${lon}` + "&lon=" + `${lat}`;
            console.log(currentUvi)


            $.ajax({
                url: currentUvi,
                method: "GET"
            }).then(function (response) {
                console.log(response, "yay");
                $('#uv').text(response.value)

            });

        });


        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {


            console.log(response);
            // storing the data from the AJAX request in the results variable


            $('#temp2').text(Math.floor(((response.list[6].main.temp_max) - 273.15) * 1.8 + 32));
            const day2 = response.list[6].weather[0].icon;
            $('#icon2').html(`<img src="http://openweathermap.org/img/w/${day2}.png"></img>`)
            $('#humid2').text(response.list[6].main.humidity);


            $('#temp3').text(Math.floor(((response.list[13].main.temp_max) - 273.15) * 1.8 + 32));
            const day3 = response.list[13].weather[0].icon;
            $('#icon3').html(`<img src="http://openweathermap.org/img/w/${day3}.png"></img>`)
            $('#humid3').text(response.list[13].main.humidity);

            $('#temp4').text(Math.floor(((response.list[21].main.temp_max) - 273.15) * 1.8 + 32));
            const day4 = response.list[21].weather[0].icon;
            $('#icon4').html(`<img src="http://openweathermap.org/img/w/${day4}.png"></img>`)
            $('#humid4').text(response.list[21].main.humidity);

            $('#temp5').text(Math.floor(((response.list[29].main.temp_max) - 273.15) * 1.8 + 32));
            const day5 = response.list[29].weather[0].icon;
            $('#icon5').html(`<img src="http://openweathermap.org/img/w/${day5}.png"></img>`)
            $('#humid5').text(response.list[29].main.humidity);

            $('#temp6').text(Math.floor(((response.list[37].main.temp_max) - 273.15) * 1.8 + 32));
            const day6 = response.list[37].weather[0].icon;
            $('#icon6').html(`<img src="http://openweathermap.org/img/w/${day6}.png"></img>`)
            $('#humid6').text(response.list[37].main.humidity);

        });
    };



































});