import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toast = () => {
  return (
    <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
  )
}

export default Toast
