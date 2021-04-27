import React from "react";
import { Card, CardContent } from "@material-ui/core";
class Settings extends React.Component {

    constructor(props) {
        super(props);
        var radius = 5;
        radius.valueOf();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.radius = document.getElementById("radius").value;
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
                        <form className="form-horizontal" onSubmit={this.handleSubmit} >
                            <div>
                                <label>Radius in km around the user to load on the map (has to be between 1 and 100) :</label>
                                <input type="number" defaultValue={window.sessionStorage.getItem("radius")} placeholder="Default = 5" id="radius" name="radius" min="1" max="100" onChange={this.handleChange} />
                            </div>
                            <input href="/" type="submit" className="btn btn-primary" value="Apply" />
                        </form>
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
