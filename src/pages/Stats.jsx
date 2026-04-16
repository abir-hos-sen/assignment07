import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTimeline } from '../context/TimelineContext';
import './Stats.css';

function Stats() {
  const { entries } = useTimeline();

  const callCount = entries.filter(e => e.type === 'Call').length;
  const textCount = entries.filter(e => e.type === 'Text').length;
  const videoCount = entries.filter(e => e.type === 'Video').length;
  const totalInteractions = entries.length;

  const chartData = [
    { name: 'Text', value: textCount },
    { name: 'Call', value: callCount },
    { name: 'Video', value: videoCount },
  ].filter(item => item.value > 0);

  //  Updated colors (teal, red, yellow)
  const COLORS = ['#7E35E1', '#37A163', '#244D3F'];

  return (
    <div className="stats">
      <div className="stats-container">
        <div className="stats-header">
          <h1>Friendship Analytics</h1>
        </div>

        {totalInteractions > 0 ? (
          <div className="chart-section">
            <h2 className="chart-subheading">By Interaction Type</h2>

            <div className="donut-chart-wrapper">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8} // 🔥 gap between segments
                    dataKey="value"
                    stroke="#ffffff"
                    strokeWidth={4}
                    cornerRadius={20} // 🔥 rounded edges
                    startAngle={90}
                    endAngle={-270}
                    label={false} // cleaner like image
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => `${value} interactions`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '3px',
                      padding: '8px 12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot green"></span>
                <span className="legend-name">Text</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot blue"></span>
                <span className="legend-name">Call</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot orange"></span>
                <span className="legend-name">Video</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <p>📭 No interactions logged yet</p>
            <p>Start logging interactions to see analytics!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;