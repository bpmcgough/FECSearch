import React, { Component } from 'react';
import './App.css';
import CandidateList from './CandidateList.js';
import CandidateView from './CandidateView.js';
import request from 'superagent';

const API_KEY = 'dbrXOUZ0b2XVa5F05twmocckwL4SOUoD9EKiz5Yh';
const BASE_URL = 'https://api.open.fec.gov/v1';

class App extends Component {
  constructor(){
    super();
    this.state = {
      originalCandidateList: [],
      currentCandidateList: [],
      searchTerm: '',
      selectedCandidate: '',
      candidateIsSelected: false,
    }

    // loads initial list
    request.get(`${BASE_URL}/candidates/search?api_key=${API_KEY}`)
    .then(res=>{
      this.setState({currentCandidateList: res.body.results});
      this.setState({originalCandidateList: res.body.results})
    });
  }

  handleSearch(searchTerm){
    if(searchTerm){
      // loads by search
      request.get(`${BASE_URL}/candidates/search?api_key=${API_KEY}&q=${searchTerm}`)
      .then(res=>{
        this.setState({currentCandidateList: res.body.results});
      });
    } else {
      // if you clear out search bar, reloads list from the beginning
      request.get(`${BASE_URL}/candidates/search?api_key=${API_KEY}`)
      .then(res=>{
        this.setState({currentCandidateList: res.body.results});
      });
    }
  }

  selectCandidate(candidate){
    this.setState({candidateIsSelected: true});
    this.setState({selectedCandidate: candidate})
  }

  returnToSearch(){
    this.setState({candidateIsSelected: false});
    this.setState({currentCandidateList: this.state.originalCandidateList})
    this.setState({searchTerm: ''});
  }

  render() {
    return (
      <div className="App">
        {
          !this.state.candidateIsSelected &&
          <div>
            <h2>Search for a candidate:</h2>
            <input
              type="text"
              onChange={ev=>this.handleSearch(ev.target.value)}
            />
            <CandidateList
              currentCandidateList={this.state.currentCandidateList}
              selectCandidate={this.selectCandidate.bind(this)}
            />
          </div>
        }
        {
          this.state.candidateIsSelected &&
          <CandidateView
            candidate={this.state.selectedCandidate}
            returnToSearch={this.returnToSearch.bind(this)}
          />
        }
      </div>
    );
  }
}

export default App;
