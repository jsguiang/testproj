import React from "react";
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import nacStyle from "assets/jss/material-dashboard-react/views/nacStyle.jsx";

// core components
import Draggable, { DraggableCore } from 'react-draggable';
import "assets/css/modal.css";
import NACModal from './NACModal';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Primary from "components/Typography/Primary.jsx";

import Grid from "@material-ui/core/Grid";
import Modal from '@material-ui/core/Modal';
import Buttonx from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


import NacList from "views/Nac/NacList.jsx";
import avatar from "assets/img/faces/Client.JPG";


import { Route, NavLink, Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

class NACEndForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isOpen: false
        };
    };

    


    render() {
        const { classes } = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardBody >
                                
                                <Grid container direction="row"
                                    justify="center" spacing={2}
                                    alignItems="center" xs={12} sm={12} md={12} >
                                <h6 className={classes.centertextblue}>Application Submitted.</h6>
                                </Grid>
                            </CardBody>
                            <CardFooter>
                                <Grid container direction="row"
                                    justify="center" spacing={2}
                                    alignItems="center" xs={12} sm={12} md={12} >
                                    <Link component={AdapterLink} to="/admin/nacmain">
                                        <Button variant="contained" color="info" >
                                            Go back to Main Page       </Button>
                                    </Link>
                                </Grid>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>

            </div>
        );
    }
}


NACEndForm.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(nacStyle)(NACEndForm);