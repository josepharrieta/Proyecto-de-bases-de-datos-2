FROM mongo:5.0.31

# Copiar keyfile
COPY ./docker/mongoDB/replica-set/mongo-keyfile /etc/mongo-keyfile
RUN chmod 400 /etc/mongo-keyfile

# Copiar script de inicialización
COPY ./docker/mongoDB/replica-set/primary/init.js /docker-entrypoint-initdb.d/

# Comando de inicio con --replSet
CMD ["mongod", "--shardsvr", "--replSet", "rs-shard-1", "--bind_ip_all", "--keyFile", "/etc/mongo-keyfile"]