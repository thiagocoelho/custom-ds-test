import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NumberFilterProps } from '@/interfaces';

const items = [
  'Equal',
  'Does not equal',
  'Greater than',
  'Greater than or equal to',
  'Less than',
  'Less than or equal to',
  'Between',
];

const NumberFilter: React.FC<NumberFilterProps> = () => {
  return (
    <List
      sx={{
        bgcolor: '#FFF',
        position: 'absolute',
        minHeight: '190px',
        top: '0',
        left: 'auto',
        right: 'auto',
        minWidth: '240px',
        zIndex: '9',
        padding: '5px 10px',
        boxShadow: '0 0 10px #ccc',
      }}
    >
      {items.map((value, key) => (
        <ListItem key={key} disableGutters>
          <ListItemText primary={`${value}...`} />
        </ListItem>
      ))}
    </List>
  );
};

export default NumberFilter;
