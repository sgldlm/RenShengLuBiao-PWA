const DAY_IN_MS = 24 * 60 * 60 * 1000;
const CHINA_STANDARD_UTC_OFFSET_HOURS = 8;
const THEME_REFRESH_VERSION = "33";
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ZODIACS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const ELEMENTS_BY_STEM = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];
const ELEMENTS_BY_BRANCH = ["水", "土", "木", "木", "土", "火", "火", "土", "金", "金", "土", "水"];
const ELEMENT_ORDER = ["木", "火", "土", "金", "水"];
const ELEMENT_GENERATES = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
const ELEMENT_CONTROLS = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
const ELEMENT_RADICALS = {
  木: "木林森松柏柳杨桐桂梅桃李杏枝栋梁禾竹艹草花芳英莲荣茶",
  火: "火炎炳炜煜熙熹煊烨焱灿炫烽日明昌晶昭晖晟光",
  土: "土山岳峰岩坤垚城培基堂均坦田黄玉王石辰丑未戌",
  金: "金钅鑫锋锐铭锦铮钧钟银铜铁锡钱贝刀刂辛酉西",
  水: "水氵江河海洋涛波清洁涵淼源泉雨雪霖露冰冫子亥北",
};
const NAME_ELEMENT_VERDICTS = {
  generates: {
    木: "名生身局，主有贵人扶起，学业事业先开路后见财。",
    火: "名生身局，主声名动而机会来，宜主动显才。",
    土: "名生身局，主根基稳，得家宅、资源、组织之助。",
    金: "名生身局，主规则成器，利职位、证照、权责分明之事。",
    水: "名生身局，主思路活，利远行、信息、流通与谋略。",
  },
  same: {
    木: "名身同气，主性直能伸，成败多在执行是否到底。",
    火: "名身同气，主气势足，名声易起，也忌急躁犯口舌。",
    土: "名身同气，主能守成聚财，亦忌迟疑保守。",
    金: "名身同气，主断事有锋，宜立规矩，不宜过硬伤和。",
    水: "名身同气，主智谋深，宜定方向，不宜多思少行。",
  },
  controlsSelf: {
    木: "名来克身，少年多压，逢事先难后成；须借火土转局。",
    火: "名来克身，外界催逼重，宜以土泄火气，先稳后发。",
    土: "名来克身，责任压身，宜取金为用，立边界则成。",
    金: "名来克身，规矩束身，宜取水通关，以变通破局。",
    水: "名来克身，思虑压身，宜取木泄水，行动即开运。",
  },
  selfControls: {
    木: "身克名象，主不服旧局，能夺资源；财来须有章法。",
    火: "身克名象，主有争胜心，能逼出名声；忌逞强损人和。",
    土: "身克名象，主能管事聚物，财务可掌；忌滞重不变。",
    金: "身克名象，主敢裁断取财，利合同制度；忌锋芒太露。",
    水: "身克名象，主能以谋取势，利流动之财；忌反复不定。",
  },
};
const LUNAR_START_YEAR = 1900;
const LUNAR_END_YEAR = 2100;
const LUNAR_BASE_DATE = new Date(1900, 0, 31);
const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
  0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
  0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
  0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
  0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
  0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573,
  0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
  0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
  0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
  0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
  0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
  0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
  0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
  0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0,
  0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
  0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370,
  0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0,
  0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50,
  0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0,
  0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520,
  0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
  0x0d520,
];
const PRO_ACCESS = {
  priceText: "9.9元",
  productName: "解锁超值完整版9.9元",
  wechatQrImage: "payment/wechat-qr.jpg",
  alipayQrImage: "payment/alipay-qr.png",
  supportText: "填写手机号后扫码付款，付款留言必须写这个手机号；收到短信验证码后输入即可开通人生路标。",
  authSalt: "TIME_MACHINE_PHONE_LICENSE_2026_BQ",
};
const PAYMENT_METHODS = {
  wechat: {
    key: "wechat",
    name: "微信",
    label: "微信付款二维码",
    title: "微信扫码支付",
    image: PRO_ACCESS.wechatQrImage,
    fileName: "rensheng-lubiao-wechat-qr.jpg",
    appButton: "保存后打开微信",
  },
  alipay: {
    key: "alipay",
    name: "支付宝",
    label: "支付宝付款二维码",
    title: "支付宝扫码支付",
    image: PRO_ACCESS.alipayQrImage,
    fileName: "rensheng-lubiao-alipay-qr.png",
    appButton: "保存后打开支付宝",
  },
};
const storage = {
  getItem(key) {
    try {
      return window.localStorage ? window.localStorage.getItem(key) || "" : "";
    } catch (error) {
      return "";
    }
  },
  setItem(key, value) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      // Some Android WebView builds restrict file:// localStorage. The app can still run without persistence.
    }
  },
};
const PERSONAL_ELEMENT_COPY = {
  木: {
    strength: "更偏向生长、规划、学习与建立连接",
    reminder: "别只顾展开，也要设置完成标准",
  },
  火: {
    strength: "更偏向表达、行动、创造与带动气氛",
    reminder: "热度很重要，节奏和复盘同样重要",
  },
  土: {
    strength: "更偏向稳定、承载、整合与把事情落地",
    reminder: "稳住边界，也别把所有事都揽到自己身上",
  },
  金: {
    strength: "更偏向判断、规则、边界与完成闭环",
    reminder: "清晰有力量，也要给变化留出余地",
  },
  水: {
    strength: "更偏向观察、研究、适应与深度思考",
    reminder: "想清楚之后要给自己一个行动节点",
  },
};
const DESTINY_ELEMENT_ARCHETYPES = {
  木: {
    title: "开枝立业命",
    middle: "中年行木火之象，靠学习、资质、内容、策划与人脉开路；早铺根，后见势。",
    old: "老年宜取清闲生发之气，适合带后辈、做顾问、经营兴趣与文化之事。",
    jobs: ["教育培训", "策划咨询", "内容出版", "医药养生", "园林设计", "长期项目"],
    toil: "木旺多奔走，少年中年不宜散漫；能立规矩者成林，不能收束者徒长。",
    wealth: "财从土来，木能克土为财，宜靠项目、资产、管理落地取财，不宜只谈理想。",
  },
  火: {
    title: "声名外发命",
    middle: "中年行火土之象，靠表达、销售、传播、管理与曝光得势；名声一开，机会随来。",
    old: "老年宜减火气、重节奏，适合做品牌顾问、讲授经验、参与公益与社群。",
    jobs: ["品牌营销", "销售公关", "传媒演艺", "餐饮美业", "互联网运营", "培训讲师"],
    toil: "火旺多急，劳在心神与情绪；能定节奏则有名有利，躁进则口舌耗财。",
    wealth: "财从金来，火克金为财，宜靠规则、合同、产品与定价取财，忌凭一时热度下注。",
  },
  土: {
    title: "厚载守成命",
    middle: "中年行土金之象，靠组织、管理、地产、工程、供应链与稳定资源成事。",
    old: "老年宜守资产、护家庭、做长期配置，不宜再替所有人扛事。",
    jobs: ["行政管理", "工程地产", "供应链", "财务内控", "农业食品", "组织运营"],
    toil: "土重多操劳，常为家宅、团队、责任奔忙；能分权则成富厚，独扛则成苦劳。",
    wealth: "财从水来，土克水为财，宜靠现金流、渠道、贸易与周转取财，忌资金压死。",
  },
  金: {
    title: "制器掌权命",
    middle: "中年行金水之象，靠制度、技术、金融、审计、法务、器械与决断得位。",
    old: "老年宜退锋藏锐，适合做风控、评审、顾问、收藏整理与规则传承。",
    jobs: ["金融风控", "法律审计", "技术工程", "医疗器械", "军警安保", "制度管理"],
    toil: "金旺劳在判断与压力，身边多硬事；能柔能刚则掌权，过硬则伤和。",
    wealth: "财从木来，金克木为财，宜靠专业、专利、技术、标准和稀缺资源取财。",
  },
  水: {
    title: "智谋流通命",
    middle: "中年行水木之象，靠信息、贸易、流动、研究、数据、跨界与远方机会起势。",
    old: "老年宜取清静智慧之象，适合研究、写作、顾问、旅行与轻资产经营。",
    jobs: ["贸易物流", "数据研究", "咨询顾问", "旅游交通", "跨境业务", "心理与内容"],
    toil: "水旺多思多动，劳在奔波与反复；能定方向则智慧生财，犹疑则财散。",
    wealth: "财从火来，水克火为财，宜靠流量、传播、能源、餐饮、品牌与可见度取财。",
  },
};
const DIRECTIONS_BY_ELEMENT = {
  木: { name: "东方", degree: 90, text: "木气主生发，宜面向东方整理计划、启新事、求生机。" },
  火: { name: "南方", degree: 180, text: "火气主显达，宜面向南方表达、展示、通名声。" },
  土: { name: "中央 · 西南", degree: 225, text: "土气主承载，宜守中定局、整合资源、处理现实事务。" },
  金: { name: "西方", degree: 270, text: "金气主收敛，宜面向西方决断取舍、立规矩、收尾。" },
  水: { name: "北方", degree: 0, text: "水气主流动，宜面向北方审势、研判、复盘。" },
};
const GENERATING_ELEMENT = { 木: "水", 火: "木", 土: "火", 金: "土", 水: "金" };
const BRANCH_META = [
  { element: "水", direction: "正北", degree: 0 },
  { element: "土", direction: "东北偏北", degree: 30 },
  { element: "木", direction: "东北偏东", degree: 60 },
  { element: "木", direction: "正东", degree: 90 },
  { element: "土", direction: "东南偏东", degree: 120 },
  { element: "火", direction: "东南偏南", degree: 150 },
  { element: "火", direction: "正南", degree: 180 },
  { element: "土", direction: "西南偏南", degree: 210 },
  { element: "金", direction: "西南偏西", degree: 240 },
  { element: "金", direction: "正西", degree: 270 },
  { element: "土", direction: "西北偏西", degree: 300 },
  { element: "水", direction: "西北偏北", degree: 330 },
];
const ELEMENT_COPY = {
  木: {
    title: "生长与展开",
    text: "木主生发、连接与长期建设。今日宜先立结构，再求延展。",
    favorable: ["学习", "规划", "启动", "协作"],
    caution: ["急于定论", "过度扩张", "忽略细节"],
  },
  火: {
    title: "表达与照见",
    text: "火主显现、热情与传播。今日宜明言、宜展示，忌躁烈。",
    favorable: ["表达", "创作", "展示", "会面"],
    caution: ["冲动回应", "情绪争辩", "透支精力"],
  },
  土: {
    title: "承载与稳定",
    text: "土主秩序、现实与整合。今日宜收束杂事，使其落地。",
    favorable: ["整理", "复盘", "储备", "落实"],
    caution: ["固守旧法", "拖延变化", "承担过量"],
  },
  金: {
    title: "判断与收束",
    text: "金主边界、选择与完成。今日宜断杂音，明取舍。",
    favorable: ["决断", "收尾", "校对", "建立规则"],
    caution: ["过度苛刻", "仓促切割", "言语锋利"],
  },
  水: {
    title: "审势与流动",
    text: "水主洞察、应变与深度。今日宜审局势，留活路。",
    favorable: ["研究", "沟通", "休整", "灵活调整"],
    caution: ["反复犹疑", "回避行动", "信息过载"],
  },
};
const SIX_REN = [
  {
    name: "大安",
    score: 82,
    tone: "安定",
    text: "大安事事昌，求财在坤方，失物去不远，宅舍保安康。",
    roadText: "安定好走，适合把计划落到纸面，也适合把拖着的事稳稳收住。",
  },
  {
    name: "留连",
    score: 46,
    tone: "迟缓",
    text: "留连事难成，求谋日未明，官事凡宜缓，去者未回程。",
    roadText: "节奏偏慢，先别急着冲，适合复盘、等消息、把细节再核一遍。",
  },
  {
    name: "速喜",
    score: 88,
    tone: "明快",
    text: "速喜喜来临，求财向南行，失物申未午，逢人路上寻。",
    roadText: "节奏明快，适合沟通、会面、回应机会，想到的好事别拖太久。",
  },
  {
    name: "赤口",
    score: 34,
    tone: "谨言",
    text: "赤口主口舌，官非切要防，失物急去寻，行人有惊慌。",
    roadText: "沟通容易起波纹，先少说重话，重要决定留出冷静时间。",
  },
  {
    name: "小吉",
    score: 74,
    tone: "渐进",
    text: "小吉最吉昌，路上好商量，阴人来报喜，失物在坤方。",
    roadText: "路上好商量，适合找人协作、推进小目标，把好消息接住。",
  },
  {
    name: "空亡",
    score: 28,
    tone: "留白",
    text: "空亡事不祥，阴人多乖张，求财无利益，行人有灾殃。",
    roadText: "节奏留白，先保守一点，别把钱、承诺和情绪一次性压上去。",
  },
];
const SIX_REN_ORACLE = {
  大安: {
    title: "大安 · 事稳可守",
    detail: "大安主静、主安、主宅舍平稳。凡事宜守中、宜按计划推进，不宜临时改道。",
    wealth: "求财在坤方，守财胜过冒进，适合稳账、收尾、谈长期。",
    lost: "失物去不远，多在近处、旧处、柜箱、角落或家宅内。",
    travel: "行人未动或行程慢，宜等消息，不宜反复催促。",
    people: "贵在稳人心，适合修复关系、请托长辈或稳定合作者。",
    health: "病象多平稳，宜静养调息；讼事宜和解、缓办。",
    timing: "应在慢处，宜取辰戌丑未、坤土之时象。",
    actions: ["宜守成、签长期、修关系。", "忌急变、强攻、临时加码。", "问事先看根基，根基稳则成。"],
  },
  留连: {
    title: "留连 · 事缓难决",
    detail: "留连主拖延、牵绊、反复。凡事先卡在手续、消息、人情或旧问题。",
    wealth: "求财迟缓，账款易拖，宜催单据、留凭证、分批推进。",
    lost: "失物难即得，多被压住、夹住、留在中途或旧位置。",
    travel: "行人未回，消息不明，出行易误点或临时改期。",
    people: "人事多纠缠，宜少承诺，先把话说清。",
    health: "病象缠绵，宜复查旧疾；讼事拖久，勿急求定论。",
    timing: "应在迟处，宜等二次消息或过一轮再动。",
    actions: ["宜复盘、补资料、等回音。", "忌急签、急投、急断关系。", "问财问事先查旧账旧约。"],
  },
  速喜: {
    title: "速喜 · 喜信速至",
    detail: "速喜主快、主消息、主喜庆。凡事宜趁热打铁，消息来时要接住。",
    wealth: "求财向南，利沟通成交、回款催收、短线机会。",
    lost: "失物申未午可寻，多在路上、车上、桌面或常用处。",
    travel: "行人将至，出行可成，但要抓紧时间。",
    people: "逢人路上寻，适合约见、表达、求助、谈合作。",
    health: "病象来快去快，忌上火急躁；讼事宜快和快结。",
    timing: "应在近时，午未申及南方火象更显。",
    actions: ["宜马上沟通、约见、推进。", "忌拖延失机。", "问事重速度，先行动再修正。"],
  },
  赤口: {
    title: "赤口 · 口舌争执",
    detail: "赤口主口舌、争竞、伤损。凡事先防言语、合同、情绪和冲突。",
    wealth: "求财有争，易压价、反悔、口头承诺变卦，必须白纸黑字。",
    lost: "失物急寻，迟则生变，多在金属、门口、争执处或外人手边。",
    travel: "行人有惊，出行防口角、交通延误和临时阻隔。",
    people: "人事忌硬碰，少说重话，先停火再谈。",
    health: "病象防炎症、外伤、口舌咽喉；讼事不利硬刚。",
    timing: "应在急处，越急越要缓半拍。",
    actions: ["宜闭口、核约、留证据。", "忌争吵、冲动、硬签。", "问感情人事先降火。"],
  },
  小吉: {
    title: "小吉 · 小成渐进",
    detail: "小吉主小利、小喜、可商量。凡事不宜贪大，宜以小步成局。",
    wealth: "求财可得小利，适合副业、小单、回款、试投。",
    lost: "失物在坤方，慢找可得，多在低处、包内、柜边。",
    travel: "路上好商量，出行办事有人帮，宜带齐资料。",
    people: "阴人来报喜，利女性、同事、朋友、客户牵线。",
    health: "病象可缓，宜小调小养；讼事宜和谈。",
    timing: "应在渐进处，先小成后大成。",
    actions: ["宜求助、试行、分步推进。", "忌贪大、贪快、一次压满。", "问事重人和，人和则顺。"],
  },
  空亡: {
    title: "空亡 · 空耗宜止",
    detail: "空亡主落空、虚耗、无着。凡事先保守，宜止损、留白、换路。",
    wealth: "求财无益，忌借贷、重投、追高，先守现金流。",
    lost: "失物难得，或已离原处，宜报备、止损、补救。",
    travel: "行人有阻，出行防空跑、取消、误期。",
    people: "人事虚浮，承诺不足信，先看行动不听空话。",
    health: "病象宜休养，防虚耗疲惫；讼事不宜扩大。",
    timing: "应在空处，当前不宜定大事，过一日或换时再看。",
    actions: ["宜止损、休整、换方案。", "忌重仓、重诺、硬闯。", "问事先问能否退出。"],
  },
};
const TRIGRAMS = {
  1: { name: "乾", symbol: "☰", nature: "天", element: "金", lines: [1, 1, 1] },
  2: { name: "兑", symbol: "☱", nature: "泽", element: "金", lines: [1, 1, 0] },
  3: { name: "离", symbol: "☲", nature: "火", element: "火", lines: [1, 0, 1] },
  4: { name: "震", symbol: "☳", nature: "雷", element: "木", lines: [1, 0, 0] },
  5: { name: "巽", symbol: "☴", nature: "风", element: "木", lines: [0, 1, 1] },
  6: { name: "坎", symbol: "☵", nature: "水", element: "水", lines: [0, 1, 0] },
  7: { name: "艮", symbol: "☶", nature: "山", element: "土", lines: [0, 0, 1] },
  8: { name: "坤", symbol: "☷", nature: "地", element: "土", lines: [0, 0, 0] },
};
const TRIGRAM_TRAITS = {
  1: "刚健、主动、规则、领导与权威",
  2: "沟通、谈判、喜悦、销售与口舌",
  3: "显现、名声、文书、传播与清晰",
  4: "启动、行动、突发、消息与变化",
  5: "渗透、渠道、信息、贸易与反复",
  6: "风险、阻隔、资金、压力与隐情",
  7: "停止、门槛、等待、边界与阻力",
  8: "承载、资源、团队、积累与顺势",
};
const PROFESSIONAL_TOPICS = {
  general: {
    name: "综合事项",
    summary: "从整体趋势、机会、阻力、行动节奏、人际协同和风险提醒六个角度综合分析。",
    good: "总体主吉，宜顺势而为，并把关键条件写清楚。",
    neutral: "总体主平，宜先试行，后扩大投入。",
    difficult: "眼前阻力比机会更明显，先补资料、查风险、留退路。",
  },
  business: {
    name: "项目合作",
    summary: "重点分析合作条件、责任边界、履约能力、签约节奏和潜在风险。",
    good: "主可成，价格、责任、付款和交付时间必须落到文字。",
    neutral: "先做小范围试合作，不要一次投入过多资源。",
    difficult: "不宜急着签约，先核对资质、履约能力和付款条件。",
  },
  money: {
    name: "财运回款",
    summary: "重点分析资金流向、回款机会、投入节奏、账期压力和风险控制。",
    good: "资金有流入机会，重点盯紧回款节点与书面凭证。",
    neutral: "主可谈，宜分批、分段控制风险。",
    difficult: "资金链压力偏高，注意拖款、压价和账期拉长。",
  },
  career: {
    name: "事业工作",
    summary: "重点分析工作进展、职位机会、上下级关系、行动时机和压力来源。",
    good: "有上升之象，宜主动争取并展示实际成果。",
    neutral: "宜稳扎稳打，先把手上的事情做完整。",
    difficult: "压力多来自制度或上级，宜避正面硬碰。",
  },
  love: {
    name: "感情人际",
    summary: "重点分析关系状态、沟通方式、彼此距离、情绪变化和改善方向。",
    good: "关系有靠近与缓和的空间，真诚表达比猜测有效。",
    neutral: "多沟通、少试探，不要把话说死。",
    difficult: "容易误会或冷战，先让情绪降温再处理关系。",
  },
  travel: {
    name: "出行办事",
    summary: "重点分析行程顺逆、办事效率、时间安排、资料准备和替代方案。",
    good: "主出行顺，先定时间、路线和材料。",
    neutral: "能去，但要预留时间并准备替代方案。",
    difficult: "容易延误、反复跑动或资料不齐，宜缓一步。",
  },
  health: {
    name: "健康状态",
    summary: "重点分析身心节奏、休息恢复、压力信号和日常调整方向。",
    good: "恢复力尚可，重点是睡眠、休息与规律节奏。",
    neutral: "状态需要调节，不宜透支精力。",
    difficult: "气机受阻，宜静养调息，忌强行耗神。",
  },
};
const HEXAGRAM_NAMES = [
  ["乾为天", "天泽履", "天火同人", "天雷无妄", "天风姤", "天水讼", "天山遁", "天地否"],
  ["泽天夬", "兑为泽", "泽火革", "泽雷随", "泽风大过", "泽水困", "泽山咸", "泽地萃"],
  ["火天大有", "火泽睽", "离为火", "火雷噬嗑", "火风鼎", "火水未济", "火山旅", "火地晋"],
  ["雷天大壮", "雷泽归妹", "雷火丰", "震为雷", "雷风恒", "雷水解", "雷山小过", "雷地豫"],
  ["风天小畜", "风泽中孚", "风火家人", "风雷益", "巽为风", "风水涣", "风山渐", "风地观"],
  ["水天需", "水泽节", "水火既济", "水雷屯", "水风井", "坎为水", "水山蹇", "水地比"],
  ["山天大畜", "山泽损", "山火贲", "山雷颐", "山风蛊", "山水蒙", "艮为山", "山地剥"],
  ["地天泰", "地泽临", "地火明夷", "地雷复", "地风升", "地水师", "地山谦", "坤为地"],
];
const RHYTHMS = [
  ["静观其变", "先观察正在发生什么，再决定是否推进。"],
  ["建立秩序", "把复杂问题拆小，优先完成最确定的一步。"],
  ["主动连接", "适合沟通、请教与交换信息，避免独自猜测。"],
  ["集中能量", "减少并行任务，把注意力放在一个关键目标上。"],
  ["完成闭环", "适合收尾、整理与兑现之前做出的承诺。"],
  ["留出空白", "适合休整与复盘，不必把每一分钟都填满。"],
];
const SIX_HARMONY = ["子丑", "寅亥", "卯戌", "辰酉", "巳申", "午未"];
const SIX_CLASH = ["子午", "丑未", "寅申", "卯酉", "辰戌", "巳亥"];
const ZODIAC_FACTS = [
  { yinYang: "阳", season: "冬", direction: "正北", hours: "23–01" },
  { yinYang: "阴", season: "季冬", direction: "东北偏北", hours: "01–03" },
  { yinYang: "阳", season: "初春", direction: "东北偏东", hours: "03–05" },
  { yinYang: "阴", season: "春", direction: "正东", hours: "05–07" },
  { yinYang: "阳", season: "季春", direction: "东南偏东", hours: "07–09" },
  { yinYang: "阴", season: "初夏", direction: "东南偏南", hours: "09–11" },
  { yinYang: "阳", season: "夏", direction: "正南", hours: "11–13" },
  { yinYang: "阴", season: "季夏", direction: "西南偏南", hours: "13–15" },
  { yinYang: "阳", season: "初秋", direction: "西南偏西", hours: "15–17" },
  { yinYang: "阴", season: "秋", direction: "正西", hours: "17–19" },
  { yinYang: "阳", season: "季秋", direction: "西北偏西", hours: "19–21" },
  { yinYang: "阴", season: "初冬", direction: "西北偏北", hours: "21–23" },
];
const ZODIAC_ARCHETYPES = [
  "机敏、观察、积累与寻找机会",
  "稳健、耐力、秩序与持续投入",
  "主动、开拓、担当与行动力量",
  "温和、敏感、协调与重视安全感",
  "进取、格局、变化与带动能力",
  "深思、判断、克制与洞察细节",
  "行动、自由、表达与追求效率",
  "温和、审美、照顾与关系意识",
  "灵活、学习、应变与解决问题",
  "精细、秩序、表达与完成标准",
  "忠诚、边界、责任与保护意识",
  "豁达、包容、享受与资源共享",
];
const SOLAR_TERM_MINUTES = [
  0, 21208, 42467, 63836, 85337, 107014,
  128867, 150921, 173149, 195551, 218072, 240693,
  263343, 285989, 308563, 331033, 353350, 375494,
  397447, 419210, 440795, 462224, 483532, 504758,
];
const JIE_TERMS = [
  { termIndex: 2, branchIndex: 2, name: "立春" },
  { termIndex: 4, branchIndex: 3, name: "惊蛰" },
  { termIndex: 6, branchIndex: 4, name: "清明" },
  { termIndex: 8, branchIndex: 5, name: "立夏" },
  { termIndex: 10, branchIndex: 6, name: "芒种" },
  { termIndex: 12, branchIndex: 7, name: "小暑" },
  { termIndex: 14, branchIndex: 8, name: "立秋" },
  { termIndex: 16, branchIndex: 9, name: "白露" },
  { termIndex: 18, branchIndex: 10, name: "寒露" },
  { termIndex: 20, branchIndex: 11, name: "立冬" },
  { termIndex: 22, branchIndex: 0, name: "大雪" },
  { termIndex: 0, branchIndex: 1, name: "小寒" },
];
const HIDDEN_STEMS = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"],
};
const MONTH_FIRST_STEM = {
  甲: "丙",
  己: "丙",
  乙: "戊",
  庚: "戊",
  丙: "庚",
  辛: "庚",
  丁: "壬",
  壬: "壬",
  戊: "甲",
  癸: "甲",
};
const HARMONY_PARTNERS = {
  子: "丑", 丑: "子", 寅: "亥", 亥: "寅", 卯: "戌", 戌: "卯",
  辰: "酉", 酉: "辰", 巳: "申", 申: "巳", 午: "未", 未: "午",
};
const CLASH_PARTNERS = {
  子: "午", 午: "子", 丑: "未", 未: "丑", 寅: "申", 申: "寅",
  卯: "酉", 酉: "卯", 辰: "戌", 戌: "辰", 巳: "亥", 亥: "巳",
};
const HARM_PARTNERS = {
  子: "未", 未: "子", 丑: "午", 午: "丑", 寅: "巳", 巳: "寅",
  卯: "辰", 辰: "卯", 申: "亥", 亥: "申", 酉: "戌", 戌: "酉",
};
const BREAK_PARTNERS = {
  子: "酉", 酉: "子", 午: "卯", 卯: "午", 巳: "申", 申: "巳",
  寅: "亥", 亥: "寅", 辰: "丑", 丑: "辰", 戌: "未", 未: "戌",
};
const TRINE_GROUPS = [
  { branches: ["申", "子", "辰"], element: "水" },
  { branches: ["巳", "酉", "丑"], element: "金" },
  { branches: ["寅", "午", "戌"], element: "火" },
  { branches: ["亥", "卯", "未"], element: "木" },
];

const elements = {
  homeScreen: document.querySelector("#home-screen"),
  clockTicks: document.querySelector("#clock-ticks"),
  form: document.querySelector("#birthday-form"),
  birthName: document.querySelector("#birth-name"),
  calendarType: document.querySelector("#calendar-type"),
  birthGender: document.querySelector("#birth-gender"),
  birthPlace: document.querySelector("#birth-place"),
  birthday: document.querySelector("#birthday"),
  birthdayLabel: document.querySelector("#birthday-label"),
  calendarConversionNote: document.querySelector("#calendar-conversion-note"),
  birthHour: document.querySelector("#birth-hour"),
  error: document.querySelector("#date-error"),
  installButton: document.querySelector("#install-app-button"),
  themeToggle: document.querySelector("#theme-toggle"),
  insightThemeToggle: document.querySelector("#insight-theme-toggle"),
  insightScreen: document.querySelector("#insight-screen"),
  backButton: document.querySelector("#back-button"),
  machineTime: document.querySelector("#machine-time"),
  machineDate: document.querySelector("#machine-date"),
  weekday: document.querySelector("#weekday-label"),
  progressRing: document.querySelector("#day-progress-ring"),
  progressText: document.querySelector("#day-progress-text"),
  progressDot: document.querySelector("#progress-dot"),
  homeLifeDays: document.querySelector("#home-life-days"),
  totalDays: document.querySelector("#total-days"),
  totalHours: document.querySelector("#total-hours"),
  lifeDetail: document.querySelector("#life-detail"),
  arrivalDate: document.querySelector("#arrival-date"),
  nextBirthday: document.querySelector("#next-birthday"),
  personalProfileTitle: document.querySelector("#personal-profile-title"),
  personalProfileConfidence: document.querySelector("#personal-profile-confidence"),
  personalPillars: document.querySelector("#personal-pillars"),
  personalElementBars: document.querySelector("#personal-element-bars"),
  personalElementFocus: document.querySelector("#personal-element-focus"),
  personalElementDetail: document.querySelector("#personal-element-detail"),
  personalRelationTitle: document.querySelector("#personal-relation-title"),
  personalRelationDetail: document.querySelector("#personal-relation-detail"),
  personalPlainTitle: document.querySelector("#personal-plain-title"),
  personalPlainText: document.querySelector("#personal-plain-text"),
  nameElementTitle: document.querySelector("#name-element-title"),
  nameElementDetail: document.querySelector("#name-element-detail"),
  nameElementVerdict: document.querySelector("#name-element-verdict"),
  destinyProfileTitle: document.querySelector("#destiny-profile-title"),
  destinyProfileText: document.querySelector("#destiny-profile-text"),
  destinyProfileList: document.querySelector("#destiny-profile-list"),
  zodiacProfileName: document.querySelector("#zodiac-profile-name"),
  zodiacProfileSymbol: document.querySelector("#zodiac-profile-symbol"),
  zodiacProfileFacts: document.querySelector("#zodiac-profile-facts"),
  zodiacArchetype: document.querySelector("#zodiac-archetype"),
  zodiacElementCycle: document.querySelector("#zodiac-element-cycle"),
  zodiacElementCycleDetail: document.querySelector("#zodiac-element-cycle-detail"),
  zodiacHarmonyTitle: document.querySelector("#zodiac-harmony-title"),
  zodiacHarmonyDetail: document.querySelector("#zodiac-harmony-detail"),
  zodiacTensionTitle: document.querySelector("#zodiac-tension-title"),
  zodiacTensionDetail: document.querySelector("#zodiac-tension-detail"),
  zodiacPunishmentTitle: document.querySelector("#zodiac-punishment-title"),
  zodiacPunishmentDetail: document.querySelector("#zodiac-punishment-detail"),
  healthBasisTitle: document.querySelector("#health-basis-title"),
  healthBasisText: document.querySelector("#health-basis-text"),
  healthFoodTitle: document.querySelector("#health-food-title"),
  healthFoodDetail: document.querySelector("#health-food-detail"),
  healthAgeTitle: document.querySelector("#health-age-title"),
  healthAgeDetail: document.querySelector("#health-age-detail"),
  healthRiskList: document.querySelector("#health-risk-list"),
  healthActionList: document.querySelector("#health-action-list"),
  baziPlateTitle: document.querySelector("#bazi-plate-title"),
  baziPlateTag: document.querySelector("#bazi-plate-tag"),
  baziPillars: document.querySelector("#bazi-pillars"),
  baziPlateNote: document.querySelector("#bazi-plate-note"),
  baziDayMaster: document.querySelector("#bazi-day-master"),
  baziDayMasterDetail: document.querySelector("#bazi-day-master-detail"),
  baziTenGodTitle: document.querySelector("#bazi-ten-god-title"),
  baziTenGodDetail: document.querySelector("#bazi-ten-god-detail"),
  baziBalanceTitle: document.querySelector("#bazi-balance-title"),
  baziBalanceDetail: document.querySelector("#bazi-balance-detail"),
  baziPatternTitle: document.querySelector("#bazi-pattern-title"),
  baziPatternDetail: document.querySelector("#bazi-pattern-detail"),
  baziLuckTitle: document.querySelector("#bazi-luck-title"),
  baziLuckDetail: document.querySelector("#bazi-luck-detail"),
  baziLuckList: document.querySelector("#bazi-luck-list"),
  baziAdviceTitle: document.querySelector("#bazi-advice-title"),
  baziAdviceList: document.querySelector("#bazi-advice-list"),
  targetDate: document.querySelector("#target-date"),
  targetHour: document.querySelector("#target-hour"),
  cultureScore: document.querySelector("#culture-score"),
  scoreBar: document.querySelector("#score-bar"),
  commerceStrip: document.querySelector(".commerce-strip"),
  openCommerceButton: document.querySelector("#open-commerce-button"),
  openQrModalButton: document.querySelector("#open-qr-modal-button"),
  openAlipayQrModalButton: document.querySelector("#open-alipay-qr-modal-button"),
  openProFromLock: document.querySelector("#open-pro-from-lock"),
  exportReportButton: document.querySelector("#export-report-button"),
  commercePanel: document.querySelector("#commerce-panel"),
  closeCommercePanelButton: document.querySelector("#close-commerce-panel-button"),
  commerceTitle: document.querySelector("#commerce-title"),
  commerceStatusLabel: document.querySelector("#commerce-status-label"),
  commerceDetail: document.querySelector("#commerce-detail"),
  commerceMessage: document.querySelector("#commerce-message"),
  licensePhone: document.querySelector("#license-phone"),
  paymentExtraNote: document.querySelector("#payment-extra-note"),
  copyPaymentNoteButton: document.querySelector("#copy-payment-note-button"),
  paymentNotePreview: document.querySelector("#payment-note-preview"),
  unlockCode: document.querySelector("#unlock-code"),
  unlockButton: document.querySelector("#unlock-button"),
  wechatQrImage: document.querySelector("#wechat-qr-image"),
  wechatQrPlaceholder: document.querySelector("#wechat-qr-placeholder"),
  alipayQrImage: document.querySelector("#alipay-qr-image"),
  alipayQrPlaceholder: document.querySelector("#alipay-qr-placeholder"),
  proLockOverlay: document.querySelector("#pro-lock-overlay"),
  qrModal: document.querySelector("#qr-modal"),
  closeQrModal: document.querySelector("#close-qr-modal"),
  confirmScanButton: document.querySelector("#confirm-scan-button"),
  qrModalLabel: document.querySelector("#qr-modal-label"),
  qrModalTitle: document.querySelector("#qr-modal-title"),
  qrModalImage: document.querySelector("#qr-modal-image"),
  qrModalHelp: document.querySelector("#qr-modal-help"),
  downloadQrButton: document.querySelector("#download-qr-button"),
  openQrImageLink: document.querySelector("#open-qr-image-link"),
  openPaymentAppButton: document.querySelector("#open-payment-app-button"),
  dayTone: document.querySelector("#day-tone"),
  dayGuidance: document.querySelector("#day-guidance"),
  fortuneGood: document.querySelector("#fortune-good"),
  fortuneRisk: document.querySelector("#fortune-risk"),
  fortuneAvoid: document.querySelector("#fortune-avoid"),
  fortuneBlessing: document.querySelector("#fortune-blessing"),
  lunarDate: document.querySelector("#lunar-date"),
  ganzhiDate: document.querySelector("#ganzhi-date"),
  sixRenName: document.querySelector("#six-ren-name"),
  sixRenText: document.querySelector("#six-ren-text"),
  sixRenCompleteTitle: document.querySelector("#six-ren-complete-title"),
  sixRenCompleteDetail: document.querySelector("#six-ren-complete-detail"),
  sixRenWealth: document.querySelector("#six-ren-wealth"),
  sixRenLost: document.querySelector("#six-ren-lost"),
  sixRenTravel: document.querySelector("#six-ren-travel"),
  sixRenPeople: document.querySelector("#six-ren-people"),
  sixRenHealth: document.querySelector("#six-ren-health"),
  sixRenTiming: document.querySelector("#six-ren-timing"),
  sixRenActions: document.querySelector("#six-ren-actions"),
  zodiacRelation: document.querySelector("#zodiac-relation"),
  zodiacText: document.querySelector("#zodiac-text"),
  rhythmTitle: document.querySelector("#rhythm-title"),
  rhythmText: document.querySelector("#rhythm-text"),
  dayPillar: document.querySelector("#day-pillar"),
  dayElement: document.querySelector("#day-element"),
  elementTheme: document.querySelector("#element-theme"),
  elementDescription: document.querySelector("#element-description"),
  favorableActions: document.querySelector("#favorable-actions"),
  cautionActions: document.querySelector("#caution-actions"),
  hourTimeline: document.querySelector("#hour-timeline"),
  hexagramName: document.querySelector("#hexagram-name"),
  hexagramDetail: document.querySelector("#hexagram-detail"),
  hexagramVisual: document.querySelector("#hexagram-visual"),
  upperTrigram: document.querySelector("#upper-trigram"),
  upperTrigramDetail: document.querySelector("#upper-trigram-detail"),
  lowerTrigram: document.querySelector("#lower-trigram"),
  lowerTrigramDetail: document.querySelector("#lower-trigram-detail"),
  changingLine: document.querySelector("#changing-line"),
  changedHexagram: document.querySelector("#changed-hexagram"),
  compassNeedle: document.querySelector("#compass-needle"),
  directionName: document.querySelector("#direction-name"),
  directionText: document.querySelector("#direction-text"),
  supportDirection: document.querySelector("#support-direction"),
  supportDirectionText: document.querySelector("#support-direction-text"),
  observeDirection: document.querySelector("#observe-direction"),
  observeDirectionText: document.querySelector("#observe-direction-text"),
  meihuaNumber: document.querySelector("#meihua-number"),
  meihuaTopic: document.querySelector("#meihua-topic"),
  meihuaTopicBrief: document.querySelector("#meihua-topic-brief"),
  meihuaQuestion: document.querySelector("#meihua-question"),
  meihuaDateSeed: document.querySelector("#meihua-date-seed"),
  meihuaCalculate: document.querySelector("#meihua-calculate"),
  meihuaError: document.querySelector("#meihua-error"),
  professionalMainName: document.querySelector("#professional-main-name"),
  professionalMainDetail: document.querySelector("#professional-main-detail"),
  professionalInnerName: document.querySelector("#professional-inner-name"),
  professionalInnerDetail: document.querySelector("#professional-inner-detail"),
  professionalChangedName: document.querySelector("#professional-changed-name"),
  professionalChangedDetail: document.querySelector("#professional-changed-detail"),
  professionalHexagram: document.querySelector("#professional-hexagram"),
  professionalRelation: document.querySelector("#professional-relation"),
  professionalBodyUse: document.querySelector("#professional-body-use"),
  professionalGrade: document.querySelector("#professional-grade"),
  professionalScore: document.querySelector("#professional-score"),
  professionalTitle: document.querySelector("#professional-title"),
  professionalJudgment: document.querySelector("#professional-judgment"),
  professionalPersonalTitle: document.querySelector("#professional-personal-title"),
  professionalPersonalText: document.querySelector("#professional-personal-text"),
  professionalPersonalPoints: document.querySelector("#professional-personal-points"),
  professionalAdvice: document.querySelector("#professional-advice"),
  meihuaCompleteTitle: document.querySelector("#meihua-complete-title"),
  meihuaCompleteList: document.querySelector("#meihua-complete-list"),
  professionalPlainTitle: document.querySelector("#professional-plain-title"),
  professionalPlainText: document.querySelector("#professional-plain-text"),
  professionalPlainActions: document.querySelector("#professional-plain-actions"),
};

let pendingInstallPrompt = null;
let currentBirthday = null;
let currentBirthCalendarInfo = null;
let lastValidatedBirthCalendarInfo = null;
let currentBirthHourIndex = null;
let professionalSeedIsCustom = false;
let lastBaseCultureScore = null;
let lastUnifiedReferenceScore = null;
let lastMeihuaResult = null;
let proUnlocked = false;
let currentPaymentMethod = "wechat";
let screensaverTimer = null;
let suppressNextClick = false;
const SCREENSAVER_DELAY = 60 * 1000;

function padNumber(value) {
  const text = String(value);
  return text.length >= 2 ? text : `0${text}`;
}

function listHas(list, value) {
  return list.indexOf(value) !== -1;
}

function hashText(text) {
  let hash = 2166136261;
  const source = String(text || "");
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function isValidMainlandPhone(value) {
  return /^1[3-9]\d{9}$/.test(normalizePhone(value));
}

function normalizeSmsCode(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 6);
}

function getAuthCodeForPhone(phone) {
  const normalized = normalizePhone(phone);
  if (!isValidMainlandPhone(normalized)) {
    return "";
  }
  const hash = hashText(`${normalized}|${PRO_ACCESS.authSalt}|SMS`);
  return String(100000 + (hash % 900000));
}

function getLicensePhone() {
  return normalizePhone(elements.licensePhone ? elements.licensePhone.value : "");
}

function isValidUnlockCode(code) {
  const phone = getLicensePhone();
  return isValidMainlandPhone(phone) &&
    normalizeSmsCode(code) === getAuthCodeForPhone(phone);
}

function fallbackCopyText(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "readonly");
  field.style.position = "fixed";
  field.style.top = "-1000px";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (error) {
    ok = false;
  }
  field.remove();
  return ok;
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => fallbackCopyText(text),
    );
  }
  return Promise.resolve(fallbackCopyText(text));
}

function setCommerceMessage(message) {
  if (elements.commerceMessage) {
    elements.commerceMessage.textContent = message;
  }
}

function pulseButton(button, text = "已复制") {
  if (!button) {
    return;
  }
  if (navigator.vibrate) {
    navigator.vibrate(35);
  }
  const originalText = button.textContent;
  button.textContent = text;
  button.classList.add("is-copied");
  window.setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove("is-copied");
  }, 1100);
}

function getPaymentMethodInfo(method = currentPaymentMethod) {
  return PAYMENT_METHODS[method] || PAYMENT_METHODS.wechat;
}

function getPaymentNoteText() {
  const phone = getLicensePhone();
  return phone ? `手机号${phone}` : "";
}

function updatePaymentPhoneView() {
  if (elements.licensePhone) {
    const phone = normalizePhone(elements.licensePhone.value);
    if (elements.licensePhone.value !== phone) {
      elements.licensePhone.value = phone;
    }
    storage.setItem("time-machine-license-phone", phone);
  }
  if (elements.paymentNotePreview) {
    const phone = getLicensePhone();
    elements.paymentNotePreview.textContent = phone
      ? `付款留言：手机号${phone}`
      : "付款留言：手机号未填写";
  }
}

function copyPaymentNote() {
  updatePaymentPhoneView();
  const phone = getLicensePhone();
  if (!isValidMainlandPhone(phone)) {
    setCommerceMessage("请先填写正确的 11 位手机号，再复制付款留言。");
    if (elements.qrModalHelp) {
      elements.qrModalHelp.textContent = "请先填写正确手机号；付款留言必须写手机号，我才能短信发验证码。";
    }
    return;
  }
  const note = getPaymentNoteText();
  copyText(note).then((copied) => {
    const message = copied
      ? `付款留言已复制：${note}。扫码付款时请粘贴到付款留言。`
      : `请手动填写付款留言：${note}`;
    if (copied) {
      pulseButton(elements.copyPaymentNoteButton);
      pulseButton(elements.confirmScanButton);
    }
    setCommerceMessage(message);
    if (elements.qrModalHelp) {
      elements.qrModalHelp.textContent = message;
    }
  });
}

function createElementCounts() {
  const counts = {};
  ELEMENT_ORDER.forEach((element) => {
    counts[element] = 0;
  });
  return counts;
}

function positiveModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function toInputDate(date) {
  return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
}

function parseDateInput(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatSolarDateShort(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function getSelectedCalendarType() {
  return elements.calendarType.value || "solar";
}

function isLunarCalendarType(type) {
  return type === "lunar" || type === "lunarLeap";
}

function buildCalendarInfoFromInput(value, type = getSelectedCalendarType()) {
  const inputDate = parseDateInput(value);
  if (!inputDate) return null;

  if (isLunarCalendarType(type)) {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();
    const isLeapMonth = type === "lunarLeap";
    const solarDate = lunarToSolarDate(year, month, day, isLeapMonth);
    if (!solarDate) return null;
    const lunar = getLunarData(solarDate);
    const inputMonthText = getLunarMonthName(month, isLeapMonth);
    return {
      type,
      inputValue: value,
      solarDate,
      lunar,
      label:
        `阴历 ${year}年${inputMonthText}${formatLunarDay(day)} = ` +
        `阳历 ${formatSolarDateShort(solarDate)}`,
    };
  }

  const solarDate = inputDate;
  const lunar = getLunarData(solarDate);
  return {
    type: "solar",
    inputValue: value,
    solarDate,
    lunar,
    label:
      `阳历 ${formatSolarDateShort(solarDate)} = ` +
      `阴历 ${lunar.relatedYear}年${lunar.monthText}${lunar.dayText}`,
  };
}

function updateCalendarInputCopy() {
  const type = getSelectedCalendarType();
  elements.birthdayLabel.textContent = isLunarCalendarType(type)
    ? "阴历生日"
    : "阳历生日";
  syncFilledFieldLabels();

  if (!elements.birthday.value) {
    elements.calendarConversionNote.textContent =
      isLunarCalendarType(type)
        ? "按阴历年月日输入，例如阴历1975年五月廿八请输入 1975-05-28。"
        : "按阳历年月日输入，例如阳历1975年7月7日请输入 1975-07-07。";
    return;
  }

  const info = buildCalendarInfoFromInput(elements.birthday.value, type);
  elements.calendarConversionNote.textContent = info
    ? info.label
    : "这个日期换算不出来，请检查年份、月份、日期，闰月请选“阴历闰月”。";
}

function setFilledFieldState(control, filled) {
  if (!control) return;
  const field = control.closest("label");
  if (field) {
    field.classList.toggle("is-filled", Boolean(filled));
  }
}

function syncFilledFieldLabels() {
  setFilledFieldState(elements.birthName, elements.birthName.value.trim());
  setFilledFieldState(elements.calendarType, elements.calendarType.value);
  setFilledFieldState(elements.birthGender, elements.birthGender.value);
  setFilledFieldState(elements.birthPlace, elements.birthPlace.value.trim());
  setFilledFieldState(elements.birthday, elements.birthday.value);
  setFilledFieldState(elements.birthHour, elements.birthHour.value !== "");
}

function getCalendarDayDifference(startDate, endDate) {
  const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endUtc = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  return Math.floor((endUtc - startUtc) / DAY_IN_MS);
}

function createClampedDate(year, month, day) {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(day, lastDay));
}

function addYearsClamped(date, years) {
  return createClampedDate(date.getFullYear() + years, date.getMonth(), date.getDate());
}

function addMonthsClamped(date, months) {
  const targetMonth = date.getMonth() + months;
  const targetYear = date.getFullYear() + Math.floor(targetMonth / 12);
  return createClampedDate(
    targetYear,
    positiveModulo(targetMonth, 12),
    date.getDate(),
  );
}

function getAgeBreakdown(birthday, today) {
  let years = today.getFullYear() - birthday.getFullYear();
  let cursor = addYearsClamped(birthday, years);

  if (cursor > today) {
    years -= 1;
    cursor = addYearsClamped(birthday, years);
  }

  let months = 0;
  let nextMonth = addMonthsClamped(cursor, 1);

  while (months < 11 && nextMonth <= today) {
    cursor = nextMonth;
    months += 1;
    nextMonth = addMonthsClamped(cursor, 1);
  }

  return {
    years,
    months,
    days: getCalendarDayDifference(cursor, today),
  };
}

function createBirthdayInYear(birthday, year) {
  if (birthday.getMonth() === 1 && birthday.getDate() === 29) {
    const leapYear = new Date(year, 1, 29).getMonth() === 1;
    return new Date(year, 1, leapYear ? 29 : 28);
  }

  return new Date(year, birthday.getMonth(), birthday.getDate());
}

function getNextBirthday(birthday, today) {
  let next = createBirthdayInYear(birthday, today.getFullYear());
  if (next < today) {
    next = createBirthdayInYear(birthday, today.getFullYear() + 1);
  }
  return getCalendarDayDifference(today, next);
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

function formatChineseDate(date, includeWeekday = true) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (includeWeekday) {
    options.weekday = "long";
  }
  return new Intl.DateTimeFormat("zh-CN", options).format(date);
}

function setNumber(element, target) {
  element.textContent = formatNumber(target);
}

function updateClock() {
  const now = new Date();
  const secondsToday =
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds() +
    now.getMilliseconds() / 1000;
  const progress = (secondsToday / 86400) * 100;
  const rotation = progress * 3.6;

  elements.machineTime.textContent =
    `${padNumber(now.getHours())}:${padNumber(now.getMinutes())}:${padNumber(now.getSeconds())}`;
  elements.machineDate.textContent =
    `${now.getFullYear()}年${padNumber(now.getMonth() + 1)}月${padNumber(now.getDate())}日`;
  elements.weekday.textContent = new Intl.DateTimeFormat("zh-CN", {
    weekday: "long",
  }).format(now);
  elements.progressText.textContent = `${progress.toFixed(2)}%`;
  elements.progressRing.style.strokeDasharray =
    `${progress} ${Math.max(0, 100 - progress)}`;
  elements.progressDot.style.transform =
    `rotate(${rotation}deg) translateY(calc(var(--ring-radius) * -0.45))`;
}

function renderClockTicks() {
  const svgNamespace = "http://www.w3.org/2000/svg";
  elements.clockTicks.replaceChildren(
    ...Array.from({ length: 60 }, (_, index) => {
      const tick = document.createElementNS(svgNamespace, "line");
      const major = index % 5 === 0;
      tick.setAttribute("x1", "180");
      tick.setAttribute("y1", major ? "14" : "18");
      tick.setAttribute("x2", "180");
      tick.setAttribute("y2", major ? "24" : "23");
      tick.setAttribute("transform", `rotate(${index * 6} 180 180)`);
      if (major) tick.classList.add("is-major");
      return tick;
    }),
  );
}

function enterScreensaver() {
  if (!elements.insightScreen.hidden || document.visibilityState === "hidden") {
    return;
  }
  elements.homeScreen.classList.add("is-screensaver");
}

function resetScreensaverTimer() {
  elements.homeScreen.classList.remove("is-screensaver");
  window.clearTimeout(screensaverTimer);
  if (elements.insightScreen.hidden) {
    screensaverTimer = window.setTimeout(enterScreensaver, SCREENSAVER_DELAY);
  }
}

function pauseScreensaverTimer() {
  window.clearTimeout(screensaverTimer);
  elements.homeScreen.classList.remove("is-screensaver");
}

function handlePointerActivity(event) {
  const wasScreensaver =
    elements.homeScreen.classList.contains("is-screensaver");
  resetScreensaverTimer();
  if (wasScreensaver) {
    suppressNextClick = true;
    event.preventDefault();
    event.stopPropagation();
  }
}

function handleWakeClick(event) {
  if (!suppressNextClick) return;
  suppressNextClick = false;
  event.preventDefault();
  event.stopImmediatePropagation();
}

function applyTheme(theme) {
  const normalizedTheme = "light";
  document.body.classList.add("theme-light");
  const nextLabel = "米色";
  [elements.themeToggle, elements.insightThemeToggle].forEach((button) => {
    if (!button) return;
    const label = button.querySelector(".theme-button-text");
    if (label) {
      label.textContent = nextLabel;
    } else {
      button.textContent = nextLabel;
    }
    button.setAttribute(
      "aria-label",
      "米色模式已固定",
    );
  });
  storage.setItem("time-machine-theme", normalizedTheme);
}

function toggleTheme() {
  applyTheme("light");
}

function updateProAccessState(unlocked) {
  proUnlocked = Boolean(unlocked);
  storage.setItem("time-machine-pro-unlocked", proUnlocked ? "1" : "0");
  if (elements.insightScreen) {
    elements.insightScreen.classList.toggle("is-pro-locked", !proUnlocked);
  }
  if (elements.proLockOverlay) {
    elements.proLockOverlay.hidden = proUnlocked;
  }
  if (elements.commerceStrip) {
    elements.commerceStrip.classList.toggle("is-hidden", proUnlocked);
    elements.commerceStrip.hidden = proUnlocked;
  }
  if (elements.commercePanel) {
    elements.commercePanel.classList.toggle("is-hidden", proUnlocked);
    if (proUnlocked) {
      elements.commercePanel.hidden = true;
      document.body.classList.remove("is-commerce-open");
    }
  }
  if (elements.commerceTitle) {
    elements.commerceTitle.textContent = proUnlocked
      ? "人生路标已开通"
      : PRO_ACCESS.productName;
  }
  if (elements.commerceStatusLabel) {
    elements.commerceStatusLabel.textContent = proUnlocked
      ? "已开通，可查看"
      : "开通人生路标";
  }
  if (elements.commerceDetail) {
    elements.commerceDetail.textContent = proUnlocked
      ? "已解锁完整内容，可以查看并导出人生路标报告。"
      : PRO_ACCESS.supportText;
  }
  if (elements.exportReportButton) {
    elements.exportReportButton.textContent = proUnlocked
      ? "导出人生路标报告"
      : "解锁后查看";
  }
  updatePaymentPhoneView();
}

function activateProAccess(message = "人生路标已开通。") {
  updateProAccessState(true);
  closeQrModal();
  if (elements.commerceMessage) {
    elements.commerceMessage.textContent = message;
  }
}

function toggleCommercePanel(forceOpen = null) {
  if (!elements.commercePanel || proUnlocked) return;
  const shouldOpen =
    forceOpen === null ? elements.commercePanel.hidden : Boolean(forceOpen);
  elements.commercePanel.hidden = !shouldOpen;
  document.body.classList.toggle("is-commerce-open", shouldOpen);
  if (shouldOpen) {
    requestAnimationFrame(() => {
      elements.commercePanel.scrollTop = 0;
      elements.commercePanel.focus({ preventScroll: true });
    });
  }
}

function applyQrModalPaymentMethod(method = "wechat") {
  currentPaymentMethod = method in PAYMENT_METHODS ? method : "wechat";
  const payment = getPaymentMethodInfo();
  if (elements.qrModalLabel) {
    elements.qrModalLabel.textContent = payment.label;
  }
  if (elements.qrModalTitle) {
    elements.qrModalTitle.textContent = `${payment.title} · ${PRO_ACCESS.priceText}`;
  }
  if (elements.qrModalImage) {
    elements.qrModalImage.src = payment.image;
    elements.qrModalImage.alt = `${payment.label}大图`;
  }
  if (elements.openQrImageLink) {
    elements.openQrImageLink.href = payment.image;
    elements.openQrImageLink.download = payment.fileName;
  }
  if (elements.openPaymentAppButton) {
    elements.openPaymentAppButton.textContent = payment.appButton;
  }
}

function openQrModal(method = "wechat") {
  if (!elements.qrModal) return;
  applyQrModalPaymentMethod(method);
  elements.qrModal.hidden = false;
  if (elements.qrModalHelp) {
    const payment = getPaymentMethodInfo();
    elements.qrModalHelp.textContent =
      `请先填写手机号，再保存二维码并用${payment.name}付款；付款留言必须写手机号。`;
  }
  if (elements.confirmScanButton) {
    elements.confirmScanButton.focus({ preventScroll: true });
  }
}

function closeQrModal() {
  if (!elements.qrModal) return;
  elements.qrModal.hidden = true;
}

function openProCheckout() {
  if (proUnlocked) return;
  toggleCommercePanel(true);
  if (elements.openCommerceButton) {
    elements.openCommerceButton.scrollIntoView({ block: "center", behavior: "smooth" });
  }
}

function openQrImageSource() {
  const payment = getPaymentMethodInfo();
  closeQrModal();
  if (payment.key === "wechat" && window.TimeMachineNative && window.TimeMachineNative.openQrImage) {
    window.TimeMachineNative.openQrImage();
    return;
  }
  if (payment.key === "alipay" && window.TimeMachineNative && window.TimeMachineNative.openAlipayQrImage) {
    window.TimeMachineNative.openAlipayQrImage();
    return;
  }
  window.location.href = payment.image;
}

function saveQrImage() {
  const payment = getPaymentMethodInfo();
  if (payment.key === "wechat" && window.TimeMachineNative && window.TimeMachineNative.saveQrCode) {
    window.TimeMachineNative.saveQrCode();
    if (elements.qrModalHelp) {
      elements.qrModalHelp.textContent =
        "正在保存二维码；如果系统提示权限，请允许保存到相册。";
    }
    return;
  }
  if (payment.key === "alipay" && window.TimeMachineNative && window.TimeMachineNative.saveAlipayQrCode) {
    window.TimeMachineNative.saveAlipayQrCode();
    if (elements.qrModalHelp) {
      elements.qrModalHelp.textContent =
        "正在保存支付宝二维码；如果系统提示权限，请允许保存到相册。";
    }
    return;
  }

  const link = document.createElement("a");
  link.href = payment.image;
  link.download = payment.fileName;
  link.target = "_blank";
  document.body.append(link);
  link.click();
  link.remove();
  if (elements.qrModalHelp) {
    elements.qrModalHelp.textContent =
      "如果浏览器没有弹出保存，请点“打开/保存原图”，再长按图片保存到相册。";
  }
}

function openPaymentApp() {
  const payment = getPaymentMethodInfo();
  if (elements.qrModalHelp) {
    elements.qrModalHelp.textContent =
      `正在保存二维码并打开${payment.name}；进入扫一扫后请从相册选择二维码。`;
  }
  if (payment.key === "wechat" && window.TimeMachineNative && window.TimeMachineNative.openWechatScanner) {
    window.TimeMachineNative.openWechatScanner();
    return;
  }
  if (payment.key === "alipay" && window.TimeMachineNative && window.TimeMachineNative.openAlipayScanner) {
    window.TimeMachineNative.openAlipayScanner();
    return;
  }
  const frame = document.createElement("iframe");
  frame.style.display = "none";
  frame.src = payment.key === "alipay"
    ? "alipays://platformapi/startapp?saId=10000007"
    : "weixin://scanqrcode";
  document.body.append(frame);
  window.setTimeout(() => {
    frame.remove();
  }, 1200);
}

function initializeCommercePanel() {
  updateProAccessState(storage.getItem("time-machine-pro-unlocked") === "1");
  if (elements.licensePhone) {
    elements.licensePhone.value = storage.getItem("time-machine-license-phone") || "";
  }
  if (elements.paymentExtraNote) {
    elements.paymentExtraNote.value = storage.getItem("time-machine-payment-note") || "";
  }
  updatePaymentPhoneView();
  if (elements.wechatQrImage && PRO_ACCESS.wechatQrImage) {
    elements.wechatQrImage.addEventListener("load", () => {
      elements.wechatQrImage.hidden = false;
      if (elements.wechatQrPlaceholder) {
        elements.wechatQrPlaceholder.hidden = true;
      }
    });
    elements.wechatQrImage.addEventListener("error", () => {
      elements.wechatQrImage.hidden = true;
      if (elements.wechatQrPlaceholder) {
        elements.wechatQrPlaceholder.hidden = false;
        elements.wechatQrPlaceholder.textContent =
          "将微信收款码保存为 payment/wechat-qr.jpg";
      }
    });
    elements.wechatQrImage.src = PRO_ACCESS.wechatQrImage;
  }
  if (elements.alipayQrImage && PRO_ACCESS.alipayQrImage) {
    elements.alipayQrImage.addEventListener("load", () => {
      elements.alipayQrImage.hidden = false;
      if (elements.alipayQrPlaceholder) {
        elements.alipayQrPlaceholder.hidden = true;
      }
    });
    elements.alipayQrImage.addEventListener("error", () => {
      elements.alipayQrImage.hidden = true;
      if (elements.alipayQrPlaceholder) {
        elements.alipayQrPlaceholder.hidden = false;
        elements.alipayQrPlaceholder.textContent =
          "将支付宝收款码保存为 payment/alipay-qr.png";
      }
    });
    elements.alipayQrImage.src = PRO_ACCESS.alipayQrImage;
  }
  applyQrModalPaymentMethod(currentPaymentMethod);
}

function verifyUnlockCode() {
  const code = elements.unlockCode.value.trim();
  updatePaymentPhoneView();
  const phone = getLicensePhone();
  if (!isValidMainlandPhone(phone)) {
    setCommerceMessage("请先填写付款留言中的 11 位手机号，再输入短信验证码。");
    return;
  }
  if (!code) {
    setCommerceMessage("请先输入短信验证码。");
    return;
  }
  if (isValidUnlockCode(code)) {
    activateProAccess("授权成功，人生路标已开通。");
    return;
  }
  setCommerceMessage(`验证码未通过。请确认手机号 ${phone} 与付款留言手机号一致。`);
}

function readText(selector) {
  const node = document.querySelector(selector);
  return node ? node.textContent.trim().replace(/\s+/g, " ") || "--" : "--";
}

function buildFullReport() {
  const reportDate = new Date();
  const sections = [
    "人生路标完整报告",
    `生成时间：${formatChineseDate(reportDate)} ${padNumber(reportDate.getHours())}:${padNumber(reportDate.getMinutes())}`,
    `生日：${(currentBirthCalendarInfo && currentBirthCalendarInfo.label) || elements.birthday.value || "--"} · 时辰：${elements.birthHour.options[elements.birthHour.selectedIndex] ? elements.birthHour.options[elements.birthHour.selectedIndex].textContent : "--"}`,
    `姓名：${elements.birthName.value.trim() || "未填写"}`,
    "",
    "一、人生大事（小六壬）",
    `已来到这个世界：${readText("#total-days")} 天`,
    `生命明细：${readText("#life-detail")}`,
    `下一次生日：${readText("#next-birthday")}`,
    "",
    "二、人生大事（小六壬）：姓名、五行与属象",
    readText("#personal-profile-title"),
    readText("#name-element-title"),
    readText("#name-element-detail"),
    readText("#name-element-verdict"),
    readText("#destiny-profile-title"),
    readText("#destiny-profile-text"),
    readText("#destiny-profile-list"),
    readText("#personal-element-detail"),
    readText("#personal-relation-detail"),
    readText("#zodiac-profile-name"),
    readText("#zodiac-archetype"),
    readText("#zodiac-harmony-detail"),
    readText("#zodiac-tension-detail"),
    "",
    "三、人生坐标：出生坐标",
    readText("#bazi-plate-title"),
    readText("#bazi-plate-note"),
    readText("#bazi-day-master-detail"),
    readText("#bazi-ten-god-detail"),
    readText("#bazi-balance-detail"),
    readText("#bazi-pattern-detail"),
    readText("#bazi-luck-detail"),
    readText("#bazi-advice-list"),
    "",
    "四、当下幸运值与方位",
    `当下幸运值参考：${readText("#culture-score")} · ${readText("#day-tone")}`,
    readText("#day-guidance"),
    `宜：${readText("#fortune-good")}`,
    `忌：${readText("#fortune-risk")} / ${readText("#fortune-avoid")}`,
    `方位：${readText("#direction-name")} · ${readText("#direction-text")}`,
    readText("#support-direction-text"),
    readText("#observe-direction-text"),
    "",
    "五、人生路标（梅花易数）",
    readText("#professional-title"),
    `本卦：${readText("#professional-main-name")}；互卦：${readText("#professional-inner-name")}；变卦：${readText("#professional-changed-name")}`,
    `体用：${readText("#professional-relation")} · ${readText("#professional-body-use")}`,
    `当下幸运值：${readText("#professional-grade")} · ${readText("#professional-score")}`,
    readText("#professional-judgment"),
    readText("#professional-personal-title"),
    readText("#professional-personal-text"),
    readText("#professional-personal-points"),
    readText("#professional-plain-title"),
    readText("#professional-plain-text"),
    readText("#professional-plain-actions"),
  ];
  return sections.join("\n");
}

function exportFullReport() {
  if (!currentBirthday) {
    elements.commerceMessage.textContent = "请先输入生日并开始。";
    toggleCommercePanel(true);
    return;
  }
  if (!proUnlocked) {
    elements.commerceMessage.textContent = "请先扫码付费并输入短信验证码。";
    toggleCommercePanel(true);
    return;
  }
  const report = buildFullReport();
  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `人生路标报告-${elements.targetDate.value || toInputDate(getToday())}.txt`;
  document.body.append(link);
  link.click();
  URL.revokeObjectURL(link.href);
  link.remove();
  elements.commerceMessage.textContent = "人生路标报告已生成。";
  toggleCommercePanel(true);
}

function getGanzhiDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const century = Math.floor(year / 100);
  const yearInCentury = year % 100;
  const value =
    44 * century +
    Math.floor(century / 4) +
    5 * yearInCentury +
    Math.floor(yearInCentury / 4) +
    30 * (month + 1) +
    Math.floor((3 * (month + 1)) / 5) +
    day +
    7;
  const cycleIndex = positiveModulo(value - 1, 60);
  const stemIndex = cycleIndex % 10;
  const branchIndex = cycleIndex % 12;

  return {
    cycleIndex,
    stemIndex,
    branchIndex,
    stem: STEMS[stemIndex],
    branch: BRANCHES[branchIndex],
    name: `${STEMS[stemIndex]}${BRANCHES[branchIndex]}`,
    element: ELEMENTS_BY_STEM[stemIndex],
  };
}

function getLunarInfo(year) {
  return LUNAR_INFO[year - LUNAR_START_YEAR] || 0;
}

function getLunarLeapMonth(year) {
  return getLunarInfo(year) & 0xf;
}

function getLunarLeapDays(year) {
  const leapMonth = getLunarLeapMonth(year);
  if (!leapMonth) return 0;
  return getLunarInfo(year) & 0x10000 ? 30 : 29;
}

function getLunarMonthDays(year, month) {
  return getLunarInfo(year) & (0x10000 >> month) ? 30 : 29;
}

function getLunarYearDays(year) {
  let days = 348;
  for (let mask = 0x8000; mask > 0x8; mask >>= 1) {
    if (getLunarInfo(year) & mask) days += 1;
  }
  return days + getLunarLeapDays(year);
}

function getLunarMonthName(month, isLeap = false) {
  const names = [
    "", "正", "二", "三", "四", "五", "六",
    "七", "八", "九", "十", "冬", "腊",
  ];
  return `${isLeap ? "闰" : ""}${names[month] || month}月`;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getFallbackLunarData(date) {
  const relatedYear = date.getFullYear();
  return {
    yearName: getGanzhiYear(relatedYear),
    relatedYear,
    monthText: `${date.getMonth() + 1}月`,
    dayText: `${date.getDate()}日`,
    month: date.getMonth() + 1,
    day: date.getDate(),
    isLeapMonth: false,
    branchIndex: positiveModulo(relatedYear - 4, 12),
  };
}

function getLunarData(date) {
  let offset = getCalendarDayDifference(LUNAR_BASE_DATE, date);
  if (
    offset < 0 ||
    date.getFullYear() < LUNAR_START_YEAR ||
    date.getFullYear() > LUNAR_END_YEAR
  ) {
    return getFallbackLunarData(date);
  }

  let year = LUNAR_START_YEAR;
  while (year <= LUNAR_END_YEAR) {
    const daysOfYear = getLunarYearDays(year);
    if (offset < daysOfYear) break;
    offset -= daysOfYear;
    year += 1;
  }

  const leapMonth = getLunarLeapMonth(year);
  for (let month = 1; month <= 12; month += 1) {
    const normalDays = getLunarMonthDays(year, month);
    if (offset < normalDays) {
      const day = offset + 1;
      return {
        yearName: getGanzhiYear(year),
        relatedYear: year,
        monthText: getLunarMonthName(month),
        dayText: formatLunarDay(day),
        month,
        day,
        isLeapMonth: false,
        branchIndex: positiveModulo(year - 4, 12),
      };
    }
    offset -= normalDays;

    if (leapMonth === month) {
      const leapDays = getLunarLeapDays(year);
      if (offset < leapDays) {
        const day = offset + 1;
        return {
          yearName: getGanzhiYear(year),
          relatedYear: year,
          monthText: getLunarMonthName(month, true),
          dayText: formatLunarDay(day),
          month,
          day,
          isLeapMonth: true,
          branchIndex: positiveModulo(year - 4, 12),
        };
      }
      offset -= leapDays;
    }
  }

  return getFallbackLunarData(date);
}

function lunarToSolarDate(year, month, day, isLeapMonth = false) {
  if (
    year < LUNAR_START_YEAR ||
    year > LUNAR_END_YEAR ||
    month < 1 ||
    month > 12
  ) {
    return null;
  }

  const leapMonth = getLunarLeapMonth(year);
  if (isLeapMonth && leapMonth !== month) {
    return null;
  }

  let offset = 0;
  for (let currentYear = LUNAR_START_YEAR; currentYear < year; currentYear += 1) {
    offset += getLunarYearDays(currentYear);
  }

  for (let currentMonth = 1; currentMonth < month; currentMonth += 1) {
    offset += getLunarMonthDays(year, currentMonth);
    if (leapMonth === currentMonth) {
      offset += getLunarLeapDays(year);
    }
  }

  const monthDays = isLeapMonth
    ? getLunarLeapDays(year)
    : getLunarMonthDays(year, month);
  if (day < 1 || day > monthDays) {
    return null;
  }

  if (isLeapMonth) {
    offset += getLunarMonthDays(year, month);
  }

  return addDays(LUNAR_BASE_DATE, offset + day - 1);
}

function formatLunarDay(day) {
  const names = [
    "",
    "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
  ];
  return names[day] || `${day}日`;
}

function getGanzhiYear(year) {
  const index = positiveModulo(year - 4, 60);
  return `${STEMS[index % 10]}${BRANCHES[index % 12]}`;
}

function getHourBranchIndex(date, selectedValue) {
  if (selectedValue !== undefined && selectedValue !== null) {
    return Number(selectedValue);
  }
  return Math.floor(positiveModulo(date.getHours() + 1, 24) / 2);
}

function getDateParts(date) {
  return {
    year: date.getFullYear(),
    monthIndex: date.getMonth(),
    day: date.getDate(),
  };
}

function createChinaStandardInstant(
  year,
  monthIndex,
  day,
  hour = 12,
  minute = 0,
  second = 0,
) {
  return new Date(
    Date.UTC(
      year,
      monthIndex,
      day,
      hour - CHINA_STANDARD_UTC_OFFSET_HOURS,
      minute,
      second,
      0,
    ),
  );
}

function getBirthHourCenterHour(birthHourIndex) {
  if (!Number.isInteger(birthHourIndex)) return 12;
  return birthHourIndex === 0 ? 0 : birthHourIndex * 2;
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function formatChinaStandardDateTime(date) {
  const shifted = new Date(
    date.getTime() + CHINA_STANDARD_UTC_OFFSET_HOURS * 60 * 60 * 1000,
  );
  return `${shifted.getUTCFullYear()}-${padDatePart(shifted.getUTCMonth() + 1)}-${padDatePart(shifted.getUTCDate())} ` +
    `${padDatePart(shifted.getUTCHours())}:${padDatePart(shifted.getUTCMinutes())} 北京时间`;
}

function getBirthMomentInfo(birthday, birthHourIndex) {
  const parts = getDateParts(birthday);
  const hasHour = Number.isInteger(birthHourIndex);
  const centerHour = getBirthHourCenterHour(birthHourIndex);
  const instant = createChinaStandardInstant(
    parts.year,
    parts.monthIndex,
    parts.day,
    centerHour,
  );
  return {
    instant,
    year: parts.year,
    monthIndex: parts.monthIndex,
    day: parts.day,
    hour: centerHour,
    hasHour,
    label: hasHour
      ? `${BRANCHES[birthHourIndex]}时中点 ${formatChinaStandardDateTime(instant)}`
      : `时辰未知，按正午 ${formatChinaStandardDateTime(instant)} 排盘`,
  };
}

function getBirthHourRangeInfo(birthday, birthHourIndex) {
  if (!Number.isInteger(birthHourIndex)) return null;
  const parts = getDateParts(birthday);
  const centerHour = getBirthHourCenterHour(birthHourIndex);
  return {
    label: `${BRANCHES[birthHourIndex]}时`,
    start: createChinaStandardInstant(
      parts.year,
      parts.monthIndex,
      parts.day,
      centerHour - 1,
    ),
    end: createChinaStandardInstant(
      parts.year,
      parts.monthIndex,
      parts.day,
      centerHour + 1,
    ),
  };
}

function getSolarTermBoundaryWarnings(birthday, birthHourIndex) {
  const range = getBirthHourRangeInfo(birthday, birthHourIndex);
  if (!range) return [];
  const parts = getDateParts(birthday);
  return getJieBoundariesAround(parts.year)
    .filter((boundary) => boundary.date >= range.start && boundary.date < range.end)
    .map((boundary) => Object.assign({}, boundary, { hourLabel: range.label }));
}

function formatSolarTermBoundaryWarnings(warnings) {
  return warnings
    .map((warning) =>
      `${warning.name} ${formatChinaStandardDateTime(warning.date)} 落在${warning.hourLabel}内`,
    )
    .join("；");
}

function getHourPillar(dayGanzhi, hourBranchIndex) {
  const stemIndex =
    positiveModulo((dayGanzhi.stemIndex % 5) * 2 + hourBranchIndex, 10);
  return {
    stemIndex,
    branchIndex: hourBranchIndex,
    stem: STEMS[stemIndex],
    branch: BRANCHES[hourBranchIndex],
    name: `${STEMS[stemIndex]}${BRANCHES[hourBranchIndex]}`,
    stemElement: ELEMENTS_BY_STEM[stemIndex],
    branchElement: ELEMENTS_BY_BRANCH[hourBranchIndex],
  };
}

function getSolarTermDate(year, termIndex) {
  const base = Date.UTC(1900, 0, 6, 2, 5);
  return new Date(
    base +
    31556925974.7 * (year - 1900) +
    SOLAR_TERM_MINUTES[termIndex] * 60000,
  );
}

function getJieBoundaryDate(year, jieIndex) {
  const table = window.JIE_BOUNDARY_SECONDS;
  const startYear = window.JIE_BOUNDARY_START_YEAR;
  if (
    Array.isArray(table) &&
    Number.isInteger(startYear) &&
    table[year - startYear] &&
    Number.isFinite(table[year - startYear][jieIndex])
  ) {
    return createChinaStandardInstant(
      year,
      0,
      1,
      0,
      0,
      table[year - startYear][jieIndex],
    );
  }
  return getSolarTermDate(year, JIE_TERMS[jieIndex].termIndex);
}

function getJieBoundariesAround(year) {
  const boundaries = [];
  [year - 1, year, year + 1].forEach((itemYear) => {
    JIE_TERMS.forEach((term, index) => {
      boundaries.push({
        name: term.name,
        termIndex: term.termIndex,
        branchIndex: term.branchIndex,
        year: itemYear,
        date: getJieBoundaryDate(itemYear, index),
      });
    });
  });
  return boundaries.sort((a, b) => a.date - b.date);
}

function getBaziYearPillar(date, calendarYear = date.getFullYear()) {
  const liChun = getJieBoundaryDate(calendarYear, 0);
  const baziYear = date < liChun ? calendarYear - 1 : calendarYear;
  const cycleIndex = positiveModulo(baziYear - 4, 60);
  return {
    cycleIndex,
    year: baziYear,
    stemIndex: cycleIndex % 10,
    branchIndex: cycleIndex % 12,
    stem: STEMS[cycleIndex % 10],
    branch: BRANCHES[cycleIndex % 12],
    name: `${STEMS[cycleIndex % 10]}${BRANCHES[cycleIndex % 12]}`,
  };
}

function getBaziMonthPillar(date, yearStem, calendarYear = date.getFullYear()) {
  const boundaries = getJieBoundariesAround(calendarYear);
  let currentBoundary = boundaries[0];
  for (let index = boundaries.length - 1; index >= 0; index -= 1) {
    if (date >= boundaries[index].date) {
      currentBoundary = boundaries[index];
      break;
    }
  }
  const monthOffset = positiveModulo(currentBoundary.branchIndex - 2, 12);
  const firstStemIndex = STEMS.indexOf(MONTH_FIRST_STEM[yearStem]);
  const stemIndex = positiveModulo(firstStemIndex + monthOffset, 10);
  const cycleIndex = findGanzhiIndex(stemIndex, currentBoundary.branchIndex);

  return {
    cycleIndex,
    stemIndex,
    branchIndex: currentBoundary.branchIndex,
    stem: STEMS[stemIndex],
    branch: BRANCHES[currentBoundary.branchIndex],
    name: `${STEMS[stemIndex]}${BRANCHES[currentBoundary.branchIndex]}`,
    boundary: currentBoundary,
  };
}

function findGanzhiIndex(stemIndex, branchIndex) {
  for (let index = 0; index < 60; index += 1) {
    if (index % 10 === stemIndex && index % 12 === branchIndex) {
      return index;
    }
  }
  return 0;
}

function getStemPolarity(stem) {
  return STEMS.indexOf(stem) % 2 === 0 ? "阳" : "阴";
}

function getStemElement(stem) {
  return ELEMENTS_BY_STEM[STEMS.indexOf(stem)];
}

function getTenGod(dayStem, targetStem) {
  const dayElement = getStemElement(dayStem);
  const targetElement = getStemElement(targetStem);
  const samePolarity = getStemPolarity(dayStem) === getStemPolarity(targetStem);

  if (dayElement === targetElement) return samePolarity ? "比肩" : "劫财";
  if (ELEMENT_GENERATES[dayElement] === targetElement) {
    return samePolarity ? "食神" : "伤官";
  }
  if (ELEMENT_GENERATES[targetElement] === dayElement) {
    return samePolarity ? "偏印" : "正印";
  }
  if (ELEMENT_CONTROLS[dayElement] === targetElement) {
    return samePolarity ? "偏财" : "正财";
  }
  if (ELEMENT_CONTROLS[targetElement] === dayElement) {
    return samePolarity ? "七杀" : "正官";
  }
  return "未定";
}

function getPillarElementCounts(pillars) {
  const counts = createElementCounts();
  pillars.forEach((pillar) => {
    counts[getStemElement(pillar.stem)] += 1.2;
    counts[ELEMENTS_BY_BRANCH[pillar.branchIndex]] += 1;
    HIDDEN_STEMS[pillar.branch].forEach((stem, index) => {
      counts[getStemElement(stem)] += index === 0 ? 0.7 : 0.35;
    });
  });
  return counts;
}

function getDayMasterAnalysis(dayStem, monthPillar, counts) {
  const dayElement = getStemElement(dayStem);
  const resourceElement = ELEMENT_ORDER.find(
    (element) => ELEMENT_GENERATES[element] === dayElement,
  );
  const monthElement = ELEMENTS_BY_BRANCH[monthPillar.branchIndex];
  const support =
    counts[dayElement] +
    counts[resourceElement] * 0.8 +
    (monthElement === dayElement ? 2 : 0) +
    (monthElement === resourceElement ? 1.4 : 0);
  const pressure = ELEMENT_ORDER.reduce(
    (total, element) =>
      element !== dayElement && element !== resourceElement
        ? total + counts[element]
        : total,
    0,
  );
  const score = Math.round((support / Math.max(1, support + pressure)) * 100);
  const state =
    score >= 58 ? "偏旺" : score <= 42 ? "偏弱" : "中和";

  return {
    dayElement,
    resourceElement,
    score,
    state,
    monthElement,
  };
}

function getBalanceText(counts) {
  const sorted = ELEMENT_ORDER.slice().sort((a, b) => counts[b] - counts[a]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];
  return {
    strongest,
    weakest,
    text: ELEMENT_ORDER
      .map((element) => `${element}${counts[element].toFixed(1)}`)
      .join(" · "),
  };
}

function getLuckDirection(gender, yearStem) {
  if (!gender) return null;
  const yangYear = getStemPolarity(yearStem) === "阳";
  return (gender === "male" && yangYear) || (gender === "female" && !yangYear)
    ? 1
    : -1;
}

function getLuckStartAge(
  birthDate,
  direction,
  calendarYear = birthDate.getFullYear(),
) {
  const boundaries = getJieBoundariesAround(calendarYear);
  let boundary = null;
  if (direction === 1) {
    boundary = boundaries.find((item) => item.date > birthDate);
  } else {
    for (let index = boundaries.length - 1; index >= 0; index -= 1) {
      if (boundaries[index].date < birthDate) {
        boundary = boundaries[index];
        break;
      }
    }
  }
  if (!boundary) return null;
  const days = Math.abs(boundary.date - birthDate) / DAY_IN_MS;
  const years = Math.floor(days / 3);
  const months = Math.round((days / 3 - years) * 12);
  return {
    boundary,
    years,
    months,
    display: `${years}年${months}个月`,
  };
}

function getLuckPillars(monthPillar, direction, count = 8) {
  return Array.from({ length: count }, (_, index) => {
    const cycleIndex = positiveModulo(
      monthPillar.cycleIndex + direction * (index + 1),
      60,
    );
    return {
      cycleIndex,
      name: `${STEMS[cycleIndex % 10]}${BRANCHES[cycleIndex % 12]}`,
    };
  });
}

function getBaziProfile(birthday, birthHourIndex) {
  const birthMoment = getBirthMomentInfo(birthday, birthHourIndex);
  const boundaryWarnings = getSolarTermBoundaryWarnings(birthday, birthHourIndex);
  const year = getBaziYearPillar(birthMoment.instant, birthMoment.year);
  const month = getBaziMonthPillar(
    birthMoment.instant,
    year.stem,
    birthMoment.year,
  );
  const day = getGanzhiDay(birthday);
  const hour = Number.isInteger(birthHourIndex)
    ? getHourPillar(day, birthHourIndex)
    : null;
  const pillars = [
    Object.assign({}, year, { label: "年柱" }),
    Object.assign({}, month, { label: "月柱" }),
    Object.assign({}, day, { label: "日柱" }),
    hour ? Object.assign({}, hour, { label: "时柱" }) : null,
  ].filter(Boolean);
  const counts = getPillarElementCounts(pillars);
  const dayMaster = getDayMasterAnalysis(day.stem, month, counts);
  const balance = getBalanceText(counts);
  const monthMainStem = HIDDEN_STEMS[month.branch][0];
  const patternGod = getTenGod(day.stem, monthMainStem);
  const visibleGods = pillars
    .filter((pillar) => pillar.label !== "日柱")
    .map((pillar) => `${pillar.label}${getTenGod(day.stem, pillar.stem)}`);

  return {
    year,
    month,
    day,
    hour,
    pillars,
    counts,
    dayMaster,
    balance,
    patternGod,
    visibleGods,
    monthMainStem,
    birthMoment: birthMoment.instant,
    birthMomentYear: birthMoment.year,
    birthMomentLabel: birthMoment.label,
    boundaryWarnings,
  };
}

function getBranchRelation(firstBranch, secondBranch) {
  const pair = `${firstBranch}${secondBranch}`;
  const reversePair = `${secondBranch}${firstBranch}`;
  if (firstBranch === secondBranch) return "同气";
  if (listHas(SIX_HARMONY, pair) || listHas(SIX_HARMONY, reversePair)) {
    return "六合";
  }
  if (listHas(SIX_CLASH, pair) || listHas(SIX_CLASH, reversePair)) {
    return "六冲";
  }
  return "无明显六合六冲";
}

function getPersonalBalanceAction(element) {
  return {
    木: "用学习、长期计划和持续连接补足生长感",
    火: "用表达、运动和公开呈现补足行动热度",
    土: "用规律作息、整理环境和完成小事补足稳定感",
    金: "用明确边界、做取舍和完成收尾补足秩序感",
    水: "用休息、观察和信息复盘补足弹性",
  }[element];
}

function getPersonalElementProfile(birthday, birthHourIndex) {
  const lunar = getLunarData(birthday);
  const bazi = getBaziProfile(birthday, birthHourIndex);
  const yearPillar = bazi.year;
  const monthPillar = bazi.month;
  const day = bazi.day;
  const pillars = [
    {
      label: "年柱 · 属象",
      name: yearPillar.name,
      detail: `${ZODIACS[yearPillar.branchIndex]} · ${getStemElement(yearPillar.stem)} / ${ELEMENTS_BY_BRANCH[yearPillar.branchIndex]}`,
      stemElement: getStemElement(yearPillar.stem),
      branchElement: ELEMENTS_BY_BRANCH[yearPillar.branchIndex],
    },
    {
      label: "月柱 · 月令",
      name: monthPillar.name,
      detail: `${monthPillar.boundary.name}后 · ${getStemElement(monthPillar.stem)} / ${ELEMENTS_BY_BRANCH[monthPillar.branchIndex]}`,
      stemElement: getStemElement(monthPillar.stem),
      branchElement: ELEMENTS_BY_BRANCH[monthPillar.branchIndex],
    },
    {
      label: "日柱 · 日干",
      name: day.name,
      detail: `${day.element} / ${ELEMENTS_BY_BRANCH[day.branchIndex]}`,
      stemElement: day.element,
      branchElement: ELEMENTS_BY_BRANCH[day.branchIndex],
    },
  ];

  let hourPillar = null;
  if (bazi.hour) {
    hourPillar = bazi.hour;
    pillars.push({
      label: "时柱 · 标准时",
      name: hourPillar.name,
      detail: `${hourPillar.stemElement} / ${hourPillar.branchElement}`,
      stemElement: hourPillar.stemElement,
      branchElement: hourPillar.branchElement,
    });
  }

  const counts = createElementCounts();
  pillars.forEach((pillar) => {
    counts[pillar.stemElement] += 1;
    counts[pillar.branchElement] += 1;
  });
  const countValues = ELEMENT_ORDER.map((element) => counts[element]);
  const maximum = Math.max.apply(null, countValues);
  const minimum = Math.min.apply(null, countValues);
  const dominant = ELEMENT_ORDER.filter((element) => counts[element] === maximum);
  const weakest = ELEMENT_ORDER.filter((element) => counts[element] === minimum);
  const missing = ELEMENT_ORDER.filter((element) => counts[element] === 0);
  const leadElement = dominant[0];
  const balanceElement = (missing.length ? missing : weakest)[0];
  const yearBranch = yearPillar.branch;
  const hourRelation = hourPillar
    ? getBranchRelation(yearBranch, hourPillar.branch)
    : "时辰未知";

  return {
    lunar,
    day,
    pillars,
    counts,
    dominant,
    weakest,
    missing,
    leadElement,
    balanceElement,
    hourRelation,
    zodiac: ZODIACS[yearPillar.branchIndex],
    yearBranchIndex: yearPillar.branchIndex,
    hasHour: Boolean(hourPillar),
  };
}

function getZodiacNameByBranch(branch) {
  return ZODIACS[BRANCHES.indexOf(branch)];
}

function getPunishmentDescription(branch) {
  if (listHas(["寅", "巳", "申"], branch)) return "寅巳申三刑";
  if (listHas(["丑", "戌", "未"], branch)) return "丑戌未三刑";
  if (listHas(["子", "卯"], branch)) return "子卯相刑";
  return `${branch}支自刑说`;
}

function renderZodiacProfile(profile) {
  const branchIndex = profile.lunar.branchIndex;
  const branch = BRANCHES[branchIndex];
  const zodiac = ZODIACS[branchIndex];
  const branchElement = ELEMENTS_BY_BRANCH[branchIndex];
  const facts = ZODIAC_FACTS[branchIndex];
  const harmonyBranch = HARMONY_PARTNERS[branch];
  const trine = TRINE_GROUPS.find((group) => listHas(group.branches, branch));
  const trinePartners = trine.branches.filter((item) => item !== branch);
  const generatedBy = ELEMENT_ORDER.find(
    (element) => ELEMENT_GENERATES[element] === branchElement,
  );
  const controlledBy = ELEMENT_ORDER.find(
    (element) => ELEMENT_CONTROLS[element] === branchElement,
  );
  const factItems = [
    ["地支", branch],
    ["阴阳", `${facts.yinYang}${branchElement}`],
    ["传统方位", facts.direction],
    ["季节", facts.season],
    ["对应时辰", `${branch}时 ${facts.hours}`],
    ["农历年柱", profile.lunar.yearName],
  ];

  elements.zodiacProfileName.textContent =
    `属${zodiac} · ${branch}支${facts.yinYang}${branchElement}`;
  elements.zodiacProfileSymbol.textContent = branch;
  elements.zodiacProfileFacts.replaceChildren(
    ...factItems.map(([label, value]) => {
      const node = document.createElement("div");
      node.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      return node;
    }),
  );
  elements.zodiacArchetype.textContent =
    `传统属象常用“${ZODIAC_ARCHETYPES[branchIndex]}”作为文化象意，可用来观察做事气质与节奏偏好。`;
  elements.zodiacElementCycle.textContent =
    `${generatedBy}生${branchElement} · ${branchElement}生${ELEMENT_GENERATES[branchElement]}`;
  elements.zodiacElementCycleDetail.textContent =
    `${branchElement}克${ELEMENT_CONTROLS[branchElement]}，` +
    `${controlledBy}克${branchElement}。这组关系用于观察五行之间的推动、制衡与转化。`;
  elements.zodiacHarmonyTitle.textContent =
    `六合${getZodiacNameByBranch(harmonyBranch)} · 三合${trinePartners.map(getZodiacNameByBranch).join("、")}`;
  elements.zodiacHarmonyDetail.textContent =
    `${branch}${harmonyBranch}为六合；${trine.branches.join("")}为三合${trine.element}局。` +
    "传统分类常用来观察关系结构、协同方式与节奏互补。";
  elements.zodiacTensionTitle.textContent =
    `冲${getZodiacNameByBranch(CLASH_PARTNERS[branch])} · ` +
    `害${getZodiacNameByBranch(HARM_PARTNERS[branch])} · ` +
    `破${getZodiacNameByBranch(BREAK_PARTNERS[branch])}`;
  elements.zodiacTensionDetail.textContent =
    `${branch}${CLASH_PARTNERS[branch]}为六冲，` +
    `${branch}${HARM_PARTNERS[branch]}为六害，` +
    `${branch}${BREAK_PARTNERS[branch]}为相破。可理解为传统关系表中较需要磨合的位置。`;
  elements.zodiacPunishmentTitle.textContent =
    getPunishmentDescription(branch);
  elements.zodiacPunishmentDetail.textContent =
    "刑、害、破在不同流派中有细分解释，本栏列出常见组合，方便与六合、三合一起对照。";
}

function getHealthAgeGuidance(age) {
  if (age < 18) {
    return {
      title: `${age}岁 · 生长发育阶段`,
      detail:
        "应由监护人与儿科或家庭医生结合生长曲线、疫苗记录和实际症状评估；不要依据生肖或五行限制食物。",
    };
  }
  if (age < 40) {
    return {
      title: `${age}岁 · 成年基础预防`,
      detail:
        "成年人应定期了解血压；筛查频率需结合既往读数、体重、家族史、烟酒和其他风险因素。",
    };
  }
  if (age < 45) {
    return {
      title: `${age}岁 · 加强风险监测`,
      detail:
        "40岁后通常需要更频繁关注血压和心血管风险，并根据所在地指南与医生讨论适合的筛查。",
    };
  }
  if (age <= 75) {
    return {
      title: `${age}岁 · 筛查讨论阶段`,
      detail:
        "除血压外，可与医生讨论结直肠癌筛查；美国 USPSTF 建议平均风险成人在45–75岁接受筛查，其他地区按当地指南。",
    };
  }
  return {
    title: `${age}岁 · 个体化评估`,
    detail:
      "筛查和饮食需要结合体能、既往病史、药物及个人意愿，由医生个体化判断，不宜套用统一方案。",
  };
}

function renderHealthProfile() {
  if (!currentBirthday) return;
  const age = getAgeBreakdown(currentBirthday, getToday()).years;
  const guidance = getHealthAgeGuidance(age);
  const foodTitle =
    age < 18
      ? "高盐零食 · 含糖饮料 · 反式脂肪"
      : "高盐 · 游离糖 · 反式脂肪 · 酒精";
  const foodDetail =
    age < 18
      ? "优先多样化天然食物；减少高盐零食、甜饮料和含工业反式脂肪的食品，未成年人不应饮酒。"
      : "WHO建议以多样、少加工食物为基础；成人盐少于5克/日，限制游离糖和工业反式脂肪。酒精并非养生必需品，越少风险越低。";
  const riskFactors = [
    "血压异常",
    "缺乏活动",
    "烟草暴露",
    "饮酒",
    "高盐高糖饮食",
    "持续睡眠不足",
  ];
  const actions = [
    age >= 18
      ? "使用合格设备了解血压；异常读数应由专业人员复核。"
      : "保留生长、疫苗和体检记录，由监护人与医生共同评估。",
    "规律活动、饮食多样、优先蔬菜水果、全谷物、豆类及适量优质蛋白。",
    "记录家族史、过敏、药物、症状和检查结果，这些才是个人风险评估的重要依据。",
    age >= 45
      ? "根据所在地指南，与医生讨论适龄筛查，不因应用结论推迟就医。"
      : "出现持续或加重的不适，应直接就医，不等待民俗或应用判断。",
  ];

  elements.healthBasisTitle.textContent = "年龄与生活方式提醒";
  elements.healthBasisText.textContent =
    `当前年龄约${age}岁，本栏优先给出饮食、活动、睡眠与体检节奏的通用行动清单。`;
  elements.healthFoodTitle.textContent = foodTitle;
  elements.healthFoodDetail.textContent = foodDetail;
  elements.healthAgeTitle.textContent = guidance.title;
  elements.healthAgeDetail.textContent = guidance.detail;
  renderTags(elements.healthRiskList, riskFactors);
  elements.healthActionList.replaceChildren(
    ...actions.map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
}

function getBaziAdvice(profile, annualPillar) {
  const strength = profile.dayMaster.state;
  const annualGod = getTenGod(profile.day.stem, annualPillar.stem);
  const advice = [];
  advice.push(
    strength === "偏旺"
      ? "事业：日主偏旺，宜以输出成果泄秀，忌固执独断。"
      : strength === "偏弱"
        ? "事业：日主偏弱，宜先取资源与助力，忌贸然担重。"
        : "事业：日主中和，宜稳步推进，以小节点成事。",
  );
  advice.push(
    /(正官|七杀)/.test(annualGod)
      ? "关系：流年见官杀，主规则、压力与承诺，宜先明边界责任。"
      : /(正财|偏财)/.test(annualGod)
        ? "关系：流年见财星，主现实资源与钱财安排，宜明账目、明时间、明承诺。"
        : "关系：以十神取象，重长期行动，忌只凭一时情绪。",
  );
  advice.push(
    "健康：把睡眠、运动、饮食和体检数据作为主线，再配合节律安排恢复时间。",
  );
  return advice;
}

function renderBaziProfile(targetDate) {
  if (!currentBirthday) return;
  const profile = getBaziProfile(currentBirthday, currentBirthHourIndex);
  const displayName = elements.birthName.value.trim() || "用户";
  const place = elements.birthPlace.value.trim();
  const annualYear = targetDate.getFullYear();
  const annualPillar = getBaziYearPillar(
    createChinaStandardInstant(annualYear, 6, 1, 12),
    annualYear,
  );
  const annualGod = getTenGod(profile.day.stem, annualPillar.stem);
  const direction = getLuckDirection(elements.birthGender.value, profile.year.stem);
  const luckStart = direction
    ? getLuckStartAge(profile.birthMoment, direction, profile.birthMomentYear)
    : null;
  const luckPillars = direction
    ? getLuckPillars(profile.month, direction)
    : [];
  const luckPrefix = luckStart
    ? `${direction === 1 ? "顺行" : "逆行"}，约${luckStart.display}起运`
    : "需补性别后判断顺逆与起运";

  elements.baziPlateTitle.textContent =
    `${displayName} · 日主${profile.day.stem}${profile.dayMaster.dayElement}`;
  elements.baziPlateTag.textContent =
    profile.hour ? "四柱" : "三柱";
  elements.baziPillars.replaceChildren(
    ...profile.pillars.map((pillar) => {
      const node = document.createElement("div");
      node.className = "bazi-pillar";
      node.innerHTML =
        `<span>${pillar.label}</span><strong>${pillar.name}</strong>` +
        `<small>${getStemElement(pillar.stem)} / ${ELEMENTS_BY_BRANCH[pillar.branchIndex]}</small>`;
      return node;
    }),
    ...(!profile.hour
      ? [(() => {
          const node = document.createElement("div");
          node.className = "bazi-pillar";
          node.innerHTML =
            "<span>时柱</span><strong>未提供</strong><small>大运与时柱会受影响</small>";
          return node;
        })()]
      : []),
  );
  const boundaryWarningText = profile.boundaryWarnings.length
    ? `节气交界校验：${formatSolarTermBoundaryWarnings(profile.boundaryWarnings)}；仅凭时辰不能断定分钟前后，当前按时辰中点排盘。`
    : `排盘时间：${profile.birthMomentLabel}。`;
  elements.baziPlateNote.textContent =
    `年柱以立春为界，月柱以${profile.month.boundary.name}起${profile.month.branch}月。` +
    boundaryWarningText +
    (place
      ? `出生地记录：“${place}”。`
      : "出生地未填写。");
  elements.baziDayMaster.textContent =
    `${profile.day.stem}${profile.dayMaster.dayElement} · ${profile.dayMaster.state}`;
  elements.baziDayMasterDetail.textContent =
    `简化支持度 ${profile.dayMaster.score}/100；月令为${profile.month.branch}月，` +
    `月支五行属${profile.dayMaster.monthElement}，用于观察日主获得季节支持的程度。`;
  elements.baziTenGodTitle.textContent =
    profile.visibleGods.slice(0, 3).join(" · ") || "以日主为中心";
  elements.baziTenGodDetail.textContent =
    `以${profile.day.stem}日主为中心，年、月、时天干分别观察十神关系；` +
    `地支藏干同步纳入结构对照。`;
  elements.baziBalanceTitle.textContent =
    `${profile.balance.strongest}较显 · ${profile.balance.weakest}较弱`;
  elements.baziBalanceDetail.textContent =
    `${profile.balance.text}。可用来安排补足习惯：强处负责输出，弱处安排练习与支持。`;
  elements.baziPatternTitle.textContent =
    `${profile.patternGod}格参考`;
  elements.baziPatternDetail.textContent =
    `月支${profile.month.branch}藏${HIDDEN_STEMS[profile.month.branch].join("、")}，` +
    `取主气${profile.monthMainStem}对日主为${profile.patternGod}，再结合透干、通根、清浊和全局观察。`;
  elements.baziLuckTitle.textContent =
    `${luckPrefix} · ${annualYear} ${annualPillar.name}流年`;
  elements.baziLuckDetail.textContent =
    `${annualPillar.name}年对日主为${annualGod}。` +
    (elements.birthGender.value
      ? "大运序列按阳男阴女顺、阴男阳女逆生成。"
      : "未填性别，因此不生成大运顺逆。");
  renderTags(
    elements.baziLuckList,
    luckPillars.length
      ? luckPillars.map((pillar, index) => `${index + 1}运 ${pillar.name}`)
      : ["补充性别", "确认阳历", "确认时辰", "记录出生地"],
  );
  elements.baziAdviceTitle.textContent =
    `${annualYear}年重点：${annualGod}`;
  elements.baziAdviceList.replaceChildren(
    ...getBaziAdvice(profile, annualPillar).map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
}

function getNameCharacterElement(character) {
  if (!character) return null;
  const direct = ELEMENT_ORDER.find((element) =>
    ELEMENT_RADICALS[element].indexOf(character) !== -1,
  );
  if (direct) return direct;
  const code = character.charCodeAt(0);
  return ELEMENT_ORDER[positiveModulo(code, ELEMENT_ORDER.length)];
}

function getNameElementProfile(name) {
  const cleanName = String(name || "").replace(/\s+/g, "");
  const characters = Array.from(cleanName).filter((character) => /[\u3400-\u9fff]/.test(character));
  const counts = createElementCounts();
  characters.forEach((character) => {
    const element = getNameCharacterElement(character);
    if (element) counts[element] += 1;
  });
  const maximum = Math.max.apply(null, ELEMENT_ORDER.map((element) => counts[element]));
  const leadElement = maximum > 0
    ? ELEMENT_ORDER.find((element) => counts[element] === maximum)
    : null;
  return {
    name: cleanName,
    characters,
    counts,
    leadElement,
  };
}

function getNameRelation(nameElement, birthElement) {
  if (!nameElement || !birthElement) {
    return { key: "unknown", title: "姓名未入局" };
  }
  if (nameElement === birthElement) {
    return { key: "same", title: `${nameElement}与命局同气` };
  }
  if (ELEMENT_GENERATES[nameElement] === birthElement) {
    return { key: "generates", title: `姓名${nameElement}生身局${birthElement}` };
  }
  if (ELEMENT_CONTROLS[nameElement] === birthElement) {
    return { key: "controlsSelf", title: `姓名${nameElement}克身局${birthElement}` };
  }
  if (ELEMENT_CONTROLS[birthElement] === nameElement) {
    return { key: "selfControls", title: `身局${birthElement}克姓名${nameElement}` };
  }
  return { key: "neutral", title: `姓名${nameElement}与身局${birthElement}隔位相参` };
}

function getGenderText(value) {
  if (value === "male") return "男命";
  if (value === "female") return "女命";
  return "性别未填";
}

function renderNameElementProfile(profile) {
  if (!elements.nameElementTitle || !elements.nameElementDetail || !elements.nameElementVerdict) {
    return;
  }
  const nameProfile = getNameElementProfile(elements.birthName.value);
  const calendarLabel =
    currentBirthCalendarInfo && currentBirthCalendarInfo.type === "lunar"
      ? "阴历入盘"
      : currentBirthCalendarInfo && currentBirthCalendarInfo.type === "lunarLeap"
        ? "闰月阴历入盘"
        : "阳历入盘";
  const place = elements.birthPlace.value.trim();
  const genderText = getGenderText(elements.birthGender.value);
  if (!nameProfile.leadElement) {
    elements.nameElementTitle.textContent = "未填姓名 · 不作姓名断";
    elements.nameElementDetail.textContent =
      `${genderText}，${calendarLabel}${place ? `，出生地${place}` : ""}。姓名未填，姓名五行不入局；人生大事（小六壬）只看出生干支与时序。`;
    elements.nameElementVerdict.replaceChildren(
      ...["欲看姓名助力，须先录入中文姓名；无名不立象，强断必失准。"].map((item) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = item;
        return paragraph;
      }),
    );
    return;
  }

  const relation = getNameRelation(nameProfile.leadElement, profile.leadElement);
  const verdictGroup = NAME_ELEMENT_VERDICTS[relation.key] || NAME_ELEMENT_VERDICTS.same;
  const mainVerdict = verdictGroup[nameProfile.leadElement] ||
    `提示：姓名${nameProfile.leadElement}气入局，先看出生五行，再取行事取舍。`;
  const supportElement = ELEMENT_GENERATES[nameProfile.leadElement];
  const pressureElement = ELEMENT_CONTROLS[nameProfile.leadElement];
  const countText = ELEMENT_ORDER
    .map((element) => `${element}${nameProfile.counts[element]}`)
    .join("、");
  elements.nameElementTitle.textContent =
    `${nameProfile.name} · 姓名主${nameProfile.leadElement} · ${relation.title}`;
  elements.nameElementDetail.textContent =
    `提示：${genderText}，${calendarLabel}${place ? `，生于${place}` : ""}。` +
    `姓名字形五行数为${countText}，取${nameProfile.leadElement}气为名中主令；` +
    `本命出生干支以${profile.leadElement}气较显。${mainVerdict}`;
  elements.nameElementVerdict.replaceChildren(
    ...[
      `喜：取${supportElement}为发用，凡学习、表达、贵人、平台之事，宜顺势推进。`,
      `忌：${pressureElement}为名中所克，遇钱财、关系、职位争夺，忌贪快硬夺。`,
      `提醒：姓名助身则早发，姓名克身则先压后成；此名成事要靠定目标、守期限、少反复。`,
    ].map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
}

function getDestinyType(profile, nameProfile) {
  const relation = getNameRelation(nameProfile.leadElement, profile.leadElement);
  if (profile.missing.length >= 2 && !profile.hasHour) {
    return {
      title: "先劳后稳命",
      text: "时辰未入、局中缺项较多，古法多作早年劳心劳力、先补根基后谈富贵之象。",
    };
  }
  if (relation.key === "generates" || relation.key === "same") {
    return {
      title: "名身相扶命",
      text: "姓名与本命主气同向或相生，古法作贵人、名声、平台可扶身之象。",
    };
  }
  if (relation.key === "controlsSelf") {
    return {
      title: "压身成器命",
      text: "姓名之气来克本命主气，古法作压力在前、成器在后，越守规矩越能翻身。",
    };
  }
  if (profile.leadElement === "土") {
    return {
      title: "操劳聚财命",
      text: "土气较显，主承载与家宅责任，古法多作劳中得财、守成胜过冒进。",
    };
  }
  if (profile.leadElement === "金") {
    return {
      title: "清贵掌权命",
      text: "金气较显，主规则、职位、器物与裁断，古法多作凭专业立身。",
    };
  }
  return {
    title: "靠本事开运命",
    text: "本局成败不靠空等，重在把主气用成技能，把缺项补成习惯。",
  };
}

function getDestinyWorkloadLine(profile, nameProfile) {
  const relation = getNameRelation(nameProfile.leadElement, profile.leadElement);
  if (profile.missing.length >= 2) {
    return "贫富取象：缺项多则先补短板，早年不宜贪大；中年后能守一门手艺或一项资产，财气才稳。";
  }
  if (relation.key === "generates" || relation.key === "same") {
    return "富贵取象：名身相扶，较容易借平台、贵人、证照、口碑成事；忌骄满，满则招损。";
  }
  if (relation.key === "controlsSelf") {
    return "操劳取象：压力先到，责任先压身；能受规矩、能吃苦者后运转厚。";
  }
  if (relation.key === "selfControls") {
    return "取财取象：身能克名象，有夺财夺势之能，但须立契约、守边界，忌硬夺伤和。";
  }
  return "气运取象：不属暴发局，贵在稳扎稳打；走对行业、守住节奏，财与名随年岁渐厚。";
}

function renderDestinyProfile(profile) {
  if (!elements.destinyProfileTitle || !elements.destinyProfileText || !elements.destinyProfileList) {
    return;
  }
  const nameProfile = getNameElementProfile(elements.birthName.value);
  const archetype = DESTINY_ELEMENT_ARCHETYPES[profile.leadElement];
  const destinyType = getDestinyType(profile, nameProfile);
  const genderText = getGenderText(elements.birthGender.value);
  const hourText = profile.hasHour ? "时辰已入局" : "时辰未入局";
  const nameText = nameProfile.leadElement
    ? `姓名主${nameProfile.leadElement}`
    : "姓名未入局";

  elements.destinyProfileTitle.textContent =
    `${destinyType.title} · ${archetype.title}`;
  elements.destinyProfileText.textContent =
    `古法取象：${genderText}，${profile.zodiac}年，${nameText}，本命主${profile.leadElement}，${hourText}。${destinyType.text}`;
  elements.destinyProfileList.replaceChildren(
    ...[
      `中年气运：${archetype.middle}`,
      `老年气运：${archetype.old}`,
      `适合岗位：${archetype.jobs.join("、")}。`,
      `劳碌富贵：${archetype.toil}${getDestinyWorkloadLine(profile, nameProfile)}`,
      `取财方向：${archetype.wealth}`,
    ].map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
}

function renderPersonalElementProfile() {
  if (!currentBirthday) return;
  const profile = getPersonalElementProfile(
    currentBirthday,
    currentBirthHourIndex,
  );
  const includedCharacters = profile.pillars.length * 2;
  const dominantLabel = profile.dominant.join("、");
  const missingLabel = profile.missing.length
    ? `未出现：${profile.missing.join("、")}`
    : `相对较少：${profile.weakest.join("、")}`;
  const leadCopy = PERSONAL_ELEMENT_COPY[profile.leadElement];

  elements.personalProfileTitle.textContent =
    `${profile.zodiac}年 · ${dominantLabel}较显`;
  elements.personalProfileConfidence.textContent =
    profile.hasHour ? "八字轮廓" : "六字轮廓";
  elements.personalPillars.replaceChildren(
    ...profile.pillars.map((pillar) => {
      const node = document.createElement("div");
      node.className = "personal-pillar";
      node.innerHTML =
        `<span>${pillar.label}</span><strong>${pillar.name}</strong>` +
        `<small>${pillar.detail}</small>`;
      return node;
    }),
    ...(!profile.hasHour
      ? [(() => {
          const node = document.createElement("div");
          node.className = "personal-pillar";
          node.innerHTML =
            "<span>时柱</span><strong>未提供</strong><small>补充时辰后计入</small>";
          return node;
        })()]
      : []),
  );
  elements.personalElementBars.replaceChildren(
    ...ELEMENT_ORDER.map((element) => {
      const node = document.createElement("div");
      const percentage = (profile.counts[element] / includedCharacters) * 100;
      node.className = "personal-element";
      node.style.setProperty("--element-strength", `${percentage}%`);
      node.innerHTML =
        `<span>${element}</span><i></i><b>${profile.counts[element]}</b>`;
      return node;
    }),
  );
  elements.personalElementFocus.textContent = `${dominantLabel}较显`;
  elements.personalElementDetail.textContent =
    `在已计入的${includedCharacters}个干支字符中，${leadCopy.strength}。` +
    `日干属${profile.day.element}；${missingLabel}。月柱结构可在八字排盘中继续对照。`;
  elements.personalRelationTitle.textContent =
    `${profile.leadElement}生${ELEMENT_GENERATES[profile.leadElement]} · ` +
    `${profile.leadElement}克${ELEMENT_CONTROLS[profile.leadElement]}`;
  elements.personalRelationDetail.textContent =
    `人生属象为${profile.zodiac}（${BRANCHES[profile.yearBranchIndex]}支）。` +
    (profile.hasHour
      ? `生肖支与出生时支的关系为“${profile.hourRelation}”，用于观察内外节奏。`
      : "出生时辰未知，因此未计算生肖支与时支关系。");
  elements.personalPlainTitle.textContent =
    `你的优势更像“${leadCopy.strength.replace("更偏向", "")}”`;
  elements.personalPlainText.textContent =
    `${leadCopy.reminder}。${missingLabel}可以作为补足习惯的线索；` +
    `${getPersonalBalanceAction(profile.balanceElement)}。` +
    "把优势变成稳定行动，比单纯看结论更有价值。";
  renderNameElementProfile(profile);
  renderDestinyProfile(profile);
  renderZodiacProfile(profile);
  renderHealthProfile();
}

function getSixRen(lunarMonth, lunarDay, hourBranchIndex) {
  // 大安起正月，月上起日，日上起时；子时按第一位计。
  const index = positiveModulo((lunarMonth - 1) + (lunarDay - 1) + hourBranchIndex, 6);
  return Object.assign({}, SIX_REN[index], { index });
}

function renderSixRenComplete(sixRen) {
  const copy = SIX_REN_ORACLE[sixRen.name] || SIX_REN_ORACLE.小吉;
  elements.sixRenCompleteTitle.textContent = copy.title;
  elements.sixRenCompleteDetail.textContent = copy.detail;
  elements.sixRenWealth.textContent = copy.wealth;
  elements.sixRenLost.textContent = copy.lost;
  elements.sixRenTravel.textContent = copy.travel;
  elements.sixRenPeople.textContent = copy.people;
  elements.sixRenHealth.textContent = copy.health;
  elements.sixRenTiming.textContent = copy.timing;
  elements.sixRenActions.replaceChildren(
    ...copy.actions.map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
}

function findTrigramNumber(lines) {
  return Number(
    Object.keys(TRIGRAMS).find(
      (key) => TRIGRAMS[key].lines.join("") === lines.join(""),
    ),
  );
}

function getMeihua(lunar, hourBranchIndex) {
  // 年月日取上卦，年月日时取下卦，总数除六取动爻。
  const yearNumber = lunar.branchIndex + 1;
  const hourNumber = hourBranchIndex + 1;
  const base = yearNumber + lunar.month + lunar.day;
  const upperNumber = positiveModulo(base - 1, 8) + 1;
  const lowerNumber = positiveModulo(base + hourNumber - 1, 8) + 1;
  const movingLine = positiveModulo(base + hourNumber - 1, 6) + 1;
  const upper = TRIGRAMS[upperNumber];
  const lower = TRIGRAMS[lowerNumber];
  const lines = [...lower.lines, ...upper.lines];
  const changedLines = [...lines];
  changedLines[movingLine - 1] = changedLines[movingLine - 1] ? 0 : 1;
  const changedLowerNumber = findTrigramNumber(changedLines.slice(0, 3));
  const changedUpperNumber = findTrigramNumber(changedLines.slice(3, 6));

  return {
    upperNumber,
    lowerNumber,
    upper,
    lower,
    movingLine,
    lines,
    name: HEXAGRAM_NAMES[upperNumber - 1][lowerNumber - 1],
    changedName: HEXAGRAM_NAMES[changedUpperNumber - 1][changedLowerNumber - 1],
  };
}

function getHexagramName(upperNumber, lowerNumber) {
  return HEXAGRAM_NAMES[upperNumber - 1][lowerNumber - 1];
}

function buildProfessionalGua(upperNumber, lowerNumber) {
  const upper = TRIGRAMS[upperNumber];
  const lower = TRIGRAMS[lowerNumber];
  return {
    upperNumber,
    lowerNumber,
    upper,
    lower,
    lines: [...lower.lines, ...upper.lines],
    name: getHexagramName(upperNumber, lowerNumber),
  };
}

function changeProfessionalGua(gua, movingLine) {
  const changedLines = [...gua.lines];
  changedLines[movingLine - 1] = changedLines[movingLine - 1] ? 0 : 1;
  return buildProfessionalGua(
    findTrigramNumber(changedLines.slice(3, 6)),
    findTrigramNumber(changedLines.slice(0, 3)),
  );
}

function getInnerProfessionalGua(gua) {
  return buildProfessionalGua(
    findTrigramNumber(gua.lines.slice(2, 5)),
    findTrigramNumber(gua.lines.slice(1, 4)),
  );
}

function elementGenerates(source, target) {
  return {
    木: "火",
    火: "土",
    土: "金",
    金: "水",
    水: "木",
  }[source] === target;
}

function elementControls(source, target) {
  return {
    木: "土",
    土: "水",
    水: "火",
    火: "金",
    金: "木",
  }[source] === target;
}

function getBodyUseRelation(body, use) {
  if (body.element === use.element) return "比和";
  if (elementGenerates(use.element, body.element)) return "用生体";
  if (elementGenerates(body.element, use.element)) return "体生用";
  if (elementControls(body.element, use.element)) return "体克用";
  if (elementControls(use.element, body.element)) return "用克体";
  return "关系平缓";
}

const BODY_USE_CLASSIC = {
  用生体: {
    title: "用生体，外来助我",
    judgment: "事有外助，所谋得力，宜顺势承接。",
    action: "取其助力，明其条件，主可成。",
  },
  比和: {
    title: "体用比和，气势相同",
    judgment: "主客相应，内外同气，谋为可成。",
    action: "守中推进，重在同心同力。",
  },
  体克用: {
    title: "体克用，我能制事",
    judgment: "我方有制事之权，先难后易，成在主动。",
    action: "先立规则，再行其事。",
  },
  体生用: {
    title: "体生用，我去生事",
    judgment: "我力外泄，耗神耗财，事成亦多费力。",
    action: "宜量力而行，忌过度付出。",
  },
  用克体: {
    title: "用克体，事来克我",
    judgment: "外事压身，阻力直来，谋事不利。",
    action: "宜守不宜进，先避其锋。",
  },
  关系平缓: {
    title: "体用未成生克，取卦象断",
    judgment: "生克不显，以本卦、互卦、变卦合参。",
    action: "先看卦象主事，再看动爻所指。",
  },
};

function getProfessionalScore(relation, main, changed, movingLine) {
  let score = 60;
  if (relation === "用生体") score += 22;
  if (relation === "比和") score += 14;
  if (relation === "体克用") score += 8;
  if (relation === "体生用") score -= 3;
  if (relation === "用克体") score -= 24;
  if (main.upper.name === "坎" || main.lower.name === "坎") score -= 6;
  if (/(泰|大有|晋)/.test(changed.name)) score += 9;
  if (/(否|困|蹇)/.test(changed.name)) score -= 10;
  if (movingLine === 5) score += 3;
  if (movingLine === 6) score -= 4;
  return Math.max(8, Math.min(96, score));
}

function getProfessionalLevel(score) {
  if (score >= 85) return { grade: "A+", text: "顺风，可主动前行" };
  if (score >= 72) return { grade: "A", text: "顺风，宜行" };
  if (score >= 58) return { grade: "B", text: "平稳偏顺，宜渐进" };
  if (score >= 43) return { grade: "C", text: "平稳，宜守中" };
  if (score >= 28) return { grade: "D", text: "注意绕行，先放慢" };
  return { grade: "E", text: "暂停观察，换条路走" };
}

function getDateMeihuaSeed(date, hourIndex) {
  return (
    `${date.getFullYear()}` +
    `${padNumber(date.getMonth() + 1)}` +
    `${padNumber(date.getDate())}` +
    `${padNumber(hourIndex + 1)}`
  );
}

function splitProfessionalDigits(value) {
  const digits = value.replace(/\D/g, "").split("").map(Number);
  if (digits.length < 2) return null;
  const midpoint = Math.ceil(digits.length / 2);
  return {
    digits,
    first: digits.slice(0, midpoint),
    second: digits.slice(midpoint),
  };
}

function sumNumbers(numbers) {
  return numbers.reduce((total, value) => total + value, 0);
}

function getProfessionalJudgment(topic, score, relation, main, changed) {
  const topicCopy = PROFESSIONAL_TOPICS[topic] || PROFESSIONAL_TOPICS.general;
  const direction =
    score >= 72
      ? topicCopy.good
      : score < 45
        ? topicCopy.difficult
        : topicCopy.neutral;
  const classic = BODY_USE_CLASSIC[relation] || BODY_USE_CLASSIC.关系平缓;
  return `人生路标（梅花易数）提示：${classic.title}。${classic.judgment}${direction}当前路标「${main.name}」，前方变化「${changed.name}」，以体用生克看走向，以动爻看变化。`;
}

function getProfessionalAdvice(relation, score, movingLine) {
  const classic = BODY_USE_CLASSIC[relation] || BODY_USE_CLASSIC.关系平缓;
  const advice = [];
  advice.push(`体用提示：${classic.action}`);
  advice.push(
    movingLine >= 4
      ? "动爻在外卦，主外事、后势、他人或环境有变。"
      : "动爻在内卦，主内事、初起、自身或根基有变。",
  );
  advice.push(
    score >= 72
      ? "顺风象已成，宜趁势行事。"
      : score < 45
        ? "阻滞象已见，宜守、宜缓、宜避锋芒。"
        : "平稳象居中，宜先守后动。",
  );
  return advice;
}

function getMeihuaTimingText(movingLine, score) {
  const stage = movingLine <= 2
    ? "初期应事，多在眼前、今日或近一两日"
    : movingLine <= 4
      ? "中段应事，多在三五日、一周内或事情推进到中途"
      : "后段应事，多在后续回音、对方动作或第二轮变化";
  return score >= 72
    ? `${stage}；顺象已见，宜主动定时间。`
    : score < 45
      ? `${stage}；阻象较重，不宜催逼，应先等局势松动。`
      : `${stage}；宜先试探，等对方或环境给出回响。`;
}

function getMeihuaCompleteReading(topic, score, relation, main, changed, movingLine, body, use) {
  const topicCopy = PROFESSIONAL_TOPICS[topic] || PROFESSIONAL_TOPICS.general;
  const relationLine = BODY_USE_CLASSIC[relation] || BODY_USE_CLASSIC.关系平缓;
  const hard = score < 45 || relation === "用克体";
  const easy = score >= 72 || relation === "用生体" || relation === "比和";
  const resultLine = easy
    ? "成败：主可成，成在顺势、借力、定条件。"
    : hard
      ? "成败：阻力先到，强求不美，宜缓、宜守、宜另备一路。"
      : "成败：半成半阻，先小试，能过中段再加力。";
  const moneyLine = relation === "体生用"
    ? "财运：我去生事，耗财耗力，先算成本再谈收益。"
    : relation === "体克用"
      ? "财运：我能制事，利谈价、控账、收款，但忌压人太狠。"
      : relation === "用生体"
        ? "财运：外局生我，有回款、贵人、资源入手之象。"
        : hard
          ? "财运：财气不聚，忌重投、借贷、追高。"
          : "财运：小利可取，大财须等条件齐。";
  const peopleLine = main.upper.name === "兑" || main.lower.name === "兑"
    ? "人事：兑象主口舌谈判，成败在说法、承诺和情绪。"
    : main.upper.name === "震" || main.lower.name === "震"
      ? "人事：震象主动，消息来得快，变也快，宜快定主次。"
      : main.upper.name === "坎" || main.lower.name === "坎"
        ? "人事：坎象主险阻隐情，先查真相，不可只听表面话。"
        : "人事：以体用看主客，体强我稳，用强事压我。";
  const lostLine = changed.upper.name === "艮" || changed.lower.name === "艮"
    ? "失物：艮为止，多在静处、高处、柜边、墙角，慢找可得。"
    : changed.upper.name === "巽" || changed.lower.name === "巽"
      ? "失物：巽为风为入，多在缝隙、袋中、抽屉、文书旁。"
      : changed.upper.name === "离" || changed.lower.name === "离"
        ? "失物：离为明，多在显眼处、光亮处、电子设备附近。"
        : "失物：看变卦取方，先按最近动线回找。";

  return {
    title: `${topicCopy.name} · ${main.name}之${changed.name}`,
    lines: [
      `${resultLine}${relationLine.title}。`,
      `应期：${getMeihuaTimingText(movingLine, score)}`,
      moneyLine,
      `合作：体卦${body.name}${body.element}，用卦${use.name}${use.element}；${relationLine.action}`,
      peopleLine,
      lostLine,
      `变局：由「${main.name}」转「${changed.name}」，前半看本卦，后半看变卦；动在第${movingLine}爻，变化从${movingLine <= 3 ? "内部、根基、本人心念" : "外部、对方、环境后势"}先起。`,
    ],
  };
}

function getPlainLanguageMeihua(topic, score, relation, movingLine) {
  const topicCopy = PROFESSIONAL_TOPICS[topic] || PROFESSIONAL_TOPICS.general;
  const classic = BODY_USE_CLASSIC[relation] || BODY_USE_CLASSIC.关系平缓;
  const verdict =
    score >= 72
      ? "顺风，可前行"
      : score < 45
        ? "注意绕行，先放慢"
        : "平稳，待机而动";
  const topicAction = {
    general: "先定主事，再择一事而行。",
    business: "先明责权、价款、交付，再立约。",
    money: "先守本金，再论进取。",
    career: "先成眼前之功，再求位阶之进。",
    love: "先明心意，再定进退。",
    travel: "先定路线、时辰、文书，再出行。",
    health: "宜静养调息，忌过劳耗神。",
  }[topic];
  const stageAction =
    movingLine <= 3
      ? "动在内卦，先治其本。"
      : "动在外卦，先察其势。";

  return {
    title: `人生路标（梅花易数）：${verdict}`,
    text:
      `所问“${topicCopy.name}”，${classic.title}，${classic.judgment}`,
    actions: [
      `宜：${topicAction}`,
      stageAction,
      score >= 72
        ? "顺风就行动，忌拖延失机。"
        : "取守象而行，忌躁进犯冲。",
    ],
  };
}

function getElementInteractionText(sourceElement, targetElement, sourceLabel, targetLabel) {
  if (!sourceElement || !targetElement) return "";
  if (sourceElement === targetElement) {
    return `${sourceLabel}${sourceElement}与${targetLabel}${targetElement}同气，主此事容易牵动本人真实意愿。`;
  }
  if (elementGenerates(sourceElement, targetElement)) {
    return `${sourceLabel}${sourceElement}生${targetLabel}${targetElement}，主本人要主动供力，成事靠投入与耐心。`;
  }
  if (elementGenerates(targetElement, sourceElement)) {
    return `${targetLabel}${targetElement}生${sourceLabel}${sourceElement}，主外局能回补本人，宜接住助力。`;
  }
  if (elementControls(sourceElement, targetElement)) {
    return `${sourceLabel}${sourceElement}克${targetLabel}${targetElement}，主本人能制其事，但忌用力过猛。`;
  }
  if (elementControls(targetElement, sourceElement)) {
    return `${targetLabel}${targetElement}克${sourceLabel}${sourceElement}，主外事压身，先守边界再行动。`;
  }
  return `${sourceLabel}${sourceElement}与${targetLabel}${targetElement}隔位相参，宜先观察，不宜单凭一念定夺。`;
}

function getMeihuaDestinyLines(personalProfile, nameProfile, relation, score, body, use) {
  const archetype = DESTINY_ELEMENT_ARCHETYPES[personalProfile.leadElement];
  const nameRelation = getNameRelation(nameProfile.leadElement, personalProfile.leadElement);
  const bodyUseLine = {
    用生体: "体得用生，外局有助；中年遇平台、贵人、资源时宜接住。",
    比和: "体用比和，内外同声；中年靠同伴、团队、同行资源成事。",
    体克用: "体克用，我能制事；适合掌规则、做负责人、管资源。",
    体生用: "体生用，我去生事；操劳象重，事成也耗心力，宜先算成本。",
    用克体: "用克体，外事压我；不宜硬冲，先守身、守财、守边界。",
    关系平缓: "体用生克不显，以卦象取事；宜先看当前局面，再看变卦后势。",
  }[relation] || "体用关系平缓，宜合参本卦与变卦。";
  const fortuneLine =
    score >= 72
      ? "富贵象偏开，利主动争取、谈条件、立名声。"
      : score < 45
        ? "辛劳象偏重，先守成避险，忌贪快求大。"
        : "平稳象居中，先小试，待气机明朗再加码。";
  const nameLine =
    nameRelation.key === "generates" || nameRelation.key === "same"
      ? "姓名入卦能扶本命，问事业、财利、名声时，可借名望、证照、平台开路。"
      : nameRelation.key === "controlsSelf"
        ? "姓名入卦成压身之象，问事多先有门槛，越有章法越能转为后劲。"
        : nameProfile.leadElement
          ? "姓名与本命不成直生，问事宜先看现实资源，不可只靠一时冲动。"
          : "姓名未入卦，断事以生日、生肖、时辰、体用为主。";

  return [
    `中年：${archetype.middle}${bodyUseLine}`,
    `老年：${archetype.old}`,
    `岗位：${archetype.jobs.slice(0, 4).join("、")}等更合本命主气；若所问之事与体卦${body.element}、用卦${use.element}同向，则更易落地。`,
    `富贵贫劳：${fortuneLine}${archetype.wealth}`,
    nameLine,
  ];
}

function getProfessionalPersonalContext(body, use, main, changed, movingLine, score) {
  if (!currentBirthday) {
    return {
      title: "个人资料未入卦",
      text: "尚未录入生日，人生路标只按当前数字起卦，不作本人与卦象的合参。",
      points: ["补充生日、时辰、姓名后，可把本命五行、姓名五行与体用关系一并参看。"],
    };
  }

  const personalProfile = getPersonalElementProfile(currentBirthday, currentBirthHourIndex);
  const nameProfile = getNameElementProfile(elements.birthName.value);
  const relation = getBodyUseRelation(body, use);
  const genderText = getGenderText(elements.birthGender.value);
  const hourText = Number.isInteger(currentBirthHourIndex)
    ? `${BRANCHES[currentBirthHourIndex]}时`
    : "时辰未填";
  const calendarText =
    currentBirthCalendarInfo && currentBirthCalendarInfo.type === "lunar"
      ? "阴历生日"
      : currentBirthCalendarInfo && currentBirthCalendarInfo.type === "lunarLeap"
        ? "阴历闰月生日"
        : "阳历生日";
  const nameLead = nameProfile.leadElement;
  const branchMeta = BRANCH_META[personalProfile.yearBranchIndex];
  const nameLine = nameLead
    ? getElementInteractionText(nameLead, use.element, "姓名主气", "用卦")
    : "姓名未填，姓名五行不入卦；此栏只以生日、生肖、时辰与体用合参。";
  const bodyLine = getElementInteractionText(personalProfile.leadElement, body.element, "本命主气", "体卦");
  const useLine = getElementInteractionText(personalProfile.leadElement, use.element, "本命主气", "用卦");
  const stageLine = movingLine <= 3
    ? "动爻在内卦，先动本人心念、基础条件与准备功夫。"
    : "动爻在外卦，先动外部环境、他人态度与后续变化。";
  const scoreLine = score >= 72
    ? "此卦对你偏顺，关键是快定主次、趁势推进。"
    : score < 45
      ? "此卦对你偏压，关键是先稳住身心与资源，不硬闯。"
      : "此卦对你居中，关键是先试一步，再看回响。";
  const destinyLines = getMeihuaDestinyLines(
    personalProfile,
    nameProfile,
    relation,
    score,
    body,
    use,
  );

  return {
    title:
      `${elements.birthName.value.trim() || "此人"} · ${genderText} · ` +
      `${personalProfile.zodiac}年 · 本命主${personalProfile.leadElement}`,
    text:
      `${calendarText}，${hourText}。本卦${main.name}，变卦${changed.name}；` +
      `体卦属${body.element}，用卦属${use.element}。${bodyLine}${useLine}`,
    points: [
      `${nameLine}`,
      `生肖${personalProfile.zodiac}对应${BRANCHES[personalProfile.yearBranchIndex]}支，取${branchMeta.direction}、${branchMeta.element}象；看此事时，先看“我能否稳住主位”，再看外局是否相助。`,
      `${stageLine}${scoreLine}`,
      ...destinyLines,
    ],
  };
}

function renderHexagramInto(container, lines, movingLine) {
  container.replaceChildren(
    ...[...lines].reverse().map((line, reverseIndex) => {
      const lineNumber = 6 - reverseIndex;
      const lineElement = document.createElement("div");
      lineElement.className =
        `hex-line${lineNumber === movingLine ? " is-changing" : ""}`;
      const segmentCount = line ? 1 : 2;

      for (let index = 0; index < segmentCount; index += 1) {
        lineElement.append(document.createElement("i"));
      }

      return lineElement;
    }),
  );
}

function renderProfessionalMeihua(rawNumber) {
  const split = splitProfessionalDigits(rawNumber);
  if (!split) {
    elements.meihuaError.textContent = "请至少输入两位数字。";
    return null;
  }

  elements.meihuaError.textContent = "";
  const upperNumber = positiveModulo(sumNumbers(split.first) - 1, 8) + 1;
  const lowerNumber = positiveModulo(sumNumbers(split.second) - 1, 8) + 1;
  const movingLine = positiveModulo(sumNumbers(split.digits) - 1, 6) + 1;
  const main = buildProfessionalGua(upperNumber, lowerNumber);
  const inner = getInnerProfessionalGua(main);
  const changed = changeProfessionalGua(main, movingLine);
  // 动爻所在经卦为用，无动爻的另一经卦为体。
  const body = movingLine <= 3 ? main.upper : main.lower;
  const use = movingLine <= 3 ? main.lower : main.upper;
  const relation = getBodyUseRelation(body, use);
  const score = getProfessionalScore(relation, main, changed, movingLine);
  const level = getProfessionalLevel(score);
  const topic = elements.meihuaTopic.value;
  const topicCopy = PROFESSIONAL_TOPICS[topic] || PROFESSIONAL_TOPICS.general;
  const question = elements.meihuaQuestion.value.trim();
  const classic = BODY_USE_CLASSIC[relation] || BODY_USE_CLASSIC.关系平缓;
  const plainLanguage = getPlainLanguageMeihua(
    topic,
    score,
    relation,
    movingLine,
  );
  const personalContext = getProfessionalPersonalContext(
    body,
    use,
    main,
    changed,
    movingLine,
    score,
  );
  const completeReading = getMeihuaCompleteReading(
    topic,
    score,
    relation,
    main,
    changed,
    movingLine,
    body,
    use,
  );

  elements.meihuaTopicBrief.textContent = topicCopy.summary;
  elements.professionalMainName.textContent = main.name;
  elements.professionalMainDetail.textContent =
    `${main.upper.name}上 · ${main.lower.name}下`;
  elements.professionalInnerName.textContent = inner.name;
  elements.professionalInnerDetail.textContent =
    `${inner.upper.name}上 · ${inner.lower.name}下`;
  elements.professionalChangedName.textContent = changed.name;
  elements.professionalChangedDetail.textContent = `第 ${movingLine} 爻动`;
  renderHexagramInto(elements.professionalHexagram, main.lines, movingLine);
  elements.professionalRelation.textContent = relation;
  elements.professionalBodyUse.textContent =
    `体卦：${body.symbol} ${body.name} · ${body.element}；` +
    `用卦：${use.symbol} ${use.name} · ${use.element}。` +
    `${classic.judgment}${TRIGRAM_TRAITS[main.upperNumber]}；${TRIGRAM_TRAITS[main.lowerNumber]}。`;
  elements.professionalGrade.textContent = level.grade;
  elements.professionalScore.textContent =
    `人生路标（梅花易数） ${score}/100 · ${level.text}`;
  elements.professionalTitle.textContent =
    `${topicCopy.name} · ${main.name}变${changed.name}`;
  elements.professionalJudgment.textContent =
    `${question ? `所问：“${question}”。` : ""}` +
    getProfessionalJudgment(topic, score, relation, main, changed);
  elements.professionalPersonalTitle.textContent = personalContext.title;
  elements.professionalPersonalText.textContent = personalContext.text;
  elements.professionalPersonalPoints.replaceChildren(
    ...personalContext.points.map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
  elements.professionalAdvice.replaceChildren(
    ...getProfessionalAdvice(relation, score, movingLine).map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
  elements.meihuaCompleteTitle.textContent = completeReading.title;
  elements.meihuaCompleteList.replaceChildren(
    ...completeReading.lines.map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
  elements.professionalPlainTitle.textContent = plainLanguage.title;
  elements.professionalPlainText.textContent = plainLanguage.text;
  elements.professionalPlainActions.replaceChildren(
    ...plainLanguage.actions.map((item) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = item;
      return paragraph;
    }),
  );
  return {
    score,
    level,
    relation,
    main,
    changed,
    movingLine,
  };
}

function getZodiacRelation(birthday, dayGanzhi, birthHourIndex = null) {
  const birthMoment = getBirthMomentInfo(birthday, birthHourIndex);
  const birthYear = getBaziYearPillar(birthMoment.instant, birthMoment.year);
  const birthBranchIndex = birthYear.branchIndex;
  const birthBranch = BRANCHES[birthBranchIndex];
  const dayBranch = dayGanzhi.branch;
  const pair = `${birthBranch}${dayBranch}`;
  const reversePair = `${dayBranch}${birthBranch}`;

  if (birthBranch === dayBranch) {
    return {
      title: `${ZODIACS[birthBranchIndex]} · 同气`,
      text: "生肖支与日支同气，主本命主题被放大，宜守节制。",
      adjustment: 4,
    };
  }

  if (listHas(SIX_HARMONY, pair) || listHas(SIX_HARMONY, reversePair)) {
    return {
      title: `${ZODIACS[birthBranchIndex]} · 相合`,
      text: "生肖支与日支成六合，主协作、连接、成合。",
      adjustment: 8,
    };
  }

  if (listHas(SIX_CLASH, pair) || listHas(SIX_CLASH, reversePair)) {
    return {
      title: `${ZODIACS[birthBranchIndex]} · 相冲`,
      text: "生肖支与日支成六冲，主动荡、变更、相激。",
      adjustment: -8,
    };
  }

  return {
    title: `${ZODIACS[birthBranchIndex]} · 平常`,
    text: "生肖支与日支无合冲，主平常之日，宜按常法行事。",
    adjustment: 0,
  };
}

function getRhythm(date, dayGanzhi, sixRen) {
  const index = positiveModulo(dayGanzhi.cycleIndex + sixRen.index + date.getDate(), RHYTHMS.length);
  return { title: RHYTHMS[index][0], text: RHYTHMS[index][1] };
}

function getCultureScore(sixRen, zodiacRelation, meihua) {
  const elementBalance = meihua.upper.element === meihua.lower.element ? 4 : 0;
  return Math.max(
    18,
    Math.min(92, Math.round(sixRen.score * 0.78 + 12 + zodiacRelation.adjustment + elementBalance)),
  );
}

function getUnifiedReferenceScore(baseScore, meihuaScore) {
  return Math.max(
    18,
    Math.min(96, Math.round(baseScore * 0.55 + meihuaScore * 0.45)),
  );
}

function getFortuneAvoidText(score) {
  if (score >= 70) return "小事可化";
  if (score >= 45) return "先缓一步";
  return "避免冒进";
}

function getRoadTone(score) {
  if (score >= 72) return "顺风";
  if (score >= 45) return "平稳";
  return "注意绕行";
}

function syncReferenceScoreCopy(score) {
  elements.dayTone.textContent = getRoadTone(score);
  elements.fortuneAvoid.textContent = getFortuneAvoidText(score);
}

function applyReferenceScores(baseScore, meihuaResult) {
  lastBaseCultureScore = baseScore;
  if (meihuaResult) {
    lastMeihuaResult = meihuaResult;
  }
  const meihuaScore =
    meihuaResult && Number.isFinite(meihuaResult.score)
      ? meihuaResult.score
      : lastMeihuaResult && Number.isFinite(lastMeihuaResult.score)
        ? lastMeihuaResult.score
        : baseScore;
  const unifiedScore = getUnifiedReferenceScore(baseScore, meihuaScore);
  lastUnifiedReferenceScore = unifiedScore;
  elements.cultureScore.textContent = `当下幸运值 ${unifiedScore}`;
  elements.scoreBar.style.width = `${unifiedScore}%`;
  if (meihuaResult) {
    elements.professionalScore.textContent =
      `人生路标（梅花易数） ${meihuaResult.score}/100 · 当下幸运值 ${unifiedScore}/100 · ${meihuaResult.level.text}`;
  }
  return unifiedScore;
}

function getTone(score) {
  return getRoadTone(score);
}

function renderTags(container, items) {
  container.replaceChildren(
    ...items.map((item) => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }),
  );
}

function renderHourTimeline(selectedIndex) {
  elements.hourTimeline.replaceChildren(
    ...BRANCHES.map((branch, index) => {
      const node = document.createElement("div");
      node.className = `hour-node${index === selectedIndex ? " is-selected" : ""}`;
      const startHour = positiveModulo(index * 2 - 1, 24);
      node.innerHTML = `<strong>${branch}</strong>${padNumber(startHour)}时`;
      return node;
    }),
  );
}

function renderHexagram(meihua) {
  renderHexagramInto(
    elements.hexagramVisual,
    meihua.lines,
    meihua.movingLine,
  );
}

function updateTraditionalView() {
  const targetDate = parseDateInput(elements.targetDate.value);
  if (!targetDate || !currentBirthday) {
    return;
  }

  const hourIndex = getHourBranchIndex(targetDate, elements.targetHour.value);
  const lunar = getLunarData(targetDate);
  const dayGanzhi = getGanzhiDay(targetDate);
  const sixRen = getSixRen(lunar.month, lunar.day, hourIndex);
  const meihua = getMeihua(lunar, hourIndex);
  const zodiacRelation = getZodiacRelation(
    currentBirthday,
    dayGanzhi,
    currentBirthHourIndex,
  );
  const rhythm = getRhythm(targetDate, dayGanzhi, sixRen);
  const baseScore = getCultureScore(sixRen, zodiacRelation, meihua);
  const elementCopy = ELEMENT_COPY[dayGanzhi.element];
  const direction = DIRECTIONS_BY_ELEMENT[dayGanzhi.element];
  const supportElement = GENERATING_ELEMENT[dayGanzhi.element];
  const supportDirection = DIRECTIONS_BY_ELEMENT[supportElement];
  const branchDirection = BRANCH_META[dayGanzhi.branchIndex];
  const sixRenRoad = getRoadTone(sixRen.score);

  renderPersonalElementProfile();
  renderBaziProfile(targetDate);
  elements.cultureScore.textContent = `当下幸运值 ${baseScore}`;
  elements.scoreBar.style.width = `${baseScore}%`;
  elements.dayTone.textContent = getTone(baseScore);
  elements.dayGuidance.textContent =
    `${sixRenRoad}：${sixRen.roadText || sixRen.text}`;
  elements.fortuneGood.textContent =
    elementCopy.favorable.slice(0, 2).join(" · ");
  elements.fortuneRisk.textContent = elementCopy.caution[0];
  elements.fortuneAvoid.textContent = getFortuneAvoidText(baseScore);
  elements.fortuneBlessing.textContent = `${sixRenRoad} · ${rhythm.title}`;
  elements.lunarDate.textContent =
    `${lunar.yearName}年 ${lunar.monthText}${lunar.dayText}`;
  elements.ganzhiDate.textContent =
    `${formatChineseDate(targetDate)} · ${BRANCHES[hourIndex]}时`;
  elements.sixRenName.textContent = sixRenRoad;
  elements.sixRenText.textContent = sixRen.roadText || sixRen.text;
  renderSixRenComplete(sixRen);
  elements.zodiacRelation.textContent = zodiacRelation.title;
  elements.zodiacText.textContent = zodiacRelation.text;
  elements.rhythmTitle.textContent = rhythm.title;
  elements.rhythmText.textContent = rhythm.text;

  elements.dayPillar.textContent = `${dayGanzhi.name}日`;
  elements.dayElement.textContent = dayGanzhi.element;
  elements.elementTheme.textContent = elementCopy.title;
  elements.elementDescription.textContent = elementCopy.text;
  renderTags(elements.favorableActions, elementCopy.favorable);
  renderTags(elements.cautionActions, elementCopy.caution);
  renderHourTimeline(hourIndex);

  elements.hexagramName.textContent = meihua.name;
  elements.hexagramDetail.textContent =
    `以农历年支、月、日与${BRANCHES[hourIndex]}时起卦，${meihua.movingLine}爻动。`;
  elements.upperTrigram.textContent =
    `${meihua.upper.symbol} ${meihua.upper.name}卦`;
  elements.upperTrigramDetail.textContent =
    `${meihua.upper.nature}象 · 五行属${meihua.upper.element}`;
  elements.lowerTrigram.textContent =
    `${meihua.lower.symbol} ${meihua.lower.name}卦`;
  elements.lowerTrigramDetail.textContent =
    `${meihua.lower.nature}象 · 五行属${meihua.lower.element}`;
  elements.changingLine.textContent = `第 ${meihua.movingLine} 爻变`;
  elements.changedHexagram.textContent =
    `变卦为「${meihua.changedName}」。可把它理解为从当前结构向另一种状态变化的文化象征。`;
  renderHexagram(meihua);

  elements.compassNeedle.style.transform = `rotate(${direction.degree}deg)`;
  elements.directionName.textContent = direction.name;
  elements.directionText.textContent = direction.text;
  elements.supportDirection.textContent =
    `${supportDirection.name} · ${supportElement}`;
  elements.supportDirectionText.textContent =
    `${supportElement}生${dayGanzhi.element}，可把${supportDirection.name}作为五行空间联想，用来安排当日行动起点。`;
  elements.observeDirection.textContent =
    `${branchDirection.direction} · ${dayGanzhi.branch}`;
  elements.observeDirectionText.textContent =
    `${dayGanzhi.branch}支对应${branchDirection.element}与${branchDirection.direction}，用于观察日支空间意象与行事节奏。`;

  const professionalSeed = getDateMeihuaSeed(targetDate, hourIndex);
  elements.meihuaDateSeed.textContent = "";
  if (!professionalSeedIsCustom) {
    elements.meihuaNumber.value = "";
  }
  const professionalResult = renderProfessionalMeihua(
    elements.meihuaNumber.value || professionalSeed,
  );
  const referenceScore = applyReferenceScores(baseScore, professionalResult);
  syncReferenceScoreCopy(referenceScore);
}

function showLifeResult(birthday, birthHourIndex = null) {
  currentBirthday = birthday;
  currentBirthCalendarInfo =
    lastValidatedBirthCalendarInfo ||
    buildCalendarInfoFromInput(elements.birthday.value, getSelectedCalendarType()) ||
    buildCalendarInfoFromInput(toInputDate(birthday), "solar");
  currentBirthHourIndex = Number.isInteger(birthHourIndex)
    ? birthHourIndex
    : null;
  professionalSeedIsCustom = false;
  const today = getToday();
  const totalDays = getCalendarDayDifference(birthday, today);
  const age = getAgeBreakdown(birthday, today);
  const nextBirthday = getNextBirthday(birthday, today);

  setNumber(elements.totalDays, totalDays);
  elements.homeLifeDays.textContent =
    `你已经走过 ${formatNumber(totalDays)} 天，每一天都值得被看见`;
  elements.totalHours.textContent = formatNumber(totalDays * 24);
  elements.lifeDetail.textContent =
    `${age.years}年 ${age.months}个月 ${age.days}天 · ${formatNumber(totalDays * 1440)}分钟`;
  elements.arrivalDate.textContent =
    ((currentBirthCalendarInfo && currentBirthCalendarInfo.label) || formatChineseDate(birthday, false)) +
    (Number.isInteger(currentBirthHourIndex)
      ? ` · ${BRANCHES[currentBirthHourIndex]}时`
      : " · 时辰未知");
  elements.nextBirthday.textContent =
    nextBirthday === 0 ? "就是今天" : `还有 ${nextBirthday} 天`;
  elements.targetDate.value = toInputDate(today);
  elements.targetHour.value = String(getHourBranchIndex(new Date()));
  storage.setItem("time-machine-birthday", elements.birthday.value);
  storage.setItem("time-machine-birth-hour", elements.birthHour.value);
  storage.setItem("time-machine-birth-name", elements.birthName.value);
  storage.setItem("time-machine-calendar-type", elements.calendarType.value);
  storage.setItem("time-machine-birth-gender", elements.birthGender.value);
  storage.setItem("time-machine-birth-place", elements.birthPlace.value);
  updateTraditionalView();
  openInsightScreen();
}

function validateBirthday() {
  lastValidatedBirthCalendarInfo = null;
  if (!elements.birthday.value) {
    elements.error.textContent = "请先输入你的出生日期。";
    return null;
  }

  const calendarInfo = buildCalendarInfoFromInput(
    elements.birthday.value,
    getSelectedCalendarType(),
  );

  if (!calendarInfo) {
    elements.error.textContent = isLunarCalendarType(getSelectedCalendarType())
      ? "这个阴历日期换算不出来，请检查月份、日期；闰月生日请选择“阴历闰月”。"
      : "这个阳历日期似乎不存在，请重新检查。";
    return null;
  }

  if (calendarInfo.solarDate > getToday()) {
    elements.error.textContent = "出生日期不能晚于今天。";
    return null;
  }

  elements.error.textContent = "";
  lastValidatedBirthCalendarInfo = calendarInfo;
  updateCalendarInputCopy();
  return calendarInfo.solarDate;
}

function openInsightScreen() {
  pauseScreensaverTimer();
  elements.insightScreen.hidden = false;
  elements.insightScreen.scrollTop = 0;
  document.body.classList.add("is-detail-open");
  if (window.location.hash !== "#insight") {
    history.pushState({ screen: "insight" }, "", "#insight");
  }
  elements.backButton.focus({ preventScroll: true });
}

function preventViewportMovement(event) {
  const target =
    event.target instanceof Element ? event.target : event.target && event.target.parentElement;
  if (target && target.closest(".qr-modal")) {
    return;
  }
  if (target && target.closest(".commerce-panel")) {
    return;
  }
  if (
    !elements.insightScreen.hidden &&
    target && target.closest(".panel-scroll")
  ) {
    return;
  }
  if (event.cancelable) {
    event.preventDefault();
  }
}

function closeInsightScreen(updateHistory = true) {
  elements.insightScreen.hidden = true;
  toggleCommercePanel(false);
  document.body.classList.remove("is-detail-open");
  if (updateHistory && window.location.hash === "#insight") {
    history.back();
  }
  resetScreensaverTimer();
}

function selectTab(tabName) {
  document.querySelectorAll(".result-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    const active = panel.dataset.panel === tabName;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
    if (active) {
      const panelScroller = panel.querySelector(".panel-scroll");
      if (panelScroller) {
        panelScroller.scrollTo(0, 0);
      }
    }
  });
}

function focusTextInputSafely(input) {
  if (!input || input.disabled) {
    return;
  }
  window.requestAnimationFrame(() => {
    input.focus({ preventScroll: true });
    if (typeof input.setSelectionRange === "function") {
      const end = input.value.length;
      try {
        input.setSelectionRange(end, end);
      } catch (error) {
        // Some input modes do not support selection ranges; focus is enough.
      }
    }
  });
}

function bindTactileTextInput(input) {
  if (!input) return;
  const host = input.closest("label");
  if (!host) return;
  const focusHandler = () => focusTextInputSafely(input);
  host.addEventListener("pointerup", focusHandler);
  host.addEventListener("click", focusHandler);
}

bindTactileTextInput(elements.birthName);
bindTactileTextInput(elements.birthPlace);
bindTactileTextInput(elements.meihuaNumber);

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const birthday = validateBirthday();
  if (birthday) {
    const birthHourIndex =
      elements.birthHour.value === ""
        ? null
        : Number(elements.birthHour.value);
    showLifeResult(birthday, birthHourIndex);
  }
});

elements.birthday.addEventListener("input", () => {
  elements.error.textContent = "";
  const calendarInfo = buildCalendarInfoFromInput(
    elements.birthday.value,
    getSelectedCalendarType(),
  );
  updateCalendarInputCopy();
  if (calendarInfo && calendarInfo.solarDate <= getToday()) {
    const totalDays = getCalendarDayDifference(calendarInfo.solarDate, getToday());
    elements.homeLifeDays.textContent =
      `你已经走过 ${formatNumber(totalDays)} 天，每一天都值得被看见`;
  } else {
    elements.homeLifeDays.textContent =
      "输入生日，看看自己已经走了多远";
  }
});
elements.calendarType.addEventListener("change", () => {
  storage.setItem("time-machine-calendar-type", elements.calendarType.value);
  elements.error.textContent = "";
  updateCalendarInputCopy();
  syncFilledFieldLabels();
});

[elements.birthName, elements.birthPlace].forEach((field) => {
  field.addEventListener("input", syncFilledFieldLabels);
});

[elements.birthGender, elements.birthHour].forEach((field) => {
  field.addEventListener("change", syncFilledFieldLabels);
});

elements.backButton.addEventListener("click", () => closeInsightScreen(true));
if (elements.themeToggle) {
  elements.themeToggle.addEventListener("click", toggleTheme);
}
if (elements.insightThemeToggle) {
  elements.insightThemeToggle.addEventListener("click", toggleTheme);
}
if (elements.openCommerceButton) {
  elements.openCommerceButton.addEventListener("click", () => toggleCommercePanel());
}
if (elements.closeCommercePanelButton) {
  elements.closeCommercePanelButton.addEventListener("click", () => toggleCommercePanel(false));
}
if (elements.openQrModalButton) {
  elements.openQrModalButton.addEventListener("click", () => openQrModal("wechat"));
}
if (elements.openAlipayQrModalButton) {
  elements.openAlipayQrModalButton.addEventListener("click", () => openQrModal("alipay"));
}
if (elements.openProFromLock) {
  elements.openProFromLock.addEventListener("click", openProCheckout);
}
if (elements.closeQrModal) {
  elements.closeQrModal.addEventListener("click", closeQrModal);
  elements.closeQrModal.addEventListener("pointerup", (event) => {
    event.preventDefault();
    closeQrModal();
  });
}
if (elements.qrModal) {
  elements.qrModal.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.matches("[data-close-qr]")) {
      closeQrModal();
    }
  });
  elements.qrModal.addEventListener("pointerup", (event) => {
    if (event.target instanceof Element && event.target.matches("[data-close-qr]")) {
      event.preventDefault();
      closeQrModal();
    }
  });
}
if (elements.downloadQrButton) {
  elements.downloadQrButton.addEventListener("click", saveQrImage);
}
if (elements.openQrImageLink) {
  elements.openQrImageLink.addEventListener("click", (event) => {
    event.preventDefault();
    openQrImageSource();
  });
}
if (elements.openPaymentAppButton) {
  elements.openPaymentAppButton.addEventListener("click", openPaymentApp);
}
if (elements.confirmScanButton) {
  elements.confirmScanButton.addEventListener("click", copyPaymentNote);
}
if (elements.copyPaymentNoteButton) {
  elements.copyPaymentNoteButton.addEventListener("click", copyPaymentNote);
}
if (elements.licensePhone) {
  elements.licensePhone.addEventListener("input", updatePaymentPhoneView);
}
if (elements.paymentExtraNote) {
  elements.paymentExtraNote.addEventListener("input", () => {
    storage.setItem("time-machine-payment-note", elements.paymentExtraNote.value.trim());
  });
}
if (elements.unlockButton) {
  elements.unlockButton.addEventListener("click", verifyUnlockCode);
}
if (elements.unlockCode) {
  elements.unlockCode.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verifyUnlockCode();
    }
  });
}
if (elements.exportReportButton) {
  elements.exportReportButton.addEventListener("click", exportFullReport);
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeQrModal();
    toggleCommercePanel(false);
  }
});
elements.targetDate.addEventListener("change", () => {
  professionalSeedIsCustom = false;
  updateTraditionalView();
});
elements.targetHour.addEventListener("change", () => {
  professionalSeedIsCustom = false;
  updateTraditionalView();
});
elements.meihuaNumber.addEventListener("input", () => {
  professionalSeedIsCustom = true;
  elements.meihuaError.textContent = "";
});
elements.meihuaCalculate.addEventListener("click", () => {
  professionalSeedIsCustom = true;
  const result = renderProfessionalMeihua(elements.meihuaNumber.value);
  if (result && Number.isFinite(lastBaseCultureScore)) {
    const referenceScore = applyReferenceScores(lastBaseCultureScore, result);
    syncReferenceScoreCopy(referenceScore);
  }
});
elements.meihuaTopic.addEventListener("change", () => {
  const result = renderProfessionalMeihua(elements.meihuaNumber.value);
  if (result && Number.isFinite(lastBaseCultureScore)) {
    const referenceScore = applyReferenceScores(lastBaseCultureScore, result);
    syncReferenceScoreCopy(referenceScore);
  }
});

document.querySelectorAll(".result-tab").forEach((tab) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
});

window.addEventListener("hashchange", () => {
  if (window.location.hash !== "#insight" && !elements.insightScreen.hidden) {
    closeInsightScreen(false);
  }
});

document.addEventListener("touchmove", preventViewportMovement, {
  passive: false,
});
document.addEventListener("wheel", preventViewportMovement, {
  passive: false,
});
document.addEventListener("gesturestart", preventViewportMovement, {
  passive: false,
});
document.addEventListener("gesturechange", preventViewportMovement, {
  passive: false,
});
document.addEventListener("pointerdown", handlePointerActivity, {
  capture: true,
  passive: false,
});
document.addEventListener("click", handleWakeClick, true);
document.addEventListener("keydown", resetScreensaverTimer);
document.addEventListener("input", resetScreensaverTimer);
document.addEventListener("focusin", resetScreensaverTimer);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    updateClock();
    startClockTimer();
    resetScreensaverTimer();
  } else {
    stopClockTimer();
    pauseScreensaverTimer();
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  pendingInstallPrompt = event;
  elements.installButton.hidden = false;
});

elements.installButton.addEventListener("click", () => {
  if (!pendingInstallPrompt) {
    return;
  }
  pendingInstallPrompt.prompt();
  pendingInstallPrompt.userChoice.then(() => {
    pendingInstallPrompt = null;
    elements.installButton.hidden = true;
  });
});

window.addEventListener("appinstalled", () => {
  pendingInstallPrompt = null;
  elements.installButton.hidden = true;
});

elements.birthday.max = toInputDate(getToday());
elements.birthName.value =
  storage.getItem("time-machine-birth-name") || "";
elements.calendarType.value =
  storage.getItem("time-machine-calendar-type") || "solar";
elements.birthGender.value =
  storage.getItem("time-machine-birth-gender") || "";
elements.birthPlace.value =
  storage.getItem("time-machine-birth-place") || "";
elements.birthday.value = storage.getItem("time-machine-birthday") || "";
elements.birthHour.value =
  storage.getItem("time-machine-birth-hour") || "";
applyTheme("light");
storage.setItem("time-machine-theme-version", THEME_REFRESH_VERSION);
initializeCommercePanel();
updateCalendarInputCopy();
const savedCalendarInfo = buildCalendarInfoFromInput(
  elements.birthday.value,
  getSelectedCalendarType(),
);
if (savedCalendarInfo && savedCalendarInfo.solarDate <= getToday()) {
  const savedLifeDays = getCalendarDayDifference(savedCalendarInfo.solarDate, getToday());
  elements.homeLifeDays.textContent =
    `你已经走过 ${formatNumber(savedLifeDays)} 天，每一天都值得被看见`;
}
updateClock();
renderClockTicks();
resetScreensaverTimer();
let clockTimerId = null;
function startClockTimer() {
  if (clockTimerId !== null) {
    return;
  }
  clockTimerId = window.setInterval(updateClock, 1000);
}
function stopClockTimer() {
  if (clockTimerId === null) {
    return;
  }
  window.clearInterval(clockTimerId);
  clockTimerId = null;
}
startClockTimer();

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
