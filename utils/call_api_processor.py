import requests
import json


class CallAPIProcessor(object):

    @classmethod
    def api(cls, url, request, data={}, params={}):
        headers = {'Content-Type': 'application/soap+xml', 'charset': 'utf-8'}
        if request.method == "GET":
            return requests.get(url=url, params=params, headers=headers)
        elif request.method == "POST":
            return requests.post(url=url, data=json.dumps(data), headers=headers)
        elif request.method == "PATCH":
            return requests.patch(url=url, data=json.dumps(data), headers=headers)
        elif request.method == "PUT":
            return requests.put(url=url, data=json.dumps(data), headers=headers)
        elif request.method == "DELETE":
            return requests.delete(url=url, headers=headers)


if __name__ == '__main__':
    pass
