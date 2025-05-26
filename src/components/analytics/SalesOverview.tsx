
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { year: "1980", globalSales: 5.2, games: 12 },
  { year: "1985", globalSales: 45.8, games: 89 },
  { year: "1990", globalSales: 125.4, games: 234 },
  { year: "1995", globalSales: 298.7, games: 567 },
  { year: "2000", globalSales: 445.3, games: 1234 },
  { year: "2005", globalSales: 678.9, games: 2156 },
  { year: "2010", globalSales: 892.4, games: 3245 },
  { year: "2015", globalSales: 1245.7, games: 4567 }
];

const topGames = [
  { name: "Super Mario Bros.", sales: 40.24, platform: "NES", year: 1985 },
  { name: "Mario Kart Wii", sales: 37.38, platform: "Wii", year: 2008 },
  { name: "Wii Sports", sales: 82.90, platform: "Wii", year: 2006 },
  { name: "Grand Theft Auto: San Andreas", sales: 17.33, platform: "PS2", year: 2004 },
  { name: "Super Mario World", sales: 20.61, platform: "SNES", year: 1990 }
];

export const SalesOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Global Sales Trend */}
      <Card className="lg:col-span-2 bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            Globalne Trendy Sprzedaży (1980-2015)
          </CardTitle>
          <CardDescription className="text-gray-400">
            Ewolucja sprzedaży gier w milionach egzemplarzy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af" 
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #6b7280',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="globalSales" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                fill="url(#salesGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Games */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Top 5 Gier Wszech Czasów</CardTitle>
          <CardDescription className="text-gray-400">
            Najlepiej sprzedające się gry (mln egzemplarzy)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topGames} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#9ca3af" 
                fontSize={10}
                width={120}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #6b7280',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`${value}M`, 'Sprzedaż']}
              />
              <Bar 
                dataKey="sales" 
                fill="url(#salesGradient)"
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Games Released Over Time */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Liczba Wydanych Gier</CardTitle>
          <CardDescription className="text-gray-400">
            Trendy publikacji w czasie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
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
              <Bar 
                dataKey="games" 
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
