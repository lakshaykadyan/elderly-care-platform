import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WeeklyServiceChart({ data }) {
  return (
    <div className="chart-card">

      <h2>📊 Weekly Service Analytics</h2>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <Tooltip
            cursor={{ fill: "#f5f7ff" }}
          />

          <Bar
            dataKey="services"
            radius={[10, 10, 0, 0]}
            fill="#4f6df5"
            animationDuration={1200}
          />
        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}