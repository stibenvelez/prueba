import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../../shared/Select';

interface PaginationProps {
  products: {
    pages: number;
    results: any[];
    totalResults: number;
  };
}

const Pagination: FC<PaginationProps> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Object.fromEntries([...searchParams]).page || '1';

  const habdlePagination = (page: any) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      page: page || 1,
    });
  };

  const handlePrevious = () => {
    if (parseInt(currentPage) > 1) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: (parseInt(currentPage) - 1).toString(),
      });
    }
  };

  const handleNext = () => {
    if (parseInt(currentPage) < products.pages) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: (parseInt(currentPage) + 1).toString(),
      });
    }
  };



  return (
    <div className='flex items-center justify-between py-3 bg-white border-t border-gray-200 '>
      <div className='flex justify-between flex-1 sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
        >
          Previous
        </a>
        <a
          href='#'
          className='relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div className='flex items-center gap-4 '>
          <Select
            direction='horizontal'
            large={false}
            options={[
              { value: '3', label: '3' },
              { value: '10', label: '10' },
              { value: '20', label: '20' },
              { value: '50', label: '50' },
              { value: '100', label: '100' },
            ]}
            label='Elementos por página'
            name='limit'
            onChange={(e) => {
              setSearchParams({
                ...Object.fromEntries([...searchParams]),
                limit: e.target.value,
              });
            }}
            value={Object.fromEntries([...searchParams]).limit || '10'}
          />
          {products?.totalResults && (
            <div className='flex items-baseline gap-2'>
              <p className='text-sm text-gray-700'>
                {/* Showing <span className='font-medium'>1</span> to{' '}
              <span className='font-medium'>10</span> of{' '} */}
                {products?.totalResults}
              </p>
              <p>productos</p>
            </div>
          )}
        </div>
        <div>
          <nav
            className='inline-flex -space-x-px rounded-md shadow-sm isolate'
            aria-label='Pagination'
          >
            {currentPage !== '1' && (
              <button
                onClick={() => handlePrevious()}
                className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20'
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon className='w-5 h-5' aria-hidden='true' />
              </button>
            )}
            {products?.pages &&
              products?.pages > 1 &&
              [...Array(products?.pages).keys()].map((page: any) => (
                <button
                  key={page + 1}
                  onClick={() => habdlePagination(page + 1)}
                  aria-current='page'
                  className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium border bg-gray-50  ${
                    currentPage == page + 1
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600  focus:z-20 outline-1 outline-indigo-500 '
                      : 'text-gray-500 border-gray-300 '
                  }}
                  ${currentPage === '1' && page !== 1 ? ' rounded-l-md ' : ''}
                  `}
                >
                  {page + 1}
                </button>
              ))}
            {/* <span className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300'>
              ...
            </span> */}

            {parseInt(currentPage) !== products.pages && (
              <button
                onClick={() => handleNext()}
                className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20'
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon className='w-5 h-5' aria-hidden='true' />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
