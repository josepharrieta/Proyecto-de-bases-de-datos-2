// Inicializar el config server como replica set
rs.initiate({
  _id: "rs-config",
  configsvr: true,
  members: [
    { _id: 0, host: "mongo-config:27019" }
  ]
});