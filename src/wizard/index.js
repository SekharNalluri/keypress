import {connect} from 'react-redux';
import Wizard from './wizard.component';

function mapStateToProps(state) {
  return {
    sessionId: state.patient.sessionId,
    session: state.patient.session.sessionData,
    //TODO: get fallback value
  };
}

export default connect(mapStateToProps)(Wizard);
