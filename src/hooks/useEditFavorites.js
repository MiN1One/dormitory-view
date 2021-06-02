import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "./useFetchData";
import * as actions from '../store/actions';
import { useHistory } from "react-router";

const useEditFavorites = () => {
  const { favorites, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { makeRequest } = useFetchData();
  const history = useHistory();

  const editFavorites = useCallback((id) => {
    if (!user) 
      return history.push('/auth/login');

    if (favorites.length < 20) {
      const existingItem = favorites.find(el => el === id);
      let newList = null;
  
      if (existingItem) {
        newList = favorites.filter(el => el !== id);
        makeRequest({
          url: '/users/favorites',
          method: 'delete',
          body: { favorite: id },
          callback: () => dispatch(actions.editFavorites(newList))
        });
      } else {
        newList = [...favorites, id];
        makeRequest({
          url: '/users/favorites',
          method: 'post',
          dataAt: ['data', 'favorites'],
          body: { favorite: id },
          callback: () => dispatch(actions.editFavorites(newList))
        });
      }
    }
  }, [favorites, makeRequest, dispatch, user, history]);

  return {
    editFavorites,
    favorites
  }
};

export default useEditFavorites;