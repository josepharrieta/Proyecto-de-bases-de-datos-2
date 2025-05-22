// MongoDB Config Server Initialization
print('Starting config server initialization...');

// Wait for MongoDB to be ready
sleep(5000);

try {
    // Initialize the config replica set
    rs.initiate({
        _id: "configReplSet",
        configsvr: true,
        members: [
            { _id: 0, host: "mongo-config:27019" }
        ]
    });

    print('Config server replica set initiated successfully');
    
    // Wait for config server to be ready
    sleep(10000);
    
    print('Config server status:');
    printjson(rs.status());
    
} catch (e) {
    print('Error initializing config server: ' + e);
}