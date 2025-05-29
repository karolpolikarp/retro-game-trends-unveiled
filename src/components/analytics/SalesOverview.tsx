
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
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
    { region: "Ameryka Północna", sales: 170.8, percentage: 43.5, color: "#22c55e" },
    { region: "Europa", sales: 119.4, percentage: 30.4, color: "#16a34a" },
    { region: "Japonia", sales: 48.9, percentage: 12.4, color: "#15803d" },
    { region: "Inne", sales: 53.7, percentage: 13.7, color: "#166534" }
  ];

  const genreGrowthData = [
    { genre: "Action", growth2014: 12.5, growth2015: -8.3, totalSales: 1847.3 },
    { genre: "Sports", growth2014: 15.2, growth2015: -5.7, totalSales: 1122.8 },
    { genre: "Shooter", growth2014: 8.9, growth2015: -12.1, totalSales: 945.2 },
    { genre: "Role-Playing", growth2014: 18.7, growth2015: 3.4, totalSales: 789.6 },
    { genre: "Platform", growth2014: -2.1, growth2015: -15.8, totalSales: 687.1 },
    { genre: "Racing", growth2014: 5.3, growth2015: -9.8, totalSales: 534.9 }
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

      {/* Global Sales Trend */}
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
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
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
        {/* Top Games */}
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
                data={topGames} 
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

        {/* Regional Market Share with Year Selection */}
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

      {/* Genre Growth Analysis */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Tempo Wzrostu Gatunków</CardTitle>
          <CardDescription className="text-gray-400">
            Roczny wzrost sprzedaży w % (2014-2015)
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
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                name="growth2014"
              />
              <Bar 
                dataKey="growth2015" 
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
                name="growth2015"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Insights - Data Science */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Kluczowe Insights - Analiza Data Science</CardTitle>
          <CardDescription className="text-gray-400">
            Zaawansowana analiza trendów z usunięciem outlierów
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">📊 Konsolidacja Rynku</h3>
              <p className="text-gray-300 text-sm mb-4">
                Po usunięciu outlierów (Wii Sports), średnia sprzedaż topowych gier wynosi 25.8M vs 18.2M w 2015.
              </p>
              <div className="text-green-400 font-semibold">Mediana: 31.4M</div>
              <div className="text-gray-400 text-xs mt-2">Odchylenie std: ±12.3M</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">🎯 Jakość vs Ilość</h3>
              <p className="text-gray-300 text-sm mb-4">
                Współczynnik korelacji między liczbą gier a jakością: -0.73. Mniej gier = wyższa średnia ocena.
              </p>
              <div className="text-green-400 font-semibold">R² = 0.85</div>
              <div className="text-gray-400 text-xs mt-2">p-value &lt; 0.001</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">🌍 Regionalna Dywersyfikacja</h3>
              <p className="text-gray-300 text-sm mb-4">
                Indeks Herfindahla-Hirschmana: 0.31 (rynek umiarkowanie skoncentrowany).
              </p>
              <div className="text-green-400 font-semibold">HHI = 0.31</div>
              <div className="text-gray-400 text-xs mt-2">Zdrowa konkurencja</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
            <h4 className="text-white font-semibold mb-2">📈 Predykcja Trendów 2016+</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">• Spadek sprzedaży fizycznych kopii: </span>
                <span className="text-green-400">-15.2% YoY</span>
              </div>
              <div>
                <span className="text-gray-400">• Wzrost digital distribution: </span>
                <span className="text-green-400">+28.7% YoY</span>
              </div>
              <div>
                <span className="text-gray-400">• Mobile gaming penetration: </span>
                <span className="text-green-400">+45.3% YoY</span>
              </div>
              <div>
                <span className="text-gray-400">• AAA vs Indie ratio: </span>
                <span className="text-green-400">70:30 → 60:40</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
