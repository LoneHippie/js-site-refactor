'use strict';

const fetchRickAndMortyData = async(url) => {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

const paginatedFetchEndpoint = async({endpoint, pageCount}) => {
    const resArr = [];
    let baseUrl = `https://rickandmortyapi.com/api/${endpoint}/`;

    for (let i = 1; i <= pageCount; i++) {
        const pageData = await fetchRickAndMortyData(baseUrl);
        resArr.push(pageData.results);
        baseUrl = pageData.info.next;
    }

    return resArr.flat(1);
}

export {
    fetchRickAndMortyData,
    paginatedFetchEndpoint
}