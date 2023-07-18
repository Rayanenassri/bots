const saMp = require('samp-query');

// SA-MP server information
const serverIp = '94.23.168.153';
const serverPort = 7771;

// Number of fake players to simulate
const numFakePlayers = 10;

// Simulate fake players joining the server
for (let playerId = 1; playerId <= numFakePlayers; playerId++) {
  simulatePlayerJoin(playerId);
}

// Function to simulate player join
function simulatePlayerJoin(playerId) {
  // Connect to the SA-MP server
  const client = saMp.createClient({ host: serverIp, port: serverPort });

  // Authenticate as a fake player
  client.authenticate(`Player${playerId}`);

  // Listen for connection events
  client.on('connected', () => {
    console.log(`Fake player ${playerId} connected to the server`);

    // Perform actions as the fake player
    // Example: Send a chat message
    client.sendChat('Hello from fake player!');
  });

  // Listen for disconnection events
  client.on('disconnected', () => {
    console.log(`Fake player ${playerId} disconnected from the server`);
  });

  // Handle errors
  client.on('error', (error) => {
    console.error(`Error for fake player ${playerId}:`, error);
  });
}
