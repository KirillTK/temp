import { lazy, use, useEffect, useState } from 'react';


const fetchUsers = () => fetch('https://dummyjson.com/users').then(res => res.json());

const usersPromise = fetchUsers(); 

const SuspenseTest = () => {
  // useEffect(() => {

  //   const abortController = new AbortController();
    
  //   fetch('https://dummyjson.com/users', { signal: abortController.signal }).then(res => res.json());


  //   return () => {
  //     abortController.abort();
  //   }

  // }, []);

  const promise = use(usersPromise);

  return <div>{ 123 }</div>;
}


export default SuspenseTest;

