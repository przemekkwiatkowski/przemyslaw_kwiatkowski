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

export const addData = (url, data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };

  return fetch(`${url}`, options);
};

export const deleteData = (url, id) => {
  const options = {
    method: 'DELETE',
  };

  return fetch(`${url}/${id}`, options);
};

export const editData = (url, id, data) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };

  return fetch(`${url}/${id}`, options);
};

export const checkResponse = res => {
  if (res.ok) {
    return;
  }

  throw new Error(res.statusText);
};
