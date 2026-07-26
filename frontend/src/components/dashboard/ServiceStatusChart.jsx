import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ServiceStatusChart({
  assigned,
  accepted,
  working,
  completed,
}) {
  const data = [
    { name: "Assigned", value: assigned },
    { name: "Accepted", value: accepted },
    { name: "Working", value: working },
    { name: "Completed", value: completed },
  ];

  const COLORS = [
    "#4f6df5",
    "#00b894",
    "#ff9800",
    "#4CAF50",
  ];

  return (
    <div className="status-chart">

      <h2>📊 Service Status</h2>

      <div className="chart-box">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              animationDuration={1200}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip
              formatter={(value)=>[
                value+" Services",
                "Count"
              ]}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-legend">

        {data.map((item, index) => (

          <div
            className="legend-item"
            key={index}
          >

            <span
              className="legend-color"
              style={{
                background: COLORS[index],
              }}
            />

            <span>{item.name}</span>

            <b>{item.value}</b>

          </div>

        ))}

      </div>

    </div>
  );
}