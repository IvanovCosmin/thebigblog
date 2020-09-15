from flask import Flask
from machine_learning import recomandari
from flask import jsonify

app = Flask(__name__)


@app.route('/postari/<titluPostare>', methods=['POST'])
def get_recomandari(titluPostare):
    return jsonify(recomandari(titluPostare))


if __name__ == '__main__':
    app.run(debug=True)
