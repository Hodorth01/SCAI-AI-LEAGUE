import { useState, useEffect } from 'react';
import Navbar from "./dashboard-sections/Navbar";
import Sidebar from "./dashboard-sections/Sidebar";
import Chart from "./dashboard-sections/Chart";
import Card from "./dashboard-sections/Cards";
import { useAuthContext } from "../hooks/useAuthContext";
import './../dashboard.css';
import Heatmap from './dashboard-sections/Heatmap';
import ShotPlacement from './dashboard-sections/ShotPlacement';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  useEffect(() => {
    if (!user) return;

    const fetchStatus = async () => {
      try {
        const response = await fetch('https://scai-ai-league-production.up.railway.app/api/status/', {
          headers: { "Authorization": `Bearer ${user.token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch status data');
        }

        const json = await response.json();
        setStatusData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [user]);

  if (!user) {
    return <div>Please log in to view the dashboard</div>;
  }

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
// console.log(statusData.games)
  return (
    <div className={`g-sidenav-show ${isSidebarMinimized ? 'g-sidenav-hidden' : 'g-sidenav-pinned'}`}>
      <Sidebar isMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
      <main className="main-content position-relative border-radius-lg">
        <Navbar toggleSidebar={toggleSidebar} user={user.userName}/>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <Card 
                title="Games"
                amount={statusData?.games || "0"}
                increase="+25%"
                icon = "./icons/tennis-racket.png"
              />
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <Card 
                title="Shots"
                amount={statusData?.shots?.toString() || "0"}
                increase="+45%"
                icon = "./icons/shot1.png"

              />
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <Card 
                title="Accuracy"
                amount={statusData?.accuracy ? `${statusData.accuracy}%` : "0%"}
                increase="+14%"
                icon = "./icons/accuracy.png"

              />
            </div>
            <div className="col-xl-3 col-sm-6">
              <Card 
                title="Wins"
                amount={statusData?.wins?.toString() || "0"}
                increase="+10%"
                icon = "./icons/medal.png"

              />
            </div>
          </div>
          <Chart performanceData={statusData?.Performance || []} />
            <div className="row mt-4 g-3 justify-content-start"> {/* g-3 = nice medium gap */}
              <div className="col-lg-5 mb-lg-0 mb-4 bg-light me-2 rounded p-3">
                <Heatmap result={statusData?.heatmap?.toString() || "./charts/heatmap_default.png"} />
              </div>
              <div className="col-lg-5 mb-lg-0 mb-4 bg-light me-2 rounded p-3">
                <ShotPlacement result={statusData?.shot_placements?.toString() || "./charts/shot_placement_default.png"} />
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;