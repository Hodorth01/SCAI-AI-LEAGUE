import cv2

# Open the video file
cap = cv2.VideoCapture('input_video2.mp4')

if cap.isOpened():
    # Get the width and height of the video frames
    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f'Frame size: {width} x {height}')
    print(f'FPS: {fps}')
else:
    print("Error: Could not open video file.")

cap.release()
