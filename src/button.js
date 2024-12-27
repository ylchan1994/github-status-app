import React from 'react';

export default function Button({ description, handleFunction }) {
  return (
    <>
    <button className='border border-neutral-800 rounded-lg py-1 px-5 m-3 disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-100'
      onClick={handleFunction}>
    {description}</button>
    </>
  )
}
