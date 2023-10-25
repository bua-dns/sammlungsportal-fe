// export stripUrl function which trips all but the domain name from a URL
export function stripUrl(url) {
  return url.replace(/(https:\/\/|http:\/\/|www[0-9]{0,1}\.|\/.*)/g, "");
}