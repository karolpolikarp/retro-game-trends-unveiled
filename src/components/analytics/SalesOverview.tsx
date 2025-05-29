
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";
import { dataService, SalesData, TopGame } from "@/services/dataService";

export const SalesOverview = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topGames, setTopGames] = useState<TopGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <AreaChart data={salesData}>
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
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
              />
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
                dataKey="globalSales" 
                stroke="#22c55e" 
                strokeWidth={2}
                fill="url(#salesGradient)" 
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
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value}M`, 'Sprzedaż']}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#22c55e"
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Games Released Over Time */}
        <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Liczba Wydanych Gier</CardTitle>
            <CardDescription className="text-gray-400">
              Trendy publikacji w czasie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData}>
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
                <Bar 
                  dataKey="games" 
                  fill="#16a34a"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Insights */}
      <Card className="bg-black/40 border-green-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Kluczowe Insights - Przegląd Sprzedaży</CardTitle>
          <CardDescription className="text-gray-400">
            Najważniejsze wnioski z analizy danych sprzedażowych
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">📉 Spadek Sprzedaży</h3>
              <p className="text-gray-300 text-sm mb-4">
                Rynek gier odnotował spadek z 720.8M w 2010 do 392.8M w 2015 - konsolidacja branży.
              </p>
              <div className="text-green-400 font-semibold">-45.5% w 5 lat</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">🎮 Wii Sports Dominuje</h3>
              <p className="text-gray-300 text-sm mb-4">
                Wii Sports z 82.74M sprzedanych egzemplarzy to bezapelacyjny lider wszech czasów.
              </p>
              <div className="text-green-400 font-semibold">82.74M kopii</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">📊 Jakość vs. Ilość</h3>
              <p className="text-gray-300 text-sm mb-4">
                Mniej gier (848 vs. 1487), ale wyższa jakość - trend w kierunku premium content.
              </p>
              <div className="text-green-400 font-semibold">-43% tytułów</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
