sleep(1500); // Espera inicial

// Espera hasta que todos los nodos respondan
function waitForAllHosts(hosts) {
  var retries = 30;
  while (retries-- > 0) {
    try {
      let success = true;
      hosts.forEach(function (h) {
        try {
          const conn = new Mongo(h);
          conn.getDB("admin").runCommand({ ping: 1 });
        } catch (e) {
          print("No se pudo conectar con " + h);
          success = false;
        }
      });
      if (success) return true;
    } catch (e) {
      print("Esperando nodos...");
    }
    sleep(5000);
  }
  return false;
}

if (!waitForAllHosts(["mongo-primary:27018", "mongo-secondary1:27018", "mongo-secondary2:27018"])) {
  print("Error: No se pudo conectar con todos los nodos del replicaset");
  quit(1);
}

// Inicializar el replicaset
rs.initiate({
  _id: "rs-shard-1",
  members: [
    { _id: 0, host: "mongo-primary:27018" },
    { _id: 1, host: "mongo-secondary1:27018" },
    { _id: 2, host: "mongo-secondary2:27018" }
  ]
});

// Crear usuario admin
db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [
    { role: "root", db: "admin" },
    { role: "clusterAdmin", db: "admin" }
  ]
});


// Esperar a que el replicaset esté activo
function waitForPrimary() {
  var retries = 20;
  while (retries-- > 0) {
    try {
      const status = rs.status();
      if (status.ok && status.members.some(m => m.state === 1)) {
        print("ReplicaSet listo.");
        return true;
      }
    } catch (e) {
      print("Esperando a que el ReplicaSet esté listo...");
    }
    sleep(5000);
  }
  return false;
}

if (!waitForPrimary()) {
  print("Error: ReplicaSet no alcanzó estado primario");
  quit(1);
}
