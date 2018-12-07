import React, { Component } from 'react';
import './CandidateView.css';
import request from 'superagent';

const API_KEY = 'dbrXOUZ0b2XVa5F05twmocckwL4SOUoD9EKiz5Yh';
const BASE_URL = 'https://api.open.fec.gov/v1';

class CandidateView extends Component {
  constructor(props){
    super();

    this.state = {
      financialInfo: [],
      hasLoaded: false,
    }

    // gets financial info
    request.get(`${BASE_URL}/candidate/${props.candidate.candidate_id}/totals?api_key=${API_KEY}&full_election=true`)
    .then(res=>{
      this.setState({hasLoaded: true})
      this.setState({financialInfo: res.body.results});
    });
  }

  render() {
    return (
      <div>
        <button
          onClick={this.props.returnToSearch}
        >Go back</button>

        <h2>{this.props.candidate.name}</h2>
        <div id="candidate-metadata">
          <div>Years Active: {this.props.candidate.cycles.join(', ')}</div>
          <div>State: {this.props.candidate.state}</div>
          <div>Office: {this.props.candidate.office_full}</div>
          <div>Party: {this.props.candidate.party_full}</div>
        </div>
        <h4>Disbursements</h4>
        { this.state.hasLoaded && this.state.financialInfo.length === 0 &&
          <div>Candidate received no disbursements</div>
        }
        { this.state.financialInfo.map(el=>{
          return (
            <div key={el.cycle} className="disbursement">
              {el.coverage_start_date.slice(0, 9)} through {el.coverage_end_date.slice(0, 9)}
              <div>
                ${el.disbursements}
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default CandidateView;
