import PropTypes from 'prop-types';
import { Redirect } from 'wouter';

function PrivateRoute({ children }) {
  const isAutenticado =
    JSON.parse(localStorage.getItem('isAutenticado')) || false;

  return isAutenticado ? children : <Redirect to="/login" replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
