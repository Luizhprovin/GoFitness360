import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAutenticado =
    JSON.parse(localStorage.getItem('isAutenticado')) || false;

  return isAutenticado ? children : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
