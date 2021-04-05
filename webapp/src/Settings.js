import React from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  grid-template-columns: repeat(1, 1fr);
  grid-template-columns: repear(2, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

class Settings extends React.Component {
   
    constructor(props) {
        super(props);
        var radius = 5;
        radius.valueOf();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
    }

    

    handleChange(event) {
         this.radius = document.getElementById('radius').value ;
    }

    handleSubmit(event) {
        event.preventDefault();
        window.sessionStorage.setItem("radius",this.radius);
        window.location.href = "/";
    }

    render() {
        return (
            <GridWrapper>
                <h2>Settings</h2>

                <form className="form-horizontal" onSubmit={this.handleSubmit} >

                    <div>
                        <label>Radius in km around the user to load on the map :</label>
                        <input type='number' defaultValue={window.sessionStorage.getItem("radius")} placeholder='default = 5' id='radius' name='radius' min='0' onChange={this.handleChange} />
                    </div>
                    <input href="/" type="submit" className="btn btn-primary" value="Apply"/>
                </form>
            </GridWrapper >
        );
    }

}

export default function SettingsForm() {

    return (
        <Settings></Settings>
    );

}
