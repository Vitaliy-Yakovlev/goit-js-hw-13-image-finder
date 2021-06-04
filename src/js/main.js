import hitsTpl from '../templates/images.hbs';
import getRefs from './getRefs';
import NewsAipService from './apiService';

const refs = getRefs();

const newsAipService = new NewsAipService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.element.addEventListener('click', onScpoll);

function onSearch(e) {
  e.preventDefault();

  clearHitscontainer();

  newsAipService.query = e.currentTarget.elements.query.value.trim();
  if (newsAipService.query.length === 0) {
    return;
  }
  newsAipService.resetRage();
  newsAipService.fetchImages().then(appendHitsMarkup);
}

function onLoadMore() {
  newsAipService.fetchImages().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', hitsTpl(hits));
  onScpoll();
}

function clearHitscontainer() {
  refs.imagesContainer.innerHTML = '';
}

function onScpoll() {
  setTimeout(() => {
    if (newsAipService.page > 2) {
      refs.element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, 500);
}
