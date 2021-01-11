import React from "react";
import { Card, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Col xl="3" lg="4" md="6">
      <Card
        style={{ width: "20rem" }}
        className="shadow p-3 mb-3 bg-grey rounded"
      >
        <Link to={`/movie/${movie.imdbID}`}>
          <Card.Img variant="top" src={movie.Poster} />
        </Link>
        <Card.Body>
          <Link to={`/movie/${movie.imdbID}`}>
            <Card.Title>{movie.Title}</Card.Title>
          </Link>
          <ListGroup variant="flush">
            <ListGroup.Item>Year: {movie.Year}</ListGroup.Item>
            <ListGroup.Item>Type: {movie.Type}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}
