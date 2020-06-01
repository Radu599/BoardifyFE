
export function findCity() {

    return fetch('http://www.geoplugin.net/json.gp')
        .then(response => response.json())
        .then(jsonData =>{
            return (jsonData.geoplugin_city);
        });
}

// findCity().then((city)=>console.log(city))
