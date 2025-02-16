import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'; 
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import { Toaster } from 'react-hot-toast';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = React.lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = React.lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Suspense>
  );
}

export default App;
