# Para secondary1 y secondary2 (ambos deben ser idénticos)
FROM mongo:6.0

# Copy initialization script
COPY init.js /docker-entrypoint-initdb.d/

# Create keyfile directory
RUN mkdir -p /opt/keyfile

# Set permissions for keyfile
RUN chmod 600 /opt/keyfile

EXPOSE 27018

CMD ["mongod", "--shardsvr", "--replSet", "shard1ReplSet", "--port", "27018", "--dbpath", "/data/db"]