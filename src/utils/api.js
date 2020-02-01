const baseUrl = 'http://localhost:3000/';

export const url = {
  characters: `${baseUrl}characters`,
  species: `${baseUrl}species`,
};

export const setPageQuery = page => `_page=${page}`;

export const getData = (url, id = null, query = null) => {
  const idPath = id ? `/${id}` : '';
  const queryPath = !id && query ? `?${query}` : '';

  return fetch(`${url}${idPath}${queryPath}`);
};
