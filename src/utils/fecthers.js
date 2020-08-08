//import fetch from "isomorphic-unfetch";

export const fetcher = async (url) => {
  return fetch(url).then((res) => res.json());
};

export const fetcherWithToken = async (url, token) => {
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const fetcherWithBody = async (url, body) => {
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(body)
  }).then((res) => res.json());
};

export const fetcherWithTokenAnBody = async (url, token, body) => {
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const wooFetcher = async (breackpoint, params, body) => {
  const et = params ? "&" : "";
  const autho =
    "?oauth_consumer_key=ck_a9873bf33a745ae4fa5e6396517ee0040514126c&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1584903568&oauth_nonce=rRnEKEFOzrL&oauth_version=1.0&oauth_signature=xQkK9mb7eM2IEkCdYikjDiImQK4=";
  const url =
    "http://oph.f19.myftpupload.com/wp-json/wc/v3/" +
    breackpoint +
    "?" +
    params +
    et +
    autho;
  return fetch(url, {
    ethod: "GET",
    headers: new Headers(),
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
