import { connect } from 'react-redux'
import { selectAccidentType } from '../modules/locationDash'

import LocationDash from '../components/LocationDash'

const mapDispatchToProps = {
  selectAccidentType: () => selectAccidentType()
}

const mapStateToProps = ({heatmap_data, top_accident_reason_bar_data, borough_data}) => ({
  heatmap_data: [[-73.9401,40.8163], [-73.892654,40.857395], [-73.9401,40.8163]],
  accident_reasons: top_accident_reason_bar_data,
  borough_data: borough_data
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationDash)