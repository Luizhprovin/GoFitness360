import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UsuariosContextProvider } from './context/UsuariosContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuariosContextProvider>
    <App />
  </UsuariosContextProvider>
);
