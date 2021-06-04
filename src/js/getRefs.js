function getRefs() {
  return {
    searchForm: document.querySelector('.js-search-form'),
    imagesContainer: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    element: document.getElementById('btn'),
  };
}

export default getRefs;
