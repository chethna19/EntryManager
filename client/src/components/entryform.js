import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Entry extends Component {
    state = {
        name: null,
        email: null,
        phone: null,
        hostname: null,
        hostemail: null,
        hostphone: null,
        id: null,
        checkintime: null,
        ischeckin: false
    }

    calcTime(){
        var currentTime = new Date();
        var currentOffset = currentTime.getTimezoneOffset();
        var ISTOffset = 330;   // IST offset UTC +5:30 
        var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

        // ISTTime now represents the time in IST coordinates

        var hoursIST = ISTTime.getHours();
        var minutesIST = ISTTime.getMinutes();
        var timeIST = null;

        if (hoursIST > 12) {
            hoursIST = hoursIST - 12;
            timeIST = hoursIST + ":" + minutesIST + " PM IST";
        }
        else {
            timeIST = hoursIST + ":" + minutesIST + " AM IST";
        }

        return timeIST;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
          });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var checkintime = this.calcTime();
        console.log('checkin', checkintime);
        this.setState({
            checkintime: checkintime
        }, () => {
            console.log(this.state);
            this.getResponse();
        });
        //this.getResponse();
    }

    getResponse = async() => {
        await axios.post("http://localhost:5000/entrymanager/enter", {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          hostname: this.state.hostname,
          hostemail: this.state.hostemail,
          hostphone: this.state.hostphone,
          checkintime: this.state.checkintime
      }).then(res => {
          if (res.status === 200) {
              console.log(res);
              this.setState({
                  ischeckin: true,
                  id: res.data._id
              });
          }
      });
    }

    render () {
        if(this.state.ischeckin){
            return <Redirect to = {{ pathname: "/home", 
            state: {
                id: this.state.id,
                name: this.state.name
            } }} />;
        }
        return (
            <div className="app1">
                <h1><center>Welcome!</center></h1>
                <h5><center>Please Enter Your Details Here</center></h5>
                <br/><br/>
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <br/>
                    <div className="form-group">
                    <label>Name: </label><br/>
                    <input type="text" id="name" onChange={this.handleChange} className="form-control" required/><br/>
                    </div>
                    <div className="form-group">
                    <label>Email: </label><br/>
                    <input type="email" id="email" onChange={this.handleChange} className="form-control" required/><br/>
                    </div>
                    <div className="form-group">
                    <label>Phone Number: </label><br/>
                    <input type="text" id="phone" minlength="10" maxLength="10" onChange={this.handleChange} className="form-control" pattern="[1-9]{1}[0-9]{9}" required/><br/>
                    </div>
                    <div className="form-group">
                    <label>Name of the Host: </label><br/>
                    <input type="text" id="hostname" onChange={this.handleChange} className="form-control" required/><br/>
                    </div>
                    <div className="form-group">
                    <label>Email of the Host: </label><br/>
                    <input type="email" id="hostemail" onChange={this.handleChange} className="form-control" required/><br/>
                    </div>
                    <div className="form-group">
                    <label>Phone Number of the Host: </label><br/>
                    <input type="text" id="hostphone" minlength="10" maxLength="10" onChange={this.handleChange} className="form-control" pattern="[1-9]{1}[0-9]{9}" required/><br/>
                    </div>
                    <center><button className="button">Submit</button></center><br/>
                </form>
                </div>
                <br/><br/>
            </div>
        );
    }
}

export default Entry;