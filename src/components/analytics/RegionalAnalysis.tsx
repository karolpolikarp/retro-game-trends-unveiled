
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const regionalData = [
  { year: "1985", NA: 125.4, EU: 45.2, JP: 89.7, Other: 12.3 },
  { year: "1990", NA: 234.7, EU: 98.4, JP: 156.2, Other: 23.8 },
  { year: "1995", NA: 456.3, EU: 234.1, JP: 198.5, Other: 45.7 },
  { year: "2000", NA: 678.9, EU: 398.2, JP: 167.4, Other: 89.3 },
  { year: "2005", NA: 892.1, EU: 567.8, JP: 145.9, Other: 134.2 },
  { year: "2010", NA: 1023.4, EU: 723.6, JP: 134.7, Other: 189.5 },
  { year: "2015", NA: 1156.8, EU: 856.3, JP: 123.4, Other: 267.8 }
];

const marketShare = [
  { name: "Ameryka Północna", value: 1156.8, color: "#8b5cf6" },
  { name: "Europa", value: 856.3, color: "#06b6d4" },
  { name: "Japonia", value: 123.4, color: "#10b981" },
  { name: "Inne", value: 267.8, color: "#f59e0b" }
];

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

export const RegionalAnalysis = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Regional Sales Trends */}
      <Card className="lg:col-span-2 bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Trendy Sprzedaży Regionalnej</CardTitle>
          <CardDescription className="text-gray-400">
            Porównanie sprzedaży w głównych regionach (mln egzemplarzy)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #6b7280',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="NA" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Ameryka Północna"
              />
              <Line 
                type="monotone" 
                dataKey="EU" 
                stroke="#06b6d4" 
                strokeWidth={3}
                name="Europa"
              />
              <Line 
                type="monotone" 
                dataKey="JP" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Japonia"
              />
              <Line 
                type="monotone" 
                dataKey="Other" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Inne"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Share 2015 */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Udział w Rynku 2015</CardTitle>
          <CardDescription className="text-gray-400">
            Dystrybucja sprzedaży według regionów
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={marketShare}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {marketShare.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #6b7280',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`${value}M`, 'Sprzedaż']}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Regional Insights */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Kluczowe Insights</CardTitle>
          <CardDescription className="text-gray-400">
            Analiza trendów regionalnych
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
              <span className="text-gray-300">Ameryka Północna</span>
              <span className="text-purple-400 font-semibold">Dominujący rynek</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-cyan-900/30 rounded-lg">
              <span className="text-gray-300">Europa</span>
              <span className="text-cyan-400 font-semibold">Szybki wzrost</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
              <span className="text-gray-300">Japonia</span>
              <span className="text-green-400 font-semibold">Stabilny spadek</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-900/30 rounded-lg">
              <span className="text-gray-300">Inne regiony</span>
              <span className="text-yellow-400 font-semibold">Wschodzące rynki</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
