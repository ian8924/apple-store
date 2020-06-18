import requests
import re
import json
from datetime import datetime


import pandas as pd
import numpy as np
from bs4 import BeautifulSoup

COL_LOB = 'LoB'
COL_BRAND = 'Brand'
COL_PART_NUMBER = 'Part Number'
COL_PART_DESCRIPTION = 'Part Description'
COL_PRICE = 'DAC Ex VAT (TWD)'
COL_EAN = 'EAN'
COL_ENGRAVING = 'Engraving'
COL_INSTALLMENT = 'Installment'
COL_SRP_INC_VAT = 'SRP Inc VAT'

KEY_EAN = 'EANCode'
KEY_PRICE = 'price'
KEY_IMG = 'IMGLink'
KEY_MODEL = 'model'
KEY_PARTNUMBER = 'specName'
KEY_SIZE = 'productSize'
KEY_CAPACITY = 'capacity'

df = pd.read_excel(
    r'./2019_Dec_11_Pricing_Product_Setup_Info_20191210_1854.xlsx')

APPLE_URL = 'https://www.apple.com/tw/shop/product/'

urls = APPLE_URL + df[COL_PART_NUMBER]

name = df[COL_PART_DESCRIPTION]
LoB = df[COL_LOB]
Brand = df[COL_BRAND]
PartNumber = df[COL_PART_NUMBER]
Price = df[COL_SRP_INC_VAT]
EANCode = df[COL_EAN]
Engraving = df[COL_ENGRAVING]
Installment = df[COL_INSTALLMENT]

all = {}


for i in df.index:
    if df[COL_LOB][i] not in all:
        all[df[COL_LOB][i]] = {}
    if df[COL_BRAND][i] not in all[df[COL_LOB][i]]:
        all[df[COL_LOB][i]][df[COL_BRAND][i]] = []


def parseAccessories(partnumber, partdescript):
    # if "Pro Display XDR" not in partdescript:
    #     return
    url_format = 'https://www.apple.com/tw/shop/product/{partnumber}'
    response = requests.request(
        "GET", url_format.format(partnumber=partnumber.lower()))
    soup = BeautifulSoup(response.text, 'html.parser')
    if "Pro Display XDR" in partdescript:
        products = json.loads(soup.find('script', id='metrics').text)['products']
        for prod in products:
            if prod['sku'] in partnumber:
                title = prod['name']
        pass
    else:
        title = soup.find('h1').text.strip().replace('\xa0', ' ')
    try:
        imgSrc = soup.find('meta', property="og:image").get('content')
    except AttributeError:
        imgSrc = soup.find(
            'div', {'class': 'main-image'}).find('img').get('src')
    data = {
        "title": title,
        "IMGLink": imgSrc
    }
    colors = soup.find_all('li', {'class': 'colornav-item'})
    for color in colors:
        if not color.find('input', checked="checked"):
            continue
        swatch = color.find('img').get('src')
        data['imgSwatch'] = swatch
        break
    return data


def parseMac(brand, partnumber):
    url_format = 'https://www.apple.com/tw/shop/buy-mac/{brand}?proceed=proceed&product={partnumber}'
    response = requests.request("GET", url_format.format(
        brand=brand.lower().replace(" ", "-"), partnumber=partnumber.lower()))
    soup = BeautifulSoup(response.text, 'html.parser')
    title = soup.find('meta', property="og:title").get(
        'content').replace('\xa0', ' ')
    data = {
        "title": title,
    }

    # 取得 mac 硬體規格
    url_format2 = 'https://www.apple.com/tw/shop/configUpdate/{partnumber}?node=home/shop_mac/family/{brand}/config&product={partnumber}&step=config'
    response = requests.request(
        "GET", url_format2.format(brand=brand, partnumber=partnumber.lower()))
    apires = json.loads(response.text)[
        'body']['replace']['summary']
    data['title'] = apires['processorLead'].replace('\xa0', ' ')
    data['IMGLink'] = apires['heroImage']['srcSet']['src']
    data['modelspecs'] = []
    for opt in apires['options']:
        if opt['isNone']:
            continue
        data['modelspecs'].append(opt['label'])

    return data


def parseWatch(brand, partnumber, partdescript):
    # print(repr(partdescript.replace('\xa0', ' ')))
    if brand == 'Bands':
        # return
        url_format = "https://www.apple.com/tw/shop/product/{partnumber}"
    elif brand == 'Watch Series 3' or 'Series 3' in partdescript.replace('\xa0', ' '):
        # return
        url_format = 'https://www.apple.com/tw/shop/buy-watch/apple-watch-series-3?proceed=proceed&product={partnumber}&step=select&preSelect=false'
        url_api = 'https://www.apple.com/tw/shop/updateSummary?node=home/shop_watch/family/apple_watch_series_3&step=detail&product={partnumber}'
    else:
        # return
        url_format = 'https://www.apple.com/tw/shop/buy-watch/apple-watch?proceed=proceed&product={partnumber}&step=select&preSelect=false'
        url_api = 'https://www.apple.com/tw/shop/updateSummary?node=home/shop_watch/family/apple_watch&step=detail&product={partnumber}&basePartNumber={basenumber}'
    response = requests.request(
        "GET", url_format.format(partnumber=partnumber.lower()))
    soup = BeautifulSoup(response.text, 'html.parser')
    title = soup.find('meta', property="og:title").get(
        'content').replace('\xa0', ' ')
    imgSrc = soup.find('meta', property="og:image").get('content')
    data = {
        "title": title,
        "IMGLink": imgSrc
    }

    if 'Series 3' in partdescript.replace('\xa0', ' '):
        response = requests.request(
            "GET", url_api.format(partnumber=partnumber.lower()))
        apires = json.loads(json.loads(response.text)[
            'body']['response']['summarySection']['microdata'])
        data['IMGLink'] = apires['image']

    elif 'Series 5' in partdescript.replace('\xa0', ' '):
        response = requests.request(
            "GET", url_api.format(partnumber=partnumber.lower(), basenumber=partnumber[0:5]))
        apires = json.loads(json.loads(response.text)[
            'body']['response']['summarySection']['microdata'])
        data['IMGLink'] = apires['image']

    # if 'Watch' in brand:
    #     response = requests.request(
    #         "GET", url_api.format(partnumber=partnumber.lower()))
    #     data['IMGLink']

    if brand == 'Bands':
        imgSrc = soup.find(
            'div', {'class': 'gallery-main-image'})
        if imgSrc:
            data['IMGLink'] = imgSrc.find('img').get('src')
        colors = soup.find_all('li', {'class': 'colornav-item'})
        for color in colors:
            if not color.find('input', checked="checked"):
                continue
            swatch = color.find('img').get('src')
            data['imgSwatch'] = swatch
            break
        radio = soup.find(
            'input', {'name': 'option.dimensionbandsize', 'checked': 'checked'})
        if radio:
            li = radio.find_parent('li')
            data['title'] = data['title'] + '，' + \
                li.find('span', {'class': 'as-pdp-dimensionguideinfo'}).text
    return data


def parseiPhone(brand, partnumber):
    url_format = 'https://www.apple.com/tw/shop/updateSummary?node=home/shop_iphone/family/{brand}&step=select&product={partnumber}&carrierPolicyType=UNLOCKED'
    brand = brand.lower().replace(" ", '_').replace('_max', "").replace('_plus', "")
    response = requests.request(
        "GET", url_format.format(brand=brand, partnumber=partnumber.lower()))
    data = json.loads(response.text)[
        'body']['response']['summarySection']['microdata']
    data = json.loads(data)
    imgSrc = data['image']
    return {
        "IMGLink": imgSrc
    }


def parseiPad(brand, partnumber):
    url_format = 'https://www.apple.com/tw/shop/updateSummary?node=home/shop_ipad/family/{brand}&step=select&product={partnumber}'

    my_brand = brand if brand != "iPad" else "ipad_10_2"
    response = requests.request(
        "GET", url_format.format(brand=my_brand.lower().replace(" ", '_'), partnumber=partnumber.lower()))
    data = json.loads(response.text)[
        'body']['response']['summarySection']['microdata']
    data = json.loads(data)
    imgSrc = data['image']
    return {
        "IMGLink": imgSrc
    }


def parseTV(brand, partnumber):
    url_format = 'https://www.apple.com/tw/shop/updateSummary?node=home/shop_tv/family/{brand}_4k&step=select&product={partnumber}'
    response = requests.request(
        "GET", url_format.format(brand=brand.lower().replace(" ", '_'), partnumber=partnumber.lower()))
    data = json.loads(response.text)[
        'body']['response']['summarySection']['microdata']
    data = json.loads(data)
    imgSrc = data['image']
    return {
        "IMGLink": imgSrc
    }


def parseMusic(brand, partnumber):
    url_touch = 'https://www.apple.com/tw/shop/buy-ipod/ipod-touch'
    url_homepod = 'https://www.apple.com/tw/shop/updateSummary?node=home/shop_homepod/family/homepod&step=select&product={partnumber}'
    url_beats = 'https://www.apple.com/tw/shop/product/{partnumber}'
    if brand == 'Beats':
        # return
        response = requests.request(
            "GET", url_beats.format(partnumber=partnumber.lower()))
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.find('h1').text.strip().replace('\xa0', ' ')
        imgSrc = soup.find('meta', property="og:image").get('content')
        colors = soup.find_all('li', {'class': 'colornav-item'})
        swatch = ''
        for color in colors:
            if not color.find('input', checked="checked"):
                continue
            swatch = color.find('img').get('src')
            break
        return {
            "title": title,
            "IMGLink": imgSrc,
            "imgSwatch": swatch
        }
    elif brand == 'HomePod':
        # return
        response = requests.request(
            "GET", url_homepod.format(partnumber=partnumber.lower()))
        data = json.loads(response.text)[
            'body']['response']['summarySection']['microdata']
        data = json.loads(data)
        imgSrc = data['image']
        title = data['name'].replace('\xa0', ' ')
        return {
            "IMGLink": imgSrc,
            "title": title
        }
    elif brand == 'iPod touch':
        # return
        response = requests.request("GET", url_touch)
        for line in response.text.split('\n'):
            if 'window.asBuyFlow.heroData' not in line:
                continue
            data = json.loads(line.replace(
                'window.asBuyFlow.heroData =', '').replace(';', ''))
            for product in data['products']:
                if product['partNumber'] != partnumber:
                    continue
                key = product['imageKey']
                imgSrc = data['imageDictionary'][key]['srcSet']['src']
                return {
                    "IMGLink": imgSrc
                }


for index, val in enumerate(PartNumber):
    try:
        # 更換特殊字元，避免錯誤
        trim_name = name[index].replace(
            '\xa0', ' ').replace('–', '-').replace('‑', '-')
        data = {}
        if 'Accessories' in LoB[index] or 'Accessories' in Brand[index]:
            # continue
            # if 'Pro Display XDR' not in trim_name:
            #     continue
            data = parseAccessories(val, trim_name)
        elif LoB[index] == 'Mac':
            # continue
            data = parseMac(Brand[index], val)
        elif LoB[index] == 'Watch':
            # continue
            data = parseWatch(Brand[index], val, trim_name)
        elif LoB[index] == 'iPhone':
            # continue
            data = parseiPhone(Brand[index], val)
        elif LoB[index] == 'iPad':
            # continue
            data = parseiPad(Brand[index], val)

        elif LoB[index] == 'Apple TV':
            # continue
            data = parseTV(Brand[index], val)

        elif LoB[index] == 'Music':
            # continue
            data = parseMusic(Brand[index], val)
        else:
            continue
        print(trim_name)

        # parse product size
        productSize = re.match(r'\d+(\.\d+)?-inch', trim_name)
        productSize = productSize.group().replace('-inch', '') if productSize else ''

        # parse capacity
        capacity = re.findall(r'([0-9]+GB|[0-9]+TB){1}', trim_name)
        capacity = int(capacity[0].replace('GB', '').replace(
            'TB', '')) if len(capacity) == 1 else 0

        # parse casesize
        casesize = re.findall(r'([0-9]+mm){1}', trim_name)
        casesize = int(casesize[0].replace('mm', '')
                       ) if len(casesize) == 1 else 0

        # parse connectivity
        if LoB[index] == 'iPad':
            connectivity = "Wi-Fi + Cellular" if "Wi-Fi + Cellular" in trim_name else ''
            connectivity = "Wi-Fi" if connectivity == "" and "Wi-Fi" in trim_name else connectivity
        elif LoB[index] == 'Watch':
            connectivity = "GPS + Cellular" if "GPS + Cellular" in trim_name else ''
            connectivity = "GPS" if connectivity == "" and "GPS" in trim_name else connectivity
        else:
            connectivity = ""

        # parse bandsize
        if 'Bands' in Brand[index]:
            bandsize = trim_name.split(' - ')
            bandsize = bandsize[1] if len(bandsize) > 1 else ''
            data['bandSize'] = bandsize

        # parse color
        if 'iPhone' in Brand[index] and 'Accessories' not in Brand[index] and 'Accessories' not in LoB[index]:
            color = trim_name.replace(Brand[index], '').replace(
                '{}GB'.format(capacity), '').strip()
        elif 'Watch Series' in Brand[index] or 'Watch Nike' in Brand[index]:
            color = trim_name.split(', ')[1]
            color = color\
                .replace('{}mm'.format(casesize), '')\
                .replace(bandsize, '')\
                .replace(' - ', '')

        elif 'Bands' in Brand[index]:
            bandType = [
                'Nike Sport Band',
                'Nike Sport Loop',
                'Sport Loop',
                'Sport Band',
                'Leather Loop',
                'Modern Buckle',
                'Milanese Loop',
                'Link Bracelet'
            ]
            color = trim_name
            for type_ in bandType:
                color = color.replace(type_, '')
            color = color\
                .replace('{}mm'.format(casesize), '')\
                .replace(bandsize, '')\
                .replace('-', '')\
                .strip()

        elif 'Watch' in Brand[index]:
            color = ''
        else:
            # color = re.findall(r'\s-\s\w+\s?\w+', trim_name)
            colors = trim_name.split(' - ')
            color = colors[-1] if len(colors) > 1 else ''
            if 'Keyboard' in trim_name:
                if len(colors) == 2:
                    data['inputType'] = colors[-1]
                elif len(colors) == 3:
                    data['inputType'] = colors[-2]
                elif len(colors) == 1:
                    data['inputType'] = 'US English'
                color = ''
            if 'Pro Display XDR' in trim_name:
                if len(colors) == 2:
                    data['displayGlass'] = colors[-1]
                color = ''

        if 'Bands' in Brand[index]:
            bandType = trim_name.replace('{}mm'.format(casesize), '').replace(
                color, '').replace(' - ', '').replace(bandsize, '').strip()
            data['bandType'] = bandType
        elif 'Watch' in Brand[index]:
            watchType = trim_name.replace(
                '{}mm'.format(casesize), '').split(', ')
            if len(watchType) != 1:
                watchType = watchType[1].split(' - ')
                data['watchType'] = watchType[0].strip()

        data['color'] = color
        data['productSize'] = productSize
        data['capacity'] = capacity
        data['connectivity'] = connectivity
        data['caseSize'] = casesize
        data['name'] = trim_name
        data['EANCode'] = str(EANCode[index])
        # data['price'] = int(float(Price[index].replace(',', '')))
        data['price'] = int(Price[index]) if not np.isnan(Price[index]) else 0
        data['specName'] = PartNumber[index]
        data['model'] = Brand[index]
        data['engraving'] = 1 if Engraving[index] == "O" else 0
        data['installment'] = int(Installment[index]) if not np.isnan(
            Installment[index]) else 1
        # print(json.dumps(data, indent=4))
        all[LoB[index]][Brand[index]].append(data)

    except Exception as e:
        print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        print(trim_name, e)
        print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

        pass
    finally:
        pass

date_time = datetime.now().strftime("%Y%m%d_%H%M%S")
with open('raw{}.json'.format(date_time), 'w', encoding='utf-8') as f:
    json.dump(all, f, indent=4, ensure_ascii=False)
