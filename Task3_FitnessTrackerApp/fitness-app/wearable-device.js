const WebSocket = require('ws'); 

const sendMockData = () => {
  const ws = new WebSocket('ws://localhost:8080'); 

  ws.onopen = () => {
    const mockData = {
      steps: Math.floor(Math.random() * 10000),
      heartRate: Math.floor(Math.random() * 150),
      sleepDuration: Math.floor(Math.random() * 480),
    };

    ws.send(JSON.stringify(mockData));
    console.log('Mock data sent successfully');
    ws.close(); 
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed.');
  };
};

setInterval(sendMockData, 5000);