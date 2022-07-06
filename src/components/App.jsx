import { Routes, Route } from 'react-router-dom';
import PageNotFound from './PageNotFound/PageNotFound';
import SearchMovie from './SearchMovie/SearchMovie';
import Header from './Header/Header';
import TrendingMovies from './TrendingMovies/TrendingMovies';
import OneMovieDetails from './OneMovieDetails/OneMovieDetails';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';


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
