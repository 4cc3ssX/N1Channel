import { actions } from "../actions/counter_action";

const initialState = {
  recentDramaList: [],
  dramaList: [],
  favList: [],
};
const counter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_RECENT_DRAMA_LIST:
      return {...state, recentDramaList: action.recentDramaList};
    case actions.UPDATE_DRAMA_LIST: 
      return {...state, dramaList: action.dramaList};
    case actions.UPDATE_FAVLIST: 
      return {...state, favList: [...state.favList, action.favList]};
    case actions.DELETE_FAV_ITEM:
      return {...state, favList: state.favList.filter(item => item.dramaId !== action.favDramaId)};
    default:
      return state;
  }
};
export default counter_reducer;
