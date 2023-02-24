import React from 'react'
import NcImage from '../../../shared/NcImage';

const SkeletonFormProduct = () =>  (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-8 animate-pulse'>
      <div className='lg:col-span-2'>
        <div className='bg-gray-300 rounded shadow-sm aspect-w-1 aspect-h-1'>
          <NcImage />
        </div>
      </div>
      <div className='lg:col-span-6'>
        <div className='flex flex-col gap-4 p-4 bg-white rounded-md shadow md:p-10 '>
          <div className='space-y-2'>
            <div className='w-1/2 h-3 bg-gray-100 rounded-md'></div>
            <div className='block w-full h-5 bg-gray-200 rounded-md'></div>
          </div>
          <div className='flex w-full gap-2'>
            <div className='flex flex-col w-full gap-2'>
              <div className='w-1/2 h-3 bg-gray-100 rounded-md'></div>
              <div className='block w-full h-5 bg-gray-200 rounded-md'></div>
            </div>
            <div className='flex flex-col w-full gap-2'>
              <div className='w-1/2 h-3 bg-gray-100 rounded-md'></div>
              <div className='block w-full h-5 bg-gray-200 rounded-md'></div>
            </div>
          </div>
          <div className='flex w-full gap-2'>
            <div className='flex flex-col w-full gap-2'>
              <div className='w-1/2 h-3 bg-gray-100 rounded-md'></div>
              <div className='block w-full h-5 bg-gray-200 rounded-md'></div>
            </div>
            <div className='flex flex-col w-full gap-2'>
              <div className='w-1/2 h-3 bg-gray-100 rounded-md'></div>
              <div className='block w-full h-5 bg-gray-200 rounded-md'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default SkeletonFormProduct
