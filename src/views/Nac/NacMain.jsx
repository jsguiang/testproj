import React from "react";
import PropTypes from "prop-types";
import { Route, NavLink, Link as RouterLink } from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Info from "components/Typography/Info.jsx";
import Link from '@material-ui/core/Link';

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

class NacMain extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                 <h2>1</h2>
                </CardIcon>
                <p className={classes.cardCategory}>Account Opening For Processing</p>
              </CardHeader>
              <CardFooter profile >
                <div className={classes.stats}>

                <Link component={AdapterLink} to="/admin/nacbranch">
                <Info >
                    Open Queue
                    </Info>
              </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                 <h2>0</h2>
                </CardIcon>
                <p className={classes.cardCategory}>Account Opening For Follow Up</p>
              </CardHeader>
              <CardFooter profile >
                <div className={classes.profile}>

                <Link component={AdapterLink} to="/admin/nacbranch3">
                <Info >
                    Open Queue
                    </Info>
              </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

NacMain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(NacMain);
