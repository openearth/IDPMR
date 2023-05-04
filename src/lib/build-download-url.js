import queryString from "query-string";

export default function ({ url, layer }) {
  const params = {
    request: "GetFeature",
    service: "WFS",
    version: "1.0.0",
    outputFormat: "shape-zip",
    typeName: layer,
  };

  return `${url}/ows?${queryString.stringify(params)}`;
}
