
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Globe, Gamepad2, Users, DollarSign } from "lucide-react";
import { SalesOverview } from "@/components/analytics/SalesOverview";
import { RegionalAnalysis } from "@/components/analytics/RegionalAnalysis";
import { PlatformTrends } from "@/components/analytics/PlatformTrends";
import { GenreDistribution } from "@/components/analytics/GenreDistribution";
import { PublisherInsights } from "@/components/analytics/PublisherInsights";
import { MarketEvolution } from "@/components/analytics/MarketEvolution";
import { MLDashboard } from "@/components/analytics/MLDashboard";
import { GameMetrics } from "@/components/analytics/GameMetrics";
import { PlatformAnalysis } from "@/components/analytics/PlatformAnalysis";

const Index = () => {
  const [selectedMetric, setSelectedMetric] = useState("global");

  const metrics = [
    {
      title: "Globalna Sprzedaż",
      value: "8,923M",
      change: "+12.5%",
      icon: Globe,
      color: "text-green-500"
    },
    {
      title: "Aktywne Platformy",
      value: "31",
      change: "+5",
      icon: Gamepad2,
      color: "text-green-400"
    },
    {
      title: "Wydawcy",
      value: "579",
      change: "+23",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Średnia Cena",
      value: "$59.99",
      change: "+2.1%",
      icon: DollarSign,
      color: "text-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-black">
      {/* Header */}
      <div className="border-b border-green-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">GameAnalytics Pro</h1>
                <p className="text-gray-400 text-sm">Kompleksowa analiza rynku gier wideo 1980-2015 + AI/ML</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              Eksportuj Raport
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="bg-black/40 border-green-800/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <p className="text-xs text-green-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Analytics Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/40 border-green-800/30 backdrop-blur-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Przegląd
            </TabsTrigger>
            <TabsTrigger value="regional" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Analiza Regionalna
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Platformy
            </TabsTrigger>
            <TabsTrigger value="platform-analysis" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Analiza Platform
            </TabsTrigger>
            <TabsTrigger value="genres" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Gatunki
            </TabsTrigger>
            <TabsTrigger value="publishers" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Wydawcy
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Metryki Gier
            </TabsTrigger>
            <TabsTrigger value="evolution" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              Ewolucja Rynku
            </TabsTrigger>
            <TabsTrigger value="ml" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-300">
              AI & Machine Learning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <SalesOverview />
          </TabsContent>

          <TabsContent value="regional">
            <RegionalAnalysis />
          </TabsContent>

          <TabsContent value="platforms">
            <PlatformTrends />
          </TabsContent>

          <TabsContent value="platform-analysis">
            <PlatformAnalysis />
          </TabsContent>

          <TabsContent value="genres">
            <GenreDistribution />
          </TabsContent>

          <TabsContent value="publishers">
            <PublisherInsights />
          </TabsContent>

          <TabsContent value="metrics">
            <GameMetrics />
          </TabsContent>

          <TabsContent value="evolution">
            <MarketEvolution />
          </TabsContent>

          <TabsContent value="ml">
            <MLDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
