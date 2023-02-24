import React, { FC } from 'react';

interface TableProps {
  className?: string;
  headers: {
    accessor: string;
    header: string;
  }[];
  data: any;
  fullWidth?: boolean;
}

interface RowProps {
  children: React.ReactNode;
}

export const Table: FC<TableProps> = ({
  className = '',
  headers,
  data,
  fullWidth,
}) => {
  const Row: FC<RowProps> = ({ children }) => {
    return (
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
        {children}
      </tr>
    );
  };

  const Thead = () => {
    return (
      <thead className='text-xs uppercase text-gray-50 bg-slate-800 dark:bg-gray-700 dark:text-gray-400'>
        {headers.map((header) => (
          <th key={header.accessor} className='px-4 py-3 tracking-wider'>
            {header.header}
          </th>
        ))}
      </thead>
    );
  };

  const Tbody = () => (
    <tbody>
      {data &&
        data.map((row, i) => (
          <Row key={i}>
            {Object.keys(row).map((key) => (
              <td key={key} className='px-4 py-3 text-gray-800 capitalize'>
                {row[key]}
              </td>
            ))}
          </Row>
        ))}
    </tbody>
  );

  return (
    <div
      className={` overflow-auto shadow-md sm:rounded-lg ${className} ${
        fullWidth ? 'w-full' : 'w-fit'
      }`}
    >
      <table className='w-full text-sm text-left text-white w dark:text-gray-400'>
        <Thead />
        <Tbody />
      </table>
    </div>
  );
};

Table.defaultProps = {
  headers: [],
  fullWidth: true,
};

export default Table;
