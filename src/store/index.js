import Vue from "vue";
import Vuex from "vuex";
import buildWmsLayer from "@/lib/build-wms-layer";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layers: [],
    wmsLayers: [],
  },
  mutations: {
    SET_LAYERS(state, { layers }) {
      state.layers = layers;
    },
    SET_WMS_LAYERS(state, { wmsLayers }) {
      state.wmsLayers = wmsLayers;
    },
  },
  actions: {
    setLayers({ commit }, { layers }) {
      commit("SET_LAYERS", { layers });
      const wmsLayers = layers.map((layer) => buildWmsLayer(layer));
      commit("SET_WMS_LAYERS", { wmsLayers });
    },
  },
});
