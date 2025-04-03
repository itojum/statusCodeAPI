# HTTP Status Code API

HTTPステータスコードの情報を提供するRESTful APIです。IANAの公式ステータスコード一覧からデータを取得し、Deno KVを使用してキャッシュします。

## 機能

- 全HTTPステータスコードの取得
- 特定のステータスコードの詳細情報取得
- ステータスコードの範囲（2xx, 3xxなど）によるフィルタリング
- 24時間ごとの自動データ更新

## 技術スタック

- [Deno](https://deno.land/) - ランタイム
- [Deno KV](https://deno.land/kv) - データストレージ
- [Hono](https://hono.dev/) - Webフレームワーク
- TypeScript - プログラミング言語


## 使用方法

### サーバーの起動

```bash
deno task start
```

デフォルトで`http://localhost:8000`でサーバーが起動します。

### APIエンドポイント

#### 全ステータスコードの取得

```
GET /status-codes
```

オプションで範囲指定が可能です：

```
GET /status-codes?range=2xx
```

利用可能な範囲：
- `1xx`: 情報レスポンス
- `2xx`: 成功レスポンス
- `3xx`: リダイレクト
- `4xx`: クライアントエラー
- `5xx`: サーバーエラー

#### 特定のステータスコードの取得

```
GET /status-codes/{code}
```

例：
```
GET /status-codes/200
```

## レスポンス形式

### 全ステータスコードの取得

```json
{
  "data": [
    {
      "statusCode": "200",
      "Description": "OK"
    },
    // ...
  ],
  "count": 42
}
```

### 特定のステータスコードの取得

```json
{
  "statusCode": "200",
  "Description": "OK"
}
```

### エラーレスポンス

```json
{
  "error": "Unassigned",
  "code": 404
}
```

## ライセンス

MIT License 