import React, { Component } from "react";
import axios from "axios";
export default class OrderForm extends Component {
  state = {
    posts: "inProgress",
    uts: "1540343442",
    alert: false,
    confirm: true,
    chanceFinished:false
  };
  handleClick = (e) => {
    if(this.state.chanceFinished){
      return null
    }
    if (e.target.id === "confirm") {
      this.handleSubmit();
    } else {
      this.setState({ posts: "rejected" ,confirm:false });
      this.handleSubmit();
    }
  };
  handleSubmit = () => {
    const user = {
      po: this.props.PONumber,
      posts: this.state.posts,
      uts: null,
    };
    axios
      .post(`http://localhost:4000/api/recOrderbySupplier`, { user })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        this.setState({alert:true,chanceFinished:true});
      });
  };

  render() {
    console.log(this.props);
    var a = (
      <tr>
        <td>{this.props.ItemNumber}</td>
        <td>{this.props.Description}</td>
        <td>{this.props.quantity}</td>
        <td>{`$${this.props.Amount}`}</td>
        <td>
          <button
            type="button"
            id="confirm"
            onClick={this.handleClick}
            class="btn btn-success col"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={this.handleClick}
            class="btn btn-danger col btn-mgn"
          >
            Reject
          </button>
        </td>
        <td>XYZ</td>
      </tr>
    );
    var alert = this.state.alert ? (
      this.state.confirm ? (
        <div class="alert alert-success" role="alert">
          You have Confirmed the order
        </div>
      ) : (
        <div class="alert alert-danger" role="alert">
          You have Rejected the order
        </div>
      )
    ) : null;
    return (
      <div className="container box">
        <dl class="row">
          <dt class="col-sm-2">Ship to:</dt>
          <dd class="col-sm-9">{this.props.ShipTo}</dd>

          <dt class="col-sm-2">Delivery Due:</dt>
          <dd class="col-sm-9">{this.props.DeliveryDue}</dd>

          <dt class="col-sm-2">Buyer ID:</dt>
          <dd class="col-sm-9">{this.props.BuyerID}</dd>
        </dl>
        <div class="table-responsive-md my-table">
          <table className="table table-bordered my-table">
            <tr>
              <th colspan="2">Purchase Order number</th>
              <th colspan="2">Items</th>
              <th colspan="2">Total</th>
            </tr>
            <tr>
              <td colspan="2">{this.props.PONumber}</td>
              <td colspan="2">PO Status: {this.props.PoStatus}</td>
              <td colspan="2">{`$${this.props.Amount}`}</td>
            </tr>
            <tr>
              <th>Item number</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Decision</th>
              <th>Message</th>
            </tr>
            {a}
          </table>
        </div>
        {alert}
      </div>
    );
  }
}
