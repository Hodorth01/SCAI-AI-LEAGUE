import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({performanceData}) => {
  // Gradient for the chart background
  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 230, 0, 50);
    gradient.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
    gradient.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
    gradient.addColorStop(0, 'rgba(94, 114, 228, 0)');
    return gradient;
  };

  const data = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Performance",
      tension: 0.4,
      borderWidth: 0,
      pointRadius: 0,
      borderColor: "#5e72e4",
      backgroundColor: (context) => {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return null;
        return getGradient(ctx);
      },
      borderWidth: 3,
      fill: true,
      data: performanceData,
      maxBarThickness: 6
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          padding: 10,
          color: '#fbfbfb',
          font: {
            size: 11,
            family: "Poppins",
            style: 'normal',
            lineHeight: 2
          },
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          color: '#ccc',
          padding: 20,
          font: {
            size: 11,
            family: "Poppins",
            style: 'normal',
            lineHeight: 2
          },
        }
      },
    },
  };

  return (
    <div className="row mt-4">
        <div className="col-lg-9 mb-lg-0 mb-4">
            <div className="card z-index-2 h-100">
                <div className="card-header pb-0 pt-3 bg-transparent">
                    <h6 className="text-capitalize">Your Performance</h6>
                </div>
            <div className="card-body p-3">
                <div className="chart">
                <Line 
                    data={data} 
                    options={options} 
                    height={300}
                />
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Chart;