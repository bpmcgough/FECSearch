import React, { Component } from 'react';
import './CandidateList.css';

class CandidateList extends Component {
  render() {
    return (
      this.props.currentCandidateList.map(candidate=>{
        return (
          <div
            key={candidate.candidate_id}
          >
            <button
              onClick={()=>this.props.selectCandidate(candidate)}
              className="button"
            >
              {candidate.name}
            </button>
          </div>
        )
      })
    );
  }
}

export default CandidateList;
