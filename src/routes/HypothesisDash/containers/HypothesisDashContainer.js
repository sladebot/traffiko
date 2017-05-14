import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import { fetchAccidentCauseData, filterByAccidentCause } from '../actions/causeActions'
import CauseBarChart from '../components/CauseBarChart'
import _ from 'lodash'

class HypothesisDashContainer extends Component {
  
  componentWillMount() {
    const { fetchAccidentCauseData, filterByAccidentCause } = this.props
    fetchAccidentCauseData()
    filterByAccidentCause()
  }

  getBoroughMeta(dataset) {
    var borough_data = {}
    dataset.map(data => {
      let borough = data['borough']
      let hash
      if(borough_data[borough]) {
        hash = borough_data[borough]
        hash['total'] += data['total']
        hash['injured'] += data['injured']
        hash['killed'] += data['killed']
      } else {
        hash = {
          total: data['total'],
          injured: data['injured'],
          killed: data['killed']
        }
      }
      borough_data[borough] = hash
    })

    var response = []

    Object.keys(borough_data).map(borough => {
      let h = {}
      if(borough != "" ) {
        h['borough'] = borough
        h['killed'] = borough_data[borough]['killed']
        h['injured'] = borough_data[borough]['injured']
        h['total'] = borough_data[borough]['total']
        response.push(h)
      }
    })

    return _.sortBy(response, (d) => { return d.total }).reverse()
  }

  render() {
    const { 
      fetching, 
      fetched,
      accident_reasons_data,
      selectedCause,
      borough_cause_dash_borough
    } = this.props

    const borough_info = this.getBoroughMeta(borough_cause_dash_borough)
    if(fetched) {
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
                <div className="labelHeader">Top 10 Causes for Accidents</div>
              </div>
              <div className="mdl-cell mdl-cell--6-col" id="parallel">
                <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--12-col">
                    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp mdl-color--grey-800 mdl-text-color--white info--table">
                      <thead>
                        <tr>
                          <th>Borough</th>
                          <th>Total Accidents</th>
                          <th>Injured</th>
                          <th>Killed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {borough_info.map(d => {
                          return (
                            <tr>
                              <td>{d['borough']}</td>
                              <td>{d['total']}</td>
                              <td>{d['injured']}</td>
                              <td>{d['killed']}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <div className="labelHeader">Most Traffic Prone Boroughs in NYC</div>
                  </div>
                  <div className="mdl-cell mdl-cell--12-col">
                    <div className="text mdl-text-color--white text-white insight--text mdl-color--grey-800">
                      <div className="labelHeader">Inspiration & Insights</div>
                      <div className="text-white" style={{padding: '20px'}}>
                        We found that the major reason of accidents is Driver Inattention / Distraction as well as the 
                        highest number of accidents occur in Brooklyn and Queens. We can use this information to spread awareness
                        to reduce the number of accidents. That was the main inspiration for this data analysis project.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{height: 700, width: 800}}>
          <Spinner 
            spinnerName="cube-grid"
            className='center'
            />
        </div>
      )
    }
  }
}

const mapStateToProps = ({ heatMap }) => {
  const {fetching, fetched, accident_reasons_data, selectedCause, borough_cause_dash_borough} = heatMap
  return {
    fetching,
    fetched,
    accident_reasons_data,
    selectedCause,
    borough_cause_dash_borough
  }
}

const actions = {
  fetchAccidentCauseData,
  filterByAccidentCause
}

export default connect(mapStateToProps, actions)(HypothesisDashContainer)


