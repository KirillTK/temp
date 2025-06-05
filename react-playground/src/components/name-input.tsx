import { useDispatch } from 'react-redux';
import { setName } from '../store/auth.slice';
import { ChangeEventHandler, useCallback } from 'react';

export const NameInput = () => {
  const dispatch = useDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event ) => {
    dispatch(setName(event.target.value));
  }, [dispatch]);

  return <input onChange={handleChange}/>;
}