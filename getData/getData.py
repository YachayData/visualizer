import pandas as pd 
import numpy as np
import requests
import json
import infoRegiones

regiones = infoRegiones.regiones
regionesID = infoRegiones.regionesID

'''
# Casos totales acumulados
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto3/CasosTotalesCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("casos_totales_por_region.csv","wb") as file:
    file.write(res.content)

dfTotalCases = pd.read_csv("casos_totales_por_region.csv")
dataTotalCases = {}
accumulatedTotalCases = {}
for region in regiones:
    regionID=regionesID[region]
    dataTotalCases[regionID] = {}
    dataTotalCases[regionID]["name"] = region
    dataTotalCases[regionID]["data"] = {}
    for i in dfTotalCases.index:
        if i > 1:
            dataTotalCases[regionID]["data"][dfTotalCases["Region"][i]]= int(dfTotalCases[region][i])
            if not(dfTotalCases["Region"][i] in accumulatedTotalCases.keys()):
                accumulatedTotalCases[dfTotalCases["Region"][i]] = 0
            accumulatedTotalCases[dfTotalCases["Region"][i]] += int(dfTotalCases[region][i])

dataTotalCases["TOTAL"] = {}
dataTotalCases["TOTAL"]["name"] = "Total"
dataTotalCases["TOTAL"]["data"] = {}
for day in accumulatedTotalCases.keys():
    dataTotalCases["TOTAL"]["data"][day] = accumulatedTotalCases[day]

with open(f"../src/data/casos_totales_acumulados.json", "w") as file:
    json.dump(dataTotalCases, file, indent=4)
    
# Pacientes UCI 
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto8/UCI_T.csv"
res = requests.get(url, allow_redirects=True)
with open("pacientes_UCI_por_region.csv","wb") as file:
    file.write(res.content)

dfUCI = pd.read_csv("pacientes_UCI_por_region.csv")
dataUCI = {}
accumulatedUCI = {}
for region in regiones:
    regionID=regionesID[region]
    dataUCI[regionID] = {}
    dataUCI[regionID]["name"] = region
    dataUCI[regionID]["data"] = {}
    for i in dfUCI.index:
        if i > 1:
            dataUCI[regionID]["data"][dfUCI["Region"][i]]= int(dfUCI[region][i])
            if not(dfUCI["Region"][i] in accumulatedUCI.keys()):
                accumulatedUCI[dfUCI["Region"][i]] = 0
            accumulatedUCI[dfUCI["Region"][i]] += int(dfUCI[region][i])

dataUCI["TOTAL"] = {}
dataUCI["TOTAL"]["name"] = "Total"
dataUCI["TOTAL"]["data"] = {}
for day in accumulatedUCI.keys():
    dataUCI["TOTAL"]["data"][day] = accumulatedUCI[day]

with open(f"../src/data/pacientes_UCI.json", "w") as file:
    json.dump(dataUCI, file, indent=4)

# Fallecidos acumulados
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto14/FallecidosCumulativo_T.csv"
res = requests.get(url, allow_redirects=True)
with open("fallecidos_por_region.csv","wb") as file:
    file.write(res.content)

dfDeceased = pd.read_csv("fallecidos_por_region.csv")
dataDeceased = {}
accumulatedDeceased = {}
for region in regiones:
    regionID=regionesID[region]
    dataDeceased[regionID] = {}
    dataDeceased[regionID]["name"] = region
    dataDeceased[regionID]["data"] = {}
    for i in dfDeceased.index:
        if i > 1:
            dataDeceased[regionID]["data"][dfDeceased["Region"][i]]= int(dfDeceased[region][i])
            if not(dfDeceased["Region"][i] in accumulatedDeceased.keys()):
                accumulatedDeceased[dfDeceased["Region"][i]] = 0
            accumulatedDeceased[dfDeceased["Region"][i]] += int(dfDeceased[region][i])

dataDeceased["TOTAL"] = {}
dataDeceased["TOTAL"]["name"] = "Total"
dataDeceased["TOTAL"]["data"] = {}
for day in accumulatedDeceased.keys():
    dataDeceased["TOTAL"]["data"][day] = accumulatedDeceased[day]

with open(f"../src/data/fallecidos_acumulados.json", "w") as file:
    json.dump(dataDeceased, file, indent=4)   

# Tasa de incidencia 
url_nacional = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto69/carga.nacional.ajustada.csv"
res = requests.get(url_nacional, allow_redirects=True)
with open("tasa_incidencia_nacional.csv","wb") as file:
    file.write(res.content)

dfNationalIRate = pd.read_csv("tasa_incidencia_nacional.csv")
dataNationalIRate = {}
dataNationalIRate["TOTAL"] = {}
dataNationalIRate["TOTAL"]["name"] = r"Total"
dataNationalIRate["TOTAL"]["data"] = {}
for i in dfNationalIRate.index:
    dataNationalIRate["TOTAL"]["data"][dfNationalIRate["fecha"][i]]= float(dfNationalIRate["carga.estimada"][i])

url_region = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto69/carga.regional.ajustada.csv"
res = requests.get(url_region, allow_redirects=True)
with open("tasa_incidencia_regional.csv","wb") as file:
    file.write(res.content)

dfRegionalIRate = pd.read_csv("tasa_incidencia_regional.csv")
dataRegionalIRate = {}
for region in regiones:
    regionID=regionesID[region]
    dataRegionalIRate[regionID] = {}
    dataRegionalIRate[regionID]["name"] = region
    dataRegionalIRate[regionID]["data"] = {}
for i in dfRegionalIRate.index:
    regionID=regionesID[dfRegionalIRate["Region"][i]]
    dataRegionalIRate[regionID]["data"][dfRegionalIRate["fecha"][i]]= float(dfRegionalIRate["carga.estimada"][i])       

dataRegionalIRate["TOTAL"] = dataNationalIRate["TOTAL"]

with open(f"../src/data/tasa_incidencia.json", "w") as file:
    json.dump(dataRegionalIRate, file, indent=4)
'''