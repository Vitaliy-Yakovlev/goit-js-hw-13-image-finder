const API_KEY = '21824394-3f4c7e3f700c9b67b092e1424';
const BASE_URL = 'https://pixabay.com/api';

export default class NewsAipService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
  }

  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}&key=${API_KEY}`;

    return fetch(url)
      .then(respons => respons.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetRage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
