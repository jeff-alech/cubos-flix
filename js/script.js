const arrayMonth = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const body = document.querySelector('body')
const header = document.querySelector('header')
const logo = document.querySelector('header img');
const headerTitle = document.querySelector('.header__title')
const btnTheme = document.querySelector('.btn-theme');
const container = document.querySelector('.movies-container');
const btnPrev = document.querySelector('.btn-prev');
const divMovies = document.querySelector('.movies');
const btnNext = document.querySelector('.btn-next');
const highlight = document.querySelector('.highlight')
const highlightInfo = document.querySelector('.highlight__info')
const highlightVideoLink = document.querySelector('.highlight__video-link');
const highlightVideo = document.querySelector('.highlight__video');
const highlightTitle = document.querySelector('.highlight__title');
const highlightRating = document.querySelector('.highlight__rating');
const highlightGenres = document.querySelector('.highlight__genres');
const highlightLaunch = document.querySelector('.highlight__launch');
const highlightDescription = document.querySelector('.highlight__description');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal__body');
const modalClose = document.querySelector('.modal__close');
const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalGenreAverage = document.querySelector('.modal__genre-average');
const modalGenres = document.querySelector('.modal__genres');
const modalAverage = document.querySelector('.modal__average');


let moviesData = [];
let page = 0;
let resultsPage;
let movie;
let infos = [];
let idMovie = [];
let id;
async function renderMovies() {
  moviesData = await getAllMovies();
  let html = [];
  resultsPage = results.slice(0, 18);
  resultsPage.slice(page, page + 6).forEach(movies => {
    infos.push(movies.title)
    idMovie.push(movies.id)

    html += `
    <div class="movie" style="background-image: URL('${movies.poster_path}')";>
        <div class="movie__info">
            <span class="movie__title">${movies.title}</span>
            <span class="movie__rating">${movies.vote_average.toFixed(1)}
                 <img src=${"./assets/estrela.svg"} alt="Estrela">
            </span>
         </div>
    </div>        
 `
  })
  divMovies.innerHTML = html;

}
renderMovies()

btnNext.addEventListener('click', () => {
  page += 6
  renderMovies()
  if (page > resultsPage.length - 6) {
    page = 0
  }
})
btnPrev.addEventListener('click', () => {
  page -= 6
  renderMovies()
  if (page < 0) {
    page = resultsPage.length - 6
  }
})


let dataModal;
async function getModal(id) {
  try {
    const responseModal = await api.get(`/3/movie/${id}?language=pt-BR`);
    return responseModal.data;
  } catch (error) {
    return (error);
  }
}

async function activeModal() {
  divMovies.addEventListener('click', async (event) => {
    if (event.target.classList.contains('movie')) {
      modal.classList.remove('hidden');
      const selectedTitle = event.target.innerText;
      const index = infos.indexOf(selectedTitle.slice(0, -3).trim());
      if (index !== -1) {
        const id = idMovie[index];
        if (id.length !== '') {
          const modalData = await getModal(id);
          dataModal = modalData;
          await modalFill();
        }
      }
    }
  });
}
activeModal();

async function modalFill() {
  modalTitle.innerText = await dataModal.title;
  modalImg.src =  await dataModal.backdrop_path;
  modalDescription.innerText = await dataModal.overview;
  modalAverage.innerText = await dataModal.vote_average.toFixed(1);
  modalGenres.innerHTML = await '';
  for (let i = 0; i < dataModal.genres.length; i++) {
    const spanModal = document.createElement('span');
    spanModal.innerText = dataModal.genres[i].name;
    spanModal.classList.add('modal__genre');
    modalGenres.appendChild(spanModal);
  }
  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden')
  });
  modalBody.addEventListener('click', () => {
    modal.classList.add('hidden')
  });
}


let movieDay;
async function movieOfTheDay() {
  movieDay = await getMovieOfTheDay()
  const year = dataInfoOfTheDay.release_date.slice(0, 4);
  const monthLaunch = parseInt(dataInfoOfTheDay.release_date.slice(5, 7));
  const day = dataInfoOfTheDay.release_date.slice(8, 10);
  highlightVideo.style.backgroundImage = `url('${dataInfoOfTheDay.backdrop_path}')`;
  highlightVideo.style.backgroundSize = 'cover';
  highlightTitle.innerText = dataInfoOfTheDay.title;
  highlightRating.innerText = dataInfoOfTheDay.vote_average.toFixed(1);
  const genreName = dataInfoOfTheDay.genres.map(names => names.name);
  const listGenres = genreName.join(', ');
  highlightGenres.innerText = listGenres;
  highlightLaunch.innerText = ` / ${day} DE ${arrayMonth[monthLaunch - 1].toUpperCase()} DE ${year}`;
  highlightDescription.innerText = dataInfoOfTheDay.overview;
  highlightVideo.addEventListener('click', () => {
    highlightVideoLink.href = `https://www.youtube.com/watch?v=${dataVideoOfTheDay[0].key}`;
  });
}
movieOfTheDay();

btnTheme.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark')
    verifyTheme()
  } else {
    localStorage.setItem('theme', 'light')
    verifyTheme()
  }
});

function verifyTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    body.classList.add('dark-mode');
    header.classList.add('dark-mode');
    headerTitle.classList.add('dark-mode');
    container.classList.add('dark-theme');
    highlight.classList.add('dark-theme');
    highlightTitle.classList.add('dark-theme');
    highlightDescription.classList.add('dark-theme');
    highlightLaunch.classList.add('dark-theme');
    highlightGenres.classList.add('dark-theme');
    logo.src = './assets/logo.svg';
    btnTheme.src = './assets/dark-mode.svg';
    btnPrev.src = './assets/arrow-left-light.svg';
    btnNext.src = './assets/arrow-right-light.svg';
    modalClose.src = './assets/close.svg';
    modalBody.style.background = 'var(--bg-dark-box)';
    inputSearch.style.color = 'var(--text-base)';
    inputSearch.style.caretColor = 'var(--text-base)';
    modalTitle.style.color = 'var(--text-base)';
    modalDescription.style.color = 'var(--text-base)';
  } else {
    body.classList.remove('dark-mode');
    body.classList.remove('dark-mode');
    body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    headerTitle.classList.remove('dark-mode');
    container.classList.remove('dark-theme');
    highlight.classList.remove('dark-theme');
    highlightTitle.classList.remove('dark-theme');
    highlightDescription.classList.remove('dark-theme');
    highlightLaunch.classList.remove('dark-theme');
    highlightGenres.classList.remove('dark-theme');
    logo.src = './assets/logo-dark.png'
    btnTheme.src = './assets/light-mode.svg'
    btnPrev.src = './assets/arrow-left-dark.svg'
    btnNext.src = './assets/arrow-right-dark.svg'
  }
}
verifyTheme()