# TennisProject
Tennis analysis using deep learning and machine learning. <br>

![](pics/hard.gif)
![](pics/grass.gif)
![](pics/clay.gif)

### Ball Detection
For detecting the tennis ball during gameplay, we implemented TrackNet, which provides accurate ball tracking even in challenging conditions. The model has been thoroughly tested on match footage and delivers reliable results.

### Bounce detection
To accurately identify when the ball bounces during gameplay, we implemented a CatBoostRegressor model. This model analyzes the ball's trajectory data from the previous detection step to predict bounce occurrences with high precision.

### Court detection
We developed a custom neural network model for detecting the tennis court, specifically trained to identify 14 key points that define the court boundaries and lines. Our model was trained on a comprehensive dataset of 19,000 frames, ensuring robust performance across various lighting conditions and camera angles.
### How to run
Prepare a video file with resolution 1280x720
1. clone the repository https://github.com/Hodorth01/SCAI-AI-LEAGUE
2. cd to TennisProject
3. run 'pip install -r requirements.txt
4. run main.py <args>
5. run visualizer.py <args>  

