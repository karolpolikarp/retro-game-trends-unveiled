
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from "recharts";

const gameMetrics = [
  { year: "2008", avgPrice: 49.99, gamesReleased: 1487, avgScore: 76.8, playerSatisfaction: 82.3 },
  { year: "2009", avgPrice: 52.99, gamesReleased: 1431, avgScore: 77.2, playerSatisfaction: 83.1 },
  { year: "2010", avgPrice: 54.99, gamesReleased: 1259, avgScore: 78.1, playerSatisfaction: 84.2 },
  { year: "2011", avgPrice: 57.99, gamesReleased: 1139, avgScore: 78.9, playerSatisfaction: 85.1 },
  { year: "2012", avgPrice: 59.99, gamesReleased: 1065, avgScore: 79.4, playerSatisfaction: 86.0 },
  { year: "2013", avgPrice: 59.99, gamesReleased: 1013, avgScore: 80.1, playerSatisfaction: 86.8 },
  { year: "2014", avgPrice: 59.99, gamesReleased: 924, avgScore: 81.2, playerSatisfaction: 87.5 },
  { year: "2015", avgPrice: 59.99, gamesReleased: 848, avgScore: 82.0, playerSatisfaction: 88.2 }
];

const qualityVsSales = [
  { score: 95, sales: 82.7, name: "Wii Sports" },
  { score: 85, sales: 40.2, name: "Super Mario Bros." },
  { score: 89, sales: 37.4, name: "Mario Kart Wii" },
  { score: 82, sales: 33.0, name: "Wii Sports Resort" },
  { score: 91, sales: 31.4, name: "Pokemon Red/Blue" },
  { score: 81, sales: 12.0, name: "Call of Duty: Black Ops" },
  { score: 88, sales: 11.2, name: "Call of Duty: MW3" },
  { score: 97, sales: 11.2, name: "Grand Theft Auto V" },
  { score: 83, sales: 28.0, name: "Duck Hunt" },
  { score: 86, sales: 26.7, name: "Nintendogs" }
];

const marketSaturation = [
  { year: "2008", totalTitles: 1487, uniqueGenres: 12, platformDiversity: 31 },
  { year: "2009", totalTitles: 1431, uniqueGenres: 12, platformDiversity: 33 },
  { year: "2010", totalTitles: 1259, uniqueGenres: 12, platformDiversity: 35 },
  { year: "2011", totalTitles: 1139, uniqueGenres: 12, platformDiversity: 31 },
  { year: "2012", totalTitles: 1065, uniqueGenres: 12, platformDiversity: 29 },
  { year: "2013", totalTitles: 1013, uniqueGenres: 12, platformDiversity: 27 },
  { year: "2014", totalTitles: 924, uniqueGenres: 12, platformDiversity: 25 },
  { year: "2015", totalTitles: 848, uniqueGenres: 12, platformDiversity: 23 }
];

export const GameMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Game Quality and Market Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Jakość vs. Cena Gier</CardTitle>
            <CardDescription className="text-gray-400">
              Ewolucja jakości i cen w branży (2008-2015)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={gameMetrics}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke="#22c55e" 
                  fill="url(#priceGradient)"
                  name="Średnia cena ($)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  name="Średnia ocena"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="playerSatisfaction" 
                  stroke="#15803d" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Satysfakcja graczy (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Jakość vs. Sukces Komercyjny</CardTitle>
            <CardDescription className="text-gray-400">
              Korelacja między oceną a sprzedażą (Top 10 gier)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart data={qualityVsSales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="score" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="Ocena"
                  domain={[75, 100]}
                />
                <YAxis 
                  dataKey="sales" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="Sprzedaż (M)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value, name, props) => {
                    if (name === 'sales') return [`${value}M`, 'Sprzedaż'];
                    if (name === 'score') return [`${value}/100`, 'Ocena'];
                    return [value, name];
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.name;
                    }
                    return '';
                  }}
                />
                <Scatter 
                  dataKey="sales" 
                  fill="#22c55e"
                  fillOpacity={0.8}
                  stroke="#16a34a"
                  strokeWidth={2}
                  r={8}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Saturation Analysis */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Analiza Nasycenia Rynku</CardTitle>
          <CardDescription className="text-gray-400">
            Liczba tytułów, różnorodność gatunków i platform w czasie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={marketSaturation}>
              <defs>
                <linearGradient id="titlesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="diversityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.1}/>
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
                dataKey="totalTitles" 
                stackId="1"
                stroke="#22c55e" 
                fill="url(#titlesGradient)"
                name="Łączne tytuły"
              />
              <Area 
                type="monotone" 
                dataKey="platformDiversity" 
                stackId="2"
                stroke="#16a34a" 
                fill="url(#diversityGradient)"
                name="Różnorodność platform"
              />
              <Line 
                type="monotone" 
                dataKey="uniqueGenres" 
                stroke="#15803d" 
                strokeWidth={3}
                name="Unikalne gatunki"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Kluczowe Insights - Metryki Gier</CardTitle>
          <CardDescription className="text-gray-400">
            Najważniejsze wnioski z analizy jakości i rynku
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">📈 Stabilizacja Cen</h3>
              <p className="text-gray-300 text-sm mb-4">
                Ceny gier ustabilizowały się na poziomie $59.99 od 2012 roku, mimo rosnącej jakości produkcji.
              </p>
              <div className="text-green-400 font-semibold">$59.99 standard</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">⭐ Rosnąca Jakość</h3>
              <p className="text-gray-300 text-sm mb-4">
                Średnia ocena gier wzrosła z 76.8 w 2008 do 82.0 w 2015 roku - trend jakościowy.
              </p>
              <div className="text-green-400 font-semibold">+6.8% wzrost</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">🎯 Konsolidacja Rynku</h3>
              <p className="text-gray-300 text-sm mb-4">
                Liczba wydawanych gier spadła z 1487 w 2008 do 848 w 2015 - fokus na jakość.
              </p>
              <div className="text-green-400 font-semibold">-43% tytułów</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
