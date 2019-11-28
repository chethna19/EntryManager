import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class Home extends Component {
    state = {
        ischeckout: false,
        checkouttime: null,
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
    
    handleSubmit = (e) => {
        var checkouttime = this.calcTime();
        this.setState({
            checkouttime: checkouttime
        }, () => {
            console.log(this.state);
            this.getResponse();
        });
    }

    getResponse = async() => {
        await axios.post("http://localhost:5000/entrymanager/exit", {
            id: this.props.location.state.id,
            checkouttime: this.state.checkouttime
        }).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({
                    ischeckout: true,
                });
            }
        });
    }

    render () {
        if(this.state.ischeckout){
            return <Redirect to = {{ pathname: "/" }} />;
        }
        return (
            <div>
                <br/><br/>
                
                <br/><br/>
                <div className="container">
                    <br/><br/><br/>
                <center><h2>Welcome {this.props.location.state.name}</h2></center><br/>
                <center><button onClick={this.handleSubmit} className="button">You can Check Out here</button></center>
                    <br/><br/><br/>
                </div>
            </div>
        );
    }
}

export default Home