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

export const Settings = () => (

    <GridWrapper>
        <h2>Settings</h2>

        <form class="form-horizontal" >
           
            <div>
                <label>Number of nearby users that will be shown on the map :</label>
                <input type='number' placeholder='default = 100' min='0' />
            </div>

            <div>
                <label>Radius in km around the user to load on the map :</label>
                <input type='number' placeholder='default = 5' min='0' />
            </div>

            <div>
                <a href="/" type="submit" class="btn btn-primary">Apply</a>
            </div>
            
        </form>
    </GridWrapper >
);