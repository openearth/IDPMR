import buildGeoserverUrl from "./build-geoserver-url";

export default ({ url, id, layer, version, style = "", paint = {} }) => {
  const tile = buildGeoserverUrl({
    url,
    service: "WMS",
    request: "GetMap",
    layers: layer,
    version,
    style,
    width: 256,
    height: 256,
    srs: "EPSG:3857",
    transparent: true,
    bbox: "{bbox-epsg-3857}",
    format: "image/png",
    encode: false,
  });

  return {
    id,
    layer,
    type: "raster",
    source: {
      type: "raster",
      tiles: [tile],
      tileSize: 256,
    },
    paint,
  };
};
