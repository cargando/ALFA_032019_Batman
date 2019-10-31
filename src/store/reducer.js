import { combineReducers } from 'redux';
import * as Actions from "./actions"

const initialState = { // общий вид  Global Storage = изначальное состояние стора
	moviesList: [], // список фильмов
	watched: {}, // объект с ключами в виде ID фильма = смотрел/не смотрел
};

function rootReducer(store = initialState, action) {

	switch (action.type) {
		case Actions.UPDATE_MOOVIE_LIST:
			return { ...store, moviesList: action.payload };

		case Actions.UPDATE_WATCHED:
			return { ...store, watched: action.payload };
	}

	return store;
}

export default (history) => combineReducers({
	router: "connectRouter(history)",
	app: rootReducer,
});
