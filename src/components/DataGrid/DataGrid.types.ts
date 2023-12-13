import { SxProps, TableProps, Theme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

export interface DataGridPropsVariantOverrides {}

export interface SortingProps {
  sort?: string;
  active?: boolean;
}

export interface DataGridBaseProps extends TableProps {
  data: { dataSource: any; columns: any }[];
  sx?: SxProps<Theme>;
  onRowClick?: React.MouseEventHandler;
  variant?: OverridableStringUnion<
    'standard' | 'standard-divider' | 'standard-selectable' | 'quiet' | 'quiet-divider' | 'quiet-selectable',
    DataGridPropsVariantOverrides
  >;
  width?: string;
  height?: string;
}

export interface DataSourceItem {
  [key: string]: string | number;
}

export interface DropdownFilterProps {
  onSelectAll: boolean;
  format?: string;
  data: (string | number)[];
  onFilter: (item: string) => void;
  onOrder: (item: string) => void;
  onChecketAll: (item: boolean) => void;
  onSelected: (item: (string | number)[]) => void;
  itemsSelected: (string | number)[];
  onFilterSelected: () => void;
}

export interface NumberFilterProps {
  onClick: (selectedOption: string) => void;
}

export interface PaginationProps {
  totalItems: number;
  pageSize: number;
}
