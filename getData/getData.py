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

'''
############################### Casos totales ###############################
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
with open(f"../src/data/casos_totales_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
dataNacional= {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedTotalCases.keys():
    dataNacional["TOTAL"]["data"][day] = accumulatedTotalCases[day]
with open(f"../src/data/casos_totales_nacional.json", "w") as file:
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
with open(f"../src/data/casos_totales_comuna.json", "w") as file:
    json.dump(data, file, indent=4)

'''
######################## Casos diarios (media 7 días) ########################
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
    for i in range(0,len(df)-7):
        d1 = int(df[regiones[region]][i+1])- int(df[regiones[region]][i])
        d2 = int(df[regiones[region]][i+2])- int(df[regiones[region]][i+1])
        d3 = int(df[regiones[region]][i+3])- int(df[regiones[region]][i+2])
        d4 = int(df[regiones[region]][i+4])- int(df[regiones[region]][i+3])
        d5 = int(df[regiones[region]][i+5])- int(df[regiones[region]][i+4])
        d6 = int(df[regiones[region]][i+6])- int(df[regiones[region]][i+5])
        d7 = int(df[regiones[region]][i+7])- int(df[regiones[region]][i+6])
        mean = round((d1+d2+d3+d4+d5+d6+d7)/7,2)
        if mean > 0 :
            data[region]["data"][df["Region"][i+7]]= mean
            if not(df["Region"][i+7] in accumulatedTotalCases.keys()):
                accumulatedTotalCases[df["Region"][i+7]] = 0
            accumulatedTotalCases[df["Region"][i+7]] += mean
        else:
            data[region]["data"][df["Region"][i+7]]= 0
            if not(df["Region"][i+7] in accumulatedTotalCases.keys()):
                accumulatedTotalCases[df["Region"][i+7]] = 0

with open(f"../src/data/casos_diarios_region.json", "w") as file:
    json.dump(data, file, indent=4)

# Nacional
dataNacional= {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedTotalCases.keys():
    dataNacional["TOTAL"]["data"][day] = accumulatedTotalCases[day]
with open(f"../src/data/casos_diarios_nacional.json", "w") as file:
    json.dump(dataNacional, file, indent=4)
'''
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
        for i in range(4,len(df)-8):
            if not(math.isnan(float(df.iloc[i,j]))): # Solo primeros son NaN
                d1 = float(df.iloc[i+1,j]) - float(df.iloc[i,j])
            else:
                d1 = float(df.iloc[i+1,j]) 
            d2 = float(df.iloc[i+2,j]) - float(df.iloc[i+1,j])
            d3 = float(df.iloc[i+3,j]) - float(df.iloc[i+2,j])
            d4 = float(df.iloc[i+4,j]) - float(df.iloc[i+3,j])
            d5 = float(df.iloc[i+5,j]) - float(df.iloc[i+4,j])
            d6 = float(df.iloc[i+6,j]) - float(df.iloc[i+5,j])
            d7 = float(df.iloc[i+7,j]) - float(df.iloc[i+6,j])
            mean = round((d1+d2+d3+d4+d5+d6+d7)/7,2)
            if mean > 0 :
                data[comuna]["data"][df.iloc[i+7,0]] = mean
            else:
                data[comuna]["data"][df.iloc[i+7,0]] = 0

with open(f"../src/data/casos_diarios_comuna.json", "w") as file:
    json.dump(data, file, indent=4)

############################ Fallecidos acumulados ############################
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


###################### Tasa de incidencia (media 7 días) ######################
# Nacional
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto69/carga.nacional.ajustada.csv"
res = requests.get(url, allow_redirects=True)
with open("tasa_incidencia_nacional.csv","wb") as file:
    file.write(res.content)
df = pd.read_csv("tasa_incidencia_nacional.csv")
data = {"TOTAL": {"name": "Total Nacional", "data": {}}}
for i in range(len(df)-6):
    d1 = float(df["carga.estimada"][i])
    d2 = float(df["carga.estimada"][i+1])
    d3 = float(df["carga.estimada"][i+2])
    d4 = float(df["carga.estimada"][i+3])
    d5 = float(df["carga.estimada"][i+4])
    d6 = float(df["carga.estimada"][i+5])
    d7 = float(df["carga.estimada"][i+6])
    mean = round((d1+d2+d3+d4+d5+d6+d7)/7,2)
    data["TOTAL"]["data"][df["fecha"][i+6]]= mean
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
    for i in range(len(df)-6):
        if (df["Region"][i+6] == regiones[region]):
            d1 = float(df["carga.estimada"][i])
            d2 = float(df["carga.estimada"][i+1])
            d3 = float(df["carga.estimada"][i+2])
            d4 = float(df["carga.estimada"][i+3])
            d5 = float(df["carga.estimada"][i+4])
            d6 = float(df["carga.estimada"][i+5])
            d7 = float(df["carga.estimada"][i+6])
            mean = round((d1+d2+d3+d4+d5+d6+d7)/7,2)
            data[region]["data"][df["fecha"][i+6]]= mean    
 
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
        for i in range(4,len(df)-8):
            if not(math.isnan(float(df.iloc[i,j]))): # Solo primeros son NaN
                d1 = float(df.iloc[i+1,j]) - float(df.iloc[i,j])
            else:
                d1 = float(df.iloc[i+1,j]) 
            d2 = float(df.iloc[i+2,j]) - float(df.iloc[i+1,j])
            d3 = float(df.iloc[i+3,j]) - float(df.iloc[i+2,j])
            d4 = float(df.iloc[i+4,j]) - float(df.iloc[i+3,j])
            d5 = float(df.iloc[i+5,j]) - float(df.iloc[i+4,j])
            d6 = float(df.iloc[i+6,j]) - float(df.iloc[i+5,j])
            d7 = float(df.iloc[i+7,j]) - float(df.iloc[i+6,j])
            mean = round((d1+d2+d3+d4+d5+d6+d7)/7,2)
            if mean > 0 :
                data[comuna]["data"][df.iloc[i+7,0]] = mean
            else:
                data[comuna]["data"][df.iloc[i+7,0]] = 0
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

'''