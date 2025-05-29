
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

const pcaData = [
  { name: "FIFA 14", pc1: 2.1, pc2: 1.3, originalDim: "Sports|High Sales", variance: 45.2 },
  { name: "Call of Duty", pc1: 1.8, pc2: 0.9, originalDim: "Shooter|AAA", variance: 67.8 },
  { name: "Super Mario", pc1: -1.2, pc2: 2.1, originalDim: "Platform|Nintendo", variance: 23.4 },
  { name: "Tetris", pc1: -2.1, pc2: -0.8, originalDim: "Puzzle|Casual", variance: 89.1 },
  { name: "GTA V", pc1: 3.2, pc2: -1.1, originalDim: "Action|OpenWorld", variance: 156.3 },
  { name: "Wii Sports", pc1: -0.8, pc2: 3.1, originalDim: "Sports|Motion", variance: 234.7 },
  { name: "Minecraft", pc1: 0.5, pc2: -2.3, originalDim: "Sandbox|Creative", variance: 178.9 }
];

const varianceExplained = [
  { component: "PC1", variance: 34.2, cumulative: 34.2 },
  { component: "PC2", variance: 22.8, cumulative: 57.0 },
  { component: "PC3", variance: 15.6, cumulative: 72.6 },
  { component: "PC4", variance: 12.1, cumulative: 84.7 },
  { component: "PC5", variance: 8.9, cumulative: 93.6 },
  { component: "PC6", variance: 6.4, cumulative: 100.0 }
];

const loadings = [
  { feature: "Global_Sales", pc1: 0.76, pc2: 0.23, pc3: -0.15 },
  { feature: "User_Score", pc1: -0.12, pc2: 0.82, pc3: 0.34 },
  { feature: "NA_Sales", pc1: 0.89, pc2: 0.11, pc3: -0.08 },
  { feature: "EU_Sales", pc1: 0.67, pc2: -0.34, pc3: 0.45 },
  { feature: "JP_Sales", pc1: -0.23, pc2: 0.78, pc3: 0.12 },
  { feature: "Critic_Score", pc1: 0.45, pc2: 0.71, pc3: -0.23 }
];

export const PCAVisualization = () => {
  const [selectedComponents, setSelectedComponents] = useState<{x: string, y: string}>({x: "PC1", y: "PC2"});

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Controls */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Analiza Głównych Komponentów (PCA)</CardTitle>
          <CardDescription className="text-gray-400">
            Redukcja wymiarowości i wizualizacja ukrytych wzorców w danych
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <div className="text-sm text-gray-300">
            Wyświetlane komponenty: {selectedComponents.x} vs {selectedComponents.y}
          </div>
          <Button 
            variant="outline" 
            className="border-purple-700/50 text-purple-300"
            onClick={() => setSelectedComponents({x: "PC1", y: "PC3"})}
          >
            PC1 vs PC3
          </Button>
          <Button 
            variant="outline" 
            className="border-purple-700/50 text-purple-300"
            onClick={() => setSelectedComponents({x: "PC2", y: "PC3"})}
          >
            PC2 vs PC3
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600">
            Regeneruj PCA
          </Button>
        </CardContent>
      </Card>

      {/* Main PCA Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Przestrzeń Głównych Komponentów</CardTitle>
            <CardDescription className="text-gray-400">
              Projekcja gier w zredukowanej przestrzeni wymiarowej
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={pcaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="pc1" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="PC1 (34.2% wariancji)"
                />
                <YAxis 
                  dataKey="pc2" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  name="PC2 (22.8% wariancji)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #6b7280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'pc1') return [`${value}`, 'PC1'];
                    if (name === 'pc2') return [`${value}`, 'PC2'];
                    return [value, name];
                  }}
                />
                <Scatter 
                  dataKey="pc2" 
                  fill="#8b5cf6"
                  fillOpacity={0.7}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Wariancja Wyjaśniona</CardTitle>
            <CardDescription className="text-gray-400">
              Ile informacji zachowuje każdy komponent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={varianceExplained}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="component" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #6b7280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'variance') return [`${value}%`, 'Wariancja'];
                    if (name === 'cumulative') return [`${value}%`, 'Skumulowana'];
                    return [value, name];
                  }}
                />
                <Bar dataKey="variance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cumulative" fill="#06b6d4" fillOpacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feature Loadings */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Ładunki Cech (Loadings)</CardTitle>
          <CardDescription className="text-gray-400">
            Wpływ oryginalnych zmiennych na główne komponenty
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-800/30">
                  <th className="text-left text-gray-300 py-2">Cecha</th>
                  <th className="text-center text-gray-300 py-2">PC1</th>
                  <th className="text-center text-gray-300 py-2">PC2</th>
                  <th className="text-center text-gray-300 py-2">PC3</th>
                  <th className="text-left text-gray-300 py-2">Interpretacja</th>
                </tr>
              </thead>
              <tbody>
                {loadings.map((loading, index) => (
                  <tr key={loading.feature} className="border-b border-purple-800/20">
                    <td className="text-white py-2">{loading.feature}</td>
                    <td className="text-center py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        Math.abs(loading.pc1) > 0.5 ? 'bg-purple-600/30 text-purple-300' : 'text-gray-400'
                      }`}>
                        {loading.pc1.toFixed(2)}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        Math.abs(loading.pc2) > 0.5 ? 'bg-cyan-600/30 text-cyan-300' : 'text-gray-400'
                      }`}>
                        {loading.pc2.toFixed(2)}
                      </span>
                    </td>
                    <td className="text-center py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        Math.abs(loading.pc3) > 0.5 ? 'bg-green-600/30 text-green-300' : 'text-gray-400'
                      }`}>
                        {loading.pc3.toFixed(2)}
                      </span>
                    </td>
                    <td className="text-gray-400 py-2 text-xs">
                      {loading.feature === 'Global_Sales' && 'Główny driver PC1 - sukces komercyjny'}
                      {loading.feature === 'User_Score' && 'Silny wpływ na PC2 - jakość gry'}
                      {loading.feature === 'NA_Sales' && 'Dominuje PC1 - rynek amerykański'}
                      {loading.feature === 'EU_Sales' && 'Balansuje PC1/PC3 - Europa'}
                      {loading.feature === 'JP_Sales' && 'Charakteryzuje PC2 - specyfika JP'}
                      {loading.feature === 'Critic_Score' && 'Wpływa na PC2 - oceny krytyków'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* PCA Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">PC1: Sukces Komercyjny</CardTitle>
            <CardDescription className="text-gray-400">34.2% wariancji</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs text-gray-400">
              • Silna korelacja ze sprzedażą globalną
            </div>
            <div className="text-xs text-gray-400">
              • Dominacja rynku północnoamerykańskiego
            </div>
            <div className="text-xs text-gray-400">
              • Gry AAA vs niszowe produkcje
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">PC2: Jakość vs Popularność</CardTitle>
            <CardDescription className="text-gray-400">22.8% wariancji</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs text-gray-400">
              • Oceny użytkowników i krytyków
            </div>
            <div className="text-xs text-gray-400">
              • Specyfika rynku japońskiego
            </div>
            <div className="text-xs text-gray-400">
              • Gry artystyczne vs masowe
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">PC3: Regionalizacja</CardTitle>
            <CardDescription className="text-gray-400">15.6% wariancji</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs text-gray-400">
              • Różnice między rynkami EU/NA
            </div>
            <div className="text-xs text-gray-400">
              • Preferencje kulturowe
            </div>
            <div className="text-xs text-gray-400">
              • Lokalizacja vs globalność
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
