const cardConstructors = {
    characterCard: (characterInfo) => {
        const card = document.createElement('template');
        const templateHTML = `
            <div class="card bg-info bg-opacity-75 text-black mb-3 shadow ms-3 -1" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img 
                            class="img-thumbnail rounded-start"
                            src="${characterInfo.image}"
                        />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body p-1 ms-1">
                        <h5 class="card-title text-white" style="text-shadow: 2px 2px 2px #000000;">${characterInfo.name}</h5>
                        <p class="card-text mb-1"><b>Status:</b> ${characterInfo.status}</p> 
                        <p class="card-text mb-1"><b>Species:</b> ${characterInfo.species}</p>
                        <p class="card-text mb-1"><b>Gender:</b> ${characterInfo.gender}</p>
                        <p class="card-text mb-1"><b>Origin:</b> ${characterInfo.origin['name'] || "unknown"}</p>
                        </div>
                    </div>
                </div>
            </div>
        `.trim()

        card.innerHTML = templateHTML;
        
        return card.content;
    },
    portalCard: (locationInfo) => {
        const card = document.createElement("template");
        const templateHTML = `
            <div class="col-sm-4">
                <div class="card my-2 bg-transparent text-white">
                    <h5 class="card-header bg-success" style="text-shadow: 2px 2px 2px #000000;">${locationInfo.name}</h5>
                    <div class="card-body bg-success bg-opacity-75">
                        <h5 class="card-title">${locationInfo.dimension || "Unknown Dimension"}</h5>
                        <h6 class="card-subtitle mb-2">Type: ${locationInfo.type}</h6>
                        <p class="card-text">Number of residents: ${locationInfo.residents.length}</p>
                        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#locationModal${locationInfo.id}">
                            Residents
                        </button>
                    </div>
                </div>
            </div>
        `.trim();

        card.innerHTML = templateHTML;

        return card.content;
    }
}

const paginationCollectionConstructor = (paginationListChildren) => {
    const groupedPaginationButtons = [];
    const paginationListArray = Array.from(paginationListChildren);
    for (let i = 0; i < paginationListChildren.length; i += 7) {
        groupedPaginationButtons.push(paginationListArray.slice(i, i + 7));
    }

    return groupedPaginationButtons;
}

const paginationListConstructor = () => {
    const paginationListContainer = document.createElement("div");

    for (let i = 1; i <= 14; i++) {
        let pageButton = document.createElement("template");
        const templateHTML = `
            <li class="page-item">
                <a class="page-link" onclick="characterBuilder(${i - 1})">
                    ${i}
                </a>
            </li>
        `.trim();

        pageButton.innerHTML = templateHTML;
        pageButton = pageButton.content;
        
        paginationListContainer.appendChild(pageButton);
    }

    return paginationCollectionConstructor(paginationListContainer.children);
}

const paginationButtonGroupBuilder = (buttonGroup = 0) => {
    const groupedButtonList = paginationListConstructor();
    const paginationList = document.getElementById("paginationList");
    const paginationListArray = Array.from(paginationList.children);

    if (paginationList.childElementCount > 2) {
        paginationListArray.splice(1, 7, ...groupedButtonList[buttonGroup])
    } else {
        paginationListArray.splice(1, 0, ...groupedButtonList[buttonGroup])
    }

    paginationList.replaceChildren();
    paginationList.append(...paginationListArray)
}

export {
    cardConstructors,
    paginationButtonGroupBuilder
}