import React from 'react';
import './Spinner.css';
const SpinnerButton = () => {
  return (
    <div className={`sk-button-chase`}>
      <div className='sk-button-chase-dot'></div>
      <div className='sk-button-chase-dot'></div>
      <div className='sk-button-chase-dot'></div>
      <div className='sk-button-chase-dot'></div>
      <div className='sk-button-chase-dot'></div>
      <div className='sk-button-chase-dot'></div>
    </div>
  );
};

export default SpinnerButton;
