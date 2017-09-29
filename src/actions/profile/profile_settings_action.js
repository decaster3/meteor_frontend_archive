
export function setSettingsCategory(category){
  return function(dispatch) {
    dispatch({type: 'LOADING'})
    dispatch({type: 'SETTINGS_CATEGORY_SELECTED', category: category})
  }
}
