import React, { useState, useEffect } from "react";

import PageTitle from "@/components/Typography/PageTitle";
import { Badge, Avatar, Button } from "@roketid/windmill-react-ui";
import Header from '@/components/Header'

import Layout from "~/containers/Layout";
import DataTable from "~/components/DataTable";
import { useRouter } from "next/router";
import { RootState } from "~/store/store";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "~/hooks/appStore";
import { fetchRepos, reposType } from "~/store/reposSlice";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

function RepoIndex() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useQueryParams({
    q: StringParam,
    page: withDefault(NumberParam, 1),
    sortBy: StringParam,
  });
  const [sort, setSort] = useState({ sortDirection: 'none', accessor: 'some_accessor' });
  const repos = useAppSelector<typeof reposType>(
    (state: RootState) => state.repos
  );

  const columnHeaderClick = async (column: any) => {
    console.log('triggered - column', column);
    switch (column.sortDirection) {
      case 'none':
        setSort({ direction: 'ASC', accessor: column.id });

        // const desc = await fetchUsers( 'ASC', column.id );
        // setData(desc);
        break;
  
      case 'ASC':
        setSort({ direction: 'DESC', accessor: column.id });
        
        // const asc = await fetchUsers('DESC', column.id);
        // setData(asc);
        break;

      case 'DESC':
        setSort({ direction: 'none', accessor: column.id });
        
        // const newData = await fetchUsers('none', column.id);
        // setData(newData);
        break;
    }
  };


  useEffect(() => {
    toast.promise(dispatch(fetchRepos({ ...query, sort: sort, fresh: true })), {
      loading: "Loading",
      success: "loaded",
      error: "Error",
    });
  }, [query, sort]);
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        sortType: 'basic',
        sortDirection: sort.accessor === 'id' ? sort.direction : 'none'
      },
      {
        Header: "Name",
        accessor: "name",
        sortType: 'basic',
        sortDirection: sort.accessor === 'name' ? sort.direction : 'none',
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center gap-3">
              <div>
                <p className="text-gray-700 dark:text-gray-100">
                  {original.name}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Full Name",
        accessor: "full_name",
        sortType: 'basic',
        sortDirection: sort.accessor === 'id' ? sort.direction : 'none',
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start justify-start gap-3">
                <div>
                    <p>
                        {original.full_name}
                    </p>
                </div>
            </div>
          );
        },
      },
      {
        Header: "URL",
        accessor: "html_url",
        sortType: 'basic',
        sortDirection: sort.accessor === 'id' ? sort.direction : 'none',
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start">
                <div>
                    {original.html_url}
                </div>
            </div>
          )
        },
      },
      {
        Header: "Language",
        accessor: "language",
        sortType: 'basic',
        sortDirection: sort.accessor === 'id' ? sort.direction : 'none',
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start">
                <div>
                    {original.language}
                </div>
            </div>
          )
        },
      },
      {
        Header: "Updated",
        accessor: "updated_at",
        sortType: 'basic',
        sortDirection: sort.accessor === 'id' ? sort.direction : 'none',
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start">
                <div>
                    {original.updated_at}
                </div>
            </div>
          )
        },
      },
      {
        Header: "Pushed",
        accessor: "pushed_at",
        sortType: 'basic',
        sortDirection: sort.accessor === 'id' ? sort.direction : 'none',
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start">
                <div>
                    {original.pushed_at}
                </div>
            </div>
          )
        },
      },
      {
        Header: "Stargazers",
        accessor: "stargazers_count",
        sortType: 'basic',
        sortDirection: sort.accessor === 'id' ? sort.direction : 'none',
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex flex-col items-start">
                <div>
                    {original.stargazers_count}
                </div>
            </div>
          )
        },
      },
    ],
    []
  );

  return (
    <Layout>
      <Header/>
      <PageTitle>Repositories</PageTitle>
      <div className="flex justify-end gap-3 mb-6">
      </div>
      <DataTable
        columns={columns}
        data={repos?.data}
        links={repos?.links}
        meta={repos?.meta}
        onHeaderClick={columnHeaderClick}
      />
    </Layout>
  );
}

export default RepoIndex;
