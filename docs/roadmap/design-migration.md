# 新デザイン移行ロードマップ

デザイン元: `docs/design/hamatai-portfolio-design.pen` の「新デザイン」フレーム(`zyHbo`)。
`.pen` は暗号化されているため、Read/Grep ではなく Pencil MCP(`mcp__pencil__execute` 等)で読む。

> **運用ルール(Claude 向け)**: 実装を始める前に必ずこのファイルを読み、完了/未完了を確認する。
> 作業が終わったら、チェックボックスと「作業ログ」をこのファイルで更新してから報告する。

## デザイントークン(確定済み)

| 用途 | 値 |
|---|---|
| ink / ink-2 | `#0A0A0B` / `#111113` |
| paper / paper-dim | `#EDE9E0` / paper 72% |
| muted | `#8E8B84` |
| accent | `#FF5B2E` |
| line | paper 12% |
| フォント | Instrument Serif(display)/ Inter Tight(UI)/ JetBrains Mono(mono)/ Noto Sans JP・Serif JP(和文) |

Tailwind では `bg-ink` `bg-ink-2` `text-paper` `text-paper-dim` `border-line` `font-display` `font-mono` `font-serif-jp` などで使う(`src/app/globals.css` の `@theme`)。

## デザインの Pencil ノード ID

| ページ/要素 | ノードID | 備考 |
|---|---|---|
| Intro Loader | `fxGXY` | Scroll Journey |
| Top | (zyHbo 配下 `Top`) | Hero `SFHft` / Marquee `vrUyv` / About `U0Wkm` / Works `F23ru` / Services `DdQUm` / News `xtC2c` / Contact `IzOmN` / Footer `Y24bhT` / Header `V2YFh1` |
| About / Works / Service / News / Contact | zyHbo 配下に同名フレーム | ID は `Get("zyHbo",{depth:1})` で取得 |
| Sitemap | `TICz1` | ページ構成と「刷新/新規/提案」の凡例 |
| 既存サイトデザイン | `HEU7b` | 旧デザイン(参照用) |

## ステータス凡例

- [x] 完了(型チェック済み)
- [ ] 未着手
- 「目視確認」はユーザーがブラウザで行う(CLAUDE.md の方針: Claude は tsc のみ)

---

## Phase 1: 基盤・共通部品・トップ ✅ 実装済み(目視確認待ち)

- [x] デザイントークンを `globals.css` の `@theme` に反映(色・フォント)
- [x] `[locale]/layout.tsx` のフォントを新5書体に差し替え、`main` の上余白を `pt-[98px]` に変更
- [x] Header(番号付きナビ・JA/EN・Contact ピル)
- [x] LanguageSwitcher(mono 表記)
- [x] Footer(大ロゴ・LINKS / SNS・BACK TO TOP)
- [x] LoadingScreen のロゴ書体を display フォントに変更
- [x] Top: Hero(`HeroSection`。背景動画は 3-2。~~帯状の `WorldMapHero`~~ は**ユーザー指示でヒーローから削除**。`WorldMapHero` は About の Journey セクションでのみ使用)
- [x] Top: Marquee
- [x] Top: About セクション(声明文 + 3つの強み)
- [x] Top: Works セクション(ケーススタディ形式、`work.ts` に `caseStudy` 追加)
- [x] Top: Services セクション(ホバー展開リスト)
- [x] Top: News セクション(日付・タグ・タイトルの行リスト)
- [x] Top: Contact CTA(オレンジ背景の巨大タイポ + 円形ボタン)
- [x] 旧 `ServicesPainSection` / `NeuronBackground` を削除
- [x] `messages/ja.json` `en.json` に `home.*` と `footer.tagline` を追加

### Phase 1 で意図的に未反映の点
- Hero 背景は Unsplash 写真+動画ではなく、ink 地+オレンジ系グラデーションで代用(動画ラベル/再生ボタンも未実装)
- Services の Mobile Apps / AI Consulting の説明文・タグは既存文言から作成(デザイン上は閉じた状態)
- Intro Loader のスクロールジャーニーは未実装

## Phase 2: 下層ページ(各ページを新デザインに作り直す)

各ページは「Page Hero → 本体 → (共通)Contact CTA → Footer」の構成。実装前に該当フレームを Pencil で読んでから着手する。

- [x] 2-0 共通化(目視確認待ち)
  - `src/components/layout/PageHero.tsx`: `<PageHero label title accent aside below size />` と `<PageHeroIntro>`。各ページはこれを使う(About は `size="large"`、`aside` にプロフィール表、Works/News は `below` にフィルタ帯、Services は `below` にジャンプ目次)。下余白は `className` で調整可
  - `ContactCTA` を `layout/` に移動し、`ContactCTASlot`(`/contact` では非表示)経由で `[locale]/layout.tsx` に配置。**各ページ側で Contact CTA を書かないこと**。トップの個別配置は削除済み
  - フィルタ帯の部品(Works/News 共通の `FilterBar`)は 2-2 または 2-4 で必要になった時点で作る
- [x] 2-1 About(目視確認待ち): `src/app/[locale]/about/page.tsx` + `src/components/about/*`
  - Page Hero(`size="large"`、右にプロフィール表 `ProfileMeta`)/ Profile / Journey(帯状マップ + ROUTE LOG 19カ国 + NEXT)/ Daily Rhythm(24h ドーナツ時計 SVG + スケジュール表)/ Career
  - 新規共通部品: `src/components/ui/SectionHeader.tsx`(ラベル + `Title 1`/`accent` + 右側紹介文)。**Works/Services/News の2語タイトル見出しはこれを使う**(トップの Works/Services は未置換で、同形のインライン実装が残っている)
  - データ: `src/data/career.ts` 新規、`src/data/journey.ts` に `plannedCountries` / `getRouteLog()` 追加。文言は `messages/*.json` の `about.*` を全面更新
  - 旅データ: 現在地=エルサルバドルのサンサルバドル(`journey.ts`: …アンティグア → サンタアナ → エル・トゥンコ → サンサルバドル。2026-10-06 にユーザー申告で更新)。ROUTE LOG は訪問済み6カ国(El Salvador が NOW)・予定13カ国・計19カ国で、デザインと一致。旅が進んだら `journey.ts` の `status`/`current` を更新すれば自動反映(予定国は `plannedCountries`)
  - **About から削除した要素**(デザインに無いため): プロフィール写真(`public/images/profile.jpg` は残置)、スキル一覧(Frontend/Backend/Mobile/Tools)、SNSアイコンチップ(Footer に SNS あり)。復活が必要なら旧実装は git 履歴の `about/page.tsx` を参照
  - Daily Rhythm のアイコンは heroicons で代用(デザインは lucide: coffee→店舗、utensils→ケーキ、droplets→ビーカー、sunrise→太陽)
- [x] 2-2 Works(目視確認待ち): `works/page.tsx` + `src/components/works/*`
  - `WorkCases`(先頭1件を大きく・残りを2カラムのケーススタディ。**トップの Works セクションと共用**に切り出し済み)/ `WorksExplorer`(クライアント。フィルタ状態を持つ)/ `ui/FilterBar`(ピル型フィルタ帯+件数+右端メモ。**2-4 News で再利用**)
  - `PageHero` に `compact` を追加(直下にフィルタ帯が続くページ用)
  - フィルタは すべて / Webアプリ / ホームページ(件数0のカテゴリは非表示)。並びは `createdAt` 降順
  - 文言: `works.hero` / `works.case` / `works.filterAll` / `works.sort` を追加。ケース見出し用キーを `home.works` から `works.case` に移動
  - `SectionHeader` に `asideClassName` を追加し、トップ Works セクションも SectionHeader に置換済み(トップ Services は未置換)
  - 旧 `WorkCard` / `Badge` 使用箇所は削除(Works ページでは未使用に)。GitHub リンクは新デザインに無いため非表示
- [x] 2-3 Services(目視確認待ち): `services/page.tsx` + `src/components/services/*`
  - Page Hero(紹介文 + ジャンプ目次 `#web` `#mobile` `#ai` のピル)/ `ServiceSection` ×3(背景は ink-2 と ink を交互、2カラム: 巨大イタリックタイトル | 悩み・説明・機能リスト・相談リンク)/ `ProcessSection`(How we work、4ステップ)
  - 文言は `messages/*.json` の `services.hero` / `services.list` / `services.cta` / `services.process`(旧 `services.webapp` 等は 3-3 で削除済み)
  - ~~Web Development セクションの料金プランへの小リンク~~ → `homepage-plan` 廃止に伴い削除
  - デザインはサービス3本(Web / Mobile / AI)。旧6本(Notion Wiki / バイブコーディング支援 / 技術顧問 など)は統合され、`data/services.ts` は不要になったため削除。お問い合わせ種別(`contact.types`)は旧6区分のまま
  - 旧: 料金の都度相談メッセージ(`priceOnRequest`)は Process の紹介文に統合
  - **`services/homepage-plan`(料金プラン)は廃止(ユーザー指示)**。ページ・サイトマップ項目・リンク・翻訳キー(`services.homepagePlan` / `viewPlanDetails`)・専用の `components/currency/*`・`lib/exchangeRates.ts` を削除。URL は 404 になる
- [x] 2-4 News(目視確認待ち): `news/page.tsx` + `src/components/news/*`
  - Page Hero(Latest news + タグフィルタ帯)/ 注目記事 `FeaturedArticle`(1ページ目の先頭のみ)/ アーカイブ `ArchiveRow`(番号・日付・タグ・タイトル・サムネ)/ `NewsPagination`(PAGE 01 / 06 + 番号 + 前へ/次へ)/ `FollowSection`(Find me elsewhere、SNS 12個のピル)
  - 絞り込みと並びはサーバー側(`?tag=note&page=2`)。`FilterBar` に `href` オプションを追加し、リンクとしても使えるようにした。タグは `lib/news.ts` の `getNewsTag` / `getNewsTagCounts`(note は固定、microCMS はカテゴリ名、無ければ `blog`)。トップの News もこの関数を使用
  - 注目記事は絞り込み中も1ページ目の先頭を使う。2ページ目以降は注目記事なしでアーカイブのみ(番号は通し番号)
  - `NewsCard`(旧カードUI)を削除。`news/[slug]/page.tsx`(記事詳細、デザインに該当フレームなし)はタグ・日付・戻るリンク・余白だけ新トークンに寄せた軽い手直し。本文 `prose-dark` は 1 でトークン差し替え済み
  - 旧の `SnsIconChip`(`components/icons/SocialIcons.tsx`)は News/About から使われなくなった → 3-3 で削除可否を判断
- [x] 2-5 Contact(目視確認待ち): `contact/page.tsx` + `ContactForm.tsx`
  - Page Hero(`compact`、紹介文)/ 左に連番付きの情報3行(返信目安・メール・SNS)+ 右にフォーム。末尾の Contact CTA は `ContactCTASlot` が `/contact` で非表示にする
  - フォーム: 下線のみの入力欄、種別は4択チップ(Web Development / Mobile Apps / AI Consulting / その他。radio、既定は先頭)、送信ボタンはオレンジのピル+↗。エラーは赤→アクセント色。送信完了は大きな見出し表示。Turnstile は `theme: 'dark'` に固定
  - **送信ロジック(`actions.ts`)・zod スキーマ・Turnstile 連携は変更なし**。メール件名/本文の「種別」には選択したチップのラベルが入る(旧: 『Webアプリ開発のご依頼』等の文)。`contact.types` は4区分に置換、`typePlaceholder` を削除、`contact.hero` / `contact.privacyNote` を追加
  - 実送信(Resend/Turnstile)は未テスト。目視確認時に実際に送信して届くか確認してほしい

**Phase 2 は全ページ実装済み(目視確認待ち)。**

## Phase 3: 仕上げ

- [x] 3-1 Intro Loader(目視確認待ち): `src/components/layout/IntroLoader.tsx`(旧 `LoadingScreen` を置換。`[locale]/layout.tsx` の `NextIntlClientProvider` **内側**に配置。外だと next-intl のフックが落ちる)
  - デザイン `fxGXY`(Scroll Journey)に沿った実装: 世界地図のみ → ホイール/スワイプ/キー操作で関西空港→現在地へルートが描かれカメラがズーム → 100% 到達で約0.9秒ホールドし、地図が上下にシャッター状に開いてヒーローが現れる。SKIP ボタンと Esc で即スキップ。`prefers-reduced-motion` では表示しない
  - 表示は**ホーム(`/`)かつセッション初回のみ**(`sessionStorage` の `hamatai:intro-seen`)。他ページ・再訪では出ない。スクロールロックはローダー表示中のみ
  - ルートは `journeyStops` の訪問済みのみ(予定ルートは描かない)。区間は**直線**(ユーザー指示。当初の弧状だとズーム時に膨らみが大きく「ぴょんぴょん」して見えるため)。訪問済み6カ国(現在地=サンサルバドル)。旅が進めば自動で伸びる
  - 座標変換は `src/lib/worldMap.ts` に切り出し(`WorldMapHero` と共用)
  - 補足: デザインの「LOCK / MOBILE / SKIP / REDUCED MOTION」注記は反映済み。アニメーションの体感(進行の速さ `WHEEL_DISTANCE`、ホールド時間)は要目視調整
- [x] 3-2 Hero 背景動画(目視確認待ち): ユーザーが配置した `public/videos/hero.mp4`(1080p・H.264・43秒・約4.3Mbps・**22.2MiB**、Cloudflare の 25MiB 上限に近いので差し替え時は注意)を `HERO_VIDEO`(`src/config/site.ts`)で有効化。ポスターは動画の1フレーム目から生成した `public/images/hero-poster.jpg`(1920×1080、約240KB)
  - 実装: `src/components/home/HeroVideo.tsx`(自動再生・ミュート・ループの背景動画のみ。reduced-motion では自動再生しない)。**デザインにあった「WORLD TRIP REEL」ラベル・一時停止・ミュートのボタンは、ユーザー指示で削除**(`home.hero.reel` の翻訳キーも削除)。`HERO_VIDEO = null` で動画なしに戻せる
  - 確認済み: dev で `<video>` が出力され、MP4/ポスターが 200、Range リクエストが 206(シーク可)。`npm run build` 成功
  - 要目視: 動画に焼き込みの字幕(例「@メキシコシティ」が右下)があり、ヒーロー下部の地図キャプションやボタンと重なる可能性。音声トラック(AAC)が残っているが、ミュート固定でUIも無いので鳴らない(気になるなら音声なしで書き出し直すとファイルも小さくなる)。ポスターは1フレーム目なので、動画の見せ場に差し替えたければ `hero-poster.jpg` を置き換える
  - 動画は git に 22MB でコミットされる点に注意(リポジトリが大きくなる。気になるなら Cloudflare R2 等へ移す選択肢あり)
- [x] 3-3 旧部品の整理: `Badge` / `SectionTitle` / `Button` / `SocialIcons`(`SnsIconChip`)/ `LoadingScreen` を削除(参照ゼロを確認)。未使用の翻訳キー24件を削除。`globals.css` の旧デザイン用 CSS(`bg-grid` / `bg-dots` / `gradient-text` / `flip-word` / `flip-card` / `heading-bounce`)と未使用カラートークン(`surface-*` / `secondary` / `accent-light` / `accent-dark` / `success` / `surface` / `primary`)も削除。`public/` の未参照素材(`profile.jpg`・`sns-icon/*`・create-next-app 由来の svg 5点)を削除。未使用の依存 `date-fns` / `gray-matter` / `remark` / `remark-html` を `npm uninstall`。未使用のコード(`getArticles`・`AUTHOR_NAME_EN`・`redirect` など)を削除し、外部で使われない export/型は非公開化。`use-intl` 直 import を `next-intl` 経由に統一。`knip` で確認済み(残る指摘 `open-next.config.ts` と `eslint-config-next` は設定ファイルから使われる誤検知)
- [~] 3-4 レスポンシブ確認: **ユーザーが実施中**
- [x] 3-5 ビルド確認: `npm run build` 成功(24ページ静的生成)。`eslint src` エラー0。メタ情報は各ページの `generateMetadata` を維持(`about` は description に bio、`works`/`services`/`news`/`contact` は既存キー)。
  - `npm run lint`(全体)は `.open-next/`(Cloudflare ビルド生成物)362件と `scripts/gen-world-map.js` の `require()` 4件でエラーになる。**今回の変更とは無関係の既存事項**。必要なら `eslint.config.mjs` の ignores に `.open-next/**` を追加
- [-] 3-6 Case Detail / Article ページ: **保留(ユーザー判断)**。現状は実績カードの外部リンクで足りるため作らない。将来追加するかもしれない

## 追加要件(ユーザー依頼)

- [x] サイト全体のスクロール連動フェードイン(目視確認待ち): `src/components/layout/ScrollReveal.tsx` を `[locale]/layout.tsx`(Provider 内側)に配置。CSS は `globals.css` の `.reveal` / `.is-visible` / `@keyframes reveal-in`
  - 仕組み: `main section` と `footer` の直下要素(`mx-auto` ラッパーがあればその子。`ul/ol/dl` は項目ごと)に JS で `reveal` を付け、IntersectionObserver で画面に入ったら 0.8秒で「透明+28px下 → 表示」。同時に入った要素は 80ms ずつずらす(最大400ms)
  - **各ページ/コンポーネントのコードは変更不要**。新しいセクションも `section > div.mx-auto > 子要素` の形で作れば自動で対象になる
  - 対象外: 最初から画面内にある要素(ヒーロー等)、`prefers-reduced-motion` の環境。JS 無効でも内容は常に表示される
  - 調整点: 速さ・距離は `globals.css`、ずらし間隔は `ScrollReveal.tsx` の `STAGGER_MS` / `MAX_DELAY_MS`、発火位置は `rootMargin`

## 未決事項(ユーザー確認待ち)

- [x] Hero 背景: 自前の GoPro 動画を使う(3-2、配置・有効化済み)
- [x] Case Detail / Article: 保留(3-6)
- [x] `homepage-plan`(料金プラン): 廃止で確定
- [x] About のスキル一覧・プロフィール写真・SNSチップ: 削除で確定

## 作業ログ

| 日付 | 内容 |
|---|---|
| 2026-10-06 | Phase 1 完了(トークン・共通部品・トップ全セクション)。`tsc --noEmit` OK、eslint エラー0 |
| 2026-10-06 | 本ロードマップを作成 |
| 2026-10-06 | Phase 2-0 完了(PageHero 新規、ContactCTA をレイアウト共通化)。`tsc --noEmit` OK、eslint エラー0 |
| 2026-10-06 | Phase 2-1 完了(About 全セクション、SectionHeader 新規)。`tsc --noEmit` OK、eslint エラー0、dev サーバーで ja/en の SSR 200 を確認 |
| 2026-10-06 | Phase 2-2 完了(Works、WorkCases/FilterBar 共通化)。`tsc --noEmit` OK、eslint エラー0、dev サーバーで /works・/en/works・/ の SSR 200 を確認 |
| 2026-10-06 | Phase 2-3 完了(Services、ServiceSection/ProcessSection)。`tsc --noEmit` OK、eslint エラー0、/services・/en/services の SSR 200 を確認 |
| 2026-10-06 | Phase 2-4 完了(News、フィルタ/ページネーションをサーバー側クエリ化)。`tsc --noEmit` OK、eslint エラー0、/news・?tag=note・?page=2・/en/news の SSR 200 を確認 |
| 2026-10-06 | Phase 2-5 完了(Contact、種別をデザインの4チップに変更)。`tsc --noEmit` OK、eslint エラー0、/contact・/en/contact の SSR 200 を確認。Phase 2 全完了 |
| 2026-10-06 | `homepage-plan`(料金プラン)を廃止・削除(ユーザー指示)。currency 関連コード・為替取得も削除 |
| 2026-10-06 | Phase 3: 3-1 Intro Loader 実装、3-3 旧部品整理、3-5 ビルド確認(`npm run build` 成功)。3-2/3-4/3-6 はユーザー判断・目視待ち |
| 2026-10-06 | 3-2 方針確定(GoPro 動画)と `HeroVideo` 受け皿を実装。3-6 は保留。About 削除要素は確定。未使用の依存・素材・コードを一括削除(`knip` クリーン)。`npm run build` 成功 |
| 2026-10-06 | 3-2 完了: `public/videos/hero.mp4` を有効化、ポスター生成。`tsc` OK、`npm run build` 成功、MP4 の 200/206 配信を確認 |
| 2026-10-06 | ヒーローセクションの世界地図を削除(ユーザー指示)。`WorldMapHero` は About の Journey で引き続き使用。`tsc` OK、eslint エラー0、`knip` クリーン |
| 2026-10-06 | ヒーロー動画のコントロール(ラベル・一時停止・ミュート)を削除(ユーザー指示)。`tsc` OK、eslint エラー0、`knip` クリーン |
| 2026-10-06 | スクロール連動フェードイン(`ScrollReveal`)を全ページに追加。`tsc` OK、eslint エラー0、`knip` クリーン、`npm run build` 成功 |
| 2026-10-06 | 旧デザイン由来の CSS・カラートークンを `globals.css` から削除(`bg-surface text-primary` は `bg-ink text-paper` に置換)。`tsc` OK、eslint エラー0、`npm run build` 成功 |
| 2026-10-06 | Intro Loader のルートを弧状から直線に変更(ユーザー指示)。`tsc` OK、eslint エラー0 |
| 2026-10-06 | 現在地をサンサルバドルに更新(サンタアナ・エル・トゥンコを追加、El Salvador を訪問済みに)。About の紹介文も更新。`tsc` OK、eslint エラー0 |
