
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";

const clusterData = [
  { name: "FIFA 14", sales: 245.7, score: 8.1, cluster: 0, x: 245.7, y: 8.1 },
  { name: "Call of Duty: MW3", sales: 189.3, score: 8.5, cluster: 0, x: 189.3, y: 8.5 },
  { name: "Super Mario Bros.", sales: 40.2, score: 9.2, cluster: 1, x: 40.2, y: 9.2 },
  { name: "Mario Kart Wii", sales: 37.4, score: 9.0, cluster: 1, x: 37.4, y: 9.0 },
  { name: "Tetris", sales: 35.8, score: 8.8, cluster: 2, x: 35.8, y: 8.8 },
  { name: "Brain Age", sales: 19.0, score: 7.3, cluster: 2, x: 19.0, y: 7.3 },
  { name: "Nintendogs", sales: 24.8, score: 8.2, cluster: 2, x: 24.8, y: 8.2 },
  { name: "Grand Theft Auto V", sales: 165.2, score: 9.7, cluster: 3, x: 165.2, y: 9.7 },
  { name: "Red Dead Redemption", sales: 78.4, score: 9.5, cluster: 3, x: 78.4, y: 9.5 }
];

const clusterColors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const clusterMetrics = [
  { cluster: 0, name: "Masowe AAA", games: 145, avgSales: 85.2, characteristics: "Wysokie budżety, szeroki appeal" },
  { cluster: 1, name: "Nintendo Premium", games: 67, avgSales: 25.8, characteristics: "Wysoka jakość, długowieczność" },
  { cluster: 2, name: "Casual/Mobile", games: 234, avgSales: 12.4, characteristics: "Łatwa dostępność, szybka rozgrywka" },
  { cluster: 3, name: "Hardcore RPG", games: 89, avgSales: 45.7, characteristics: "Głęboka mechanika, długie sesje" }
];

export const ClusteringDashboard = () => {
  const [algorithm, setAlgorithm] = useState("kmeans");
  const [clusters, setClusters] = useState("4");

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Controls */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Konfiguracja Clusteringu</CardTitle>
          <CardDescription className="text-gray-400">
            Dostosuj parametry algorytmu grupowania
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Algorytm</label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="bg-black/30 border-purple-700/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-700/50">
                <SelectItem value="kmeans">K-Means</SelectItem>
                <SelectItem value="dbscan">DBSCAN</SelectItem>
                <SelectItem value="hierarchical">Hierarchical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Liczba klastrów</label>
            <Select value={clusters} onValueChange={setClusters}>
              <SelectTrigger className="bg-black/30 border-purple-700/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-700/50">
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600">
            Uruchom Clustering
          </Button>
        </CardContent>
      </Card>

      {/* Cluster Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Wizualizacja Klastrów</CardTitle>
            <CardDescription className="text-gray-400">
              Sprzedaż vs Ocena - grupowanie gier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={clusterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="x" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="Sprzedaż (mln)"
                />
                <YAxis 
                  dataKey="y" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="Ocena"
                  domain={[6, 10]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #6b7280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'x') return [`${value}M`, 'Sprzedaż'];
                    if (name === 'y') return [`${value}`, 'Ocena'];
                    return [value, name];
                  }}
                />
                <Scatter dataKey="sales" fill="#8b5cf6">
                  {clusterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={clusterColors[entry.cluster]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Charakterystyka Klastrów</CardTitle>
            <CardDescription className="text-gray-400">
              Analiza segmentów rynkowych
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {clusterMetrics.map((cluster, index) => (
              <div 
                key={cluster.cluster} 
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: `${clusterColors[index]}20`,
                  borderColor: `${clusterColors[index]}50`
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{cluster.name}</span>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">{cluster.games} gier</div>
                    <div className="text-sm text-gray-400">Śr. {cluster.avgSales}M</div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">{cluster.characteristics}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cluster Insights */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Insights z Clusteringu</CardTitle>
          <CardDescription className="text-gray-400">
            Kluczowe wnioski z analizy skupień
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Silhouette Score</h4>
            <div className="text-2xl font-bold text-purple-400">0.73</div>
            <p className="text-xs text-gray-400">Jakość podziału</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Inertia</h4>
            <div className="text-2xl font-bold text-cyan-400">1,245</div>
            <p className="text-xs text-gray-400">Wariancja wewnętrzna</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Davies-Bouldin</h4>
            <div className="text-2xl font-bold text-green-400">0.42</div>
            <p className="text-xs text-gray-400">Separacja klastrów</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Optymalne K</h4>
            <div className="text-2xl font-bold text-yellow-400">4</div>
            <p className="text-xs text-gray-400">Metoda łokcia</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
