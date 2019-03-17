<script>
import Vue from "vue";
import Toast from "vue-easy-toast";
Vue.use(Toast);

export default {
  info: function(message) {
    Vue.toast(message, {
      className: ["et-info"],
      horizontalPosition: "center",
      transition: "fade",
      duration: 3000
    });
  },

  success: function(message) {
    Vue.toast(message, {
      className: ["et-success"],
      horizontalPosition: "center",
      transition: "fade",
      duration: 3000
    });
  },

  warn: function(message) {
    Vue.toast(message, {
      className: ["et-warn"],
      horizontalPosition: "center",
      transition: "fade",
      duration: 3000
    });
  },

  error: function(message) {
    Vue.toast(message, {
      className: "et-alert",
      horizontalPosition: "center",
      duration: 3000
    });
  }
};
</script>
