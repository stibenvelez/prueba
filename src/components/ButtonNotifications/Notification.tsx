import { BellIcon } from '@heroicons/react/outline';
import React from 'react'

const Notification = () => {
    return (
        <button className="w-full" onClick={()=>console.log('mosntrando notificacion')}>
            <div className="flex h-20 bg-gray-50 hover:cursor-pointer hover:bg-indigo-50">
                <div className="flex items-center justify-center w-20 h-20 aspect-square">
                    <BellIcon className="h-8 text-green-500" />
                </div>
                <div className="flex flex-col justify-between w-full p-2">
                    <div className='flex flex-col items-start'>
                        <h3 className="font-bold">Venta registrada</h3>
                        <div>
                            <span className='font-bold'>Sandra</span> ha creado una nueva venta
                        </div>
                    </div>
                    <div className="flex justify-end ">
                        <p className="text-xs text-gray-400">10/08/2022 8:27</p>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default Notification
