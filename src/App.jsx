
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'wouter';
import PrivateRoute from './components/PrivateRoute';
import BuscarCep from './pages/BuscarCep';
import CadastroExercicio from './pages/CadastroExercicio';
import CadastroLocalExercicio from './pages/CadastroLocalExercicio';
import CadastroUsuarios from './pages/CadastroUsuarios';
import Dashboard from './pages/Dashboard';
import EditarLocal from './pages/EditarLocal';
import Lista from './pages/Lista';
import Login from './pages/Login';
import './App.css';

function ProtectedPage({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}

ProtectedPage.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={CadastroUsuarios} />
      <Route path="/">
        <ProtectedPage>
          <Dashboard />
        </ProtectedPage>
      </Route>
      <Route path="/lista/:id">
        {(params) => (
          <ProtectedPage>
            <Lista id={params.id} />
          </ProtectedPage>
        )}
      </Route>
      <Route path="/cep">
        <ProtectedPage>
          <BuscarCep />
        </ProtectedPage>
      </Route>
      <Route path="/cadastro-local">
        <ProtectedPage>
          <CadastroLocalExercicio />
        </ProtectedPage>
      </Route>
      <Route path="/cadastro-exercicio">
        <ProtectedPage>
          <CadastroExercicio />
        </ProtectedPage>
      </Route>
      <Route path="/editar-exercicio/:id">
        {(params) => (
          <ProtectedPage>
            <CadastroExercicio id={params.id} />
          </ProtectedPage>
        )}
      </Route>
      <Route path="/editar-local/:id">
        {(params) => (
          <ProtectedPage>
            <EditarLocal id={params.id} />
          </ProtectedPage>
        )}
      </Route>
      <Route>
        <Redirect to="/" replace />
      </Route>
    </Switch>
  );
}

export default App;
