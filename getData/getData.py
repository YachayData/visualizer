import pandas as pd 
import numpy as np
import requests
import json
import infoRegiones

regiones = infoRegiones.regiones
regionesID = infoRegiones.regionesID

# Pacientes UCI 
url = "https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto8/UCI_T.csv"
res = requests.get(url, allow_redirects=True)
with open("pacientes_UCI_por_region.csv","wb") as file:
    file.write(res.content)

dfUCI = pd.read_csv("pacientes_UCI_por_region.csv")
dataUCI = {}
acumuladoUCI={}
for region in regiones:
    regionID=regionesID[region]
    dataUCI[regionID] = {}
    dataUCI[regionID]["name"] = region
    dataUCI[regionID]["data"] = {}
    for i in dfUCI.index:
        if i > 1:
            dataUCI[regionID]["data"][dfUCI["Region"][i]]= int(dfUCI[region][i])
            if not(dfUCI["Region"][i] in acumuladoUCI.keys()):
                acumuladoUCI[dfUCI["Region"][i]] = 0
            acumuladoUCI[dfUCI["Region"][i]] += int(dfUCI[region][i])

dataUCI["TOTAL"] = {}
dataUCI["TOTAL"]["name"] = "Total"
dataUCI["TOTAL"]["data"] = {}
for dia in acumuladoUCI.keys():
    dataUCI["TOTAL"]["data"][dia] = acumuladoUCI[dia]

with open(f"../src/data/pacientes_UCI.json", "w") as file:
    json.dump(dataUCI, file, indent=4)
            

