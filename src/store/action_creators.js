import * as Actions from "./actions";

function updateMovies(payload) {
	return {
		type: Actions.UPDATE_MOOVIE_LIST,
		payload, // payload: payload,
	}
}

function updateWatched(payload) {
	return {
		type: Actions.UPDATE_WATCHED,
		payload,
	}
}

function getMovies(payload) {

}
