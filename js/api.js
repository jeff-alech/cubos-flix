const inputSearch = document.querySelector('.input');
const api = axios.create({
    baseURL: 'https://tmdb-proxy.cubos-academy.workers.dev',
    timeout: 10000,
    headers: {'Content-Type': 'Application/json'}
  });

  let response;
  let data;
  let results;
  let endpointSearch = '/3/discover/movie?language=pt-BR&include_adult=false'; 
  async function getAllMovies() {
    try {
      response = await api.get(`${endpointSearch}`);
      data = response.data;
      results = data.results;
      return response;
    } catch (error) {
      return error;
    }
  }

  let value;
  inputSearch.addEventListener('keydown', async (event) => {
    if (event.code === 'Enter' && inputSearch.value === '') {
      event.preventDefault();
      event.stopPropagation();
      endpointSearch = '/3/discover/movie?language=pt-BR&include_adult=false';
      await renderMovies()
    } else if (event.code === 'Enter' && inputSearch.value !== '') {
      value = inputSearch.value;
      endpointSearch = `/3/search/movie?language=pt-BR&include_adult=false&query=${value.trim()}`;
      await renderMovies();
      inputSearch.value = ''
    }
  });

  let responseInfoOfTheDay;
  let responseVideoOfTheDay;
  let dataInfoOfTheDay;
  let dataVideoOfTheDay;
  async function getMovieOfTheDay(){
    try{
      responseInfoOfTheDay = await api.get('/3/movie/436969?language=pt-BR')
      responseVideoOfTheDay = await api.get('/3/movie/436969/videos?language=pt-BR')
      dataInfoOfTheDay = responseInfoOfTheDay.data
      dataVideoOfTheDay = responseVideoOfTheDay.data.results
    }catch(error){
      return error
    }
  }
  



