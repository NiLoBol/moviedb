import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListCard2 from "./ListCard2";

function Movie() {
  const id = useParams();
  const type = window.location.pathname;

  const [moviedata, setMoviedata] = useState([]);
  const apiKey = "7ca3f284a92b4fcd5ff87c0fee8a4cdf";
  ///ค้นหา 

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${id.name}`;

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            const movies = data.results.map(
              ({ backdrop_path, poster_path, ...rest }) => ({
                backdrop_path: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
                poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
                ...rest,
              })
            );
            setMoviedata(movies);
          } else {
            console.log("No results found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 100);
  }, [url]);

  return (
    <div className="container text-light">
      <div className="box"></div>
      <h1>Search</h1>
      <div className="text-light">
        <ListCard2 data={moviedata} />
      </div>
    </div>
  );
}

export default Movie;
