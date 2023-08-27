import React from 'react'

function MovieCard(props) {
    const index =props.index;
    const data =props.data;
    const className = (props.className||'text-dark');
    
  return (
    <div key={index} className="card w150 bgn p-0 m-3 border-0 ">
            <a className={`${className} text-decoration-none text-center`} href={`/movie/${data.id}`}> 
              <img
                className="card-img-top p-0 m-0 "
                src={data.poster_path}
                alt="Title"
              />
              <p className="fw-semibold mt-2">{data.title}</p>
            </a>
          </div>
  )
}

export default MovieCard
