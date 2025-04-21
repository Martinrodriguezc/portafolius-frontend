import log from "loglevel";

const isProd = import.meta.env.VITE_NODE_ENV === "production";
log.setLevel(isProd ? "warn" : "debug");

export default log;
