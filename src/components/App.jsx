import { Routes, Route } from 'react-router-dom';
import PageNotFound from './PageNotFound/PageNotFound';
import SearchMovie from './SearchMovie/SearchMovie';
import Navigation from './Navigation/Navigation';
import TrendingMovies from './TrendingMovies/TrendingMovies';
import OneMovieDetails from './OneMovieDetails/OneMovieDetails';
import Cast from './Cast/Cast';


export const App = () => {

  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path='/' element={ <TrendingMovies/>} />
        <Route path='movies' element={<SearchMovie />} />
        <Route path='movies/:id' element={<OneMovieDetails />}>
          <Route path='cast' element={ <Cast/>} />
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
  );
};
