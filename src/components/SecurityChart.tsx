"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["#0098b2", "#f22020", "#005f7f", "#8884d8"];

export function ThreatChart() {
  const data = [
    { name: "Phishing", value: 35 },
    { name: "Malware", value: 25 },
    { name: "Ransomware", value: 20 },
    { name: "DDoS", value: 15 },
    { name: "Other", value: 5 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function IncidentChart() {
  const data = [
    { month: "Яну", incidents: 12 },
    { month: "Фев", incidents: 19 },
    { month: "Мар", incidents: 15 },
    { month: "Апр", incidents: 22 },
    { month: "Май", incidents: 18 },
    { month: "Юни", incidents: 25 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Bar dataKey="incidents" fill="#0098b2" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ResponseTimeChart() {
  const data = [
    { time: "00:00", response: 45 },
    { time: "04:00", response: 52 },
    { time: "08:00", response: 38 },
    { time: "12:00", response: 65 },
    { time: "16:00", response: 58 },
    { time: "20:00", response: 42 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="time" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip 
          contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Line type="monotone" dataKey="response" stroke="#f22020" strokeWidth={2} dot={{ fill: "#f22020" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
