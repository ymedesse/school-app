import React from "react";
import ReactDOM from "react-dom";
import { Form } from "react-final-form";
import {
  TextField,
  Checkboxes,
  Radios,
  Select,
  DatePicker,
  TimePicker
} from "mui-rff";
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  MenuItem
} from "@material-ui/core";

// Picker
// import DateFnsUtils from "@date-io/date-fns";

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

function App() {
  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        initialValues={{
          employed: true,
          stooge: "larry",
          m: { para: "66565" }
        }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  margin="none"
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  margin="none"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  margin="none"
                  required={true}
                />
              </Grid>
              <Grid item xs={12}>
                <Checkboxes
                  name="employed"
                  formControlProps={{ margin: "none" }}
                  data={{ label: "Employed", value: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Radios
                  label="Best Stooge"
                  name="stooge"
                  formControlProps={{ margin: "none" }}
                  radioGroupProps={{ row: true }}
                  data={[
                    { label: "Larry", value: "larry" },
                    { label: "Moe", value: "moe" },
                    { label: "Curly", value: "curly" }
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <Checkboxes
                  label="Sauces"
                  name="sauces"
                  formControlProps={{ margin: "none" }}
                  formGroupProps={{ row: true }}
                  data={[
                    { label: "Ketchup", value: "ketchup" },
                    { label: "Mustard", value: "mustard" },
                    { label: "Salsa", value: "salsa" },
                    { label: "Guacamole 🥑", value: "guacamole" }
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  multiline
                  label="Notes"
                  margin="none"
                  variant="outlined"
                />
              </Grid>{" "}
              <Grid item xs={12}>
                <TextField
                  name="m.para"
                  multiline
                  label="para"
                  margin="none"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  name="city"
                  label="Select a City"
                  formControlProps={{ margin: "none" }}
                >
                  <MenuItem value="London">London</MenuItem>
                  <MenuItem value="Paris">Paris</MenuItem>
                  <MenuItem value="Budapest">
                    A city with a very long Name
                  </MenuItem>
                </Select>
              </Grid>
              {/* <Grid item xs={6}>
                <DatePicker
                  name="rendez-vous"
                  margin="normal"
                  label="Rendez-vous"
                  dateFunsUtils={DateFnsUtils}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  name="alarm"
                  margin="normal"
                  label="Alarm"
                  dateFunsUtils={DateFnsUtils}
                />
              </Grid> */}
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={reset}
                  disabled={submitting || pristine}
                >
                  Initialise
                </Button>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>

            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  );
}
export default App;
