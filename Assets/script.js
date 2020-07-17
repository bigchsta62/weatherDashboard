$(document).ready(function () {
    // console.log("ready!");
    $("#cityBtns").empty();

    const lastCity = localStorage.getItem('lastCity');
    $('#searchBox').val(lastCity);
    const cities = [];

    function fillBucket() {
        $("#cityBtns").empty();
        for (let i = 1; i < cities.length; i++) {
            const a = $('<button>');
            a.addClass('col-6 btn btn-light text-light mb-2');
            a.attr("data-name", cities[i]);
            a.text(cities[i]);
            $("#cityBtns").append(a);


        }
    };
    //This function calls the first 2 APIs and the display weather function



    $('#sBtn').on('click', function (event) {
        event.preventDefault();
        runIt()
        fillBucket();

    });

    function runIt() {
        let searchText = $('#searchBox').val().trim();
        cities.push(searchText);
        const currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&us&appid=a8fecac46b320f94a3eca3d84b946ced";

        // ;http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

        const fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchText + "&us&appid=448783439c89c99c207044f26dae3207";
        // const fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` +"&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=448783439c89c99c207044f26dae3207";
        //      api.openweathermap.org/data/2.5/forecast/daily?q=    {city name}   &cnt={5}&appid={your api key}

        displayWeatherInfo(currentURL, fiveDayURL);
        localStorage.setItem('lastCity', searchText);
        $('#searchBox').val(' ');

    }

    // displayWeatherInfo function re-renders the HTML to display the appropriate content
    function displayWeatherInfo(currentURL, fiveDayURL) {

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: currentURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            // PLaces JSON data from API into elements
            $('#citySearch').text(response.name);
            const unix = response.dt;
            const milli = unix * 1000;
            const date = new Date(milli);
            const readable = date.toLocaleString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            });



            $('#date').text(readable);

            $('#temp').text(Math.floor(((response.main.temp) - 273.15) * 1.8 + 32));
            $('#humid').text(response.main.humidity);
            $('#wind').text(response.wind.speed);
            $('#uv').text(response.name);







            //Displays openweather icons that match the weather for each forecast
            const todayIcon = response.weather[0].icon;
            // console.log(todayIcon);
            $('#iconToday').html(`<img src="https://openweathermap.org/img/w/${todayIcon}.png"></img>`)

            //this then places the lat and lon for into the uvi URL
            const lat = response.coord.lon;
            const lon = response.coord.lat;
            // console.log(lon)
            // console.log(lat)
            const currentUvi = `https://api.openweathermap.org/data/2.5/uvi?appid=a8fecac46b320f94a3eca3d84b946ced&lat=${lon}&lon=${lat}`;
            // console.log(currentUvi)

            //UVI ajax call had to be placed inside the other ajax call for today's weather, because I wasn't sure
            // how to pass that information into the other URL any other way. This causes the UVI to render last,
            // but doesn't break anything.
            $.ajax({
                url: currentUvi,
                method: "GET"
            }).then(function (response) {
                // console.log(response, "yay");
                $('#uv').text(response.value)
                console.log(response.value);
                //changes background color based on uv index value
                if (response.value <= 5 && response.value >= 3) {
                    console.log('true')
                    $('#uv').css('background-color', 'yellow');
                }
                if (response.value <= 7 && response.value >= 6) {
                    console.log('greater');
                    $('#uv').css('background-color', 'orange');
                }
                if (response.value < 11 && response.value >= 8) {
                    console.log('greater');
                    $('#uv').css('background-color', 'red');
                }
                if (response.value > 11) {
                    console.log('greater');
                    $('#uv').css('background-color', 'violet');
                }
               
            });


        });

        //Five day ajax call
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);


            // I would have put this in a for a loop, but I was crunched for time and this works
            $('#temp2').text(Math.floor(((response.list[6].main.temp_max) - 273.15) * 1.8 + 32));
            const day2 = response.list[6].weather[0].icon;
            $('#icon2').html(`<img src="https://openweathermap.org/img/w/${day2}.png"></img>`)
            $('#humid2').text(response.list[6].main.humidity);


            $('#temp3').text(Math.floor(((response.list[13].main.temp_max) - 273.15) * 1.8 + 32));
            const day3 = response.list[13].weather[0].icon;
            $('#icon3').html(`<img src="https://openweathermap.org/img/w/${day3}.png"></img>`)
            $('#humid3').text(response.list[13].main.humidity);

            $('#temp4').text(Math.floor(((response.list[21].main.temp_max) - 273.15) * 1.8 + 32));
            const day4 = response.list[21].weather[0].icon;
            $('#icon4').html(`<img src="https://openweathermap.org/img/w/${day4}.png"></img>`)
            $('#humid4').text(response.list[21].main.humidity);

            $('#temp5').text(Math.floor(((response.list[29].main.temp_max) - 273.15) * 1.8 + 32));
            const day5 = response.list[29].weather[0].icon;
            $('#icon5').html(`<img src="https://openweathermap.org/img/w/${day5}.png"></img>`)
            $('#humid5').text(response.list[29].main.humidity);

            $('#temp6').text(Math.floor(((response.list[37].main.temp_max) - 273.15) * 1.8 + 32));
            const day6 = response.list[37].weather[0].icon;
            $('#icon6').html(`<img src="https://openweathermap.org/img/w/${day6}.png"></img>`)
            $('#humid6').text(response.list[37].main.humidity);

        });
    };

    $('#cityBtns').on('click', 'button', function (event) {
        event.preventDefault();
        const histBtn = $(this).attr("data-name");
        $('#searchBox').val(histBtn);

        runIt()
    });


    runIt();

});