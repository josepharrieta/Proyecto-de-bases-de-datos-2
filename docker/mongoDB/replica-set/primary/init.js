// MongoDB Replica Set Initialization Script for Primary
print('Starting replica set initialization...');

// Wait for MongoDB to be ready
sleep(5000);

try {
    // Initialize the replica set
    rs.initiate({
        _id: "shard1ReplSet",
        members: [
            { _id: 0, host: "mongo-shard1-primary:27018", priority: 2 },
            { _id: 1, host: "mongo-shard1-secondary1:27018", priority: 1 },
            { _id: 2, host: "mongo-shard1-secondary2:27018", priority: 1 }
        ]
    });

    print('Replica set initiated successfully');
    
    // Wait for replica set to be ready
    sleep(10000);
    
    // Check replica set status
    print('Replica set status:');
    printjson(rs.status());
    
} catch (e) {
    print('Error initializing replica set: ' + e);
}