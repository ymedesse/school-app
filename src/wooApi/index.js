const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

export default (
  url = process.env.WOOCOMMERCE_URL,
  consumerKey = process.env.WOOCOMMERCE_KEY,
  consumerSecret = process.env.WOOCOMMERCE_SECRET
) =>
  new WooCommerceRestApi({
    url,
    consumerKey,
    consumerSecret,
    version: "wc/v3",
    queryStringAuth: true,
  });
