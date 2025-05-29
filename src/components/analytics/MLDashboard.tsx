
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Zap, Target } from "lucide-react";
import { ClusteringDashboard } from "./ClusteringDashboard";
import { PCAVisualization } from "./PCAVisualization";
import { PredictiveAnalytics } from "./PredictiveAnalytics";

const mlMetrics = [
  {
    title: "Modele Aktywne",
    value: "8",
    change: "+2",
    icon: Brain,
    color: "text-purple-500"
  },
  {
    title: "Dokładność Predykcji",
    value: "89.2%",
    change: "+3.1%",
    icon: Target,
    color: "text-green-500"
  },
  {
    title: "Klastrów Wykrytych",
    value: "12",
    change: "+1",
    icon: Zap,
    color: "text-cyan-500"
  },
  {
    title: "Wzorców Znalezionych",
    value: "47",
    change: "+8",
    icon: TrendingUp,
    color: "text-yellow-500"
  }
];

const recentAnalyses = [
  {
    type: "Clustering",
    title: "Segmentacja gier AAA",
    status: "Completed",
    accuracy: "94.2%",
    timestamp: "2 min temu"
  },
  {
    type: "PCA",
    title: "Redukcja wymiarów dataset",
    status: "Running",
    accuracy: "87.5%",
    timestamp: "5 min temu"
  },
  {
    type: "Prediction",
    title: "Prognoza Q1 2024",
    status: "Scheduled",
    accuracy: "-",
    timestamp: "10 min temu"
  }
];

export const MLDashboard = () => {
  return (
    <div className="space-y-6">
      {/* ML Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mlMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-black/40 border-purple-800/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-300">
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

      {/* Recent ML Analyses */}
      <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Ostatnie Analizy ML</CardTitle>
          <CardDescription className="text-gray-400">
            Status bieżących i zakończonych analiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAnalyses.map((analysis, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    analysis.status === 'Completed' ? 'bg-green-500' :
                    analysis.status === 'Running' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                  <div>
                    <div className="text-white font-medium">{analysis.title}</div>
                    <div className="text-xs text-gray-400">{analysis.type} • {analysis.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-300">{analysis.status}</div>
                  <div className="text-xs text-gray-400">{analysis.accuracy}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ML Techniques Tabs */}
      <Tabs defaultValue="clustering" className="space-y-6">
        <TabsList className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
          <TabsTrigger value="clustering" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Clustering
          </TabsTrigger>
          <TabsTrigger value="pca" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            PCA & Redukcja
          </TabsTrigger>
          <TabsTrigger value="prediction" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Predykcja
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clustering">
          <ClusteringDashboard />
        </TabsContent>

        <TabsContent value="pca">
          <PCAVisualization />
        </TabsContent>

        <TabsContent value="prediction">
          <PredictiveAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
