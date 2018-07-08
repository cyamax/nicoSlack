# nicoSlack
Slackのコメントをニコニコ動画風に流します。

## イメージ
![image.png](image.png)

## 使い方
### API Tokenを取得
SlaclのAPI Tokenを取得。  
https://api.slack.com/custom-integrations/legacy-tokens  
※ レガシーのトークンにのみ対応

### ダウンロード
```
# Clone this repository
git clone https://github.com/cyamax/nicoSlack
# Go into the repositor
cd nicoSlack
```

### account.jsonにTokenを記入

取得したAPI Tokenを```account.json```に記入。
```
{
    "token" : "xoxp-xxxxxxxxxxxxxxx"}
}
```

### インストール＆実行

```
# Install dependencies
npm install
# Run the App
npm start
```

## Lisence
MIT Lisenceのもとで公開されています。
