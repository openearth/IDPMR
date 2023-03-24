import Vue from "vue";
import Vuex from "vuex";
import buildWmsLayer from "@/lib/build-wms-layer";
import router from "../router";

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
    mangroveLayersIds: (state) => state.mangroveLayers.map((layer) => layer.id),
    administrativeBoundariesLayerId: (state) =>
      state.administrativeBoundariesLayer?.id,
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

      const layerIds = layers.map((layer) => layer.id).join(",");
      router.replace({
        query: { layers: layerIds },
      });
    },
    setAdministrativeBoundariesLayer({ commit }, { layer }) {
      commit("SET_ADMINISTRATIVE_BOUNDARIES_LAYER", { layer });
      const wmsLayer = buildWmsLayer(layer);
      commit("SET_WMS_ADMINISTRATIVE_BOUNDARIES_LAYER", { wmsLayer });

      router.replace({
        query: { administrative_boundaries: layer.id },
      });
    },
    removeAdministrativeBoundariesLayer({ commit }) {
      commit("SET_ADMINISTRATIVE_BOUNDARIES_LAYER", { layer: null });
      commit("SET_WMS_ADMINISTRATIVE_BOUNDARIES_LAYER", { wmsLayer: null });

      router.replace({
        query: { administrative_boundaries: null },
      });
    },
    setSelectedFeature({ commit }, { selectedFeature }) {
      commit("SET_SELECTED_FEATURE", { selectedFeature });

      router.replace({
        query: {
          selected_feature:
            selectedFeature.properties.name_1 ||
            selectedFeature.properties.name_2,
        },
      });
    },
    removeSelectedFeature({ commit }) {
      commit("SET_SELECTED_FEATURE", { selectedFeature: null });

      router.replace({
        query: { selected_feature: null },
      });
    },
  },
});
