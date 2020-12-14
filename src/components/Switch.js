import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

function Switch({ checked, isRequireAncient, isRequireTranslatable, onChange, onRequireAncientChange, onRequireTranslatableChange }) {
  return (
    <div className='flex p-1 items-center'>
      <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name='toggle'
          id='toggle'
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className='toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none'
        />
        <label
          htmlFor='toggle'
          className='toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer'
        ></label>
      </div>
      <label htmlFor='toggle' className='text-xs text-gray-700 pr-2'>
        Chapter View
      </label>
      
      <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name='requireAncient'
          id='requireAncient'
          checked={isRequireAncient}
          onChange={e => onRequireAncientChange(e.target.checked)}
          className='toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none'
        />
        <label
          htmlFor='requireAncient'
          className='toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer'
        ></label>
      </div>
      <label htmlFor='requireAncient' className='text-xs text-gray-700 pr-2'>
        Require Ancient Sources
      </label>
      
      <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name='requireTranslatable'
          id='requireTranslatable'
          checked={isRequireTranslatable}
          onChange={e => onRequireTranslatableChange(e.target.checked)}
          className='toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none'
        />
        <label
          htmlFor='requireTranslatable'
          className='toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer'
        ></label>
      </div>
      <label htmlFor='requireTranslatable' className='text-xs text-gray-700'>
        Require Translatable Variants
      </label>
    </div>
  )
}

export default Switch
