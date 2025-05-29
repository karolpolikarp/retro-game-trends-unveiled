
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
      } catch (err) {
        console.error('Error fetching overview data:', err);
        setError('Failed to load data. Make sure Python backend is running on port 8000.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2 bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40">
              <div className="text-white">Loading data...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2 bg-black/40 border-red-800/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-40">
              <div className="text-red-400">{error}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Global Sales Trend */}
      <Card className="lg:col-span-2 bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            Globalne Trendy Sprzedaży (Dane Rzeczywiste)
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
