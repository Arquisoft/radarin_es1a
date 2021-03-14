import { ProviderLogin } from '@inrupt/solid-react-components';
import { Link } from '@solid/react';
import {
  Container,
  Card,
  CssBaseline,
  makeStyles,
  CardContent
} from "@material-ui/core";
import Provider from './Provider';
import './login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    margin:'30% auto',
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
 
    <div >
      <Container component="main" maxWidth="sm">
        <Card
          className={classes.root}
          elevation={10}
          style={{
            display: 'grid'
          }}
        >
          <CssBaseline />
          <CardContent style={{ display: 'grid', margin: 'auto', textAlign: 'center' }}>
            <h1>Radarin</h1>
            <h2>Please login to continue</h2>
            <ProviderLogin
              className="solid-provider-login-component"
              callbackUri={`${window.location.origin}/`}
              selectPlaceHolder="Select your Provider"
              inputPlaceholder="Enter the url of your webId"
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
            <Link href="https://solidcommunity.net/register">Don't have a Solid Pod? Sign Up</Link>
          </CardContent>
        </Card>
      </Container>
    </div>
	
  );
}