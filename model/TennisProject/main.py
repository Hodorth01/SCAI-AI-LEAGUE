import cv2
from court_detection_net import CourtDetectorNet
import numpy as np
from court_reference import CourtReference
from bounce_detector import BounceDetector
from person_detector import PersonDetector
from ball_detector import BallDetector
from utils import scene_detect
import argparse
import torch
import csv
import ballspeed as bs
import pdb
def read_video(path_video):
    cap = cv2.VideoCapture(path_video)
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frames = []
    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            frames.append(frame)
        else:
            break    
    cap.release()
    return frames, fps

def get_court_img():
    court_reference = CourtReference()
    court = court_reference.build_court_reference()
    court = cv2.dilate(court, np.ones((10, 10), dtype=np.uint8))
    court_img = (np.stack((court, court, court), axis=2)*255).astype(np.uint8)
    return court_img

def main(frames, scenes, bounces, ball_track, homography_matrices, kps_court, persons_top, persons_bottom,
         draw_trace=False, trace=7, path_to_ball_and_player_coords='output.csv'):
    """
    ...
    """
    num_frames = len(frames)
    ball_coords_in_minimap = [None for _ in range(num_frames)]
    top_player_coords_in_minimap = [None for _ in range(num_frames)]
    bottom_player_coords_in_minimap = [None for _ in range(num_frames)]
    ball_bounces = [None for _ in range(num_frames)]
    
    imgs_res = []
    width_minimap = 166
    height_minimap = 350
    is_track = [x is not None for x in homography_matrices] 
    for num_scene in range(len(scenes)):
        sum_track = sum(is_track[scenes[num_scene][0]:scenes[num_scene][1]])
        len_track = scenes[num_scene][1] - scenes[num_scene][0]

        eps = 1e-15
        scene_rate = sum_track/(len_track+eps)
        if (scene_rate > 0.5):
            court_img = get_court_img()

            for i in range(scenes[num_scene][0], scenes[num_scene][1]):
                img_res = frames[i]
                inv_mat = homography_matrices[i]

                # draw ball trajectory on the original frame
                if ball_track[i][0]:
                    if draw_trace:
                        for j in range(0, trace):
                            if i-j >= 0:
                                if ball_track[i-j][0]:
                                    draw_x = int(ball_track[i-j][0])
                                    draw_y = int(ball_track[i-j][1])
                                    img_res = cv2.circle(frames[i], (draw_x, draw_y),
                                                         radius=3, color=(0, 255, 0), thickness=2)
                    else:    
                        img_res = cv2.circle(img_res, (int(ball_track[i][0]), int(ball_track[i][1])), radius=5,
                                             color=(0, 255, 0), thickness=2)
                        img_res = cv2.putText(img_res, 'ball', 
                                              org=(int(ball_track[i][0]) + 8, int(ball_track[i][1]) + 8),
                                              fontFace=cv2.FONT_HERSHEY_SIMPLEX,
                                              fontScale=0.8,
                                              thickness=2,
                                              color=(0, 255, 0))

                # draw court keypoints
                if kps_court[i] is not None:
                    for j in range(len(kps_court[i])):
                        img_res = cv2.circle(img_res, (int(kps_court[i][j][0, 0]), int(kps_court[i][j][0, 1])),
                                             radius=0, color=(0, 0, 255), thickness=10)

                height, width, _ = img_res.shape

                # Update ball coordinates in minimap (similar to how we handle player coords)
                if ball_track[i][0] is not None and inv_mat is not None:
                    ball_point = np.array(ball_track[i], dtype=np.float32).reshape(1, 1, 2)
                    ball_point = cv2.perspectiveTransform(ball_point, inv_mat)
                    ball_coords_in_minimap[i] = (int(ball_point[0, 0, 0]), int(ball_point[0, 0, 1]))

                # draw bounce in minimap if bounce exists
                if i in bounces and inv_mat is not None:
                    ball_point = np.array(ball_track[i], dtype=np.float32).reshape(1, 1, 2)
                    ball_point = cv2.perspectiveTransform(ball_point, inv_mat)
                    court_img = cv2.circle(court_img, (int(ball_point[0, 0, 0]), int(ball_point[0, 0, 1])),
                                           radius=0, color=(0, 255, 255), thickness=50)
                    ball_bounces[i] = (int(ball_point[0, 0, 0]), int(ball_point[0, 0, 1]))

                minimap = court_img.copy()

                # draw persons
                persons = persons_top[i] + persons_bottom[i]                    
                for j, person in enumerate(persons):
                    if len(person[0]) > 0:
                        person_bbox = list(person[0])
                        img_res = cv2.rectangle(img_res, (int(person_bbox[0]), int(person_bbox[1])),
                                                (int(person_bbox[2]), int(person_bbox[3])), [255, 0, 0], 2)

                        # transmit person point to minimap
                        person_point = list(person[1])
                        person_point = np.array(person_point, dtype=np.float32).reshape(1, 1, 2)
                        person_point = cv2.perspectiveTransform(person_point, inv_mat)
                        minimap = cv2.circle(minimap, (int(person_point[0, 0, 0]), int(person_point[0, 0, 1])),
                                             radius=0, color=(255, 0, 0), thickness=80)
                        # update player coords (if needed, you might want to average multiple detections)
                        if j == 0:
                            top_player_coords_in_minimap[i] = (int(person_point[0, 0, 0]),int(person_point[0, 0, 1]))
                        else:
                            bottom_player_coords_in_minimap[i] = (int(person_point[0, 0, 0]), int(person_point[0, 0, 1]))

                minimap = cv2.resize(minimap, (width_minimap, height_minimap))
                img_res[30:(30 + height_minimap), (width - 30 - width_minimap):(width - 30), :] = minimap
                imgs_res.append(img_res)

                # pdb.set_trace()
                # save coordinates to CSV file
                # with open(path_to_ball_and_player_coords, 'a') as f:
                #     writer = csv.writer(f)
                #     writer.writerow([i, top_player_coords_in_minimap[i], bottom_player_coords_in_minimap[i], ball_coords_in_minimap[i]])

        else:    
            imgs_res = imgs_res + frames[scenes[num_scene][0]:scenes[num_scene][1]] 
        # Assume these minimap dimensions (same as used later for drawing):
    width_minimap = 166
    height_minimap = 350
    
    # Get an original court image to compute its dimensions
    court_img_original = get_court_img()  
    orig_height, orig_width, _ = court_img_original.shape
    
    # Compute scaling factors to convert original court coordinates to minimap coordinates
    scale_x = width_minimap / orig_width
    scale_y = height_minimap / orig_height
    
    # Scale the coordinates stored in the lists
    num_frames = len(ball_coords_in_minimap)  # or any of the lists, since they are the same length
    for i in range(num_frames):
        if top_player_coords_in_minimap[i] is not None:
            x, y = top_player_coords_in_minimap[i]
            top_player_coords_in_minimap[i] = (int(x * scale_x), int(y * scale_y))
        if bottom_player_coords_in_minimap[i] is not None:
            x, y = bottom_player_coords_in_minimap[i]
            bottom_player_coords_in_minimap[i] = (int(x * scale_x), int(y * scale_y))
        if ball_coords_in_minimap[i] is not None:
            x, y = ball_coords_in_minimap[i]
            ball_coords_in_minimap[i] = (int(x * scale_x), int(y * scale_y))
        if ball_bounces[i] is not None:
            x, y = ball_bounces[i]
            ball_bounces[i] = (int(x * scale_x), int(y * scale_y))
    # pdb.set_trace()
    ball_speeds = bs.calculate_ball_speed(ball_coords_in_minimap, fps, frame_diff=2)
    with open(path_to_ball_and_player_coords, 'w', newline='') as file:
        writer = csv.writer(file)

        # Write headers
        writer.writerow([
            'top_player_x', 'top_player_y',
            'bottom_player_x', 'bottom_player_y',
            'ball_x', 'ball_y',
            'ball_speed',
            'bounce_x', 'bounce_y'
        ])

    # Iterate through all tuples simultaneously and write to CSV
        for top, bottom, ball, ball_bounces , ball_speed in zip(top_player_coords_in_minimap,
                                     bottom_player_coords_in_minimap,
                                     ball_coords_in_minimap,
                                     ball_bounces, 
                                     ball_speeds):

            row = [
                top[0] if top else None,
                top[1] if top else None,
                bottom[0] if bottom else None,
                bottom[1] if bottom else None,
                ball[0] if ball else None,
                ball[1] if ball else None,
                ball_speed,
                ball_bounces[0] if ball_bounces else None,
                ball_bounces[1] if ball_bounces else None
            ]

            writer.writerow(row)
    return imgs_res        
 
def write(imgs_res, fps, path_output_video):
    height, width = imgs_res[0].shape[:2]
    out = cv2.VideoWriter(path_output_video, cv2.VideoWriter_fourcc(*'DIVX'), fps, (width, height))
    for num in range(len(imgs_res)):
        frame = imgs_res[num]
        out.write(frame)
    out.release()    

# python main.py \
#   --path_ball_track_model "models/ball_tracking_model.pt" \
#   --path_court_model "models\model_best3.pt" \
#   --path_bounce_model "models/bounce_detector_model.cbm" \
#   --path_input_video "videos/clipped_vid3.mp4" \
#   --path_output_video "videos/vid_output3.mp4" \
#   --path_to_csv "vid_output2.csv"
if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--path_ball_track_model', type=str, help='path to pretrained model for ball detection')
    parser.add_argument('--path_court_model', type=str, help='path to pretrained model for court detection')
    parser.add_argument('--path_bounce_model', type=str, help='path to pretrained model for bounce detection')
    parser.add_argument('--path_input_video', type=str, help='path to input video')
    parser.add_argument('--path_output_video', type=str, help='path to output video')
    parser.add_argument('--path_to_csv', type=str, help='path to output csv', default='output.csv')
    args = parser.parse_args()
    
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(device)
    frames, fps = read_video(args.path_input_video) 
    scenes = scene_detect(args.path_input_video)    
    print('num of scenes: ', len(scenes))
    print('num of frames: ', len(frames))
    print('ball detection')
    ball_detector = BallDetector(args.path_ball_track_model, device)
    ball_track = ball_detector.infer_model(frames)

    print('court detection')
    court_detector = CourtDetectorNet(args.path_court_model, device)
    homography_matrices, kps_court = court_detector.infer_model(frames)

    print('person detection')
    person_detector = PersonDetector(device)
    persons_top, persons_bottom = person_detector.track_players(frames, homography_matrices, filter_players=False)

    # bounce detection
    bounce_detector = BounceDetector(args.path_bounce_model)
    x_ball = [x[0] for x in ball_track]
    y_ball = [x[1] for x in ball_track]
    bounces = bounce_detector.predict(x_ball, y_ball)
    
    imgs_res = main(frames, scenes, bounces, ball_track, homography_matrices, kps_court, persons_top, persons_bottom,
                    draw_trace=True, path_to_ball_and_player_coords=args.path_to_csv)

    write(imgs_res, fps, args.path_output_video)





