import React from "react";
import MovieCard from "./MovieCard";

function ListCard(props) {
  const data = props.data;
  return (
    <div className="row cardsetx h-25">
      {data.map((data, index) => (
        <MovieCard index={index} data={data} />
      ))}
    </div>
  );
}

export default ListCard;
