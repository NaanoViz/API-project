// Default coordinates 
let latitude = 52.52;
let longitude = 13.41;

    // Get the list of cities and the input fields
    const locationList = document.getElementById('location-options');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');

    locationList.addEventListener('click', function(event) {
        if (event.target.tagName === 'INPUT') {
            const lat = event.target.getAttribute('data-lat');
            const lng = event.target.getAttribute('data-lng');
            
            latitudeInput.value = lat;
            longitudeInput.value = lng;        }
    });

// New button to set user location
document.getElementById("setLocation").addEventListener("click", function () {
    const latInput = parseFloat(document.getElementById("latitude").value);
    const lonInput = parseFloat(document.getElementById("longitude").value);

    if (isNaN(latInput) || isNaN(lonInput)) {
        alert("Please enter valid numbers for latitude and longitude.");
        return;
    }

    latitude = latInput;
    longitude = lonInput;
    alert(`Location set to: Latitude ${latitude}, Longitude ${longitude}`);
});

document.getElementById("Temperature").addEventListener("click", function(event) {
    const temperatureURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_80m`;
fetch(temperatureURL)
     .then((response) => {
        if (!response.ok){
            throw new Error("Unable to get data to identify the temperature... ");
            }
    return response.json(); // Can do a response.json instead, but its okay. return response.json() Safer for security? Why?
    })

    .then((temperatureData) => {
           console.log("This is the temperature ", temperatureData);
          
           const tempArea = document.getElementById("Temperature");
           const tempCurrent = tempArea.querySelector("ul");
           tempCurrent.innerHTML = "";         
          
           const currentTemp = temperatureData.hourly.temperature_80m[0];
           
           const tempList = document.createElement("li");          
           tempList.textContent = `Current Temperature (80m): ${currentTemp} °C`;
           tempCurrent.appendChild(tempList);

           document.getElementById("visibilityDistance").style.display = "none"; //Hide Visibility section when showing Temperature
           document.getElementById("tempArea").style.display = "block";
    })

    .catch((error) => {
        console.error("Failed to identify the temperature", error);
    });
});

document.getElementById("Visibility").addEventListener("click", function(event) {
    const visiblityURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=visibility`;
fetch(visiblityURL)
     .then((response) => {
        if (!response.ok){
            throw new Error("Unable to get data to identify the visiblity... ");
            }
    return response.json(); // Can do a response.json instead, but its okay. return response.json() Safer for security? Why?
    })

    .then((visiblityData) => {
            console.log("This is the visibility ", visiblityData);
                      
           const visi = document.getElementById("Visibility");
           const visiCurrent = visi.querySelector("ul");
           visiCurrent.innerHTML = "";         
          
           const currentVisi = visiblityData.hourly.visibility[0];
           
           const visiList = document.createElement("li");          
           visiList.textContent = `Current Visiblity (80m): ${currentVisi} m`;
           visiCurrent.appendChild(visiList);
          
           document.getElementById("tempArea").style.display = "none"; // Hide Temperature section when showing Visibility
           document.getElementById("visibilityDistance").style.display = "block";
    })

    .catch((error) => {
        console.error("Failed to find the visiblity", error);
    });
});