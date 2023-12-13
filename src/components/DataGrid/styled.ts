import {
  Box,
  Button,
  Typography,
  TableRow,
  TableCell,
  tableCellClasses,
  TypographyProps,
  BoxProps,
  ButtonProps,
  TableCellProps,
  TableRowProps,
} from '@mui/material';

import { StyledComponent } from '@emotion/styled';
import { styled } from '@mui/material/styles';

const DataGridHeaderStyled: StyledComponent<BoxProps> = styled(Box)({
  display: 'flex',
  position: 'relative',
});

const TotalRecordsStyled: StyledComponent<TypographyProps> = styled(Typography)({
  paddingTop: '24px',
  paddingBottom: '24px',
  paddingLeft: '15px',
  font: 'normal normal normal 18px/24px Source Sans Pro',
});

const HeaderCogStyled: StyledComponent<ButtonProps> = styled(Button)({
  position: 'absolute',
  top: '24px',
  right: '30px',
  border: '0',
  padding: 0,
  background: 'none',
  width: '24px',
  height: '24px',
  cursor: 'pointer',
});

const TableCellStyled: StyledComponent<TableCellProps> = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFF',
    color: '#333',
    font: 'normal normal 600 14px/20px Source Sans Pro',
    position: 'relative',
    fontWeight: 'bold',
    padding: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableCellBodyStyled: StyledComponent<TableCellProps> = styled(TableCell)(() => ({
  [`&.is-interactive`]: {
    cursor: 'pointer',
    [`&:hover`]: {
      opacity: .75
    }
  }
}));

const TableRowStyled: StyledComponent<TableRowProps> = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ButtonStyled: StyledComponent<ButtonProps> = styled(Button)({
  fontWeight: 'bold',
  margin: 0,
  padding: 0,
  textAlign: "left"
});

const DropDownStyled: StyledComponent<BoxProps> = styled(Box)({
  position: 'absolute',
  minHeight: '220px',
  top: '30px',
  left: '-50%',
  width: '292px',
  display: 'flex',
  background: '#fff',
  zIndex: 9,
  border: 0,
  boxShadow: '0 0 10px #ccc',
  padding: '5px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

export {
  DataGridHeaderStyled,
  TotalRecordsStyled,
  HeaderCogStyled,
  TableCellStyled,
  TableRowStyled,
  ButtonStyled,
  DropDownStyled,
  TableCellBodyStyled
};
