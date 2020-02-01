import React from 'react';

import DataTable from '../../components/dataTable/dataTable.component';
import Search from '../../components/search/search.component';
import Pagination from '../../components/pagination/pagination.component';
import PageTitle from '../../components/pageTitle/pageTitle.component';

function ListView() {
  return (
    <>
      <PageTitle title={'List View'} />
      <Search />
      <DataTable />
      <Pagination/>
    </>
  );
}

export default ListView;
