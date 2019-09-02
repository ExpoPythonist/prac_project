import requests
import json


class LanguageDetector(object):
    with open('languages.txt', encoding="utf8") as json_file:
        lan_json = json.load(json_file)

    @classmethod
    def get_language_processor(cls):
        lan_data = "en"
        if cls.client_lang() == "en":
            lan_data = cls.lan_json['bn']

        elif cls.client_lang() == "bn":
            lan_data = cls.lan_json['en']
        return lan_data

    @classmethod
    def client_lang(cls):
        url = "https://exercise.api.rebiton.com/language"
        detect_lang = requests.get(url)
        lang_data = json.loads(detect_lang.content.decode('utf-8'))
        return lang_data['data']['language']


if __name__ == '__main__':
    # LanguageDetector.detect_language()
    pass
