/*
海洋垃圾项目 - 主脚本
Marine Debris Project - Main Script

此文件包含网站的主要交互逻辑和游戏功能。
This file contains the main interactive logic and game features of the website.

主要功能：
- 游戏逻辑和状态管理
- 图表绘制和数据可视化
- 页面交互和事件处理
- 游戏进度跟踪和评分

Main features:
- Game logic and state management
- Chart drawing and data visualization
- Page interactions and event handling
- Game progress tracking and scoring

包含的组件：
- 清理游戏系统
- 数据图表可视化
- 交互式地图功能
- 用户界面更新

Components included:
- Cleanup game system
- Data chart visualization
- Interactive map functionality
- User interface updates

依赖：
- shared.js (共享数据和翻译)
- layout.js (页面布局)
- styles.css (样式)

Dependencies:
- shared.js (shared data and translations)
- layout.js (page layout)
- styles.css (styles)
*/

const translations = {
  ja: {
    heroEyebrow: '日本周辺の海を守ろう',
    languageLabel: '言語',
    heroTitle: '海洋ゴミが日本の海洋環境に与える影響',
    heroSubtitle: '浮遊プラスチック、漁具、ペットボトルなど、日本沿岸で増え続けるゴミと海の生きものへの負担を、学びながら体験します。',
    startButton: '体験を開始する',
    introTitle: '海洋ゴミの発生源と影響',
    introText: '日本沿岸でよく見られる海洋ゴミの種類と生態系への破壊的な影響について学びます。',
    homeTabsTitle: '学習モジュール',
    homeTabsDescription: '下のタブでテーマ別ページを切り替えます。',
    tabIntro: '概要',
    tabEmpathy: '映像',
    tabGame: '清掃ゲーム',
    tabCleanup: '参加変化',
    tabChart: 'データ',
    tabMap: '地図',
    tabImpact: '影響',
    tabActions: '行動',
    gameTitle: '海ごみ清掃ゲーム',
    gameDescription: '毎回表示されるごみを見て、正しい回収先ボタンを選ぶと海の健康度が回復します。',
    gameInstructions: '毎回表示されるごみを見て、「資源回収ボート」か「一般ゴミボート」をクリックしてください。',
    recycleBoat: '資源回収ボート',
    trashBoat: '一般ゴミボート',
    debrisPlastic: 'プラスチックボトル',
    debrisFishing: '漁具片',
    debrisOrganic: '海藻混入ゴミ',
    debrisOther: '発泡スチロール',
    chartTitle: '日本周辺のゴミ発生源データ',
    chartDescription: '沿岸で集められたデータをもとに、どの種類のゴミが多いかを可視化します。',
    chartLegendRecycle: '資源として回収可能',
    chartLegendTrash: '一般ゴミ',
    mapTitle: '日本沿岸のゴミ分布マップ',
    mapDescription: '日本周辺の沿岸で観測されたゴミ濃度を地域別に表示し、海洋生態系への影響を確認できます。',
    mapLow: '低',
    mapMedium: '中',
    mapHigh: '高',
    impactTitle: '日本の海に近い場所での影響',
    impactDescription: '北海道から沖縄まで、日本沿岸のゴミが海洋生物や沿岸コミュニティに与える影響を見ていきましょう。',
    impactNorthTitle: '北日本',
    impactNorthText: 'プラスチック片が流氷とともに漂着し、海鳥やアザラシに危険をもたらしています。',
    impactWestTitle: '西日本',
    impactWestText: '九州や瀬戸内海では、漁具やビニールが漁業資源に悪影響を与えています。',
    impactSouthTitle: '南西諸島',
    impactSouthText: '珊瑚礁周辺でのプラスチック破片やマイクロプラスチックが生態系ストレスを高めています。',
    actionsTitle: 'あなたにできること',
    actionOne: '海岸清掃に参加して、ゴミの流入を減らす',
    actionTwo: '使い捨てプラスチックの使用を控える',
    actionThree: '分別やリサイクルを正しく行う',
    footerText: 'データは日本近海の海洋ごみ調査をもとにした教育用コンテンツです。',
    chartCanvasTitle: '日本周辺の主な海洋ゴミ種類',
    regionValueSuffix: 'の相対濃度を示します。',
    instructionCorrect: '✅ {item} — スコア +{score}。合計スコア: {totalScore}。',
    instructionWrong: '❌ {item} ではありません。もう一度試してみてください。',
    instructionUnknown: '不明なゴミです。正しい場所に戻してください。',
    empathyTitle: '視覚的共感：リアルな海洋画像',
    empathyDescription: '日本沿岸の実際の画像を通じて感情的な共感を呼び起こし、海洋保護の重要性を理解します。',
    imageCaption1: '北海道の漁村と漂着ゴミ',
    imageCaption2: '沖縄近海の珊瑚と海の生き物',
    imageCaption3: '地域漁業と海洋環境のつながり',
    officialImageNote: '画像出典：環境省（公開ページ）',
    impactInteractiveTitle: '親手で参加し、変化を観察する',
    impactInteractiveDescription: '清掃ごとに水質と生態が変化し、「手で修復する」体験ができます。',
    beforeLabel: '清掃前',
    afterLabel: '清掃後',
    impactPhoto1: '海岸清掃の現場（環境省）',
    impactPhoto2: '国立公園海岸の清掃前後比較',
    impactPhoto3: '海ごみの回収と分別',
    cleanupImageNote: '以上の写真は環境省地方環境事務所の公開資料です。',
    gameDashboardTitle: '進捗ダッシュボード',
    gameScoreLabel: 'スコア',
    gameCorrectLabel: '正解数',
    gameRemainingLabel: '残りごみ',
    gameAccuracyLabel: '正答率',
    gameProgressText: '完了: {percent}%',
    restartGameButton: 'もう一度プレイ',
    gameStep1: '表示されたごみの種類を確認し、正しい回収ボートをクリックします。',
    gameStep2: '正解で加点。誤りは減点なしで再挑戦できます。',
    gameStep3: 'すべて清掃すると水質回復ゲージが最大になります。',
    statusText: '水質回復: {percent}%',
    shareButton: '海の守りを共有する',
    shareSuccess: '共有テキストをクリップボードにコピーしました！',
    shareFallback: 'コピーに失敗しました。ページを手動で共有してください。',
    simulationTitle: '模拟影响',
    simulationCurrent: '当前状态',
    simulationPartial: '部分清理',
    simulationFull: '完全清理',
    debrisLevelLabel: '垃圾量',
    marineLifeLabel: '海洋生物',
    waterColorLabel: '海水',
    marineLifePoor: '受损',
    marineLifeModerate: '部分恢复',
    marineLifeHealthy: '健康',
    waterCloudy: '浑浊',
    waterModerate: '略显清澈',
    waterClear: '清澈',
    simulationImageAltCurrent: '污染的海洋与漂浮垃圾',
    simulationImageAltPartial: '部分清理后的海岸，仍可见垃圾',
    simulationImageAltFull: '清澈海水与健康海洋生物',
    simulationImageCaptionCurrent: '污染水体中的塑料垃圾',
    simulationImageCaptionPartial: '部分清理后仍需继续努力',
    simulationImageCaptionFull: '彻底清理后的健康海洋'
  },
  zh: {
    heroEyebrow: '守护日本周边海洋',
    languageLabel: '语言',
    heroTitle: '海洋垃圾对日本沿海环境的影响',
    heroSubtitle: '通过浮游塑料、渔具、饮料瓶等实例，体验不断增加的垃圾对海洋生命的负担。',
    startButton: '开始体验',
    introTitle: '海洋垃圾来源与危害',
    introText: '了解日本沿岸常见的海洋垃圾类型及其对生态环境的破坏性影响。',
    homeTabsTitle: '学习模块',
    homeTabsDescription: '通过下方标签切换不同主题页面。',
    tabIntro: '概览',
    tabEmpathy: '影像',
    tabGame: '清理游戏',
    tabCleanup: '参与变化',
    tabChart: '数据',
    tabMap: '地图',
    tabImpact: '影响',
    tabActions: '行动',
    gameTitle: '海洋垃圾清理游戏',
    gameDescription: '每次查看当前垃圾并点击正确回收船，可让海洋健康度恢复。',
    gameInstructions: '每次显示一件垃圾，请点击“资源回收船”或“一般垃圾船”。',
    recycleBoat: '资源回收船',
    trashBoat: '一般垃圾船',
    debrisPlastic: '塑料瓶',
    debrisFishing: '渔具碎片',
    debrisOrganic: '夹杂海藻的垃圾',
    debrisOther: '发泡胶碎片',
    chartTitle: '日本近海垃圾来源数据',
    chartDescription: '根据沿岸收集的数据，可视化哪种类型的垃圾最多。',
    chartLegendRecycle: '可回收',
    chartLegendTrash: '一般垃圾',
    mapTitle: '日本沿岸垃圾分布地图',
    mapDescription: '显示日本周边沿岸观测到的垃圾浓度，并检查海洋生态影响。',
    mapLow: '低',
    mapMedium: '中',
    mapHigh: '高',
    impactTitle: '日本近海影响区域',
    impactDescription: '从北海道到冲绳，了解沿岸垃圾对海洋生物和社区的影响。',
    impactNorthTitle: '北日本',
    impactNorthText: '塑料碎片随流冰漂流，对海鸟和海象构成威胁。',
    impactWestTitle: '西日本',
    impactWestText: '九州和濑户内海的渔具与塑料袋影响渔业资源。',
    impactSouthTitle: '西南诸岛',
    impactSouthText: '珊瑚礁周边的塑料碎片和微塑料增加生态系统压力。',
    actionsTitle: '您可以采取的行动',
    actionOne: '参加海滩清理，减少垃圾流入',
    actionTwo: '减少一次性塑料使用',
    actionThree: '正确分类回收垃圾',
    footerText: '数据基于日本近海海洋垃圾调查，供教育使用。',
    chartCanvasTitle: '日本近海主要海洋垃圾类型',
    regionValueSuffix: '的相对浓度。',
    instructionCorrect: '✅ {item} — 得分 +{score}。当前总分: {totalScore}。',
    instructionWrong: '❌ {item} 放错了，请再试一次。',
    instructionUnknown: '未知垃圾。请放回正确位置。',
    empathyTitle: '视觉共情：真实海洋画面',
    empathyDescription: '通过日本沿岸的真实影像，引发情感共鸣，理解海洋保护的重要性。',
    imageCaption1: '北海道的渔村与漂流垃圾',
    imageCaption2: '冲绳珊瑚礁与海洋生物',
    imageCaption3: '渔业与海洋环境的联系',
    officialImageNote: '图片来源：日本环境省（公開資料）',
    impactInteractiveTitle: '亲手参与，观察变化',
    impactInteractiveDescription: '每次清理动作都会改变水质和生机，体验“手动修复”的过程。',
    beforeLabel: '清理前',
    afterLabel: '清理后',
    impactPhoto1: '海岸清理作业现场（环境省）',
    impactPhoto2: '国立公园海岸清理前后对比',
    impactPhoto3: '回收海洋垃圾与分类处理',
    cleanupImageNote: '以上照片来自日本环境省地方环境事务所公开资料。',
    gameDashboardTitle: '清理进度面板',
    gameScoreLabel: '得分',
    gameCorrectLabel: '正确投放',
    gameRemainingLabel: '剩余垃圾',
    gameAccuracyLabel: '正确率',
    gameProgressText: '已完成: {percent}%',
    restartGameButton: '再来一局',
    gameStep1: '先看当前垃圾类别，再点击对应回收船。',
    gameStep2: '投放正确会加分，错误不会扣分但会提示重试。',
    gameStep3: '全部清理完成后，水质恢复条将提升到最高。',
    statusText: '水质恢复: {percent}%',
    shareButton: '分享你的海洋守护成果',
    shareSuccess: '已复制分享内容！',
    shareFallback: '复制失败，请手动分享该页面。',
    simulationTitle: '模拟影响',
    simulationCurrent: '当前状态',
    simulationPartial: '部分清理',
    simulationFull: '完全清理',
    debrisLevelLabel: '垃圾量',
    marineLifeLabel: '海洋生物',
    waterColorLabel: '海水',
    marineLifePoor: '受损',
    marineLifeModerate: '部分恢复',
    marineLifeHealthy: '健康',
    waterCloudy: '浑浊',
    waterModerate: '略显清澈',
    waterClear: '清澈',
    simulationImageAltCurrent: '污染的海洋与漂浮垃圾',
    simulationImageAltPartial: '部分清理后的海岸，仍可见垃圾',
    simulationImageAltFull: '清澈海水与健康海洋生物',
    simulationImageCaptionCurrent: '污染水体中的塑料垃圾',
    simulationImageCaptionPartial: '部分清理后仍需继续努力',
    simulationImageCaptionFull: '彻底清理后的健康海洋'
  },
  en: {
    heroEyebrow: 'Protect Japan’s coastal seas',
    languageLabel: 'Language',
    heroTitle: 'Marine debris impacts on Japan’s ocean environment',
    heroSubtitle: 'Experience how floating plastics, fishing gear, and bottles burden marine life around Japan’s coasts.',
    startButton: 'Start Experience',
    introTitle: 'Marine debris sources and impacts',
    introText: 'Learn about common types of marine debris along Japan’s coasts and their destructive effects on ecosystems.',
    homeTabsTitle: 'Learning Modules',
    homeTabsDescription: 'Switch topic pages quickly with the tabs below.',
    tabIntro: 'Overview',
    tabEmpathy: 'Imagery',
    tabGame: 'Cleanup Game',
    tabCleanup: 'Hands-on',
    tabChart: 'Data',
    tabMap: 'Map',
    tabImpact: 'Impact',
    tabActions: 'Actions',
    gameTitle: 'Marine debris cleanup game',
    gameDescription: 'Review each debris item and click the correct collection boat to restore ocean health.',
    gameInstructions: 'For each item shown, click “Recycle Boat” or “Trash Boat”.',
    recycleBoat: 'Recycle Boat',
    trashBoat: 'Trash Boat',
    debrisPlastic: 'Plastic bottle',
    debrisFishing: 'Fishing gear fragment',
    debrisOrganic: 'Seaweed mixed debris',
    debrisOther: 'Styrofoam piece',
    chartTitle: 'Marine debris source data near Japan',
    chartDescription: 'Visualize the most common debris categories gathered from coastal surveys.',
    chartLegendRecycle: 'Recyclable',
    chartLegendTrash: 'General trash',
    mapTitle: 'Marine debris distribution map',
    mapDescription: 'Show debris concentration near Japan’s coasts and examine ecosystem impacts.',
    mapLow: 'Low',
    mapMedium: 'Medium',
    mapHigh: 'High',
    impactTitle: 'Coastal impact regions',
    impactDescription: 'From Hokkaido to Okinawa, see how coastal debris affects marine life and communities.',
    impactNorthTitle: 'Northern Japan',
    impactNorthText: 'Plastic fragments drift with sea ice, threatening seabirds and seals.',
    impactWestTitle: 'Western Japan',
    impactWestText: 'Fishing gear and plastic sheets affect fisheries in Kyushu and the Seto Inland Sea.',
    impactSouthTitle: 'Southwest Islands',
    impactSouthText: 'Plastic fragments and microplastics stress coral reef ecosystems.',
    actionsTitle: 'What you can do',
    actionOne: 'Join beach cleanups to reduce debris inflow',
    actionTwo: 'Cut single-use plastic use',
    actionThree: 'Sort and recycle waste properly',
    footerText: 'Data shown here is based on coastal marine debris surveys near Japan.',
    chartCanvasTitle: 'Major marine debris types near Japan',
    regionValueSuffix: ' relative concentration.',
    instructionCorrect: '✅ {item} — +{score} points. Total: {totalScore}.',
    instructionWrong: '❌ {item} is not correct. Try again.',
    instructionUnknown: 'Unknown debris. Put it back in the correct place.',
    empathyTitle: 'Visual Empathy: Authentic Ocean Imagery',
    empathyDescription: 'Experience real coastal images from Japan to evoke emotional connection and understand the importance of ocean protection.',
    imageCaption1: 'Fishing village with coastal debris',
    imageCaption2: 'Coral life near Okinawa',
    imageCaption3: 'Fishing communities and ocean health',
    officialImageNote: 'Image source: Ministry of the Environment, Japan (public pages).',
    impactInteractiveTitle: 'Participate and observe change',
    impactInteractiveDescription: 'Each cleanup action changes water quality and marine life, showing restoration in real time.',
    beforeLabel: 'Before cleanup',
    afterLabel: 'After cleanup',
    impactPhoto1: 'On-site beach cleanup operations (MOE Japan)',
    impactPhoto2: 'Before/after cleanup comparison in a national park',
    impactPhoto3: 'Collected marine debris and sorting process',
    cleanupImageNote: 'Photos above are from public materials by MOE Japan regional offices.',
    gameDashboardTitle: 'Cleanup dashboard',
    gameScoreLabel: 'Score',
    gameCorrectLabel: 'Correct drops',
    gameRemainingLabel: 'Remaining',
    gameAccuracyLabel: 'Accuracy',
    gameProgressText: 'Completed: {percent}%',
    restartGameButton: 'Play Again',
    gameStep1: 'Check the debris type shown, then click the right collection boat.',
    gameStep2: 'Correct moves add points; incorrect moves let you retry.',
    gameStep3: 'When all debris is cleaned, water restoration reaches maximum.',
    statusText: 'Water quality restored: {percent}%',
    shareButton: 'Share your ocean protection',
    shareSuccess: 'Share text copied to clipboard!',
    shareFallback: 'Copy failed; please share the page manually.',
    simulationTitle: 'Simulation outcome',
    simulationCurrent: 'Current state',
    simulationPartial: 'Partial cleanup',
    simulationFull: 'Full cleanup',
    debrisLevelLabel: 'Debris amount',
    marineLifeLabel: 'Marine life',
    waterColorLabel: 'Water color',
    marineLifePoor: 'Harmed',
    marineLifeModerate: 'Recovering',
    marineLifeHealthy: 'Healthy',
    waterCloudy: 'Cloudy',
    waterModerate: 'Improving',
    waterClear: 'Clear',
    simulationImageAltCurrent: 'Polluted ocean water with plastic debris',
    simulationImageAltPartial: 'Partially cleaned coast with remaining debris',
    simulationImageAltFull: 'Clear ocean water with healthy marine life',
    simulationImageCaptionCurrent: 'Polluted water with floating debris',
    simulationImageCaptionPartial: 'Partial cleanup still needs more care',
    simulationImageCaptionFull: 'Healthy ocean after full cleanup'
  }
};

const debrisPieces = {
  plastic: { target: 'recycle', labelKey: 'debrisPlastic', score: 10 },
  fishing: { target: 'trash', labelKey: 'debrisFishing', score: 8 },
  organic: { target: 'recycle', labelKey: 'debrisOrganic', score: 6 },
  other: { target: 'trash', labelKey: 'debrisOther', score: 5 }
};

const chartData = [
  { key: 'plasticBottles', labelKey: 'chartPlasticBottles', value: 35, type: 'recycle' },
  { key: 'fishingGear', labelKey: 'chartFishingGear', value: 24, type: 'trash' },
  { key: 'styrofoam', labelKey: 'chartStyrofoam', value: 18, type: 'trash' },
  { key: 'cansBottles', labelKey: 'chartCansBottles', value: 13, type: 'recycle' },
  { key: 'otherDebris', labelKey: 'chartOtherDebris', value: 10, type: 'trash' }
];

const regionMapData = [
  { id: 'hokkaido', labelKey: 'regionHokkaido', value: 14, weight: 'medium', descriptionKey: 'regionHokkaidoDescription' },
  { id: 'tohoku', labelKey: 'regionTohoku', value: 19, weight: 'medium', descriptionKey: 'regionTohokuDescription' },
  { id: 'kanto', labelKey: 'regionKanto', value: 28, weight: 'high', descriptionKey: 'regionKantoDescription' },
  { id: 'chubu', labelKey: 'regionChubu', value: 20, weight: 'medium', descriptionKey: 'regionChubuDescription' },
  { id: 'kansai', labelKey: 'regionKansai', value: 24, weight: 'high', descriptionKey: 'regionKansaiDescription' },
  { id: 'chugoku_shikoku', labelKey: 'regionChugokuShikoku', value: 18, weight: 'medium', descriptionKey: 'regionChugokuShikokuDescription' },
  { id: 'kyushu_okinawa', labelKey: 'regionKyushuOkinawa', value: 31, weight: 'high', descriptionKey: 'regionKyushuOkinawaDescription' }
];

const localizedLabels = {
  ja: {
    chartPlasticBottles: 'プラスチックボトル',
    chartFishingGear: '漁具・ロープ',
    chartStyrofoam: '発泡スチロール片',
    chartCansBottles: '飲料缶・瓶',
    chartOtherDebris: 'その他のゴミ',
    regionHokkaido: '北海道',
    regionTohoku: '東北',
    regionKanto: '関東',
    regionChubu: '中部',
    regionKansai: '関西',
    regionChugokuShikoku: '中国・四国',
    regionKyushuOkinawa: '九州・沖縄',
    regionHokkaidoDescription: '北海道沿岸では流氷に乗ったゴミが漂着し、海鳥や海獣に悪影響を与えています。',
    regionTohokuDescription: '東北沿岸では漁具やプラスチック袋が漁業や観光に影を落としています。',
    regionKantoDescription: '関東沿岸は人口密度が高いため、河川からのプラスチック流入が多く観測されます。',
    regionChubuDescription: '中部沿岸は東海・駿河湾で漁具や発泡スチロールが目立ちます。',
    regionKansaiDescription: '関西沿岸では大阪湾・瀬戸内海周辺でマイクロプラスチックの濃度が上昇しています。',
    regionChugokuShikokuDescription: '中国・四国沿岸は潮流の影響で他地域からの漂着ごみも多い傾向があります。',
    regionKyushuOkinawaDescription: '九州・沖縄地域は珊瑚礁周辺でプラスチックゴミが生態系に与える影響が大きいです。'
  },
  zh: {
    chartPlasticBottles: '塑料瓶',
    chartFishingGear: '渔具/绳索',
    chartStyrofoam: '发泡胶碎片',
    chartCansBottles: '饮料罐/瓶',
    chartOtherDebris: '其他垃圾',
    regionHokkaido: '北海道',
    regionTohoku: '东北',
    regionKanto: '关东',
    regionChubu: '中部',
    regionKansai: '关西',
    regionChugokuShikoku: '中国・四国',
    regionKyushuOkinawa: '九州・冲绳',
    regionHokkaidoDescription: '北海道沿岸漂着随着冰流移动的垃圾，对海鸟和海兽造成威胁。',
    regionTohokuDescription: '东北沿岸的渔具和塑料袋影响渔业与旅游业。',
    regionKantoDescription: '关东沿岸人口密集，河流输入的塑料垃圾比例较高。',
    regionChubuDescription: '中部沿岸在东海与骏河湾观察到渔具和发泡胶垃圾较多。',
    regionKansaiDescription: '关西沿岸大阪湾与濑户内海附近微塑料浓度上升。',
    regionChugokuShikokuDescription: '中国・四国沿岸受洋流影响，来自其他地区的漂着垃圾也较多。',
    regionKyushuOkinawaDescription: '九州・冲绳珊瑚礁周边塑料垃圾对生态系统影响显著。'
  },
  en: {
    chartPlasticBottles: 'Plastic bottles',
    chartFishingGear: 'Fishing gear / ropes',
    chartStyrofoam: 'Styrofoam fragments',
    chartCansBottles: 'Cans / bottles',
    chartOtherDebris: 'Other debris',
    regionHokkaido: 'Hokkaido',
    regionTohoku: 'Tohoku',
    regionKanto: 'Kanto',
    regionChubu: 'Chubu',
    regionKansai: 'Kansai',
    regionChugokuShikoku: 'Chugoku & Shikoku',
    regionKyushuOkinawa: 'Kyushu & Okinawa',
    regionHokkaidoDescription: 'Coastal debris drifts with sea ice, threatening seabirds and marine mammals.',
    regionTohokuDescription: 'Fisheries and tourism are impacted by fishing gear and plastic bags along the coast.',
    regionKantoDescription: 'Kanto has higher plastic inflow from rivers due to dense coastal population.',
    regionChubuDescription: 'Chubu shores show frequent fishing gear and styrofoam debris near the Pacific coast.',
    regionKansaiDescription: 'Kansai waters, especially Osaka Bay and Seto Inland Sea, face rising microplastic levels.',
    regionChugokuShikokuDescription: 'Chugoku and Shikoku coasts receive debris from local and ocean current sources.',
    regionKyushuOkinawaDescription: 'Kyushu and Okinawa coral reefs are stressed by plastic waste in coastal waters.'
  }
};

const gameInstructionsElement = document.getElementById('game-instructions');
const languageSelect = document.getElementById('languageSwitch');
const regionCards = document.getElementById('regionCards');
const regionShapes = document.querySelectorAll('.region');
const mapDetail = document.getElementById('mapDetail');
const chartBars = document.getElementById('chartBars');
const statusFill = document.getElementById('statusFill');
const statusText = document.getElementById('statusText');
const shareButton = document.getElementById('shareButton');
const impactVisual = document.getElementById('impactVisual');
const simulationImage = document.getElementById('simulationImage');
const simulationImageCaption = document.getElementById('simulationImageCaption');
const simulationButtons = document.querySelectorAll('.simulation-button');
const debrisLevelText = document.getElementById('debrisLevelText');
const marineLifeText = document.getElementById('marineLifeText');
const waterColorText = document.getElementById('waterColorText');
const startButton = document.getElementById('startExperience');
const gameScoreEl = document.getElementById('gameScore');
const gameCorrectEl = document.getElementById('gameCorrect');
const gameRemainingEl = document.getElementById('gameRemaining');
const gameAccuracyEl = document.getElementById('gameAccuracy');
const gameProgressFill = document.getElementById('gameProgressFill');
const gameProgressText = document.getElementById('gameProgressText');
const currentDebrisCard = document.getElementById('currentDebrisCard');
const choiceButtons = document.querySelectorAll('.choice-button');
const restartGameButton = document.getElementById('restartGameButton');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPages = document.querySelectorAll('.tab-page');
let currentLanguage = 'ja';
let totalScore = 0;
let selectedRegion = null;
let totalAttempts = 0;
let correctAttempts = 0;
let totalDebrisCount = 0;
let gameQueue = [];
let currentDebrisType = null;
let currentScenario = 'current';

const simulationScenarios = {
  current: {
    labelKey: 'simulationCurrent',
    debris: 80,
    marineLifeKey: 'marineLifePoor',
    waterColorKey: 'waterCloudy',
    imageSrc: 'https://images.unsplash.com/photo-1528735583853-468c6d9238d8?auto=format&fit=crop&w=900&q=80',
    imageAltKey: 'simulationImageAltCurrent',
    imageCaptionKey: 'simulationImageCaptionCurrent',
    impactClass: 'impact-current'
  },
  partial: {
    labelKey: 'simulationPartial',
    debris: 45,
    marineLifeKey: 'marineLifeModerate',
    waterColorKey: 'waterModerate',
    imageSrc: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    imageAltKey: 'simulationImageAltPartial',
    imageCaptionKey: 'simulationImageCaptionPartial',
    impactClass: 'impact-moderate'
  },
  full: {
    labelKey: 'simulationFull',
    debris: 10,
    marineLifeKey: 'marineLifeHealthy',
    waterColorKey: 'waterClear',
    imageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    imageAltKey: 'simulationImageAltFull',
    imageCaptionKey: 'simulationImageCaptionFull',
    impactClass: 'impact-clean'
  }
};

function translatePage() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) return;
    el.textContent = translations[currentLanguage][key];
  });

  Object.keys(localizedLabels[currentLanguage]).forEach(labelKey => {
    translations[currentLanguage][labelKey] = localizedLabels[currentLanguage][labelKey];
  });

  updateRegionCards();
  drawChart();
  updateInstructions(translations[currentLanguage].gameInstructions, true);
  if (currentDebrisType && currentDebrisCard) {
    currentDebrisCard.textContent = getLocalizedLabel(debrisPieces[currentDebrisType].labelKey);
  }
  updateGameDashboard();
  updateSimulationInfo(currentScenario);
}

function formatTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

function updateInstructions(message, success = true) {
  if (!gameInstructionsElement) return;
  gameInstructionsElement.textContent = message;
  gameInstructionsElement.style.color = success ? 'var(--accent-strong)' : 'var(--danger)';
}

function getLocalizedLabel(key) {
  return translations[currentLanguage][key] || localizedLabels[currentLanguage][key] || key;
}

function getWeightColor(weight) {
  if (weight === 'high') return 'var(--map-high)';
  if (weight === 'medium') return 'var(--map-medium)';
  return 'var(--map-low)';
}

function updateRegionCards() {
  if (!regionCards) return;
  regionCards.innerHTML = '';
  regionMapData.forEach(region => {
    const card = document.createElement('article');
    card.className = 'region-card';
    card.innerHTML = `
      <h3>${getLocalizedLabel(region.labelKey)}</h3>
      <p>${getLocalizedLabel(region.descriptionKey)}</p>
      <p><strong>${region.value}%</strong> ${translations[currentLanguage].regionValueSuffix}</p>
    `;
    card.addEventListener('click', () => {
      selectRegion(region);
    });
    regionCards.appendChild(card);
  });
}

function showRegionDetail(region) {
  if (!mapDetail) return;
  mapDetail.innerHTML = `
    <h3>${getLocalizedLabel(region.labelKey)}</h3>
    <p>${getLocalizedLabel(region.descriptionKey)}</p>
    <p><strong>${region.value}%</strong> ${translations[currentLanguage].regionValueSuffix}</p>
    <p>${translations[currentLanguage].mapDescription}</p>
  `;
}

function updateCleanupImpact(scenarioKey = currentScenario) {
  const scenario = simulationScenarios[scenarioKey] || simulationScenarios.current;
  const percent = Math.min(100, Math.max(0, 100 - scenario.debris));
  if (statusFill) statusFill.style.width = `${percent}%`;
  if (statusText) statusText.textContent = translations[currentLanguage].statusText.replace('{percent}', percent);
  if (impactVisual) {
    impactVisual.classList.remove('impact-current', 'impact-moderate', 'impact-clean');
    impactVisual.classList.add(scenario.impactClass);
  }
}

function updateSimulationInfo(scenarioKey) {
  const scenario = simulationScenarios[scenarioKey] || simulationScenarios.current;
  currentScenario = scenarioKey;
  simulationButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.scenario === scenarioKey);
  });
  if (debrisLevelText) debrisLevelText.textContent = `${scenario.debris}%`;
  if (marineLifeText) marineLifeText.textContent = translations[currentLanguage][scenario.marineLifeKey] || scenario.marineLifeKey;
  if (waterColorText) waterColorText.textContent = translations[currentLanguage][scenario.waterColorKey] || scenario.waterColorKey;
  if (simulationImage && scenario.imageSrc) simulationImage.src = scenario.imageSrc;
  if (simulationImage && scenario.imageAltKey) simulationImage.alt = translations[currentLanguage][scenario.imageAltKey] || scenario.imageAltKey;
  if (simulationImageCaption) simulationImageCaption.textContent = translations[currentLanguage][scenario.imageCaptionKey] || scenario.imageCaptionKey;
  updateCleanupImpact(scenarioKey);
}

function setupSimulationControls() {
  if (!simulationButtons.length) return;
  simulationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const scenario = button.dataset.scenario;
      if (!scenario || !simulationScenarios[scenario]) return;
      updateSimulationInfo(scenario);
    });
  });
}

function updateGameDashboard() {
  const remaining = currentDebrisType ? gameQueue.length + 1 : gameQueue.length;
  const cleaned = Math.max(0, totalDebrisCount - remaining);
  const completion = totalDebrisCount ? Math.round((cleaned / totalDebrisCount) * 100) : 0;
  const accuracy = totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  if (gameScoreEl) gameScoreEl.textContent = String(totalScore);
  if (gameCorrectEl) gameCorrectEl.textContent = String(correctAttempts);
  if (gameRemainingEl) gameRemainingEl.textContent = String(remaining);
  if (gameAccuracyEl) gameAccuracyEl.textContent = `${accuracy}%`;
  if (gameProgressFill) gameProgressFill.style.width = `${completion}%`;
  if (gameProgressText) {
    gameProgressText.textContent = formatTemplate(translations[currentLanguage].gameProgressText, { percent: completion });
  }
}

function showCurrentDebris() {
  if (!currentDebrisCard) return;
  currentDebrisType = gameQueue.shift() || null;
  if (!currentDebrisType) {
    currentDebrisCard.textContent = '✅';
    choiceButtons.forEach(btn => { btn.disabled = true; });
    updateInstructions(
      formatTemplate(translations[currentLanguage].gameProgressText, { percent: 100 }),
      true
    );
    updateGameDashboard();
    return;
  }
  const debris = debrisPieces[currentDebrisType];
  currentDebrisCard.textContent = getLocalizedLabel(debris.labelKey);
  choiceButtons.forEach(btn => { btn.disabled = false; });
  updateGameDashboard();
}

function setupSortingGame() {
  gameQueue = Object.keys(debrisPieces);
  totalDebrisCount = gameQueue.length;
  totalScore = 0;
  totalAttempts = 0;
  correctAttempts = 0;
  showCurrentDebris();
  updateCleanupImpact();
  updateGameDashboard();
}

function setupChoiceButtons() {
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!currentDebrisType) return;
      handleChoice(button.dataset.target);
    });
  });
}

function setupRestartGameButton() {
  if (!restartGameButton) return;
  restartGameButton.addEventListener('click', () => {
    setupSortingGame();
    updateInstructions(translations[currentLanguage].gameInstructions, true);
  });
}

function setupTabs() {
  if (!tabButtons.length || !tabPages.length) return;
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.pageTarget;
      tabButtons.forEach(item => {
        const active = item === btn;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      tabPages.forEach(page => {
        page.classList.toggle('active', page.id === target);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function setupShareButton() {
  if (!shareButton) return;
  shareButton.addEventListener('click', async () => {
    const shareText = `${translations[currentLanguage].heroTitle} - ${translations[currentLanguage].heroSubtitle}`;
    try {
      await navigator.clipboard.writeText(shareText);
      alert(translations[currentLanguage].shareSuccess);
    } catch (error) {
      alert(translations[currentLanguage].shareFallback);
    }
  });
}

function setupStartButton() {
  if (!startButton) return;
  startButton.addEventListener('click', () => {
    const oceanScene = document.querySelector('.ocean-scene');
    if (oceanScene) {
      oceanScene.classList.remove('polluted');
      oceanScene.classList.add('clean');
    }
    startButton.style.display = 'none';
    setTimeout(() => {
      window.location.href = new URL('../empathy/index.html', window.location.href).href;
    }, 450);
  });
}

function selectRegion(region) {
  selectedRegion = region;
  setMapColors();
  showRegionDetail(region);
}

function setMapColors() {
  regionShapes.forEach(shape => {
    const id = shape.dataset.region;
    const region = regionMapData.find(r => r.id === id);
    if (!region) return;
    const area = shape.querySelector('rect, path');
    if (area) {
      area.style.fill = getWeightColor(region.weight);
      if (selectedRegion && selectedRegion.id === id) {
        shape.classList.add('selected');
      } else {
        shape.classList.remove('selected');
      }
    }
    const text = shape.querySelector('.map-region-label');
    text.textContent = getLocalizedLabel(region.labelKey);
  });
}

function updateChartLabels() {
  chartData.forEach(item => {
    item.label = getLocalizedLabel(item.labelKey);
  });
}

function renderChartBars() {
  if (!chartBars) return;
  chartBars.innerHTML = '';
  const maxValue = Math.max(...chartData.map(d => d.value));
  chartData.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'chart-row';
    const color = item.type === 'recycle' ? 'linear-gradient(90deg, #4CAF50, #66BB6A)' : 'linear-gradient(90deg, #FF9800, #FFB74D)';
    const width = Math.max(12, (item.value / maxValue) * 100);
    row.innerHTML = `
      <div class="chart-row-label">${item.label}</div>
      <div class="chart-row-bar-wrap">
        <div class="chart-row-bar" style="--bar-width: ${width}%; background: ${color}; animation: barGrow 1.5s ease-out ${index * 0.2}s forwards;"></div>
      </div>
      <div class="chart-row-value">${item.value}%</div>
    `;
    chartBars.appendChild(row);
  });
}

function drawChart() {
  const canvas = document.getElementById('debrisChart');
  if (!canvas) return;
  updateChartLabels();
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 60;
  const maxValue = Math.max(...chartData.map(d => d.value));
  const barWidth = (width - padding * 2) / chartData.length - 20;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#eef9ff';
  ctx.fillRect(0, 0, width, height);

  ctx.font = '600 16px Inter, sans-serif';
  ctx.fillStyle = 'var(--text)';
  ctx.fillText(translations[currentLanguage].chartCanvasTitle, padding, 32);

  chartData.forEach((item, index) => {
    const x = padding + index * (barWidth + 30);
    const barHeight = (item.value / maxValue) * (height - padding * 2);
    const y = height - padding - barHeight;
    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
    if (item.type === 'recycle') {
      gradient.addColorStop(0, '#4CAF50');
      gradient.addColorStop(1, '#66BB6A');
    } else {
      gradient.addColorStop(0, '#FF9800');
      gradient.addColorStop(1, '#FFB74D');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = 'var(--text)';
    ctx.font = '600 14px Inter, sans-serif';
    ctx.fillText(`${item.value}%`, x + barWidth / 2 - 10, y - 10);
    ctx.save();
    ctx.translate(x + barWidth / 2, height - padding + 18);
    ctx.rotate(-Math.PI / 8);
    ctx.textAlign = 'center';
    ctx.fillText(item.label, 0, 0);
    ctx.restore();
  });

  ctx.strokeStyle = 'rgba(15, 42, 80, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding + 10, height - padding);
  ctx.stroke();
  renderChartBars();
}

function handleChoice(target) {
  const type = currentDebrisType;
  const debris = debrisPieces[type];
  const correct = debris?.target === target;
  const itemLabel = getLocalizedLabel(debris?.labelKey || '');
  totalAttempts += 1;

  if (!debris) {
    updateInstructions(translations[currentLanguage].instructionUnknown, false);
    return;
  }

  if (correct) {
    totalScore += debris.score;
    correctAttempts += 1;
    updateInstructions(
      formatTemplate(translations[currentLanguage].instructionCorrect, {
        item: itemLabel,
        score: debris.score,
        totalScore
      }),
      true
    );
    showCurrentDebris();
    updateCleanupImpact();
    updateGameDashboard();
  } else {
    updateInstructions(
      formatTemplate(translations[currentLanguage].instructionWrong, {
        item: itemLabel
      }),
      false
    );
    updateGameDashboard();
  }
}

function resizeCanvas() {
  const canvas = document.getElementById('debrisChart');
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  const displayedWidth = canvas.clientWidth;
  canvas.width = displayedWidth * ratio;
  canvas.height = 360 * ratio;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

if (languageSelect) {
  languageSelect.addEventListener('change', event => {
    currentLanguage = event.target.value;
    localStorage.setItem('marineDebrisLanguage', currentLanguage);
    translatePage();
    setMapColors();
    if (selectedRegion) {
      showRegionDetail(selectedRegion);
    }
  });
}

regionShapes.forEach(shape => {
  shape.addEventListener('mouseenter', () => {
    const region = regionMapData.find(r => r.id === shape.dataset.region);
    if (!region) return;
    const area = shape.querySelector('rect, path');
    if (area) area.style.opacity = '0.8';
  });
  shape.addEventListener('mouseleave', () => {
    const region = regionMapData.find(r => r.id === shape.dataset.region);
    if (!region) return;
    const area = shape.querySelector('rect, path');
    if (area) area.style.opacity = '1';
  });
  shape.addEventListener('click', () => {
    const region = regionMapData.find(r => r.id === shape.dataset.region);
    if (region) selectRegion(region);
  });
  shape.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const region = regionMapData.find(r => r.id === shape.dataset.region);
      if (region) selectRegion(region);
    }
  });
});

window.addEventListener('resize', () => {
  resizeCanvas();
  drawChart();
});

function init() {
  const savedLanguage = localStorage.getItem('marineDebrisLanguage');
  currentLanguage = savedLanguage || (navigator.language.startsWith('zh') ? 'zh' : navigator.language.startsWith('en') ? 'en' : 'ja');
  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }
  translatePage();
  setMapColors();
  setupSortingGame();
  setupChoiceButtons();
  setupRestartGameButton();
  setupTabs();
  setupShareButton();
  setupStartButton();
  setupSimulationControls();
  resizeCanvas();
  drawChart();
  updateCleanupImpact();
  updateGameDashboard();
  if (!selectedRegion && regionMapData.length > 0) {
    selectRegion(regionMapData[0]);
  }
}

init();
