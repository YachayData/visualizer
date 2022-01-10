import pandas as pd
import numpy as np
import json
import datetime
import requests
import info
import math
import statistics

regiones = info.regiones
comunas = info.comunas
columns_comunas = list(comunas.keys())
columns_comunas.append("Comuna")

def preProcessor(df):
    for ID in regiones:
        region = regiones[ID]
        df.at["2020-06-17", region] = statistics.mean([df.at["2020-06-16", region], df.at["2020-06-18", region]])
    df.at["2020-06-17", "Total"] = statistics.mean([df.at["2020-06-16", "Total"], df.at["2020-06-18", "Total"]])

############################### Casos totales ###############################
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto3/CasosTotalesCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_region.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("casos_totales_region.csv")
df = df.rename(columns={"Region":"Fecha"})
df = df.set_index("Fecha")

# Regiones
data = {f"{region}": {
        "name": regiones[region], 
        "data": json.loads(df[regiones[region]].to_json(orient = "index", indent = 1))
        }
    for region in regiones
}
with open(f"../src/data/casos_totales_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
data = {"TOTAL": {
        "name": "Total Nacional", 
        "data": json.loads(df["Total"].to_json(orient = "index", indent = 1))
        }
}
with open(f"../src/data/casos_totales_nacional.json", "w") as file:
    json.dump(data, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto1/Covid-19_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_comuna.csv","wb") as file:
    file.write(res.content)
df_comunas = pd.read_csv("casos_totales_comuna.csv", header=2, usecols=columns_comunas)
df_comunas = df_comunas.iloc[2:-1] 
df_comunas = df_comunas.rename(columns={"Comuna":"Fecha"})
df_comunas = df_comunas.set_index("Fecha")
data = {f"{comuna}": {
        "name": comunas[comuna], 
        "data": json.loads(df_comunas[comuna].to_json(orient = "index", indent = 1))
        }
    for comuna in comunas
}
with open(f"../src/data/casos_totales_comuna.json", "w") as file:
    json.dump(data, file, indent=4)

############################ Casos diarios (media 7 días) ############################
df = df.diff() # Calcular la diferencia
preProcessor(df)
df = df.rolling(7).mean() # Calcular media móvil 7 
df = df.iloc[7:] # Eliminar primeras filas
df[df < 0] = 0
df = np.round(df,decimals = 0)

# Regiones
data = {f"{region}": {
        "name": regiones[region], 
        "data": json.loads(df[regiones[region]].to_json(orient = "index", indent = 1))
        }
    for region in regiones
}
with open(f"../src/data/casos_diarios_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
data = {"TOTAL": {
        "name": "Total Nacional", 
        "data": json.loads(df["Total"].to_json(orient = "index", indent = 1))
        }
}
with open(f"../src/data/casos_diarios_nacional.json", "w") as file:
    json.dump(data, file, indent=4)

# Comunas
df_comunas = df_comunas.diff() # Calcular la diferencia
df_comunas[df_comunas < 0] = 0
df_comunas = df_comunas.rolling(7).mean() # Calcular media móvil 7 
df_comunas = np.round(df_comunas,decimals = 0) 
df_comunas = df_comunas.iloc[7:] # Eliminar primeras filas
data = {f"{comuna}": {
        "name": comunas[comuna], 
        "data": json.loads(df_comunas[comuna].to_json(orient = "index", indent = 1))
        }
    for comuna in comunas
}
with open(f"../src/data/casos_diarios_comuna.json", "w") as file:
    json.dump(data, file, indent=4)

############################ Fallecidos acumulados ############################
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto14/FallecidosCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("fallecidos_region.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("fallecidos_region.csv")
df = df.rename(columns={"Region":"Fecha"})
df = df.set_index("Fecha")

# Regiones
data = {f"{region}": {
        "name": regiones[region], 
        "data": json.loads(df[regiones[region]].to_json(orient = "index", indent = 1))
        }
    for region in regiones
}
with open(f"../src/data/fallecidos_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
data = {"TOTAL": {
        "name": "Total Nacional", 
        "data": json.loads(df["Total"].to_json(orient = "index", indent = 1))
        }
}
with open(f"../src/data/fallecidos_nacional.json", "w") as file:
    json.dump(data, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto38/CasosFallecidosPorComuna_T.csv"
res = requests.get(url, allow_redirects=True)
with open("fallecidos_comuna.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("fallecidos_comuna.csv", header=2, usecols=columns_comunas)
df = df.iloc[2:] 
df = df.rename(columns={"Comuna":"Fecha"})
df = df.set_index("Fecha")
data = {f"{comuna}": {
        "name": comunas[comuna], 
        "data": json.loads(df[comuna].to_json(orient = "index", indent = 1))
        }
    for comuna in comunas
}
with open(f"../src/data/fallecidos_comuna.json", "w") as file:
    json.dump(data, file, indent=4)

################################ Pacientes UCI ################################
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto8/UCI_T.csv"
res = requests.get(url, allow_redirects=True)
with open("pacientes_UCI.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("pacientes_UCI.csv")
df = df.rename(columns={"Region":"Fecha"})
df = df.set_index("Fecha")
df = df.iloc[2:]
df["Total"] = df.sum(axis=1)

# Regiones
data = {f"{region}": {
        "name": regiones[region], 
        "data": json.loads(df[regiones[region]].to_json(orient = "index", indent = 1))
        }
    for region in regiones
}
with open(f"../src/data/UCI_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
data = {"TOTAL": {
        "name": "Total Nacional", 
        "data": json.loads(df["Total"].to_json(orient = "index", indent = 1))
        }
}
with open(f"../src/data/UCI_nacional.json", "w") as file:
    json.dump(data, file, indent=4)

###################### Tasa de incidencia (media 7 días) ######################
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto18/TasaDeIncidencia_T.csv"
res = requests.get(url, allow_redirects=True)
with open("incidencia.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("incidencia.csv")
df = df[df.columns[df.isin(["Total", "Comuna"]).any()]]
df = df.rename(columns= lambda x : str(x)[:-2].replace(".", ""))
df = df.iloc[4:] 
df = df.rename(columns={
    "Regi":"Fecha", 
    "Del Libertador General Bernardo O’Higgins": "O’Higgins",
    "Tarapaca": "Tarapacá",
    "Valparaiso": "Valparaíso",
    "Nuble": "Ñuble",
    "Biobio": "Biobío",
    "La Araucania":"Araucanía",
    "Los Rios": "Los Ríos",
    "Aysen": "Aysén",
    "Magallanes y la Antartica": "Magallanes"
})
df = df.set_index("Fecha")
df = df.astype(float)
df["Total"] = df.sum(axis=1)
df = df.diff() # Calcular la diferencia
df = df.rolling(7).mean() # Calcular media móvil 7 
df = df.iloc[7:] # Eliminar primeras filas
df[df < 0] = 0
df = np.round(df,decimals = 2) 

# Regiones
data = {f"{region}": {
        "name": regiones[region], 
        "data": json.loads(df[regiones[region]].to_json(orient = "index", indent = 1))
        }
    for region in regiones
}
with open(f"../src/data/incidencia_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
data = {"TOTAL": {
        "name": "Total Nacional", 
        "data": json.loads(df["Total"].to_json(orient = "index", indent = 1))
        }
}
with open(f"../src/data/incidencia_nacional.json", "w") as file:
    json.dump(data, file, indent=4)

# Comunas
df = pd.read_csv("incidencia.csv", header=2, usecols=columns_comunas)
df = df.rename(columns={"Comuna":"Fecha"})
df = df.set_index("Fecha")
df = df.diff() # Calcular la diferencia
df = df.rolling(7).mean() # Calcular media móvil 7 
df = df.iloc[7:] # Eliminar primeras filas
df[df < 0] = 0

data = {f"{comuna}": {
        "name": comunas[comuna], 
        "data": json.loads(df[comuna].to_json(orient = "index", indent = 1))
        }
    for comuna in comunas
}
with open(f"../src/data/incidencia_comuna.json", "w") as file:
    json.dump(data, file, indent=4)

# Última actualización
current_time = datetime.datetime.now()
dataTime = {
    "year": current_time.year,
    "month": current_time.month,
    "day": current_time.day,
    "hour": current_time.hour,
    "minute": current_time.minute
} 
with open(f"../src/data/ultima_actualizacion.json", "w") as file:
    json.dump(dataTime, file, indent=4)
