/*
海洋垃圾项目 - 共享脚本
Marine Debris Project - Shared Script

此文件包含项目中多个页面共享的数据和功能。
This file contains data and functions shared across multiple pages in the project.

主要内容：
- 多语言翻译数据 (translations)
- 游戏数据 (debrisPieces, chartData)
- 地图区域数据 (regionMapData)
- 本地化标签 (localizedLabels)
- 工具函数 (translatePage, getLocalizedLabel, etc.)

Main contents:
- Multilingual translation data
- Game data (debrisPieces, chartData)
- Map region data (regionMapData)
- Localized labels
- Utility functions
*/

/**
 * 多语言翻译数据
 * Multilingual translation data
 * 支持日语、英语和中文
 * Supports Japanese, English, and Chinese
 */
const translations = {
  ja: {
    heroEyebrow: '日本周辺の海を守ろう',
    languageLabel: '言語',
    heroTitle: '海洋ゴミが日本の海洋環境に与える影響',
    heroSubtitle: '浮遊プラスチック、漁具、ペットボトルなど、日本沿岸で増え続けるゴミと海の生きものへの負担を、学びながら体験します。',
    startButton: '体験を開始する',
    introTitle: 'インタラクティブに日本近海の海ごみ問題を理解する',
    introText: '実際の映像、清掃シミュレーション、データ可視化、地域マップを通じて、海ごみの影響を観察・比較できます。',
    introKicker: '学習入口',
    introMetricOneLabel: '主な流入源',
    introMetricOneText: '陸域からの流入と推定される割合',
    introMetricTwoLabel: '主要カテゴリ',
    introMetricTwoText: 'ボトル、漁具、発泡材、缶・瓶など',
    introMetricThreeLabel: '学習方式',
    introMetricThreeText: '映像、ゲーム、シミュレーション、データ、地図、行動',
    introModuleVisual: '映像観察',
    introModuleVisualTitle: 'まず問題を見る',
    introModuleSim: '参加変化',
    introModuleSimTitle: '次に回復を試す',
    introModuleData: 'データ図表',
    introModuleDataTitle: '最後に証拠を比較',
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
    chartTitle: '日本周辺海域のごみ量：種類別に見る影響',
    chartDescription: '環境省の年度推計資料をもとに、プラスチックごみ、道路由来の粉じん、衣類の繊維、洗剤類など、量として把握できる発生源を並べて比較します。',
    chartKicker: 'データ証拠',
    chartMethodLabel: '読み方',
    chartMethodValue: '日本周辺・毎年どれくらい',
    chartMethodNote: '複雑な推計値を、読みやすい量の表現に置き換えています。',
    chartInputLabel: '年間総量',
    chartInputValue: '年間 約1.6万-3.1万トン',
    chartInputNote: '環境省が発生源・品目別に推計した、日本から海へ流出するプラスチックごみ量です。',
    chartPlasticLabel: '大きなプラスチックごみ',
    chartPlasticNote: '投げ捨てごみや海岸ごみなど、目に見えて拾えるプラスチックごみです。',
    chartLandLabel: 'マイクロプラスチック粉じん',
    chartLandNote: 'タイヤ、道路標示材、塗料、人工芝などが摩耗して細かな粒になり、雨水とともに水域へ流れます。',
    chartRiverLabel: '衣類繊維と洗剤類',
    chartRiverNote: '洗濯で出る繊維や、洗剤類に含まれる香りカプセルも、汚水経由で海へ届く可能性があります。',
    chartCompositionLabel: '種類別比較',
    chartCompositionTitle: 'どのごみが日本周辺の海へ流れているか',
    chartHighlightOne: '最大級の項目はタイヤや道路標示材などの摩耗粉じん',
    chartHighlightTwo: '衣類繊維は毎日の洗濯から生まれます',
    chartHighlightThree: '洗剤類の香りカプセルは少量でも暮らしに近い発生源です',
    chartVolumeTotalLabel: '日本の海洋プラスチックごみ流出総量',
    chartVolumeNote: '大きなプラスチック、マイクロプラスチック、衣類繊維、洗剤類、道路・タイヤ由来の粉じんなど、推計できる項目を含みます。',
    chartDetailsKicker: '出典メモ',
    chartDetailsTitle: 'データの出典と読み方',
    chartLegendRecycle: '遮断・対策界面',
    chartLegendTrash: 'ごみ量が多い界面',
    chartSourceMOEEstimate: '環境省 量的資料',
    chartSourceMOE2025: '環境省 FY2025',
    chartSourceMOE2025Short: '環境省 FY2025',
    chartSourceMOESurvey: '海洋ごみ実態把握調査',
    chartSourceNote: '読み方',
    chartSourceMOEEstimateTitle: '海洋ごみの量的把握方法',
    chartSourceMOEEstimateText: '環境省が発生源・品目別に海洋への流出量を推計する口径の確認に使用。',
    chartSourceMOE2025Title: '令和7年度検討結果',
    chartSourceMOE2025Text: 'プラスチックごみ総量、マイクロプラスチック、繊維、洗剤類などの年間レンジに使用。',
    chartSourceMOESurveyTitle: '調査報告書インデックス',
    chartSourceMOESurveyText: '日本の海洋ごみ調査、漂着ごみ、漂流ごみ、海底ごみ関連の年度報告を確認できます。',
    chartSourceNoteTitle: '数値は暫定推計です',
    chartSourceNoteText: '数量感と種類の違いを理解するための値で、海の中のすべてのごみを一つずつ数えたものではありません。',
    mapTitle: '日本沿岸のゴミ分布マップ',
    mapDescription: '日本周辺の沿岸で観測されたゴミ濃度を地域別に表示し、海洋生態系への影響を確認できます。',
    mapLow: '低',
    mapMedium: '中',
    mapHigh: '高',
    mapFilterAll: 'すべて',
    mapNoData: 'この条件に一致する地域データはありません。',
    impactTitle: '海洋ごみは遠くに漂うだけの問題ではない',
    impactDescription: '海面、海底、食物連鎖、沿岸コミュニティへ同時に入り込みます。影響の流れを理解すると、清掃と削減の優先順位が見えてきます。',
    impactKicker: '生態影響',
    impactSignalLabel: 'リスクサイン',
    impactSignalValue: '絡まり・誤食・マイクロプラスチック',
    impactSignalNote: '一つのごみが長期的な生態ストレスに変わる',
    impactPathOneTitle: '誤食と栄養損失',
    impactPathOneText: '透明なプラスチック、キャップ、発泡材は魚・海鳥・ウミガメに餌と間違われ、消化を妨げます。',
    impactPathTwoTitle: '漁具の絡まりとゴーストフィッシング',
    impactPathTwoText: '捨てられた網やロープは生きものを絡め続け、海草場や岩礁の構造にも傷を残します。',
    impactPathThreeTitle: 'マイクロプラスチックの食物連鎖',
    impactPathThreeText: '細かく砕けたプラスチックは回収が難しく、プランクトンや小魚を通じて食物連鎖へ入ります。',
    impactInsightOneValue: '海面',
    impactInsightOneText: '漂流ごみは港湾、河口、潮流の交差点に集まり、景観・航行・近岸生物へ影響します。',
    impactInsightTwoValue: '海底',
    impactInsightTwoText: '沈んだごみは底生生物のすみかを覆い、泥や岩礁の環境を変化させます。',
    impactInsightThreeValue: '地域',
    impactInsightThreeText: '清掃費、漁獲の品質、観光体験に影響し、環境問題は生活へ戻ってきます。',
    impactNorthTitle: '北日本',
    impactNorthText: 'プラスチック片が流氷とともに漂着し、海鳥やアザラシに危険をもたらしています。',
    impactWestTitle: '西日本',
    impactWestText: '九州や瀬戸内海では、漁具やビニールが漁業資源に悪影響を与えています。',
    impactSouthTitle: '南西諸島',
    impactSouthText: '珊瑚礁周辺でのプラスチック破片やマイクロプラスチックが生態系ストレスを高めています。',
    actionsKicker: 'アクションプラン',
    actionsTitle: '海を守る行動を毎日の小さな習慣にする',
    actionsDescription: '効果のある行動は一度きりの熱意ではなく、発生抑制、正しい回収、地域参加、継続的な記録を組み合わせることです。',
    actionsImpactLabel: '優先順位',
    actionsImpactValue: '減らす・流さない・記録する',
    actionsImpactNote: '発生源で減らすことは、後から拾うより効果的です。',
    actionOneTitle: '使い捨てプラスチックを減らす',
    actionOne: 'マイボトル、バッグ、カトラリーを持ち歩き、河川へ入りやすい軽量包装を減らします。',
    actionTwoTitle: 'ごみを回収システムに戻す',
    actionTwo: 'ボトル、缶、ガラス、発泡材は空にして圧縮・分別し、海岸ではなく回収ルートへ戻します。',
    actionThreeTitle: '清掃に参加して記録する',
    actionThree: '海岸や河川の清掃に参加し、よく見つかるごみの種類を記録して発生源の把握に役立てます。',
    actionFourTitle: '身近な選択を変える',
    actionFour: '学校、サークル、店舗で給水スポット、分別表示、再利用の仕組みを提案します。',
    actionsCommunityKicker: 'チームで広げる',
    actionsCommunityTitle: '個人の習慣から地域の仕組みへ',
    actionsCommunityText: '活動を企画するなら、拾った量だけでなく、ごみの種類、場所、天候、参加人数を残すことが重要です。次の行動がより正確になります。',
    footerText: 'copyright © 2026 KCGI group 22 All rights reserved.',
    chartCanvasTitle: '日本周辺海域のごみ量',
    regionValueSuffix: 'の相対濃度を示します。',
    instructionCorrect: '✅ {item} — スコア +{score}。合計スコア: {totalScore}。',
    instructionWrong: '❌ {item} ではありません。もう一度試してみてください。',
    instructionUnknown: '不明なゴミです。正しい場所に戻してください。',
    empathyTitle: '視覚的共感：リアルな海洋画像',
    empathyDescription: '日本沿岸の実際の画像を通じて感情的な共感を呼び起こし、海洋保護の重要性を理解します。',
    videoKicker: 'テーマ動画',
    videoTitle: 'プラスチックはどのように海の生態系へ入るのか',
    videoDescription: '日常のプラスチックごみが河川、湾、海洋生物へ移動する流れを短い動画で確認します。',
    imageCaption1: '北海道の漁村と漂着ゴミ',
    imageCaption2: '沖縄近海の珊瑚と海の生き物',
    imageCaption3: '地域漁業と海洋環境のつながり',
    officialImageNote: '画像出典：環境省（公開ページ）',
    impactInteractiveTitle: '親手で参加し、変化を観察する',
    impactInteractiveDescription: '清掃ごとに水質と生態が変化し、「手で修復する」体験ができます。',
    beforeLabel: '清掃前',
    afterLabel: '清掃後',
    impactPhoto1: '清掃前：ごみが多い沿岸水域',
    impactPhoto2: '部分清掃：回復し始めた海',
    impactPhoto3: '完全清掃：健康な海洋環境',
    cleanupImageNote: '上の画像は海洋清掃テーマに基づく生成シミュレーション画像です。',
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
    simulationCurrent: '現在の状態',
    simulationPartial: '部分的な清掃',
    simulationFull: '完全な清掃',
    simulationImageAltCurrent: 'ごみで汚れた海と漂流プラスチック',
    simulationImageAltPartial: '部分的に清掃された海岸、まだ残るゴミ',
    simulationImageAltFull: '澄んだ海水と健康な海洋生物',
    simulationImageCaptionCurrent: '漂うごみで汚れた海水',
    simulationImageCaptionPartial: '部分清掃後でも続く努力が必要',
    simulationImageCaptionFull: '完全清掃後の健康な海',
    marineLifePoor: '海洋生物状態：受損',
    marineLifeModerate: '海洋生物状態：回復中',
    marineLifeHealthy: '海洋生物状態：健康',
    waterCloudy: '海水の色：濁っている',
    waterModerate: '海水の色：ややクリア',
    waterClear: '海水の色：澄んでいる'
  },
  zh: {
    heroEyebrow: '守护日本周边海洋',
    languageLabel: '语言',
    heroTitle: '海洋垃圾对日本沿海环境的影响',
    heroSubtitle: '通过浮游塑料、渔具、饮料瓶等实例，体验不断增加的垃圾对海洋生命的负担。',
    startButton: '开始体验',
    introTitle: '用互动方式理解日本近海垃圾问题',
    introText: '从真实影像、清理模拟、数据图表到区域地图，这个页面把“垃圾如何影响海洋”拆成可以观察、点击和比较的学习路径。',
    introKicker: '学习入口',
    introMetricOneLabel: '主要来源',
    introMetricOneText: '来自陆源输入的估计占比',
    introMetricTwoLabel: '高频类型',
    introMetricTwoText: '塑料瓶、渔具、泡沫、瓶罐等重点类别',
    introMetricThreeLabel: '学习方式',
    introMetricThreeText: '影像、游戏、模拟、数据、地图和行动模块',
    introModuleVisual: '影像观察',
    introModuleVisualTitle: '先看见问题',
    introModuleSim: '参与变化',
    introModuleSimTitle: '再模拟修复',
    introModuleData: '数据图表',
    introModuleDataTitle: '最后比较证据',
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
    chartTitle: '日本周边海洋垃圾量：按垃圾类型看影响',
    chartDescription: '这里使用日本环境省的年度推计资料，把塑料垃圾、道路粉尘、衣物纤维、洗涤用品等可量化来源放在一起比较，让用户更直观地看到哪些日常垃圾正在影响日本周边海洋。',
    chartKicker: '数据证据',
    chartMethodLabel: '阅读方式',
    chartMethodValue: '日本周边 · 每年约多少吨',
    chartMethodNote: '把复杂的推计值换成更容易读懂的生活化数量。',
    chartInputLabel: '年度总量',
    chartInputValue: '每年约 1.6万-3.1万吨',
    chartInputNote: '日本环境省按来源和品目估算进入海洋的塑料垃圾总量。',
    chartPlasticLabel: '大块塑料垃圾',
    chartPlasticNote: '包含被丢弃的塑料、海岸投弃物等看得见、捡得起的垃圾。',
    chartLandLabel: '微塑料粉尘',
    chartLandNote: '轮胎、道路标线、涂料、人工草坪等磨损后，会变成细小颗粒随雨水进入水域。',
    chartRiverLabel: '衣物纤维与洗剂',
    chartRiverNote: '洗衣掉落的纤维、洗涤用品里的微胶囊，也会通过污水系统进入海洋。',
    chartCompositionLabel: '类型对比',
    chartCompositionTitle: '哪些垃圾正在流向日本周边海洋',
    chartHighlightOne: '最大项来自轮胎、道路标线等磨损粉尘',
    chartHighlightTwo: '衣物纤维来自每一次日常洗衣',
    chartHighlightThree: '洗剂香味胶囊虽少，却很贴近日常生活',
    chartVolumeTotalLabel: '日本海洋塑料垃圾流出总量',
    chartVolumeNote: '包含大块塑料、微塑料、洗衣纤维、洗剂香味胶囊、道路和轮胎粉尘等已可估算项目。',
    chartDetailsKicker: '来源说明',
    chartDetailsTitle: '数据从哪里来，应该怎么读',
    chartLegendRecycle: '拦截与治理界面',
    chartLegendTrash: '垃圾量较高界面',
    chartSourceMOEEstimate: '环境省量化资料',
    chartSourceMOE2025: '环境省 FY2025',
    chartSourceMOE2025Short: '环境省 FY2025',
    chartSourceMOESurvey: '海洋ごみ実態把握調査',
    chartSourceNote: '口径提醒',
    chartSourceMOEEstimateTitle: '海洋垃圾量化方法',
    chartSourceMOEEstimateText: '用于说明环境省如何按来源和品目估算进入海洋的垃圾量。',
    chartSourceMOE2025Title: '令和7年度検討結果',
    chartSourceMOE2025Text: '用于塑料垃圾总量、微塑料、纤维、洗剂等类别的年度区间。',
    chartSourceMOESurveyTitle: '调查报告索引',
    chartSourceMOESurveyText: '用于追溯日本海洋垃圾调查、漂着垃圾、漂流垃圾和海底垃圾相关年度报告。',
    chartSourceNoteTitle: '这些数值是暂定估算',
    chartSourceNoteText: '页面用来帮助理解数量级和类型差异，不代表海里每一件垃圾都已被精确数完。',
    mapTitle: '日本沿岸垃圾分布地图',
    mapDescription: '显示日本周边沿岸观测到的垃圾浓度，并检查海洋生态影响。',
    mapLow: '低',
    mapMedium: '中',
    mapHigh: '高',
    mapFilterAll: '全部',
    mapNoData: '没有符合该筛选条件的区域数据。',
    impactTitle: '海洋垃圾不是漂在远处的问题',
    impactDescription: '它会从海面、海底、食物链和沿岸社区同时进入生态系统。理解影响路径，才能判断清理和减量该从哪里开始。',
    impactKicker: '生态影响',
    impactSignalLabel: '风险信号',
    impactSignalValue: '缠绕 · 摄入 · 微塑料',
    impactSignalNote: '从单件垃圾扩散为长期生态压力',
    impactPathOneTitle: '误食与营养损失',
    impactPathOneText: '透明塑料、瓶盖和泡沫碎片容易被鱼类、海鸟和海龟误认为食物，造成饱腹假象和消化阻塞。',
    impactPathTwoTitle: '渔具缠绕与幽灵捕捞',
    impactPathTwoText: '废弃渔网和绳索会持续缠住鱼类、海鸟和哺乳动物，也会破坏海草床与礁体结构。',
    impactPathThreeTitle: '微塑料进入食物链',
    impactPathThreeText: '碎裂后的微塑料更难回收，会被浮游生物和小型鱼类摄入，并沿食物链向上移动。',
    impactInsightOneValue: '海面',
    impactInsightOneText: '漂浮垃圾聚集在港湾、河口和洋流交汇处，影响景观、航行和近岸生物。',
    impactInsightTwoValue: '海底',
    impactInsightTwoText: '沉降垃圾会覆盖底栖生物栖息地，改变原本稳定的泥沙和礁石环境。',
    impactInsightThreeValue: '社区',
    impactInsightThreeText: '清理成本、渔获品质和旅游体验都会受到影响，环境问题最终回到人的生活。',
    impactNorthTitle: '北日本',
    impactNorthText: '塑料碎片随流冰漂流，对海鸟和海象构成威胁。',
    impactWestTitle: '西日本',
    impactWestText: '九州和濑户内海的渔具与塑料袋影响渔业资源。',
    impactSouthTitle: '西南诸岛',
    impactSouthText: '珊瑚礁周边的塑料碎片和微塑料增加生态系统压力。',
    actionsKicker: '行动计划',
    actionsTitle: '把海洋保护变成每天能完成的小动作',
    actionsDescription: '真正有效的行动不是一次性的热情，而是减少源头、正确回收、参与社区、持续记录四件事一起发生。',
    actionsImpactLabel: '优先级',
    actionsImpactValue: '少产生 · 不流入 · 可追踪',
    actionsImpactNote: '从源头减量比事后清理更有效',
    actionOneTitle: '减少一次性塑料',
    actionOne: '自带水杯、购物袋和餐具，把最容易进入河道的轻质包装先减下来。',
    actionTwoTitle: '把垃圾留在系统内',
    actionTwo: '饮料瓶、罐、玻璃和泡沫要清空、压缩、分类，让它们进入回收链而不是海岸线。',
    actionThreeTitle: '参加清理并记录',
    actionThree: '参与海岸或河道清理，记录常见垃圾类型，帮助判断真正需要治理的源头。',
    actionFourTitle: '影响身边选择',
    actionFour: '在学校、社团或店铺推动补水点、分类提示和可重复使用方案，让行动变成默认选项。',
    actionsCommunityKicker: '团队协作',
    actionsCommunityTitle: '从个人习惯扩大到社区机制',
    actionsCommunityText: '如果你能组织一次活动，重点不是“捡了多少”，而是把垃圾类型、地点、天气和参与人数记录下来。下一次行动就能更精准。',
    footerText: 'copyright © 2026 KCGI group 22 All rights reserved.',
    chartCanvasTitle: '日本周边海洋垃圾量',
    regionValueSuffix: '的相对浓度。',
    instructionCorrect: '✅ {item} — 得分 +{score}。当前总分: {totalScore}。',
    instructionWrong: '❌ {item} 放错了，请再试一次。',
    instructionUnknown: '未知垃圾。请放回正确位置。',
    empathyTitle: '视觉共情：真实海洋画面',
    empathyDescription: '通过日本沿岸的真实影像，引发情感共鸣，理解海洋保护的重要性。',
    videoKicker: '主题视频',
    videoTitle: '塑料如何进入海洋生态链',
    videoDescription: '通过短视频理解塑料垃圾从日常生活进入河流、海湾和海洋生物体内的路径。',
    imageCaption1: '北海道的渔村与漂流垃圾',
    imageCaption2: '冲绳珊瑚礁与海洋生物',
    imageCaption3: '渔业与海洋环境的联系',
    officialImageNote: '图片来源：日本环境省（公開資料）',
    impactInteractiveTitle: '亲手参与，观察变化',
    impactInteractiveDescription: '每次清理动作都会改变水质和生机，体验“手动修复”的过程。',
    beforeLabel: '清理前',
    afterLabel: '清理后',
    impactPhoto1: '清理前：垃圾较多的沿岸水体',
    impactPhoto2: '部分清理：正在恢复的海洋',
    impactPhoto3: '完全清理：健康的海洋环境',
    cleanupImageNote: '以上图片为基于海洋清理主题生成的模拟图像。',
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
    simulationCurrent: '当前状态',
    simulationPartial: '部分清理',
    simulationFull: '完全清理',
    simulationImageAltCurrent: '污染的海洋与漂浮垃圾',
    simulationImageAltPartial: '部分清理后的海岸，仍可见垃圾',
    simulationImageAltFull: '清澈海水与健康海洋生物',
    simulationImageCaptionCurrent: '漂浮垃圾污染水体',
    simulationImageCaptionPartial: '部分清理后仍需继续努力',
    simulationImageCaptionFull: '彻底清理后的健康海洋',
    marineLifePoor: '海洋生物状态：受损',
    marineLifeModerate: '海洋生物状态：恢复中',
    marineLifeHealthy: '海洋生物状态：健康',
    waterCloudy: '海水颜色：浑浊',
    waterModerate: '海水颜色：逐渐清澈',
    waterClear: '海水颜色：清澈'
  },
  en: {
    heroEyebrow: 'Protect Japan’s coastal seas',
    languageLabel: 'Language',
    heroTitle: 'Marine debris impacts on Japan’s ocean environment',
    heroSubtitle: 'Experience how floating plastics, fishing gear, and bottles burden marine life around Japan’s coasts.',
    startButton: 'Start Experience',
    introTitle: 'Understand marine debris near Japan through interaction',
    introText: 'Real imagery, cleanup simulation, charts, and maps turn the question of ocean debris into a path you can observe, click, and compare.',
    introKicker: 'Learning entry',
    introMetricOneLabel: 'Main source',
    introMetricOneText: 'Estimated share from land-based inputs',
    introMetricTwoLabel: 'Key types',
    introMetricTwoText: 'Bottles, fishing gear, foam, cans, and glass',
    introMetricThreeLabel: 'Learning modes',
    introMetricThreeText: 'Imagery, game, simulation, data, maps, and action',
    introModuleVisual: 'Visuals',
    introModuleVisualTitle: 'See the issue first',
    introModuleSim: 'Hands-on',
    introModuleSimTitle: 'Simulate recovery',
    introModuleData: 'Data',
    introModuleDataTitle: 'Compare evidence',
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
    chartTitle: 'Marine debris volume around Japan by waste type',
    chartDescription: 'This page uses annual estimates from Japan’s Ministry of the Environment to compare quantifiable sources such as plastic litter, road dust, textile fibers, and detergent-related microplastics.',
    chartKicker: 'Data evidence',
    chartMethodLabel: 'How to read',
    chartMethodValue: 'Japan waters · tons each year',
    chartMethodNote: 'Complex estimates are rewritten as more readable everyday quantities.',
    chartInputLabel: 'Annual total',
    chartInputValue: 'About 16,000-31,000 tons each year',
    chartInputNote: 'MOE estimates Japan’s marine plastic litter outflow by source and item.',
    chartPlasticLabel: 'Large plastic litter',
    chartPlasticNote: 'Visible plastic litter such as discarded plastic and coastal litter.',
    chartLandLabel: 'Microplastic dust',
    chartLandNote: 'Tires, road markings, paint, and artificial turf wear down into small particles that can wash into waterways.',
    chartRiverLabel: 'Textile fibers and detergents',
    chartRiverNote: 'Laundry fibers and fragrance capsules in detergents can move toward the sea through wastewater systems.',
    chartCompositionLabel: 'Type comparison',
    chartCompositionTitle: 'Which waste types flow toward Japanese waters',
    chartHighlightOne: 'The largest category comes from tire and road-marking wear',
    chartHighlightTwo: 'Textile fibers start with everyday laundry',
    chartHighlightThree: 'Detergent fragrance capsules are small but close to daily life',
    chartVolumeTotalLabel: 'Japan marine plastic litter outflow total',
    chartVolumeNote: 'Includes estimable items such as large plastic litter, microplastics, textile fibers, detergent fragrance capsules, and road or tire dust.',
    chartDetailsKicker: 'Source notes',
    chartDetailsTitle: 'Where the data comes from and how to read it',
    chartLegendRecycle: 'Interception interface',
    chartLegendTrash: 'Higher-volume interface',
    chartSourceMOEEstimate: 'MOE quantified material',
    chartSourceMOE2025: 'MOE FY2025',
    chartSourceMOE2025Short: 'MOE FY2025',
    chartSourceMOESurvey: 'Marine litter survey',
    chartSourceNote: 'Scope note',
    chartSourceMOEEstimateTitle: 'Quantifying marine litter',
    chartSourceMOEEstimateText: 'Used to explain how MOE estimates marine outflow by source and item.',
    chartSourceMOE2025Title: 'FY2025 study results',
    chartSourceMOE2025Text: 'Used for annual ranges for plastic litter, microplastics, fibers, and detergent-related items.',
    chartSourceMOESurveyTitle: 'Survey report index',
    chartSourceMOESurveyText: 'Used to trace annual reports on Japanese marine litter, washed-ashore litter, floating litter, and seabed litter.',
    chartSourceNoteTitle: 'These figures are provisional estimates',
    chartSourceNoteText: 'They help compare scale and type, but they do not mean every item in the sea has been counted precisely.',
    mapTitle: 'Marine debris distribution map',
    mapDescription: 'Show debris concentration near Japan’s coasts and examine ecosystem impacts.',
    mapLow: 'Low',
    mapMedium: 'Medium',
    mapHigh: 'High',
    mapFilterAll: 'All',
    mapNoData: 'No region data matches this filter.',
    impactTitle: 'Marine debris is not a distant problem',
    impactDescription: 'It enters the surface, seabed, food web, and coastal communities at the same time. Following the pathway helps decide where cleanup and reduction should begin.',
    impactKicker: 'Ecological impact',
    impactSignalLabel: 'Risk signals',
    impactSignalValue: 'Entanglement · ingestion · microplastics',
    impactSignalNote: 'A single item can become long-term ecological pressure',
    impactPathOneTitle: 'Ingestion and nutrition loss',
    impactPathOneText: 'Clear plastic, caps, and foam fragments can be mistaken for food by fish, seabirds, and turtles, causing false fullness and blockage.',
    impactPathTwoTitle: 'Fishing gear entanglement',
    impactPathTwoText: 'Discarded nets and ropes keep trapping animals and can damage seagrass beds and reef structures.',
    impactPathThreeTitle: 'Microplastics in the food web',
    impactPathThreeText: 'Fragmented plastic is harder to recover and can move upward after plankton and small fish ingest it.',
    impactInsightOneValue: 'Surface',
    impactInsightOneText: 'Floating debris collects near ports, river mouths, and current boundaries, affecting scenery, navigation, and coastal life.',
    impactInsightTwoValue: 'Seabed',
    impactInsightTwoText: 'Sinking debris covers habitats for bottom-dwelling species and changes sediment and reef conditions.',
    impactInsightThreeValue: 'Community',
    impactInsightThreeText: 'Cleanup cost, seafood quality, and tourism are affected, bringing the environmental issue back into daily life.',
    impactNorthTitle: 'Northern Japan',
    impactNorthText: 'Plastic fragments drift with sea ice, threatening seabirds and seals.',
    impactWestTitle: 'Western Japan',
    impactWestText: 'Fishing gear and plastic sheets affect fisheries in Kyushu and the Seto Inland Sea.',
    impactSouthTitle: 'Southwest Islands',
    impactSouthText: 'Plastic fragments and microplastics stress coral reef ecosystems.',
    actionsKicker: 'Action plan',
    actionsTitle: 'Turn ocean protection into small daily actions',
    actionsDescription: 'Effective action is not a one-time burst of enthusiasm. It combines source reduction, correct recovery, community participation, and continuous tracking.',
    actionsImpactLabel: 'Priority',
    actionsImpactValue: 'Reduce · contain · track',
    actionsImpactNote: 'Reducing at the source is more effective than cleaning afterward.',
    actionOneTitle: 'Reduce single-use plastic',
    actionOne: 'Carry a bottle, bag, and utensils to cut lightweight packaging that can easily enter waterways.',
    actionTwoTitle: 'Keep waste inside the system',
    actionTwo: 'Empty, compress, and sort bottles, cans, glass, and foam so they return to recovery streams instead of coastlines.',
    actionThreeTitle: 'Join cleanups and record data',
    actionThree: 'Take part in coastal or river cleanup and record common debris types to reveal the source that needs attention.',
    actionFourTitle: 'Influence nearby choices',
    actionFour: 'Promote refill points, sorting prompts, and reusable options in schools, groups, or local shops.',
    actionsCommunityKicker: 'Team practice',
    actionsCommunityTitle: 'Scale personal habits into community systems',
    actionsCommunityText: 'If you organize an activity, the goal is not only how much you collect. Record debris types, location, weather, and participants so the next action becomes sharper.',
    footerText: 'copyright © 2026 KCGI group 22 All rights reserved.',
    chartCanvasTitle: 'Marine debris volume around Japan',
    regionValueSuffix: ' relative concentration.',
    instructionCorrect: '✅ {item} — +{score} points. Total: {totalScore}.',
    instructionWrong: '❌ {item} is not correct. Try again.',
    instructionUnknown: 'Unknown debris. Put it back in the correct place.',
    empathyTitle: 'Visual Empathy: Authentic Ocean Imagery',
    empathyDescription: 'Experience real coastal images from Japan to evoke emotional connection and understand the importance of ocean protection.',
    videoKicker: 'Featured video',
    videoTitle: 'How plastic enters the marine food web',
    videoDescription: 'A short video explains how everyday plastic waste moves from daily life into rivers, bays, and marine animals.',
    imageCaption1: 'Fishing village with coastal debris',
    imageCaption2: 'Coral life near Okinawa',
    imageCaption3: 'Fishing communities and ocean health',
    officialImageNote: 'Image source: Ministry of the Environment, Japan (public pages).',
    impactInteractiveTitle: 'Participate and observe change',
    impactInteractiveDescription: 'Each cleanup action changes water quality and marine life, showing restoration in real time.',
    beforeLabel: 'Before cleanup',
    afterLabel: 'After cleanup',
    impactPhoto1: 'Before cleanup: debris-heavy coastal water',
    impactPhoto2: 'Partial cleanup: ocean beginning to recover',
    impactPhoto3: 'Full cleanup: healthy marine environment',
    cleanupImageNote: 'Images above are generated simulations based on the marine cleanup theme.',
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
    simulationCurrent: 'Current state',
    simulationPartial: 'Partial cleanup',
    simulationFull: 'Full cleanup',
    simulationImageAltCurrent: 'Polluted ocean water with plastic debris',
    simulationImageAltPartial: 'Partially cleaned coast with remaining debris',
    simulationImageAltFull: 'Clear ocean water with healthy marine life',
    simulationImageCaptionCurrent: 'Polluted water with floating debris',
    simulationImageCaptionPartial: 'Partial cleanup still needs more care',
    simulationImageCaptionFull: 'Healthy ocean after full cleanup',
    marineLifePoor: 'Marine life: stressed',
    marineLifeModerate: 'Marine life: recovering',
    marineLifeHealthy: 'Marine life: healthy',
    waterCloudy: 'Water color: cloudy',
    waterModerate: 'Water color: clearer',
    waterClear: 'Water color: clear'
  }
};

/**
 * 游戏垃圾数据
 * Game debris data
 * 定义不同类型垃圾的属性：目标容器、标签键和分数
 * Defines properties for different debris types: target container, label key, and score
 */
const debrisPieces = {
  plastic: { target: 'recycle', labelKey: 'debrisPlastic', score: 10 },
  fishing: { target: 'trash', labelKey: 'debrisFishing', score: 8 },
  organic: { target: 'recycle', labelKey: 'debrisOrganic', score: 6 },
  other: { target: 'trash', labelKey: 'debrisOther', score: 5 }
};

/**
 * 图表数据
 * Chart data
 * 日本周边海洋垃圾类型年度量级指标
 * Annual item/source indicators for marine debris around Japan
 */
const chartData = [
  { key: 'japanPlasticOutflowTotal', labelKey: 'chartJapanPlasticOutflowTotal', sourceKey: 'chartSourceMOE2025Short', min: 16000, max: 31000, type: 'total' },
  { key: 'japanMacroPlastic', labelKey: 'chartJapanMacroPlastic', sourceKey: 'chartSourceMOE2025Short', min: 1300, max: 8600, type: 'macro' },
  { key: 'japanUnintentionalMicroplastic', labelKey: 'chartJapanUnintentionalMicroplastic', sourceKey: 'chartSourceMOE2025Short', min: 14000, max: 20000, type: 'micro' },
  { key: 'japanIntentionalMicroplastic', labelKey: 'chartJapanIntentionalMicroplastic', sourceKey: 'chartSourceMOE2025Short', min: 610, max: 2500, type: 'additive' },
  { key: 'japanTextileFiber', labelKey: 'chartJapanTextileFiber', sourceKey: 'chartSourceMOE2025Short', min: 230, max: 240, type: 'fiber' },
  { key: 'japanResinPellet', labelKey: 'chartJapanResinPellet', sourceKey: 'chartSourceMOE2025Short', min: 100, max: 840, type: 'pellet' },
  { key: 'japanDetergentCapsules', labelKey: 'chartJapanDetergentCapsules', sourceKey: 'chartSourceMOE2025Short', min: 0.5, max: 5, type: 'detergent' }
];

/**
 * 地图区域数据
 * Map region data
 * 日本各区域的海洋垃圾浓度数据
 * Marine debris concentration data for each region in Japan
 */
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
    chartJapanPlasticOutflowTotal: '海洋プラスチックごみ総量',
    chartJapanMacroPlastic: '大きなプラスチックごみ',
    chartJapanUnintentionalMicroplastic: '摩耗で生まれる微細ごみ',
    chartJapanIntentionalMicroplastic: '製品に使われる微細ごみ',
    chartJapanTextileFiber: '洗濯で出る衣類繊維',
    chartJapanResinPellet: '樹脂ペレット・発泡ビーズ',
    chartJapanDetergentCapsules: '洗剤類の香りカプセル',
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
    chartJapanPlasticOutflowTotal: '海洋塑料垃圾总量',
    chartJapanMacroPlastic: '大块塑料垃圾',
    chartJapanUnintentionalMicroplastic: '磨损产生的微塑料',
    chartJapanIntentionalMicroplastic: '产品里添加的微塑料',
    chartJapanTextileFiber: '洗衣产生的纤维',
    chartJapanResinPellet: '树脂颗粒/发泡珠',
    chartJapanDetergentCapsules: '洗涤用品香味胶囊',
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
    chartJapanPlasticOutflowTotal: 'Marine plastic litter outflow total',
    chartJapanMacroPlastic: 'Large plastic litter',
    chartJapanUnintentionalMicroplastic: 'Wear-generated microplastics',
    chartJapanIntentionalMicroplastic: 'Product-added microplastics',
    chartJapanTextileFiber: 'Laundry textile fibers',
    chartJapanResinPellet: 'Resin pellets and foam beads',
    chartJapanDetergentCapsules: 'Detergent fragrance capsules',
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

let currentLanguage = 'ja';

/**
 * 获取本地化标签
 * Get localized label
 * 根据当前语言返回对应的本地化文本
 * Returns localized text based on current language
 * @param {string} key - 标签键 / Label key
 * @returns {string} 本地化文本 / Localized text
 */
function getLocalizedLabel(key) {
  return translations[currentLanguage][key] || localizedLabels[currentLanguage][key] || key;
}

/**
 * 格式化模板字符串
 * Format template string
 * 用提供的数值替换模板中的占位符
 * Replaces placeholders in template with provided values
 * @param {string} template - 模板字符串 / Template string
 * @param {object} values - 替换值对象 / Replacement values object
 * @returns {string} 格式化后的字符串 / Formatted string
 */
function formatTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
}

/**
 * 更新页面翻译内容
 * Update localized page text
 * 遍历页面中的 data-i18n 属性并替换为当前语言文本
 */
function translatePage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!translations[currentLanguage] || !translations[currentLanguage][key]) return;
    el.textContent = translations[currentLanguage][key];
  });
}

/**
 * 初始化语言切换器
 * Initialize the language selector and load saved语言设置
 */
function initLanguageSwitcher() {
  const savedLanguage = localStorage.getItem('marineDebrisLanguage');
  currentLanguage = savedLanguage || (navigator.language.startsWith('zh') ? 'zh' : navigator.language.startsWith('en') ? 'en' : 'ja');

  const languageSelect = document.getElementById('languageSwitch');
  if (languageSelect) {
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener('change', event => {
      currentLanguage = event.target.value;
      localStorage.setItem('marineDebrisLanguage', currentLanguage);
      translatePage();
      if (typeof window.onLanguageChanged === 'function') {
        window.onLanguageChanged();
      }
    });
  }

  translatePage();
  if (typeof window.onLanguageChanged === 'function') {
    window.onLanguageChanged();
  }
}

/**
 * 获取权重颜色
 * Get weight color
 * 根据污染程度返回对应的颜色值
 * Returns color value based on pollution level
 * @param {string} weight - 权重级别 ('low', 'medium', 'high') / Weight level
 * @returns {string} CSS颜色值 / CSS color value
 */
function getWeightColor(weight) {
  if (weight === 'high') return 'var(--map-high)';
  if (weight === 'medium') return 'var(--map-medium)';
  return 'var(--map-low)';
}
