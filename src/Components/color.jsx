import React, { Component } from 'react';
import ColorIcon from '@material-ui/icons/ColorLensOutlined';
import { Tooltip, IconButton, MenuItem, Menu, Grid, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { height } from '@material-ui/system';
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import Notestitle from "./notesTitle";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NotesService from "../Services/notesServices";
let services = new NotesService();

    const theme = createMuiTheme({
        overrides: {
            MuiMenu: {
                paper: {
                    "height": "auto",
                    "width": "139px",
                    "borderRadius":"24px"
                }
            }
        }
    })
    
class ColorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            colorArray: [
                '#F8F4F4',
                '#F38A8A',
                '#F3B28A',
                '#F3EB8A',
                '#BAF38A',
                '#8AF3E1',
                '#8AAAF3',
                '#F4C3F8',
                '#900C3F',
                '#AB959E',
                '#C3D5F8',
                '#D6F8BD',
            ],
            selected: '',
            isHover: false
        }
    }

    handleColor = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    }

    changeColor = (color) => {
        this.setState({ selected: color })
        this.props.selectColor(color)
        console.log('color in color comp', this.state.selected);

    }

    updateColor = () => {
        this.setState({ anchorEl: null });
            let colorData = {
                noteId: this.props.noteId.id,
                notecolor: this.state.selected
            }
            services.updateColor(colorData)
                .then((json) => {
                    console.log('color response', json);
                })
                .catch((error) => {
                    console.log('color error', error);
                })
    };

    render() {
        const color = this.state.colorArray.map((key, index) => {
            return (
                <div className="color"style={{
                    margin: "1px",
                    backgroundColor: key,
                    borderStyle: "solid",
                    borderColor: "#BFBFBF",
                    borderWidth: "1px",
                    height: "28px",
                    width: "28px"
                }}
                    key={index}
                    onClick={() => this.updateColor(key)}
                ></div>
            )
        })
        return (
            <div>
                <Tooltip title="Change color">
                    <IconButton
                        aria-owns={this.state.anchorEl ? 'color-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleColor}
                    >
                        <ColorLensOutlinedIcon style={{  height: "25px",width:" 20px"}} />
                    </IconButton>
                </Tooltip>
                <MuiThemeProvider theme={theme}>
                <Menu
                    id="color-menu"
                    anchorEl={this.state.anchorEl}
                    placement={'top'}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    style={{ width: "100%" }}
                >
                    <Grid style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start",padding:"5px" }}>
                        {color}
                    </Grid>
                </Menu>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default ColorComponent;