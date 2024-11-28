const url = 'https://youtube-v31.p.rapidapi.com/search?q=horror%20movies&part=snippet%2Cid&regionCode=US&maxResults=30&order=date';
const topUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';
const topOptions = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '859b1adcf3mshb386854f829982ap1ae6a1jsn7a4cafc8883e',
		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '859b1adcf3mshb386854f829982ap1ae6a1jsn7a4cafc8883e',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};
const content = null || document.getElementById('content');
const topContent = null || document.getElementById('top-content');
async function fetchData(url, options){
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

(async ()=> {
    try{
        const movies = await fetchData(url, options);
        let view = `
        ${movies.items.map(movie =>`
            <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${movie.snippet.thumbnails.high.url}" alt="${movie.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-black-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${movie.snippet.title}
                </h3>
            </div>
            </div>
        `).slice(0,8).join('')}
        `;
        content.innerHTML = view;
    }
    catch (error){
        console.log(error);
        content.innerHTML = '<div class="text-red-500">Ha ocurrido un error en la API, Intente luego o contacte al desarrollador.</div>';
    }
})();

(async ()=> {
    try{
        const topMovies = await fetchData(topUrl, topOptions);
        let view = `
        ${topMovies.map(movie =>`
            <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${movie.image}" alt="${movie.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-black-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${movie.title}
                </h3>
            </div>
            </div>
        `).slice(0,4).join('')}
        `;
        topContent.innerHTML = view;
    }
    catch (error){
        console.log(error);
        topContent.innerHTML = '<div class="text-red-500">Ha ocurrido un error en la API, Intente luego o contacte al desarrollador.</div>';
    }
})();