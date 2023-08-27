import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieID(props) {
  const id = useParams().id;
  const apiKey = "7ca3f284a92b4fcd5ff87c0fee8a4cdf";
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const [moviedata, setMoviedata] = useState([]);
  const price = props.userList.find((user) => user.id === id) || {
    id: id,
    price: 100,
  };
  console.log(price);
  const shopdata = props.shopdata;
  const setshop = (e) => {
    props.setshop(e);
  };
  const AddShop = () => {
    const newItem = {
      id: id,
      name: moviedata.title,
      path: moviedata.poster_path,
      price: price.price,
      Num: 1,
    };

    const existingItemIndex = shopdata.findIndex(
      (item) => item.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      const updatedShopData = [...shopdata];
      updatedShopData[existingItemIndex].Num += 1;
      setshop(updatedShopData);
    } else {
      setshop((prevShopData) => [...prevShopData, newItem]);
    }
  };

  useEffect(() => {
    console.log(shopdata);
    localStorage.setItem("shopdata", JSON.stringify(shopdata));
  }, [shopdata]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const movie = {
            backdrop_path: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
            poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            title: data.title,
            overview: data.overview,
            release_date: data.release_date,
            vote_average: data.vote_average,
            runtime: data.runtime,
            genres: data.genres.map((genre) => genre.name).join(", "),
          };
          setMoviedata(movie);
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
      <div className="row bgmovieid ">
        <div className="col-xl-6 col-12 my-xl-5 my-3 d-flex">
          <img
            className="h-75 mx-auto my-4 justify-content-center"
            src={moviedata.poster_path}
            alt={moviedata.title}
          />
        </div>
        <div className="col-xl-6 col-12 my-xl-4 my-3 p-5 ">
          <h2 className="mb-3">{moviedata.title}</h2>
          <h5 className="mb-3">Released: {moviedata.release_date}</h5>
          <h5 className="mb-3">Runtime: {moviedata.runtime} minutes</h5>
          <h5 className="mb-3">Genres: {moviedata.genres}</h5>
          <p className="mb-3">Overview: {moviedata.overview}</p>
          <h5 className="mb-3">Vote Average: {moviedata.vote_average}</h5>
          <h5 className="mb-3">
            price:{price && price.price ? price.price : 100}
          </h5>

          <a
            onClick={() => {
              AddShop();
            }}
            class="btn btn-dark"
            href="#"
            role="button"
          >
            Add to Shop
          </a>
        </div>
      </div>
    </div>
  );
}

export default MovieID;
