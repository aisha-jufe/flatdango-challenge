let url = 'http://localhost:3000/films'
const listHolder = document.getElementById('films')
document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('film item')[0].remove()
    fetchMovies(url)
})

//Create fetch function
const fetchMovies = (url) =>{
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                displayMovie(movie)
            });
        })
}

const  displayMovie = (movie) =>{

    const li = document.createElement('li')
    li.textContent = (movie.title).toUpperCase()
    listHolder.appendChild(li)
    addClickEvent()
}
const addClickEvent = () =>{
    let children = listHolder.children
    

    for (let i = 0; i < children.length; i++) {
        let child = children[i]
        

        child.addEventListener('click', () => {
            fetch(`${url}/${i + 1}`)

                .then(res => res.json())
                .then(movie => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                    setUpMovieDetails(movie)
                })

        })
    }
}
const setUpMovieDetails =(childMovie)=> {
    const preview = document.querySelector('#poster')
    preview.src = childMovie.poster;

    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = childMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${childMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = childMovie.description;
    const showTime = document.querySelector('#showtime')
    showTime.textContent = childMovie.showtime;
    const tickets = document.querySelector('#ticket-num')
    tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}
const button = document.getElementById('buy-ticket')

button.addEventListener('click', function (e) {
    let remTickets = document.querySelector('#ticket-num').textContent
    e.preventDefault()
    if (remTickets > 0) {
        document.querySelector('#ticket-num').textContent = remTickets - 1

    }
    else if (parseInt(remTickets, 10) === 0) {
        button.textContent = 'Sold Out'
    }
});

