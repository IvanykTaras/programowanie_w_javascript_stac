window.onload = async ()=>{
    //set empty arr in localStorage
    if(localStorage.getItem("placesArr") === null){
        localStorage.setItem("placesArr",JSON.stringify([]))
    } 

    render();

}


async function fetchOpenWeatherAPI(input){
    const apiKey = "e5d19470dce8bd707f624fc52e737bbc"
    
    
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input} &units=metric&appid=${apiKey}`);  
        if(response.ok){
            const data = await response.json()
            return {
                name: data.name,
                temp: Math.round(data.main.temp),
                icon: data.weather[0].icon,
                description: data.weather[0].description
            };
        }else{
            return null;
        }
}


async function addToStorage(item){
    item = item.toLocaleLowerCase();
    const arr = await JSON.parse(localStorage.getItem("placesArr"));

    const status = await fetchOpenWeatherAPI(item);

    if(arr.find((e)=>e===item) === undefined && status && arr.length <= 10){
        arr.push(item)
        localStorage.setItem("placesArr", JSON.stringify(arr))
        render();
    }
}

function removeFromStorage(item){
    item = item.toLocaleLowerCase();
    const arr = JSON.parse(localStorage.getItem("placesArr"));
    
    localStorage.setItem("placesArr", JSON.stringify(arr.filter(e => e !== item)))
}








let input = document.querySelector("#search_inputu");
input.addEventListener("keypress", e=>{
    if(e.key === "Enter"){
      const inputValue = document.querySelector("#search_inputu").value;
    
      addToStorage(inputValue);  
    }
})

async function render() {
    const arr = JSON.parse(localStorage.getItem("placesArr"));
    const container = document.querySelector(".container");
    container.innerHTML = ""

    arr.forEach( async (element) => {

        const place = await fetchOpenWeatherAPI(element);
        
        // {name: 'London', temp: 12, icon: '04n', description: 'overcast clouds'}

        const card = document.createElement("div");
          card.classList.add("card");

          const name_of_place = document.createElement("div")
                name_of_place.classList.add("name_of_place");
                name_of_place.classList.add("title");
                name_of_place.textContent = place.name;
                card.appendChild(name_of_place);
          
          const temp = document.createElement("div");
                temp.classList.add("temp");
                temp.textContent = place.temp + "°"
                card.appendChild(temp);

          const button = document.createElement("button");
                button.textContent = "delet"
                button.addEventListener("click", ()=>{
                    removeFromStorage(element);
                    render();
                })
                card.appendChild(button);

          const humidity = document.createElement("div");
                humidity.classList.add("humidity");
                humidity.textContent = place.description
                card.appendChild(humidity);
            
          const weather_thumb = document.createElement("div");
                weather_thumb.classList.add("weather_thumb");
                card.appendChild(weather_thumb);

                const img = document.createElement("img");
                      img.src = `https://openweathermap.org/img/wn/${place.icon}@2x.png`
                      weather_thumb.appendChild(img);

        container.appendChild(card);
    });
}


{/* <div class="card">
            <div class="name_of_place title">
                London
            </div>
            <div class="temp">
                18°
            </div>
            <button>delet</button>
            <div class="humidity">
                wilgotonośc
            </div>
            <div class="weather_thumb">
                <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="">
            </div>
        </div> */}
