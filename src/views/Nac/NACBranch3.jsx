import React from "react";
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";
import moment from 'moment';

import PropTypes from "prop-types";
import nacStyle from "assets/jss/material-dashboard-react/views/nacStyle.jsx";

// core components
import Draggable, { DraggableCore } from 'react-draggable';
import "assets/css/modal.css";
import CameraModal from './CameraModal';
import NACModal from './NACModal';
import NACSubmitted from './NACSubmitted';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from "@material-ui/core/Grid";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Primary from "components/Typography/Primary.jsx";

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Modal from '@material-ui/core/Modal';
import Buttonx from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
//import { Datepicker } from '@material-ui/pickers';

import NacList from "views/Nac/NacList.jsx";
import Buttonb from "react-bootstrap/Button";
import { Route, NavLink, Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

class NACBranch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            fullname: "",
            isOpen: false,
            data: {}, clientInfo: {}, iResult: {}, permAdd: {}, presentAdd: {}, application: {},
            acResult: [], dedupDesc: [], icdbDesc: [], carsDesc: [],
            icdbDetails: [], dedupDetails: [], carsDetails: [],
            acImages: {},
            email: '',
            name: '',
            phone: '',
            dob: '',
            gender: 'M',
            spouseName: 'NA',
            civilStatus: 'Single',
            formErrors: { email: '', name: '', phone: '' },
            emailValid: false,
            nameValid: false,
            phoneValid: false,
            dobValid: false,
            formValid: false,
            isError: false,
            isModalOpen: false,
            items: [
                { id: 0, desc: 'No Data', showModal: false }
            ],
            vRefNo: "01201904150000111",
            cameraOpen: false            
        };
    };


    async componentDidMount() {
        console.log(this.state.clientInfo);
        if (!this.props.location.state){
            this.getCustomerDetails()
            } else {
                
        await this.setState({ clientInfo: this.props.location.state });
            }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.clientInfo !== this.state.clientInfo) {
            if (!this.state.clientInfo) {
                this.getDedup("0");
            } else {
                this.getDedup(this.state.clientInfo);
            }


        }
    }

    getCustomerDetails = () => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
        };

        let vappno = this.state.vRefNo;
        // axios.get('api/WebApi/Getnxt', this.authorizationHeader())
        axios.get('/json/customer2.json', config)
            //axios.get('api/WebApi/Getnxt', { params: { id: '01201904150000111' } })
            .then(response => {
                console.log(response)
                let results = null;

                if (typeof (response.data) === "string") {
                    results = JSON.parse(response.data);
                } else {
                    results = response.data;
                }

                this.setState({
                    clientInfo: results, fields: results
                });
                this.setState({ carsDetails: this.state.clientInfo.carsDetails, icdbDetails: this.state.clientInfo.icdbDetails 
                    , icdbDetails: this.state.clientInfo.icdbDetails })


            })
            .catch((ex) => {
                console.error(ex);
                this.setState({ isError: true });
            });
    }; //end getCustomerDetails


    handleChange = e => {
        console.log("typing", e.currentTarget.value);
        this.setState({ text: e.currentTarget.value });
    };


    fieldOnChange = sender => {
        let fieldName = sender.target.name;
        let value = sender.target.value;
        let state = this.state;
        this.setState({
            ...state,
            clientInfo: { ...state.clientInfo, [fieldName]: value }
        });
        console.log(this.state.fields);
    }


    handleModalHide() {
        return () => {
            let { items } = this.state
            items = items.map(item => ({
                ...item,
                showModal: false,
            }))
            this.setState({ items })
        }
    }

    handleModalShow() {
        return e => {
            e.preventDefault();

            this.setState({ showModal: true });
        };
    }


    handleEditItem(selectedItem) {
        return e => {
            e.preventDefault()
            let { items } = selectedItem// this.state
            items = selectedItem.map(item => ({
                ...item,
                showModal: selectedItem.id === item.id
            }));
            this.setState({ items });
        };
    };


    loadConfirm = event => {
        this.props.history.push({ pathname: '/productinfo', state: this.state.fields })
    }



    getDedup(iCode) {
        console.log(iCode);
        let dedupResults = [];
        let icdbResults = [];
        let carsResults = [];
        axios.get('/json/acceptancecriteria.json')
            .then(response => {
                let results1 = null;

                if (typeof (response) === "string") {
                    results1 = JSON.parse(response.data);
                } else {
                    results1 = response.data;
                }
                //this.setState({acResult: results1.data.dedup});

                if (!iCode.dedupResult) {
                    dedupResults.push(results1.dedup.filter(item => item.code === "0"));
                } else {
                    dedupResults.push(results1.dedup.filter(item => item.code === iCode.dedupResult));
                }

                if (!iCode.icdbResult) {
                    icdbResults.push(results1.icdb.filter(item => item.code === "0"));
                } else {
                    icdbResults.push(results1.icdb.filter(item => item.code === iCode.icdbResult));
                }

                if (!iCode.updatedCARSScore) {
                    carsResults.push(results1.cars.filter(item => item.code === "0"));
                } else {
                    carsResults.push(results1.cars.filter(item => item.code === iCode.updatedCARSScore));
                };

                this.setState({ dedupDesc: dedupResults });
                this.setState({ icdbDesc: icdbResults });
                this.setState({ carsDesc: carsResults });


            })
            .catch((ex) => {
                console.log('dedupError: ' + ex);
            });
    }


    render() {
        const { classes } = this.props;

        const { clientInfo, fields, cameraOpen } = this.state;
        let wname = clientInfo.firstName + " " + clientInfo.middleName + " " + clientInfo.lastName;
        const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' }
        console.log(this.state)

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="plain">
                                <h5 className={classes.cardTitleBlue}>APP. REF NO.: {clientInfo.referenceNumber}</h5>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>

                                        <Card>
                                            <CardBody>
                                                <h6 className={classes.cardTitleBlack}>ACCEPTANCE CRITERIA:</h6>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4} ><Primary>ICDB Result: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}>
                                                        {this.state.icdbDesc.map(item =>
                                                            <NACModal btnCap={item[0].desc} item={item} category="ICDB" details={this.state.icdbDetails}  />
                                                            //  <Buttonx className={classes.txtbutton} onClick={this.handleEditItem(item)}  >{item[0].desc}</Buttonx>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>CARS Rating: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        {this.state.carsDesc.map(item =>
                                                            <NACModal btnCap={item[0].desc} item={item} category="CARS" details={this.state.carsDetails}/>
                                                            //  <Buttonx className={classes.txtbutton} onClick={this.handleEditItem(item)}  >{item[0].desc}</Buttonx>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Dedup: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        {this.state.dedupDesc.map(item =>
                                                            <NACModal btnCap={item[0].desc} item={item} category="DEDUP" details={this.state.dedupDetails}/>
                                                            //  <Buttonx className={classes.txtbutton} onClick={this.handleEditItem(item)}  >{item[0].desc}</Buttonx>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Card>
                                            <CardBody>
                                                <h6 className={classes.cardTitleBlack}>ACCOUNT INFORMATION:</h6>

                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Product Type: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase name="productType" value={clientInfo.productType} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>RC Code: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase name="branchCode" value={clientInfo.branchCode} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
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
                                                        <InputBase id="fullname" value={wname} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />

                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Birth Place: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        <InputBase name="placeofBirth" value={clientInfo.placeofBirth} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />

                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Birth Date: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        <InputBase name="birthDate" required data-provide="datepicker" value={moment(clientInfo.birthDate).format("LL")} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Citizenship: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} >
                                                        <InputBase name="nationality" value={clientInfo.nationality} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
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
                                                    <Grid item xs={12} sm={12} md={7}><InputBase name="mobileNumber" value={clientInfo.mobileNumber} className={classes.txtbutton} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Email: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase name="emailAddress" value={clientInfo.emailAddress} className={classes.txtbutton} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Present Address: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} ><TextField name="presentAddress" multiline rowsMax="4" value={clientInfo.presentAddress} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Permanent Address: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7} ><TextField name="permanentAddress" multiline rowsMax="4" value={clientInfo.permanentAddress} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
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
                                                    <Grid item xs={12} sm={12} md={7}><InputBase name="sourceofIncome" value={clientInfo.sourceofIncome} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Nature of Work: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}><InputBase name="natureofWork" value={clientInfo.natureofWork} className={classes.input} inputProps={{ 'aria-label': 'naked' }} onChange={this.fieldOnChange.bind(this)} />
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
                                                    <Grid item xs={12} sm={12} md={7}>    <CameraModal docType="ID" />
                                                    </Grid>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={4}><Primary>Personal Photo: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={7}> <CameraModal docType="clientPhoto" />
                                                    </Grid>
                                                </Grid>
                                                
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>

                                    <Grid container alignItems="center" >

                                    <Grid item xs={12} sm={12} md={2}>

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>

                                        <TextField
                                            id="nacRemarks"
                                            label="Remarks"
                                            style={{ margin: 8 }}
                                            placeholder="NAC Remarks"
                                            fullWidth
                                            multiline
                                            rowsMax="4"
                                            margin="normal"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2}>

                                    </Grid>
                                </Grid>
                                    </GridItem>

                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Grid container direction="row"
                                    justify="center" spacing={8}
                                    alignItems="center" xs={12} sm={12} md={12} >

                                    <RouterLink to={{ pathname: "/admin/nacbranchconfirm", state: this.state.clientInfo }}>
                                        <Button variant="contained" color="info" >
                                            For Client's Confirmation          </Button>
                                    </RouterLink>

                                    <NACSubmitted  referenceNumber = {clientInfo.referenceNumber} submitInfo = {this.state.clientInfo} />

                                    <Button variant="contained" color="danger" >
                                        For Compliance
              </Button>
                                </Grid>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
                {/* 
                {this.state.items.map((item, index) => (
                        <ItemModal
                            key={item.code}
                            show={item.showModal}
                            onHide={this.handleModalHide()}
                            onItemChange={this.handleItemChange}
                            item={item}
                        />

                    ),
                        console.log(this.state.items))} */}
            </div>
        );
    }
}


NACBranch.propTypes = {
    classes: PropTypes.object.isRequired,
    clientConfirmed: PropTypes.bool
};
export default withStyles(nacStyle)(NACBranch);