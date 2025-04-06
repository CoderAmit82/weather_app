const apiKey = "3f23b6c33e2a08ac6c15c42a51b5b989"
const weatherDataEle = document.querySelector(".weather-data")
const citynameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")


formEle.addEventListener("submit", (e) => {
    e.preventDefault()
    //console.log(citynameEle.value);

    const cityvalue = citynameEle.value

    getWeatherData(cityvalue);
})

async function getWeatherData(cityvalue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            throw new Error("Network response is not ok!")
        }

        const data = await response.json()
        console.log(data)


        const temprature = Math.floor(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [`Feels Like: ${Math.floor(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed}m/s`
        ]

        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`
        weatherDataEle.querySelector(".desc").textContent = `${description}`
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => {
            return `<div>${detail}</div>`
        }).join("")

    } catch (err) {

    }

}