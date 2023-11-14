import { createReducer } from '@reduxjs/toolkit';
import { SixCities, Sorting } from '../const.ts';
import { TRTKState } from '../types/index.ts';
import { changeCity, changeSorting, fetchCards } from './actions.ts';

const initialState: TRTKState = {
  city: SixCities.Paris,
  offers: [],
  cards: [],
  sorting: Sorting.Popular
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchCards, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    });
});
