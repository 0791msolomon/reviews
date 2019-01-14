import React from "react";
import { firebase, db } from "./Auth";

class Names extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      reviewCount: this.props.reviewCounts,
      reviewInvites: this.props.reviewInvites,
      reviewsSaved: false
    };
  }
  componentDidMount = () => {
    console.log(this.props.companyId);
  };

  saveReviews = () => {
    // db.ref(`companies/${this.props.companyId}`).once("value", snap => {
    //   let employees = Object.values(snap.val().employees);
    //   console.log(employees);
    // });
    db.ref(`companies/${this.props.companyId}/employees/${this.props.id}`)
      .update({
        reviewCounts: this.state.reviewCount,
        reviewInvites: this.state.reviewInvites
      })
      .then(() => {
        this.setState({ reviewsSaved: true });
      });
  };
  render() {
    return (
      <div
        style={
          this.state.reviewsSaved
            ? {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
                opacity: 0.5
              }
            : {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around"
              }
        }
      >
        <div className="col-md-2 col-sm-12">
          <label htmlFor=""> </label>
          <p>{this.props.name}</p>
        </div>
        <div className="col-md-2 col-sm-12">
          <label htmlFor="" />
          <p>{this.props.id}</p>
        </div>
        <div className="col-md-2 col-sm-12">
          <label htmlFor="">Review Count</label>
          <input
            type="number"
            className="form-control"
            placeholder="Review Count"
            value={this.state.reviewCount}
            onChange={e => this.setState({ reviewCount: e.target.value })}
          />
        </div>
        <div className="col-md-2 col-sm-12">
          <label htmlFor="">Review Invites</label>
          <input
            type="number"
            placeholder="Review Invites"
            className="form-control"
            value={this.state.reviewInvites}
            onChange={e => this.setState({ reviewInvites: e.target.value })}
          />
        </div>
        <div className="col-md-2 col-sm-12 ">
          <button
            onClick={this.saveReviews}
            className={
              this.state.reviewsSaved
                ? "form-control btn-success"
                : "form-control btn-danger"
            }
          >
            {this.state.reviewsSaved ? "Saved!" : "Save Reviews"}
          </button>
        </div>
      </div>
    );
  }
}

export default Names;
