from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from statsmodels.tsa.holtwinters import ExponentialSmoothing

app = FastAPI(title="AI Demand Forecasting Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ForecastResponse(BaseModel):
    item_id: str
    forecast: list[dict]

def generate_mock_history():
    # Generate 90 days of synthetic historical data
    dates = [datetime.utcnow() - timedelta(days=i) for i in range(90, 0, -1)]
    # Create a noisy baseline with an upward trend
    base = np.linspace(20, 50, 90)
    noise = np.random.normal(0, 5, 90)
    sales = np.maximum(0, base + noise)
    
    df = pd.DataFrame({
        'date': dates,
        'sales': sales
    })
    # Frequency is Daily
    df.index = pd.DatetimeIndex(df['date']).to_period('D')
    return df

@app.get("/forecast/inventory/{item_id}", response_model=ForecastResponse)
def get_inventory_forecast(item_id: str):
    try:
        # In a real app, query DB for historical sales of item_id
        df = generate_mock_history()
        
        # Train Exponential Smoothing model
        model = ExponentialSmoothing(
            df['sales'], 
            trend='add', 
            seasonal=None, 
            initialization_method="estimated"
        ).fit()
        
        # Predict next 30 days
        forecast = model.forecast(30)
        
        # Prepare response
        future_dates = [datetime.utcnow() + timedelta(days=i) for i in range(1, 31)]
        forecast_data = []
        for d, val in zip(future_dates, forecast):
            forecast_data.append({
                "date": d.strftime("%Y-%m-%d"),
                "predicted_demand": max(0, int(val))
            })
            
        return ForecastResponse(
            item_id=item_id,
            forecast=forecast_data
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok"}
