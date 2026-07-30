// ====== Synapse 数据中心 ======

// 开屏激励短句库
const QUOTES = [
  "每一个清晨都是世界对你说的最温柔的「重新开始」。",
  "你比自己想象中更勇敢，比昨天更接近梦想。",
  "不必追赶别人的花期，你的绽放自有节奏。",
  "今天的努力，是明天回望时嘴角上扬的理由。",
  "做自己的光，不需要太亮，足够温暖就好。",
  "温柔地对待自己，坚定地走向目标。",
  "生活不会辜负每一个认真呼吸的瞬间。",
  "把今天过成值得回忆的样子。",
  "你走的每一步，都在重塑未来的模样。",
  "保持热爱，奔赴山海，心有所向，步履不停。",
  "最好的状态是：眼里有光，心中有爱，脚下有路。",
  "所有的美好都会不期而遇，只要你一直在路上。",
  "用今天的汗水浇灌明天的花园。",
  "别怕走得慢，只要不停下，你就在前进。",
  "人生没有白走的路，每一步都算数。"
];

// 高中高频英语单词库
const WORD_BANK = [
  { en: "abandon", zh: "放弃；抛弃", phonetic: "/əˈbændən/", example: "We should never abandon our dreams, no matter how hard life gets." },
  { en: "ability", zh: "能力；才能", phonetic: "/əˈbɪləti/", example: "She has the ability to solve complex problems quickly and efficiently." },
  { en: "absorb", zh: "吸收；吸引", phonetic: "/əbˈzɔːrb/", example: "Plants absorb sunlight and convert it into energy through photosynthesis." },
  { en: "abstract", zh: "抽象的；摘要", phonetic: "/ˈæbstrækt/", example: "The concept of happiness is abstract and means different things to different people." },
  { en: "abundant", zh: "丰富的；充裕的", phonetic: "/əˈbʌndənt/", example: "The region is abundant in natural resources, including oil and minerals." },
  { en: "academic", zh: "学术的；学院的", phonetic: "/ˌækəˈdemɪk/", example: "Her academic achievements earned her a scholarship to a top university." },
  { en: "accelerate", zh: "加速；促进", phonetic: "/əkˈseləreɪt/", example: "The new technology will accelerate the development of renewable energy." },
  { en: "access", zh: "进入；通道；访问", phonetic: "/ˈækses/", example: "Students have free access to the online library resources." },
  { en: "accompany", zh: "陪伴；伴随", phonetic: "/əˈkʌmpəni/", example: "I will accompany you to the airport tomorrow morning." },
  { en: "accomplish", zh: "完成；实现", phonetic: "/əˈkɑːmplɪʃ/", example: "With determination and hard work, you can accomplish anything you set your mind to." },
  { en: "accurate", zh: "准确的；精确的", phonetic: "/ˈækjərət/", example: "The scientist made accurate measurements to ensure the experiment's success." },
  { en: "achieve", zh: "达到；取得", phonetic: "/əˈtʃiːv/", example: "To achieve greatness, one must first believe that it is possible." },
  { en: "acknowledge", zh: "承认；感谢", phonetic: "/əkˈnɑːlɪdʒ/", example: "It's important to acknowledge your mistakes and learn from them." },
  { en: "acquire", zh: "获得；习得", phonetic: "/əˈkwaɪər/", example: "Children acquire language skills naturally through interaction with others." },
  { en: "adapt", zh: "适应；改编", phonetic: "/əˈdæpt/", example: "The ability to adapt to change is essential for survival in today's world." },
  { en: "adequate", zh: "足够的；适当的", phonetic: "/ˈædɪkwət/", example: "Make sure you get adequate sleep before the exam." },
  { en: "adjust", zh: "调整；适应", phonetic: "/əˈdʒʌst/", example: "It took her a few weeks to adjust to the new school environment." },
  { en: "admire", zh: "钦佩；赞赏", phonetic: "/ədˈmaɪər/", example: "I truly admire people who dedicate their lives to helping others." },
  { en: "admit", zh: "承认；准许进入", phonetic: "/ədˈmɪt/", example: "He had to admit that he was wrong about the whole situation." },
  { en: "adopt", zh: "采用；收养", phonetic: "/əˈdɑːpt/", example: "The company decided to adopt a more environmentally friendly policy." },
  { en: "advance", zh: "前进；进步", phonetic: "/ədˈvæns/", example: "Technology continues to advance at an incredible pace." },
  { en: "advantage", zh: "优势；有利条件", phonetic: "/ədˈvæntɪdʒ/", example: "Being bilingual gives you a significant advantage in the job market." },
  { en: "adventure", zh: "冒险；奇遇", phonetic: "/ədˈventʃər/", example: "Life is either a daring adventure or nothing at all." },
  { en: "affair", zh: "事务；事件", phonetic: "/əˈfer/", example: "The committee will discuss international affairs at the meeting." },
  { en: "affect", zh: "影响；感动", phonetic: "/əˈfekt/", example: "Climate change will affect every aspect of our lives in the coming decades." },
  { en: "afford", zh: "负担得起；提供", phonetic: "/əˈfɔːrd/", example: "Many families cannot afford the rising cost of higher education." },
  { en: "aggressive", zh: "侵略的；好斗的", phonetic: "/əˈɡresɪv/", example: "An aggressive marketing strategy helped the startup grow rapidly." },
  { en: "agriculture", zh: "农业；农学", phonetic: "/ˈæɡrɪkʌltʃər/", example: "Modern agriculture relies heavily on technology to increase crop yields." },
  { en: "alarm", zh: "警报；惊恐", phonetic: "/əˈlɑːrm/", example: "The fire alarm went off and everyone evacuated the building calmly." },
  { en: "allocate", zh: "分配；拨出", phonetic: "/ˈæləkeɪt/", example: "The government will allocate more funds to public healthcare." },
  { en: "alternative", zh: "替代的；选择", phonetic: "/ɔːlˈtɜːrnətɪv/", example: "Solar energy is a clean alternative to fossil fuels." },
  { en: "amaze", zh: "使惊奇", phonetic: "/əˈmeɪz/", example: "The view from the mountain top never fails to amaze visitors." },
  { en: "ambition", zh: "野心；抱负", phonetic: "/æmˈbɪʃn/", example: "Her ambition to become a doctor drove her to study tirelessly." },
  { en: "analyze", zh: "分析；解析", phonetic: "/ˈænəlaɪz/", example: "Scientists analyze data to find patterns and draw conclusions." },
  { en: "ancestor", zh: "祖先；祖宗", phonetic: "/ˈænsestər/", example: "We should honor our ancestors and the sacrifices they made." },
  { en: "ancient", zh: "古代的；古老的", phonetic: "/ˈeɪnʃənt/", example: "The ancient civilization left behind remarkable architectural wonders." },
  { en: "anniversary", zh: "周年纪念日", phonetic: "/ˌænɪˈvɜːrsəri/", example: "They celebrated their tenth wedding anniversary with a trip to Paris." },
  { en: "announce", zh: "宣布；通告", phonetic: "/əˈnaʊns/", example: "The principal will announce the winners of the competition tomorrow." },
  { en: "anxiety", zh: "焦虑；忧虑", phonetic: "/æŋˈzaɪəti/", example: "Deep breathing exercises can help reduce anxiety before a big presentation." },
  { en: "apparent", zh: "明显的；表面上的", phonetic: "/əˈpærənt/", example: "It became apparent that the project needed more time to complete." },
  { en: "appeal", zh: "呼吁；吸引", phonetic: "/əˈpiːl/", example: "The charity made an urgent appeal for donations after the disaster." },
  { en: "appetite", zh: "食欲；胃口", phonetic: "/ˈæpɪtaɪt/", example: "Regular exercise can help improve your appetite and overall health." },
  { en: "appliance", zh: "电器；器具", phonetic: "/əˈplaɪəns/", example: "Energy-efficient appliances can significantly reduce electricity bills." },
  { en: "application", zh: "申请；应用", phonetic: "/ˌæplɪˈkeɪʃn/", example: "Your job application should highlight your relevant skills and experience." },
  { en: "appreciate", zh: "欣赏；感激", phonetic: "/əˈpriːʃieɪt/", example: "I really appreciate all the support you've given me during this difficult time." },
  { en: "approach", zh: "方法；接近", phonetic: "/əˈproʊtʃ/", example: "A positive approach to problem-solving can lead to better outcomes." },
  { en: "appropriate", zh: "适当的；合适的", phonetic: "/əˈproʊpriət/", example: "Please wear appropriate clothing for the formal dinner event." },
  { en: "approve", zh: "批准；赞成", phonetic: "/əˈpruːv/", example: "The board of directors will approve the budget at next week's meeting." },
  { en: "architecture", zh: "建筑学；结构", phonetic: "/ˈɑːrkɪtektʃər/", example: "The city's architecture reflects a blend of modern and traditional styles." },
  { en: "arise", zh: "出现；产生", phonetic: "/əˈraɪz/", example: "Unexpected problems may arise during the implementation phase." },
  { en: "aspect", zh: "方面；层面", phonetic: "/ˈæspekt/", example: "We need to consider every aspect of the problem before making a decision." },
  { en: "assess", zh: "评估；评定", phonetic: "/əˈses/", example: "Teachers assess students' progress through various forms of evaluation." },
  { en: "assign", zh: "分配；指派", phonetic: "/əˈsaɪn/", example: "The manager will assign specific tasks to each team member." },
  { en: "assist", zh: "帮助；协助", phonetic: "/əˈsɪst/", example: "Volunteers assist the elderly with daily activities at the community center." },
  { en: "assume", zh: "假设；承担", phonetic: "/əˈsuːm/", example: "You shouldn't assume that everyone thinks the same way you do." },
  { en: "atmosphere", zh: "气氛；大气层", phonetic: "/ˈætməsfɪr/", example: "The restaurant has a warm and welcoming atmosphere." },
  { en: "attach", zh: "附上；连接", phonetic: "/əˈtætʃ/", example: "Please attach your resume to the email before sending it." },
  { en: "attempt", zh: "尝试；企图", phonetic: "/əˈtempt/", example: "Every attempt to solve the puzzle brought us closer to the answer." },
  { en: "attend", zh: "参加；出席", phonetic: "/əˈtend/", example: "All students are required to attend the morning assembly." },
  { en: "attitude", zh: "态度；看法", phonetic: "/ˈætɪtuːd/", example: "A positive attitude can make a huge difference in your daily life." },
  { en: "attract", zh: "吸引；引起", phonetic: "/əˈtrækt/", example: "Bright colors attract children's attention more effectively." },
  { en: "authority", zh: "权威；当局", phonetic: "/əˈθɔːrəti/", example: "The local authority has issued new guidelines for public safety." },
  { en: "available", zh: "可用的；有空的", phonetic: "/əˈveɪləbl/", example: "Is the meeting room available this afternoon?" },
  { en: "average", zh: "平均的；普通的", phonetic: "/ˈævərɪdʒ/", example: "The average temperature in July is around 30 degrees Celsius." },
  { en: "avoid", zh: "避免；避开", phonetic: "/əˈvɔɪd/", example: "To stay healthy, you should avoid eating too much processed food." },
  { en: "aware", zh: "意识到的；知道的", phonetic: "/əˈwer/", example: "We need to be aware of the impact our actions have on the environment." },
  { en: "barrier", zh: "障碍；屏障", phonetic: "/ˈbæriər/", example: "Language should not be a barrier to friendship and understanding." },
  { en: "behavior", zh: "行为；举止", phonetic: "/bɪˈheɪvjər/", example: "Good behavior in class helps create a positive learning environment." },
  { en: "belong", zh: "属于；归属", phonetic: "/bɪˈlɔːŋ/", example: "Everyone needs a place where they feel they belong." },
  { en: "benefit", zh: "好处；受益", phonetic: "/ˈbenɪfɪt/", example: "Regular exercise has many benefits for both physical and mental health." },
  { en: "bother", zh: "打扰；烦恼", phonetic: "/ˈbɑːðər/", example: "Don't bother trying to change things you cannot control." },
  { en: "boundary", zh: "边界；界限", phonetic: "/ˈbaʊndri/", example: "It's important to set healthy boundaries in all relationships." },
  { en: "budget", zh: "预算；经费", phonetic: "/ˈbʌdʒɪt/", example: "We need to plan our budget carefully for the upcoming project." },
  { en: "burden", zh: "负担；重担", phonetic: "/ˈbɜːrdn/", example: "Don't let past mistakes become a burden on your future." },
  { en: "campaign", zh: "运动；战役", phonetic: "/kæmˈpeɪn/", example: "The environmental campaign successfully raised public awareness." },
  { en: "capable", zh: "有能力的", phonetic: "/ˈkeɪpəbl/", example: "You are capable of achieving far more than you think." },
  { en: "capacity", zh: "容量；能力", phonetic: "/kəˈpæsəti/", example: "The stadium has a seating capacity of over 50,000 people." },
  { en: "capture", zh: "捕获；吸引", phonetic: "/ˈkæptʃər/", example: "The photograph manages to capture the beauty of the sunset perfectly." },
  { en: "career", zh: "职业；生涯", phonetic: "/kəˈrɪr/", example: "Choosing a career that matches your passion is essential for long-term happiness." }
];

// 菜谱数据
const RECIPES = [
  {
    name: "菠菜鸡胸肉沙拉",
    meal: "午餐",
    tags: ["高蛋白", "补铁", "低脂"],
    desc: "嫩煎鸡胸肉搭配新鲜菠菜、樱桃番茄、牛油果，淋上柠檬橄榄油汁。富含铁质和优质蛋白，适合低血压体质补充营养。",
    cal: 320
  },
  {
    name: "红枣枸杞燕麦粥",
    meal: "早餐",
    tags: ["补气血", "暖胃", "高纤维"],
    desc: "燕麦与红枣、枸杞慢火熬煮，加入少许蜂蜜调味。温和滋补，有助于提升血压和能量水平。",
    cal: 260
  },
  {
    name: "三文鱼牛油果拌饭",
    meal: "午餐",
    tags: ["Omega-3", "优质脂肪", "补脑"],
    desc: "新鲜三文鱼刺身搭配牛油果、海苔碎、温泉蛋，淋上少许酱油。富含Omega-3脂肪酸，有益心脑血管健康。",
    cal: 450
  },
  {
    name: "当归黄芪炖鸡汤",
    meal: "晚餐",
    tags: ["滋补", "补气", "传统食疗"],
    desc: "老母鸡搭配当归、黄芪、党参慢炖2小时，汤色金黄浓郁。传统滋补汤品，适合气血不足、低血压体质。",
    cal: 280
  },
  {
    name: "香蕉蓝莓奶昔",
    meal: "加餐",
    tags: ["补钾", "抗氧化", "快手"],
    desc: "香蕉、蓝莓、希腊酸奶、少许蜂蜜混合搅打。富含钾元素和抗氧化物质，快速补充能量。",
    cal: 210
  },
  {
    name: "番茄牛肉意面",
    meal: "午餐",
    tags: ["补铁", "高蛋白", "经典"],
    desc: "全麦意面搭配慢炖番茄牛肉酱，撒上帕玛森芝士。牛肉富含血红素铁，番茄中的维C促进铁吸收。",
    cal: 480
  },
  {
    name: "桂圆红枣茶 + 全麦吐司",
    meal: "早餐",
    tags: ["补血", "暖身", "简单"],
    desc: "桂圆红枣煮水搭配全麦吐司抹花生酱。桂圆红枣补血安神，适合晨起血压偏低时温补。",
    cal: 300
  }
];

// 训练计划 (适配低血压、肌肉量偏低)
const TRAINING_PLAN = [
  {
    name: "靠墙静蹲",
    target: "下肢力量",
    sets: "3组",
    reps: "每组30-45秒",
    duration: "5分钟",
    note: "背靠墙壁，缓慢下蹲至大腿与地面平行。注意起身时动作缓慢，避免头晕。",
    icon: "🧎",
    video: "https://www.bilibili.com/search?keyword=靠墙静蹲+教学+跟练"
  },
  {
    name: "弹力带划船",
    target: "背部 + 肱二头肌",
    sets: "3组",
    reps: "每组12-15次",
    duration: "6分钟",
    note: "坐姿，弹力带固定于脚底，缓慢拉向腹部。注意保持背部挺直。",
    icon: "🏋️",
    video: "https://www.bilibili.com/search?keyword=弹力带划船+教学+跟练"
  },
  {
    name: "臀桥",
    target: "臀大肌 + 核心",
    sets: "3组",
    reps: "每组15次",
    duration: "5分钟",
    note: "仰卧屈膝，臀部缓慢抬起至身体成直线，保持2秒后放下。改善骨盆稳定性。",
    icon: "🌉",
    video: "https://www.bilibili.com/search?keyword=臀桥+跟练+教学"
  },
  {
    name: "俯卧撑（跪姿）",
    target: "胸肌 + 肱三头肌",
    sets: "3组",
    reps: "每组8-12次",
    duration: "6分钟",
    note: "膝盖着地，双手略宽于肩。下降时吸气，推起时呼气。量力而行。",
    icon: "💪",
    video: "https://www.bilibili.com/search?keyword=跪姿俯卧撑+跟练+新手"
  },
  {
    name: "鸟狗式",
    target: "核心稳定性",
    sets: "3组",
    reps: "每侧10次",
    duration: "5分钟",
    note: "四足跪姿，对侧手脚同时伸展。强化核心稳定，改善平衡能力。",
    icon: "🐦",
    video: "https://www.bilibili.com/search?keyword=鸟狗式+核心训练+跟练"
  },
  {
    name: "坐姿腿屈伸",
    target: "股四头肌",
    sets: "3组",
    reps: "每组15次",
    duration: "5分钟",
    note: "坐于椅子边缘，单腿缓慢伸直抬高，保持2秒后放下。适合低血压者避免站立动作。",
    icon: "🪑",
    video: "https://www.bilibili.com/search?keyword=坐姿腿屈伸+居家训练"
  },
  {
    name: "拉伸放松",
    target: "全身柔韧性",
    sets: "1组",
    reps: "每个动作保持30秒",
    duration: "8分钟",
    note: "包括腿后侧、髋屈肌、胸部、肩部拉伸。运动后必做，帮助恢复。",
    icon: "🧘",
    video: "https://www.bilibili.com/search?keyword=全身拉伸放松+跟练+10分钟"
  }
];

// 影视推荐
const MOVIES_WATCHLIST = [
  { name: "利刃出鞘2", genre: "推理悬疑", year: "2022", tags: ["推理", "悬疑", "反转"], link: "https://movie.douban.com/subject/34941536/" },
  { name: "女人们的谈话", genre: "女性视角", year: "2022", tags: ["女性", "剧情", "文学改编"], link: "https://movie.douban.com/subject/35177876/" },
  { name: "菜单", genre: "恐怖元素", year: "2022", tags: ["恐怖", "黑色喜剧", "惊悚"], link: "https://movie.douban.com/subject/30455615/" },
  { name: "伊尼舍林的报丧女妖", genre: "经典电影", year: "2022", tags: ["黑色喜剧", "剧情", "爱尔兰"], link: "https://movie.douban.com/subject/34969111/" },
  { name: "造梦之家", genre: "经典电影", year: "2022", tags: ["半自传", "成长", "斯皮尔伯格"], link: "https://movie.douban.com/subject/30307097/" },
  { name: "天才不能承受之重", genre: "欧美喜剧", year: "2022", tags: ["喜剧", "尼古拉斯凯奇", "自黑"], link: "https://movie.douban.com/subject/34890463/" },
  { name: "悲情三角", genre: "欧美喜剧", year: "2022", tags: ["讽刺", "戛纳", "阶级"], link: "https://movie.douban.com/subject/34953889/" }
];

const MOVIES_WATCHED = [
  { name: "利刃出鞘", genre: "推理悬疑", year: "2019", tags: ["推理", "悬疑", "经典"], link: "https://movie.douban.com/subject/30318116/" },
  { name: "小妇人", genre: "女性视角", year: "2019", tags: ["女性", "经典文学", "成长"], link: "https://movie.douban.com/subject/26348157/" },
  { name: "寄生虫", genre: "经典电影", year: "2019", tags: ["奥斯卡", "韩国", "阶级"], link: "https://movie.douban.com/subject/27010768/" }
];

const MOVIE_RECOMMEND = [
  { name: "坠落的审判", genre: "推理悬疑", year: "2023", tags: ["法庭", "悬疑", "戛纳金棕榈"], link: "https://movie.douban.com/subject/35633615/", reason: "推理悬疑 + 女性视角，双重契合你的偏好" },
  { name: "芭比", genre: "欧美喜剧", year: "2023", tags: ["女性", "喜剧", "社会讽刺"], link: "https://movie.douban.com/subject/30295939/", reason: "女性视角 + 欧美喜剧的完美结合" },
  { name: "晒后假日", genre: "女性视角", year: "2022", tags: ["女性", "剧情", "父女"], link: "https://movie.douban.com/subject/35015477/", reason: "细腻的女性视角叙事，情感张力十足" },
  { name: "博很恐惧", genre: "恐怖元素", year: "2023", tags: ["恐怖", "心理", "荒诞"], link: "https://movie.douban.com/subject/35208787/", reason: "恐怖元素 + 心理深度，满足悬疑偏好" },
  { name: "奥本海默", genre: "经典电影", year: "2023", tags: ["传记", "历史", "诺兰"], link: "https://movie.douban.com/subject/34852993/", reason: "影史经典级别的制作，必看之作" }
];

// 扩展推荐池 — 当推荐被看完后自动补充
const MOVIE_RECOMMEND_POOL = [
  { name: "可怜的东西", genre: "女性视角", year: "2023", tags: ["女性", "奇幻", "威尼斯金狮奖"], link: "https://movie.douban.com/subject/35302635/", reason: "女性视角 + 奇幻设定，视觉风格独特" },
  { name: "留校联盟", genre: "欧美喜剧", year: "2023", tags: ["喜剧", "温情", "圣诞"], link: "https://movie.douban.com/subject/35603716/", reason: "温暖治愈的欧美喜剧，年度口碑佳作" },
  { name: "美国小说", genre: "欧美喜剧", year: "2023", tags: ["讽刺", "喜剧", "文学"], link: "https://movie.douban.com/subject/36052581/", reason: "犀利的社会讽刺喜剧，奥斯卡提名" },
  { name: "利益区域", genre: "经典电影", year: "2023", tags: ["历史", "战争", "戛纳"], link: "https://movie.douban.com/subject/35400309/", reason: "戛纳评审团大奖，冷静克制的经典之作" },
  { name: "萨特本", genre: "恐怖元素", year: "2023", tags: ["心理恐怖", "悬疑", "华丽"], link: "https://movie.douban.com/subject/36065788/", reason: "华丽视觉 + 心理恐怖，满足你的悬疑偏好" },
  { name: "过往人生", genre: "女性视角", year: "2023", tags: ["女性", "爱情", "移民"], link: "https://movie.douban.com/subject/35633579/", reason: "细腻的女性视角，关于缘分与选择" },
  { name: "花月杀手", genre: "推理悬疑", year: "2023", tags: ["悬疑", "历史", "斯科塞斯"], link: "https://movie.douban.com/subject/35208338/", reason: "马丁·斯科塞斯 + 小李子，悬疑历史巨制" },
  { name: "五月十二月", genre: "女性视角", year: "2023", tags: ["女性", "剧情", "伦理"], link: "https://movie.douban.com/subject/36057989/", reason: "娜塔莉·波特曼主演，女性视角的心理博弈" },
  { name: "怪物", genre: "推理悬疑", year: "2023", tags: ["悬疑", "是枝裕和", "戛纳"], link: "https://movie.douban.com/subject/35672624/", reason: "是枝裕和 + 坂元裕二，多视角悬疑叙事" },
  { name: "完美的日子", genre: "经典电影", year: "2023", tags: ["日常", "诗意", "戛纳影帝"], link: "https://movie.douban.com/subject/36068118/", reason: "戛纳最佳男演员，关于日常的温柔诗篇" }
];

// 身体状态默认值
const DEFAULT_BODY_STATUS = {
  sleep: { label: "睡眠", value: "7h", icon: "😴" },
  energy: { label: "体能", value: "良好", icon: "⚡" },
  feeling: { label: "体感", value: "正常", icon: "🌿" },
  moodFrag: { label: "情绪碎片", value: "平静", icon: "💭" },
  bp: { label: "血压感受", value: "正常", icon: "💗" },
  muscle: { label: "肌肉状态", value: "放松", icon: "🦴" }
};

// 心情选项
const MOOD_OPTIONS = [
  { emoji: "😊", label: "开心" },
  { emoji: "😌", label: "平静" },
  { emoji: "😤", label: "烦躁" },
  { emoji: "😢", label: "难过" },
  { emoji: "🥰", label: "幸福" },
  { emoji: "😴", label: "疲惫" },
  { emoji: "🤩", label: "兴奋" },
  { emoji: "😐", label: "一般" }
];

// 阅读书目
const READING_LIST = [
  {
    name: "百年孤独",
    author: "加西亚·马尔克斯",
    progress: 65,
    excerpts: [
      "多年以后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起父亲带他去见识冰块的那个遥远的下午。",
      "一个人不是在该死的时候死，而是在能死的时候死。",
      "生命中真正重要的不是你遭遇了什么，而是你记住了哪些事，又是如何铭记的。"
    ],
    notes: "魔幻现实主义的巅峰之作，布恩迪亚家族七代人的兴衰史。孤独是贯穿全书的主题，每个人物都在用自己的方式对抗或拥抱孤独。马尔克斯的叙事如同热带雨林般繁复而迷人。"
  }
];
