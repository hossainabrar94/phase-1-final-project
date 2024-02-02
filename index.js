document.addEventListener('DOMContentLoaded', () => fetchData())

// fetch data from API and convert to json
function fetchData(){
    fetch('https://api.coincap.io/v2/assets')
    .then(resp => resp.json())
    .then(dataSet => handleData(dataSet))
}


function handleData(dataSet){
    //console.log(data.data[1].id)
    // Create a select html element to create dropwdown
    let sel = document.createElement('select')
    document.querySelector('body').appendChild(sel)
    // Create a default option for the dropdown list
    let defaultOption = document.createElement('option');
    defaultOption.textContent = "Choose Crypto"; // Set the default text
    defaultOption.disabled = true; // Make it disabled so it's not selectable
    defaultOption.selected = true; // Make it the initially selected option
    // Append the default option to the select element
    sel.appendChild(defaultOption);
    // Create a dropdown option list for each crypto
    dataSet.data.forEach(element => {
        let opt = document.createElement('option')
        opt.textContent = element.id
        sel.appendChild(opt)

    })
}