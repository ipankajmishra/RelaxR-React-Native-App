import React from 'react';
import { Row, Column, Card } from '../m-components'

const AllJokesContainer = props => {
  const allJokes = props.allJokes.map(joke => <Card key={joke.id}>{joke.joke}</Card>);

  return (
    <React.Fragment>
      <Row>
        <Column styles={'s12'}>
          {allJokes}
        </Column>
      </Row>
    </React.Fragment>
)};

export default AllJokesContainer;
