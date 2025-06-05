import { lazy, use, useEffect, useState } from 'react';


const fetchUsers = () => fetch('https://dummyjson.com/users').then(res => res.json());

const usersPromise = fetchUsers(); 

const SuspenseTest = () => {
  const promise = use(usersPromise);

  return <div>{ 123 }</div>;
}


export default SuspenseTest;

