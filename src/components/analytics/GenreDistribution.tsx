
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const genreData = [
  { name: "Action", value: 1751.2, color: "#8b5cf6", growth: 12.5 },
  { name: "Sports", value: 1330.9, color: "#06b6d4", growth: 8.3 },
  { name: "Shooter", value: 1037.4, color: "#10b981", growth: 15.7 },
  { name: "Role-Playing", value: 927.4, color: "#f59e0b", growth: 18.2 },
  { name: "Platform", value: 831.4, color: "#ef4444", growth: -5.4 },
  { name: "Racing", value: 730.5, color: "#8366d9", growth: 3.1 },
  { name: "Fighting", value: 448.9, color: "#06d6a0", growth: 6.8 },
  { name: "Simulation", value: 392.2, color: "#ffd23f", growth: 22.1 }
];

const genreEvolution = [
  { year: "1985", Action: 45.2, Sports: 23.1, Shooter: 12.3, RPG: 8.9, Platform: 89.4, Racing: 15.6 },
  { year: "1990", Action: 123.4, Sports: 67.8, Shooter: 34.5, RPG: 23.7, Platform: 234.1, Racing: 45.2 },
  { year: "1995", Action: 234.7, Sports: 156.3, Shooter: 89.2, RPG: 67.4, Platform: 345.6, Racing: 123.8 },
  { year: "2000", Action: 456.8, Sports: 298.7, Shooter: 178.4, RPG: 134.9, Platform: 289.3, Racing: 234.1 },
  { year: "2005", Action: 689.3, Sports: 445.2, Shooter: 298.7, RPG: 234.6, Platform: 198.7, Racing: 345.8 },
  { year: "2010", Action: 892.4, Sports: 578.9, Shooter: 445.3, RPG: 378.2, Platform: 167.4, Racing: 456.7 },
  { year: "2015", Action: 1751.2, Sports: 1330.9, Shooter: 1037.4, RPG: 927.4, Platform: 831.4, Racing: 730.5 }
];

const genreRadar = [
  { genre: "Action", popularity: 95, complexity: 60, accessibility: 85 },
  { genre: "Sports", popularity: 80, complexity: 40, accessibility: 95 },
  { genre: "Shooter", popularity: 85, complexity: 65, accessibility: 70 },
  { genre: "RPG", popularity: 75, complexity: 90, accessibility: 60 },
  { genre: "Platform", popularity: 70, complexity: 50, accessibility: 90 },
  { genre: "Racing", popularity: 65, complexity: 55, accessibility: 80 }
];

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8366d9", "#06d6a0", "#ffd23f"];

export const GenreDistribution = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Genre Distribution Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Dystrybucja Gatunków</CardTitle>
            <CardDescription className="text-gray-400">
              Udział poszczególnych gatunków w sprzedaży (2015)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
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

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Tempo Wzrostu Gatunków</CardTitle>
            <CardDescription className="text-gray-400">
              Roczny wzrost sprzedaży w % (2014-2015)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={genreData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #6b7280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value}%`, 'Wzrost']}
                />
                <Bar 
                  dataKey="growth" 
                  fill={(data: any) => data.growth > 0 ? "#10b981" : "#ef4444"}
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Genre Evolution Timeline */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Ewolucja Gatunków w Czasie</CardTitle>
          <CardDescription className="text-gray-400">
            Trendy popularności głównych gatunków (1985-2015)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={genreEvolution}>
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
              <Bar dataKey="Action" stackId="a" fill="#8b5cf6" name="Action" />
              <Bar dataKey="Sports" stackId="a" fill="#06b6d4" name="Sports" />
              <Bar dataKey="Shooter" stackId="a" fill="#10b981" name="Shooter" />
              <Bar dataKey="RPG" stackId="a" fill="#f59e0b" name="RPG" />
              <Bar dataKey="Platform" stackId="a" fill="#ef4444" name="Platform" />
              <Bar dataKey="Racing" stackId="a" fill="#8366d9" name="Racing" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Genre Characteristics Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Charakterystyka Gatunków</CardTitle>
            <CardDescription className="text-gray-400">
              Analiza wielowymiarowa cech gatunków
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={genreRadar}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="genre" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                <PolarRadiusAxis 
                  tick={{ fill: '#9ca3af', fontSize: 8 }} 
                  domain={[0, 100]}
                />
                <Radar
                  name="Popularność"
                  dataKey="popularity"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Złożoność"
                  dataKey="complexity"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Dostępność"
                  dataKey="accessibility"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #6b7280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Kluczowe Insights</CardTitle>
            <CardDescription className="text-gray-400">
              Analiza trendów gatunkowych
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Action</span>
                  <span className="text-green-400">+12.5%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Dominujący gatunek z stabilnym wzrostem</p>
              </div>
              <div className="p-3 bg-cyan-900/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">RPG</span>
                  <span className="text-green-400">+18.2%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Najszybszy wzrost - rosnące zainteresowanie</p>
              </div>
              <div className="p-3 bg-green-900/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Shooter</span>
                  <span className="text-green-400">+15.7%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Silny wzrost dzięki grom multiplayer</p>
              </div>
              <div className="p-3 bg-red-900/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Platform</span>
                  <span className="text-red-400">-5.4%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Spadek popularności klasycznych platform</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
