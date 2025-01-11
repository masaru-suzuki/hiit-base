# Polar Beat width Oura Ring

## 始め方
1. Polarのログイン
2. Topページから、Polar Beatにリダイレクトされたら、認証
3. 認証後、Topページに戻る
4. usersディレクトリでユーザー情報を確認

## ユーザー情報
- polar-user-id:`58814885`
- member-id:`sample-member-id`

## Vercel
https://vercel.com/masarusuzuki-socialplusjs-projects/hiit-base

## Polar AccessLink API v3
https://www.polar.com/accesslink-api/?javascript--nodejs#polar-accesslink-api

## ログインフロー
TOPページでクッキーに認証情報がなければ、認証フローを開始する
クッキーに認証情報がなければ、認証フローを開始する
認証フローはPolarの認証画面にリダイレクトさせて、ログインを行う
Polarからcallback urlにリダイレクトされて、その際にアクセストークンとユーザーIDをクッキーに保存する
    callback urlは [Open Accesslink](https://admin.polaraccesslink.com/#/clientInformation/58814885/39708) で管理する
クッキーへの保存が完了したら、TOPページにリダイレクトする