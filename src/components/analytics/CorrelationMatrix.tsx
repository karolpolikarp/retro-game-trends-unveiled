
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

const correlationMatrixData = [
  { x: 0, y: 0, value: 1.00, label: "Sales", color: "#22c55e" },
  { x: 1, y: 0, value: 0.73, label: "Score", color: "#3b82f6" },
  { x: 2, y: 0, value: 0.89, label: "Budget", color: "#8b5cf6" },
  { x: 3, y: 0, value: 0.45, label: "Year", color: "#f59e0b" },
  { x: 0, y: 1, value: 0.73, label: "Score-Sales", color: "#3b82f6" },
  { x: 1, y: 1, value: 1.00, label: "Score", color: "#22c55e" },
  { x: 2, y: 1, value: 0.61, label: "Budget-Score", color: "#06b6d4" },
  { x: 3, y: 1, value: 0.23, label: "Year-Score", color: "#ef4444" },
  { x: 0, y: 2, value: 0.89, label: "Budget-Sales", color: "#8b5cf6" },
  { x: 1, y: 2, value: 0.61, label: "Budget-Score", color: "#06b6d4" },
  { x: 2, y: 2, value: 1.00, label: "Budget", color: "#22c55e" },
  { x: 3, y: 2, value: 0.34, label: "Year-Budget", color: "#f59e0b" }
];

const scatterData = [
  { sales: 82.74, score: 76, innovation: 85, name: "Wii Sports" },
  { sales: 40.24, score: 85, innovation: 90, name: "Super Mario Bros." },
  { sales: 37.38, score: 89, innovation: 75, name: "Mario Kart Wii" },
  { sales: 31.37, score: 91, innovation: 70, name: "Pokemon R/B" },
  { sales: 28.02, score: 58, innovation: 60, name: "Wii Play" },
  { sales: 25.67, score: 88, innovation: 95, name: "Tetris" }
];

export const CorrelationMatrix = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-black/40 border-cyan-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">🔗 Macierz Korelacji</CardTitle>
          <CardDescription className="text-gray-400">
            Wizualizacja siły związków między zmiennymi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 p-4">
            {correlationMatrixData.map((item, index) => (
              <div 
                key={index}
                className="aspect-square flex items-center justify-center rounded-lg text-white font-bold text-sm"
                style={{
                  backgroundColor: item.color,
                  opacity: Math.abs(item.value)
                }}
              >
                {item.value.toFixed(2)}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400">Sales</span> <span className="text-green-400">●</span>
            </div>
            <div>
              <span className="text-gray-400">Score</span> <span className="text-blue-400">●</span>
            </div>
            <div>
              <span className="text-gray-400">Budget</span> <span className="text-purple-400">●</span>
            </div>
            <div>
              <span className="text-gray-400">Year</span> <span className="text-orange-400">●</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/40 border-cyan-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">🎯 3D Correlation: Sales-Score-Innovation</CardTitle>
          <CardDescription className="text-gray-400">
            Wielowymiarowa analiza zależności
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="score" 
                stroke="#9ca3af" 
                label={{ value: 'Ocena Graczy', position: 'insideBottom', offset: -5, style: { fill: '#9ca3af' } }}
              />
              <YAxis 
                dataKey="sales" 
                stroke="#9ca3af" 
                label={{ value: 'Sprzedaż (mln)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #06b6d4',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any, name: string, props: any) => {
                  const innovation = props.payload.innovation;
                  return [
                    `${value}${name === 'sales' ? 'M' : ''}`,
                    name === 'sales' ? 'Sprzedaż' : 'Ocena'
                  ];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return `${payload[0].payload.name} (Innowacyjność: ${payload[0].payload.innovation})`;
                  }
                  return label;
                }}
              />
              <Scatter 
                dataKey="sales" 
                fill="#06b6d4"
                name="sales"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
