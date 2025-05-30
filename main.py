# analysis/game_analytics_data_science.py
"""
Kompleksowa analiza data science rynku gier wideo (1980-2015)
Autor: Projekt Big Data
Data: 2025

Ten skrypt zawiera zaawansowane analizy do projektu GameAnalytics:
1. Eksploracyjna analiza danych (EDA)
2. Zaawansowane techniki klastrowania
3. Analiza głównych komponentów (PCA) i t-SNE
4. Predykcyjne modelowanie
5. Wykrywanie anomalii
6. Analiza szeregów czasowych
7. Network analysis (jeśli aplikowalne)
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.preprocessing import StandardScaler, LabelEncoder, MinMaxScaler
from sklearn.ensemble import RandomForestRegressor, IsolationForest
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.metrics import silhouette_score, calinski_harabasz_score, davies_bouldin_score
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from scipy import stats
from scipy.cluster.hierarchy import dendrogram, linkage
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import warnings

warnings.filterwarnings('ignore')

# Konfiguracja wizualizacji
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")


class GameAnalyticsDataScience:
    """Klasa do zaawansowanej analizy danych gier wideo"""

    def __init__(self):
        self.df = None
        self.df_ml = None
        self.scaler = StandardScaler()
        self.models = {}
        self.results = {}

    def load_data(self, file_path=None):
        """Załaduj dane z pliku lub wygeneruj symulowane dane"""
        if file_path:
            self.df = pd.read_csv(file_path)
        else:
            # Generowanie symulowanych ale realistycznych danych
            self._generate_realistic_data()

        print(f"✅ Załadowano {len(self.df)} gier")
        print(f"📅 Okres: {self.df['Year'].min()}-{self.df['Year'].max()}")
        print(f"🎮 Platformy: {self.df['Platform'].nunique()}")
        print(f"🎯 Gatunki: {self.df['Genre'].nunique()}")

    def _generate_realistic_data(self):
        """Generuj realistyczne dane gier bazując na rzeczywistych trendach"""
        np.random.seed(42)
        n_games = 16000

        # Definicje platform z historycznymi okresami popularności
        platform_data = {
            'NES': {'years': (1985, 1995), 'peak': 1990, 'max_share': 0.4},
            'SNES': {'years': (1991, 1998), 'peak': 1994, 'max_share': 0.3},
            'PS': {'years': (1995, 2006), 'peak': 2000, 'max_share': 0.35},
            'N64': {'years': (1996, 2002), 'peak': 1998, 'max_share': 0.2},
            'PS2': {'years': (2000, 2013), 'peak': 2005, 'max_share': 0.45},
            'GC': {'years': (2001, 2007), 'peak': 2003, 'max_share': 0.15},
            'XB': {'years': (2001, 2008), 'peak': 2004, 'max_share': 0.2},
            'X360': {'years': (2005, 2016), 'peak': 2010, 'max_share': 0.35},
            'PS3': {'years': (2006, 2016), 'peak': 2012, 'max_share': 0.3},
            'Wii': {'years': (2006, 2014), 'peak': 2009, 'max_share': 0.4},
            'DS': {'years': (2004, 2014), 'peak': 2009, 'max_share': 0.3},
            'PSP': {'years': (2004, 2014), 'peak': 2008, 'max_share': 0.15},
            'PS4': {'years': (2013, 2016), 'peak': 2015, 'max_share': 0.25},
            'XOne': {'years': (2013, 2016), 'peak': 2015, 'max_share': 0.2}
        }

        # Gatunki z trendem popularności w czasie
        genre_trends = {
            'Action': {'trend': 'growing', 'base_share': 0.20},
            'Sports': {'trend': 'stable', 'base_share': 0.14},
            'Shooter': {'trend': 'growing', 'base_share': 0.08},  # Rósł po 2000
            'Role-Playing': {'trend': 'stable', 'base_share': 0.12},
            'Platform': {'trend': 'declining', 'base_share': 0.15},  # Spadał po 1995
            'Racing': {'trend': 'stable', 'base_share': 0.08},
            'Fighting': {'trend': 'declining', 'base_share': 0.06},
            'Simulation': {'trend': 'growing', 'base_share': 0.04},
            'Puzzle': {'trend': 'stable', 'base_share': 0.04},
            'Strategy': {'trend': 'growing', 'base_share': 0.03},
            'Adventure': {'trend': 'stable', 'base_share': 0.03},
            'Misc': {'trend': 'stable', 'base_share': 0.03}
        }

        # Generowanie dat z realistycznym rozkładem
        years = []
        for _ in range(n_games):
            # Więcej gier w późniejszych latach
            if np.random.random() < 0.3:
                year = np.random.choice(range(1980, 1995))  # Era retro
            elif np.random.random() < 0.7:
                year = np.random.choice(range(1995, 2005))  # Era PS1/PS2
            else:
                year = np.random.choice(range(2005, 2016))  # Era HD
            years.append(year)

        # Generowanie platform bazując na roku
        platforms = []
        for year in years:
            available_platforms = [p for p, data in platform_data.items()
                                   if data['years'][0] <= year <= data['years'][1]]
            if available_platforms:
                # Wybór platformy z wagami bazującymi na popularności w danym roku
                weights = []
                for platform in available_platforms:
                    pdata = platform_data[platform]
                    distance_from_peak = abs(year - pdata['peak'])
                    weight = pdata['max_share'] * np.exp(-distance_from_peak / 3)
                    weights.append(weight)

                weights = np.array(weights)
                weights = weights / weights.sum()
                platform = np.random.choice(available_platforms, p=weights)
            else:
                platform = 'PC'  # Fallback
            platforms.append(platform)

        # Generowanie gatunków z trendami czasowymi
        genres = []
        for year in years:
            genre_weights = []
            genre_names = list(genre_trends.keys())

            for genre, data in genre_trends.items():
                base = data['base_share']
                if data['trend'] == 'growing':
                    modifier = 1 + (year - 1980) * 0.01
                elif data['trend'] == 'declining':
                    modifier = 1 - (year - 1980) * 0.008
                else:
                    modifier = 1

                weight = base * modifier
                genre_weights.append(weight)

            genre_weights = np.array(genre_weights)
            genre_weights = genre_weights / genre_weights.sum()
            genre = np.random.choice(genre_names, p=genre_weights)
            genres.append(genre)

        # Wydawcy z realistycznymi udziałami
        publishers = [
                         'Nintendo', 'Electronic Arts', 'Activision', 'Sony Computer Entertainment',
                         'Ubisoft', 'Take-Two Interactive', 'THQ', 'Konami Digital Entertainment',
                         'Microsoft Game Studios', 'Capcom', 'Atari', 'Namco Bandai Games',
                         'Sega', 'Square Enix', 'Other'
                     ] * (n_games // 15 + 1)
        publishers = np.random.choice(publishers[:15], n_games)

        # Generowanie sprzedaży z realistycznymi korelacjami
        self._generate_sales_data(n_games, years, platforms, genres, publishers)

    def _generate_sales_data(self, n_games, years, platforms, genres, publishers):
        """Generuj realistyczne dane sprzedażowe"""

        # Bazowe sprzedaże z rozkładem log-normalnym
        base_sales = np.random.lognormal(mean=0, sigma=1.5, size=n_games)

        # Modyfikatory dla platform (bazujące na rzeczywistej popularności)
        platform_mods = {
            'PS2': 2.0, 'Wii': 1.8, 'X360': 1.5, 'PS3': 1.4, 'PS': 1.3,
            'DS': 1.2, 'NES': 1.1, 'SNES': 1.0, 'N64': 0.9, 'GC': 0.8,
            'XB': 0.8, 'PSP': 0.7, 'PS4': 1.6, 'XOne': 1.3, 'PC': 0.9
        }

        # Modyfikatory dla gatunków
        genre_mods = {
            'Action': 1.4, 'Sports': 1.3, 'Shooter': 1.5, 'Role-Playing': 1.2,
            'Platform': 1.1, 'Racing': 1.2, 'Fighting': 1.0, 'Simulation': 0.8,
            'Puzzle': 0.7, 'Strategy': 0.9, 'Adventure': 0.9, 'Misc': 0.6
        }

        # Modyfikatory czasowe (wzrost rynku)
        year_mods = {year: 1 + (year - 1980) * 0.02 for year in range(1980, 2016)}

        global_sales = []
        na_sales = []
        eu_sales = []
        jp_sales = []
        other_sales = []
        critic_scores = []
        user_scores = []

        for i in range(n_games):
            # Oblicz modyfikowane sprzedaże
            platform_mod = platform_mods.get(platforms[i], 1.0)
            genre_mod = genre_mods.get(genres[i], 1.0)
            year_mod = year_mods.get(years[i], 1.0)

            total_mod = platform_mod * genre_mod * year_mod
            adjusted_sales = base_sales[i] * total_mod

            # Regionalne rozkłady zależne od gatunku i platformy
            if genres[i] in ['Role-Playing', 'Fighting'] or platforms[i] in ['DS', 'PSP']:
                # Gry popularne w Japonii
                na_share = np.random.beta(2, 3) * 0.4
                eu_share = np.random.beta(2, 3) * 0.3
                jp_share = np.random.beta(4, 2) * 0.5
            elif platforms[i] in ['PC']:
                # PC silniejsze w EU/NA
                na_share = np.random.beta(3, 2) * 0.45
                eu_share = np.random.beta(3, 2) * 0.45
                jp_share = np.random.beta(1, 4) * 0.15
            else:
                # Standardowy rozkład
                na_share = np.random.beta(3, 2) * 0.5
                eu_share = np.random.beta(2, 2) * 0.35
                jp_share = np.random.beta(2, 3) * 0.25

            # Normalizacja udziałów
            total_share = na_share + eu_share + jp_share
            if total_share > 0.9:
                na_share *= 0.9 / total_share
                eu_share *= 0.9 / total_share
                jp_share *= 0.9 / total_share

            other_share = 1 - na_share - eu_share - jp_share

            # Oblicz rzeczywiste sprzedaże regionalne
            na_sale = max(0, adjusted_sales * na_share)
            eu_sale = max(0, adjusted_sales * eu_share)
            jp_sale = max(0, adjusted_sales * jp_share)
            other_sale = max(0, adjusted_sales * other_share)
            global_sale = na_sale + eu_sale + jp_sale + other_sale

            na_sales.append(na_sale)
            eu_sales.append(eu_sale)
            jp_sales.append(jp_sale)
            other_sales.append(other_sale)
            global_sales.append(global_sale)

            # Generuj oceny z korelacją do sprzedaży
            sales_percentile = min(99, max(1, stats.percentileofscore(base_sales, base_sales[i])))

            # Ocena krytyka (korelacja ze sprzedażą ale nie perfekcyjna)
            critic_base = 50 + (sales_percentile / 100) * 35 + np.random.normal(0, 8)
            critic_score = max(20, min(100, critic_base))
            critic_scores.append(critic_score if np.random.random() > 0.1 else np.nan)

            # Ocena użytkownika (zwykle niższa, większa wariancja)
            user_base = (critic_score - 10) / 10 + np.random.normal(0, 1.2)
            user_score = max(0, min(10, user_base))
            user_scores.append(user_score if np.random.random() > 0.15 else np.nan)

        # Stwórz DataFrame
        self.df = pd.DataFrame({
            'Name': [f"Game_{i:05d}" for i in range(n_games)],
            'Platform': platforms,
            'Year': years,
            'Genre': genres,
            'Publisher': publishers,
            'NA_Sales': na_sales,
            'EU_Sales': eu_sales,
            'JP_Sales': jp_sales,
            'Other_Sales': other_sales,
            'Global_Sales': global_sales,
            'Critic_Score': critic_scores,
            'User_Score': user_scores
        })

    def explore_data(self):
        """Eksploracyjna analiza danych"""
        print("🔍 EKSPLORACYJNA ANALIZA DANYCH")
        print("=" * 50)

        # Podstawowe statystyki
        print("\n📊 PODSTAWOWE STATYSTYKI:")
        print(f"Łączna liczba gier: {len(self.df):,}")
        print(f"Łączna sprzedaż: {self.df['Global_Sales'].sum():.2f}M")
        print(f"Średnia sprzedaż na grę: {self.df['Global_Sales'].mean():.2f}M")
        print(f"Mediana sprzedaży: {self.df['Global_Sales'].median():.2f}M")
        print(f"Najlepiej sprzedająca się gra: {self.df['Global_Sales'].max():.2f}M")

        # Rozkład platform
        print("\n🎮 TOP 10 PLATFORM:")
        platform_sales = self.df.groupby('Platform')['Global_Sales'].sum().sort_values(ascending=False)
        for platform, sales in platform_sales.head(10).items():
            print(f"{platform}: {sales:.2f}M ({sales / self.df['Global_Sales'].sum() * 100:.1f}%)")

        # Rozkład gatunków
        print("\n🎯 ROZKŁAD GATUNKÓW:")
        genre_sales = self.df.groupby('Genre')['Global_Sales'].sum().sort_values(ascending=False)
        for genre, sales in genre_sales.items():
            print(f"{genre}: {sales:.2f}M ({sales / self.df['Global_Sales'].sum() * 100:.1f}%)")

        # Analiza temporalna
        print("\n📅 TRENDY CZASOWE:")
        yearly_stats = self.df.groupby('Year').agg({
            'Global_Sales': ['sum', 'count', 'mean'],
            'Critic_Score': 'mean'
        }).round(2)

        print("Najlepsze lata (sprzedaż):")
        year_sales = self.df.groupby('Year')['Global_Sales'].sum().sort_values(ascending=False)
        for year, sales in year_sales.head(5).items():
            games_count = len(self.df[self.df['Year'] == year])
            print(f"{year}: {sales:.2f}M ({games_count} gier)")

        # Korelacje
        print("\n🔗 KORELACJE MIĘDZY ZMIENNYMI:")
        numeric_cols = ['Global_Sales', 'NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales',
                        'Critic_Score', 'User_Score', 'Year']
        corr_matrix = self.df[numeric_cols].corr()

        # Najsilniejsze korelacje
        print("Najsilniejsze korelacje (>0.5):")
        for i in range(len(corr_matrix.columns)):
            for j in range(i + 1, len(corr_matrix.columns)):
                corr_val = corr_matrix.iloc[i, j]
                if abs(corr_val) > 0.5:
                    print(f"{corr_matrix.columns[i]} ↔ {corr_matrix.columns[j]}: {corr_val:.3f}")

        # Outliers
        print("\n🎯 ANALIZA OUTLIERÓW:")
        Q1 = self.df['Global_Sales'].quantile(0.25)
        Q3 = self.df['Global_Sales'].quantile(0.75)
        IQR = Q3 - Q1
        outlier_threshold = Q3 + 1.5 * IQR

        outliers = self.df[self.df['Global_Sales'] > outlier_threshold]
        print(f"Liczba outlierów (>Q3+1.5*IQR): {len(outliers)}")
        print("Top 5 outlierów:")
        for _, game in outliers.nlargest(5, 'Global_Sales').iterrows():
            print(f"  {game['Name']}: {game['Global_Sales']:.2f}M ({game['Platform']}, {game['Year']})")

        return {
            'basic_stats': yearly_stats,
            'correlations': corr_matrix,
            'outliers': outliers,
            'platform_breakdown': platform_sales,
            'genre_breakdown': genre_sales
        }

    def advanced_clustering(self):
        """Zaawansowana analiza klastrowania"""
        print("\n🧮 ZAAWANSOWANA ANALIZA KLASTROWANIA")
        print("=" * 50)

        # Przygotowanie danych
        self._prepare_ml_data()

        # Testowanie różnych liczb klastrów dla K-means
        print("\n🔍 OPTYMALIZACJA LICZBY KLASTRÓW:")
        k_range = range(2, 11)
        inertias = []
        silhouette_scores = []
        calinski_scores = []
        davies_bouldin_scores = []

        for k in k_range:
            kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
            cluster_labels = kmeans.fit_predict(self.X_scaled)

            inertias.append(kmeans.inertia_)
            silhouette_scores.append(silhouette_score(self.X_scaled, cluster_labels))
            calinski_scores.append(calinski_harabasz_score(self.X_scaled, cluster_labels))
            davies_bouldin_scores.append(davies_bouldin_score(self.X_scaled, cluster_labels))

        # Znalezienie optymalnej liczby klastrów
        optimal_k_silhouette = k_range[np.argmax(silhouette_scores)]
        optimal_k_calinski = k_range[np.argmax(calinski_scores)]
        optimal_k_davies = k_range[np.argmin(davies_bouldin_scores)]

        print(f"Optymalne K (Silhouette): {optimal_k_silhouette}")
        print(f"Optymalne K (Calinski-Harabasz): {optimal_k_calinski}")
        print(f"Optymalne K (Davies-Bouldin): {optimal_k_davies}")

        # Użyj najczęściej wskazywanej wartości
        optimal_k = optimal_k_silhouette

        # Różne algorytmy klastrowania
        clustering_algorithms = {
            'KMeans': KMeans(n_clusters=optimal_k, random_state=42, n_init=10),
            'DBSCAN': DBSCAN(eps=0.5, min_samples=5),
            'AgglomerativeClustering': AgglomerativeClustering(n_clusters=optimal_k)
        }

        clustering_results = {}

        for name, algorithm in clustering_algorithms.items():
            print(f"\n🎯 {name}:")

            labels = algorithm.fit_predict(self.X_scaled)

            # Metryki
            n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
            n_noise = list(labels).count(-1) if -1 in labels else 0

            if n_clusters > 1:
                silhouette_avg = silhouette_score(self.X_scaled, labels)
                print(f"  Liczba klastrów: {n_clusters}")
                print(f"  Silhouette Score: {silhouette_avg:.3f}")
                if n_noise > 0:
                    print(f"  Punkty outlier: {n_noise}")
            else:
                print(f"  Algorytm nie znalazł klastrów!")
                continue

            # Analiza klastrów
            self.df_ml['cluster'] = labels
            cluster_analysis = []

            for cluster_id in set(labels):
                if cluster_id == -1:  # Outliers w DBSCAN
                    continue

                cluster_data = self.df_ml[self.df_ml['cluster'] == cluster_id]

                analysis = {
                    'cluster_id': cluster_id,
                    'size': len(cluster_data),
                    'percentage': len(cluster_data) / len(self.df_ml) * 100,
                    'avg_global_sales': cluster_data['Global_Sales'].mean(),
                    'avg_critic_score': cluster_data['Critic_Score'].mean(),
                    'top_genres': cluster_data['Genre'].value_counts().head(3).to_dict(),
                    'top_platforms': cluster_data['Platform'].value_counts().head(3).to_dict(),
                    'year_range': f"{cluster_data['Year'].min()}-{cluster_data['Year'].max()}"
                }
                cluster_analysis.append(analysis)

                print(
                    f"    Klaster {cluster_id}: {len(cluster_data)} gier ({len(cluster_data) / len(self.df_ml) * 100:.1f}%)")
                print(f"      Średnia sprzedaż: {cluster_data['Global_Sales'].mean():.2f}M")
                print(f"      Średnia ocena: {cluster_data['Critic_Score'].mean():.1f}")
                print(f"      Top gatunek: {cluster_data['Genre'].value_counts().index[0]}")

            clustering_results[name] = {
                'labels': labels,
                'analysis': cluster_analysis,
                'metrics': {
                    'n_clusters': n_clusters,
                    'silhouette_score': silhouette_avg if n_clusters > 1 else None,
                    'n_noise': n_noise
                }
            }

        self.results['clustering'] = clustering_results
        return clustering_results

    def dimensionality_reduction(self):
        """Analiza redukcji wymiarowości"""
        print("\n📐 ANALIZA REDUKCJI WYMIAROWOŚCI")
        print("=" * 50)

        # PCA
        print("\n🎯 ANALIZA GŁÓWNYCH KOMPONENTÓW (PCA):")
        pca = PCA()
        pca_features = pca.fit_transform(self.X_scaled)

        # Wariancja wyjaśniona
        explained_variance_ratio = pca.explained_variance_ratio_
        cumulative_variance = np.cumsum(explained_variance_ratio)

        print("Wariancja wyjaśniona przez komponenty:")
        for i in range(min(10, len(explained_variance_ratio))):
            print(f"  PC{i + 1}: {explained_variance_ratio[i]:.3f} ({cumulative_variance[i]:.3f} skumulowane)")

        # Liczba komponentów dla 90% wariancji
        n_components_90 = np.argmax(cumulative_variance >= 0.9) + 1
        print(f"\nLiczba komponentów dla 90% wariancji: {n_components_90}")

        # PCA z optymalną liczbą komponentów
        pca_optimal = PCA(n_components=min(3, n_components_90))
        pca_features_optimal = pca_optimal.fit_transform(self.X_scaled)

        # Zapisz wyniki PCA
        for i in range(pca_features_optimal.shape[1]):
            self.df_ml[f'PC{i + 1}'] = pca_features_optimal[:, i]

        # Analiza loadings
        print("\n📊 ANALIZA LOADINGS (TOP 3 KOMPONENTY):")
        feature_names = self.feature_names
        for i in range(min(3, pca_optimal.n_components_)):
            print(f"\nPC{i + 1} (wyjaśnia {pca_optimal.explained_variance_ratio_[i]:.1%} wariancji):")
            loadings = pca_optimal.components_[i]
            feature_importance = [(feature_names[j], abs(loadings[j])) for j in range(len(feature_names))]
            feature_importance.sort(key=lambda x: x[1], reverse=True)

            for feature, importance in feature_importance[:5]:
                direction = "+" if loadings[feature_names.index(feature)] > 0 else "-"
                print(f"  {direction}{feature}: {importance:.3f}")

        # t-SNE (na próbce danych)
        print("\n🎯 t-SNE:")
        sample_size = min(1000, len(self.df_ml))
        if len(self.df_ml) > sample_size:
            sample_idx = np.random.choice(len(self.df_ml), sample_size, replace=False)
            X_sample = self.X_scaled[sample_idx]
            df_sample = self.df_ml.iloc[sample_idx].copy()
        else:
            X_sample = self.X_scaled
            df_sample = self.df_ml.copy()

        tsne = TSNE(n_components=2, random_state=42, perplexity=min(30, sample_size // 4))
        tsne_features = tsne.fit_transform(X_sample)

        df_sample['tSNE1'] = tsne_features[:, 0]
        df_sample['tSNE2'] = tsne_features[:, 1]

        print(f"t-SNE wykonane na próbce {sample_size} gier")

        # # UMAP (jeśli dostępne)
        # try:
        #     print("\n🎯 UMAP:")
        #     import umap
        #     umap_reducer = umap.UMAP(n_components=2, random_state=42)
        #     umap_features = umap_reducer.fit_transform(X_sample)
        #
        #     df_sample['UMAP1'] = umap_features[:, 0]
        #     df_sample['UMAP2'] = umap_features[:, 1]
        #     print(f"UMAP wykonane na próbce {sample_size} gier")
        # except ImportError:
        #     print("UMAP nie jest dostępne - zainstaluj: pip install umap-learn")

        self.results['dimensionality_reduction'] = {
            'pca': {
                'explained_variance_ratio': explained_variance_ratio,
                'cumulative_variance': cumulative_variance,
                'n_components_90': n_components_90,
                'loadings': pca_optimal.components_
            },
            'tsne_sample': df_sample
        }

        return self.results['dimensionality_reduction']

    def predictive_modeling(self):
        """Zaawansowane modelowanie predykcyjne"""
        print("\n🤖 ZAAWANSOWANE MODELOWANIE PREDYKCYJNE")
        print("=" * 50)

        # Przygotowanie danych
        X = self.X_scaled
        y = self.df_ml['Global_Sales'].values

        # Podział danych
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=pd.qcut(y, q=5, duplicates='drop')
        )

        print(f"Zbiór treningowy: {len(X_train)} próbek")
        print(f"Zbiór testowy: {len(X_test)} próbek")

        # Różne modele
        models = {
            'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42, max_depth=10),
            'Random Forest (Optimized)': RandomForestRegressor(
                n_estimators=200, random_state=42, max_depth=15,
                min_samples_split=5, min_samples_leaf=2
            )
        }

        model_results = {}

        for name, model in models.items():
            print(f"\n🎯 {name}:")

            # Trenowanie
            model.fit(X_train, y_train)

            # Predykcje
            y_train_pred = model.predict(X_train)
            y_test_pred = model.predict(X_test)

            # Metryki
            train_r2 = r2_score(y_train, y_train_pred)
            test_r2 = r2_score(y_test, y_test_pred)
            train_mae = mean_absolute_error(y_train, y_train_pred)
            test_mae = mean_absolute_error(y_test, y_test_pred)
            train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
            test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))

            print(f"  R² (train): {train_r2:.4f}")
            print(f"  R² (test): {test_r2:.4f}")
            print(f"  MAE (test): {test_mae:.4f}")
            print(f"  RMSE (test): {test_rmse:.4f}")

            # Cross-validation
            cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='r2')
            print(f"  CV R² średnie: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

            # Feature importance
            if hasattr(model, 'feature_importances_'):
                feature_importance = list(zip(self.feature_names, model.feature_importances_))
                feature_importance.sort(key=lambda x: x[1], reverse=True)

                print(f"  Top 5 najważniejszych cech:")
                for feature, importance in feature_importance[:5]:
                    print(f"    {feature}: {importance:.4f}")

            model_results[name] = {
                'model': model,
                'metrics': {
                    'train_r2': train_r2,
                    'test_r2': test_r2,
                    'train_mae': train_mae,
                    'test_mae': test_mae,
                    'train_rmse': train_rmse,
                    'test_rmse': test_rmse,
                    'cv_r2_mean': cv_scores.mean(),
                    'cv_r2_std': cv_scores.std()
                },
                'predictions': {
                    'y_test': y_test,
                    'y_test_pred': y_test_pred
                },
                'feature_importance': feature_importance if hasattr(model, 'feature_importances_') else None
            }

        # Analiza residuals dla najlepszego modelu
        best_model_name = max(model_results.keys(),
                              key=lambda x: model_results[x]['metrics']['test_r2'])
        best_model_results = model_results[best_model_name]

        print(f"\n📊 ANALIZA RESIDUALS ({best_model_name}):")
        residuals = best_model_results['predictions']['y_test'] - best_model_results['predictions']['y_test_pred']

        print(f"  Średnie residuum: {np.mean(residuals):.4f}")
        print(f"  Odchylenie standardowe residuów: {np.std(residuals):.4f}")
        print(f"  Maksymalne dodatnie residuum: {np.max(residuals):.4f}")
        print(f"  Maksymalne ujemne residuum: {np.min(residuals):.4f}")

        # Test normalności residuów
        from scipy.stats import shapiro
        shapiro_stat, shapiro_p = shapiro(residuals[:5000] if len(residuals) > 5000 else residuals)
        print(f"  Test Shapiro-Wilk (normalność): statystyka={shapiro_stat:.4f}, p-value={shapiro_p:.4f}")

        self.results['predictive_modeling'] = model_results
        return model_results

    def anomaly_detection(self):
        """Wykrywanie anomalii w danych"""
        print("\n🚨 WYKRYWANIE ANOMALII")
        print("=" * 50)

        # Isolation Forest
        isolation_forest = IsolationForest(contamination=0.1, random_state=42)
        anomaly_labels = isolation_forest.fit_predict(self.X_scaled)
        anomaly_scores = isolation_forest.decision_function(self.X_scaled)

        # Statystyki anomalii
        n_anomalies = sum(anomaly_labels == -1)
        anomaly_percentage = n_anomalies / len(self.df_ml) * 100

        print(f"🔍 Wykryte anomalie: {n_anomalies} ({anomaly_percentage:.2f}%)")

        # Dodaj wyniki do DataFrame
        self.df_ml['anomaly_score'] = anomaly_scores
        self.df_ml['is_anomaly'] = anomaly_labels == -1

        # Analiza anomalii
        anomalies = self.df_ml[self.df_ml['is_anomaly']].copy()
        normal_data = self.df_ml[~self.df_ml['is_anomaly']].copy()

        print("\n📊 CHARAKTERYSTYKA ANOMALII:")
        print(f"  Średnia sprzedaż (anomalie): {anomalies['Global_Sales'].mean():.2f}M")
        print(f"  Średnia sprzedaż (normalne): {normal_data['Global_Sales'].mean():.2f}M")
        print(f"  Średnia ocena (anomalie): {anomalies['Critic_Score'].mean():.1f}")
        print(f"  Średnia ocena (normalne): {normal_data['Critic_Score'].mean():.1f}")

        print("\n🎯 TOP 10 ANOMALII (najwyższy anomaly score):")
        top_anomalies = anomalies.nlargest(10, 'anomaly_score')[
            ['Name', 'Global_Sales', 'Platform', 'Genre', 'Year', 'anomaly_score']
        ]

        for _, game in top_anomalies.iterrows():
            print(f"  {game['Name']}: {game['Global_Sales']:.2f}M "
                  f"({game['Platform']}, {game['Genre']}, {game['Year']}) "
                  f"Score: {game['anomaly_score']:.3f}")

        # Analiza anomalii według kategorii
        print("\n📈 ROZKŁAD ANOMALII WEDŁUG KATEGORII:")

        print("  Platformy z największą liczbą anomalii:")
        platform_anomalies = anomalies['Platform'].value_counts().head(5)
        for platform, count in platform_anomalies.items():
            total_platform = len(self.df_ml[self.df_ml['Platform'] == platform])
            percentage = count / total_platform * 100
            print(f"    {platform}: {count} anomalii ({percentage:.1f}% gier na platformie)")

        print("  Gatunki z największą liczbą anomalii:")
        genre_anomalies = anomalies['Genre'].value_counts().head(5)
        for genre, count in genre_anomalies.items():
            total_genre = len(self.df_ml[self.df_ml['Genre'] == genre])
            percentage = count / total_genre * 100
            print(f"    {genre}: {count} anomalii ({percentage:.1f}% gier gatunku)")

        # Statistical outliers vs ML anomalies
        print("\n🔬 PORÓWNANIE: OUTLIERS STATYSTYCZNE vs ANOMALIE ML:")

        # Outliers statystyczne (IQR method)
        Q1 = self.df_ml['Global_Sales'].quantile(0.25)
        Q3 = self.df_ml['Global_Sales'].quantile(0.75)
        IQR = Q3 - Q1
        stat_outliers = self.df_ml[
            (self.df_ml['Global_Sales'] < Q1 - 1.5 * IQR) |
            (self.df_ml['Global_Sales'] > Q3 + 1.5 * IQR)
            ]

        print(f"  Outliers statystyczne: {len(stat_outliers)} ({len(stat_outliers) / len(self.df_ml) * 100:.2f}%)")
        print(f"  Anomalie ML: {n_anomalies} ({anomaly_percentage:.2f}%)")

        # Overlap między metodami
        overlap = set(stat_outliers.index) & set(anomalies.index)
        print(f"  Pokrywanie się metod: {len(overlap)} gier")

        self.results['anomaly_detection'] = {
            'anomalies': anomalies,
            'normal_data': normal_data,
            'stats': {
                'n_anomalies': n_anomalies,
                'anomaly_percentage': anomaly_percentage,
                'overlap_with_statistical': len(overlap)
            }
        }

        return self.results['anomaly_detection']

    def time_series_analysis(self):
        """Analiza szeregów czasowych"""
        print("\n📈 ANALIZA SZEREGÓW CZASOWYCH")
        print("=" * 50)

        # Agregacja danych rocznych
        yearly_data = self.df.groupby('Year').agg({
            'Global_Sales': ['sum', 'mean', 'count'],
            'Critic_Score': 'mean',
            'User_Score': 'mean'
        }).round(2)

        yearly_data.columns = ['Total_Sales', 'Avg_Sales', 'Games_Count', 'Avg_Critic', 'Avg_User']
        yearly_data = yearly_data.reset_index()

        print("📊 TRENDY ROCZNE:")
        print(f"  Łączna sprzedaż 1980-2015: {yearly_data['Total_Sales'].sum():.2f}M")
        print(f"  Najlepszy rok (sprzedaż): {yearly_data.loc[yearly_data['Total_Sales'].idxmax(), 'Year']} "
              f"({yearly_data['Total_Sales'].max():.2f}M)")
        print(f"  Najgorszy rok (sprzedaż): {yearly_data.loc[yearly_data['Total_Sales'].idxmin(), 'Year']} "
              f"({yearly_data['Total_Sales'].min():.2f}M)")

        # Analiza trendów
        from scipy.stats import linregress

        # Trend sprzedaży
        years = yearly_data['Year'].values
        sales_slope, sales_intercept, sales_r, sales_p, _ = linregress(years, yearly_data['Total_Sales'])
        print(f"\n📈 TREND SPRZEDAŻY:")
        print(f"  Nachylenie trendu: {sales_slope:.2f}M/rok")
        print(f"  Korelacja: {sales_r:.3f}")
        print(f"  P-value: {sales_p:.6f}")

        # Trend jakości gier
        valid_scores = yearly_data.dropna(subset=['Avg_Critic'])
        if len(valid_scores) > 5:
            score_slope, score_intercept, score_r, score_p, _ = linregress(
                valid_scores['Year'], valid_scores['Avg_Critic']
            )
            print(f"\n⭐ TREND JAKOŚCI (Critic Score):")
            print(f"  Nachylenie trendu: {score_slope:.3f} punktów/rok")
            print(f"  Korelacja: {score_r:.3f}")
            print(f"  P-value: {score_p:.6f}")

        # Analiza cykliczności
        print(f"\n🔄 ANALIZA CYKLICZNOŚCI:")

        # Dekady
        yearly_data['Decade'] = (yearly_data['Year'] // 10) * 10
        decade_stats = yearly_data.groupby('Decade').agg({
            'Total_Sales': 'mean',
            'Games_Count': 'mean',
            'Avg_Critic': 'mean'
        }).round(2)

        print("  Średnie wartości według dekad:")
        for decade, stats in decade_stats.iterrows():
            print(f"    {decade}s: {stats['Total_Sales']:.1f}M sprzedaży, "
                  f"{stats['Games_Count']:.0f} gier/rok, "
                  f"ocena {stats['Avg_Critic']:.1f}")

        # Platform lifecycle analysis
        print(f"\n🎮 ANALIZA CYKLI ŻYCIA PLATFORM:")
        platform_years = self.df.groupby('Platform').agg({
            'Year': ['min', 'max', 'count'],
            'Global_Sales': 'sum'
        }).round(2)

        platform_years.columns = ['Start_Year', 'End_Year', 'Games_Count', 'Total_Sales']
        platform_years['Lifespan'] = platform_years['End_Year'] - platform_years['Start_Year'] + 1
        platform_years = platform_years.sort_values('Total_Sales', ascending=False)

        print("  Top platformy według długości życia:")
        top_platforms = platform_years.head(10)
        for platform, data in top_platforms.iterrows():
            print(f"    {platform}: {data['Lifespan']:.0f} lat "
                  f"({data['Start_Year']:.0f}-{data['End_Year']:.0f}), "
                  f"{data['Total_Sales']:.1f}M sprzedaży")

        # Genre evolution analysis
        print(f"\n🎯 EWOLUCJA GATUNKÓW:")
        genre_evolution = self.df.groupby(['Year', 'Genre'])['Global_Sales'].sum().reset_index()

        # Znajdź najbardziej rosnące/spadające gatunki
        early_period = self.df[self.df['Year'] <= 1995].groupby('Genre')['Global_Sales'].sum()
        late_period = self.df[self.df['Year'] >= 2005].groupby('Genre')['Global_Sales'].sum()

        # Normalizacja do porównania okresów
        early_total = early_period.sum()
        late_total = late_period.sum()

        genre_change = {}
        for genre in set(early_period.index) & set(late_period.index):
            early_share = early_period[genre] / early_total * 100
            late_share = late_period[genre] / late_total * 100
            change = late_share - early_share
            genre_change[genre] = change

        print("  Największe zmiany udziału gatunków (1980-1995 vs 2005-2015):")
        sorted_changes = sorted(genre_change.items(), key=lambda x: x[1], reverse=True)
        for genre, change in sorted_changes[:5]:
            direction = "wzrost" if change > 0 else "spadek"
            print(f"    {genre}: {abs(change):.1f}pp {direction}")

        self.results['time_series'] = {
            'yearly_data': yearly_data,
            'trends': {
                'sales_slope': sales_slope,
                'sales_correlation': sales_r,
                'sales_p_value': sales_p
            },
            'decade_stats': decade_stats,
            'platform_lifecycle': platform_years,
            'genre_evolution': genre_change
        }

        return self.results['time_series']

    def market_segmentation(self):
        """Zaawansowana segmentacja rynku"""
        print("\n🎯 ZAAWANSOWANA SEGMENTACJA RYNKU")
        print("=" * 50)

        # Segmentacja na podstawie sprzedaży
        sales_segments = pd.qcut(self.df['Global_Sales'],
                                 q=5,
                                 labels=['Niche', 'Small', 'Medium', 'Large', 'Blockbuster'])

        self.df['Sales_Segment'] = sales_segments

        print("📊 SEGMENTACJA WEDŁUG SPRZEDAŻY:")
        segment_stats = self.df.groupby('Sales_Segment').agg({
            'Global_Sales': ['count', 'mean', 'sum'],
            'Critic_Score': 'mean',
            'User_Score': 'mean'
        }).round(2)

        for segment in segment_stats.index:
            count = segment_stats.loc[segment, ('Global_Sales', 'count')]
            mean_sales = segment_stats.loc[segment, ('Global_Sales', 'mean')]
            total_sales = segment_stats.loc[segment, ('Global_Sales', 'sum')]
            avg_critic = segment_stats.loc[segment, ('Critic_Score', 'mean')]

            print(f"  {segment}: {count} gier, średnia {mean_sales:.2f}M, "
                  f"łącznie {total_sales:.1f}M, ocena {avg_critic:.1f}")

        # Segmentacja regionalna
        print("\n🌍 SEGMENTACJA REGIONALNA:")

        # Oblicz dominujący region dla każdej gry
        regional_cols = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales']
        self.df['Dominant_Region'] = self.df[regional_cols].idxmax(axis=1)
        self.df['Dominant_Region'] = self.df['Dominant_Region'].map({
            'NA_Sales': 'North America',
            'EU_Sales': 'Europe',
            'JP_Sales': 'Japan',
            'Other_Sales': 'Other'
        })

        region_analysis = self.df.groupby('Dominant_Region').agg({
            'Global_Sales': ['count', 'mean', 'sum'],
            'Genre': lambda x: x.value_counts().index[0],  # Najpopularniejszy gatunek
            'Platform': lambda x: x.value_counts().index[0]  # Najpopularna platforma
        })

        for region in region_analysis.index:
            count = region_analysis.loc[region, ('Global_Sales', 'count')]
            mean_sales = region_analysis.loc[region, ('Global_Sales', 'mean')]
            total_sales = region_analysis.loc[region, ('Global_Sales', 'sum')]
            top_genre = region_analysis.loc[region, ('Genre', '<lambda>')]
            top_platform = region_analysis.loc[region, ('Platform', '<lambda>')]

            print(f"  {region}: {count} gier dominujących ({count / len(self.df) * 100:.1f}%)")
            print(f"    Średnia sprzedaż: {mean_sales:.2f}M")
            print(f"    Top gatunek: {top_genre}")
            print(f"    Top platforma: {top_platform}")

        # Analiza cross-platform vs exclusive
        print("\n🎮 ANALIZA EKSKLUZYWNOŚCI vs MULTI-PLATFORM:")

        # Znajdź gry z podobnymi nazwami (uproszczona analiza)
        # W rzeczywistym projekcie użyłbyś bardziej zaawansowanych technik NLP
        platform_counts = self.df.groupby('Name')['Platform'].nunique()

        # Gry dostępne na więcej niż jednej platformie (potencjalnie multi-platform)
        multiplatform_threshold = 1  # Więcej niż jedna platforma
        potential_multiplatform = platform_counts[platform_counts > multiplatform_threshold]

        print(f"  Potencjalnie multi-platform: {len(potential_multiplatform)} tytułów")
        print(f"  Ekskluzywne: {len(platform_counts) - len(potential_multiplatform)} tytułów")

        # Publisher strategy analysis
        print("\n🏢 ANALIZA STRATEGII WYDAWCÓW:")

        publisher_analysis = self.df.groupby('Publisher').agg({
            'Global_Sales': ['count', 'mean', 'sum'],
            'Platform': 'nunique',
            'Genre': 'nunique',
            'Critic_Score': 'mean'
        }).round(2)

        # Filtruj wydawców z co najmniej 10 grami
        significant_publishers = publisher_analysis[
            publisher_analysis[('Global_Sales', 'count')] >= 10
            ].sort_values(('Global_Sales', 'sum'), ascending=False)

        print(f"  Analizowanych wydawców (≥10 gier): {len(significant_publishers)}")

        for publisher in significant_publishers.head(10).index:
            data = significant_publishers.loc[publisher]
            games_count = data[('Global_Sales', 'count')]
            avg_sales = data[('Global_Sales', 'mean')]
            total_sales = data[('Global_Sales', 'sum')]
            platforms = data[('Platform', 'nunique')]
            genres = data[('Genre', 'nunique')]
            avg_score = data[('Critic_Score', 'mean')]

            print(f"    {publisher}:")
            print(f"      {games_count} gier, {platforms} platform, {genres} gatunków")
            print(f"      Średnia sprzedaż: {avg_sales:.2f}M, łącznie: {total_sales:.1f}M")
            print(f"      Średnia ocena: {avg_score:.1f}")

        self.results['market_segmentation'] = {
            'sales_segments': segment_stats,
            'regional_dominance': region_analysis,
            'publisher_strategies': significant_publishers
        }

        return self.results['market_segmentation']

    def _prepare_ml_data(self):
        """Przygotuj dane do uczenia maszynowego"""
        # Usuń wiersze z brakującymi danymi dla kluczowych kolumn
        self.df_ml = self.df.dropna(subset=['Global_Sales']).copy()

        # Wypełnij brakujące oceny średnimi
        self.df_ml['Critic_Score'] = self.df_ml['Critic_Score'].fillna(
            self.df_ml['Critic_Score'].mean()
        )
        self.df_ml['User_Score'] = self.df_ml['User_Score'].fillna(
            self.df_ml['User_Score'].mean()
        )

        # Encoding zmiennych kategorycznych
        le_platform = LabelEncoder()
        le_genre = LabelEncoder()
        le_publisher = LabelEncoder()

        self.df_ml['Platform_encoded'] = le_platform.fit_transform(self.df_ml['Platform'])
        self.df_ml['Genre_encoded'] = le_genre.fit_transform(self.df_ml['Genre'])
        self.df_ml['Publisher_encoded'] = le_publisher.fit_transform(self.df_ml['Publisher'])

        # Features dla ML
        self.feature_names = [
            'NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales',
            'Critic_Score', 'User_Score', 'Year',
            'Platform_encoded', 'Genre_encoded', 'Publisher_encoded'
        ]

        # Przygotuj macierz cech
        X = self.df_ml[self.feature_names].values

        # Skalowanie
        self.X_scaled = self.scaler.fit_transform(X)

        print(f"✅ Dane ML przygotowane: {len(self.df_ml)} próbek, {len(self.feature_names)} cech")

    def generate_report(self):
        """Generuj kompleksowy raport z analizy"""
        print("\n📋 GENEROWANIE KOMPLEKSOWEGO RAPORTU")
        print("=" * 60)

        report = {
            'executive_summary': {},
            'detailed_findings': {},
            'recommendations': [],
            'methodology': {},
            'data_quality': {}
        }

        # Executive Summary
        report['executive_summary'] = {
            'total_games_analyzed': len(self.df),
            'time_period': f"{self.df['Year'].min()}-{self.df['Year'].max()}",
            'total_sales': round(self.df['Global_Sales'].sum(), 2),
            'platforms_analyzed': self.df['Platform'].nunique(),
            'genres_analyzed': self.df['Genre'].nunique(),
            'key_insights': [
                f"Przeanalizowano {len(self.df):,} gier z okresu {self.df['Year'].min()}-{self.df['Year'].max()}",
                f"Łączna sprzedaż: {self.df['Global_Sales'].sum():.1f}M egzemplarzy",
                f"Średnia sprzedaż na grę: {self.df['Global_Sales'].mean():.2f}M",
                f"Najlepsza gra sprzedała {self.df['Global_Sales'].max():.1f}M egzemplarzy"
            ]
        }

        # Detailed Findings z wszystkich analiz
        if 'clustering' in self.results:
            best_clustering = max(self.results['clustering'].keys(),
                                  key=lambda x: self.results['clustering'][x]['metrics']['silhouette_score'] or 0)
            report['detailed_findings']['clustering'] = {
                'best_algorithm': best_clustering,
                'optimal_clusters': self.results['clustering'][best_clustering]['metrics']['n_clusters'],
                'silhouette_score': self.results['clustering'][best_clustering]['metrics']['silhouette_score']
            }

        if 'predictive_modeling' in self.results:
            best_model = max(self.results['predictive_modeling'].keys(),
                             key=lambda x: self.results['predictive_modeling'][x]['metrics']['test_r2'])
            report['detailed_findings']['predictive_modeling'] = {
                'best_model': best_model,
                'test_r2': self.results['predictive_modeling'][best_model]['metrics']['test_r2'],
                'test_mae': self.results['predictive_modeling'][best_model]['metrics']['test_mae']
            }

        # Rekomendacje
        report['recommendations'] = [
            "Skupić się na gatunkach o rosnącym trendzie (Action, Shooter)",
            "Inwestować w platformy z najwyższym ROI",
            "Monitorować anomalie jako potencjalne przełomowe tytuły",
            "Wykorzystać modele predykcyjne do planowania portfolio",
            "Uwzględnić różnice regionalne w strategii dystrybucji"
        ]

        # Metodologia
        report['methodology'] = {
            'data_preprocessing': "StandardScaler, Label Encoding, missing value imputation",
            'clustering_algorithms': list(self.results.get('clustering', {}).keys()),
            'dimensionality_reduction': "PCA, t-SNE",
            'predictive_models': list(self.results.get('predictive_modeling', {}).keys()),
            'anomaly_detection': "Isolation Forest",
            'validation': "Cross-validation, train/test split"
        }

        # Data Quality
        total_missing_critic = self.df['Critic_Score'].isna().sum()
        total_missing_user = self.df['User_Score'].isna().sum()

        report['data_quality'] = {
            'total_records': len(self.df),
            'missing_critic_scores': total_missing_critic,
            'missing_user_scores': total_missing_user,
            'critic_score_coverage': round((1 - total_missing_critic / len(self.df)) * 100, 1),
            'user_score_coverage': round((1 - total_missing_user / len(self.df)) * 100, 1),
            'data_completeness': 'High' if total_missing_critic < len(self.df) * 0.2 else 'Medium'
        }

        self.results['final_report'] = report

        print("✅ Raport wygenerowany pomyślnie!")
        print(f"📊 Kluczowe metryki:")
        print(f"   • Całkowita sprzedaż: {report['executive_summary']['total_sales']}M")
        print(f"   • Zakres czasowy: {report['executive_summary']['time_period']}")
        print(f"   • Pokrycie danych: {report['data_quality']['data_completeness']}")

        return report


def main():
    """Główna funkcja uruchamiająca pełną analizę"""
    print("🎮 GAMEANALYTICS - ZAAWANSOWANA ANALIZA DATA SCIENCE")
    print("=" * 60)
    print("Kompleksowa analiza rynku gier wideo (1980-2015)")
    print("Wykorzystujące techniki: ML, clustering, PCA, anomaly detection")
    print("=" * 60)

    # Inicjalizacja analizatora
    analyzer = GameAnalyticsDataScience()

    # Załaduj dane
    print("\n🔄 KROK 1: ŁADOWANIE DANYCH")
    analyzer.load_data()  # Użyje symulowanych danych

    # Eksploracyjna analiza danych
    print("\n🔄 KROK 2: EKSPLORACYJNA ANALIZA DANYCH")
    eda_results = analyzer.explore_data()

    # Zaawansowane klastrowanie
    print("\n🔄 KROK 3: ZAAWANSOWANE KLASTROWANIE")
    clustering_results = analyzer.advanced_clustering()

    # Redukcja wymiarowości
    print("\n🔄 KROK 4: REDUKCJA WYMIAROWOŚCI")
    dim_reduction_results = analyzer.dimensionality_reduction()

    # Modelowanie predykcyjne
    print("\n🔄 KROK 5: MODELOWANIE PREDYKCYJNE")
    prediction_results = analyzer.predictive_modeling()

    # Wykrywanie anomalii
    print("\n🔄 KROK 6: WYKRYWANIE ANOMALII")
    anomaly_results = analyzer.anomaly_detection()

    # Analiza szeregów czasowych
    print("\n🔄 KROK 7: ANALIZA SZEREGÓW CZASOWYCH")
    time_series_results = analyzer.time_series_analysis()

    # Segmentacja rynku
    print("\n🔄 KROK 8: SEGMENTACJA RYNKU")
    segmentation_results = analyzer.market_segmentation()

    # Generowanie raportu
    print("\n🔄 KROK 9: GENEROWANIE RAPORTU")
    final_report = analyzer.generate_report()

    print("\n🎉 ANALIZA ZAKOŃCZONA!")
    print("=" * 60)
    print("Wszystkie wyniki zostały zapisane w analyzer.results")
    print("Raport końcowy dostępny w analyzer.results['final_report']")

    # Opcjonalne: zapisz wyniki do pliku
    try:
        import pickle
        with open('gameanalytics_results.pkl', 'wb') as f:
            pickle.dump(analyzer.results, f)
        print("💾 Wyniki zapisane do: gameanalytics_results.pkl")
    except Exception as e:
        print(f"⚠️ Nie udało się zapisać wyników: {e}")

    return analyzer


# Funkcje pomocnicze do wizualizacji
def create_advanced_visualizations(analyzer):
    """Twórz zaawansowane wizualizacje wyników"""
    print("\n🎨 TWORZENIE ZAAWANSOWANYCH WIZUALIZACJI")
    print("=" * 50)

    fig, axes = plt.subplots(2, 3, figsize=(20, 12))
    fig.suptitle('GameAnalytics - Zaawansowana Analiza Data Science', fontsize=16, fontweight='bold')

    # 1. Rozkład sprzedaży
    axes[0, 0].hist(analyzer.df['Global_Sales'], bins=50, alpha=0.7, color='skyblue', edgecolor='black')
    axes[0, 0].set_title('Rozkład Globalnej Sprzedaży Gier')
    axes[0, 0].set_xlabel('Sprzedaż (miliony)')
    axes[0, 0].set_ylabel('Liczba gier')
    axes[0, 0].set_yscale('log')

    # 2. Trendy czasowe
    yearly_sales = analyzer.df.groupby('Year')['Global_Sales'].sum()
    axes[0, 1].plot(yearly_sales.index, yearly_sales.values, marker='o', linewidth=2, markersize=4)
    axes[0, 1].set_title('Trendy Sprzedaży w Czasie')
    axes[0, 1].set_xlabel('Rok')
    axes[0, 1].set_ylabel('Łączna sprzedaż (miliony)')
    axes[0, 1].grid(True, alpha=0.3)

    # 3. Top platformy
    platform_sales = analyzer.df.groupby('Platform')['Global_Sales'].sum().sort_values(ascending=True).tail(10)
    axes[0, 2].barh(range(len(platform_sales)), platform_sales.values, color='lightcoral')
    axes[0, 2].set_yticks(range(len(platform_sales)))
    axes[0, 2].set_yticklabels(platform_sales.index)
    axes[0, 2].set_title('Top 10 Platform - Łączna Sprzedaż')
    axes[0, 2].set_xlabel('Sprzedaż (miliony)')

    # 4. Gatunki vs Sprzedaż
    genre_data = analyzer.df.groupby('Genre').agg({
        'Global_Sales': ['mean', 'count']
    }).round(2)
    genre_data.columns = ['avg_sales', 'count']

    scatter = axes[1, 0].scatter(genre_data['count'], genre_data['avg_sales'],
                                 s=100, alpha=0.7, c=range(len(genre_data)), cmap='viridis')
    axes[1, 0].set_title('Gatunki: Liczba Gier vs Średnia Sprzedaż')
    axes[1, 0].set_xlabel('Liczba gier')
    axes[1, 0].set_ylabel('Średnia sprzedaż (miliony)')

    # Dodaj etykiety gatunków
    for i, (genre, row) in enumerate(genre_data.iterrows()):
        axes[1, 0].annotate(genre, (row['count'], row['avg_sales']),
                            xytext=(5, 5), textcoords='offset points', fontsize=8)

    # 5. Korelacje regionalne
    regional_cols = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales']
    corr_matrix = analyzer.df[regional_cols].corr()

    im = axes[1, 1].imshow(corr_matrix, cmap='coolwarm', vmin=-1, vmax=1)
    axes[1, 1].set_title('Korelacje Między Regionami')
    axes[1, 1].set_xticks(range(len(regional_cols)))
    axes[1, 1].set_yticks(range(len(regional_cols)))
    axes[1, 1].set_xticklabels([col.replace('_Sales', '') for col in regional_cols])
    axes[1, 1].set_yticklabels([col.replace('_Sales', '') for col in regional_cols])

    # Dodaj wartości korelacji
    for i in range(len(regional_cols)):
        for j in range(len(regional_cols)):
            axes[1, 1].text(j, i, f'{corr_matrix.iloc[i, j]:.2f}',
                            ha='center', va='center', fontweight='bold')

    # 6. Analiza anomalii (jeśli dostępna)
    if 'anomaly_detection' in analyzer.results:
        anomalies = analyzer.results['anomaly_detection']['anomalies']
        normal_data = analyzer.results['anomaly_detection']['normal_data']

        axes[1, 2].scatter(normal_data['Critic_Score'], normal_data['Global_Sales'],
                           alpha=0.5, c='blue', label='Normalne', s=20)
        axes[1, 2].scatter(anomalies['Critic_Score'], anomalies['Global_Sales'],
                           alpha=0.8, c='red', label='Anomalie', s=50, marker='^')
        axes[1, 2].set_title('Wykryte Anomalie')
        axes[1, 2].set_xlabel('Critic Score')
        axes[1, 2].set_ylabel('Global Sales')
        axes[1, 2].legend()
        axes[1, 2].set_yscale('log')
    else:
        # Fallback: scatter plot score vs sales
        axes[1, 2].scatter(analyzer.df['Critic_Score'], analyzer.df['Global_Sales'],
                           alpha=0.6, s=20)
        axes[1, 2].set_title('Critic Score vs Global Sales')
        axes[1, 2].set_xlabel('Critic Score')
        axes[1, 2].set_ylabel('Global Sales')
        axes[1, 2].set_yscale('log')

    plt.tight_layout()
    plt.savefig('gameanalytics_advanced_analysis.png', dpi=300, bbox_inches='tight')
    print("📊 Wizualizacje zapisane do: gameanalytics_advanced_analysis.png")

    return fig


# Przykład użycia
if __name__ == "__main__":
    # Uruchom pełną analizę
    analyzer = main()

    # Twórz wizualizacje
    create_advanced_visualizations(analyzer)

    # Wyświetl podsumowanie najważniejszych wyników
    print("\n🏆 NAJWAŻNIEJSZE WYNIKI:")
    print("=" * 40)

    if 'final_report' in analyzer.results:
        report = analyzer.results['final_report']

        print("📈 Executive Summary:")
        for insight in report['executive_summary']['key_insights']:
            print(f"  • {insight}")

        print(f"\n🎯 Jakość Danych: {report['data_quality']['data_completeness']}")
        print(f"📊 Pokrycie Critic Score: {report['data_quality']['critic_score_coverage']}%")

        if 'clustering' in report['detailed_findings']:
            clustering_info = report['detailed_findings']['clustering']
            print(f"\n🧮 Najlepszy Clustering: {clustering_info['best_algorithm']}")
            print(f"   Klastrów: {clustering_info['optimal_clusters']}")
            print(f"   Silhouette Score: {clustering_info['silhouette_score']:.3f}")

        if 'predictive_modeling' in report['detailed_findings']:
            ml_info = report['detailed_findings']['predictive_modeling']
            print(f"\n🤖 Najlepszy Model: {ml_info['best_model']}")
            print(f"   Test R²: {ml_info['test_r2']:.3f}")
            print(f"   Test MAE: {ml_info['test_mae']:.3f}")

        print(f"\n💡 Rekomendacje:")
        for i, rec in enumerate(report['recommendations'], 1):
            print(f"  {i}. {rec}")

    print(f"\n✅ Analiza kompletna! Wszystkie wyniki w zmiennej 'analyzer.results'")