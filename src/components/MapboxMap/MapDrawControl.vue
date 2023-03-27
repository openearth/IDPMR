<script>
import MapboxDraw from "@mapbox/mapbox-gl-draw";

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
        }
      }
    },
  },

  methods: {
    deferredMountedTo(map) {
      const mbDraw = new MapboxDraw({
        displayControlsDefault: false,
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
  },

  render: () => null,
};
</script>

<style>
.mapbox-gl-draw_ctrl-draw-btn {
  display: none !important;
}
</style>
