import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, CardGroup, Container, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
const a = axios.create({
  baseURL: "https://www.omdbapi.com",
});

/* Not searching yet, because the user didn't click the "search" button yet
Searching. It's best to give the user some feedback on what's happening, for example showing a message like "Searching...."
Search results fetched, and we'll show a list of the found movies
 */
export default function DiscoverMovies() {
  const [searchText, set_searchText] = useState("");
  const [searchState, setSearchState] = useState({
    status: "idle",
    error: null,
  });
  const history = useHistory();
  const { query } = useParams();
  console.log("query:", query);
  const search = async (text) => {
    setSearchState("searching");

    const queryParam = encodeURIComponent(text);
    const data = await a
      .get(`/?apikey=a53e0dda&s=${queryParam}`)
      .then((res) => res.data)
      .catch((e) => console.error(`error: ${e}`));

    if (data.Response === "False") {
      setSearchState({ ...searchState, status: "failed", error: data.Error });
      console.log(data);
    } else if (data.Response === "True") {
      setSearchState({ status: "done", data: data });
    } else console.log("I  shouldn't get here, but I did :(");
  };

  useEffect(() => {
    query && search(query);
  }, [query]);

  // searchResults created on each render.
  console.log(searchState);
  let searchResults;
  if (searchState.status === "done") {
    searchResults = searchState.data.Search.map((movie, i) => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ));
  } else if (searchState.status === "searching") {
    searchResults = <h3>loading...</h3>;
  } else if (searchState.status === "failed")
    searchResults = <h3>sorry, {searchState.error}</h3>;
  else if (searchState.status === "idle")
    searchResults = <h3>search for a movie!</h3>;
  return (
    <Container fluid className="ml-3">
      <h1 className="">Discover Some Movies!</h1>
      <Row className="mb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            history.push(`/discover/${searchText}`);
          }}
        >
          <input
            className=""
            value={searchText}
            onChange={(e) => set_searchText(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </Row>
      <Container fluid>
        <CardGroup>{searchResults}</CardGroup>
      </Container>
    </Container>
  );
}
