const url = 'https://youtube-v31.p.rapidapi.com/search?q=horror%2Bmovies&part=snippet%2Cid&regionCode=US&maxResults=10&order=date';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '859b1adcf3mshb386854f829982ap1ae6a1jsn7a4cafc8883e',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};
const content = null || document.getElementById('content');
async function fetchData(url){
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

(async ()=> {
    try{
        const movies = await fetchData(url);
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
        `).slice(0,4).join('')}
        `;
        content.innerHTML = view;
    }
    catch (error){
        console.log(error);
        content.innerHTML = '<div class="text-red-500">Ha ocurrido un error en la API, Intente luego o contacte al desarrollador.</div>';
    }
})();

