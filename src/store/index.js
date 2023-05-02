import Vue from "vue";
import Vuex from "vuex";
import buildWmsLayer from "@/lib/build-wms-layer";
import allLayers from "@/data/mangrove-layers.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mangroveLayers: [],
    wmsMangroveLayers: [],
    administrativeBoundariesLayer: null,
    wmsAdministrativeBoundariesLayer: null,
    selectedLayer: null,
    selectedFeature: null,
    currentUser: null,
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
    SET_SELECTED_LAYER(state, { layer }) {
      state.selectedLayer = layer;
    },
    SET_CURRENT_USER(state, { currentUser }) {
      state.currentUser = currentUser;
    },
  },
  actions: {
    setMangroveLayers({ commit }, { layers }) {
      commit("SET_MANGROVE_LAYERS", { layers });
      const wmsLayers = layers.map((layer) => buildWmsLayer(layer));
      commit("SET_WMS_MANGROVE_LAYERS", { wmsLayers });
    },
    setMangroveLayersById({ commit }, { layerIds }) {
      const layers = allLayers.filter((layer) => layerIds.includes(layer.id));

      commit("SET_MANGROVE_LAYERS", { layers: layers });

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
    setSelectedLayer({ commit }, { layer }) {
      commit("SET_SELECTED_LAYER", { layer });
    },
    setCurrentUser({ commit }, { currentUser }) {
      commit("SET_CURRENT_USER", { currentUser });
    },
    removeCurrentUser({ commit }) {
      commit("SET_CURRENT_USER", { currentUser: null });
    },
  },
});
