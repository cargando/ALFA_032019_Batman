import React from 'react';
import {
	CardColumns,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import MovieCard from "./components/card";


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			moviesList: [], // список фильмов
			watched: {},
		}
	}

	componentDidMount() {
		const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
		movies.
			then((data) => { // async (data) => { ...
				return data.json();
			}).then( (data) => {
				this.setState({ moviesList: data });
			}).
			catch((e) => {
				console.log("ERROR while loading data from url", e);
			});
	}

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
						onChange={ this.handleChangeWatched }
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

export default App;
