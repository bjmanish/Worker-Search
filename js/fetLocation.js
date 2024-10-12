//Function to get User's Location
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }else{
        alert("Geolocation is not supported by this browser.");
    }
}



function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    //Using a simple reverse geocoding service( like Open StreetMap) to get location
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        let location = data.address;
        console.log(location);
        document.getElementById('location').value = location.postcode;
        })
        .catch(() => {
            alert("coudnot get location data.");
        });   
}

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

//Automatically get Location when the page loads
window.onload = getLocation;