import pandas as pd
import json

df_tw = pd.read_excel(r'./1186200_Taiwan ALP Report_EN_07_17_OCT_07_2019.xlsx')


raw_json = json.load(open('src/views/raw_20191029_1716.json', 'r'))

COL_INC_PRICE = 'SRP Inc VAT (TWD)'
COL_PART_NUMBER = 'Part Number'

# 遍歷 raw json 所有的產品
# 找尋 Apple TW 對應的 Part Number
# 在找出對應的定價

for LoB in raw_json.keys():
    for Brand in raw_json[LoB].keys():
        for item in raw_json[LoB][Brand]:
            inc_price = df_tw.loc[df_tw[COL_PART_NUMBER] == item['specName']][COL_INC_PRICE].values
            inc_price = inc_price[0] if len(inc_price) > 0 else "-1"
            inc_price = int(float(inc_price.replace(',', '')))
            item['price'] = inc_price
            if inc_price < 0:
                print(item['specName'], item['name'])

json.dump(raw_json, open('apple_tw_price.json', 'w'), indent=4, ensure_ascii=False)
