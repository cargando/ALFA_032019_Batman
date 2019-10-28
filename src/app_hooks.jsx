import React, { useState, useEffect } from 'react';
import {
	CardColumns,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import MovieCard from "./components/card";
import Modal from "./components/modal";

const App = (props) => { // hook

	const [ viewId, setViewId ] = useState(null);
	const [ showModal, setShowModal ] = useState(false);
	const [ moviesList, setMoviesList ] = useState([]);
	const [ watched, setWatched ] = useState({});

	// const [ userName, setUserName ] = useState("Василий Петров");
	// const [ userAge, setUserAge ] = useState(26);

	// this.state = {
	// 	moviesList: [], // список фильмов
	//  watched: {},
	// }
	// setMoviesList => this.setState({moviesList:....})


	useEffect(() => {
			const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
			movies.
			then((data) => { // async (data) => { ...
				return data.json();
			}).then( (data) => {
				setMoviesList(data);
				document.title = 'Список фильмов про бэтмена';
			}).
			catch((e) => {
				console.log("ERROR while loading data from url", e);
				document.title = 'Ошибка соединения';
			});

	}, []); // , [userName, userAge]);



	const handleChangeWatched = (id) => {
		const newVal = !watched[id];
		setWatched({
			...watched,
			[String(id)]: newVal,
		});
	};

	const handleViewModal = (id) => {
		setShowModal(true)
		setViewId(id);
	};

	const handleCloseModal = (id) => {
		setShowModal(false)
		setViewId(null);
	};

	const renderCard = () => {
		const ms = moviesList.map( (item) => {
			return (
				<React.Fragment key={ item.show.id }>
					<MovieCard
						onChange={ handleChangeWatched }
						onViewMore={ handleViewModal }
						data={ item.show }
						watched={ watched[ String(item.show.id) ] } />
					<br />
				</React.Fragment>);
		});
		return ms;
	};
	console.log("VIEW = ", showModal)

	return (
		<div style={{display: "relative"}}>
		<Container>
			<Row>
				<Col xs={12}>
					<h4>The Batman Movies (TV Show's):</h4>
					<br />
					{
						moviesList.length ?
							(<CardColumns>{ renderCard() }</CardColumns>) :
							"Loading..."
					}
				</Col>
			</Row>
		</Container>
			{
				showModal && <Modal onClose={ handleCloseModal } title="Детали о выпуске" />
			}
		</div>
	);

};

	export default App;
