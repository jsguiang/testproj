import React, { Component } from 'react';
import 'components/Modal/modal.css';
import PropTypes from 'prop-types';
import Draggable, { DraggableCore } from 'react-draggable';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";

import CardMedia from '@material-ui/core/CardMedia';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import "assets/css/modal.css";

import Buttonx from '@material-ui/core/Button';
import nacStyle from "assets/jss/material-dashboard-react/views/nacStyle.jsx";
import Primary from "components/Typography/Primary.jsx";
import InputBase from '@material-ui/core/InputBase';

class NACModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            activeDrags: 0,
            idealFacingMode: 'ENVIRONMENT',
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        };
    };


    open = () => this.setState({ isOpen: true });

    close = () => this.setState({ isOpen: false });


    render() {

        const { btnCap,  classes, item } = this.props;
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        if (this.state.isOpen) {
            return (
                <div className="basic-modal" >
          <Draggable positionOffset={{ x: '-40%', y: 0 }} {...dragHandlers}>
                        <div onClick={e => e.stopPropagation()} className="basic-modal-content2">
                            <GridContainer alignItems="center" >

                                <GridItem xs={12} sm={12} md={12 }>
                                    <Card profile>
                                        <CardHeader>
                                                <h6 className={classes.cardTitleBlack}>Details:</h6></CardHeader>
                                        <CardBody >
                                        <Grid container alignItems="center">
                                                    <Grid item xs={12} sm={12} md={2}><Primary>Description: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={8}>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={2}><Primary>Points: </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={2}><Primary>1.0 </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={8}><InputBase name="modalItem" value={item[0].desc} className={classes.input} inputProps={{ 'aria-label': 'naked' }} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={2}><Primary>30 </Primary>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={2}>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={8}>
                                                 <Button variant="contained" color="info" onClick={this.close} >Close</Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={2}>
                                                    </Grid>
                                                </Grid>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </Draggable>
                </div>
            )
        }

        return (
            <Buttonx className={classes.txtbutton}  onClick={this.open} >{btnCap}</Buttonx>
        );
    }
}

NACModal.propTypes = {
    btnCap: PropTypes.string,
    classes: PropTypes.object.isRequired,
    item: PropTypes.object,
    category: PropTypes.string,
    details: PropTypes.array
  };

export default withStyles(nacStyle)(NACModal);
