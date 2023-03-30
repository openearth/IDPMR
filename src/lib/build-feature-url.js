import queryString from 'query-string'

// GeoServer - GetFeature Docs
// https://docs.geoserver.org/stable/en/user/services/wfs/reference.html#getfeature
export default function ({
  url,
  layer,
  propertyName = null,
  filter = null,
  maxFeatures = null,
}) {
  const params = {
    request: 'GetFeature',
    service: 'WFS',
    version: '1.1.0',
    outputFormat: 'json',
    typeName: layer,
    srsName: 'EPSG:4326',
  }

  if (filter) {
    params.CQL_FILTER = `${propertyName}='${filter}'`
  } else if (propertyName) {
    params.propertyName = propertyName
  }

  if (maxFeatures) {
    params.maxFeatures = maxFeatures
  }

  return `${url}?${queryString.stringify(params)}`
}
