# textlint-rule-ja-dash-to-keisen
日本語小説のダッシュを罫線に統一するtextlintルール

ダッシュ表現は、見た目の似た文字が複数存在します。
文字によっては、二つ連続させた際に途中が途切れたり、縦書き字に中央に表示されないことがあります。
これを、フォントや環境の影響を受けにくい、罫線（Unicode U+2500）に統一します。

## Install
```
npm install textlint-rule-ja-dash-to-keisen
```

## Usage
```
{
    "rules": {
        "ja-dash-to-keisen": true
    }
}
```

## License
MIT