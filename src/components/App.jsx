import { Routes, Route } from 'react-router-dom';
import PageNotFound from './PageNotFound/PageNotFound';
import SearchMovie from './SearchMovie/SearchMovie';
import Navigation from './Navigation/Navigation';
import TrendingMovies from './TrendingMovies/TrendingMovies';

export const App = () => {


  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path='/' element={ <TrendingMovies/>} />
        <Route path='/movies' element={<SearchMovie/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
  );
};
