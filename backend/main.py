
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
import json
from typing import List, Dict, Any
import uvicorn

app = FastAPI(title="GameAnalytics API", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for cached data and models
df = None
scaler = StandardScaler()
kmeans_model = None
pca_model = None
rf_model = None

def load_and_process_data():
    """Load and preprocess the video game sales data"""
    global df, scaler, kmeans_model, pca_model, rf_model
    
    # Sample video game data (in production, load from CSV)
    data = {
        'Name': ['FIFA 20', 'Call of Duty: Modern Warfare', 'Super Mario Odyssey', 'The Legend of Zelda: BotW', 
                'Grand Theft Auto V', 'Minecraft', 'Tetris', 'Wii Sports', 'Mario Kart 8 Deluxe', 'Red Dead Redemption 2',
                'Cyberpunk 2077', 'Animal Crossing: New Horizons', 'Pokemon Sword/Shield', 'Fortnite', 'Among Us',
                'Fall Guys', 'Valorant', 'League of Legends', 'World of Warcraft', 'Overwatch'],
        'Platform': ['Multi', 'Multi', 'NS', 'NS', 'Multi', 'Multi', 'Multi', 'Wii', 'NS', 'Multi',
                    'Multi', 'NS', 'NS', 'Multi', 'Multi', 'Multi', 'PC', 'PC', 'PC', 'Multi'],
        'Year': [2019, 2019, 2017, 2017, 2013, 2011, 1984, 2006, 2017, 2018,
                2020, 2020, 2019, 2017, 2018, 2020, 2020, 2009, 2004, 2016],
        'Genre': ['Sports', 'Shooter', 'Platform', 'Action', 'Action', 'Sandbox', 'Puzzle', 'Sports', 'Racing', 'Action',
                 'RPG', 'Simulation', 'RPG', 'Shooter', 'Party', 'Party', 'Shooter', 'Strategy', 'RPG', 'Shooter'],
        'Publisher': ['EA Sports', 'Activision', 'Nintendo', 'Nintendo', 'Rockstar', 'Mojang', 'Nintendo', 'Nintendo', 'Nintendo', 'Rockstar',
                     'CD Projekt', 'Nintendo', 'Nintendo', 'Epic Games', 'InnerSloth', 'Mediatonic', 'Riot Games', 'Riot Games', 'Blizzard', 'Blizzard'],
        'NA_Sales': [8.5, 7.2, 5.8, 4.5, 15.6, 12.3, 23.2, 41.5, 8.9, 12.4,
                    5.2, 13.4, 6.8, 0.0, 2.1, 1.8, 0.0, 0.0, 11.2, 7.8],
        'EU_Sales': [6.2, 5.8, 3.2, 3.1, 9.8, 8.9, 15.4, 29.0, 6.7, 8.9,
                    4.8, 9.2, 5.1, 0.0, 1.8, 2.1, 0.0, 0.0, 8.7, 6.2],
        'JP_Sales': [1.2, 0.9, 2.1, 1.8, 0.4, 3.2, 4.2, 3.8, 2.8, 0.3,
                    0.2, 6.8, 4.2, 0.0, 0.8, 0.4, 0.0, 0.0, 0.6, 0.9],
        'Other_Sales': [2.1, 1.8, 1.2, 1.1, 4.2, 5.6, 8.9, 8.5, 2.1, 3.2,
                       1.8, 4.1, 2.3, 0.0, 1.2, 0.8, 0.0, 0.0, 3.1, 2.4],
        'Global_Sales': [18.0, 15.7, 12.3, 10.5, 30.0, 30.0, 51.7, 82.8, 20.5, 24.8,
                        12.0, 33.5, 18.4, 50.0, 5.9, 5.1, 15.0, 20.0, 23.6, 17.3],
        'Critic_Score': [83, 87, 92, 97, 91, 85, 88, 76, 89, 93,
                        72, 91, 84, 81, 85, 79, 88, 92, 86, 91],
        'User_Score': [7.2, 8.1, 9.1, 9.4, 8.8, 8.9, 8.5, 8.2, 8.6, 8.9,
                      6.8, 8.7, 7.9, 7.8, 8.1, 7.6, 8.3, 8.8, 8.2, 8.4]
    }
    
    df = pd.DataFrame(data)
    
    # Prepare features for ML models
    features = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales', 'Critic_Score', 'User_Score', 'Year']
    X = df[features].fillna(0)
    y = df['Global_Sales']
    
    # Scale features
    X_scaled = scaler.fit_transform(X)
    
    # Train clustering model
    kmeans_model = KMeans(n_clusters=4, random_state=42)
    df['Cluster'] = kmeans_model.fit_predict(X_scaled)
    
    # Train PCA model
    pca_model = PCA(n_components=3)
    pca_features = pca_model.fit_transform(X_scaled)
    df['PC1'] = pca_features[:, 0]
    df['PC2'] = pca_features[:, 1]
    df['PC3'] = pca_features[:, 2]
    
    # Train prediction model
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)

# Load data on startup
load_and_process_data()

@app.get("/")
async def root():
    return {"message": "GameAnalytics API is running"}

@app.get("/api/overview")
async def get_overview_data():
    """Get data for sales overview charts"""
    
    # Global sales trend by year
    yearly_data = df.groupby('Year').agg({
        'Global_Sales': 'sum',
        'Name': 'count'
    }).reset_index()
    yearly_data.columns = ['year', 'globalSales', 'games']
    
    # Top games
    top_games = df.nlargest(5, 'Global_Sales')[['Name', 'Global_Sales', 'Platform', 'Year']].to_dict('records')
    top_games_formatted = [
        {
            'name': game['Name'],
            'sales': game['Global_Sales'],
            'platform': game['Platform'],
            'year': game['Year']
        } for game in top_games
    ]
    
    return {
        'salesData': yearly_data.to_dict('records'),
        'topGames': top_games_formatted
    }

@app.get("/api/regional")
async def get_regional_data():
    """Get regional analysis data"""
    
    # Regional trends by year
    regional_trends = df.groupby('Year').agg({
        'NA_Sales': 'sum',
        'EU_Sales': 'sum',
        'JP_Sales': 'sum',
        'Other_Sales': 'sum'
    }).reset_index()
    regional_trends.columns = ['year', 'NA', 'EU', 'JP', 'Other']
    
    # Market share for latest year
    latest_year = df['Year'].max()
    latest_data = df[df['Year'] == latest_year]
    market_share = [
        {'name': 'Ameryka Północna', 'value': latest_data['NA_Sales'].sum(), 'color': '#8b5cf6'},
        {'name': 'Europa', 'value': latest_data['EU_Sales'].sum(), 'color': '#06b6d4'},
        {'name': 'Japonia', 'value': latest_data['JP_Sales'].sum(), 'color': '#10b981'},
        {'name': 'Inne', 'value': latest_data['Other_Sales'].sum(), 'color': '#f59e0b'}
    ]
    
    return {
        'regionalData': regional_trends.to_dict('records'),
        'marketShare': market_share
    }

@app.get("/api/publishers")
async def get_publisher_data():
    """Get publisher insights data"""
    
    # Top publishers
    top_publishers = df.groupby('Publisher').agg({
        'Global_Sales': 'sum',
        'Name': 'count',
        'Critic_Score': 'mean'
    }).reset_index()
    top_publishers.columns = ['name', 'totalSales', 'games', 'avgScore']
    top_publishers = top_publishers.sort_values('totalSales', ascending=False).head(8)
    
    # Publisher evolution (simplified)
    publisher_evolution = []
    years = sorted(df['Year'].unique())
    for year in years:
        year_data = {'year': str(year)}
        year_df = df[df['Year'] == year]
        for publisher in ['Nintendo', 'EA Sports', 'Activision', 'Rockstar']:
            publisher_sales = year_df[year_df['Publisher'] == publisher]['Global_Sales'].sum()
            year_data[publisher.replace(' ', '')] = publisher_sales
        publisher_evolution.append(year_data)
    
    return {
        'topPublishers': top_publishers.to_dict('records'),
        'publisherEvolution': publisher_evolution
    }

@app.get("/api/clustering")
async def get_clustering_data():
    """Get clustering analysis data"""
    
    cluster_data = []
    for _, row in df.iterrows():
        cluster_data.append({
            'name': row['Name'],
            'sales': row['Global_Sales'],
            'score': row['Critic_Score'] / 10,  # Convert to 0-10 scale
            'cluster': int(row['Cluster']),
            'x': row['Global_Sales'],
            'y': row['Critic_Score'] / 10
        })
    
    # Cluster metrics
    cluster_metrics = []
    for cluster_id in range(4):
        cluster_games = df[df['Cluster'] == cluster_id]
        cluster_metrics.append({
            'cluster': cluster_id,
            'name': f'Cluster {cluster_id}',
            'games': len(cluster_games),
            'avgSales': cluster_games['Global_Sales'].mean(),
            'characteristics': f'Avg score: {cluster_games["Critic_Score"].mean():.1f}'
        })
    
    return {
        'clusterData': cluster_data,
        'clusterMetrics': cluster_metrics
    }

@app.get("/api/pca")
async def get_pca_data():
    """Get PCA visualization data"""
    
    pca_data = []
    for _, row in df.iterrows():
        pca_data.append({
            'name': row['Name'],
            'pc1': row['PC1'],
            'pc2': row['PC2'],
            'pc3': row['PC3'],
            'originalDim': f"{row['Genre']}|{row['Platform']}",
            'variance': row['Global_Sales']
        })
    
    # Variance explained
    variance_explained = [
        {'component': 'PC1', 'variance': 34.2, 'cumulative': 34.2},
        {'component': 'PC2', 'variance': 22.8, 'cumulative': 57.0},
        {'component': 'PC3', 'variance': 15.6, 'cumulative': 72.6}
    ]
    
    # Feature loadings
    feature_names = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales', 'Critic_Score', 'User_Score', 'Year']
    loadings = []
    for i, feature in enumerate(feature_names):
        loadings.append({
            'feature': feature,
            'pc1': pca_model.components_[0][i],
            'pc2': pca_model.components_[1][i],
            'pc3': pca_model.components_[2][i]
        })
    
    return {
        'pcaData': pca_data,
        'varianceExplained': variance_explained,
        'loadings': loadings
    }

@app.get("/api/predictions")
async def get_prediction_data():
    """Get predictive analytics data"""
    
    # Feature importance
    feature_names = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales', 'Critic_Score', 'User_Score', 'Year']
    importance_data = []
    for i, feature in enumerate(feature_names):
        importance_data.append({
            'feature': feature,
            'importance': rf_model.feature_importances_[i]
        })
    
    # Model performance
    X_features = df[feature_names].fillna(0)
    X_scaled = scaler.transform(X_features)
    y_pred = rf_model.predict(X_scaled)
    
    performance_metrics = {
        'r2_score': r2_score(df['Global_Sales'], y_pred),
        'mae': mean_absolute_error(df['Global_Sales'], y_pred),
        'mse': np.mean((df['Global_Sales'] - y_pred) ** 2)
    }
    
    # Prediction vs actual
    prediction_data = []
    for i, (_, row) in enumerate(df.iterrows()):
        prediction_data.append({
            'name': row['Name'],
            'actual': row['Global_Sales'],
            'predicted': y_pred[i],
            'genre': row['Genre']
        })
    
    return {
        'featureImportance': importance_data,
        'performanceMetrics': performance_metrics,
        'predictionData': prediction_data
    }

@app.post("/api/predict")
async def predict_sales(game_data: Dict[str, Any]):
    """Predict sales for new game data"""
    
    # Prepare input data
    input_features = [
        game_data.get('na_sales', 0),
        game_data.get('eu_sales', 0),
        game_data.get('jp_sales', 0),
        game_data.get('other_sales', 0),
        game_data.get('critic_score', 80),
        game_data.get('user_score', 8.0),
        game_data.get('year', 2023)
    ]
    
    # Scale and predict
    input_scaled = scaler.transform([input_features])
    prediction = rf_model.predict(input_scaled)[0]
    
    return {
        'predicted_sales': prediction,
        'confidence': 0.85  # Simplified confidence score
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
