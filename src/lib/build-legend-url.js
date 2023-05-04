import queryString from "query-string";

// GeoServer - GetLegendGraphic Docs
// https://docs.geoserver.org/stable/en/user/services/wms/get_legend_graphic/index.html
export default function ({ url, layer }) {
  const params = queryString.stringify({
    request: "GetLegendGraphic",
    service: "wms",
    version: "1.0.0",
    format: "image/png",
    width: "30",
    height: "30",
    layer: layer,
    legend_options:
      "fontAntiAliasing:true;fontColor:0x000000;fontSize:16;labelMargin:8;dpi:90;",
  });

  return `${url}/wms?${params}`;
}
