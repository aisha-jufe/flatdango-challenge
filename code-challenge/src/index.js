
let url = 'http://localhost:3000/films'
const listHolder = document.getElementById('films')
// eventlister with DOMContent to prevent JS from loading be for html and css load..
document.addEventListener('DOMContentLoaded', () => {
    // get element by classname and with  index number to remove
    document.getElementsByClassName('film item')[0].remove()
    fetchMovies(url)
});

//Create fetch function
function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                displayMovie(movie)
            });
        });
}
// function declaration
function displayMovie(movie) {
    // create li and give it styling
    const li = document.createElement('li')
    li.style.cursor = "pointer";
    li.style.fontSize = '15px';
    li.style.padding = '10px';
    li.style.lineHeight = '1.3';
    li.style.fontFamily = "Noto Serif Display', serif";
    li.textContent = (movie.title).toUpperCase()
    listHolder.appendChild(li)
    addClickEvent();
}
function addClickEvent() {
    let children = listHolder.children
// loop through
    for (let i = 0; i < children.length; i++) {
        let child = children[i]

        child.addEventListener('click', () => {
            fetch(`${url}/${i + 1}`)

                .then(res => res.json())
                .then(movie => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                    setUpMovieDetails(movie)
                });

        });
    }
}
// function expre...... and selecting elements
const setUpMovieDetails = (childMovie) =>{
    const prev = document.getElementById('poster')
    prev.src = childMovie.poster;

    const movieT = document.querySelector('#title');
    movieT.innerText = childMovie.title;
    const movieTi = document.querySelector('#runtime');
    movieTi.innerText = `${childMovie.runtime} minutes`;
    const mDescription = document.querySelector('#film-info');
    mDescription.innerText = childMovie.description;
    const showCurrTime = document.querySelector('#showtime')
    showCurrTime.innerText = childMovie.showtime;
    const ticketX = document.querySelector('#ticket-num')
    ticketX.innerText = childMovie.capacity - childMovie.tickets_sold;
}
// Selecting elements
const buttons = document.querySelector('#buy-ticket');
// calling button with click event and prevent default default behavo..
buttons.addEventListener('click', function (e) {
    let Tickets = document.querySelector('#ticket-num').innerText
    e.preventDefault();
    // if tckets is greater than 0 it should display #ticket-num
    if (Tickets > 0) {
        document.querySelector('#ticket-num').innerText = Tickets - 1

    }else if (parseInt(Tickets, 10) === 0) {
        buttons.innerText = 'Sold Out all....'
    }
});
