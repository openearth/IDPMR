import buildWmsLayer from "@/lib/build-wms-layer";
import tabs from "@/data/tabs.json";

export default {
  namespaced: true,
  state: {
    dataLayers: [],
    wmsDataLayers: [],
    administrativeBoundariesLayer: null,
    wmsAdministrativeBoundariesLayer: null,
    selectedLayer: null,
    selectedFeature: null,
  },
  mutations: {
    SET_DATA_LAYERS(state, { layers }) {
      state.dataLayers = layers;
    },
    SET_ADMINISTRATIVE_BOUNDARIES_LAYER(state, { layer }) {
      state.administrativeBoundariesLayer = layer;
    },
    SET_WMS_DATA_LAYERS(state, { wmsLayers }) {
      state.wmsDataLayers = wmsLayers;
    },
    SET_WMS_ADMINISTRATIVE_BOUNDARIES_LAYER(state, { wmsLayer }) {
      state.wmsAdministrativeBoundariesLayer = wmsLayer;
    },
    SET_SELECTED_FEATURE(state, { selectedFeature }) {
      state.selectedFeature = selectedFeature;
    },
    SET_SELECTED_LAYER(state, { layer }) {
      state.selectedLayer = layer;
    },
  },
  actions: {
    setDataLayers({ commit }, { layers }) {
      commit("SET_DATA_LAYERS", { layers });
      const wmsLayers = layers.map((layer) => buildWmsLayer(layer));
      commit("SET_WMS_DATA_LAYERS", { wmsLayers });
    },
    setDataLayersById({ commit }, { layerIds }) {
      const allLayers = tabs.map((tab) => tab.layers).flat();
      const layers = allLayers.filter((layer) => layerIds.includes(layer.id));

      commit("SET_DATA_LAYERS", { layers: layers });

      const wmsLayers = layers.map((layer) => buildWmsLayer(layer));

      commit("SET_WMS_DATA_LAYERS", { wmsLayers });
    },
    setAdministrativeBoundariesLayer({ commit }, { layer }) {
      commit("SET_ADMINISTRATIVE_BOUNDARIES_LAYER", { layer });
      const wmsLayer = buildWmsLayer(layer);
      commit("SET_WMS_ADMINISTRATIVE_BOUNDARIES_LAYER", { wmsLayer });
    },
    removeAdministrativeBoundariesLayer({ commit }) {
      commit("SET_ADMINISTRATIVE_BOUNDARIES_LAYER", { layer: null });
      commit("SET_WMS_ADMINISTRATIVE_BOUNDARIES_LAYER", { wmsLayer: null });
    },
    setSelectedFeature({ commit }, { selectedFeature }) {
      commit("SET_SELECTED_FEATURE", { selectedFeature });
    },
    removeSelectedFeature({ commit }) {
      commit("SET_SELECTED_FEATURE", { selectedFeature: null });
    },
    setSelectedLayer({ commit }, { layer }) {
      commit("SET_SELECTED_LAYER", { layer });
    },
  },
};
