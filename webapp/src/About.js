import React from "react";
import styled from "styled-components";
const Styles = styled.div`

html {
  box-sizing: border-box;
  backgroud-color: #474e5d;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 16px;
  
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
  
}

.row {
  padding-left: 2em
}
.about-page {
  padding-left: 4em
}

.title {
  color: grey;
}

a{
  color:#99DE9F;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: #99DE9F;
  background-color: #303030;
  text-align: center;
  cursor: pointer;
  width: 100%;
}
h2{
  text-align:center
}

img{
  min-width:0;
  width:100%;
  height:100%;
  flex-shrink: 0;
}

button:hover {
  background-color: #555;re distorted 
}

@media screen and (max-width: 800px) {
  .column {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
export const About = () => (
  <Styles>
  <div class= "about-page">

    <section class="about-section">
      <h2>About Radarin developers</h2>
      <p>We are a group of student of software arquitechture at the university of Oviedo</p>
      <p>We develped this prototype as an assingment to our course, further documentation can be found at:</p>
      <a href= "https://radarines1awebapp.herokuapp.com/docs"> Docs</a>
      <p>if you want to take a lot at our code, it's hosted on a gitHub repository in:</p>
      <a href= "https://github.com/Arquisoft/radarin_es1a"> Repository</a>
    </section>

    <h2 id="team_label">Our Team</h2>
    <div class = "row">

      <div class = "column">
        <div class="card">
          <img src="/img/devsFaces/usuario.png" alt="Ismael"></img>
          <div class = "container">
            <h2> Ismael Alba Areces</h2>
            <p> Front end </p>
            <p> nombre@correo.com </p>
            <p> 
              <a href="https://ismaelsolid.solidcommunity.net/profile/card#me">
                <button class="button">Solid Profile</button>
                </a>
            </p>
          </div>
        </div>
      </div>

      <div class = "column">
        <div class="card">
          
          <img src="/img/devsFaces/usuario.png" alt="nombre"></img>
          <div class = "container">
            <h3> Alba Aparicio Pérez</h3>
            <p> Front end </p>
            <p> nombre@correo.com </p>
            <p> 
              <a href="https://albaaparicio.solidcommunity.net/profile/card#me">
                <button class="button">Solid Profile</button>
                </a>
            </p>
          </div>
        </div>
      </div>

      <div class = "column">
        <div class="card">
          <img src="/img/devsFaces/usuario.png" alt="Kevin"></img>
          <div class = "container">
            <h2> Kevin Barbón Garcia</h2>
            <p> Front end </p>
            <p> nombre@correo.com </p>
            <p> 
              <a href="https://kevin1123699.solidcommunity.net/profile/card#me">
                <button class="button">Solid Profile</button>
                </a>
            </p>
          </div>
        </div>
      </div>

      <div class = "column">
        <div class="card">
          <img src="/img/devsFaces/usuario.png" alt="nombre"></img>
          <div class = "container">
            <h2> Taso Rodriguez Meana</h2>
            <p> Front end </p>
            <p> uo251434@uniovi.es </p>
            <p> 
              <a href="https://tasorodri.solidcommunity.net/profile/card#me">
                <button class="button">Solid Profile</button>
                </a>
            </p>
            

          </div>
        </div>
      </div>

      <div class = "column">
        <div class="card">
          <img src="/img/devsFaces/usuario.png" alt="Miguel"></img>
          <div class = "container">
            <h2> Migel Guimarey Lesmes</h2>
            <p> Front end </p>
            <p> nombre@correo.com </p>
            <p> 
              <a href="https://tasorodri.solidcommunity.net/profile/card#me">
                <button class="button">Solid Profile</button>
                </a>
            </p>
          </div>
        </div>
      </div>

      <div class = "column">
        <div class="card">
          <img src="/img/devsFaces/usuario.png" alt="nombre"></img>
          <div class = "container">
            <h2> Daniel Menéndez Ron</h2>
            <p> Front end </p>
            <p> nombre@correo.com </p>
            <p> 
              <a href="https://uo263745.solidcommunity.net/profile/card#me">
                <button class="button">Solid Profile</button>
                </a>
            </p>
          </div>
        </div>
      </div>

      <div class = "column">
        <div class="card">
          <img src="/img/devsFaces/usuario.png" alt="nombre"></img>
          <div class = "container">
            <h2> Victoria Álvarez Sordo</h2>
            <p> Front end </p>
            <p> nombre@correo.com </p>
            <p> 
              <a href="https://victoriaalvarez.solidcommunity.net/profile/card#me">
                <button class="button">Solid Profile</button>
                </a>
            </p>
          </div>
        </div>
      </div>
      

      

      


    </div>
    
  </div>

  </Styles>
  
);