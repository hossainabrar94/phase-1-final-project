document.addEventListener('DOMContentLoaded', () => fetchData())

// fetch data from API and convert to json
function fetchData(){
    fetch('https://api.coincap.io/v2/assets')
    .then(resp => resp.json())
    .then(dataSet => handleData(dataSet))
}


function handleData(dataSet){
    //console.log(data.data[1].id)
    dataSet.data.forEach(element => {
        console.log(element)
    })
}