document.addEventListener('DOMContentLoaded', () => fetchData())

// Create title for webpage
const h1 = document.createElement('h1')
h1.textContent = 'Crypto Lite™️'
document.querySelector('body').appendChild(h1)

// fetch data from API and convert to json
function fetchData(){
    fetch('https://api.coincap.io/v2/assets')
    .then(resp => resp.json())
    .then(dataSet => handleData(dataSet))
    .catch(error => console.error('Error fetching data: ', error))
}

function handleData(dataSet){
    // Create select element for dropwdown. Create within div to use a flexbox
    let initContainer = document.createElement('div')
    initContainer.style.display = 'flex'; // Use flexbox for horizontal layout
    let sel = document.createElement('select')
    sel.style.marginRight = '30px'; // Space between the label and the value
    initContainer.appendChild(sel)
    document.querySelector('body').appendChild(initContainer)

    // Add text field to type in crypto of interest
    let textField = document.createElement('input')
    textField.placeholder = 'Search Crypto Symbol' // Sets default value that disappears when typing
    textField.type = 'text'
    textField.style.marginRight = '10px'; // Space between the label and the value
    initContainer.appendChild(textField)

    // Add button to find crypto in input field
    let btn = document.createElement('button')
    btn.innerText = 'Find'
    initContainer.appendChild(btn)

    // Create a default option for the dropdown list
    let defaultOption = document.createElement('option');
    defaultOption.textContent = "Choose Crypto"; // Set the default text
    defaultOption.disabled = true; // Make it disabled so it's not selectable
    defaultOption.selected = true; // Make it the initially selected option

    // Append the default option to the 'select' element
    sel.appendChild(defaultOption);

    // Create empty object to store each elements associated information
    let crypto = {}

    // Create a dropdown option list for each crypto
    dataSet.data.forEach(element => {
        let opt = document.createElement('option')
        opt.textContent = element.id
        opt.value = element.id
        sel.appendChild(opt)

        // store the elements associated information for future handling in event listener
        crypto[element.id] = element
    })
    // Create section for crypto details
    let div = document.createElement('div')
    div.id = 'crypto-content'
    document.querySelector('body').appendChild(div)

    // Add event listener to populate data based on input field
    btn.addEventListener('click', (e) => {
        // Clear previous content
        div.innerHTML = ''

        // if text field has a valid cypto symbol then display on webpage
        let matchFound = false
        if(textField.value){
            let UCaseTextField = textField.value.toUpperCase() // Change to uppercase to check against crypto object 
            let foundSymbol = Object.entries(crypto).find(([key,value]) => value.symbol === UCaseTextField)
            
            if(foundSymbol){
                if(foundSymbol[1].symbol === UCaseTextField){
                    matchFound = true
                    // Create header with selected crypto name
                    let h2 = document.createElement('h2')
                    h2.textContent = foundSymbol[1].symbol
                    document.querySelector('#crypto-content').appendChild(h2)
        
                    // Display symbol
                    createContainer('Symbol:',foundSymbol[1].symbol)
        
                    // Display Current Price of crypto
                    createContainer('Price USD:', foundSymbol[1].priceUsd)
        
                    // Display daily percent change of crypto
                    createContainer('24hr Percent Change:',foundSymbol[1].changePercent24Hr)
        
                    // Display website
                    createContainer('Website:',foundSymbol[1].explorer)
                }
            }
        }

        // Display N/A if no match is found or no input is entered
        if(!matchFound || !textField.value){
            // Create N/A header if find button is clicked and there is no input
            let h2 = document.createElement('h2')
            h2.textContent = 'N/A'
            document.querySelector('#crypto-content').appendChild(h2)
        }
    })

    // Create a container function for label and p elements to display attributes to page
    function createContainer(labelText, labelValue){
        let container = document.createElement('div');
        container.style.display = 'flex'; // Use flexbox for horizontal layout
        container.style.alignItems = 'center'; // Align items vertically in the center
        container.style.marginBottom = '10px'; // Add some space between this and the next container
        
        // Create Label for attributes
        let label = document.createElement('label');
        label.textContent = labelText;
        label.style.fontWeight = 'bold'
        label.style.marginRight = '10px'; // Space between the label and the value
        container.appendChild(label)

        // Create p element for attribute value
        let p = document.createElement('p')
        p.textContent = labelValue
        container.appendChild(p)

        // Append container to div element
        div.appendChild(container)
    }

    // Add event listener to populate data on page once dropdown is selected
    sel.addEventListener('change', (e) => {
        // Clear previous content 
        div.innerHTML = ''

        // Create header with selected crypto name
        let h2 = document.createElement('h2')
        h2.textContent = crypto[e.target.value].id
        document.querySelector('#crypto-content').appendChild(h2)

        // Display symbol
        createContainer('Symbol:',crypto[e.target.value].symbol)

        // Display Current Price of crypto
        createContainer('Price USD:', crypto[e.target.value].priceUsd)

        // Display daily percent change of crypto
        createContainer('24hr Percent Change:',crypto[e.target.value].changePercent24Hr)

        // Display website
        createContainer('Website:',crypto[e.target.value].explorer)
    })
}