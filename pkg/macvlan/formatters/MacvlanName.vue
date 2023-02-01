<script>
export default {
  props: {
    value: {
      type:    String,
      default: ''
    },
    row: {
      type:    Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {};
  },

  computed: {}
};
</script>

<template>
  <n-link
    to="/href"
  >
    {{ row.metadata.name }}
  </n-link>
</template>
