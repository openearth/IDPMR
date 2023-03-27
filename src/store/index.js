import Vue from "vue";
import Vuex from "vuex";
import buildWmsLayer from "@/lib/build-wms-layer";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mangroveLayers: [],
    wmsMangroveLayers: [],
    administrativeBoundariesLayer: null,
    wmsAdministrativeBoundariesLayer: null,
    selectedFeature: null,
  },
  getters: {
    isEmpty(state) {
      return (
        state.mangroveLayers.length === 0 &&
        !state.administrativeBoundariesLayer &&
        !state.selectedFeature
      );
    },
  },
  mutations: {
    SET_MANGROVE_LAYERS(state, { layers }) {
      state.mangroveLayers = layers;
    },
    SET_ADMINISTRATIVE_BOUNDARIES_LAYER(state, { layer }) {
      state.administrativeBoundariesLayer = layer;
    },
    SET_WMS_MANGROVE_LAYERS(state, { wmsLayers }) {
      state.wmsMangroveLayers = wmsLayers;
    },
    SET_WMS_ADMINISTRATIVE_BOUNDARIES_LAYER(state, { wmsLayer }) {
      state.wmsAdministrativeBoundariesLayer = wmsLayer;
    },
    SET_SELECTED_FEATURE(state, { selectedFeature }) {
      state.selectedFeature = selectedFeature;
    },
  },
  actions: {
    setMangroveLayers({ commit }, { layers }) {
      commit("SET_MANGROVE_LAYERS", { layers });
      const wmsLayers = layers.map((layer) => buildWmsLayer(layer));
      commit("SET_WMS_MANGROVE_LAYERS", { wmsLayers });
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
  },
});
