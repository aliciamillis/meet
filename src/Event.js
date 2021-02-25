import React from "react";
import './Event.css';
import { Card } from "react-bootstrap";
class Event extends React.Component {
  state = {
    show: false,
  };

  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  // formatStartTime = () => {
  //   const time = this.props.event.start.dateTime;
  //   const formattedStartTime = moment(time).format('dddd, MMMM, Do YYYY, h:MM a');
  //   return <span className='start-dateTime'>{`${formattedStartTime}`}</span>
  // }

  // formatEndTime = () => {
  //   const time = this.props.event.end.dateTime;
  //   const formattedEndTime = moment(time).format('dddd, MMMM, Do YYYY, h:MM a');
  //   return <span className='start-dateTime'>{`${formattedEndTime}`}</span>
  // }
  render() {
    return (
      <Card className="Event" id={this.props.id}>
        <Card.Body>
          <div className="dates">
            <div className="event__str">
              {/* <span className='time-label'>Starts @ </span>{this.formatStartTime()} */}
            </div>
            <div className="event__end">
              {/* <span className='time-label'>Ends @ </span>{this.formatEndTime()} */}
            </div>
          </div>
          <div className="event__summary">
            <h3>{this.props.event.summary}</h3>
            <div className="event__location">{this.props.event.location}</div>
            <button className="detailsBtn" onClick={this.handleClick}>
              Details
            </button>
          </div>

          {this.state.show && (
            <div className="EventDetail">
              <div className="event__description">
                {this.props.event.description}{" "}
              </div>
              <div className='event__oragnizer'>
                Get in touch with us about this event at: <span className='org-email'>{event.organizer.email}</span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Event;