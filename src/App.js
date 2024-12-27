import React, { useEffect, useState } from 'react';
import Button from './button';
import axios from 'axios';

export default function App() {
  const [ pageStatus, setPageStatus ] = useState('');
  const [ refresh, setRefresh ] = useState(false);
  const [ services, setServices ] = useState([]);
  const [ status, setStatus ] = useState([]);

  function handleRefresh(event) {
    event.preventDefault();
    setRefresh( prev => !prev );
  }

  useEffect(() => {
    console.log('called')
    axios.get('https://www.githubstatus.com/')
      .then( response => {
        const dom = new DOMParser()
        const document = dom.parseFromString(response.data, 'text/html');

        const allStatus = document.querySelector('.page-status .status').innerText.trim();
        setPageStatus(allStatus);

        setServices(document.querySelectorAll('.name'));
        setStatus(document.querySelectorAll('.component-status'));        
      })
      .catch( response => {
        console.log(response);
      })
  }, [refresh])

  return (
    <>
    <h1 className='text-2xl font-semibold m-5 text-center'>Github Status</h1>
    <div className='place-items-center mt-10'>
      <p className={`flex justify-center w-3/5 border border-black rounded-md h-10 items-center 
        ${pageStatus === 'All Systems Operational' ? 'bg-green-400' : 'bg-orange-400' }`}>{pageStatus}</p>
    </div>
    <Button description={'Refresh'} handleFunction={handleRefresh}/>
    <ul className='m-4'>
      {Array.from(services).map( (service, index) => {
          if (service.innerText.match(/visit/i)) {return;}
          return (<li className='my-2'>{service.innerText.trim()}: {status[index].innerText.trim()}</li>);
        })}
    </ul>
    </>
  );
};