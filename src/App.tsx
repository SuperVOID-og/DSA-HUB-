import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import EditorialLayout from './layouts/EditorialLayout';
import LandingPage from './pages/LandingPage';

const Notes = lazy(() => import('./pages/Notes'));
const UnitReader = lazy(() => import('./pages/UnitReader'));
const QuestionBank = lazy(() => import('./pages/QuestionBank'));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'));
const MindMapsPage = lazy(() => import('./pages/MindMapsPage'));
const VisualisersPage = lazy(() => import('./pages/VisualisersPage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const QuickRevisionPage = lazy(() => import('./pages/QuickRevisionPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="mono-label mb-2">LOADING</div>
        <div className="w-24 h-px bg-warm-grey mx-auto" />
      </div>
    </div>
  );
}

import CommandPalette from './components/CommandPalette';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CommandPalette />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<EditorialLayout />}>
          <Route path="notes" element={<Suspense fallback={<LoadingFallback />}><Notes /></Suspense>} />
          <Route path="notes/:unitId" element={<Suspense fallback={<LoadingFallback />}><UnitReader /></Suspense>} />
          <Route path="revision/:unitId" element={<Suspense fallback={<LoadingFallback />}><QuickRevisionPage /></Suspense>} />
          <Route path="question-bank" element={<Suspense fallback={<LoadingFallback />}><QuestionBank /></Suspense>} />
          <Route path="flashcards" element={<Suspense fallback={<LoadingFallback />}><FlashcardsPage /></Suspense>} />
          <Route path="mind-maps" element={<Suspense fallback={<LoadingFallback />}><MindMapsPage /></Suspense>} />
          <Route path="visualisers" element={<Suspense fallback={<LoadingFallback />}><VisualisersPage /></Suspense>} />
          <Route path="bookmarks" element={<Suspense fallback={<LoadingFallback />}><BookmarksPage /></Suspense>} />
          <Route path="practice" element={<Suspense fallback={<LoadingFallback />}><PracticePage /></Suspense>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
