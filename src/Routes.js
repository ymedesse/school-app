import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { StateInspector } from "reinspect";
import NotFound from "./core/NotFound";
import NotAuthorization from "./admin/core/NotAuthorization";
import { SWRConfig } from "swr";
import NavBar from "./layout/NavBar";
import AdminDashboard from "./admin/core/AdminDashboard";
import Home from "./home/Home";
import * as adminRouteLink from "./routerLinks";
import AdminProvider from "./admin/context/AdminProvider";
import RootProvider from "./rootContext/Provider";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import AdminRoute from "./auth/utils/AdminRoute";
import School from "./fourniture/school";
import Classe from "./fourniture/classe";
import Fourniture from "./fourniture/liste";
import Payment from "./Paiement/Billing";
import NewOrder from "./order/NewOrder";
import Shipping from "./Paiement/Shipping";
import InstallmentsPayment from "./order/InstallmentsPayment/billing";
import Cart from "./cart";
import Dashboard from "./DashBoard";
import FournitureWished from "./fournitureWished";

import AuthRoute from "./auth/utils/AuthRoute";

import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import { fetcherWithBody as fetcher } from "./utils/fecthers";

import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const Routes = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <StateInspector name="App">
        <SWRConfig
          value={{
            dedupingInterval: 4000,
            loadingTimeout: 5000,
            refreshWhenHidden: false,
            suspense: true,
            // refreshWhenOffline: true,
            refreshInterval: 0,
            fetcher,
          }}
        >
          <RootProvider>
            <AdminProvider>
              <div className={classes.root}>
                {/* <UserInfoListne /> */}
                <CssBaseline />

                <NavBar />

                <Container maxWidth="lg">
                  <ThemeProvider theme={theme}>
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Switch>
                        {/* <Route {...rest} render={props => <Component {...props} />} />; */}

                        <Route path="/" exact component={Home} />

                        {/* <AdminRoute path={adminRouteLink.ADMIN_LINK} exact component={AdminDashboard} /> */}

                        <Route
                          path={adminRouteLink.NOT_FOUND_LINK}
                          exactnpm
                          component={NotFound}
                        />

                        <Route
                          path={adminRouteLink.NOT_AUTHORIZATION_LINK}
                          exact
                          component={NotAuthorization}
                        />

                        <AuthRoute
                          path={adminRouteLink.LIST_FOURNITURE_PRODUCT_LINK}
                          exact
                          component={Fourniture}
                        />

                        <Route
                          path={adminRouteLink.SIGNIN_LINK}
                          exact
                          component={Signin}
                        />

                        <Route
                          path={adminRouteLink.SCHOOL_LIST_LINK}
                          exact
                          component={School}
                        />

                        <Route
                          path={adminRouteLink.CLASSES_FROM_SCHOOL_LINK}
                          exact
                          component={Classe}
                        />
                        <AuthRoute
                          path={adminRouteLink.DASHBOARD_WITH_PARAM_LINK}
                          exact
                          component={Dashboard}
                        />
                        <AuthRoute
                          path={adminRouteLink.DASHBOARD_LINK}
                          exact
                          component={Dashboard}
                        />

                        <AuthRoute
                          path={adminRouteLink.CART_LINK}
                          exact
                          component={Cart}
                        />
                        <AuthRoute
                          path={adminRouteLink.COMMANDE_LINK}
                          exact
                          component={Cart}
                        />

                        <AuthRoute
                          path={adminRouteLink.SHIPPING_LINK}
                          exact
                          component={Shipping}
                        />
                        <AuthRoute
                          path={adminRouteLink.COMMANDE_SHIPPING_LINK}
                          exact
                          component={Shipping}
                        />

                        <AuthRoute
                          path={adminRouteLink.PAYMENT_LINK}
                          exact
                          component={Payment}
                        />

                        <AuthRoute
                          path={adminRouteLink.LIST_FOURNITURE_WISH_LINK}
                          exact
                          component={FournitureWished}
                        />

                        <AuthRoute
                          path={
                            adminRouteLink.INSTALLMENT_PAYMENT_WITH_PARAMS_LINK
                          }
                          exact
                          component={InstallmentsPayment}
                        />
                        <AuthRoute
                          path={
                            adminRouteLink.INSTALLMENT_HISTORY_WITH_PARAM_LINK
                          }
                          component={Dashboard}
                        />

                        <AuthRoute
                          path={adminRouteLink.COMMANDE_PAYMENT_LINK}
                          exact
                          component={Payment}
                        />
                        <AuthRoute
                          path={adminRouteLink.NEW_ORDER_WITH_PARAMSLINK}
                          exact
                          component={NewOrder}
                        />
                        <Route
                          path={adminRouteLink.SIGNUP_LINK}
                          exact
                          component={Signup}
                        />

                        <AdminRoute
                          path={adminRouteLink.ADMIN_DASHBOARD_LINK}
                          exact
                          component={AdminDashboard}
                        />

                        <AdminRoute
                          path={adminRouteLink.ADMIN_ORDER_LINK}
                          exact
                          component={AdminDashboard}
                        />

                        <Route
                          path={adminRouteLink.ADMIN_ORDER_WISH_LINK}
                          exact
                          component={AdminDashboard}
                        />

                        <AdminRoute
                          path={adminRouteLink.ADMIN_ORDER_PAYMENT_QRCODE_LINK}
                          exact
                          component={AdminDashboard}
                        />

                        <AdminRoute
                          path={adminRouteLink.ADMIN_MANAGE_USER_LINK}
                          exact
                          component={AdminDashboard}
                        />

                        <AdminRoute
                          path={adminRouteLink.ADMIN_MANAGE_ACTION_LINK}
                          exact
                          component={AdminDashboard}
                        />
                        <AdminRoute
                          path={adminRouteLink.ADMIN_COMPTE_LINK}
                          exact
                          component={AdminDashboard}
                        />
                        <AdminRoute
                          path={adminRouteLink.ADMIN_SCHOOL_LIST_LINK}
                          exact
                          component={AdminDashboard}
                        />
                        <AdminRoute
                          path={adminRouteLink.ADMIN_CLASSE_LIST_LINK}
                          exact
                          component={AdminDashboard}
                        />
                        <AdminRoute
                          path={adminRouteLink.ADMIN_CITIES_LIST_LINK}
                          exact
                          component={AdminDashboard}
                        />

                        <AdminRoute
                          path={adminRouteLink.ADMIN_MANAGE_PRIVILEGE_LINK}
                          exact
                          component={AdminDashboard}
                        />
                        <AdminRoute
                          path={adminRouteLink.ADMIN_PRODUCTS_LINK}
                          exact
                          component={AdminDashboard}
                        />
                      </Switch>
                      <Alert />
                    </main>
                  </ThemeProvider>
                </Container>
              </div>
            </AdminProvider>
          </RootProvider>
        </SWRConfig>
      </StateInspector>
    </BrowserRouter>
  );
};

export default Routes;
