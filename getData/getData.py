import datetime
import pandas as pd 
import numpy as np
import requests
import json
import info
import math

regiones = info.regiones
comunas = info.comunas

def getRegionID(region):
    for ID in regiones.keys():
        if regiones[ID] == region:
            return ID

############################ Casos totales acumulados ############################
# Regiones
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto3/CasosTotalesCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_por_region.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("casos_totales_por_region.csv")
data = {}
accumulatedTotalCases = {}
for region in regiones.keys():
    data[region] = {"name": regiones[region], "data": {}}
    for i in df.index:
        if i > 1:
            data[region]["data"][df["Region"][i]]= int(df[regiones[region]][i])
            if not(df["Region"][i] in accumulatedTotalCases.keys()):
                accumulatedTotalCases[df["Region"][i]] = 0
            accumulatedTotalCases[df["Region"][i]] += int(df[regiones[region]][i])
with open(f"../src/data/casos_totales_acumulados_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
dataNacional= {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedTotalCases.keys():
    dataNacional["TOTAL"]["data"][day] = accumulatedTotalCases[day]
with open(f"../src/data/casos_totales_acumulados_nacional.json", "w") as file:
    json.dump(dataNacional, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto1/Covid-19_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_por_comuna.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("casos_totales_por_comuna.csv")
data = {}
for j in range(len(df.columns)):
    comuna = df.iloc[1,j]
    if comuna in comunas.keys():
        data[comuna] = {"name": comunas[comuna], "data": {}}
        for i in range(4,len(df)-1):
            if not(math.isnan(float(df.iloc[i,j]))):
                data[comuna]["data"][df.iloc[i,0]] = float(df.iloc[i,j])
with open(f"../src/data/casos_totales_acumulados_comuna.json", "w") as file:
    json.dump(data, file, indent=4)


############################## Casos totales diarios ##############################
#Regiones
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto3/CasosTotalesCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_por_region.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("casos_totales_por_region.csv")
data = {}
accumulatedTotalCases = {}
for region in regiones.keys():
    data[region] = {"name": regiones[region], "data": {}}
    for i in range(2,len(df)-2):
        if int(df[regiones[region]][i+1])- int(df[regiones[region]][i]) > 0:
            data[region]["data"][df["Region"][i+1]]= int(df[regiones[region]][i+1])- int(df[regiones[region]][i])
            if not(df["Region"][i+1] in accumulatedTotalCases.keys()):
                accumulatedTotalCases[df["Region"][i+1]] = 0
            accumulatedTotalCases[df["Region"][i+1]] += int(df[regiones[region]][i+1])- int(df[regiones[region]][i])
        else:
            data[region]["data"][df["Region"][i+1]]= 0
            if not(df["Region"][i+1] in accumulatedTotalCases.keys()):
                accumulatedTotalCases[df["Region"][i+1]] = 0

with open(f"../src/data/casos_totales_diarios_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
dataNacional= {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedTotalCases.keys():
    dataNacional["TOTAL"]["data"][day] = accumulatedTotalCases[day]
with open(f"../src/data/casos_totales_diarios_nacional.json", "w") as file:
    json.dump(dataNacional, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto1/Covid-19_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_por_comuna.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("casos_totales_por_comuna.csv")
data = {}
for j in range(len(df.columns)):
    comuna = df.iloc[1,j]
    if comuna in comunas.keys():
        data[comuna] = {"name": comunas[comuna], "data": {}}
        for i in range(4,len(df)-2):
            if not(math.isnan(float(df.iloc[i,j])) or math.isnan(float(df.iloc[i+1,j]))):
                if float(df.iloc[i+1,j]) - float(df.iloc[i,j]) > 0:
                    data[comuna]["data"][df.iloc[i+1,0]] = float(df.iloc[i+1,j]) - float(df.iloc[i,j])
                else: 
                    data[comuna]["data"][df.iloc[i+1,0]] = 0
with open(f"../src/data/casos_totales_diarios_comuna.json", "w") as file:
    json.dump(data, file, indent=4)


############################## Fallecidos acumulados ##############################
# Regiones
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto14/FallecidosCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("fallecidos_por_region.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("fallecidos_por_region.csv")
data = {}
accumulatedDeceased = {}
for region in regiones.keys():
    data[region] = {"name": regiones[region], "data": {}}
    for i in df.index:
        if i > 1:
            data[region]["data"][df["Region"][i]]= int(df[regiones[region]][i])
            if not(df["Region"][i] in accumulatedDeceased.keys()):
                accumulatedDeceased[df["Region"][i]] = 0
            accumulatedDeceased[df["Region"][i]] += int(df[regiones[region]][i])
with open(f"../src/data/fallecidos_acumulados_region.json", "w") as file:
    json.dump(data, file, indent=4)   

# Nacional
dataNacional= {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedDeceased.keys():
    dataNacional["TOTAL"]["data"][day] = accumulatedDeceased[day]
with open(f"../src/data/fallecidos_acumulados_nacional.json", "w") as file:
    json.dump(dataNacional, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto38/CasosFallecidosPorComuna_T.csv"
res = requests.get(url, allow_redirects=True)
with open("fallecidos_por_comuna.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("fallecidos_por_comuna.csv")
data = {}
for j in range(len(df.columns)):
    comuna = df.iloc[1,j]
    if comuna in comunas.keys():
        data[comuna] = {"name": comunas[comuna], "data": {}}
        for i in range(4,len(df)-1):
            if not(math.isnan(float(df.iloc[i,j]))):
                data[comuna]["data"][df.iloc[i,0]] = float(df.iloc[i,j])
with open(f"../src/data/fallecidos_acumulados_comuna.json", "w") as file:
    json.dump(data, file, indent=4)


############################### Tasa de incidencia ###############################
# Nacional
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto69/carga.nacional.ajustada.csv"
res = requests.get(url, allow_redirects=True)
with open("tasa_incidencia_nacional.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("tasa_incidencia_nacional.csv")
data = {"TOTAL": {"name": "Total Nacional", "data": {}}}
for i in df.index:
    data["TOTAL"]["data"][df["fecha"][i]]= float(df["carga.estimada"][i])
with open(f"../src/data/tasa_incidencia_nacional.json", "w") as file:
    json.dump(data, file, indent=4)

# Regiones
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto69/carga.regional.ajustada.csv"
res = requests.get(url, allow_redirects=True)
with open("tasa_incidencia_regional.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("tasa_incidencia_regional.csv")
data = {}
for region in regiones.keys():
    data[region] = {"name": regiones[region], "data": {}}
for i in df.index:
    regionID=getRegionID(df["Region"][i])
    data[regionID]["data"][df["fecha"][i]]= float(df["carga.estimada"][i])       
with open(f"../src/data/tasa_incidencia_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto18/TasaDeIncidencia_T.csv"
res = requests.get(url, allow_redirects=True)
with open("tasa_incidencia_comuna.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("tasa_incidencia_comuna.csv")
data = {}
for j in range(len(df.columns)):
    comuna = df.iloc[1,j]
    if comuna in comunas.keys():
        data[comuna] = {"name": comunas[comuna], "data": {}}
        for i in range(4,len(df)-1):
            if not(math.isnan(float(df.iloc[i,j] or math.isnan(float(df.iloc[i+1,j]))))):
                if float(df.iloc[i+1,j]) - float(df.iloc[i,j]) > 0:
                    data[comuna]["data"][df.iloc[i+1,0]] = float(df.iloc[i+1,j]) - float(df.iloc[i,j])
                else:
                    data[comuna]["data"][df.iloc[i+1,0]] = 0
with open(f"../src/data/tasa_incidencia_comuna.json", "w") as file:
    json.dump(data, file, indent=4)

################################ Pacientes UCI ################################
# Nacional
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto8/UCI_T.csv"
res = requests.get(url, allow_redirects=True)
with open("pacientes_UCI_por_region.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("pacientes_UCI_por_region.csv")
data = {}
accumulatedUCI = {}
for region in regiones.keys():
    data[region] = {"name": regiones[region], "data": {}}
    for i in df.index:
        if i > 1:
            data[region]["data"][df["Region"][i]]= int(df[regiones[region]][i])
            if not(df["Region"][i] in accumulatedUCI.keys()):
                accumulatedUCI[df["Region"][i]] = 0
            accumulatedUCI[df["Region"][i]] += int(df[regiones[region]][i])
with open(f"../src/data/pacientes_UCI_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Regiones
dataNacional = {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedUCI.keys():
    dataNacional["TOTAL"]["data"][day] = accumulatedUCI[day]
with open(f"../src/data/pacientes_UCI_nacional.json", "w") as file:
    json.dump(dataNacional, file, indent=4)


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
