export const updateRecentDramaList = (recentDramaList) => ({
  type: "UPDATE_RECENT_DRAMA_LIST",
  recentDramaList
});
export const updateDramaList = (dramaList) => ({
  type: "UPDATE_DRAMA_LIST",
  dramaList
});
export const updateFavList = (favList) => ({
  type: "UPDATE_FAVLIST",
  favList
});
export const deleteFavItem = (favDramaId) => ({
  type: "DELETE_FAV_ITEM",
  favDramaId
});

export const actions = {
UPDATE_FAVLIST: "UPDATE_FAVLIST",
UPDATE_RECENT_DRAMA_LIST: "UPDATE_RECENT_DRAMA_LIST",
UPDATE_DRAMA_LIST: "UPDATE_DRAMA_LIST",
DELETE_FAV_ITEM: "DELETE_FAV_ITEM",
};