import PropTypes from 'prop-types';

function Lista({ id }) {
  return <h1>Lista {id}</h1>;
}

Lista.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Lista;
