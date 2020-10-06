import React, { useState, useEffect } from 'react';
import Movie from './Components/Movie';


const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {
 const [movies, setmovies] = useState([]);
 const [searchTerm , setsearchTerm] = useState('');

 useEffect(  () => {
       getMovies(APIURL);
 } , []);


   const getMovies = (API) => {
    fetch(API).then(res => res.json())
    .then(data =>{
      setmovies(data.results);

    });
   }

   const handelonSubmit = (e) =>{
     e.preventDefault();

     if(searchTerm){
      getMovies(SEARCHAPI + searchTerm)

       setsearchTerm('');
    }
   }

     const HandelonChange = (e) =>{
       setsearchTerm(e.target.value);
     }
  return (
    <>
    <header>
      <form onSubmit={handelonSubmit}>
    <input className="search" type="text" placeholder="Search..." value={searchTerm} onChange={HandelonChange}/>
    </form>
  </header>
    <div className="movie-container">
      {
        movies.length > 0 && movies.map((movie) => 
        <Movie key={movie.id} {...movie} /> )
      }
    </div>
    </>
    
  );
}

export default App;
