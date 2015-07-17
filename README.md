# 自分用gulpのひな形

以下、メモ。

## gulpをインストール

```
$ npm install -g gulp
```

## npmパッケージをインストール

```
#プロジェクトのディレクトリに移動して
$ cd projectName
$ npm install
```

## gulp の監視

```
$ cd projectName
$ gulp
```

## スプライト画像

作成・更新は手動対応のため都度、下記のコマンドを実行

```
$ cd projectName
$ gulp sprite
```

## 納品ファイル生成

cssのminifyや、.mapなどを省いたファイルを生成

```
$ cd projectName
$ gulp release
```

## ディレクトリ構成

srcを編集。

+ ejs -> html
+ js -> browserify -> js
+ scss -> css

```
├── dist/（ビルド後のソース）
│   ├── index.html
│   ├── javascripts/
│   │    └── libs/ （browserifyしないjsはここに生成）
│   └── stylesheets / images 等
├── release/（納品ファイルがここに生成される）
├── node_modules/
│   └── パッケージ各種
├── src/（ビルド前のソース）
│   ├── _partial/（共通パーツのhtml）
│   ├── index.ejs（html）
│   ├── images/
│   │    └── sprites/ （スプライト用png）
│   ├── javascripts/
│   │    ├── libs/ （browserifyしないjsをここに格納）
│   │    └── main.js
│   └── stylesheets/
│         ├── _partial/ （共通パーツのcss）
│         └── style.scss
├── .git/
├── .gitignore
├── README.md
├── gulpfile.js
└── package.json
```