import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BM, Button } from 'react-bootstrap';

function Modal (props) {

	return (
		<BM show={true} onHide={props.onClose} animation={true}>
			<BM.Header closeButton>
				<BM.Title>{ props.title }</BM.Title>
			</BM.Header>

			<BM.Body>
				{
					props.children
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
};

export default Modal;
