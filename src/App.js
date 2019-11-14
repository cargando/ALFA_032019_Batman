import React from 'react';
import { connect } from 'react-redux';
import {
	CardColumns,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import MovieCard from "./components/card";
import * as ActionCreators from './store/action_creators'


class App extends React.Component {

	constructor(props) {
		super(props);
		// this.handleInputChange = this.handleInputChange.bind(this)

		this.state = {
			moviesList: [], // список фильмов
			watched: {},
		}

	}

	componentDidMount() {
		this.props.getMovies();
	}

	// componentDidMount() {
	// 	const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
	// 	movies.
	// 		then((data) => { // async (data) => { ...
	// 			return data.json();
	// 		}).then( (data) => {
	// 			// this.setState({ moviesList: data });
	// 		this.props.updateMovies(data)
	// 		}).
	// 		catch((e) => {
	// 			console.log("ERROR while loading data from url", e);
	// 		});
	// }


	handleChangeWatched = (id) => {
		this.setState((prevState) => {
			const newVal = !prevState.watched[id];
			return {
				watched: {
					...prevState.watched,
					[String(id)]: newVal,
				},
			}
		});
	};

	renderCard = () => {
		const ms = this.state.moviesList.map( (item) => {
			return (
				<React.Fragment key={ item.show.id }>
					<MovieCard
						onChange={ this.handleChangeWatched  }
						data={ item.show }
						watched={ this.state.watched[ String(item.show.id) ] } />
					<br />
				</React.Fragment>);
		});
		return ms;
	};


	render () {
			console.log("Cnt = ", this.state.moviesList.length);
	  return (

	    <Container>
		    <Row>
			    <Col xs={12}>
						<h4>The Batman Movies (TV Show's):</h4>
						<br />
				    {
				    	this.state.moviesList.length ?
						    (<CardColumns>{ this.renderCard() }</CardColumns>) :
						    "Loading..."
				    }
			    </Col>
		    </Row>
	    </Container>
	  );
	}
}
const mapStateToProps = (state) => {
	return {
		moviesList: state.app.moviesList,
		watched: state.app.watched,
	}
	// суть как буд-то наш <App /> будет вызван следующим образом 
	// <App moviesList={ state.app.moviesList } watched={ state.app.watched } /> 
};

function mapDispatchToProps(dispatcher) {
	return {
		// updateMovies: (payload) =>  dispatcher(ActionCreators.updateMovies(payload)),
		getMovies: (payload) => dispatcher(ActionCreators.getMovies(payload)),
	}
	// суть как буд-то наш <App /> будет вызван следующим образом
	// <App updateMovies={ dispatcher(ActionCreators.updateMovies(payload)) } getMovies={ dispatcher(ActionCreators.getMovies(payload)) } />
}

const connected = connect(mapStateToProps, mapDispatchToProps)(App);
// export default connected(App);

export default connected;
// export default  connect(mapStateToProps, mapDispatchToProps)(App);
