import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

function StepCountPrediction({ userStepData }) {
  const [predictedStepCount, setPredictedStepCount] = useState(null);

  useEffect(() => {
    if (!userStepData || userStepData.length === 0) {
      setPredictedStepCount('No data available for prediction.');
      return;
    }

    const trainingData = userStepData.map((data) => ({
      x: new Date(data.date).getDate(),
      y: data.steps,
    }));


    const xs = tf.tensor(trainingData.map((data) => data.x));
    const ys = tf.tensor(trainingData.map((data) => data.y));

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    model.fit(xs, ys, { epochs: 100 }).then(() => {
     
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      const prediction = model.predict(tf.tensor([[nextDay.getDate()]]));
      setPredictedStepCount(Math.round(prediction.dataSync()[0]));
    }).catch(error => {
      console.error("Error training or predicting model:", error);
      setPredictedStepCount("Error during prediction.");
    });

    
    return () => {
      xs.dispose();
      ys.dispose();
     
    };

  }, [userStepData]);

  return (
    <div>
      <h2>Step Count Prediction</h2>
      {predictedStepCount !== null ? (
        <p>Predicted Step Count for Tomorrow: {predictedStepCount}</p>
      ) : (
        <p>Loading prediction...</p>
      )}
    </div>
  );
}

export default StepCountPrediction;