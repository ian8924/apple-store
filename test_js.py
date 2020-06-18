from selenium import webdriver
import requests
import pandas as pd

import json
from bs4 import BeautifulSoup

COL_LOB = 'LoB'
COL_BRAND = 'Brand'
COL_PART_NUMBER = 'Part Number'

df = pd.read_excel(r'/Users/takosu/Desktop/vue-applestore2/2019_Sep_23_Pricing_Product_Setup_Info_20190923_0440.xlsx')

APPLE_URL = 'https://www.apple.com/tw/shop/product/'

urls = APPLE_URL + df[COL_PART_NUMBER]

name = df['Part Description']
LoB = df[COL_LOB]
Brand = df[COL_BRAND]


all = {}


for i in df.index:
    if df[COL_LOB][i] not in all:
        all[df[COL_LOB][i]] = {}
    if df[COL_BRAND][i] not in all[df[COL_LOB][i]]:
        all[df[COL_LOB][i]][df[COL_BRAND][i]] = []


print(json.dumps(all, indent=4))
for index, url in enumerate(urls):
    # name[urls.index('url')]
    if 'Accessories' not in LoB[index] and 'Accessories' not in Brand[index]:
        continue
    # print(url)
    response = requests.request("GET", url)
    soup = BeautifulSoup(response.text, 'html.parser')

    imgs = soup.find_all('div', {'class': 'main-image'})
    title = soup.find('h1').text.strip()
    for img in imgs:
        imgSrc = img.find('img').get('src')
        # print(name[index], title, imgSrc)
    data = {
        "name": name[index],
        "title": title,
        "imgSrc": imgSrc
    }
    all[LoB[index]][Brand[index]].append(data)
    # print(json.dumps(data, ensure_ascii=False, indent=2))
    # break

# print(json.dumps(all, ensure_ascii=False, indent=2))
with open('raw.json', 'w') as f:
    json.dump(all, f, indent=2, ensure_ascii=False)

'''
mac 規則
https://www.apple.com/tw-edu/shop/buy-mac/macbook-air?proceed=proceed&product={partnumber}
MVFH2TA/A
MVFN2TA/A
https://www.apple.com/tw-edu/shop/buy-mac/macbook-pro?proceed=proceed&product={partnumber}
MUHQ2TA/A
MV922TA/A
https://www.apple.com/tw-edu/shop/buy-mac/imac?proceed=proceed&product={partnumber}
MRR12TA/A
MRT42TA/A
https://www.apple.com/tw-edu/shop/buy-mac/imac-pro?proceed=proceed&product={partnumber}
MQ2Y2TA/A
https://www.apple.com/tw-edu/shop/buy-mac/mac-mini?proceed=proceed&product={partnumber}
MRTT2TA/A

'''
