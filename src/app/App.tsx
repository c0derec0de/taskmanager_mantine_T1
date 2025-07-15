import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage/ui/MainPage';
import EditPage from '../pages/EditPage/ui/EditPage';
import CreatePage from '../pages/CreatePage/ui/CreatePage';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/task/:id' element={<EditPage />} />
        <Route path='/task/new' element={<CreatePage />} />
      </Routes>
    </Provider>
  );
}

export default App;
