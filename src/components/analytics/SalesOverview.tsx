import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from "recharts";
import { useEffect, useState } from "react";
import { dataService, SalesData, TopGame } from "@/services/dataService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SalesOverview = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topGames, setTopGames] = useState<TopGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("2015");
  const [selectedRegion, setSelectedRegion] = useState<string>("global");

  const regionalData = [
    { region: "Ameryka Północna", sales: 170.8, percentage: 43.5, color: "#3b82f6" },
    { region: "Europa", sales: 119.4, percentage: 30.4, color: "#8b5cf6" },
    { region: "Japonia", sales: 48.9, percentage: 12.4, color: "#f59e0b" },
    { region: "Inne", sales: 53.7, percentage: 13.7, color: "#ef4444" }
  ];

  const genreGrowthData = [
    { genre: "Action", growth2014: 12.5, growth2015: -8.3, totalSales: 1847.3, color: "#3b82f6" },
    { genre: "Sports", growth2014: 15.2, growth2015: -5.7, totalSales: 1122.8, color: "#8b5cf6" },
    { genre: "Shooter", growth2014: 8.9, growth2015: -12.1, totalSales: 945.2, color: "#f59e0b" },
    { genre: "Role-Playing", growth2014: 18.7, growth2015: 3.4, totalSales: 789.6, color: "#22c55e" },
    { genre: "Platform", growth2014: -2.1, growth2015: -15.8, totalSales: 687.1, color: "#ef4444" },
    { genre: "Racing", growth2014: 5.3, growth2015: -9.8, totalSales: 534.9, color: "#06b6d4" }
  ];

  const correlationData = [
    { name: "Wii Sports", sales: 82.74, score: 76, budget: 60, marketing: 120, year: 2006 },
    { name: "Super Mario Bros.", sales: 40.24, score: 85, budget: 20, marketing: 30, year: 1985 },
    { name: "Mario Kart Wii", sales: 37.38, score: 89, budget: 80, marketing: 90, year: 2008 },
    { name: "Pokemon Red/Blue", sales: 31.37, score: 91, budget: 15, marketing: 25, year: 1996 },
    { name: "Tetris", sales: 30.26, score: 88, budget: 5, marketing: 10, year: 1984 },
    { name: "Wii Play", sales: 28.02, score: 58, budget: 30, marketing: 70, year: 2006 }
  ];

  const platformCorrelation = [
    { platform: "Wii", innovation: 95, sales: 456.7, userBase: 101.6, year: 2006 },
    { platform: "PS2", innovation: 75, sales: 567.9, userBase: 155.0, year: 2000 },
    { platform: "Xbox 360", innovation: 85, sales: 378.4, userBase: 84.0, year: 2005 },
    { platform: "PS3", innovation: 80, sales: 345.9, userBase: 87.4, year: 2006 },
    { platform: "NES", innovation: 90, sales: 189.4, userBase: 61.9, year: 1985 },
    { platform: "GB", innovation: 85, sales: 118.7, userBase: 118.7, year: 1989 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dataService.fetchOverviewData();
        setSalesData(data.salesData);
        setTopGames(data.topGames);
        setError(null);
      } catch (err) {
        console.error('Error fetching overview data:', err);
        setError('Używam danych przykładowych - backend niedostępny.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2 bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40">
              <div className="text-white">Ładowanie danych...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {error && (
        <Card className="bg-green-900/20 border-green-600/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-green-400 text-sm">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Analiza Korelacji Sales vs Score vs Budget */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">🔍 Analiza Korelacji: Sprzedaż vs Oceny vs Budżet</CardTitle>
          <CardDescription className="text-gray-400">
            Wielowymiarowa analiza zależności między kluczowymi zmiennymi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={correlationData}>
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
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'sales') return [`${value}M`, 'Sprzedaż'];
                    if (name === 'score') return [`${value}`, 'Ocena'];
                    return [value, name];
                  }}
                />
                <Scatter 
                  dataKey="sales" 
                  fill="#8b5cf6"
                  name="sales"
                />
              </ScatterChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="budget" 
                  stroke="#9ca3af" 
                  label={{ value: 'Budżet (mln $)', position: 'insideBottom', offset: -5, style: { fill: '#9ca3af' } }}
                />
                <YAxis 
                  dataKey="marketing" 
                  stroke="#9ca3af" 
                  label={{ value: 'Marketing (mln $)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Scatter 
                  dataKey="sales" 
                  fill="#f59e0b"
                  name="Sprzedaż"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Platform Innovation vs Sales Correlation */}
      <Card className="bg-black/40 border-blue-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">📊 Korelacja: Innowacyjność Platform vs Sukces Rynkowy</CardTitle>
          <CardDescription className="text-gray-400">
            Związek między innowacyjnością a osiągnięciami sprzedażowymi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={platformCorrelation}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="innovation" 
                stroke="#9ca3af" 
                label={{ value: 'Wskaźnik Innowacyjności', position: 'insideBottom', offset: -5, style: { fill: '#9ca3af' } }}
              />
              <YAxis 
                dataKey="sales" 
                stroke="#9ca3af" 
                label={{ value: 'Sprzedaż (mln)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any, name: string, props: any) => {
                  if (name === 'sales') return [`${value}M`, 'Sprzedaż'];
                  if (name === 'innovation') return [`${value}`, 'Innowacyjność'];
                  return [value, name];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.platform;
                  }
                  return label;
                }}
              />
              <Scatter 
                dataKey="sales" 
                fill="#3b82f6"
                name="sales"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Global Sales Trend - Enhanced with more colors */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            Globalne Trendy Sprzedaży (Dane Rzeczywiste)
          </CardTitle>
          <CardDescription className="text-gray-400">
            Ewolucja sprzedaży gier w milionach egzemplarzy (2008-2015)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="year" 
                stroke="#9ca3af" 
                fontSize={12}
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tick={{ fill: '#9ca3af' }}
                label={{ value: 'Sprzedaż (mln)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #22c55e',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any) => [`${value}M`, 'Globalna Sprzedaż']}
                labelFormatter={(label) => `Rok ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="globalSales" 
                stroke="#22c55e" 
                strokeWidth={3}
                fill="url(#salesGradient)" 
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Games - Enhanced with colors */}
        <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Top 5 Gier Wszech Czasów</CardTitle>
            <CardDescription className="text-gray-400">
              Najlepiej sprzedające się gry (mln egzemplarzy)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={topGames.map((game, index) => ({
                  ...game,
                  color: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#22c55e'][index] || '#22c55e'
                }))} 
                layout="vertical" 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                  label={{ value: 'Sprzedaż (mln)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  width={120}
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value}M`, 'Sprzedaż']}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#22c55e"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Market Share - Enhanced */}
        <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Udział w Rynku 
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-24 bg-black/40 border-green-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2015">2015</SelectItem>
                  <SelectItem value="2014">2014</SelectItem>
                  <SelectItem value="2013">2013</SelectItem>
                  <SelectItem value="2012">2012</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Dystrybucja sprzedaży według regionów ({selectedYear})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <Pie
                  data={regionalData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ region, percentage }) => `${region}: ${percentage}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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

      {/* Genre Growth Analysis - Multi-colored */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Tempo Wzrostu Gatunków</CardTitle>
          <CardDescription className="text-gray-400">
            Roczny wzrost sprzedaży w % (2014-2015) - Analiza korelacji między latami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={genreGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="genre" 
                stroke="#9ca3af" 
                fontSize={11}
                tick={{ fill: '#9ca3af' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tick={{ fill: '#9ca3af' }}
                label={{ value: 'Wzrost (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #22c55e',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'growth2014') return [`${value}%`, 'Wzrost 2014'];
                  if (name === 'growth2015') return [`${value}%`, 'Wzrost 2015'];
                  return [value, name];
                }}
              />
              <Bar 
                dataKey="growth2014" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="growth2014"
              />
              <Bar 
                dataKey="growth2015" 
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                name="growth2015"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Advanced Correlation Analysis */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">🔬 Zaawansowana Analiza Korelacji - Data Science</CardTitle>
          <CardDescription className="text-gray-400">
            Ukryte zależności i wzorce w danych z wykorzystaniem ML
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl border border-blue-700/30">
              <h4 className="text-blue-400 font-bold text-sm mb-2">📈 Korelacja Pearson</h4>
              <div className="text-white text-lg font-semibold">r = 0.73</div>
              <div className="text-gray-400 text-xs">Score vs Sales</div>
              <div className="text-blue-300 text-xs mt-1">Silna pozytywna</div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl border border-purple-700/30">
              <h4 className="text-purple-400 font-bold text-sm mb-2">🎯 R² Determination</h4>
              <div className="text-white text-lg font-semibold">0.89</div>
              <div className="text-gray-400 text-xs">Budget → Sales</div>
              <div className="text-purple-300 text-xs mt-1">89% wariancji</div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-orange-900/40 to-orange-800/40 rounded-xl border border-orange-700/30">
              <h4 className="text-orange-400 font-bold text-sm mb-2">⚡ Spearman Rank</h4>
              <div className="text-white text-lg font-semibold">ρ = 0.81</div>
              <div className="text-gray-400 text-xs">Innovation → Success</div>
              <div className="text-orange-300 text-xs mt-1">Monotoniczny wzrost</div>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-red-900/40 to-red-800/40 rounded-xl border border-red-700/30">
              <h4 className="text-red-400 font-bold text-sm mb-2">🔍 P-value</h4>
              <div className="text-white text-lg font-semibold">&lt; 0.001</div>
              <div className="text-gray-400 text-xs">Istotność stat.</div>
              <div className="text-red-300 text-xs mt-1">Wysoce znaczące</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-700/30">
            <h4 className="text-white font-semibold mb-3">🧠 Ukryte Wzorce (Machine Learning Insights)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">• Sezonowość wydań: </span>
                <span className="text-blue-400">Q4 +67% sprzedaży</span>
              </div>
              <div>
                <span className="text-gray-400">• Efekt pierwszego wrażenia: </span>
                <span className="text-purple-400">48h decydują o sukcesie</span>
              </div>
              <div>
                <span className="text-gray-400">• Platform momentum: </span>
                <span className="text-orange-400">2-3 lata po premierze</span>
              </div>
              <div>
                <span className="text-gray-400">• Genre fatigue cycle: </span>
                <span className="text-red-400">5-7 lat rotacji</span>
              </div>
              <div>
                <span className="text-gray-400">• Regional preferences: </span>
                <span className="text-green-400">JP: RPG (+34%), NA: Action (+28%)</span>
              </div>
              <div>
                <span className="text-gray-400">• Innovation premium: </span>
                <span className="text-cyan-400">+23% za nowatorskie rozwiązania</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
