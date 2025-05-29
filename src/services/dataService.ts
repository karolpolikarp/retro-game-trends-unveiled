
const API_BASE_URL = 'http://localhost:8000/api';

export interface SalesData {
  year: string;
  globalSales: number;
  games: number;
}

export interface TopGame {
  name: string;
  sales: number;
  platform: string;
  year: number;
}

export interface RegionalData {
  year: string;
  NA: number;
  EU: number;
  JP: number;
  Other: number;
}

export interface MarketShare {
  name: string;
  value: number;
  color: string;
}

export interface PublisherData {
  name: string;
  totalSales: number;
  games: number;
  avgScore: number;
}

export interface ClusterPoint {
  name: string;
  sales: number;
  score: number;
  cluster: number;
  x: number;
  y: number;
}

export interface PCAPoint {
  name: string;
  pc1: number;
  pc2: number;
  pc3: number;
  originalDim: string;
  variance: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

// Sample data fallback when backend is not available
const sampleSalesData = [
  { year: "2008", globalSales: 563.2, games: 1487 },
  { year: "2009", globalSales: 672.4, games: 1431 },
  { year: "2010", globalSales: 720.8, games: 1259 },
  { year: "2011", globalSales: 618.3, games: 1139 },
  { year: "2012", globalSales: 576.1, games: 1065 },
  { year: "2013", globalSales: 504.7, games: 1013 },
  { year: "2014", globalSales: 450.2, games: 924 },
  { year: "2015", globalSales: 392.8, games: 848 }
];

const sampleTopGames = [
  { name: "Wii Sports", sales: 82.74, platform: "Wii", year: 2006 },
  { name: "Super Mario Bros.", sales: 40.24, platform: "NES", year: 1985 },
  { name: "Mario Kart Wii", sales: 37.38, platform: "Wii", year: 2008 },
  { name: "Wii Sports Resort", sales: 33.00, platform: "Wii", year: 2009 },
  { name: "Pokemon Red/Blue", sales: 31.37, platform: "GB", year: 1996 }
];

class DataService {
  async fetchOverviewData() {
    try {
      const response = await fetch(`${API_BASE_URL}/overview`);
      if (!response.ok) throw new Error('Backend not available');
      return response.json();
    } catch (error) {
      console.log('Using sample data - backend not available');
      return {
        salesData: sampleSalesData,
        topGames: sampleTopGames
      };
    }
  }

  async fetchRegionalData() {
    try {
      const response = await fetch(`${API_BASE_URL}/regional`);
      if (!response.ok) throw new Error('Backend not available');
      return response.json();
    } catch (error) {
      console.log('Using sample regional data');
      return {
        regionalData: [
          { year: "2008", NA: 243.1, EU: 181.2, JP: 89.7, Other: 49.2 },
          { year: "2009", NA: 287.4, EU: 203.8, JP: 98.1, Other: 83.1 },
          { year: "2010", NA: 312.5, EU: 224.7, JP: 87.3, Other: 96.3 },
          { year: "2011", NA: 267.2, EU: 189.4, JP: 79.8, Other: 81.9 },
          { year: "2012", NA: 248.6, EU: 174.3, JP: 72.1, Other: 81.1 },
          { year: "2013", NA: 218.7, EU: 152.8, JP: 63.4, Other: 69.8 },
          { year: "2014", NA: 195.3, EU: 136.2, JP: 56.7, Other: 62.0 },
          { year: "2015", NA: 170.8, EU: 119.4, JP: 48.9, Other: 53.7 }
        ],
        marketShare: [
          { name: 'Ameryka Północna', value: 170.8, color: '#22c55e' },
          { name: 'Europa', value: 119.4, color: '#16a34a' },
          { name: 'Japonia', value: 48.9, color: '#15803d' },
          { name: 'Inne', value: 53.7, color: '#166534' }
        ]
      };
    }
  }

  async fetchPublisherData() {
    try {
      const response = await fetch(`${API_BASE_URL}/publishers`);
      if (!response.ok) throw new Error('Backend not available');
      return response.json();
    } catch (error) {
      console.log('Using sample publisher data');
      return {
        topPublishers: [
          { name: "Nintendo", totalSales: 1786.56, games: 703, avgScore: 83.2 },
          { name: "Electronic Arts", totalSales: 1110.32, games: 1351, avgScore: 78.5 },
          { name: "Activision", totalSales: 727.16, games: 975, avgScore: 79.8 },
          { name: "Sony Computer Entertainment", totalSales: 607.50, games: 683, avgScore: 81.4 },
          { name: "Ubisoft", totalSales: 474.29, games: 921, avgScore: 77.2 },
          { name: "Take-Two Interactive", totalSales: 413.35, games: 413, avgScore: 82.1 },
          { name: "THQ", totalSales: 340.8, games: 715, avgScore: 75.8 },
          { name: "Konami Digital Entertainment", totalSales: 283.6, games: 832, avgScore: 78.9 }
        ],
        publisherEvolution: [
          { year: "2008", Nintendo: 185.6, ElectronicArts: 142.3, Activision: 98.7, Rockstar: 45.2 },
          { year: "2009", Nintendo: 203.4, ElectronicArts: 156.8, Activision: 112.4, Rockstar: 52.1 },
          { year: "2010", Nintendo: 178.9, ElectronicArts: 134.2, Activision: 89.3, Rockstar: 38.7 },
          { year: "2011", Nintendo: 156.3, ElectronicArts: 128.9, Activision: 95.8, Rockstar: 67.4 },
          { year: "2012", Nintendo: 143.7, ElectronicArts: 118.2, Activision: 87.1, Rockstar: 42.8 },
          { year: "2013", Nintendo: 134.8, ElectronicArts: 108.7, Activision: 79.6, Rockstar: 89.3 },
          { year: "2014", Nintendo: 125.2, ElectronicArts: 95.3, Activision: 72.8, Rockstar: 34.6 },
          { year: "2015", Nintendo: 118.6, ElectronicArts: 87.9, Activision: 68.2, Rockstar: 28.9 }
        ]
      };
    }
  }

  async fetchClusteringData() {
    try {
      const response = await fetch(`${API_BASE_URL}/clustering`);
      if (!response.ok) throw new Error('Backend not available');
      return response.json();
    } catch (error) {
      console.log('Using sample clustering data');
      return {
        clusterData: [
          { name: "Wii Sports", sales: 82.74, score: 7.6, cluster: 0, x: 82.74, y: 7.6 },
          { name: "Super Mario Bros.", sales: 40.24, score: 8.5, cluster: 1, x: 40.24, y: 8.5 },
          { name: "Mario Kart Wii", sales: 37.38, score: 8.9, cluster: 1, x: 37.38, y: 8.9 },
          { name: "Wii Sports Resort", sales: 33.00, score: 8.2, cluster: 1, x: 33.00, y: 8.2 },
          { name: "Pokemon Red/Blue", sales: 31.37, score: 9.1, cluster: 1, x: 31.37, y: 9.1 },
          { name: "Call of Duty: Black Ops", sales: 12.02, score: 8.1, cluster: 2, x: 12.02, y: 8.1 },
          { name: "Call of Duty: MW3", sales: 11.21, score: 8.8, cluster: 2, x: 11.21, y: 8.8 },
          { name: "Grand Theft Auto V", sales: 11.21, score: 9.7, cluster: 2, x: 11.21, y: 9.7 }
        ],
        clusterMetrics: [
          { cluster: 0, name: "Mega Hits", games: 1, avgSales: 82.74, characteristics: "Exceptional sales outliers" },
          { cluster: 1, name: "Premium AAA", games: 4, avgSales: 35.50, characteristics: "High-quality blockbusters" },
          { cluster: 2, name: "Popular Franchises", games: 3, avgSales: 11.48, characteristics: "Successful series games" }
        ]
      };
    }
  }

  async fetchPCAData() {
    try {
      const response = await fetch(`${API_BASE_URL}/pca`);
      if (!response.ok) throw new Error('Backend not available');
      return response.json();
    } catch (error) {
      console.log('Using sample PCA data');
      return {
        pcaData: [
          { name: "Action Games", pc1: 2.1, pc2: -1.3, pc3: 0.8, originalDim: "Action|Multi", variance: 45.2 },
          { name: "Sports Games", pc1: -1.8, pc2: 2.4, pc3: -0.6, originalDim: "Sports|Multi", variance: 38.7 },
          { name: "RPG Games", pc1: 0.9, pc2: -0.7, pc3: 2.1, originalDim: "RPG|Multi", variance: 41.3 },
          { name: "Shooter Games", pc1: 1.6, pc2: 0.8, pc3: -1.2, originalDim: "Shooter|Multi", variance: 39.8 }
        ],
        varianceExplained: [
          { component: 'PC1', variance: 34.2, cumulative: 34.2 },
          { component: 'PC2', variance: 22.8, cumulative: 57.0 },
          { component: 'PC3', variance: 15.6, cumulative: 72.6 }
        ],
        loadings: [
          { feature: 'NA_Sales', pc1: 0.8, pc2: 0.3, pc3: -0.1 },
          { feature: 'EU_Sales', pc1: 0.7, pc2: -0.4, pc3: 0.2 },
          { feature: 'JP_Sales', pc1: -0.2, pc2: 0.8, pc3: 0.5 },
          { feature: 'Critic_Score', pc1: 0.1, pc2: 0.6, pc3: -0.7 }
        ]
      };
    }
  }

  async fetchPredictionData() {
    try {
      const response = await fetch(`${API_BASE_URL}/predictions`);
      if (!response.ok) throw new Error('Backend not available');
      return response.json();
    } catch (error) {
      console.log('Using sample prediction data');
      return {
        featureImportance: [
          { feature: 'NA_Sales', importance: 0.35 },
          { feature: 'EU_Sales', importance: 0.28 },
          { feature: 'Critic_Score', importance: 0.15 },
          { feature: 'JP_Sales', importance: 0.12 },
          { feature: 'User_Score', importance: 0.06 },
          { feature: 'Year', importance: 0.04 }
        ],
        performanceMetrics: {
          r2_score: 0.89,
          mae: 2.34,
          mse: 8.71
        },
        predictionData: [
          { name: "Wii Sports", actual: 82.74, predicted: 79.32, genre: "Sports" },
          { name: "Super Mario Bros.", actual: 40.24, predicted: 42.18, genre: "Platform" },
          { name: "Mario Kart Wii", actual: 37.38, predicted: 35.67, genre: "Racing" },
          { name: "Call of Duty: Black Ops", actual: 12.02, predicted: 13.45, genre: "Shooter" }
        ]
      };
    }
  }

  async predictSales(gameData: {
    na_sales: number;
    eu_sales: number;
    jp_sales: number;
    other_sales: number;
    critic_score: number;
    user_score: number;
    year: number;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      if (!response.ok) throw new Error('Backend not available');
      return response.json();
    } catch (error) {
      console.log('Using mock prediction');
      // Simple mock prediction based on input
      const totalRegional = gameData.na_sales + gameData.eu_sales + gameData.jp_sales + gameData.other_sales;
      const scoreMultiplier = gameData.critic_score / 100;
      const mockPrediction = totalRegional * (1 + scoreMultiplier);
      
      return {
        predicted_sales: mockPrediction,
        confidence: 0.78
      };
    }
  }
}

export const dataService = new DataService();
