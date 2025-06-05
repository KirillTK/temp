// fakeDataFetcher.js
let cache: null | { name: string; age: number } = null;

export function fetchUser() {
  if (cache) return cache;

  // This simulates a network request
  throw new Promise((resolve) => {
    setTimeout(() => {
      cache = { name: 'John Doe', age: 30 };
      resolve(cache);
    }, 2000);
  });
}


function UserInfo() {
  const user = fetchUser(); // This will throw a Promise on first call

  console.log(user, 'user');

  
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default UserInfo;