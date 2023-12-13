import React, { useEffect, useState, useRef, useMemo } from 'react';

import { Box, Stack, Paper } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import DropdownFilter from './base/dropdown';
import { Pagination as MuiPagination } from '@mui/material';

import { filterDataSource, groupByDataSource, sortDataSourceByColumn } from './shared';

import {
  ButtonStyled,
  DataGridHeaderStyled,
  HeaderCogStyled,
  TableCellStyled,
  TableRowStyled,
  TotalRecordsStyled,
  TableCellBodyStyled
} from './styled';
import { DataGridBaseProps, DataSourceItem } from './DataGrid.types';

export function ArrowSmallUpIcon(props: any) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z"
      />
    </svg>
  );
}

export function Cog6ToothIcon(props: any) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

// const dataSource = generateRandomDataSource(30);
// const DataGrid: React.FC<DataGridBaseProps> = ({ data = [], onRowClick }) => {
const DataGrid = ({ data = [], onRowClick, ...rest }:DataGridBaseProps) => {
  const pageSize = 10;
  const columns = useMemo(() => {
    return data[0].columns;
  }, [data]);
  const dataSource = useMemo(() => {
    return data[0].dataSource;
  }, [data]);

  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

  const [sorting, setSorting] = useState('down');
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [currentActiveSorting, setCurrentActiveSorting] = useState<string>('id');

  const [currentDropDownActive, setCurrentDropDownActive] = useState<string | null>(null);

  const [originalDataSource, setOriginalDataSource] = useState<DataSourceItem[]>([]);
  const [newDataSource, setDataSource] = useState<DataSourceItem[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);

  const sortRefs = useRef<(React.RefObject<HTMLTableCellElement> | null)[]>(new Array(columns.length).fill(null));

  const handleItemSelected = (items: (string | number)[]) => {
    setSelectedItems(items);
  };

  const handleDropDown = (item: any) => {
    setCurrentDropDownActive(item === currentDropDownActive ? null : item);
    if (item !== currentDropDownActive) {
      setCurrentActiveSorting(item);
      setSorting('down');
    }
  };

  const handleSorting = (sort: string) => {
    setSorting(sort === 'up' ? 'up' : 'down');
    currentDropDownActive && setCurrentActiveSorting(currentDropDownActive);
    handleDropDown(currentDropDownActive);
  };

  const handleFilter = (filter: string) => {
    const dataSourceFiltered = filterDataSource(originalDataSource, currentActiveSorting, filter);
    setOriginalDataSource(dataSourceFiltered);
    setCurrentPage(1);
  };

  const handleFilterSelected = () => {
    if (selectedItems.length > 0) {
      const filteredData = originalDataSource.filter((item: DataSourceItem) => {
        const columnValue = currentActiveSorting ? item[currentActiveSorting] : undefined;

        if (typeof columnValue === 'string') {
          return selectedItems.includes(columnValue);
        } else if (typeof columnValue === 'number') {
          return selectedItems.includes(columnValue.toString());
        }
        return false;
      });

      const sortedData = sortDataSourceByColumn(filteredData, currentActiveSorting, sorting);
      setTotalRecords(sortedData.length);
      setTotalPages(Math.ceil(sortedData.length / pageSize));
      setCurrentPage(1);
      setDataSource(sortedData.slice(startIndex, endIndex));
    } else {
      const sortedData = sortDataSourceByColumn(newDataSource, currentActiveSorting, sorting);
      setTotalRecords(sortedData.length);
      setTotalPages(Math.ceil(sortedData.length / pageSize));
      setCurrentPage(1);
      setDataSource(sortedData.slice(startIndex, endIndex));
    }
    handleDropDown(currentDropDownActive);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRecords);
    setDataSource(originalDataSource.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (selectedItems.length <= 0) {
      const sortedData = sortDataSourceByColumn(newDataSource, currentActiveSorting, sorting);
      setDataSource(sortedData.slice(startIndex, endIndex));
      setTotalRecords(sortedData.length);
      setTotalPages(Math.ceil(sortedData.length / pageSize));
      setCurrentPage(1);
    }
  }, [selectedItems, dataSource]);

  useEffect(() => {
    setOriginalDataSource(dataSource)
    setDataSource(dataSource)
    setTotalRecords(dataSource.length)
    setTotalPages(Math.ceil(dataSource.length / pageSize))
  }, [dataSource])

  return (
    <Box sx={{ width: '100%', minHeight: 480 }}>
      <DataGridHeaderStyled>
        <TotalRecordsStyled>{totalRecords} results found for this search</TotalRecordsStyled>
        <HeaderCogStyled type="button">
          <Cog6ToothIcon width={24} height={24} />
        </HeaderCogStyled>
      </DataGridHeaderStyled>
      <TableContainer component={Paper} sx={{ overflowX: 'inherit' }}>
        <Table sx={{ minWidth: 650, width: '100%' }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns &&
                columns.map((item: any, key: any) => (
                  <TableCellStyled
                    key={key}
                    ref={ref => (sortRefs.current[key] = ref as React.RefObject<HTMLTableCellElement> | null)}
                  >
                    <Stack direction="row" spacing={2} sx={{ position: 'relative' }}>
                      <ButtonStyled
                        variant="text"
                        size="small"
                        color={currentActiveSorting === item.field ? 'primary' : 'inherit'}
                        endIcon={
                          currentActiveSorting === item.field && sorting === 'up' ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )
                        }
                        onClick={() => {
                          handleDropDown(item.field);
                        }}
                      >
                        {item.headerText}
                      </ButtonStyled>
                      {currentDropDownActive && currentDropDownActive === item.field && (
                        <DropdownFilter
                          format={item.format}
                          onOrder={handleSorting}
                          onFilter={handleFilter}
                          onSelected={handleItemSelected}
                          itemsSelected={selectedItems}
                          onFilterSelected={handleFilterSelected}
                          onChecketAll={setSelectAll}
                          onSelectAll={selectAll}
                          data={groupByDataSource(newDataSource, item.field)}
                        />
                      )}
                    </Stack>
                  </TableCellStyled>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {newDataSource &&
              newDataSource.map((item: DataSourceItem, key: number) => (
                <TableRowStyled key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {Object.keys(item).map(columnKey => (
                    <TableCellBodyStyled className={!!onRowClick ? 'is-interactive' : ''} onClick={(e) => { !!onRowClick && onRowClick(e) }} component="th" scope="row" key={columnKey} sx={{  textAlign: columns.find((c:any) => c.field === columnKey)?.textAlign || "center"}}>
                      {item[columnKey]}
                    </TableCellBodyStyled>
                  ))}
                </TableRowStyled>
              ))}
          </TableBody>
        </Table>
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid #ccc',
            padding: 2,
          }}
        >
          <MuiPagination
            variant="outlined"
            shape="rounded"
            count={totalPages}
            page={currentPage}
            onChange={(_event, page) => handleChangePage(page)}
          />
        </Stack>
      </TableContainer>
    </Box>
  );
};

export default DataGrid;