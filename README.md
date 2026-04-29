# 玩轉逢甲（Play Fengjia）

逢甲商圈導覽 App MVP UI 原型，採 React Native + Expo + React Native Web，一份程式碼同時支援 iOS / Android / Web。

## 主要功能（原型）

- **互動式 SVG 商圈地圖**：店家可點擊、優惠店家會發光、依分類篩選、搜尋店名
- **店家資訊 Bottom Sheet**：營業時間、招牌商品、可領取優惠
- **活動專區**：商圈管委會限時活動列表 + 詳情頁
- **領券流程**：點擊領券 → 自動進入「我的票券」
- **QR Code 票券**：含可模擬「管委會掃碼核銷」的 Demo 動作
- **服務頁**：管委會公告、商圈設施、聯絡資訊

## 技術棧

- Expo SDK 52
- React Native 0.76 + TypeScript
- React Navigation 7（底部 Tab + Stack）
- react-native-svg（商圈地圖）
- react-native-qrcode-svg（票券 QR Code）

## 啟動方式

```bash
npm install

# 在瀏覽器跑（最快可看到效果）
npm run web

# 在實機 / 模擬器
npm run ios       # 需要 macOS + Xcode
npm run android   # 需要 Android Studio
npm start         # 啟動 Expo Dev Server，掃 QR Code 用 Expo Go 開啟

# 型別檢查
npm run typecheck
```

> 第一次安裝完，建議跑 `npx expo install --fix` 讓相依套件版本完全對齊 Expo SDK。

## 目錄結構

```
src/
├── components/
│   ├── NightMarketMap.tsx     # SVG 商圈地圖（每個店家為一個 Path/Rect）
│   ├── ShopBottomSheet.tsx    # 店家資訊抽屜
│   └── CategoryFilter.tsx     # 分類篩選 Chips
├── screens/
│   ├── MapScreen.tsx          # 地圖主頁（含搜尋與篩選）
│   ├── EventsScreen.tsx       # 活動列表
│   ├── EventDetailScreen.tsx  # 活動詳情 + 領券
│   ├── TicketsScreen.tsx      # 我的票券列表
│   ├── TicketDetailScreen.tsx # QR Code 票券（含模擬核銷）
│   └── ServicesScreen.tsx     # 服務頁
├── navigation/
│   └── RootNavigator.tsx      # Tab + Stack 路由
├── data/
│   ├── shops.ts               # 24 家逢甲店家、街道、地標
│   ├── events.ts              # 5 個示範活動
│   └── store.ts               # 票券狀態（Context）
├── theme.ts                   # 色彩、間距、陰影
└── types.ts                   # TypeScript 型別
```

## 後續銜接（非本原型範圍）

- 將 SVG 換成 Illustrator 真實手繪稿（僅需替換 `shops.ts` 內的座標 & path）
- 後端 API（建議 Supabase / Node + PostgreSQL）
- 管委會核銷端 App（同 codebase 加角色切換）
- 後台 CMS（店家、活動、券發放管理）
- 真實 QR Code JWT 簽章與一次性 token
- 手機號碼 / LINE 登入
