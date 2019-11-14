import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner'
import {
	CardColumns,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import MovieCard from "./components/card";
import Modal from "./components/modal_redux";
import { getMovies, updateViewId } from './store/action_creators'

const App = (props) => { // hook

	const [ viewId, setViewId ] = useState(null);
	const [ showModal, setShowModal ] = useState(false);
	// const [ moviesList, setMoviesList ] = useState([]);
	const moviesList = useSelector( store => store.app.moviesList);
	const isLoading = useSelector( store => store.app.isLoading);

	// const GS = useSelector( store => { // можно дернуть useSelector за 1 проход и он вернет все нужные данные в виде одной переменной
	// 	const retVal = {};
	// 	retVal.isLoading = store.app.isLoading
	// 	retVal.moviesList = store.app.moviesList
	// 	return retVal;
	// });

	const [ watched, setWatched ] = useState({});
	const dispatcher = useDispatch();

	// const [ userName, setUserName ] = useState("Василий Петров");
	// const [ userAge, setUserAge ] = useState(26);

	// this.state = {
	// 	moviesList: [], // список фильмов
	//  watched: {},
	// }
	// setMoviesList => this.setState({moviesList:....})
	useEffect(() => {
		dispatcher(getMovies(null));
	}, []);

	// useEffect(() => {
	// 		const movies = fetch('https://api.tvmaze.com/search/shows?q=batman');
	// 		movies.
	// 		then((data) => { // async (data) => { ...
	// 			return data.json();
	// 		}).then( (data) => {
	// 			setMoviesList(data);
	// 			document.title = 'Список фильмов про бэтмена';
	// 		}).
	// 		catch((e) => {
	// 			console.log("ERROR while loading data from url", e);
	// 			document.title = 'Ошибка соединения';
	// 		});
	//
	// }, []); // , [userName, userAge]);



	const handleChangeWatched = (id) => {
		const newVal = !watched[id];
		setWatched({
			...watched,
			[String(id)]: newVal,
		});
	};

	const handleViewModal = (id) => {
		setShowModal(true)
		dispatcher(updateViewId(id));
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

	const renderLoader = () => {
		return (
			<Loader
				type="Plane"
				color="#00BFFF"
				height={100}
				width={100}
			/>
		);
	}

	const renderModalBody = () => {

		const filtered = moviesList.filter((item) => item.show.id === viewId);
		if (!filtered.length) {
			return null;
		}
		console.log("FILTER", filtered)
		const resultMs = Object.entries(filtered[0].show).map( (item, index) => {
			const stringVal = typeof item[1] !== "object" ? item[1] : JSON.stringify(item[1]);
			return <tr key={index}><td>{item[0]}</td><td>{ stringVal }</td></tr>
		});
		return (
			<table>
				<tbody>{resultMs}</tbody>
			</table>)

	}

	return (
		<div style={{display: "relative"}}>
		<Container>
			<Row>
				<Col xs={12}>
					<h4>The Batman Movies (TV Show's):</h4>
					<br />
					{
						isLoading ? renderLoader() :
							(<CardColumns>{ renderCard() }</CardColumns>)

					}
				</Col>
			</Row>
		</Container>
			{
				showModal && <Modal
					onClose={ handleCloseModal }
					title="Детали о выпуске"
					renderBody={renderModalBody}
				/>
			}
		</div>
	);

};

	export default App;
