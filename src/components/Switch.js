import React from 'react';

function Switch(props) {
  return (
    <div className='flex items-center'>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none"/>
        <label for="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
      </div>
      <label for="toggle" className="text-xs text-gray-700">Chapter View</label>
    </div>
  );
}

export default Switch;