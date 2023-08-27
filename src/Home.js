import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import ListCard from "./ListCard";

function Home() {
  const apiKey = "7ca3f284a92b4fcd5ff87c0fee8a4cdf";
  // https://namjaibrand.com/wp-content/uploads/2020/02/h15-bg.jpg
  ///ค้นหา
  const query = "";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  const [trenddata, setMoviedata] = useState([]);
  const [topdomdata, setMoviedata2] = useState([]);
  const [populardata, setMoviedata3] = useState([]);
  const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const topdomMovieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  useEffect(() => {
    fetch(trendingUrl)
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
  }, []);
  useEffect(() => {
    fetch(topdomMovieUrl)
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
          setMoviedata2(movies);
        } else {
          console.log("No results found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    fetch(popularMovieUrl)
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
          setMoviedata3(movies);
        } else {
          console.log("No results found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className="container"> 
      <div className="box"></div>
      <h1 className="mb-4 mb-4 text-warning">Trending</h1>
      <ListCard data={trenddata}/>
      <h1 className="mb-4 my-4 text-warning">Top Reating</h1>
      <ListCard data={topdomdata}/>
      <h1 className="mb-4 my-4 text-warning">Popular</h1>
      <ListCard data={populardata}/>
    </div>
  );
}

export default Home;
