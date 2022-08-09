import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../core/store';
import { moviesActions } from '../core/store/movies/slice';

const actions = {
  ...moviesActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
