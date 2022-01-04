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

dfTotalCases = pd.read_csv("casos_totales_por_region.csv")
dataTotalCases = {}
accumulatedTotalCases = {}


for region in regiones.keys():
    dataTotalCases[region] = {"name": regiones[region], "data": {}}
    for i in dfTotalCases.index:
        if i > 1:
            dataTotalCases[region]["data"][dfTotalCases["Region"][i]]= int(dfTotalCases[regiones[region]][i])
            if not(dfTotalCases["Region"][i] in accumulatedTotalCases.keys()):
                accumulatedTotalCases[dfTotalCases["Region"][i]] = 0
            accumulatedTotalCases[dfTotalCases["Region"][i]] += int(dfTotalCases[regiones[region]][i])
with open(f"../src/data/casos_totales_acumulados_region.json", "w") as file:
    json.dump(dataTotalCases, file, indent=4)

# Nacional
dataTotalCasesNacional= {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedTotalCases.keys():
    dataTotalCasesNacional["TOTAL"]["data"][day] = accumulatedTotalCases[day]
with open(f"../src/data/casos_totales_acumulados_nacional.json", "w") as file:
    json.dump(dataTotalCasesNacional, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto1/Covid-19_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_por_comuna.csv","wb") as file:
    file.write(res.content)
dfTotalCases = pd.read_csv("casos_totales_por_comuna.csv")
dataTotalCases = {}
for j in range(len(dfTotalCases.columns)):
    comuna = dfTotalCases.iloc[1,j]
    if comuna in comunas.keys():
        dataTotalCases[comuna] = {"name": comunas[comuna], "data": {}}
        for i in range(4,len(dfTotalCases)-1):
            if not(math.isnan(float(dfTotalCases.iloc[i,j]))):
                dataTotalCases[comuna]["data"][dfTotalCases.iloc[i,0]] = float(dfTotalCases.iloc[i,j])
with open(f"../src/data/casos_totales_acumulados_comuna.json", "w") as file:
    json.dump(dataTotalCases, file, indent=4)


############################## Fallecidos acumulados ##############################
# Regiones
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto14/FallecidosCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("fallecidos_por_region.csv","wb") as file:
    file.write(res.content)
dfDeceased = pd.read_csv("fallecidos_por_region.csv")
dataDeceased = {}
accumulatedDeceased = {}
for region in regiones.keys():
    dataDeceased[region] = {"name": regiones[region], "data": {}}
    for i in dfDeceased.index:
        if i > 1:
            dataDeceased[region]["data"][dfDeceased["Region"][i]]= int(dfDeceased[regiones[region]][i])
            if not(dfDeceased["Region"][i] in accumulatedDeceased.keys()):
                accumulatedDeceased[dfDeceased["Region"][i]] = 0
            accumulatedDeceased[dfDeceased["Region"][i]] += int(dfDeceased[regiones[region]][i])
with open(f"../src/data/fallecidos_acumulados_region.json", "w") as file:
    json.dump(dataDeceased, file, indent=4)   

# Nacional
dataDeceasedNacional= {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedDeceased.keys():
    dataDeceasedNacional["TOTAL"]["data"][day] = accumulatedDeceased[day]
with open(f"../src/data/fallecidos_acumulados_nacional.json", "w") as file:
    json.dump(dataDeceasedNacional, file, indent=4)

# Comunas
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto38/CasosFallecidosPorComuna_T.csv"
res = requests.get(url, allow_redirects=True)
with open("fallecidos_por_comuna.csv","wb") as file:
    file.write(res.content)
dfDeceased = pd.read_csv("fallecidos_por_comuna.csv")
dataDeceased = {}
for j in range(len(dfDeceased.columns)):
    comuna = dfDeceased.iloc[1,j]
    if comuna in comunas.keys():
        dataDeceased[comuna] = {"name": comunas[comuna], "data": {}}
        for i in range(4,len(dfDeceased)-1):
            if not(math.isnan(float(dfDeceased.iloc[i,j]))):
                dataDeceased[comuna]["data"][dfDeceased.iloc[i,0]] = float(dfDeceased.iloc[i,j])
with open(f"../src/data/fallecidos_acumulados_comuna.json", "w") as file:
    json.dump(dataDeceased, file, indent=4)



############################### Tasa de incidencia ###############################
# Nacional
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto69/carga.nacional.ajustada.csv"
res = requests.get(url, allow_redirects=True)
with open("tasa_incidencia_nacional.csv","wb") as file:
    file.write(res.content)
dfNationalIRate = pd.read_csv("tasa_incidencia_nacional.csv")
dataNationalIRate = {"TOTAL": {"name": "Total Nacional", "data": {}}}
for i in dfNationalIRate.index:
    dataNationalIRate["TOTAL"]["data"][dfNationalIRate["fecha"][i]]= float(dfNationalIRate["carga.estimada"][i])
with open(f"../src/data/tasa_incidencia_nacional.json", "w") as file:
    json.dump(dataNationalIRate, file, indent=4)

# Regiones
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto69/carga.regional.ajustada.csv"
res = requests.get(url, allow_redirects=True)
with open("tasa_incidencia_regional.csv","wb") as file:
    file.write(res.content)
dfRegionalIRate = pd.read_csv("tasa_incidencia_regional.csv")
dataRegionalIRate = {}
for region in regiones.keys():
    dataRegionalIRate[region] = {"name": regiones[region], "data": {}}
for i in dfRegionalIRate.index:
    regionID=getRegionID(dfRegionalIRate["Region"][i])
    dataRegionalIRate[regionID]["data"][dfRegionalIRate["fecha"][i]]= float(dfRegionalIRate["carga.estimada"][i])       
with open(f"../src/data/tasa_incidencia_region.json", "w") as file:
    json.dump(dataRegionalIRate, file, indent=4)

################################ Pacientes UCI ################################
# Nacional
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto8/UCI_T.csv"
res = requests.get(url, allow_redirects=True)
with open("pacientes_UCI_por_region.csv","wb") as file:
    file.write(res.content)
dfUCI = pd.read_csv("pacientes_UCI_por_region.csv")
dataUCI = {}
accumulatedUCI = {}
for region in regiones.keys():
    dataUCI[region] = {"name": regiones[region], "data": {}}
    for i in dfUCI.index:
        if i > 1:
            dataUCI[region]["data"][dfUCI["Region"][i]]= int(dfUCI[regiones[region]][i])
            if not(dfUCI["Region"][i] in accumulatedUCI.keys()):
                accumulatedUCI[dfUCI["Region"][i]] = 0
            accumulatedUCI[dfUCI["Region"][i]] += int(dfUCI[regiones[region]][i])
with open(f"../src/data/pacientes_UCI_region.json", "w") as file:
    json.dump(dataUCI, file, indent=4)

# Regiones
dataUCINacional = {"TOTAL": {"name": "Total Nacional", "data": {}}}
for day in accumulatedUCI.keys():
    dataUCINacional["TOTAL"]["data"][day] = accumulatedUCI[day]
with open(f"../src/data/pacientes_UCI_nacional.json", "w") as file:
    json.dump(dataUCINacional, file, indent=4)