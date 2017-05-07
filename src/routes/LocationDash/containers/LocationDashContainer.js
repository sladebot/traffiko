import { connect } from 'react-redux'
import { selectAccidentType } from '../modules/locationDash'

import LocationDash from '../components/LocationDash'

const mapDispatchToProps = {
  selectAccidentType: () => selectAccidentType()
}

const mapStateToProps = (state) => ({
  location_dash: state.location_dash
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationDash)