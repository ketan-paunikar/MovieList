import React, { useEffect, useState } from 'react'
import "./movies.css"

const Movies = () => {

    const [movies, setMovies] = useState([])

    // base URL for image
    const URL = "https://image.tmdb.org/t/p/w500/"

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2U3ZWNiYTBmOWUxYzQ5YjAwNjE2MGFkZDljMzg4OCIsInN1YiI6IjY0MGU0MGQwMzIzZWJhMDBlZjYxZGQyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b5YqIoPyrxsw-YdBDbTKfr6EAuSorW32lodX0frkjFY'
        }
    };

    //Since there are thousands of data between 1st Dec 2023 to 31st Dec 2023, 
    // I'm filtering out the data until certain number of movie details

    const getAllMovies = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?&end_date=2023-12-31&page=1&start_date=2023-12-01', options)
            .then(res => res.json())
            .then((res) => {
                let data;
                data = res?.results?.filter((item, i) => i < 25);
                setMovies(data)
            })
            .catch(err => console.error(err));
    }
    console.log(movies)

    useEffect(() => {
        getAllMovies();
    }, [])

    return (
        <div className="h-full flex flex-col mt-20 items-center">
            <h1 className="font-bold text-black text-2xl">Movies</h1>
            <div className="w-[85vw] mt-10 m-auto grid grid-cols-5 gap-5">
                {
                    movies?.map((movie, i) => {
                        return (
                            <div
                                key={i}
                                className="flex flex-col w-[200px] h-[350px] cursor-pointer border-solid border-2"
                            >
                                <img
                                    // alt={movie?.title}
                                    src={`${URL}${movie?.poster_path}`}
                                    className="h-full w-full"
                                />
                                <h2 className="font-bold text-black py-4 px-2 text-start">{movie?.title}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Movies
