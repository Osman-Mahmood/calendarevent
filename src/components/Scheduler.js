import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";

class Scheduler extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
      scale: "Day",
      days: DayPilot.Date.today().daysInMonth(),
      startDate: DayPilot.Date.today().firstDayOfMonth(),
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const dp = args.control;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (modal.canceled) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          resource: args.resource,
          text: modal.result
        });
      },
      eventMoveHandling: "Update",
      onEventMoved: (args) => {
        args.control.message("Event moved: " + args.e.text());
      },
      eventResizeHandling: "Update",
      onEventResized: (args) => {
        args.control.message("Event resized: " + args.e.text());
      },
      eventDeleteHandling: "Update",
      onEventDeleted: (args) => {
        args.control.message("Event deleted: " + args.e.text());
      },
      eventClickHandling: "Disabled",
      eventHoverHandling: "Bubble",
      bubble: new DayPilot.Bubble({
        onLoad: (args) => {
          // if event object doesn't specify "bubbleHtml" property 
          // this onLoad handler will be called to provide the bubble HTML
          args.html = "Event details";
        }
      }),
      treeEnabled: true,
    };
  }

  componentDidMount() {

    // load resource and event data
    this.setState({
      resources: [
        {name: "Resource A", id: "A"},
        {name: "Resource B", id: "B"},
        {name: "Resource C", id: "C"},
        {name: "Resource D", id: "D"},
        {name: "Resource E", id: "E"},
        {name: "Resource F", id: "F"},
        {name: "Resource G", id: "G"}
      ],
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2018-05-02T00:00:00",
          end: "2018-05-05T00:00:00",
          resource: "A"
        },
        {
          id: 2,
          text: "Event 2",
          start: "2018-05-03T00:00:00",
          end: "2018-05-10T00:00:00",
          resource: "C",
          barColor: "#38761d",
          barBackColor: "#93c47d"
        },
        {
          id: 3,
          text: "Event 3",
          start: "2018-05-02T00:00:00",
          end: "2018-05-08T00:00:00",
          resource: "D",
          barColor: "#f1c232",
          barBackColor: "#f1c232"
        },
        {
          id: 4,
          text: "Event 3",
          start: "2018-05-02T00:00:00",
          end: "2018-05-08T00:00:00",
          resource: "E",
          barColor: "#cc0000",
          barBackColor: "#ea9999"
        }
      ]
    });

  }

  render() {
    var {...config} = this.state;
    return (
      <div>
        <DayPilotScheduler
          {...config}
          ref={component => {
            this.scheduler = component && component.control;
          }}
        />
      </div>
    );
  }
}

export default Scheduler;
