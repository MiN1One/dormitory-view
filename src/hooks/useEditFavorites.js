import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "./useFetchData";
import * as actions from '../store/actions';

const useEditFavorites = () => {
  const { favorites } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { makeRequest } = useFetchData();

  const editFavorites = useCallback((id) => {
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
    console.log(id);
  }, [favorites, makeRequest, dispatch]);

  return {
    editFavorites,
    favorites
  }
};

export default useEditFavorites;