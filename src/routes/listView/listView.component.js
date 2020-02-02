import React, { useState, useEffect } from 'react';

import DataTable from '../../components/dataTable/dataTable.component';
import Search from '../../components/search/search.component';
import Pagination from '../../components/pagination/pagination.component';
import PageTitle from '../../components/pageTitle/pageTitle.component';
import { url, getData } from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';

const ITEMS_PER_PAGE = 10;

const ListView = () => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 200);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const responseQuery = await getData(url.characters, null, currentPage, searchValue);
        const queryData = await responseQuery.json();

        const responseFull = await getData(url.characters);
        const fullData = await responseFull.json();

        setData(queryData);
        setDataLength(fullData.length);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line
  }, [currentPage, debouncedSearchValue]);

  const getLastPage = () => Math.ceil( dataLength / ITEMS_PER_PAGE );

  const renderPagination = () => {
    return (
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={getLastPage()}
      />
    );
  };

  return (
    <>
      <PageTitle title={'List View'} />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <DataTable data={data} isLoading={isLoading} isError={isError} />
      {!isError && !searchValue && dataLength > ITEMS_PER_PAGE && renderPagination()}
    </>
  );
}

export default ListView;
