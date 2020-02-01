import React, { useState, useEffect } from 'react';

import DataTable from '../../components/dataTable/dataTable.component';
import Search from '../../components/search/search.component';
import Pagination from '../../components/pagination/pagination.component';
import PageTitle from '../../components/pageTitle/pageTitle.component';
import { url, getData } from '../../utils/api';

function ListView() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await getData(url.characters);
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <PageTitle title={'List View'} />
      <Search />
      <DataTable data={data} isLoading={isLoading} isError={isError} />
      <Pagination/>
    </>
  );
}

export default ListView;
