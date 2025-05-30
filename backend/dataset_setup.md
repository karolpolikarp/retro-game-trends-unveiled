
# Konfiguracja Dataset Kaggle dla GameAnalytics

## Pobranie Dataset z Kaggle

1. **Pobierz dataset "Video Games Sales":**
   - Przejdź na: https://www.kaggle.com/datasets/zahidmughal2343/video-games-sale
   - Kliknij "Download" aby pobrać plik `vgsales.csv`

2. **Umieść plik w folderze backend:**
   ```
   backend/
   ├── main.py
   ├── vgsales.csv  ← Tutaj umieść pobrany plik
   └── requirements.txt
   ```

3. **Struktura dataset (vgsales.csv):**
   - **Rank**: Ranking gry według sprzedaży globalnej
   - **Name**: Nazwa gry
   - **Platform**: Platforma (PS4, XOne, PC, Wii, etc.)
   - **Year**: Rok wydania
   - **Genre**: Gatunek (Action, Sports, Shooter, etc.)
   - **Publisher**: Wydawca (Nintendo, EA, Activision, etc.)
   - **NA_Sales**: Sprzedaż w Ameryce Północnej (w milionach)
   - **EU_Sales**: Sprzedaż w Europie (w milionach)
   - **JP_Sales**: Sprzedaż w Japonii (w milionach)
   - **Other_Sales**: Sprzedaż w innych regionach (w milionach)
   - **Global_Sales**: Globalna sprzedaż (w milionach)

## Uruchomienie backendu z prawdziwymi danymi

```bash
cd backend
pip install -r requirements.txt
python main.py
```

## Weryfikacja

Po uruchomieniu, przejdź do:
- http://localhost:8000/api/dataset-info - informacje o załadowanym datasecie
- http://localhost:8000/docs - dokumentacja API

## Fallback

Jeśli plik `vgsales.csv` nie zostanie znaleziony, aplikacja automatycznie użyje przykładowych danych i wyświetli ostrzeżenie w konsoli.

## Statystyki Dataset

Dataset zawiera około **16,600 gier** z lat **1980-2020**:
- 31 platform
- 12 głównych gatunków  
- Ponad 500 wydawców
- Łączna sprzedaż: ~8,900M egzemplarzy
- Zakres lat: 1980-2020 (filtrowane do 1980-2015 zgodnie z wymaganiami projektu)
