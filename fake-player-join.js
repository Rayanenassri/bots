const net = require('net');

// SA-MP server information
const serverIp = '192.53.174.102';
const serverPort = 28715;

// Number of fake players to simulate
const numFakePlayers = 10;

// Simulate fake players joining the server
for (let playerId = 1; playerId <= numFakePlayers; playerId++) {
  simulatePlayerJoin(playerId);
}

// Function to simulate player join
function simulatePlayerJoin(playerId) {
  // Connect to the SA-MP server
  const serverSocket = net.connect(serverPort, serverIp);

  // Handle server connection
  serverSocket.on('connect', () => {
    console.log(`Fake player ${playerId} connected to the server`);

    // Send authentication as a fake player
    serverSocket.write(`\xFF\xFF\xFF\xFFrcon_password 809ndkgl\n`);
    serverSocket.write(`\xFF\xFF\xFF\xFFrcon login "Player${playerId}"\n`);

    // Perform actions as the fake player
    // Example: Send a chat message
    serverSocket.write(`\xFF\xFF\xFF\xFFsay Hello from fake player!\n`);
  });

  // Handle server data
  serverSocket.on('data', (data) => {
    // Process server responses
    console.log(`Fake player ${playerId} received data: ${data}`);
  });

  // Handle server disconnection
  serverSocket.on('close', () => {
    console.log(`Fake player ${playerId} disconnected from the server`);
  });

  // Handle errors
  serverSocket.on('error', (error) => {
    console.error(`Error for fake player ${playerId}:`, error);
  });
}
