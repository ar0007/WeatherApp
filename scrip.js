// get APi

let mainObject = {
    apiKey: `2611daabfb4e44475366e861cddbee50`,
    getWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            // .then((giveResponse) => {
            //     if (!giveResponse.ok) {
            //         alert(`Sorry! No weaher Found`);
            //         throw new Error(` No weaher Found`);
            //     }
            //     return giveResponse.Json;
            // })

        .then((giveResponse) => giveResponse.json())
            .then((data) => this.showWeather(data));
    },
    showWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        // console.log(data.weather);
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, { description }, { temp }, humidity, speed);

        document.querySelector(`.city`).innerText = "weather in : " + name;
        document.querySelector(`.temp`).innerText = `The Tepmerature is : ${temp}°`;

        document.querySelector(".Weather-Icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector(
            `.temp`
        ).innerText = `The Tepmerature is : ${temp}°C`;

        document.querySelector(
            `.type-of-weather`
        ).innerText = `Weather Description: ${description}`;
        document.querySelector(`.himidity`).innerText = ` Humidity :  ${humidity}%`;
        document.querySelector(
            `.wind-speed`
        ).innerText = ` wind-speed :  ${speed} KM/H`;
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.getWeather(document.querySelector(`.input-box`).value);
    },
};
// search bar
document.querySelector(`.search-button`).addEventListener(`click`, function() {
    mainObject.search();
});
document
    .querySelector(`.input-box`)
    .addEventListener(`keyup`, function(event) {
        if (event.key == `Enter`) {
            mainObject.search();
        }
    });