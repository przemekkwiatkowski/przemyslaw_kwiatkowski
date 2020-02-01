const baseUrl = 'http://localhost:3000/';

export const url = {
  characters: `${baseUrl}characters`,
  species: `${baseUrl}species`,
};

export const getData = (url, id = null, page = null, search = null) => {
  const idQuery = id ? `/${id}` : '';
  const pageQuery = !id && !search && page ? `?_page=${page}` : '';
  const searchQuery = !id && !!search ? `?q=${search}` : '';
  const fetchUrl = `${url}${idQuery}${pageQuery}${searchQuery}`;

  return fetch(fetchUrl);
};
