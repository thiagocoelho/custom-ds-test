import React from 'react';
import { SortingProps } from '../DataGrid.types';

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

const Sorting: React.FC<SortingProps> = ({ sort, active }) => {
  const sortIcon = <ArrowSmallUpIcon />;
  const opacityValue = active ? 1 : 0.5;

  return (
    <button type="button" style={{ opacity: opacityValue }} className="arrows">
      {sort && sortIcon}
    </button>
  );
};

export default Sorting;
