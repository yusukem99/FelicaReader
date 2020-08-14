# 概要
Felica用カードリーダーライブラリ  
exampleに動作サンプルがあります。

### デモ
https://yusukem99.github.io/FelicaReader/example/
### インストール

## 使用例
```js
const reader = new FelicaReader();
await reader.getDevice();
await reader.deviceInit()
let data = await reader.readWithOutEncryption();
```

## API
### 

| メソッド | パラメーター
----|----
| deviceInit | deviceInit() |
| getDevice | getDevice() |
|readWithOutEncryption | readWithOutEncryption() |

#### deviceInit()
ライブラリを初期化します。  
デバイスを初期化し、占有します。  失敗した場合、エラーを返します。  
初めに一度呼び出す必要があります。

#### getDevie()
接続されたリーダーを検出します。  
特定のリーダーが見つからない場合はエラーダイアログを表示します。

#### readWithOutEncryption()

非暗号化領域から格納されたデータを読み込みます。  
デフォルトでは、ユーザブロックのS_PAD0からS_PAD4を読み込んだ値を返します。  エンコードはASCIIです。