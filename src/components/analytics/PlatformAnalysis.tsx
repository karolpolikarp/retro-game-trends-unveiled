
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const platformPerformance = [
  { platform: "Wii", peakYear: 2010, totalSales: 456.7, marketDominance: 89.2, innovation: 95 },
  { platform: "PlayStation 2", peakYear: 2005, totalSales: 567.9, marketDominance: 78.4, innovation: 85 },
  { platform: "Xbox 360", peakYear: 2011, totalSales: 378.4, marketDominance: 72.1, innovation: 82 },
  { platform: "PlayStation 3", peakYear: 2013, totalSales: 345.9, marketDominance: 68.7, innovation: 88 },
  { platform: "Nintendo DS", peakYear: 2009, totalSales: 289.5, marketDominance: 92.3, innovation: 90 },
  { platform: "PSP", peakYear: 2008, totalSales: 167.8, marketDominance: 45.2, innovation: 75 }
];

const platformLifecycle = [
  { year: "2005", Wii: 0, PS2: 567.9, X360: 0, PS3: 0, DS: 0, PSP: 23.4 },
  { year: "2006", Wii: 134.5, PS2: 489.3, X360: 45.7, PS3: 0, DS: 89.2, PSP: 67.8 },
  { year: "2007", Wii: 289.7, PS2: 412.6, X360: 156.3, PS3: 34.8, DS: 156.7, PSP: 123.4 },
  { year: "2008", Wii: 378.4, PS2: 345.2, X360: 234.1, PS3: 89.3, DS: 234.5, PSP: 167.8 },
  { year: "2009", Wii: 423.6, PS2: 278.9, X360: 289.7, PS3: 156.2, DS: 289.5, PSP: 145.2 },
  { year: "2010", Wii: 456.7, PS2: 198.4, X360: 334.8, PS3: 234.1, DS: 267.3, PSP: 123.7 },
  { year: "2011", Wii: 398.2, PS2: 134.5, X360: 378.4, PS3: 289.6, DS: 198.4, PSP: 89.3 },
  { year: "2012", Wii: 334.1, PS2: 89.2, X360: 345.7, PS3: 323.8, DS: 145.6, PSP: 67.2 },
  { year: "2013", Wii: 267.8, PS2: 45.3, X360: 289.3, PS3: 345.9, DS: 98.7, PSP: 34.8 },
  { year: "2014", Wii: 198.5, PS2: 23.1, X360: 234.2, PS3: 298.4, DS: 67.3, PSP: 12.4 },
  { year: "2015", Wii: 134.2, PS2: 12.8, X360: 167.9, PS3: 234.7, DS: 34.9, PSP: 8.2 }
];

const competitiveAnalysis = [
  { generation: "6th Gen", leader: "PlayStation 2", leaderShare: 68.5, competition: 89.2 },
  { generation: "7th Gen", leader: "Wii", leaderShare: 45.8, competition: 95.7 },
  { generation: "Handheld", leader: "Nintendo DS", leaderShare: 73.2, competition: 67.4 }
];

const COLORS = ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"];

export const PlatformAnalysis = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Platform Performance Overview */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Wydajność Platform Gamingowych</CardTitle>
          <CardDescription className="text-gray-400">
            Analiza sukcesu platform pod względem sprzedaży i innowacji
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={platformPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="platform" 
                stroke="#9ca3af" 
                fontSize={11}
                width={100}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #22c55e',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'totalSales') return [`${value}M`, 'Łączna sprzedaż'];
                  if (name === 'marketDominance') return [`${value}%`, 'Dominacja rynkowa'];
                  if (name === 'innovation') return [`${value}/100`, 'Indeks innowacji'];
                  return [value, name];
                }}
              />
              <Bar 
                dataKey="totalSales" 
                fill="#22c55e"
                radius={[4, 4, 4, 4]}
                name="totalSales"
              />
              <Bar 
                dataKey="marketDominance" 
                fill="#16a34a"
                radius={[4, 4, 4, 4]}
                name="marketDominance"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Platform Lifecycle */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Cykl Życia Platform (2005-2015)</CardTitle>
          <CardDescription className="text-gray-400">
            Ewolucja sprzedaży głównych platform w czasie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart data={platformLifecycle}>
              <defs>
                <linearGradient id="wiiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="ps2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="x360Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#15803d" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="ps3Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#166534" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#166534" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #22c55e',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="Wii" 
                stackId="1"
                stroke="#22c55e" 
                fill="url(#wiiGradient)"
                name="Wii"
              />
              <Area 
                type="monotone" 
                dataKey="PS2" 
                stackId="1"
                stroke="#16a34a" 
                fill="url(#ps2Gradient)"
                name="PlayStation 2"
              />
              <Area 
                type="monotone" 
                dataKey="X360" 
                stackId="1"
                stroke="#15803d" 
                fill="url(#x360Gradient)"
                name="Xbox 360"
              />
              <Area 
                type="monotone" 
                dataKey="PS3" 
                stackId="1"
                stroke="#166534" 
                fill="url(#ps3Gradient)"
                name="PlayStation 3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitive Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Analiza Konkurencji</CardTitle>
            <CardDescription className="text-gray-400">
              Poziom konkurencji w różnych generacjach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={competitiveAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="generation" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar 
                  dataKey="leaderShare" 
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  name="Udział lidera (%)"
                />
                <Bar 
                  dataKey="competition" 
                  fill="#16a34a"
                  radius={[4, 4, 0, 0]}
                  name="Intensywność konkurencji"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Rozkład Rynku Platform</CardTitle>
            <CardDescription className="text-gray-400">
              Udział w łącznej sprzedaży (2005-2015)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformPerformance.slice(0, 6)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ platform, totalSales }) => `${platform}: ${totalSales}M`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="totalSales"
                >
                  {platformPerformance.slice(0, 6).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value}M`, 'Sprzedaż']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Innovation Index */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Indeks Innowacji Platform</CardTitle>
          <CardDescription className="text-gray-400">
            Ocena innowacyjności vs. sukces komercyjny
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {platformPerformance.map((platform, index) => (
            <div key={platform.platform} className="p-4 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg border border-green-700/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-semibold text-lg">{platform.platform}</span>
                <span className="text-gray-400 text-sm">Szczyt: {platform.peakYear}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sprzedaż</span>
                  <span className="text-green-400">{platform.totalSales}M</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((platform.totalSales / 567.9) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Innowacja</span>
                  <span className="text-green-400">{platform.innovation}/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${platform.innovation}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
