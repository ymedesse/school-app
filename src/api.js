import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "http://oph.f19.myftpupload.com/",
  consumerKey: "ck_a9873bf33a745ae4fa5e6396517ee0040514126c",
  consumerSecret: "cs_8d5e62e6786c312c3f1cfb1366cc38bb02e6181f",
  version: "wc/v3"
});


export default api;
