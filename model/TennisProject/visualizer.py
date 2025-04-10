import argparse
import pandas as pd
import plotly.graph_objects as go
import numpy as np
from scipy.stats import gaussian_kde

class Shot:
    def __init__(self, shot_x, shot_y, shot_speed, shot_type, player_x, player_y):
        self.shot_x = shot_x
        self.shot_y = shot_y
        self.shot_speed = shot_speed
        self.shot_type = shot_type
        self.player_x = player_x
        self.player_y = player_y


class Player:
    def __init__(self, name):
        self.name = name
        self.shots = []

    def add_shot(self, shot_x, shot_y, shot_speed, shot_type, player_x, player_y):
        self.shots.append(Shot(shot_x, shot_y, shot_speed, shot_type, player_x, player_y))


class TennisCourtVisualization:
    def __init__(self, players=[], court_width=166, court_length=350, show_heatmap=True):
        self.players = players
        self.court_width = court_width   # Court width in pixels
        self.court_length = court_length # Court length in pixels
        self.show_heatmap = show_heatmap
        self.fig = go.Figure()
        self.setup_court()
        if self.show_heatmap:
            self.add_heatmap()
        self.add_all_shots()
        self.update_layout()

    def save_as_html(self, output_file="tennis_visualization.html"):
        self.fig.write_html(output_file)

    def update_layout(self):
        self.fig.update_layout(
            title="Tennis Court with Shots Visualization and Heatmap",
            xaxis=dict(
                range=[0, self.court_length],
                showgrid=False, 
                zeroline=False,
                fixedrange=True  # Prevent zooming on x-axis
            ),
            yaxis=dict(
                range=[0, self.court_width],
                showgrid=False, 
                zeroline=False,
                scaleanchor="x",  # Make sure the scaling is equal
                scaleratio=1,     # Equal scaling
                fixedrange=True   # Prevent zooming on y-axis
            ),
            width=800,           # Set width of the figure
            height=400,          # Set height of the figure
            margin=dict(l=50, r=50, t=50, b=50)
        )

    def setup_court(self):
        # Convert standard tennis court dimensions to our pixel scale
        # Standard court: 23.77m long, 10.97m wide

        # Calculate proportions for singles sidelines
        single_sideline_prop = 1.37 / 10.97  # Single sideline is 1.37m from edge
        single_sideline = single_sideline_prop * self.court_width

        # Calculate service line position from baseline.
        # Baseline to net distance = 11.885m, so baseline to service line = 11.885 - 6.40 = 5.485m.
        service_line_from_baseline = (5.485 / 23.77) * self.court_length

        # Full court outline
        self.fig.add_shape(
            type="rect", 
            x0=0, y0=0, 
            x1=self.court_length, y1=self.court_width, 
            line=dict(color="RoyalBlue", width=2)
        )

        # Service lines (drawn at the correct positions from the baseline)
        self.fig.add_shape(
            type="line", 
            x0=service_line_from_baseline, y0=0, 
            x1=service_line_from_baseline, y1=self.court_width, 
            line=dict(color="RoyalBlue", width=1)
        )
        self.fig.add_shape(
            type="line", 
            x0=self.court_length - service_line_from_baseline, y0=0, 
            x1=self.court_length - service_line_from_baseline, y1=self.court_width, 
            line=dict(color="RoyalBlue", width=1)
        )

        # Center line (vertical)
        self.fig.add_shape(
            type="line", 
            x0=self.court_length/2, y0=0, 
            x1=self.court_length/2, y1=self.court_width, 
            line=dict(color="RoyalBlue", width=1, dash="dot")
        )

        # Singles sidelines
        self.fig.add_shape(
            type="rect", 
            x0=0, y0=single_sideline, 
            x1=self.court_length, y1=self.court_width - single_sideline, 
            line=dict(color="RoyalBlue", width=1)
        )

        # Net line
        self.fig.add_shape(
            type="line", 
            x0=self.court_length/2, y0=0, 
            x1=self.court_length/2, y1=self.court_width, 
            line=dict(color="Black", width=2)
        )

        # Center service line (drawn between the two service lines)
        self.fig.add_shape(
            type="line", 
            x0=service_line_from_baseline, y0=self.court_width/2, 
            x1=self.court_length - service_line_from_baseline, y1=self.court_width/2, 
            line=dict(color="RoyalBlue", width=1)
        )

        # Add court labels
        self.add_labels(service_line_from_baseline, single_sideline)

    def add_labels(self, service_line, single_sideline):
        # Net label
        self.fig.add_annotation(
            x=self.court_length/2,
            y=self.court_width + 5,
            text="Net",
            showarrow=False,
            font=dict(family="Arial", size=12, color="Black")
        )
        
        # Baseline labels
        self.fig.add_annotation(
            x=5,
            y=self.court_width + 5,
            text="Baseline",
            showarrow=False,
            font=dict(family="Arial", size=12, color="Black")
        )
        self.fig.add_annotation(
            x=self.court_length - 5,
            y=self.court_width + 5,
            text="Baseline",
            showarrow=False,
            font=dict(family="Arial", size=12, color="Black")
        )
        
        # Service line labels
        self.fig.add_annotation(
            x=service_line,
            y=-5,
            text="Service Line",
            showarrow=False,
            font=dict(family="Arial", size=12, color="Black")
        )
        self.fig.add_annotation(
            x=self.court_length-service_line,
            y=-5,
            text="Service Line",
            showarrow=False,
            font=dict(family="Arial", size=12, color="Black")
        )
        
        # Sideline label
        self.fig.add_annotation(
            x=-5,
            y=self.court_width/2,
            text="Sideline",
            showarrow=False,
            font=dict(family="Arial", size=12, color="Black"),
            textangle=-90
        )

    def add_heatmap(self):
        # Collect all valid shot locations
        all_x = []
        all_y = []
        
        for player in self.players:
            for shot in player.shots:
                if shot.shot_x < self.court_width and shot.shot_x > 0 and shot.shot_y < self.court_length and shot.shot_y > 0:
                    # Note the swapped coordinates to match the data
                    all_x.append(shot.shot_y + 31)  # Adjust as per shot display
                    all_y.append(shot.shot_x + 22)  # Adjust as per shot display
        
        if len(all_x) < 2:  # Need at least 2 points for kernel density estimation
            return
            
        # Create grid for heatmap
        x_grid = np.linspace(0, self.court_length, 100)
        y_grid = np.linspace(0, self.court_width, 50)
        
        # Create mesh grid
        X, Y = np.meshgrid(x_grid, y_grid)
        positions = np.vstack([X.ravel(), Y.ravel()])
        
        # Perform kernel density estimation
        try:
            values = np.vstack([all_x, all_y])
            kernel = gaussian_kde(values)
            Z = np.reshape(kernel(positions), X.shape)
            
            # Add heatmap contour
            self.fig.add_trace(go.Contour(
                z=Z,
                x=x_grid,
                y=y_grid,
                colorscale=[[0, 'rgb(3, 177, 252)'], [0.5, 'rgb(252, 252, 3)'], [1, 'rgb(252, 44, 3)']],  # Red-yellow color scale (hot areas = more shots)
                opacity=0.5,
                showscale=True,
                colorbar=dict(
                    title="Shot Density",
                    thickness=15,
                    len=0.5,
                    y=0.8
                ),
                contours=dict(
                    showlines=False,

                ),
                hoverinfo="none",
                name='Shot Density'
            ))
        except Exception as e:
            print(f"Error generating heatmap: {e}")

    def add_all_shots(self):
        for player in self.players:
            for shot in player.shots:
                if shot.shot_x < self.court_width and shot.shot_x > 0 and shot.shot_y < self.court_length and shot.shot_y > 0:
                    # self.add_shot(shot, player.name)
                    pass

    def add_shot(self, shot, player_name):
        # Create hover text with all shot information
        shot_hover_text = (
            f"Player: {player_name}<br>"
            f"Shot Type: {shot.shot_type}<br>"
            f"Speed: {shot.shot_speed} kph<br>"
            f"Shot Position: ({shot.shot_x}, {shot.shot_y})<br>"
            f"Player Position: ({shot.player_x}, {shot.player_y})"
        )
        
        # Add shot marker
        self.fig.add_trace(go.Scatter(
            x=[shot.shot_y+31],     # Note: x and y are swapped here to match the data
            y=[shot.shot_x+22],     # This is intentional based on the data format
            mode='markers',
            marker=dict(
                size=10,
                color=shot.shot_speed,
                colorscale='Viridis',
                showscale=True,
                colorbar=dict(
                    title="Ball Speed (kph)",
                    thickness=15,
                    len=0.5,
                    y=0.2
                )
            ),
            text=shot_hover_text,
            hoverinfo='text',
            name=f'{player_name}'
        ))

    def show(self):
        self.fig.show()

# Usage example
def visualize_tennis_data(csv_file, show_heatmap=True):
    # Read the CSV file
    tennis_data = pd.read_csv(csv_file)
    
    # Create players
    player1 = Player("Top player")
    player2 = Player("Bottom player")
    SHOT_TYPE = 'forehand'  # Default shot type
    
    # Add shots from the data
    for index, row in tennis_data.iterrows():
        player1.add_shot(
            row['bounce_x'], row['bounce_y'], 
            row['ball_speed'], SHOT_TYPE, 
            row['top_player_x'], row['top_player_y']
        )
        # Uncomment to add player 2's shots
        # player2.add_shot(
        #    row['bounce_x'], row['bounce_y'], 
        #    row['ball_speed'], SHOT_TYPE, 
        #    row['bottom_player_x'], row['bottom_player_y']
        # )
    
    # Create and show visualization
    viz = TennisCourtVisualization([player1], show_heatmap=show_heatmap)  # or [player1, player2] for both players
    viz.show()
    
    # Save the visualization as an HTML file
    # viz.save_as_html("tennis_court_visualization.html")

    return viz

# Call the function with your CSV file
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--path_to_csv', type=str, help='path to output csv', default='output.csv')
    parser.add_argument('--no_heatmap', action='store_true', help='disable heatmap visualization')
    args = parser.parse_args()
    visualize_tennis_data(args.path_to_csv, show_heatmap=not args.no_heatmap)