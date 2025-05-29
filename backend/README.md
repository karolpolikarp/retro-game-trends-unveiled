
# GameAnalytics Backend

Python FastAPI backend providing ML-powered analytics for video game sales data.

## Features

- **Real Data Processing**: Loads and processes video game sales datasets
- **Machine Learning**: K-means clustering, PCA analysis, and sales prediction
- **RESTful API**: FastAPI endpoints for all analytics data
- **CORS Support**: Configured for React frontend integration
- **Interactive Documentation**: Automatic API docs at `/docs`

## Quick Start

### 1. Start the Backend Server

```bash
cd backend
python start.py
```

This will:
- Install all required Python packages
- Start the FastAPI server on port 8000
- Enable auto-reload for development

### 2. Verify Installation

- API: http://localhost:8000
- Documentation: http://localhost:8000/docs
- Test endpoint: http://localhost:8000/api/overview

## API Endpoints

### Data Analytics
- `GET /api/overview` - Sales overview and top games
- `GET /api/regional` - Regional market analysis
- `GET /api/publishers` - Publisher insights and trends

### Machine Learning
- `GET /api/clustering` - K-means clustering analysis
- `GET /api/pca` - Principal Component Analysis
- `GET /api/predictions` - Model performance and feature importance
- `POST /api/predict` - Predict sales for new game data

## Data Science Features

### Clustering Analysis
- K-means clustering of games by sales patterns
- Interactive cluster visualization
- Cluster characteristics and insights

### PCA (Principal Component Analysis)
- Dimensionality reduction for data visualization
- Feature importance analysis
- Variance explained by components

### Predictive Analytics
- Random Forest model for sales prediction
- Feature importance ranking
- Model performance metrics

## Technology Stack

- **FastAPI**: Modern Python web framework
- **Pandas**: Data manipulation and analysis
- **Scikit-learn**: Machine learning algorithms
- **NumPy**: Numerical computing
- **Uvicorn**: ASGI server

## Development

The server runs in development mode with auto-reload enabled. Any changes to Python files will automatically restart the server.

## Frontend Integration

The backend is configured with CORS to work with the React frontend running on:
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (Alternative React port)

## Adding New Data

To add your own video game dataset:

1. Replace the sample data in `main.py` with your CSV loading logic
2. Ensure your data has these columns:
   - Name, Platform, Year, Genre, Publisher
   - NA_Sales, EU_Sales, JP_Sales, Other_Sales, Global_Sales
   - Critic_Score, User_Score

3. Restart the server to reload the new data
