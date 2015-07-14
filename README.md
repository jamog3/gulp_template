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

## スプライト画像の作成は都度手動対応のため下記のコマンドを実行

```
$ cd projectName
$ gulp sprite
```

## ディレクトリ構成

srcを編集。

+ ejs -> html
+ js -> browserify -> js
+ scss -> css

```
├── dist/（ビルド後のソース）
│   ├── index.html
│   └── javascripts / stylesheets / images 等
├── node_modules/
│   └── パッケージ各種
├── src（ビルド前のソース）
│   ├── _partial/（共通パーツのhtml）
│   ├── index.ejs（html）
│   ├── images/
│   │    └── sprites/ （スプライト用png）
│   ├── javascripts/
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