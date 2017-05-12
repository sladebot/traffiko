import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAccidentCauseData } from '../actions/causeActions'
import CauseBarChart from '../components/CauseBarChart'

class HypothesisDashContainer extends Component {
  
  componentWillMount() {
    const { fetchAccidentCauseData } = this.props
    fetchAccidentCauseData()
  }

  render() {
    const { 
      fetching, 
      fetched,
      accident_reasons_data
    } = this.props

    console.log(`Rendering....  ${JSON.stringify(this.prop)}`)
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col mdl-color--grey-800" id="table">
              <CauseBarChart
                  title="Top 10 Causes of accidents"
                  height={400}
                  width={600}
                  fetching={fetching}
                  fetched={fetched}
                  accident_reasons_data={accident_reasons_data}/>
            </div>
            <div className="mdl-cell mdl-cell--6-col" id="parallel">
                <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                  <thead>
                    <tr>
                      <th class="mdl-data-table__cell--non-numeric">Material</th>
                      <th>Quantity</th>
                      <th>Unit price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[].map(d => {
                      return (
                        <tr>
                          <td class="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                          <td>25</td>
                          <td>$2.90</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ heatMap }) => {
  const {fetching, fetched, accident_reasons_data} = heatMap
  return {
    fetching,
    fetched,
    accident_reasons_data
  }
}

const actions = {
  fetchAccidentCauseData
}

export default connect(mapStateToProps, actions)(HypothesisDashContainer)