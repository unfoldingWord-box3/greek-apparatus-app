import React from 'react'

function Switch({ id, label, checked, onChange }) {
  return (
    <div className='flex p-1 items-center'>
      <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name={id}
          id={id}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className='toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none'
        />
        <label
          htmlFor={id}
          className='toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer'
        ></label>
      </div>
      <label htmlFor={id} className='text-xs text-gray-700'>
        {label}
      </label>
    </div>
  )
}

export default Switch
