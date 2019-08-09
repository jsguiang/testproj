import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import Primary from "components/Typography/Primary.jsx";

import Grid from "@material-ui/core/Grid";
import Modal from '@material-ui/core/Modal';
import Buttonx from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

import avatar from "assets/img/faces/marc.jpg";
import { boxShadow as boxShadowx } from "assets/jss/material-dashboard-react.jsx";
import NacList from "views/Nac/NacList.jsx";


const styles = {
  typo: {
    paddingLeft: "2%",
    marginBottom: "1px",
    fontWeight: "400",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "#1635ff",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleBlue: {
    color: "#1635ff",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardTitleBlack: {
    color: "#000000",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  button: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    verticalAlign: "middle",
    fontWeight: "600",
    lineHeight: "1.5em",
    textDecorationLine: "underline"
  },
  txtbutton: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "600",
    lineHeight: "1.5em",
    textDecorationLine: "underline",
    justify: "left",
    alignItems: "left"
  },
  centeritems: {
    direction: "row",
    justify: "center",
    alignItems: "center",
    spacing: "3px"
  },
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    outline: 'none',
    background: "white",
    boxShadow: boxShadowx,
    padding: "1px"
  },
  input: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "600",
    fontSize: "15px",
    position: 'absolute',
    borderRadius: 4,
    position: 'relative',
    width: 'auto'
  }
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};



function NACQueue(props) {
  const { classes } = props;

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="plain">
              <h5 className={classes.cardTitleBlue}>APP. REF NO.:</h5>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>

                  <Card>
                    <CardHeader color="gray">
                      <h6 className={classes.cardTitleBlack}>ACCEPTANCE CRITERIA:</h6>
                    </CardHeader>
                    <CardBody>
                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={3}><Primary>ICDB Result: </Primary>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7}><Buttonx className={classes.txtbutton} onClick={handleOpen}>GOOD</Buttonx>
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={3}><Primary>Dedup: </Primary>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} ><Buttonx className={classes.txtbutton} onClick={handleOpen}>NTB</Buttonx>
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={3}><Primary>CARS Rating: </Primary>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} ><Buttonx className={classes.txtbutton} onClick={handleOpen}>NORMAL</Buttonx>
                        </Grid>
                      </Grid>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Card>
                    <CardHeader color="gray">
                      <h6 className={classes.cardTitleBlack}>ACCOUNT INFORMATION:</h6>

                    </CardHeader>
                    <CardBody>

                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={3}><Primary>Product Type: </Primary>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7}><InputBase defaultValue="Regular Savings" className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={3}><Primary>RC Code: </Primary>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7}><InputBase id="" defaultValue="888" className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                        </Grid>
                      </Grid>
                    </CardBody> 
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <h4 className={classes.cardTitle}>Acceptance Criteria</h4>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: false
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Grid container direction="row"
                justify="center" spacing={2}
                alignItems="center" xs={12} sm={12} md={12} >
                <Button variant="contained" color="info" >
                  For Client's Confirmation
              </Button>
                <Button variant="contained" color="info" >
                  For Approval
              </Button>
                <Button variant="contained" color="danger" >
                  For Compliance
              </Button>
              </Grid>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <NacList />
        </div>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(NACQueue);
