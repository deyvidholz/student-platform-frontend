<template>
  <div>
    <v-tooltip
      :bottom="position === 'bottom'"
      :top="position === 'top'"
      :left="position === 'left'"
      :right="position === 'right'"
      v-if="condition"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on" :class="{ 'no-select': !selectable }">
          <slot />
        </span>
      </template>
      <span class="font-not-default">{{ text }}</span>
    </v-tooltip>

    <slot v-else />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number],
      required: true,
    },
    position: {
      type: String,
      default: 'top',
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({}),
};
</script>
