from database import Postares
import json
from mongoengine import connect
from random import seed
from random import randint

with open('config.json') as config:
    config = json.load(config)
connection_string = config["connection_string"]
connect(host=connection_string)

dictionar = ["eu", "tu", "noi", "masa", "casa", "limba", "romana", "internet", "remorca", "joaca", "ceva", "lingvistica", "dictionar", "motor de cautare", "educatie", "mobila"]


def generate_data():
    numar_postari = int(input("numar postari:"))
    numar_cuvinte = int(input("numar cuvinte/postare:"))
    seed(1)
    numar = 1
    for i in range(numar_postari):
        postare_noua = Postares()
        postare_noua.titlu = "test" + str(numar)
        numar += 1
        postare_noua.autori = ["generator"]
        postare_noua.tags = [""]
        postare_noua.continut = ""
        for j in range(numar_cuvinte):
            cuvant = dictionar[randint(0, 15)]
            postare_noua.continut = postare_noua.continut + cuvant + " "
        postare_noua.save()


if __name__ == "__main__":
    generate_data()





