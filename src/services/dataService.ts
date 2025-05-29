
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

class DataService {
  async fetchOverviewData() {
    const response = await fetch(`${API_BASE_URL}/overview`);
    if (!response.ok) throw new Error('Failed to fetch overview data');
    return response.json();
  }

  async fetchRegionalData() {
    const response = await fetch(`${API_BASE_URL}/regional`);
    if (!response.ok) throw new Error('Failed to fetch regional data');
    return response.json();
  }

  async fetchPublisherData() {
    const response = await fetch(`${API_BASE_URL}/publishers`);
    if (!response.ok) throw new Error('Failed to fetch publisher data');
    return response.json();
  }

  async fetchClusteringData() {
    const response = await fetch(`${API_BASE_URL}/clustering`);
    if (!response.ok) throw new Error('Failed to fetch clustering data');
    return response.json();
  }

  async fetchPCAData() {
    const response = await fetch(`${API_BASE_URL}/pca`);
    if (!response.ok) throw new Error('Failed to fetch PCA data');
    return response.json();
  }

  async fetchPredictionData() {
    const response = await fetch(`${API_BASE_URL}/predictions`);
    if (!response.ok) throw new Error('Failed to fetch prediction data');
    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    if (!response.ok) throw new Error('Failed to predict sales');
    return response.json();
  }
}

export const dataService = new DataService();
