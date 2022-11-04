const api_key = '';

let config = [];

function registerEvent() {
    document.getElementById('btn_send').addEventListener('click', (evt) => {
        evt.preventDefault();
        search()
    });

    loadConfiguration();
}

function search() {
    const text = document.getElementById('movie_name').value;

    if(text === '') {
        return;
    }

    const list = document.getElementById('list');

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${text}`)
        .then(resp => resp.json())
        .then(r => {
            if(r.total_results >= 1) {
                list.innerText = '';

                r.results.forEach(movie => {
                    list.appendChild(createMovieDetails(movie))
                })
            }
        })

}

function loadConfiguration() {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${api_key}`)
        .then(resp => resp.json())
        .then(r => {
            console.log('config = ', r)
            config['images'] = r.images;
        })
}

/**
 * @return HTMLElement
 */
function createMovieDetails(movie) {
    console.log('current movie = ', movie)
    let img;

    const doc = document.createElement('div')
    doc.classList.add('movie')

    const title = document.createElement('h2')
    title.innerText = movie.original_title;

    const imageSource = movie.poster_path;

    if(imageSource !== null) {
        img = document.createElement('img');
        img.src = `${config.images.secure_base_url}/w92/${imageSource}`;
    }

    const description = document.createElement('p');
    description.innerText = movie.overview;

    const rating = document.createElement('p');
    rating.innerText = `Popularité : ${movie.vote_average} ⭐`;

    doc.appendChild(title);

    if(img.tagName !== undefined) {
        doc.appendChild(img)
    }

    doc.appendChild(description)
    doc.appendChild(rating)

    return doc;
}