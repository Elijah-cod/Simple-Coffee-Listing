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
    const card = document.createElement('div')
    card.classList.add('card')
    card.style = "width: 18rem; background-color: black;"

    //Check if element is popular
    if (element.popular){
        const popular = document.createElement('div')
        popular.classList.add('popular')
        popular.innerText = "Popular"
        card.append(popular)
    } 

    //Adding the image to the card
    const image = document.createElement('img')
    image.src = element.image
    image.alt = element.name
    card.append(image)

    //Creating the card body and adding it to the card
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    //Creating the title and price
    const titles = document.createElement('div')
    titles.classList.add('titles')

    const cardTitle = document.createElement('h4')
    cardTitle.classList.add('card-title')
    cardTitle.innerText = element.name
    titles.append(cardTitle)

    const price = document.createElement('div')
    price.classList.add('price')
    price.innerText = element.price
    titles.append(price)

    card.append(titles)

    if (element.rating == null) {
        const ratings =  document.createElement('div')
        ratings.classList.add('ratings')
        //Adding the no rating font awesome icons to the DOM
        const i = document.createElement('i')
        i.classList.add("fa","fa-star-o")
        i.setAttribute('aria-hidden', 'true')
        ratings.append(i)
        const p = document.createElement('p')
        p.classList.add('card-text')
        p.innerText = "No ratings"
        ratings.append(p)
        cardBody.append(ratings)
    }

    card.append(cardBody)
    cards.append(card)
}


captureData()