import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Form, Field } from "react-final-form";
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";
import cookie from "cookie";

const SIGN_IN = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const WTextField = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TextField
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />
  );
};

WTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

function SignIn(props) {
  const { classes, client } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign in</Typography>
          <Mutation
            mutation={SIGN_IN}
            onCompleted={data => {
              // Store the token in cookie
              document.cookie = cookie.serialize(
                "token",
                data.signinUser.token,
                {
                  maxAge: 30 * 24 * 60 * 60 // 30 days
                }
              );
              // Force a reload of all the current queries now that the user is
              // logged in
              client.cache.reset().then(() => {
                // redirect({}, "/");
              });
            }}
            onError={error => {
              // If you want to send error to external service?
              console.log(error);
            }}
          >
            {(signinUser, { data, error }) => (
              <Form
                onSubmit={values => {
                  signinUser({
                    variables: {
                      email: values.email,
                      password: values.password
                    }
                  });
                }}
                validate={validate}
                initialValues={{
                  email: "mshameer@gmail.com",
                  password: "larry"
                }}
                render={({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <Field
                      name="email"
                      component={WTextField}
                      type="email"
                      label="Email Address"
                    />
                    <Field
                      name="password"
                      component={WTextField}
                      type="password"
                      label="Password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="raised"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign in
                    </Button>
                    {error && <p>No user found with that information.</p>}
                    <pre>Values {JSON.stringify(values, 0, 2)}</pre>
                    <pre>Data {JSON.stringify(data, 0, 2)}</pre>
                  </form>
                )}
              />
            )}
          </Mutation>
        </Paper>
      </main>
    </React.Fragment>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

export default withApollo(withStyles(styles)(SignIn));
