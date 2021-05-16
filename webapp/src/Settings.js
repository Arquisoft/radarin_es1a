import React from "react";

import { Card, CardContent, Button, Input, InputLabel } from "@material-ui/core";



class Settings extends React.Component {

    constructor(props) {
        super(props);
        var radius = 5;
        radius.valueOf();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

 

    handleChange(event) {

        if (document.getElementById("radius").value > 0 && document.getElementById("radius").value <= 100) {
            this.radius = document.getElementById("radius").value;
            document.getElementById("button").disabled = false;
        }  else {
            document.getElementById("button").disabled = true;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        window.sessionStorage.setItem("radius", this.radius);
        window.location.href = "/";
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <div className="settings">
                        <h2>Settings</h2>
                        <Card>
                            <form className="form-horizontal" onSubmit={this.handleSubmit} >
                                <CardContent>
                                    <div>
                                        <InputLabel>
                                            <label>Radius in km around the user to load on the map (has to be between 1 and 100) :</label>
                                        </InputLabel>
                                        <Input type="number" placeholder={"Current = " + window.sessionStorage.getItem("radius")} id="radius" name="radius" min="1" max="100"  onChange={this.handleChange}>
                                        </Input>
                                    </div>
                                </CardContent>
                                <Button>
                                    <input href="/" id="button" type="submit" className="btn btn-primary" disabled={true} value="Apply" />
                                </Button>
                            </form>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default function SettingsForm() {
    return (
        <Settings></Settings>
    );
}
