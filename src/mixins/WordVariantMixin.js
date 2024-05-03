export default {
  methods: {
    getWordVariant(text, qty, singular, plural) {
      return qty === 1
        ? text.replace(/\{variant\}/g, singular)
        : text.replace(/\{variant\}/g, plural);
    },
  },
};
