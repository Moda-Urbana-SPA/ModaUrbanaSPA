import AppRoutes from './app/routes';
import AppProvider from './context/AppContext';
import './App.css';
import './pages/Page.css'; // por si tienes estilos globales aquí

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
