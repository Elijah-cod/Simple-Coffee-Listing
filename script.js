//Capture DOM elements
const products = document.querySelector('.products')
const available = document.querySelector('.available')
const cards = document.querySelector ('.cards')

products.addEventListener('click', ()=> {
    products.style.backgroundColor = "grey"
    available.style.backgroundColor = "black"
})
available.addEventListener('click', ()=> {
    available.style.backgroundColor = "grey"
    products.style.backgroundColor = "black"
})

//Function to dsiplay the data by default
function render (data) {
    cards.innerHTML = ''
    data.forEach(element => {
        creatingCards(element)
    })
}

//Function to capture data from the api
async function captureData () {
    const url = 'https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json'
    try {
        const response = await fetch(url)
        const data = await response.json()
        render(data)
    } catch (error) {
        console.error('Error:', error)
    }
}

//Function to create the cards
function creatingCards (element){
    //Creating the card element
    const card = creatingElements('div', 'card')
    card.style = "width: 18rem; background-color: black;"

    //Check if element is popular
    if (element.popular){
        const popular = creatingElements('div', 'popular')
        popular.innerText = "Popular"
        card.append(popular)
    } 

    //Adding the image to the card
    const image = document.createElement('img')
    image.src = element.image
    image.alt = element.name
    card.append(image)

    //Creating the card body and adding it to the card
    const cardBody = creatingElements('div', 'card-body')

    //Creating the title and price
    const titles = creatingElements('div', 'titles')

    const cardTitle = creatingElements('h4', 'card-title')
    cardTitle.innerText = element.name
    titles.append(cardTitle)

    const price = creatingElements('div', 'price')
    price.innerText = element.price
    titles.append(price)

    card.append(titles)

    if (element.rating == null) {
        const ratings =  creatingElements('div', 'ratings')
        //Adding the no rating font awesome icons to the DOM
        const i = creatingIcons("fa-star-o")
        ratings.append(i)
        const p = creatingElements('p', 'card-text')
        p.innerText = "No ratings"
        ratings.append(p)
        cardBody.append(ratings)
    } else {
        const bottom =  creatingElements('div', 'bottom')
    
        const left = creatingElements("div", "left")
        const i = creatingIcons("fa-star")
        left.append(i)
        const p = creatingElements("p", 'card-text')
        p.innerText = `${element.rating}(${element.votes} votes)`
        left.append(p)
        bottom.append(left)

        if (!element.available){
            const p1 = creatingElements('p', 'sold')
            p1.innerText = "Sold out"
            bottom.append(p1)
        }
        cardBody.append(bottom)
    }

    card.append(cardBody)
    cards.append(card)
}

//Function to help create HTML elements to avoid repetition
function creatingElements (elem, className) {
    const element = document.createElement(elem)
    element.classList.add(className)
    return element
}

//Function to create Font awesome icons to avoid repetition
function creatingIcons (iconName) {
    const i = document.createElement('i')
    i.classList.add("fa",iconName)
    i.setAttribute('aria-hidden', 'true')
    return i
}

captureData()