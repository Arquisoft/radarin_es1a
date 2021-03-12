import { ProviderLogin } from '@inrupt/solid-react-components';
import { LogoutButton, LoggedIn, LoggedOut } from '@solid/react';
import {
    Container,
    Card,
    CssBaseline,
    makeStyles,
    CardContent
  } from "@material-ui/core";
import Provider from './Provider';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(20),
    },
  }));
  
  export default function Login() {
    const classes = useStyles();
  
    return (
      <div>
        <Container component="main" maxWidth="sm">
          <Card
            className={classes.root}
            elevation={4}
            style={{ minHeight: "15rem" }}
          >
            <CssBaseline />
            <CardContent>
              <ProviderLogin
                className="solid-provider-login-component"
                callbackUri={`${window.location.origin}/`}
                selectPlaceHolder="Select your Provider"
                inputPlaceholder="Introduza la url de su webId"
                formButtonText="Login"
                btnTxtWebId="Log In with WebId"
                btnTxtProvider="Log In with Provider"
                errorsText={{
                  unknown: "Something is wrong, please try again...",
                  webIdNotValid: "WebID is not valid",
                  emptyProvider: "Solid Provider is required",
                  emptyWebId: "Valid WebID is required",
                }}
                providers={Provider.getIdentityProviders()}
              />
              <LoggedIn>
                <LogoutButton />
              </LoggedIn>
              <LoggedOut>
                console.log("No estas logueado");
              </LoggedOut>

            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }