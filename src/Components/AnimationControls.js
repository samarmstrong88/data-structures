import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setAnimationStep } from '../actions/actionCreators';

const AnimationControls = props => {
  /* eslint-disable no-shadow */
  const { animationState, setAnimationStep } = props;
  /* eslint-disable no-shadow */
  return (
    <div className="animation-controls">
      <button
        type="button"
        onClick={() =>
          setAnimationStep('stack', animationState.animationType, 'prev')
        }
      >
        Prev animation Step
      </button>
      <button
        type="button"
        onClick={() =>
          setAnimationStep('stack', animationState.animationType, 'next')
        }
      >
        Next animation Step
      </button>
    </div>
  );
};

AnimationControls.propTypes = {
  animationState: PropTypes.object.isRequired,
  setAnimationStep: PropTypes.func,
};

function mapStateToProps({ animationState }) {
  return { animationState };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAnimationStep,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimationControls);
