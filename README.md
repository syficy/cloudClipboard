# cloudClipboard
 Use the cross-device clipboard synchronization tool built by vue and gin to access through the browser, and use the browser to read information at any time


# config


```bash
cd ./clipEnd/config
vim application.yml
```

Write your database config.

Your database should have:
*  id Int
*  text LONGTEXT
*  type INT
*  createTime TIMESTAMP
*  updateTime TIMESTAMP


# dev

```bash
cd ./clipEnd/
go run main.go
cd ..
npm run serve
```

# build
```bash
cd ./clipEnd/
go build main.go
cd ..
npm run build
```