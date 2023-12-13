import React, { useState, useEffect, Fragment } from 'react';
import NumberFilter from './number-filter';
import { Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';

import { Search } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { DropDownStyled } from '../styled';

import { ArrowSmallDownIcon, ArrowSmallUpIcon, FunnelIcon } from '../icons';
import { DropdownFilterProps } from '../DataGrid.types';

const DropdownFilter = ({
  onOrder,
  onFilter,
  onSelected,
  onFilterSelected,
  itemsSelected,
  onSelectAll,
  onChecketAll,
  data,
}: DropdownFilterProps) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState(onSelectAll);
  const [selecteds, setItemsSelected] = useState<(string | number)[]>(itemsSelected);

  const handleFilter = () => {
    setOpenFilter(prevState => !prevState);
  };

  const handleFilterSelected = () => {
    if (itemsSelected.length > 0) {
      onFilterSelected();
    } else {
      onSelected([]);
      onFilter('');
      onFilterSelected();
    }
  };

  const handleCheckboxChange = (option: string) => {
    const updatedSelection = selecteds.includes(option)
      ? selecteds.filter(selected => selected !== option)
      : [...selecteds, option];

    setItemsSelected(updatedSelection);
    onSelected(updatedSelection);
  };

  const handleSelectAll = () => {
    setSelectAll(selectAll ? false : true);
    onChecketAll(selectAll ? false : true);

    if (!selectAll) {
      const allItems = data.map((item: any) => item.toString());
      setItemsSelected(allItems);
      onSelected(allItems);
    } else {
      setItemsSelected([]);
      onSelected([]);
    }
  };

  useEffect(() => {
    setItemsSelected(selectAll ? data.map(String) : []);
    onSelected(selectAll ? data.map(String) : []);
  }, [selectAll]);

  useEffect(() => {
    setItemsSelected(itemsSelected);
  }, [selecteds]);

  return (
    <DropDownStyled>
      <Fragment>
        <MenuList>
          <MenuItem
            onClick={() => {
              onOrder('down');
              setOpenFilter(false);
            }}
          >
            <ListItemIcon>
              <ArrowSmallUpIcon width="16" height="16" />
            </ListItemIcon>
            <ListItemText>Classificar de A a Z</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onOrder('up');
              setOpenFilter(false);
            }}
          >
            <ListItemIcon>
              <ArrowSmallDownIcon width="16" height="16" />
            </ListItemIcon>
            <ListItemText>Classificar de Z a A</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleFilter}>
            <ListItemIcon>
              <FunnelIcon width="16" height="16" />
            </ListItemIcon>
            <ListItemText>Filtro por números</ListItemText>
            <Typography variant="body2" color="text.secondary">
              <KeyboardArrowRightIcon fontSize="medium" style={{ position: 'relative', top: '5px' }} />
            </Typography>
            {openFilter && (
              <React.Fragment>
                <NumberFilter onClick={() => console.log('Me clicou')} />
              </React.Fragment>
            )}
          </MenuItem>
          <Divider />
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search" size="small">
              Buscar
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
              onChange={event => {
                onFilter(event.target.value);
              }}
              label="Buscar"
              fullWidth
              size="small"
            />
          </FormControl>
          <Divider />
          <List
            sx={{
              bgcolor: '#f2f2f2',
              padding: ' 5px',
              overflow: ' auto',
              width: ' 100%',
              height: ' 120px',
            }}
          >
            <ListItem disablePadding onClick={handleSelectAll}>
              <ListItemButton role={undefined} sx={{ py: 0, minHeight: 32 }}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    checked={selectAll}
                    disableRipple
                    inputProps={{ 'aria-labelledby': 'all' }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={'all'}
                  primary={selectAll ? 'Deselect All' : 'Select All'}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 'medium',
                  }}
                />
              </ListItemButton>
            </ListItem>
            {data.map((item: any, key: number) => {
              const labelId = `checkbox-list-label-${item.toString()}`;
              return (
                <ListItem key={key} disablePadding onClick={() => handleCheckboxChange(item.toString())}>
                  <ListItemButton role={undefined} sx={{ py: 0, minHeight: 32 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        checked={selecteds.includes(item.toString())}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`${item}`}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'medium',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </MenuList>
        <Button variant="outlined" sx={{ align: 'right' }} onClick={handleFilterSelected}>
          Confirm
        </Button>
      </Fragment>
    </DropDownStyled>
  );
};

export default DropdownFilter;
