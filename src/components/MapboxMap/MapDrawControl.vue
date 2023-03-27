<script>
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";
import { bbox } from "@turf/turf";
import mapConfig from "@/lib/map-config";

export default {
  inject: ["getMap"],

  props: {
    drawnFeature: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    drawnFeature(feature) {
      if (this.mbDraw) {
        this.mbDraw.deleteAll();

        if (feature) {
          this.mbDraw.add(feature);
          this.zoomToFeature(feature);
        } else {
          this.resetZoom();
        }
      }
    },
  },

  methods: {
    deferredMountedTo(map) {
      window.map = map;
      const modes = MapboxDraw.modes;
      modes.draw_static = StaticMode;

      const mbDraw = new MapboxDraw({
        displayControlsDefault: false,
        // We add the delete control and then hide it visually
        // so the user can delete with keyboard commands
        controls: {
          trash: true,
        },
        modes,
      });

      this.mbDraw = mbDraw;

      map.addControl(mbDraw);

      const onChangeFn = () => {
        const { features } = this.mbDraw.getAll();
        const feature = features[0];
        this.$emit("change", feature);
      };

      map
        .on("draw.create", onChangeFn)
        .on("draw.delete", onChangeFn)
        .on("draw.update", onChangeFn);
    },

    zoomToFeature(feature) {
      const map = this.getMap();
      const boundingBox = bbox(feature);
      map.fitBounds(boundingBox, { padding: 80 });
    },

    resetZoom() {
      const map = this.getMap();
      const { center, zoom } = mapConfig;
      map.flyTo({ center, zoom });
    },
  },

  render: () => null,
};
</script>

<style>
.mapbox-gl-draw_ctrl-draw-btn {
  display: none !important;
}
</style>
