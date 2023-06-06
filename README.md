# snowdrop-reservation
100人規模のライブイベントの予約・入場処理

# Folders
### reception
Django project for reception
### reception/read_qr
App for read/parse QR code

# 要件
## システム全体
### 必須
- 予約者への受付確認・入場用QRのメール配信
- 当日のQR読み込みでの入場処理、支払い管理
- ライブ当日にネットワーク環境が悪いことを想定して、入場処理は完全ローカルで動作
    - 当日予約の扱いはどうする？
- キャンセル処理
- イレギュラー対応処理
    - 電話予約
    - 当日のQRコード忘れ
    - 複数人予約の一部入場
        - 複数人予約での同一QRによる別入場
    - 複数人予約の一部キャンセル
    - 車椅子等の要配慮者情報
- Sold out時の処理
    - 同時予約の排他制御はこの規模では不要だとは思うけど余裕があったら検討

### あると嬉しい
- かわいいQRコードの生成(ロゴを真ん中に埋め込んだりしたい)
- 終演後のアンケート送信

### その他
- タブレットデバイスで操作できると嬉しい、Djangoなら吸収してくれる？
- とにかく簡単に操作できるように
- 入場用QRは暗号化する？

# 設計
## QRコード
prefix:id

ex. snowdrop3rd:82219

または

prefix:id:name:name_kana:number_reserved

ex. snowdrop3rd:82219:田中太郎:たなかたろう:1

## ライブラリ
参考
https://qiita.com/PoodleMaster/items/0afbce4be7e442e75be6

### webカメラストリーム
https://deecode.net/?p=382

### QR読み取り
https://note.nkmk.me/python-opencv-qrcode/
