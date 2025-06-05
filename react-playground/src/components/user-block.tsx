import { useSelector } from 'react-redux';
import { selectAuthStore } from '../store/selectors';

export const UserBlock = () => {
  const { name, surname, age} = useSelector(selectAuthStore);


  return <div>
    <p>{name}{surname}</p>
    <p>AGE: {age}</p>
  </div>;
}