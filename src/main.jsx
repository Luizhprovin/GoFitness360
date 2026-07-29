import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UsuariosContextProvider } from './context/UsuariosContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import CadastroUsuarios from "./pages/CadastroUsuarios.jsx";
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Lista from './pages/Lista.jsx';
import BuscarCep from "./pages/BuscarCep.jsx";
import CadastroLocalExercicio from './pages/CadastroLocalExercicio.jsx';
import CadastroExercicio from './pages/CadastroExercicio.jsx';
import EditarLocal from './pages/EditarLocal.jsx';

const rotas = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <CadastroUsuarios />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/", 
        element: <Dashboard />
      },
      {
        path: "/lista/:id",
        element: <Lista />
      },
      {
        path: "/cep",
        element: <BuscarCep />
      },
      {
        path: "/cadastro-local",
        element: (
          <PrivateRoute>
            <CadastroLocalExercicio />
          </PrivateRoute>
        )
      },
      {
        path: "/cadastro-exercicio",
        element: (
          <PrivateRoute>
            <CadastroExercicio />
          </PrivateRoute>
        )
      },
      {
        path: "/editar-exercicio/:id",
        element: (
          <PrivateRoute>
            <CadastroExercicio />
          </PrivateRoute>
        )
      },
      {
        path: "/editar-local/:id",
        element: (
          <PrivateRoute>
            <EditarLocal /> 
          </PrivateRoute>
        )
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <UsuariosContextProvider>
    <RouterProvider router={rotas} />
  </UsuariosContextProvider>
);
