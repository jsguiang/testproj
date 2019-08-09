import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'components/Modal/modal.css';
import Draggable, { DraggableCore } from 'react-draggable';
import Button from "components/CustomButtons/Button.jsx";


import Camera, { FACING_MODES, IMAGE_TYPES } from 'components/Camera';
import 'components/Camera/reset.css';
import 'react-html5-camera-photo/build/css/index.css';

import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import SaveIcon from '@material-ui/icons/Save';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardMedia from '@material-ui/core/CardMedia';


class CameraModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgFile: '',
      isOpen: false,
      idealFacingMode: FACING_MODES.ENVIRONMENT,
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: -400, y: 200
      }
    };
    this.renderButtons = this.renderButtons.bind(this);
  };


  dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  padWithZeroNumber(number, width) {
    number = number + '';
    return number.length >= width
      ? number
      : new Array(width - number.length + 1).join('0') + number;
  }

  getFileExtention(blobType) {
    // by default the extention is .png
    let extention = IMAGE_TYPES.PNG;

    if (blobType === 'image/jpeg') {
      extention = IMAGE_TYPES.JPG;
    }
    return extention;
  }

  getFileName(imageNumber, blobType) {
    const prefix = 'photo';
    const photoNumber = this.padWithZeroNumber(imageNumber, 4);
    const extention = this.getFileExtention(blobType);

    return `${prefix}-${photoNumber}.${extention}`;
  }


  downloadImageFileFomBlob(blob, imageNumber) {
    window.URL = window.webkitURL || window.URL;

    let anchor = document.createElement('a');
    anchor.download = this.getFileName(imageNumber, blob.type);
    anchor.href = window.URL.createObjectURL(blob);
    let mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    anchor.dispatchEvent(mouseEvent);
  }

  downloadImageFile(dataUri, imageNumber) {
    let blob = this.dataURItoBlob(dataUri);
    //downloadImageFileFomBlob(blob, imageNumber);
    this.setState({ imgFile: window.URL.createObjectURL(blob) })
  }


  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  onTakePhoto(dataUri) {
    this.downloadImageFile(dataUri, this.imageNumber);
    this.imageNumber += 1;
  }

  onCameraError(error) {
    console.error('onCameraError', error);
  }

  onCameraStart(stream) {
    console.log('onCameraStart');
  }

  onCameraStop() {
    console.log('onCameraStop');
  }


  renderButtons() {
    const { classes } = this.props;

    return (
      <div>

        <Button variant="contained" size="small" color="info" onClick={(e) => {
          if (this.state.idealFacingMode === FACING_MODES.USER) {
            this.setState({ idealFacingMode: FACING_MODES.ENVIRONMENT });
          } else {
            this.setState({ idealFacingMode: FACING_MODES.USER });
          }
        }} >
          <ThreeSixtyIcon />
          Switch
      </Button>
      <Button variant="contained" color="info" onClick={this.close} >Close</Button>
      </div>
    );
  }

  renderImg() {

    if (this.state.imgFile)
    console.log(this.state.imgFile)
    sessionStorage.setItem(this.props.docType, this.state.imgFile)
    console.log(sessionStorage.getItem(this.props.docType));
      return (
        <div>
          <CardMedia
            component="img"
            image={this.state.imgFile }
          />
        </div>
      );
  }

  render() {

    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

    if (this.state.isOpen) {
      return (
        <div className="camera-modal" >
          <Draggable positionOffset={{ x: '-40%', y: 0 }} {...dragHandlers}>
            <div onClick={e => e.stopPropagation()} className="basic-modal-content2">

              <GridContainer alignItems="center" >

                <GridItem xs={12} sm={12} md={12}>
                  <Card profile>
                    <CardBody profile>

                      <Camera
                        onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
                        onCameraError={(error) => { this.onCameraError(error); }}
                        idealFacingMode={this.state.idealFacingMode}
                        idealResolution={{ width: '30%', height: '30%' }}
                        imageType={IMAGE_TYPES.JPG}
                        imageCompression={0.97}
                        isMaxResolution={false}
                        isImageMirror={false}
                        isSilentMode={false}
                        isDisplayStartCameraError={true}
                        sizeFactor={1}
                        onCameraStart={(stream) => { this.onCameraStart(stream); }}
                        onCameraStop={() => { this.onCameraStop(); }}
                        ref={(cam) => {
                          this.camera = cam;
                        }}
                      />

                      <Grid container alignItems="center">
                        <Grid item xs={12} sm={12} md={4}>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          {this.renderButtons()}
                          {this.renderImg()}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
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

      <Button variant="contained" color="info" onClick={this.open} >Capture</Button>
    );
  }
}

CameraModal.propTypes = {
  docType: PropTypes.string};


export default CameraModal;
