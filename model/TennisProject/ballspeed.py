import csv
import math
import argparse

def parse_value(val):
    """Convert string to float if possible, else return None."""
    try:
        return float(val) if val != '' else None
    except ValueError:
        return None

def calculate_ball_speed(ball_coordinates, fps, frame_diff=1):
    """
    Calculate ball speed in m/s from a list of ball coordinates.
    
    Args:
        ball_x_list: List of x coordinates of the ball
        ball_y_list: List of y coordinates of the ball
        fps: Frames per second of the video
        frame_diff: Frame difference to use for calculation (default: 1)
        
    Returns:
        List of ball speeds in m/s (None for frames where speed can't be calculated)
    """
    ball_x_list = []
    ball_y_list = []
    for coord in ball_coordinates:
        if coord is None:
            ball_x_list.append(None)
            ball_y_list.append(None)
        else:
            x, y = coord
            ball_x_list.append(x)
            ball_y_list.append(y)

    # Real tennis court dimensions in meters (doubles court)
    court_width_m = 10.97   # horizontal dimension (width)
    court_length_m = 23.77  # vertical dimension (length)

    # Minimap dimensions in pixels (from your project)
    minimap_width_px = 166
    minimap_height_px = 350

    # Compute scaling factors (meters per pixel)
    scale_x = court_width_m / minimap_width_px
    scale_y = court_length_m / minimap_height_px

    # Initialize the results list with None values
    ball_speeds = [None] * len(ball_x_list)
    
    # Calculate ball speed using positions every frame_diff frames
    for i in range(frame_diff, len(ball_x_list)):
        current_ball_x = ball_x_list[i]
        current_ball_y = ball_y_list[i]
        prev_ball_x = ball_x_list[i-frame_diff]
        prev_ball_y = ball_y_list[i-frame_diff]
        
        if current_ball_x is not None and current_ball_y is not None and \
           prev_ball_x is not None and prev_ball_y is not None:
            # Calculate difference in pixels
            dx_px = current_ball_x - prev_ball_x
            dy_px = current_ball_y - prev_ball_y

            # Convert pixel differences to meters using the scale factors
            dx_m = dx_px * scale_x
            dy_m = dy_px * scale_y

            # Euclidean distance in meters
            distance_m = math.sqrt(dx_m**2 + dy_m**2)

            # Time difference in seconds
            dt = frame_diff / fps

            # Calculate speed in m/s
            ball_speed = distance_m / dt
            ball_speed_kph = ball_speed * 3.6  # Convert to km/h

            ball_speeds[i] = round(ball_speed_kph, 2)  # Round to 2 decimal places for ball_speed

    return ball_speeds
