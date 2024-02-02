document.addEventListener('DOMContentLoaded', () => fetchData())
function fetchData(){
    fetch('https://api.coincap.io/v2/assets')
    .then(resp => resp.json())
    .then(data => console.log(data))
}