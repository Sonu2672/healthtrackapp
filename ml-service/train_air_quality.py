import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# ==========================================
# CREATE AIR QUALITY DATASET
# ==========================================

np.random.seed(42)

n = 500

dust = np.random.uniform(5, 350, n).round(2)
humidity = np.random.uniform(25, 95, n).round(2)
envtemp = np.random.uniform(15, 45, n).round(2)


# ==========================================
# CALCULATE DEMO AIR QUALITY CONDITION
# ==========================================

adjustedDust = dust.copy()

adjustedDust += np.where(
    humidity > 80,
    10,
    0
)

adjustedDust += np.where(
    humidity < 30,
    5,
    0
)

adjustedDust += np.where(
    envtemp > 40,
    8,
    0
)


# ==========================================
# AIR QUALITY LABEL
# ==========================================

def getAirQuality(value):

    if value < 80:
        return "Good"

    elif value < 160:
        return "Moderate"

    elif value < 250:
        return "Poor"

    else:
        return "Unhealthy"


airQualityLevel = np.array([
    getAirQuality(value)
    for value in adjustedDust
])


# ==========================================
# CREATE DATAFRAME
# ==========================================

df = pd.DataFrame({

    "dust": dust,

    "humidity": humidity,

    "envtemp": envtemp,

    "air_quality_level": airQualityLevel

})


# ==========================================
# SAVE CSV
# ==========================================

df.to_csv(
    "air_quality_data.csv",
    index=False
)

print("\n====================================")
print("🌍 AIR QUALITY DATASET CREATED")
print("====================================")

print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nClass Distribution:")
print(
    df["air_quality_level"].value_counts()
)


# ==========================================
# FEATURES
# ==========================================

X = df[
    [
        "dust",
        "humidity",
        "envtemp"
    ]
]


# ==========================================
# TARGET
# ==========================================

y = df["air_quality_level"]


# ==========================================
# TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.20,

    random_state=42,

    stratify=y
)


# ==========================================
# RANDOM FOREST
# ==========================================

model = RandomForestClassifier(

    n_estimators=200,

    max_depth=10,

    random_state=42,

    class_weight="balanced"
)


# ==========================================
# TRAIN MODEL
# ==========================================

print("\n🤖 TRAINING AIR QUALITY MODEL...")

model.fit(
    X_train,
    y_train
)


# ==========================================
# TEST MODEL
# ==========================================

predictions = model.predict(
    X_test
)


# ==========================================
# ACCURACY
# ==========================================

accuracy = accuracy_score(
    y_test,
    predictions
)


print("\n====================================")
print("🤖 AIR QUALITY MODEL RESULT")
print("====================================")

print(
    "Accuracy:",
    round(accuracy * 100, 2),
    "%"
)


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        predictions
    )
)


# ==========================================
# SAVE MODEL
# ==========================================

joblib.dump(
    model,
    "air_quality_model.pkl"
)


# ==========================================
# DONE
# ==========================================

print("\n====================================")
print("✅ AIR QUALITY MODEL SAVED")
print("====================================")

print(
    "📁 air_quality_data.csv"
)

print(
    "🤖 air_quality_model.pkl"
)

print("====================================\n")