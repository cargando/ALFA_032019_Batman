import * as Actions from "./actions";

export function updateMovies(payload) {
	const realReduxAction =  {
		type: Actions.UPDATE_MOOVIE_LIST,
		payload, // payload: payload,
	};
	return realReduxAction;
}

export const updateLoadingState = payload => ({type: Actions.UPDATE_LOADING_STATE, payload});

export const updateViewId = payload => ({type: Actions.UPDATE_VIEW_ID, payload});

export const  updateWatched = payload => ({type: Actions.UPDATE_WATCHED, payload });

export function getMovies(payload) {
	return async (dispatcher) => {

		dispatcher(updateLoadingState(true));

		const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
		movies.
		then((data) => { // async (data) => { ...
			return data.json();
		}).then( (data) => {
			// this.setState({ moviesList: data });
			dispatcher(updateMovies(data));
			dispatcher(updateLoadingState(false));
		}).
		catch((e) => {
			console.log("ERROR while loading data from url", e);
		});
	}
}

