import Vue from "vue";
import Vuex from "vuex";
import buildWmsLayer from "@/lib/build-wms-layer";
import { MANGROVE_LAYER_TYPE } from "@/lib/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mangroveLayers: [],
    administrativeBoundariesLayers: [],
    wmsMangroveLayers: [],
    wmsAdministrativeBoundariesLayers: [],
  },
  mutations: {
    SET_MANGROVE_LAYERS(state, { layers }) {
      state.mangroveLayers = layers;
    },
    SET_ADMINISTRATIVE_BOUNDARIES_LAYERS(state, { layers }) {
      state.administrativeBoundariesLayers = layers;
    },
    SET_WMS_MANGROVE_LAYERS(state, { wmsLayers }) {
      state.wmsMangroveLayers = wmsLayers;
    },
    SET_WMS_ADMINISTRATIVE_BOUNDARIES_LAYERS(state, { wmsLayers }) {
      state.wmsAdministrativeBoundariesLayers = wmsLayers;
    },
  },
  actions: {
    setLayers({ commit }, { layers, type = MANGROVE_LAYER_TYPE }) {
      commit(`SET_${type}_LAYERS`, { layers });
      const wmsLayers = layers.map((layer) => buildWmsLayer(layer));
      commit(`SET_WMS_${type}_LAYERS`, { wmsLayers });
    },
  },
});
