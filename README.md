# 🔥 Hip Hop 100 Steps

一個專為**初學者**設計的單頁網站，主打 **Hip Hop 100 個經典舞步**影片大全，
並從最基礎的 **Two Step** 帶你踏出第一步。

## ✨ 功能

- **100 個舞步影片大全**：主打嵌入「100 HIP HOP Dance Steps and Moves with Names」，外加多支 100 步影片與播放清單。
- **第一步 Two Step 教學**：用純 CSS/JS 火柴人示範，跟著拍子左右移動，不需外部影片。
- **節拍器**：可調速度（慢／正常／快），可開啟節拍聲（Web Audio，無需音檔），4 拍循環提示。
- **圖文分解步驟**：把 Two Step 拆成「踏 → 併 → 踏 → 併」4 張卡片，播放時會同步高亮對應步驟。
- **練習檢查表**：勾完所有項目會出現完成祝賀，給初學者成就感。
- **響應式設計**：手機、平板、電腦都好用。

## 🚀 使用方式

這是純前端網站，**不需要安裝任何東西**。

直接用瀏覽器打開 `index.html` 即可：

```bash
# 直接開檔
open index.html        # macOS
xdg-open index.html    # Linux

# 或用簡單的本機伺服器（擇一）
python3 -m http.server 8000   # 然後開 http://localhost:8000
```

## 🌐 部署到 GitHub Pages

1. 把這個 repo 推上 GitHub。
2. 到 **Settings → Pages**，Source 選擇 `main`（或你的分支）的根目錄。
3. 稍等幾分鐘，就會有一個公開網址。

## 🛠 自訂

- **換教學影片**：編輯 `index.html` 影片區塊裡 `<iframe>` 的 `src`，把 `youtube.com/embed/` 後面的影片 ID 換成你的。
- **改動作說明**：步驟卡片在 `index.html` 的「分解步驟」區。
- **改配色**：在 `style.css` 最上方 `:root` 調整 CSS 變數即可。

## 📁 檔案結構

```
.
├── index.html   # 網站內容
├── style.css    # 樣式與動畫
├── script.js    # 互動（播放、節拍器、火柴人、檢查表）
└── README.md
```

## 📺 影片來源

影片皆嵌入自 YouTube 創作者，版權歸原作者所有：

- [100 HIP HOP Dance Steps and Moves with Names（主打）](https://www.youtube.com/watch?v=YRDa_0NO2U4)
- [100 steps for hip hop dance by Maximus / Mad State](https://www.youtube.com/watch?v=BMDEC7TxcQs)
- [100 HIP-HOP DANCE STEPS - All hiphop dance basics](https://www.youtube.com/watch?v=UhmLmjxk5co)
- [100 HIP HOP DANCE STEPS WITH NAMES（播放清單）](https://www.youtube.com/playlist?list=PLonVopbGAB0ezxE9G0kSycxuwt9opWQNy)

---

用 ❤️ 為初學者打造。
