# Para secondary1 y secondary2 (ambos deben ser idénticos)
FROM mongo:5.0.31

COPY ./docker/mongoDB/replica-set/mongo-keyfile /etc/mongo-keyfile
RUN chmod 400 /etc/mongo-keyfile

CMD ["mongod", "--shardsvr", "--replSet", "rs-shard-1", "--bind_ip_all", "--port", "27018", "--keyFile", "/etc/mongo-keyfile"]
