import * as Actions from './actions';

export const gotDataMiddleware = store => next => action => {
	if (action.type === Actions.UPDATE_MOOVIE_LIST) {
		alert("Список фильмов успешно загружен!!!");
		// store.dispatch(ACT.DATA_TASK_UPDATE)
	}
	return next(action);
};
