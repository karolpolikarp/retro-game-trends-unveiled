
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

const predictionData = [
  { year: "2016", actual: null, predicted: 156.8, confidence: [145.2, 168.4] },
  { year: "2017", actual: null, predicted: 167.3, confidence: [154.1, 180.5] },
  { year: "2018", actual: null, predicted: 178.9, confidence: [163.7, 194.1] },
  { year: "2019", actual: null, predicted: 191.2, confidence: [174.8, 207.6] },
  { year: "2020", actual: null, predicted: 204.7, confidence: [187.3, 222.1] }
];

const historicalData = [
  { year: "2010", actual: 1234.5, predicted: null },
  { year: "2011", actual: 1456.7, predicted: null },
  { year: "2012", actual: 1578.9, predicted: null },
  { year: "2013", actual: 1689.2, predicted: null },
  { year: "2014", actual: 1834.6, predicted: null },
  { year: "2015", actual: 1923.4, predicted: null }
];

const modelMetrics = [
  { metric: "R² Score", value: 0.892, description: "Jakość dopasowania modelu" },
  { metric: "MAE", value: 45.7, description: "Średni błąd absolutny (mln)" },
  { metric: "RMSE", value: 67.3, description: "Pierwiastek błędu średniokwadratowego" },
  { metric: "MAPE", value: 8.4, description: "Średni błąd procentowy (%)" }
];

const featureImportance = [
  { feature: "Platform_Popularity", importance: 0.34, description: "Popularność platformy" },
  { feature: "Genre_Trend", importance: 0.28, description: "Trend gatunku" },
  { feature: "Publisher_Size", importance: 0.19, description: "Wielkość wydawcy" },
  { feature: "Release_Season", importance: 0.12, description: "Sezon premiery" },
  { feature: "Marketing_Budget", importance: 0.07, description: "Budżet marketingowy" }
];

export const PredictiveAnalytics = () => {
  const [gameGenre, setGameGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [publisher, setPublisher] = useState("");
  const [rating, setRating] = useState("");
  const [prediction, setPrediction] = useState<number | null>(null);

  const handlePredict = () => {
    // Symulacja predykcji
    const baseSales = Math.random() * 100 + 20;
    const genreMultiplier = gameGenre === "Action" ? 1.5 : gameGenre === "Sports" ? 1.3 : 1.0;
    const platformMultiplier = platform === "PS4" ? 1.4 : platform === "PC" ? 1.2 : 1.0;
    
    setPrediction(baseSales * genreMultiplier * platformMultiplier);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Prediction Form */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Predykcja Sprzedaży Gry</CardTitle>
          <CardDescription className="text-gray-400">
            Wprowadź parametry gry aby przewidzieć sprzedaż
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Gatunek</label>
              <Select value={gameGenre} onValueChange={setGameGenre}>
                <SelectTrigger className="bg-black/30 border-purple-700/50">
                  <SelectValue placeholder="Wybierz gatunek" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-700/50">
                  <SelectItem value="Action">Action</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Shooter">Shooter</SelectItem>
                  <SelectItem value="RPG">RPG</SelectItem>
                  <SelectItem value="Platform">Platform</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Platforma</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="bg-black/30 border-purple-700/50">
                  <SelectValue placeholder="Wybierz platformę" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-700/50">
                  <SelectItem value="PS4">PlayStation 4</SelectItem>
                  <SelectItem value="Xbox">Xbox One</SelectItem>
                  <SelectItem value="PC">PC</SelectItem>
                  <SelectItem value="Switch">Nintendo Switch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Wydawca</label>
              <Select value={publisher} onValueChange={setPublisher}>
                <SelectTrigger className="bg-black/30 border-purple-700/50">
                  <SelectValue placeholder="Wybierz wydawcę" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-700/50">
                  <SelectItem value="EA">Electronic Arts</SelectItem>
                  <SelectItem value="Activision">Activision</SelectItem>
                  <SelectItem value="Ubisoft">Ubisoft</SelectItem>
                  <SelectItem value="Nintendo">Nintendo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Ocena ESRB</label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger className="bg-black/30 border-purple-700/50">
                  <SelectValue placeholder="Wybierz rating" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-700/50">
                  <SelectItem value="E">E (Everyone)</SelectItem>
                  <SelectItem value="T">T (Teen)</SelectItem>
                  <SelectItem value="M">M (Mature)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handlePredict}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600"
                disabled={!gameGenre || !platform || !publisher || !rating}
              >
                Przewiduj Sprzedaż
              </Button>
            </div>
          </div>

          {prediction && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-900/40 to-green-800/40 rounded-lg border border-green-700/30">
              <h4 className="text-white font-semibold mb-2">Przewidywana Sprzedaż</h4>
              <div className="text-3xl font-bold text-green-400">{prediction.toFixed(1)}M egzemplarzy</div>
              <div className="text-sm text-gray-400 mt-1">
                Przedział ufności: {(prediction * 0.8).toFixed(1)}M - {(prediction * 1.2).toFixed(1)}M
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Market Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Prognoza Rynku (2016-2020)</CardTitle>
            <CardDescription className="text-gray-400">
              Przewidywany wzrost sprzedaży gier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[...historicalData, ...predictionData]}>
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
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Rzeczywiste"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Przewidywane"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Ważność Cech</CardTitle>
            <CardDescription className="text-gray-400">
              Wpływ różnych zmiennych na predykcję
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureImportance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="feature" 
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
                  formatter={(value: any) => [`${(value * 100).toFixed(1)}%`, 'Ważność']}
                />
                <Bar 
                  dataKey="importance" 
                  fill="#8b5cf6"
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Model Performance */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Wydajność Modelu</CardTitle>
          <CardDescription className="text-gray-400">
            Metryki jakości algorytmu predykcyjnego
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modelMetrics.map((metric, index) => (
              <div key={metric.metric} className="p-4 bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-lg">
                <h4 className="text-white font-semibold mb-1">{metric.metric}</h4>
                <div className="text-2xl font-bold text-purple-400">
                  {metric.metric === "R² Score" ? metric.value.toFixed(3) : 
                   metric.metric === "MAPE" ? `${metric.value}%` : 
                   metric.value.toFixed(1)}
                </div>
                <p className="text-xs text-gray-400 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
