// Tennis Court Visualization in JavaScript
// This code recreates the Python functionality using Plotly.js

class Shot {
    constructor(shot_x, shot_y, shot_speed, shot_type, player_x, player_y) {
      this.shot_x = shot_x;
      this.shot_y = shot_y;
      this.shot_speed = shot_speed;
      this.shot_type = shot_type;
      this.player_x = player_x;
      this.player_y = player_y;
    }
  }
  
  class Player {
    constructor(name) {
      this.name = name;
      this.shots = [];
    }
  
    addShot(shot_x, shot_y, shot_speed, shot_type, player_x, player_y) {
      this.shots.push(new Shot(shot_x, shot_y, shot_speed, shot_type, player_x, player_y));
    }
  }
  
  class TennisCourtVisualization {
    constructor(players = [], court_width = 166, court_length = 350, show_heatmap = false, show_bounces = true) {
      this.players = players;
      this.court_width = court_width;
      this.court_length = court_length;
      this.show_heatmap = show_heatmap;
      this.show_bounces = show_bounces;
      this.fig = {};
      this.traces = [];
      this.shapes = [];
      this.annotations = [];
    }
  
    saveAsHtml(output_file = "tennis_visualization.html") {
      // In a real implementation, this would save the visualization to an HTML file
      // For browser use, we'd render directly to a div instead
      console.log(`Would save to ${output_file} in a non-browser environment`);
    }
  
    updateLayout() {
      this.fig = {
        data: this.traces,
        layout: {
          title: "Tennis Court with Shots Visualization and Heatmap",
          xaxis: {
            range: [0, this.court_length],
            showgrid: false,
            zeroline: false,
            fixedrange: true,
            showticklabels: false
          },
          yaxis: {
            range: [0, this.court_width],
            showgrid: false,
            zeroline: false,
            scaleanchor: "x",
            scaleratio: 1,
            fixedrange: true,
            showticklabels: false
          },
          width: 800,
          height: 400,
          margin: { l: 50, r: 50, t: 50, b: 50 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          shapes: this.shapes,
          annotations: this.annotations
        }
      };
    }
  
    setupCourt() {
      // Convert standard tennis court dimensions to our pixel scale
      // Standard court: 23.77m long, 10.97m wide
  
      // Calculate proportions for singles sidelines
      const single_sideline_prop = 1.37 / 10.97; // Single sideline is 1.37m from edge
      const single_sideline = single_sideline_prop * this.court_width;
  
      // Calculate service line position from baseline
      const service_line_from_baseline = (5.485 / 23.77) * this.court_length;
  
      // Full court outline
      this.shapes.push({
        type: "rect",
        x0: 0, y0: 0,
        x1: this.court_length, y1: this.court_width,
        line: { color: "RoyalBlue", width: 2 }
      });
  
      // Service lines
      this.shapes.push({
        type: "line",
        x0: service_line_from_baseline, y0: 0,
        x1: service_line_from_baseline, y1: this.court_width,
        line: { color: "RoyalBlue", width: 1 }
      });
  
      this.shapes.push({
        type: "line",
        x0: this.court_length - service_line_from_baseline, y0: 0,
        x1: this.court_length - service_line_from_baseline, y1: this.court_width,
        line: { color: "RoyalBlue", width: 1 }
      });
  
      // Center line (vertical)
      this.shapes.push({
        type: "line",
        x0: this.court_length / 2, y0: 0,
        x1: this.court_length / 2, y1: this.court_width,
        line: { color: "RoyalBlue", width: 1, dash: "dot" }
      });
  
      // Singles sidelines
      this.shapes.push({
        type: "rect",
        x0: 0, y0: single_sideline,
        x1: this.court_length, y1: this.court_width - single_sideline,
        line: { color: "RoyalBlue", width: 1 }
      });
  
      // Net line
      this.shapes.push({
        type: "line",
        x0: this.court_length / 2, y0: 0,
        x1: this.court_length / 2, y1: this.court_width,
        line: { color: "Black", width: 2 }
      });
  
      // Center service line
      this.shapes.push({
        type: "line",
        x0: service_line_from_baseline, y0: this.court_width / 2,
        x1: this.court_length - service_line_from_baseline, y1: this.court_width / 2,
        line: { color: "RoyalBlue", width: 1 }
      });
  
      // Add court labels
      this.addLabels(service_line_from_baseline, single_sideline);
    }
  
    addLabels(service_line, single_sideline) {
      // Net label
      this.annotations.push({
        x: this.court_length / 2,
        y: this.court_width + 5,
        text: "Net",
        showarrow: false,
        font: { family: "Arial", size: 12, color: "Black" }
      });
  
      // Baseline labels
      this.annotations.push({
        x: 5,
        y: this.court_width + 5,
        text: "Baseline",
        showarrow: false,
        font: { family: "Arial", size: 12, color: "Black" }
      });
  
      this.annotations.push({
        x: this.court_length - 5,
        y: this.court_width + 5,
        text: "Baseline",
        showarrow: false,
        font: { family: "Arial", size: 12, color: "Black" }
      });
  
      // Service line labels
      this.annotations.push({
        x: service_line,
        y: -5,
        text: "Service Line",
        showarrow: false,
        font: { family: "Arial", size: 12, color: "Black" }
      });
  
      this.annotations.push({
        x: this.court_length - service_line,
        y: -5,
        text: "Service Line",
        showarrow: false,
        font: { family: "Arial", size: 12, color: "Black" }
      });
  
      // Sideline label
      this.annotations.push({
        x: -5,
        y: this.court_width / 2,
        text: "Sideline",
        showarrow: false,
        font: { family: "Arial", size: 12, color: "Black" },
        textangle: -90
      });
    }
  

// Improved addHeatmap method with Gaussian KDE
addHeatmap() {
  // Collect all valid shot locations
  const all_x = [];
  const all_y = [];

  // First player position heatmap
  if (this.players.length > 1) {
    const player = this.players[1];
    for (const shot of player.shots) {
      // Check for valid values before adding to the heatmap data
      if (!isNaN(shot.player_x) && !isNaN(shot.player_y) &&
        isFinite(shot.player_x) && isFinite(shot.player_y)) {
        all_x.push(shot.player_y + 31);
        all_y.push(shot.player_x + 22);
      }
    }
  }

  if (all_x.length < 2) {
    // Need at least 2 points for kernel density estimation
    return;
  }

  try {
    // Create grid for heatmap - increase resolution to match Python's approach
    const numXPoints = 100;
    const numYPoints = 50;
    const xGrid = Array(numXPoints).fill().map((_, i) => i * (this.court_length/numXPoints));
    const yGrid = Array(numYPoints).fill().map((_, i) => i * (this.court_width/numYPoints));
    
    // Calculate Z values using 2D KDE
    const Z = this.kde2D(all_x, all_y, xGrid, yGrid);
    
    // Add heatmap contour - similar to Python version
    this.traces.push({
      type: 'contour',
      z: Z,
      x: xGrid,
      y: yGrid,
      colorscale: [
        [0, 'rgb(252, 255, 255)'], 
        [0.5, 'rgb(252, 3, 240)'], 
        [1, 'rgb(128, 0, 128)']
      ],
      opacity: 0.5,
      showscale: true,
      colorbar: {
        title: "Player Position Density",
        thickness: 15,
        len: 0.5,
        y: 0.8
      },
      contours: {
        showlines: false
      },
      hoverinfo: "none",
      name: 'Shot Density'
    });
  } catch (e) {
    console.error(`Error generating heatmap: ${e}`);
  }
}
 kde2D(x, y, xGrid, yGrid) {
  const n = x.length;
  if (n !== y.length) throw new Error("x and y must have the same length");
  
  // Calculate bandwidths using Scott's rule
  const xMean = x.reduce((sum, val) => sum + val, 0) / n;
  const yMean = y.reduce((sum, val) => sum + val, 0) / n;
  
  const xVar = x.reduce((sum, val) => sum + Math.pow(val - xMean, 2), 0) / n;
  const yVar = y.reduce((sum, val) => sum + Math.pow(val - yMean, 2), 0) / n;
  
  const xStd = Math.sqrt(xVar);
  const yStd = Math.sqrt(yVar);
  
  // Scott's rule for bandwidth selection
  const hx = xStd * Math.pow(n, -0.2);
  const hy = yStd * Math.pow(n, -0.2);
  
  // Generate density values for the grid
  const Z = Array(yGrid.length).fill().map(() => Array(xGrid.length).fill(0));
  
  // Calculate KDE at each grid point
  for (let i = 0; i < yGrid.length; i++) {
    for (let j = 0; j < xGrid.length; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        const dx = xGrid[j] - x[k];
        const dy = yGrid[i] - y[k];
        
        // 2D Gaussian kernel
        sum += Math.exp(-0.5 * (Math.pow(dx/hx, 2) + Math.pow(dy/hy, 2)));
      }
      Z[i][j] = sum / (n * 2 * Math.PI * hx * hy);
    }
  }
  
  return Z;
} 
    addAllShots() {
      for (const player of this.players) {
        for (const shot of player.shots) {
          if (shot.shot_x < this.court_width && shot.shot_x > 0 && 
              shot.shot_y < this.court_length && shot.shot_y > 0) {
            this.addShot(shot, player.name);
          }
        }
      }
    }
  
    addShot(shot, player_name) {
      // Create hover text with all shot information
      const shot_hover_text = 
        `Player: ${player_name}<br>` +
        `Shot Type: ${shot.shot_type}<br>` +
        `Speed: ${shot.shot_speed} kph<br>` +
        `Shot Position: (${shot.shot_x}, ${shot.shot_y})<br>` +
        `Player Position: (${shot.player_x}, ${shot.player_y})`;
      
      // Add shot marker
      this.traces.push({
        x: [shot.shot_y + 31],
        y: [shot.shot_x + 22],
        mode: 'markers',
        type: 'scatter',
        marker: {
          size: 10,
          color: shot.shot_speed,
          colorscale: 'Viridis',
          showscale: true,
          colorbar: {
            title: "Ball Speed (kph)",
            thickness: 15,
            len: 0.5,
            y: 0.2
          }
        },
        text: shot_hover_text,
        hoverinfo: 'text',
        name: player_name
      });
    }
  
    show() {
      this.setupCourt();
      if (this.show_heatmap) {
        this.addHeatmap();
      }
      if (this.show_bounces) {
        this.addAllShots();
      }
      this.updateLayout();
      return this.fig;
    }
  }
  
  // Main function to visualize tennis data
  async function visualizeTennisData(csv_file, show_heatmap = false, show_bounces = true) {
    try {
      // Fetch and parse the CSV file
      const response = await fetch(csv_file);
      const csvText = await response.text();
      
      // Parse CSV (using Papa Parse or similar in real implementation)
      // For this example we're using a simplified CSV parser
      const tennis_data = parseCSV(csvText);
      
      // Create players
      const player1 = new Player("Top player");
      const player2 = new Player("Bottom player");
      const SHOT_TYPE = 'forehand';  // Default shot type
      
      // Add shots from the data
      for (const row of tennis_data) {
        player1.addShot(
          row.bounce_x, row.bounce_y,
          row.ball_speed, SHOT_TYPE,
          row.top_player_x, row.top_player_y
        );
        
        player2.addShot(
          row.bounce_x, row.bounce_y,
          row.ball_speed, SHOT_TYPE,
          row.bottom_player_x, row.bottom_player_y
        );
      }
      
      // Create visualization
      const viz = new TennisCourtVisualization(
        [player1, player2], 
        undefined, undefined, 
        show_heatmap, 
        show_bounces
      );
      
      // Return the figure data for rendering
      return viz.show();
    } catch (error) {
      console.error("Error visualizing tennis data:", error);
      throw error;
    }
  }
  
  // Simple CSV parser function (in a real implementation, use Papa Parse)
  function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const row = {};
      
      headers.forEach((header, i) => {
        const value = values[i];
        row[header.trim()] = isNaN(value) ? value : parseFloat(value);
      });
      
      return row;
    });
  }
  
  // Usage in browser:
  // visualizeTennisData('output.csv', show_heatmap = false, show_bounces = true)
  //   .then(figure => {
  //     Plotly.newPlot('visualization', figure.data, figure.layout);
  //   });