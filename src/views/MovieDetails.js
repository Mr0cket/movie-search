import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge, Col, Container, Image, Row } from "react-bootstrap";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [pageState, setpageState] = useState({
    status: "idle",
    error: null,
  });
  const { movieID } = useParams();

  const fetchMovie = async (id) => {
    const movieData = await axios
      .get(`https://www.omdbapi.com/?i=${id}&apikey=a53e0dda`)
      .then((res) => res.data)
      .catch((e) => console.log(`request error: ${e}`));

    console.log(movieData);
    if (movieData.Response === "False") {
      setpageState({
        ...pageState,
        status: "Failed",
        error: movieData.Error,
      });
    } else if (movieData.Response === "True") {
      setMovie(movieData);
      setpageState({ ...pageState, status: "done" });
    }
  };
  useEffect(() => {
    fetchMovie(movieID);
  }, []);
  if (pageState.status === "idle") return <h1>loading...</h1>;
  else if (pageState.status === "Failed")
    return <h1> sorry, {pageState.error}</h1>;
  else
    return (
      <Container>
        <h1>Movie Details Page</h1>
        <h5>movie id: {movieID}</h5>
        <h1>{movie.Title}</h1>
        <Row>
          {movie.Genre.split(", ").map((genre, i) => (
            <Badge pill variant="secondary" key={i}>
              {genre}
            </Badge>
          ))}
        </Row>
        <Row>
          <Image src={movie.Poster} />
          <Col>
            <h6>YEAR</h6>
            <p>{movie.Year}</p>
            <h6 className="muted">DIRECTOR:</h6>
            <p>{movie.Director}</p>
            <h6 className="muted">LANGUAGE:</h6>
            <h6 className="muted">PLOT:</h6>
            <p>{movie.Plot}</p>
            <h6 className="muted">
              {movie.Ratings[0]?.Source ? movie.Ratings[0].Source : "No "}
              Rating
            </h6>
            <p>{movie.Ratings[0]?.Value && movie.Ratings[0]?.Value}</p>
          </Col>
        </Row>
      </Container>
    );
}
