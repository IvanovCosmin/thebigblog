import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from database import Postares
import json
from mongoengine import connect
from stop_words import get_stop_words

with open('config.json') as config:
    config = json.load(config)
connection_string = config["connection_string"]
connect(host=connection_string)

postari = Postares.objects
metadata = []
for postare in postari:
    metadata.append(postare.continut)

stop_words = get_stop_words("romanian")
tfdif = TfidfVectorizer(stop_words)
tfdif_matrix = tfdif.fit_transform(metadata)
cosine_sim = linear_kernel(tfdif_matrix, tfdif_matrix)

array = []
for i in range(len(metadata)):
    array.append(i)
indices = pd.Series(array, index=metadata)


def recomandari(titlu):
    continut = postari.get(titlu=titlu).continut
    idx = indices[continut]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[0: 11]
    indici_postari = [i[0] for i in sim_scores]
    recomandari = []
    for indice in indici_postari:
        titlu_recomandare = postari.get(continut=metadata[indice]).titlu
        if titlu != titlu_recomandare:
            recomandari.append(titlu_recomandare)
    return recomandari




