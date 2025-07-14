import './App.css';
import { Routes, Route } from 'react-router-dom';
import { TaskProvider } from './providers/TaskProvider';
import MainPage from '../pages/MainPage/ui/MainPage';
import EditPage from '../pages/EditPage/ui/EditPage';
import { MantineProvider, createTheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

const theme = createTheme({
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
});
function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  useHotkeys([['mod+J', toggleColorScheme]]);

  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <TaskProvider>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/task/:id' element={<EditPage />} />
        </Routes>
      </TaskProvider>
    </MantineProvider>
  );
}

export default App;
