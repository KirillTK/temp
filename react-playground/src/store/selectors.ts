import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const selectSelf = (state: RootState) => state;


export const selectAuthStore = createSelector(selectSelf, state => state.auth);

export const selectAge = createSelector(selectAuthStore, state => state.age);