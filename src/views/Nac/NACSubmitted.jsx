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
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/icons/AddAlert";


import NacList from "views/Nac/NacList.jsx";
import avatar from "assets/img/faces/Client.JPG";


import { Route, NavLink, Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

class NACSubmitted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            isOpen: false,
            clientInfo: {}, vresult: {},
            tc: false,
            colorcode:"danger"
        };
    };

    componentWillUnmount() {
        var id = window.setTimeout(null, 0);
        while (id--) {
            window.clearTimeout(id);
        }
    }

    showNotification(place) {
        var x = [];
        x[place] = true;
        this.setState(x);
        this.alertTimeout = setTimeout(
            function () {
                x[place] = false;
                this.setState(x);
            }.bind(this),
            12000
        );
    }

    uploadForm = (event) => {
        event.preventDefault();
        const { referenceNumber, submitInfo } = this.props;
        this.setState({ clientInfo: submitInfo });
        console.log(submitInfo);
        const { clientInfo } = this.state;
        const config = {
            headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Content-Type": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
        };

        const form1 = {
            "dedupDetails": {
                "referenceNumber": referenceNumber,
                "dedupResult": "",
                "dedupDetails_List": [{
                    "customerName": "",
                    "birthdate": "",
                    "address": "",
                    "eMail": "",
                    "cif": "",
                    "psbAccounts": "",
                    "sourceAccounts": "",
                    "mobileAppReferenceNumber": null,
                    "mobaUserID": "",
                    "mobileAppFullName": "",
                    "rebaReferenceNumber": null,
                    "rebaUserID": "",
                    "rebaFullName": "",
                    "findings": ""
                }]
            }, "icdbDetails": {
                "refno": referenceNumber,
                "icdbresult": "0",
                "icdbDetails_List": [{
                    "refno": referenceNumber,
                    "icdbid": "0",
                    "cusT_NAME": "",
                    "aka": "",
                    "orG_CD": "",
                    "sourcE_ID": "",
                    "remarks": "",
                    "teL_NO": "",
                    "cusT_ADDR": "",
                    "dT_UPLD": "0001-01-01T00:00:00",
                    "sysmatch": "",
                    "carscode": ""
                }]
            }, "carsDetails": {
                "refno": referenceNumber,
                "riskscore": "2",
                "riskrating": "NORMAL",
                "riskprofile": "'FILIPINO','0001REGULAR EMPLOYEES','0001SALARYPAYROLL','LNK1'",
                "carsDetails_List": [{
                    "refno": referenceNumber,
                    "factorcode": "07",
                    "factordesc": "Linked Accounts",
                    "subfactorcode": "LNK1",
                    "subfactor": "None linked; 1 or more accounts owned by the same person and maintained in the same branch",
                    "points": "2"
                }]
            }, "partition": submitInfo.partition,
            "offset": submitInfo.offset,
            "statusCode": "Ok",
            "statusDescription": null,
            "referenceNumber": referenceNumber,
            "existingLevel": "0",
            "applicationLevel": "3",
            "l1ApplicationDate": null,
            "l1Status": null,
            "l2ApplicationDate": null,
            "l2Status": null,
            "l3ApplicationDate": "2019-08-05T00:00:00+08:00",
            "l3Status": "6",
            "lastName": submitInfo.lastName,
            "middleName": submitInfo.middleName,
            "firstName": submitInfo.firstName,
            "birthDate": submitInfo.birthDate,
            "mobileNumber": submitInfo.mobileNumber,
            "emailAddress": submitInfo.emailAddress,
            "permanentAddress": submitInfo.permanentAddress,
            "municipalityCode": submitInfo.municipalityCode,
            "province": submitInfo.province,
            "country": submitInfo.country,
            "zipCode": submitInfo.zipCode,
            "sourceofIncome": submitInfo.sourceofIncome,
            "natureofWork": submitInfo.natureofWork,
            "placeofBirth": submitInfo.placeofBirth,
            "nationality": submitInfo.nationality,
            "productType": submitInfo.productType,
            "dedupResult": null,
            "icdbResult": null,
            "carsScore": null,
            "carsRiskProfile": null,
            "carsOverallRiskRating": null,
            "dedupDisposition": null,
            "updatedCARSScore": null,
            "updatedCARSRiskProfile": null,
            "updatedCARSOverallRiskRating": null,
            "ciF_ID": null,
            "accountNumber": null,
            "videoCallSchedule": null,
            "remarks": submitInfo.remarks,
            "imageDetails": submitInfo.imageDetails,
            "branchCode": "111",
            "sourceApplication": "3"
        }
            ;
        console.log(form1);

        axios.post('http://localhost:11352/api/WebApi/PostKafka', { kafkaurl: "http://10.11.27.104:5003/api/NacReview", kafkadata: form1 })
            .then(response => {
                console.log(response)
                this.setState({ vresult: response.data });

                if (this.state.vresult.statusCode === "Ok") {               
                    this.setState({ colorcode: "info" });
                    this.showNotification("bc");
                } else {
                    //console.log(this.state.vresult.statusCode + ": " + this.state.vresult.statusDescription);                    
                this.setState({ colorcode: "danger" });
                    this.showNotification("bc");

                }
            })
            .catch((ex) => {
                console.error(ex);
                this.setState({ isError: true }); 
                this.showNotification("bc");

            });

    }//end uplodForm


    render() {
        if (this.state.tc) {
        return (
        <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody >
                        <Grid container direction="row"
                            justify="center" 
                            alignItems="center" xs={12} sm={12} md={12} >
                            <Snackbar
                                place="bc"
                                color={this.state.colorcode}
                                icon={AddAlert}
                                message={this.state.vresult.statusCode + ": " + this.state.vresult.statusDescription}
                                open={this.state.tc}
                                closeNotification={() => this.setState({ tc: false })}
                                close
                            />
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>

    </div>
        )
    }

        return (

            <Button variant="contained" color="info" onClick={this.uploadForm.bind(this)}>   For Approval</Button>
        );
    }
}


NACSubmitted.propTypes = {
    classes: PropTypes.object.isRequired,
    submitInfo: PropTypes.object,
    referenceNumber: PropTypes.string.isRequired
};
export default withStyles(nacStyle)(NACSubmitted);