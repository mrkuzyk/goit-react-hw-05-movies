import { Routes, Route } from 'react-router-dom';
import { PageNotFound } from './MessageTitle/MessageTitle';
import SearchMovie from '../pages/SearchMovie/SearchMovie';
import Header from './Header/Header';
import TrendingMovies from '../pages/TrendingMovies/TrendingMovies';
import OneMovieDetails from '../pages/OneMovieDetails/OneMovieDetails';
import Cast from '../movies/Cast/Cast';
import Reviews from '../movies/Reviews/Reviews';


export const App = () => {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={ <TrendingMovies/>} />
        <Route path='movies' element={<SearchMovie />} />
        <Route path='movies/:id' element={<OneMovieDetails />}>
          <Route path='cast' element={<Cast />} />
          <Route path='reviews' element={ <Reviews/>} />
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </>
  );
};
