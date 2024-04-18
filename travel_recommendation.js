document.getElementById("search-button").addEventListener('click',searchResults);
const categories = [["australia","japan","brazil"],["temples","temple"],['beaches',"beach"]];
let resultDiv = document.getElementById("results");
function searchResults (event) {
    resultDiv.innerHTML = ''
    let searchQuery = document.getElementById("search-box").value.toLowerCase();
    fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        if ((searchQuery=="country") || (searchQuery=="countries")){
            console.log('country')
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    resultDiv.style.display = 'flex';
                    let r = document.createElement('div');
                    r.classList.add("one-result");
                    r.style.backgroundImage = `url(${city.imageUrl})`;
                    r.innerHTML = `<h2>${city.name}</h2><p>${city.description}</p>`;
                    resultDiv.appendChild(r);
                })
            })
        }else{
        for (let cat = 0; cat<categories.length;cat++) {
            if (categories[cat].includes(searchQuery)) {
                resultDiv.style.display = 'flex';
                if (cat==0) {
                    data.countries[categories[0].indexOf(searchQuery)].cities.forEach(country => {
                            let r = document.createElement('div');
                            r.classList.add("one-result");
                            r.style.backgroundImage = `url(${country.imageUrl})`;
                            r.innerHTML = `<h2>${country.name}</h2><p>${country.description}</p>`;
                            resultDiv.appendChild(r);
                    })
                }else{
                    data[categories[cat][0]].forEach(rec => {
                        let r = document.createElement('div');
                        r.classList.add("one-result");
                        r.style.backgroundImage = `url(${rec.imageUrl})`;
                        r.innerHTML = `<h2>${rec.name}</h2><p>${rec.description}</p>`;
                        resultDiv.appendChild(r);                        
                        })
                    }
                }
            }
        }
    })
}

function clearResults () {
    resultDiv.style.display = 'none';
    resultDiv.innerHTML = '';
    document.getElementById("search-box").value = '';
}
