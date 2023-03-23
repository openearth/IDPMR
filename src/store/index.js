import Vue from "vue";
import Vuex from "vuex";
import buildWmsLayer from "@/lib/build-wms-layer";
import { MANGROVE_LAYER_TYPE } from "@/lib/constants";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mangroveLayers: [],
    administrativeBoundariesLayers: [],
    wmsMangroveLayers: [],
    wmsAdministrativeBoundariesLayers: [],
  },
  getters: {
    mangroveLayersIds: (state) => state.mangroveLayers.map((layer) => layer.id),
    administrativeBoundariesLayersIds: (state) =>
      state.administrativeBoundariesLayers.map((layer) => layer.id),
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

      if (type === MANGROVE_LAYER_TYPE) {
        const layerIds = layers.map((layer) => layer.id).join(",");
        router.replace({
          query: { layers: layerIds },
        });
      }
    },
  },
});
