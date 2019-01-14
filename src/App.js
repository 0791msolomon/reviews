import React, { Component } from "react";
import { firebase, db } from "./Auth";
import Names from "./Names";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { companyName: "", employees: [] };
  }
  componentDidMount = () => {
    db.ref("companies").once("value", snap => {
      let company = Object.values(snap.val());
      company.map(item => console.log(item.name));
    });
  };
  renderEmployees = e => {
    e.preventDefault();
    let data = [];
    db.ref(`companies`)
      .once("value", snap => {
        snap.forEach(x => {
          let item = x.val();
          let key = x.key;
          data.push({ name: item.name, key });
        });
        data.map(x => {
          if (!x.name) {
            return;
          }
          if (
            x.name.toUpperCase().trim() ===
            this.state.companyName.toUpperCase().trim()
          ) {
            this.setState({ bID: x.key });
          }
        });
      })
      .then(() => {
        db.ref(`companies/${this.state.bID}`).once("value", snap => {
          let arr = [];
          arr.push(Object.values(snap.val().employees));
          this.setState({ employees: arr });
        });
      });
  };
  renderEmployeeList = () => {
    let { employees } = this.state;
    console.log(employees);
    return employees[0].map(item => {
      return (
        <div key={item.id} style={{ marginTop: "3%" }}>
          <Names
            id={item.id}
            name={item.name}
            companyId={this.state.bID}
            reviewCounts={item.reviewCounts}
            reviewInvites={item.reviewInvites}
          />
        </div>
      );
    });
  };
  render() {
    return (
      <div className="App" style={{ marginBottom: "3%" }}>
        <div className="page-header">
          <h1>Employee Review Counts</h1>
        </div>
        <input
          className="col-4 form-control"
          type="text"
          placeholder="enter company name, check console for list of names"
          value={this.state.companyName}
          onChange={e => this.setState({ companyName: e.target.value })}
        />
        <br />
        <button
          className="col-4 form-control btn-info"
          onClick={this.renderEmployees}
        >
          Display Company Employees
        </button>
        <br />
        <h3 className="col-4 form-control">
          {this.state.bID ? `Company Id: ${this.state.bID}` : null}
        </h3>
        <br />
        <div style={{ textAlign: "left", marginLeft: "3%" }}>
          {this.state.employees.length > 0 ? this.renderEmployeeList() : null}
        </div>
      </div>
    );
  }
}

export default App;
