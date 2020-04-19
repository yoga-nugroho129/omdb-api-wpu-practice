const searchButton = document.querySelector('.search-button')
const moviesContainer = document.querySelector('.movies-container')

const moviesSearch = function () {
  const searchKeyword = document.querySelector('.movies-search')

  fetch(`http://www.omdbapi.com/?apikey=7a6b2e1b&s=${searchKeyword.value}`)
    .then((response) => response.json())
    .then((response) => {
      if (searchKeyword.value == '') {
        moviesContainer.innerHTML = `<h3 style="color:red;">Please Input Keyword...</h3>`
      } else if (response.Response == 'False') {
        moviesContainer.innerHTML = `<h3 style="color:red;">${response.Error}</h3>`
      } else {
        const moviesResult = response.Search
        let cards = ''
        moviesResult.forEach((movie) => (cards += showMovies(movie)))

        moviesContainer.innerHTML = cards
        searchKeyword.value = ''

        // details button handler
        const detailButton = document.querySelectorAll('.modal-detail-button')

        detailButton.forEach((btn) => {
          btn.addEventListener('click', function () {
            const imdbid = this.dataset.imdbid

            fetch(`http://www.omdbapi.com/?apikey=7a6b2e1b&i=${imdbid}`)
              .then((response) => response.json())
              .then((response) => {
                const movieDetail = showDetail(response)
                let modalBody = document.querySelector('.modal-body')
                modalBody.innerHTML = movieDetail
              })
          })
        })
      }
    })
}

searchButton.addEventListener('click', moviesSearch)

const showMovies = function (m) {
  return `<div class="my-2 col-md-3 col-sm-6">
            <div class="card">
              <img src="${m.Poster}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
                data-target="#exampleModalCenter" data-imdbid = ${m.imdbID}>Show Details</a>
              </div>
            </div>
          </div>`
}

const showDetail = function (m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img class="img-fluid" src="${m.Poster}" alt="" />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                  <li class="list-group-item">
                    <strong>Director : ${m.Director}</strong>
                  </li>
                  <li class="list-group-item"><strong>Genre</strong> : ${m.Genre}</li>
                  <li class="list-group-item"><strong>Actors</strong> : ${m.Actors}</li>
                  <li class="list-group-item"><strong>Synopsis</strong> :<br>${m.Plot}</li>
                </ul>
              </div>
            </div>
          </div>`
}
