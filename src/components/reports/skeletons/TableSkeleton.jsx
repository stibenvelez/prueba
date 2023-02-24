import React from 'react'

const TableSkeleton = () => {
  return (
      <div className="relative flex flex-col overflow-x-auto shadow-md sm:rounded-lg animate-pulse">
          <div className="h-10 text-xs text-white uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400"></div>
          <div className="flex flex-col gap-6 p-4 px-2">
              <div className="flex gap-2">
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
              </div>
              <div className="flex gap-2">
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
              </div>
              <div className="flex gap-2">
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
              </div>
              <div className="flex gap-2">
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
              </div>
              <div className="flex gap-2">
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
                  <div className="w-full h-5 rounded-md bg-slate-200"></div>
              </div>
          </div>
      </div>
  );
}

export default TableSkeleton;
