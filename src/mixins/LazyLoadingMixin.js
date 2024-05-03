export default {
  data: () => ({
    lazyLoadingTimeout: null,
  }),

  methods: {
    lazyLoading(params) {
      const defaultParams = {
        fn: () => null,
        time: 400,
        args: [],
      };

      const { fn, time, args } = {
        ...defaultParams,
        ...params,
      };

      if (!fn || !time) {
        return;
      }

      let parsedArgs =
        args && Array.isArray(args) ? [...args] : defaultParams.args;

      if (!Array.isArray(args) && args) {
        parsedArgs = [args];
      }

      clearTimeout(this.lazyLoadingTimeout);

      this.lazyLoadingTimeout = setTimeout(async () => {
        await fn(...parsedArgs);
      }, time);
    },
  },
};
