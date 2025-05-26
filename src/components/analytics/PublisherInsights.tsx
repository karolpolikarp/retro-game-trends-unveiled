
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TreemapChart, ScatterChart, Scatter } from "recharts";

const topPublishers = [
  { name: "Electronic Arts", totalSales: 1110.32, games: 1351, avgScore: 8.2, marketShare: 12.4 },
  { name: "Activision", totalSales: 727.47, games: 975, avgScore: 8.5, marketShare: 8.1 },
  { name: "Namco Bandai Games", totalSales: 577.02, games: 932, avgScore: 7.8, marketShare: 6.4 },
  { name: "Ubisoft", totalSales: 474.78, games: 921, avgScore: 8.1, marketShare: 5.3 },
  { name: "Konami Digital Entertainment", totalSales: 283.57, games: 832, avgScore: 8.3, marketShare: 3.2 },
  { name: "THQ", totalSales: 238.95, games: 715, avgScore: 7.6, marketShare: 2.7 },
  { name: "Nintendo", totalSales: 1786.56, games: 703, avgScore: 9.1, marketShare: 20.0 },
  { name: "Sony Computer Entertainment", totalSales: 607.50, games: 683, avgScore: 8.7, marketShare: 6.8 }
];

const publisherEvolution = [
  { year: "1985", Nintendo: 234.5, EA: 12.3, Activision: 8.9, Ubisoft: 0, Sony: 0 },
  { year: "1990", Nintendo: 456.7, EA: 45.2, Activision: 23.4, Ubisoft: 0, Sony: 0 },
  { year: "1995", Nintendo: 678.9, EA: 123.4, Activision: 67.8, Ubisoft: 23.1, Sony: 15.6 },
  { year: "2000", Nintendo: 534.2, EA: 234.7, Activision: 156.3, Ubisoft: 89.4, Sony: 123.8 },
  { year: "2005", Nintendo: 892.1, EA: 445.6, Activision: 298.7, Ubisoft: 234.5, Sony: 345.2 },
  { year: "2010", Nintendo: 1234.5, EA: 678.9, Activision: 456.2, Ubisoft: 367.8, Sony: 456.7 },
  { year: "2015", Nintendo: 1786.56, EA: 1110.32, Activision: 727.47, Ubisoft: 474.78, Sony: 607.50 }
];

const publisherMetrics = [
  { name: "Nintendo", x: 703, y: 9.1, z: 1786.56 },
  { name: "Electronic Arts", x: 1351, y: 8.2, z: 1110.32 },
  { name: "Activision", x: 975, y: 8.5, z: 727.47 },
  { name: "Sony", x: 683, y: 8.7, z: 607.50 },
  { name: "Namco Bandai", x: 932, y: 7.8, z: 577.02 },
  { name: "Ubisoft", x: 921, y: 8.1, z: 474.78 }
];

export const PublisherInsights = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Top Publishers by Sales */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Top Wydawcy według Sprzedaży</CardTitle>
          <CardDescription className="text-gray-400">
            Łączna sprzedaż największych wydawców gier (miliony egzemplarzy)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topPublishers} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#9ca3af" 
                fontSize={10}
                width={150}
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
                dataKey="totalSales" 
                fill="url(#publisherGradient)"
                radius={[4, 4, 4, 4]}
              />
              <defs>
                <linearGradient id="publisherGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Publisher Evolution */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Ewolucja Wydawców w Czasie</CardTitle>
          <CardDescription className="text-gray-400">
            Trendy sprzedaży głównych wydawców (1985-2015)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={publisherEvolution}>
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
              <Bar dataKey="Nintendo" stackId="a" fill="#8b5cf6" name="Nintendo" />
              <Bar dataKey="EA" stackId="a" fill="#06b6d4" name="Electronic Arts" />
              <Bar dataKey="Activision" stackId="a" fill="#10b981" name="Activision" />
              <Bar dataKey="Ubisoft" stackId="a" fill="#f59e0b" name="Ubisoft" />
              <Bar dataKey="Sony" stackId="a" fill="#ef4444" name="Sony" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Publisher Performance Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Matryca Jakość vs Ilość</CardTitle>
            <CardDescription className="text-gray-400">
              Liczba gier vs średnia ocena (wielkość bańki = sprzedaż)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={publisherMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="x" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="Liczba gier"
                />
                <YAxis 
                  dataKey="y" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="Średnia ocena"
                  domain={[7, 10]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #6b7280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'x') return [`${value}`, 'Liczba gier'];
                    if (name === 'y') return [`${value}`, 'Średnia ocena'];
                    return [`${value}M`, 'Sprzedaż'];
                  }}
                />
                <Scatter 
                  dataKey="z" 
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Strategie Wydawniczej</CardTitle>
            <CardDescription className="text-gray-400">
              Analiza modeli biznesowych wydawców
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-purple-900/40 to-purple-800/40 rounded-lg border border-purple-700/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Nintendo</span>
                  <span className="text-purple-400 text-sm">Premium Quality</span>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Mniej gier, wyższa jakość (9.1/10)</div>
                  <div>• Silne franczyzy exclusive</div>
                  <div>• Najwyższa sprzedaż na grę</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-cyan-900/40 to-cyan-800/40 rounded-lg border border-cyan-700/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Electronic Arts</span>
                  <span className="text-cyan-400 text-sm">Volume Leader</span>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Największa liczba tytułów (1351)</div>
                  <div>• Szeroki portfel gatunków</div>
                  <div>• Strategia akwizycji studiów</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-900/40 to-green-800/40 rounded-lg border border-green-700/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Activision</span>
                  <span className="text-green-400 text-sm">Franchise Focus</span>
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Silne franczyzy (CoD, WoW)</div>
                  <div>• Wysoka jakość (8.5/10)</div>
                  <div>• Model premium + DLC</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
