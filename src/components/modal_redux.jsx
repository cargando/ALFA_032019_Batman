import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Modal as BM, Button } from 'react-bootstrap';

function Modal (props) {
	const moviesList = useSelector(store => store.app.moviesList);
	const viewId = useSelector(store => store.app.viewId);
	console.log(">>> viewId", viewId)

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
		<BM show={true} onHide={props.onClose} animation={true}>
			<BM.Header closeButton>
				<BM.Title>{ props.title }</BM.Title>
			</BM.Header>

			<BM.Body>
				{
					renderModalBody()
				}
			</BM.Body>

			<BM.Footer>
				<Button onClick={ props.onClose } variant="secondary">Close</Button>
			</BM.Footer>
		</BM>);
}

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element, //
	onClose: PropTypes.func,
	renderBody: PropTypes.func,
};

export default Modal;
