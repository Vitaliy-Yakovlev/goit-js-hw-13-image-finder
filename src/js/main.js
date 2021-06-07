import hitsTpl from '../templates/images.hbs';
import NewsAipService from './apiService';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  imagesContainer: document.querySelector('.js-gallery'),
};

const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });

const newsAipService = new NewsAipService();

loadMoreBtn.enable();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  newsAipService.query = e.currentTarget.elements.query.value.trim();
  if (newsAipService.query.length === 0) {
    return;
  }

  loadMoreBtn.show();
  newsAipService.resetRage();
  clearHitsСontainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  newsAipService.fetchImages().then(images => {
    appendHitsMarkup(images);
    loadMoreBtn.enable();
  });
}

function appendHitsMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', hitsTpl(images));
  onScpoll();
}

function clearHitsСontainer() {
  refs.imagesContainer.innerHTML = '';
}

function onScpoll() {
  if (newsAipService.page > 2) {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 180,
        behavior: 'smooth',
      });
    }, 600);
  }
}
