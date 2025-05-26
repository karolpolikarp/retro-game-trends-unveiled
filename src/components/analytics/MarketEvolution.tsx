
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from "recharts";

const marketTransformation = [
  { 
    year: "1980", 
    totalSales: 5.2, 
    avgPrice: 25.99, 
    digitalShare: 0, 
    mobileShare: 0,
    innovation: 20,
    diversity: 15
  },
  { 
    year: "1985", 
    totalSales: 45.8, 
    avgPrice: 29.99, 
    digitalShare: 0, 
    mobileShare: 0,
    innovation: 35,
    diversity: 25
  },
  { 
    year: "1990", 
    totalSales: 125.4, 
    avgPrice: 39.99, 
    digitalShare: 0, 
    mobileShare: 0,
    innovation: 50,
    diversity: 40
  },
  { 
    year: "1995", 
    totalSales: 298.7, 
    avgPrice: 49.99, 
    digitalShare: 0, 
    mobileShare: 0,
    innovation: 65,
    diversity: 55
  },
  { 
    year: "2000", 
    totalSales: 445.3, 
    avgPrice: 59.99, 
    digitalShare: 5, 
    mobileShare: 0,
    innovation: 75,
    diversity: 70
  },
  { 
    year: "2005", 
    totalSales: 678.9, 
    avgPrice: 59.99, 
    digitalShare: 15, 
    mobileShare: 5,
    innovation: 85,
    diversity: 80
  },
  { 
    year: "2010", 
    totalSales: 892.4, 
    avgPrice: 59.99, 
    digitalShare: 35, 
    mobileShare: 20,
    innovation: 90,
    diversity: 90
  },
  { 
    year: "2015", 
    totalSales: 1245.7, 
    avgPrice: 59.99, 
    digitalShare: 65, 
    mobileShare: 45,
    innovation: 95,
    diversity: 95
  }
];

const technologyImpact = [
  { technology: "8-bit Era", period: "1980-1990", impact: 70, adoption: 85 },
  { technology: "16-bit Era", period: "1990-1995", impact: 80, adoption: 90 },
  { technology: "3D Graphics", period: "1995-2000", impact: 95, adoption: 75 },
  { technology: "Online Gaming", period: "2000-2005", impact: 85, adoption: 60 },
  { technology: "HD Gaming", period: "2005-2010", impact: 75, adoption: 80 },
  { technology: "Digital Distribution", period: "2005-2015", impact: 90, adoption: 85 },
  { technology: "Mobile Gaming", period: "2007-2015", impact: 80, adoption: 95 }
];

const gameplayEvolution = [
  { era: "1980s", singlePlayer: 95, multiPlayer: 5, online: 0, social: 0 },
  { era: "1990s", singlePlayer: 85, multiPlayer: 15, online: 0, social: 0 },
  { era: "2000s", singlePlayer: 70, multiPlayer: 25, online: 5, social: 0 },
  { era: "2010s", singlePlayer: 40, multiPlayer: 35, online: 20, social: 5 },
  { era: "2015", singlePlayer: 30, multiPlayer: 30, online: 25, social: 15 }
];

export const MarketEvolution = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Market Transformation Overview */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Transformacja Rynku Gier (1980-2015)</CardTitle>
          <CardDescription className="text-gray-400">
            Kluczowe metryki ewolucji branży gamingowej
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart data={marketTransformation}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="digitalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
              <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #6b7280',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="totalSales" 
                stroke="#8b5cf6" 
                fill="url(#salesGradient)"
                name="Sprzedaż (M)"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="digitalShare" 
                stroke="#06b6d4" 
                fill="url(#digitalGradient)"
                name="Udział cyfrowy (%)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="mobileShare" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Udział mobile (%)"
              />
              <Bar 
                yAxisId="right"
                dataKey="innovation" 
                fill="#f59e0b" 
                fillOpacity={0.3}
                name="Indeks innowacji"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Technology Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Wpływ Technologii</CardTitle>
            <CardDescription className="text-gray-400">
              Rewolucyjne technologie w branży gier
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {technologyImpact.map((tech, index) => (
              <div key={tech.technology} className="p-4 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg border border-purple-700/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{tech.technology}</span>
                  <span className="text-gray-400 text-sm">{tech.period}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Wpływ na branżę</span>
                    <span className="text-purple-400">{tech.impact}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${tech.impact}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Adopcja rynkowa</span>
                    <span className="text-cyan-400">{tech.adoption}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-green-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${tech.adoption}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Ewolucja Rozgrywki</CardTitle>
            <CardDescription className="text-gray-400">
              Zmiana preferencji graczy w czasie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={gameplayEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="era" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
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
                  dataKey="singlePlayer" 
                  stackId="1"
                  stroke="#8b5cf6" 
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                  name="Single Player"
                />
                <Area 
                  type="monotone" 
                  dataKey="multiPlayer" 
                  stackId="1"
                  stroke="#06b6d4" 
                  fill="#06b6d4"
                  fillOpacity={0.6}
                  name="Multi Player"
                />
                <Area 
                  type="monotone" 
                  dataKey="online" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Online"
                />
                <Area 
                  type="monotone" 
                  dataKey="social" 
                  stackId="1"
                  stroke="#f59e0b" 
                  fill="#f59e0b"
                  fillOpacity={0.6}
                  name="Social"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Future Predictions */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Kluczowe Wnioski i Trendy</CardTitle>
          <CardDescription className="text-gray-400">
            Analiza transformacji branży gier 1980-2015
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl border border-purple-700/30">
              <h3 className="text-white font-bold text-lg mb-3">Cyfryzacja Rynku</h3>
              <p className="text-gray-300 text-sm mb-4">
                Udział sprzedaży cyfrowej wzrósł z 0% w 2000 roku do 65% w 2015 roku, rewolucjonizując dystrybucję gier.
              </p>
              <div className="text-purple-400 font-semibold">📈 +65% w 15 lat</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 rounded-xl border border-cyan-700/30">
              <h3 className="text-white font-bold text-lg mb-3">Boom Mobile</h3>
              <p className="text-gray-300 text-sm mb-4">
                Gaming mobilny pojawił się w 2007 roku i już w 2015 stanowił 45% rynku, całkowicie zmieniając krajobraz.
              </p>
              <div className="text-cyan-400 font-semibold">📱 45% udziału</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl border border-green-700/30">
              <h3 className="text-white font-bold text-lg mb-3">Wzrost Rynku</h3>
              <p className="text-gray-300 text-sm mb-4">
                Wartość rynku wzrosła z 5M w 1980 do 1.2B w 2015 roku - 24000% wzrostu w 35 lat.
              </p>
              <div className="text-green-400 font-semibold">🚀 240x wzrost</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
