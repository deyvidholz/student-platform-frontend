import { DateTime } from "luxon";

export default {
  methods: {
    formatDate(utcDate, fallbackReturnValue = null) {
      utcDate = DateTime.fromISO(utcDate, { zone: "utc" });

      const brZonedDate = utcDate.setZone('America/Sao_Paulo');
      const formattedDate = brZonedDate.toFormat("dd/MM/yyyy 'às' HH:mm");

      return formattedDate === "Invalid DateTime"
        ? fallbackReturnValue
        : formattedDate;
    },
  },
};
