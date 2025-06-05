import { useSelector } from 'react-redux';
import './App.css'
import { NameInput } from './components/name-input'
import { UserBlock } from './components/user-block'
import { RootState } from './store/store';
import { IncrementButton } from './components/increment';
import { lazy, Suspense } from 'react';
import SuspenseTest from './components/suspense-test';
import UserInfo from './components/user-info';
import { LaggyInput } from './components/laggy-input';

export const SuspenseTestLazy = lazy(() => import('./components/suspense-test'));

const fetchUsers = () => fetch('https://dummyjson.com/users').then(res => res.json());


function App() {
  const { age } = useSelector<RootState>((state) => state.auth, (state1: RootState['auth'], state2: RootState['auth']) => {    
    return state1.age === state2.age;
  });

  console.log('APP', age);
  return (
    <>
      <LaggyInput/>
      <NameInput />
      <UserBlock />
      <IncrementButton/>
      <Suspense fallback={<div>Loading...</div>}>
        <SuspenseTest/>
      </Suspense>

      <Suspense fallback={<div>Lazy load</div>}>
        <SuspenseTestLazy/>
      </Suspense>

      <Suspense fallback={<h3>Loading user data...</h3>}>
        <UserInfo />
      </Suspense>
    </>
  )
}

export default App
