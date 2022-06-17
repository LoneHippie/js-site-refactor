import { fetchRickAndMortyData, paginatedFetchEndpoint } from "./utils/api.js";
import { cardConstructors, paginationButtonGroupBuilder } from "./utils/generators.js";

let currentPage = 0

const randomUrlConstructor = (length) => {
    const randomNumArray = Array.from({ length: length }, () => Math.floor(Math.random() * 826) + 1);
    return `https://rickandmortyapi.com/api/character/${randomNumArray}`
}

async function dynamicCarouselConstructor() {

    const randomizedCharacters = randomUrlConstructor(3);
    const data = await fetchRickAndMortyData(randomizedCharacters);

    const carouselInner = document.getElementById('carouselInner');

    for (let character of data) {
        const carouselImage = document.createElement('img');
        carouselImage.setAttribute('src', character.image);
        carouselImage.classList.add("d-block", "mx-auto", "img-fluid", "rounded");

        const carouselCaption = document.createElement('div');
        carouselCaption.classList.add("carousel-caption", "d-none", "d-md-block", "justify-content-center");

        const captionTitle = document.createElement('h5');
        captionTitle.classList.add("fw-bold", "text-light", "bg-dark", "bg-opacity-75");
        captionTitle.innerHTML = character.name

        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add("container")
        carouselContainer.appendChild(captionTitle);

        carouselCaption.appendChild(carouselContainer);

        const carouselItem = document.createElement('div');

        if (data.indexOf(character) == 0) {
            carouselItem.classList.add("carousel-item", "active");

        } else {
            carouselItem.classList.add("carousel-item");
        }

        carouselItem.append(carouselImage, carouselCaption);
        carouselInner.appendChild(carouselItem);
    }
}

//needs to be bound to window object since this file is being served as a module
window.characterBuilder = async(pageNumber = 0) => {

    const data = await characterCollectionConstructor();
    const cardRow = document.getElementById('cardrow');
    cardRow.replaceChildren();

    for (const character of data[pageNumber]) {
        const card = cardConstructors.characterCard(character);
        cardRow.appendChild(card);
    }
    currentPage = pageNumber;

    paginator5000();
    pageButtonGroupSwapper();
}


async function characterCollectionConstructor() {
    const allCharacters = await paginatedFetchEndpoint({endpoint: "character", pageCount: 42})

    const groupedCharacters = [];
    for (let i = 0; i < allCharacters.length; i += 59) {
        groupedCharacters.push(allCharacters.slice(i, i + 59));
    }
    return groupedCharacters;
}


function pageChanger(operation) {
    if (currentPage > 0 || currentPage < 13) {
        characterBuilder((currentPage + operation));
        pageButtonGroupSwapper();
    }
}


function paginator5000() {
    const previousButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    if (currentPage === 0) {
        previousButton.classList.add("disabled");
    } else {
        previousButton.classList.remove("disabled");
    }

    if (currentPage === 13) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }
}


function pageButtonGroupSwapper() {
    if (currentPage > 0 && currentPage % 7 === 0) {
        paginationButtonGroupBuilder(currentPage / 7);
    } else {
        paginationButtonGroupBuilder(0);
    }
}

function cardSearchFilter() {
    const searchInput = document.getElementById("navsearch").value.replace(/[^a-z0-9]/gi, '').toLowerCase().trim();
    const rowOfCards = document.getElementById("cardrow").children;
    console.log(searchInput);
    for (const card of rowOfCards) {
        const cardHeaderText = card.querySelector("h5").innerHTML.toLowerCase().trim();

        if (!cardHeaderText.includes(searchInput) && !!searchInput) {
            card.classList.add("d-none");
        } else {
            card.classList.remove("d-none");
        }
    }
}

paginationButtonGroupBuilder();
dynamicCarouselConstructor();
characterBuilder();