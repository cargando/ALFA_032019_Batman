import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MovieCard = ({ onChange, data, watched = false }) => {
	const {
		image,
		name,
		premiered,
		summary,
		url,
		id,
	} = data;

	const watchedBorder = {}

	if (watched) {
		watchedBorder.border="primary";
	}

	return (
		<Card { ...watchedBorder } style={{ width: '20rem' }}>
			<Card.Img variant="top" src={ image.medium } />
			<Card.Body>
				<Card.Title>{ name }</Card.Title>
				<Card.Text><small className="text-muted" dangerouslySetInnerHTML={ {__html: summary } } /> </Card.Text>
				<Card.Text><small className="text-muted">{ premiered }</small> <br />
					<small><a target="_blank" href={ url }>Visit movie page</a></small> <br /> <br/>
					<Button
						size="sm"
						onClick={ () => { onChange(id) }}
						variant={ watched ? "success" : "outline-secondary" }
					>
						{ watched ? "Смотрел" : "Не смотрел"}
					</Button>
				</Card.Text>
			</Card.Body>
		</Card>
	);
}; //

export default React.memo(MovieCard);