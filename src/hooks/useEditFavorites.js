import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "./useFetchData";
import * as actions from '../store/actions';
import { useHistory } from "react-router";

const useEditFavorites = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { favorites, user } = useSelector(state => state.user);
  const { makeRequest } = useFetchData();

  const editFavorites = useCallback((id) => {
    if (!user || !favorites.length >= 20) {
      return history.push('/auth/signin');
    }

    const existingItem = favorites.find(el => el === id);
    const newList = existingItem ? favorites.filter(el => el !== id) : [id];

    makeRequest({
      url: '/users/favorites',
      method: existingItem ? 'delete' : 'post',
      dataAt: ['data', 'favorites'],
      body: { favorite: id },
      callback: () => dispatch(actions.editFavorites(newList))
    });
  }, [favorites, makeRequest, dispatch, user, history]);

  return {
    editFavorites,
    favorites
  };
};

export default useEditFavorites;