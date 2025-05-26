
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const platformData = [
  { year: "1985", NES: 156.8, GB: 0, SNES: 0, PS: 0, PS2: 0, Wii: 0, X360: 0, PS3: 0 },
  { year: "1990", NES: 189.4, GB: 45.7, SNES: 23.4, PS: 0, PS2: 0, Wii: 0, X360: 0, PS3: 0 },
  { year: "1995", NES: 123.2, GB: 89.3, SNES: 234.7, PS: 167.4, PS2: 0, Wii: 0, X360: 0, PS3: 0 },
  { year: "2000", NES: 45.6, GB: 67.8, SNES: 156.3, PS: 345.2, PS2: 289.7, Wii: 0, X360: 0, PS3: 0 },
  { year: "2005", NES: 12.3, GB: 23.4, SNES: 67.8, PS: 234.1, PS2: 567.9, Wii: 134.5, X360: 45.7, PS3: 0 },
  { year: "2010", NES: 5.2, GB: 8.9, SNES: 23.4, PS: 89.3, PS2: 345.6, Wii: 456.7, X360: 378.4, PS3: 234.8 },
  { year: "2015", NES: 2.1, GB: 3.4, SNES: 8.9, PS: 34.2, PS2: 123.4, Wii: 289.5, X360: 267.8, PS3: 345.9 }
];

const platformLifecycle = [
  { platform: "NES", launch: 1985, peak: 1990, decline: 1995, sales: 189.4 },
  { platform: "PlayStation", launch: 1995, peak: 2000, decline: 2005, sales: 345.2 },
  { platform: "PlayStation 2", launch: 2000, peak: 2005, decline: 2010, sales: 567.9 },
  { platform: "Wii", launch: 2006, peak: 2010, decline: 2015, sales: 456.7 },
  { platform: "Xbox 360", launch: 2005, peak: 2010, decline: 2015, sales: 378.4 },
  { platform: "PlayStation 3", launch: 2006, peak: 2015, decline: 2020, sales: 345.9 }
];

export const PlatformTrends = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Platform Evolution */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Ewolucja Platform Gamingowych</CardTitle>
          <CardDescription className="text-gray-400">
            Cykle życia głównych platform (mln egzemplarzy)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart data={platformData}>
              <defs>
                <linearGradient id="nesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="psGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="ps2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="wiiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
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
              <Area 
                type="monotone" 
                dataKey="NES" 
                stackId="1"
                stroke="#8b5cf6" 
                fill="url(#nesGradient)"
                name="NES"
              />
              <Area 
                type="monotone" 
                dataKey="PS" 
                stackId="1"
                stroke="#06b6d4" 
                fill="url(#psGradient)"
                name="PlayStation"
              />
              <Area 
                type="monotone" 
                dataKey="PS2" 
                stackId="1"
                stroke="#10b981" 
                fill="url(#ps2Gradient)"
                name="PlayStation 2"
              />
              <Area 
                type="monotone" 
                dataKey="Wii" 
                stackId="1"
                stroke="#f59e0b" 
                fill="url(#wiiGradient)"
                name="Wii"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Platform Lifecycle Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Szczyt Sprzedaży Platform</CardTitle>
            <CardDescription className="text-gray-400">
              Maksymalne roczne sprzedaże każdej platformy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformLifecycle}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="platform" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #6b7280',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any) => [`${value}M`, 'Szczyt sprzedaży']}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Analiza Cyklu Życia</CardTitle>
            <CardDescription className="text-gray-400">
              Kluczowe momenty w historii platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformLifecycle.slice(0, 4).map((platform, index) => (
              <div key={platform.platform} className="p-3 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{platform.platform}</span>
                  <span className="text-gray-400 text-sm">{platform.sales}M</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Launch: {platform.launch}</div>
                  <div>Peak: {platform.peak}</div>
                  <div>Decline: {platform.decline}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
