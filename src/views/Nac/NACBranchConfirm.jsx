import React from "react";
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import nacStyle from "assets/jss/material-dashboard-react/views/nacStyle.jsx";
import moment from 'moment';

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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import NacList from "views/Nac/NacList.jsx";
import avatar from "assets/img/faces/Client.JPG";

import { Route, NavLink, Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
import {
    grayColor
} from "assets/jss/material-dashboard-react.jsx";

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const styles = theme => ({
    root: {
        margin: 0,
        padding: "2px",
    },
    closeButton: {
        position: 'absolute',
        right: "1px",
        top: "1px",
        color: grayColor[0],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: "2px",
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: "2px",
        justifyContent: "center",
        alignItems: "center"                
    },
}))(MuiDialogActions);

class NACBranchConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isOpen: false,
            clientInfo: {},
            vclientPhoto: "",
            open: false,
            setOpen: false,
            vclientID: ""
        };
    };

    handleClickOpen = () => {
        this.setState({ setOpen: true });
    };
    handleClose = () => {
        this.setState({ setOpen: false });
    };

    async  componentDidMount() {
        await this.setState({ clientInfo: this.props.location.state });
        this.setState({ vclientPhoto: sessionStorage.getItem("clientPhoto") });
        this.setState({ vclientID: sessionStorage.getItem("ID") });
    }

    renderAvatar() {
        if (this.state.vclientPhoto) {
            return (
                <div>
                    <CardMedia
                        component="img"
                        image={this.state.vclientPhoto}
                    />
                </div>
            )
        }
        else {
            return (
                <div>
                    <CardMedia
                        component="img"
                        image={avatar}
                    />
                </div>
            )
        }

    }

    render() {
        const { classes } = this.props;
        const { clientInfo } = this.state;
        console.log(sessionStorage.getItem("clientPhoto"));
        console.log(sessionStorage.getItem("ID"));



        if (!this.state.clientInfo)
            return (<p>Loading data</p>)
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="plain">
                                <h5 className={classes.cardTitleBlue}>APP. REF NO.: {clientInfo.referenceNumber} </h5>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>

                                        <Card>
                                            <Grid container alignItems="center">

                                                <Grid item xs={12} sm={12} md={3}>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6}>
                                                    {this.renderAvatar()}
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={3}>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="gray">
                                                <h6 className={classes.cardTitleBlack}>ACCOUNT INFORMATION:</h6>

                                            </CardHeader>
                                            <CardBody>

                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Product Type: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase defaultValue="Regular Savings" value={clientInfo.productType} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>RC Code: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase id="" defaultValue="888" value={clientInfo.branchCode} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Account Facilities: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} ><Buttonx className={classes.txtbuttonblue}  >View</Buttonx>
                                                    </Grid>
                                                </Grid>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>

                                        <Card>
                                            <CardHeader color="gray">
                                                <h6 className={classes.cardTitleBlack}>Personal Information:</h6>
                                            </CardHeader>
                                            <CardBody>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Full Name: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}>
                                                        <InputBase id="" defaultValue="Full Name" className={classes.input} inputProps={{ 'aria-label': 'naked' }} value={
                                                            clientInfo.firstName + " " + clientInfo.middleName + " " + clientInfo.lastName} />

                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Birth Place: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        <InputBase id="" defaultValue="Manila" className={classes.input} value={clientInfo.placeofBirth} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Birth Date: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        <InputBase name="birthDate" required data-provide="datepicker" value={moment(clientInfo.birthDate).format("LL")} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />

                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Citizenship: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        <InputBase id="" defaultValue="Filipino" className={classes.input} value={clientInfo.nationality} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>US Person: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        <InputBase id="" defaultValue="No" className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="gray">
                                                <h6 className={classes.cardTitleBlack}>Contact Details:</h6>

                                            </CardHeader>
                                            <CardBody>

                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Mobile Number: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase defaultValue="(0999) 12345678" value={clientInfo.mobileNumber} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Email: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase id="" defaultValue="jdc@email.com" className={classes.input} value={clientInfo.emailAddress} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Present Address: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} ><InputBase id="" defaultValue=" " value={clientInfo.presentAddress} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Permanent Address: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} ><InputBase id="" defaultValue="same as present" value={clientInfo.permanentAddress} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                            </CardBody>
                                        </Card>
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="gray">
                                                <h6 className={classes.cardTitleBlack}>Financial Information:</h6>

                                            </CardHeader>
                                            <CardBody>

                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Source of funds: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase defaultValue="salary" className={classes.input} value={clientInfo.sourceofIncome} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Nature of Work: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase id="" defaultValue="Employee" className={classes.input} value={clientInfo.natureofWork} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                </Grid>
                                            </CardBody>
                                        </Card>
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardHeader color="gray">
                                                <h6 className={classes.cardTitleBlack}>Identification Documents:</h6>

                                            </CardHeader>
                                            <CardBody>

                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Document Type: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><Buttonx className={classes.txtbuttonblue} onClick={this.handleClickOpen} >View</Buttonx>

                                                    </Grid>
                                                </Grid>
                                            </CardBody>
                                        </Card>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12}>
                                        <Card>
                                            <CardBody>

                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={3}><Primary>Please sign here: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={3}><Buttonx className={classes.txtbuttonblue}  >Capture</Buttonx>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={3}><Buttonx className={classes.txtbuttonblue}  >Capture</Buttonx>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={3}><Buttonx className={classes.txtbuttonblue}  >Capture</Buttonx>
                                                    </Grid>
                                                </Grid>
                                            </CardBody>
                                        </Card>
                                    </GridItem>

                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Grid container direction="row"
                                    justify="center" spacing={8}
                                    alignItems="center" xs={12} sm={12} md={12} >
                                    <Link component={AdapterLink} to={{ pathname: "/admin/nacbranch", state: this.state.clientInfo }} >
                                        <Button variant="contained" color="info" >
                                            Confirm
                                         </Button>
                                    </Link>
                                    <Link component={AdapterLink} to={{ pathname: "/admin/nacbranch", state: this.state.clientInfo }} >
                                        <Button variant="contained" color="info" >
                                            Clear       </Button>
                                    </Link>
                                </Grid>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>


                <Dialog onClose={this.handleClose} aria-labelledby="form-dialog-title" open={this.state.setOpen} fullWidth={true} maxWidth={"md"} >
                    <DialogTitle id="customized-dialog-title" >

                    </DialogTitle>
                    <DialogContent dividers>
                        <GridContainer>

                        <GridItem xs={12} sm={12} md={2}>
                        </GridItem>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="gray">
                                        <h6 className={classes.cardTitleBlack}>Client Documents:</h6>

                                    </CardHeader>
                                    <CardBody>

                                        <Grid container alignItems="center">
                                            <CardMedia
                                                component="img"
                                                image={avatar}
                                            />
                                        </Grid>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        <GridItem xs={12} sm={12} md={2}>
                        </GridItem>
                        </GridContainer>

                    </DialogContent>
                    <DialogActions >
                        <Button onClick={this.handleClose} color="info">
                            Close
                  </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


NACBranchConfirm.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(nacStyle)(NACBranchConfirm);