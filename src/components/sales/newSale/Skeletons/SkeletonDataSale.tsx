import React from 'react';
import Card from '../../../../shared/Card';

const SkeletonDataSale = () => {
  const SkeletonInput = () => (
    <div className='w-full h-5 bg-gray-200 rounded-full' />
  );

  const SkeletonTextarea = () => (
    <div className='w-full h-20 bg-gray-200 rounded-xl' />
  );
  const SkeletonTitle = () => (
    <div className='h-5 max-w-sm mb-4 bg-gray-300 rounded-full' />
  );
  return (
    <div className='animate-pulse'>
      <Card>
        <div className='flex flex-col gap-4'>
          <SkeletonTitle />
          <div className='grid grid-cols-3 gap-4'>
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SkeletonDataSale;
