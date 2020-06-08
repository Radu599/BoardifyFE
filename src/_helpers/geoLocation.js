export function findCity() {

    return fetch('https://geolocation-db.com/jsonp/')
        .then(response => response.json())
        .then(jsonData => {
            return (jsonData.city);
        });
}

// findCity().then((city)=>console.log(city))
