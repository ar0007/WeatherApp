let popup = document.getElementById(`popupContainer`);
const popupButton = document.getElementById(`closePopup`);
const userInput = document.querySelector(`.input-box`);
const list = document.getElementById(`listItem`);
const list2 = document.getElementById(`listItem2`);
const list3 = document.getElementById(`listItem3`);
const list4 = document.getElementById(`listItem4`);
const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);

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
            .then((data) => this.showWeather(data))
            .catch((err) => {
                controllPopup();
            });
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
        // document.body.style.backgroundImage =
        //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function() {
        this.getWeather(document.querySelector(`.input-box`).value);
    },
};

// try to inseart the value

list.addEventListener(`click`, () => {
    userInput.value = list.innerText;
    controllPopup();
});

list2.addEventListener(`click`, () => {
    userInput.value = list2.innerText;
    controllPopup();
});

list3.addEventListener(`click`, () => {
    userInput.value = list3.innerText;
    controllPopup();
});

list4.addEventListener(`click`, () => {
    userInput.value = list4.innerText;
    controllPopup();
});

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

// erorr popup

function controllPopup() {
    popup.classList.toggle(`controllOpacity`);
}

// theme handeler

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);

popupButton.addEventListener(`click`, () => {
    popup.style.transform = `scale(0)`;
});
