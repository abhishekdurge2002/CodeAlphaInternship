import React, { useEffect } from 'react'; 
import Chart from 'chart.js/auto';

function DataVisualization() {

  useEffect(() => {
  
    const simulatedData = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [
        {
          label: 'Steps',
          data: [5000, 6000, 5500, 7000, 8000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };

    const ctx = document.getElementById('myChart');

    if (!ctx) {
      console.warn("Canvas element with ID 'myChart' not found.");
      return;
    }

    let chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
      chartInstance.destroy();
    }

    new Chart(ctx, {
      type: 'line',
      data: simulatedData, 
      options: { 
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Steps'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Daily Steps Over Time'
          }
        }
      }
    });

   
    return () => {
      let currentChartInstance = Chart.getChart(ctx);
      if (currentChartInstance) {
        currentChartInstance.destroy();
      }
    };

  }, []); 

  return (
    <div className="container card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h2>Data Visualization</h2>
      {}
      <div style={{ flexGrow: 1, position: 'relative' }}>
         <canvas id="myChart"></canvas> {/* No width/height here, let CSS handle it */}
      </div>
    </div>
  );
}

export default DataVisualization;