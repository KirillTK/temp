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
import { VirtualList } from './features/virtual-list/virtual-list';
import { mockStringArray } from './features/virtual-list/__mock__';
import { FileTree } from './features/file-tree/file-tree';

export const SuspenseTestLazy = lazy(() => import('./components/suspense-test'));

const fetchUsers = () => fetch('https://dummyjson.com/users').then(res => res.json());


const paths = [
  "/README.md",
  "/src/App.js",
  "/src/components/Button.js",
  "/src/components/Input.js",
  "/src/utils/helpers.js"
];


function App() {
  const { age } = useSelector<RootState>((state) => state.auth, (state1: RootState['auth'], state2: RootState['auth']) => {    
    return state1.age === state2.age;
  });

  console.log('APP', age);
  return (
    <>
      <FileTree items={paths} />
      <VirtualList items={mockStringArray} />
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
