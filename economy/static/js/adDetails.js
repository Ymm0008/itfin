//广告内容
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).Format("yyyy-MM-dd");
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//所有数据
var articalList={};
// 部分数据
var articalList_part={};

var adcon=[
    {"wid": "214174409893181788", "last_modify": 1514385435.268779, "comments": "0", "rwwc": "\n", "user_id": "5448100650", "sentiment": -0.2282025605824013, "title": "empty", "usn": "银承派官方微博", "tp": "", "content": "​​​​预期年收益相当于银行活期的63倍、余某宝的6倍……银承派双11福利仍在继续，你有什么理由不来！[笑而不语][笑而不语][笑而不语]以下为活动传送门—— PC端：http://t.cn/RlEoGqj 移动端：http://t.cn/RlEoGqW ​​​​​", "source": "webo", "duplicate": false, "fintext": 1, "rwid": "-1", "publish_time": 1510740338, "rwpt": 0, "bp": "", "ad01": 1, "rwuid": "0", "url": "http://weibo.com/5448100650/FvdJXdlJa", "k": "", "ad123": 2, "pics": "[\"http://ww2.sinaimg.cn/thumbnail/005WHFR8gy1flixfcol5sj30h60dc0u3\",\"http://ww2.sinaimg.cn/thumbnail/005WHFR8gy1flixfck93gj30gy044t9c\",\"http://ww2.sinaimg.cn/thumbnail/005WHFR8gy1flixfckz3wj30hf06jq3q\"]"},
    {"duplicate": false, "publish_time": 1510309682, "sentiment": 0.2389020068693731, "title": "预期年收益相当于银行活期的63倍、余某宝的6倍……", "url": "http://weixin.sogou.com/api/share?timestamp=1510312169&signature=qIbwY*nI6KU9tBso4VCd8lYSesxOYgLcHX5tlbqlMR8N6flDHs4LLcFgRw7FjTAOg1DbdeYXwMFO0-jewrciWl2imRphC80MGkCsnOUTFoffhj3Y9TOQj6A8rGmwP2CYNlfK14vrRkVVAaX6hObSnkYEJA*pyEO5DgqLsX0gtsy7UpLE8WysQUzEwrNpvwQL5UmT*IRrjjORB68ENcxvsVgutLaFb4mw0fhS5n73PrA=", "abstract": "收益对比参照目前银行活期存款年利率0.35%、余某宝近一月平均收益率3.70%,参与银承派双11随机抽加息券活动,预期年收益相当...", "author": "银承派金服", "ad123": 2, "it": 1510312228, "comments": "-1", "content": " 五花八门的优惠活动、无孔不入的打折广告、狂轰滥炸的促销短信……预示着双11大战一触即发！国资参股的互联网金融平台“银承派”也强势加入本次火拼中，于 2017年11月9日至2017年11月26日，盛大举行 “火拼双11，您扫货我买单”活动，该活动将理财与购物相结合，旨在带领人们找到消费和理财的平衡点，促使双11从剁手节转化为护手节。 下面就让我们一起来看看本次银承派活动的几大亮点吧！亮点一：全民加息，周周福利！活动期间，银承派平台用户每周可随机领取加息红包1个，最多可领取 3个加息红包，单个红包加息高达 11%！ 据悉，目前银承派平台在无任何加息活动的情况下，标的预期年化利率就可高达11%， 如用户可在此次双11活动中抽到11%加息券，使用此券参与投资，预期年化则可高达22%！ 相当于投资10000元，一年可得到2200元收益！  收益对比 参照目前银行活期存款年利率0.35%、余某宝近一月平均收益率3.70%， 参与银承派双11随机抽加息券活动， 预期年收益相当于银行活期年收益的 63倍、余某宝年收益的 6倍左右！亮点二：狂砸现金，返现高达2996元！活动期间投资银承派平台“11.11专享”标且累计投资金额达标，即可兑换相应现金奖励或实物奖励，其中低门槛、高返利的现金奖励尤为引人注目！ 活动期内，在银承派累计投资达到2800元（除体验宝外）即可领返现，返现高达2996元！ 亮点三：百万好物，马上抱走！ 如果您不喜欢返现的简单粗暴，更偏爱扫货的痛快惬意，本次银承派的双11活动也必定是您的不二之选！  活动期间投资银承派平台“11.11专享”标，累投达标也可选择提走实物奖品， iPhone X、佳能单反相机、Prada钱包、阿玛尼时尚手表、小米高清液晶电视、家用静音折叠跑步机等涵盖科技、时尚、家居3大品类共27种精选商品等您免费兑换！ 银承派理财，助推双11回归理性 “双11”临近，预付定金、火炬红包、满减优惠券、花呗提额免息等花式营销，让不少网友感叹“学不好高数不敢应战双十一”！ 试想一下，当你为了用券，绞尽脑汁凑单；当你为了凑单，下单了一堆多余的东西，最终掏空钱包、欠下花呗……你是不是还觉得自己赚了呢？购物的美好，总是始于冲动、止于没钱！倒不如抓住双11理财优惠好时机，好好增进财富！ 银承派是中科院直属机构参股的国资系互联网金融平台，匠心打造供应链金融、消费金融为主的强大产品阵容，风控严密、稳健生息，存量标的到期100%兑付，可满足不同人群的理财需求。  今年双11，银承派火力全开，重磅福利吸引市场投资目光，助推双11回归理性。 2017年11月9日至26日 ，不妨来银承派投资享福利，让干瘪的钱包快速回血，轻松应战剁手季和年终挑战吧！ 我是文末分割线 更多精彩请猛戳右边二维码公众号IDyinchengpai2015 ▲向上滑动 长按右方二维码下载银承派理财APP►立即开启您的理财之旅——银承派—— 国资背景，中科院下属企业参股平台 | 新网银行资金存管| 广州市普惠金融协会理事单位  ", "source": "wechat", "last_modify": 1516046826.297461, "fintext": 1, "ad01": 1, "wxh": "银承派金服", "k": "活动 平台 理财 红包 加息 钱包 ", "sent": 2, "em0": 1},
    {"emotion": 1, "site_name": "百度贴吧", "pid": "c7f51e509edaa2c41aca635fe9f27fee\n", "it": "1508393917", "last_modify": 1516046842.898195, "sentiment": 0.03519687935973889, "title": "我们悄悄更新一大波功能，并给你塞了笔钱！", "comments": 0, "content": " 这年头做金融真是太难了 多项技能加持 明明是小仙女、小鲜肉 却时时刻刻****子的心 最近，连程序猿小哥们 都被虐得寂寞如雪 个个不仅代码写得666 各种段子也是信手拈来 这两天 在程序猿小哥们的集体努力下 银承派理财APP又更新了一波 （版本2.0.4） 而最震惊小银的是—— 这次他们居然把新功能介绍 写成了打油诗…… 看到这个 小银我只想给他们一人一个么么哒 并且严重警告他们 “不要和我抢饭碗！” 不仅如此 这群被计算机耽误的段子手们 还乘机上线了最新微官网 是的！银承派微官网 终于终于满血复活了 以后大家来银承派投资更方便了 用微信也能投资！！！ 一大波更新来袭 用户体验扎堆优化 这一次，必须滴 为程序猿小哥哥们疯狂打call 除了用户体验更加优化外 这次，我们也炸出了最新福利！ 2017年10月17日15:00起 新一波“理财师”返利来袭！ 福利见证诚意！ 邀请壕友礼更多 银粉们燥起来 马上就来银承派邀壕友领返现吧！ ", "source": "forum", "duplicate": false, "em0": 1, "fid": "3159e84386692cfabf63ad788f", "fintext": 1, "publish_time": 1508317380, "board_name": "银承派吧", "ad01": 1, "url": "http://tieba.baidu.com/p/5378732583", "k": "程序 来袭 福利 返利 优化 ", "author": "银承派平台", "ad123": 2, "kv": "(程序)[3] (来袭)[2] (福利)[2] (返利)[1] (优化)[2] (用户)[2] (更新)[2] (理财)[2] (银粉)[1] (最新)[2] (小银)[1] (打油诗)[1] (鲜肉)[1] (段子)[1] (时时刻刻)[1] (仙女)[1] (扎堆)[1] (饭碗)[1] (见证)[1] (诚意)[1] (不仅如此)[1] (年头)[1] (上线)[1] (技能)[1] (寂寞)[1] (耽误)[1] (投资)[2] (震惊)[1] (版本)[1] (警告)[1] (代码)[1] (计算机)[1] (疯狂)[1] (集体)[1] (方便)[1] (努力)[1] (介绍)[1] (功能)[1] (严重)[1] (金融)[1] (银承派)[4] (猿小哥)[2] (微官网)[2] (壕友)[1] ( 写)[1] (领返)[1] (雪 )[1] ( 小银)[1] (滴 )[1] (满血复活)[1] (段子手)[1] (信手拈来 )[1] (心 )[1] (微信)[1] (哒 )[1] (外 )[1] (壕友礼)[1] "},
    {"content": " 学生时代 倒数第一的都是坏学生 可放到现在可不一定 第一并不一定是一件好事 毕竟中国财富排名第一的大佬 一个说自己“一无所有” 来源见水印 一个说自己“根本没有时间花钱” 来源见水印 而现在，在银承派 做倒数第一还能拿现金！ 笔笔返现，就等你来！ 有时包尾并不是一种落后 而是另一种形式的厚积薄发 毕竟关键人物总是最后才出现的 看准时机，最后下手 才是真正的高手！ 你包尾，我买单 返现速速拿好！ 活动明天0点就正式开始啦~~ 老铁们可千万别错过了 准备好银子耍起来吧~~~ ", "publish_time": 1506737220, "site_name": "百度贴吧", "sentiment": -0.02122134882290887, "title": "倒数第一的童鞋，如今天天躺着赚钱！咋办到的？", "url": "http://tieba.baidu.com/p/5348399721", "ad123": 2, "k": "倒数 学生 来源 速速 大佬 ", "author": "银承派平台", "pid": "8d5fbeb2076e6605baa9e16f8fb934af\n", "it": "1506770049", "comments": 0, "board_name": "银承派吧", "source": "forum", "last_modify": 1516046842.951101, "kv": "(倒数)[2] (学生)[2] (来源)[2] (速速)[1] (大佬)[1] (一无所有)[1] (花钱)[1] (错过)[1] (高手)[1] (放到)[1] (好事)[1] (现金)[1] (落后)[1] (排名)[1] (银子)[1] (财富)[1] (关键)[1] (人物)[1] (时代)[1] (正式)[1] (形式)[1] (准备)[1] (活动)[1] (中国)[1] (包尾)[2] (水印 )[2] ( 老铁)[1] (厚积薄发 )[1] (下手 )[1] (银承派)[1] (返现)[1] (准时机)[1] ( 笔笔)[1] (单 )[1] ", "fid": "3159cf7c6b692cfabf637451e2", "ad01": 1, "em0": 1, "duplicate": false, "fintext": 1},
    {"content": "银承派：你的话费我来买！活动门槛低至100元！！李笑来老师的《把时间当作朋友》这本书提出过一个观点：想要实现财务自由，就必须要有“睡后收入”。「睡后收入」，即「被动收入」。我们必须工作才能有的收入叫做“主动收入”，多劳多得；而“睡后收入”就相当于躺着也赚钱，哪怕你在睡大觉，仍然能持续创造收益。我想，这大概是所有自由职业者的终极目标吧。增加“睡后收入”不是梦！2017年7月6日—7月20日，来银承派投资，除了能够增值财富外，还可以领取额外的话费奖励，活动门槛低至100元！邀请好友来投资，话费奖励无上限！首投领话费，投100送10元不限注册时间，用户在活动期间首次投资银承派平台非体验标产品满100元，即可领取10元话费奖励！结合近段时间银承派平台推出的新手活动，新用户一注册就能获得由平台赠送的3888元新手大礼包！也就是说，参与本次活动进行注册并投资的用户，能够一下子领走“红包+话费”双重福利，可谓相当诱人！友你不无聊：邀请好友，话费奖励无上限！不限邀请时间，受邀好友在活动期间首次投资银承派平台非体验宝产品满100元，邀请人可领取10元话费，上不封顶，多邀多得！同时，邀请人还可获得一张1%加息券，每位邀请人可通过此活动最高累计获得3张1%加息券。举个例子：1.会员小A在活动期间首投100元，并邀请60个好友在活动期间各首投100元，60个好友各获10元话费奖励，会员小A可获得话费：首投奖励10元话费+60个邀请人*10元话费= 610元话费，另获3张1%加息券奖励；2.会员小B在活动期间未投资，但其邀请的60个好友在活动期间各首投100元，60个好友各获10元话费奖励，会员小B可获得话费：60个邀请人*10元话费= 600元话费，另获3张1%加息券奖励。除了可以获得话费和加息券奖励外，邀请人还将获得银承派平台的理财师专属福利！结合银承派“理财师”活动规则，平台会员邀请好友投资成功后，就能晋升为平台“理财师”，未来好友的每一笔投资，您都能进账！一旦好友投资的标的满标放款，邀请人立即获得相应提成，提成比例为好友所投标的的年化1.5%收益（好友投资10000元、3个月的产品，您可以领取10000*1.5%*90/360=37.5元收益）！上月，互联网金融整改延期的消息终于被官方正式确定了，整改期限延长到2018年6月底完成。合规之路任重道远，行业监管逐步细化，优质平台成为了广大投资者顺理成章的选择。经过两年多的努力，银承派已经逐渐成长为广州地区具有代表性的互联网票据金融服务平台，取得了一系列卓有成效的建树。银承派此次的“投资送话费”活动，旨在给予投资人实打实的福利的同时，引导大家树立正确的理财观！2017年7月6日至7月20日，银承派约定您，不见不散！", "publish_time": 1499409720, "site_name": "网贷天眼", "sentiment": 0.2448398757190813, "title": "银承派：你的话费我来买！活动门槛低至100元！！", "ad123": 2, "k": "话费 好友 奖励 活动 平台 投资 ", "author": "银承派", "pid": "02a6bf01e069915c93ce102aef37e3ee47", "it": 1499597161, "comments": 0, "board_name": "网贷天眼-平台声音", "source": "bbs", "last_modify": 1514385433.558735, "u": "http://www.p2peye.com/forum.php?mod=viewthread&tid=1863069&extra=page%3D2%26filter%3Dlastpost%26orderby%3Dlastpost", "kv": "(话费)[19];(好友)[12];(奖励)[10];(活动)[13];(平台)[9];(投资)[11];(获得)[8];(会员)[5];(收入)[7];(领取)[4];(理财师)[3];(福利)[3];(注册)[3];(用户)[3];(新手)[2];(提成)[2];(整改)[2];(收益)[3];(门槛)[2];(互联网)[2];(产品)[3];(不见不散)[1];(多劳多得)[1];(结合)[2];(大礼包)[1];(自由职业者)[1];(进账)[1];(任重道远)[1];(金融)[2];(实打实)[1];(封顶)[1];(银承派)[10];(红包)[1];(卓有成效)[1];(放款)[1];(终极)[1];(顺理成章)[1];(建树)[1];(晋升)[1];(合规)[1];(诱人)[1];(细化)[1];(投标)[1];(赠送)[1];(延期)[1];(树立)[1];(增值)[1];(代表性)[1];(标的)[1];(票据)[1];(投资人)[1];(旨在)[1];(赚钱)[1];(约定)[1];(财务)[1];(例子)[1];(可谓)[1];(官方)[1];(延长)[1];(当作)[1];(邀请人)[7];(引导)[1];(期限)[1];(理财)[1];(规则)[1];(叫做)[1];(正确)[1];(老师)[1];(财富)[1];(主动)[1];(给予)[1];(成长)[1];(累计)[1];(努力)[1];(监管)[1];(广州)[1];(自由)[1];(相应)[1];(朋友)[1];(观点)[1];(创造)[1];(推出)[1];(相当)[1];(比例)[1];(服务)[1];(取得)[1];(成功)[1];(目标)[1];(正式)[1];(选择)[1];(最高)[1];(消息)[1];(完成)[1];(持续)[1];(提出)[1];(实现)[1];(行业)[1];(增加)[1];(地区)[1];(投资者)[1];(具有)[1];(工作)[1];(进行)[1];(加息券)[3];(息券)[2];(无上限)[2];(不无聊)[1];(年化)[1];(满标)[1];(李笑来)[1];", "ad01": 1, "duplicate": false, "fintext": 1},
    {"content": "向党的生日献礼！来银承派投资，轻松领走千元现金九十六年峥嵘岁月，九十六年披荆斩棘，九十六年翻天覆地，九十六年春华秋实，2017年7月1日，我们即将迎来党的96岁生日。在七一建党节前夕，银承派特意筹备了七一专题理财活动，解放投资人的钱袋子！2017年7月1日至10日，来银承派投资，可以领现金、赚加息，让大家感受到互联网金融的发展对民生、经济的贡献和影响，用丰硕的普惠金融成果向党的96岁华诞献礼！连续十天加息，投资享更高回报七一“建党节”到来之际，银承派首先送出了重磅加息福利，以递增的收益，展现互金企业的“正”能量。　2017年7月1日至10日活动期间，银承派平台消费金融、票据金融新上标的一律加息0.5%。如：消费金融原年化利率为11%，则活动期间，该标的加息0.5%，调整为11.5%（11%+0.5%=11.5%）。投资送现金，最高可获1080元同时，在此次的活动中，银承派还将送出吸睛的现金福利！活动期间，投资银承派40天及以上理财产品，累计年化投资金额（以实际支付金额为准）累计达到2500元，奖励90元现金；达到1万元，奖励360元现金；达到2万元，奖励720元现金；达到3万元，即可领取1080元现金。年化投资金额=投资金额*投资期限（天）/360，举例子：小明在活动期间投资银承派90天理财产品48000元，使用了200元红包，则实际支付金额为47800元，年化投资金额为47800*90/360=11950元，根据活动规则小明将获得现金奖励360元。主动提质增效，助力夯实普惠金融基石此次，银承派借着建党节推出重磅福利，旨在回馈广大投资人的支持，引导大家树立正确的理财观，展示“开放、共享、安全、便捷”的互联网金融服务形象！同时，作为广州市普惠金融行业协会首批理事单位，银承派认为，发展普惠金融不仅仅是一个金融问题、经济问题，也是一个社会民生问题。互金行业要做到心存敬畏，不碰底线，不踩红线，不越雷池，清清白白树形象，兢兢业业耕好资产甄别、资金安全、科技风控、信息纰漏、督查考评等的每一块“责任土”，主动提质增效，助力夯实普惠金融基石。未来，银承派将继续以“产品精品化、服务精细化、队伍专业化”的标准严格要求自己。讲实话，办实事，求实效，与广大金融行业的同仁一起，推进全行业合规发展，带动金融服务惠及民生，促进可持续发展！", "publish_time": 1498896900, "site_name": "网贷天眼", "sentiment": 0.4435442612557577, "title": "向党的生日献礼！来银承派投资，轻松领走千元现金", "ad123": 2, "k": "金融 现金 普惠 投资 金额 活动 ", "author": "银承派", "pid": "028ea0e700951f1a1e6bd79a8a98d66d00", "it": 1499152068, "comments": 0, "board_name": "网贷天眼-平台声音", "source": "bbs", "last_modify": 1514386723.397585, "u": "http://www.p2peye.com/forum.php?mod=viewthread&tid=1860091&extra=page%3D1%26filter%3Dlastpost%26orderby%3Dlastpost", "kv": "(金融)[13];(现金)[9];(普惠)[5];(投资)[11];(金额)[6];(活动)[7];(加息)[5];(奖励)[4];(福利)[3];(小明)[2];(增效)[2];(献礼)[2];(理财)[3];(重磅)[2];(行业)[4];(达到)[4];(基石)[2];(夯实)[2];(助力)[2];(生日)[2];(投资人)[2];(民生)[2];(发展)[4];(互联网)[2];(产品)[3];(形象)[2];(精品化)[1];(主动)[2];(峥嵘岁月)[1];(支付)[2];(累计)[2];(越雷池)[1];(春华秋实)[1];(披荆斩棘)[1];(安全)[2];(银承派)[11];(服务)[2];(纰漏)[1];(实际)[2];(消费)[2];(考评)[1];(到来之际)[1];(督查)[1];(丰硕)[1];(华诞)[1];(翻天覆地)[1];(甄别)[1];(兢兢业业)[1];(实效)[1];(红包)[1];(精细化)[1];(同仁)[1];(回馈)[1];(袋子)[1];(敬畏)[1];(实事)[1];(合规)[1];(递增)[1];(底线)[1];(便捷)[1];(理事)[1];(专业化)[1];(专题)[1];(共享)[1];(筹备)[1];(实话)[1];(领取)[1];(展现)[1];(广州市)[1];(树立)[1];(标的)[1];(票据)[1];(旨在)[1];(展示)[1];(经济)[2];(轻松)[1];(解放)[1];(感受)[1];(回报)[1];(迎来)[1];(引导)[1];(成果)[1];(期限)[1];(开放)[1];(队伍)[1];(规则)[1];(能量)[1];(正确)[1];(协会)[1];(平台)[1];(带动)[1];(严格)[1];(责任)[1];(贡献)[1];(科技)[1];(利率)[1];(推进)[1];(推出)[1];(促进)[1];(标准)[1];(收益)[1];(单位)[1];(信息)[1];(连续)[1];(最高)[1];(资产)[1];(持续)[1];(获得)[1];(调整)[1];(要求)[1];(使用)[1];(资金)[1];(企业)[1];(年化)[4];(认为)[1];(提质)[2];(互金)[2];(吸睛)[1];(党节)[1];(风控)[1];(社会民生)[1];(服务惠)[1];(理财观)[1];(举例子)[1];", "ad01": 1, "duplicate": false, "fintext": 1}
]
function adContent(data) {
    $('.billContent p.load').show();
    var tag='#billing'.toString().substring(1);
    $('#billing').bootstrapTable('load', data);
    $('#billing').bootstrapTable({
        data:data,
        search: false,//是否搜索
        pagination: true,//是否分页
        pageSize: 5,//单页记录数
        pageList: [15,20,25],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:false,
        sortName:'bci',
        sortOrder:"desc",
        columns: [
            {
                title: "",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    var publisTime = getLocalTime(row.publish_time);
                    var contentClip,blocknot='none';
                    if(row.content.length >= 200){
                        contentClip = row.content.slice(0,200)+'  ...';
                        articalList_part[tag+'_'+index] = contentClip;
                        blocknot='inline-block';
                    }else{
                        contentClip = row.content;
                        articalList_part[tag+'_'+index] = contentClip;
                    }
                    // 所有的数据
                    articalList[tag+'_'+index] = row.content;
                    // 煽动性
                    var inflammatory;
                    if(row.ad123 == 1){
                        inflammatory = '无';
                    }else if(row.ad123 ==2){
                        inflammatory = '一般';
                    }else if(row.ad123 ==3){
                        inflammatory = '强';
                    }else{
                        inflammatory = '未知';
                    }
                    // 渠道
                    var source;
                    if(row.source == 'wechat'){
                        source = '微信';
                    }else if(row.source =='zhihu'){
                        source = '知乎';
                    }else if(row.source =='bbs'){
                        source = '论坛';
                    }else if(row.source =='webo'){
                        source = '微博';
                    }else if(row.source =='forum'){
                        source = '贴吧';
                    }else{
                        source = '未知';
                    }
                    // 原网页链接
                    var url='';
                    if(row.url){
                        url = row.url;
                    }else{
                        url = row.u;
                    }
                    return '<div class="inforContent">'+
                        '            <div class="main">'+
                        '                <img src="/static/images/textIcon.png" class="textFlag" style="top:8px;">'+
                        '                <p class="option">'+
                        '                    <span>煽动性：<b style="color: #ff6d70;font-size:14px;">'+inflammatory+'</b></span>'+
                        '                    <span>广告渠道：<b style="color: #ff6d70;font-size:14px;">'+source+'</b></span>'+
                        '                    <span>发布时间：<b style="color: #ff6d70;font-size:14px;">'+publisTime+'</b></span>'+
                        '   <button onclick="getAllArtical(\''+tag+'_'+index+'\')" artical=\"'+tag+'_'+index+'\" class="original btn-primary btn-xs" style="display:'+blocknot+'">查看全文</button>'+
                        '                </p>'+
                        '                <p class="context">'+contentClip+'</p>'+
                        '                <a href="'+url+'" title="原网页链接" target="_blank">原网页链接</a>            '+
                        '            </div>'+
                        '        </div>';
                }
            },
        ],
    });
    $('.billContent p.load').slideUp(300);
}
adContent(adcon)
// 切换全文和部分数据
function getAllArtical (_id) {
    var nowText = $("button[artical = "+ _id +"]").text();
    $("button[artical = "+ _id +"]").parents('.main').find('.context').text(articalList[_id]);
    $("button[artical = "+ _id +"]").text('收起');
    if(nowText == '收起'){
        $("button[artical = "+ _id +"]").parents('.main').find('.context').text(articalList_part[_id]);
        $("button[artical = "+ _id +"]").text('查看全文');
    }
}
//广告态势
function line() {
    var myChart = echarts.init(document.getElementById('billing_diagram'));
    var option = {
        backgroundColor:'transparent',
        title: {
            text: '广告发布数',
            x: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: '5%',
            right: '7%',
            top:'11%',
            containLabel: true
        },
        xAxis: [{
            name:'时间',
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    width:'2'
                }
            },
            axisLabel: {
                rotate:90,
                textStyle: {
                    fontWeight:'700'
                }
            },
            data: ['2017-12-1','2017-12-2','2017-12-3','2017-12-4','2017-12-5','2017-12-6','2017-12-7'],
        }],
        yAxis: [
            {
                name:'数量',
                type: 'value',
                axisTick: {
                    show: true
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14,
                        fontWeight:'700',
                    }
                }
            }
        ],
        series: [
            {
                name: '总数量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        areaStyle: {type:'default'},
                    }
                },
                data: [22, 26, 24, 22, 33, 43, 29],
            },
            {
                name: '一般煽动性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        areaStyle: {type:'default'},
                    }
                },
                data: [11, 11, 15, 13, 12, 13, 10],
            },
            {
                name: '强煽动性',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2,
                    }
                },
                itemStyle: {
                    normal: {
                        areaStyle: {type:'default'},
                    }
                },
                data: [10, 7, 9, 5, 8, 11, 4],
            }
        ]
    };
    myChart.setOption(option);
};
line();
//广告渠道和广告煽动性
function pieNum(classname,data) {
    var h=[];
    $.each(data,function (index,item) {
        h.push(item.name);
    })
    var myChart = echarts.init(document.getElementById(classname));
    var option = {
        backgroundColor:'transparent',
        title : {
            text: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: h
        },
        series : [
            {
                name: '发布者',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:data,
                label: {
                    normal:{
                        show: true,
                        position:'inner',
                        formatter: "{b} {d}%",
                        textStyle: {
                            fontWeight:'bolder',
                            fontSize : '12',
                            color:'#fff'
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}
var a2=[{name:'强煽动性',value:'200'},{name:'一般煽动性',value:'400'},{name:'无煽动性',value:'700'}];
var a1=[{name:'微博',value:'200'},{name:'微信',value:'400'},{name:'知乎',value:'700'},
    {name:'贴吧',value:'400'},{name:'论坛',value:'700'}];
pieNum('road',a1);
setTimeout(function () {
    pieNum('incite',a2);
},1000);
function sevenRankPie(classname,tit,data) {
    var myChart = echarts.init(document.getElementById(classname));
    var option = {
        backgroundColor:'transparent',
        title : {
            text: tit,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: h
        // },
        series : [
            {
                name: '发布者',
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:data,
                label: {
                    normal:{
                        show: true,
                        position:'inner',
                        formatter: "{b} {d}%",
                        textStyle: {
                            fontWeight:'bolder',
                            fontSize : '12',
                            color:'#fff'
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}
sevenRankPie('top-1','微博',a2);
sevenRankPie('top-2','微信',a2);
sevenRankPie('bot-3','贴吧',a2);
sevenRankPie('bot-4','知乎',a2);
sevenRankPie('bot-5','论坛',a2);