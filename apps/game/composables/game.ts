import {randomColor} from "../utils/color";


export type Option = {
    label: string,
    correct: boolean,
    hue: number,
    selected: boolean
}


export const useGame = () => {
    const router = useRouter()
    const players = useState('players',() => (["sing","jenny","Tai Keung","Hailey"]));
    const levels = useState('levels',() => ({
        'sing':{
            name:'阿星',
            description:'的夢想是成為一名海陸空宇宙探險家，請為他挑選三本能幫助他達成夢想的書。',
            success:'很好，你已經幫助阿星向着夢想行近一大步！',
            finish:"九本可以幫助你實踐夢想，成為一位海陸空宇宙探險家的好書：",
            intro:"夢想成為海陸空宇宙探險家",
            img:"/character/sing.png",
            subLevels:[
                {
                    answer:[
                        {
                            "label": "蛟龍潛海",
                            name: "蛟龍潛海",
                            "year": "2022",
                            "publisher": "中華教育",
                            "author": "鍾林姣",
                            "ebook": "https://hkpl.nblib.com/product/856",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3657297&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "南極企鵝北極熊：<br/>皇帝企鵝、北極熊和<br/>豎琴海豹的生態記錄",
                            "name": "南極企鵝北極熊：皇帝企鵝、北極熊和豎琴海豹的生態記錄",
                            "year": "2019",
                            "publisher": "天地圖書有限公司",
                            "author": "黃莉娜",
                            "ebook": "https://hkpl.nblib.com/product/1413",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3568311&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "能源保衞戰",
                            "name": "能源保衞戰",
                            "year": "2018",
                            "publisher": "中華教育",
                            "author": "宋海東工作室",
                            "ebook": "https://hkpl.nblib.com/product/1403",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3514438&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "label": "絲綢之路 : <br/>條條絲路通亞歐",
                            "name": "絲綢之路 : 條條絲路通亞歐",
                            "year": "2021",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "檀傳寶",
                            "ebook": "https://hkpl.nblib.com/product/1434",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3633747&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "三個人在南極尋找北極熊",
                            "name": "三個人在南極尋找北極熊",
                            "year": "2008",
                            "publisher": "天窗出版",
                            "author": "李孝良, 鄧展翔, 張偉賢",
                            "ebook": "https://joyread.club/book/6103fe5f18271b1fc98e4e63",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:2920006&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "足足五萬年",
                            "name": "足足五萬年",
                            "year": "2013",
                            "publisher": "皇冠出版社(香港)",
                            "author": "項明生",
                            "ebook": "https://joyread.club/book/6377d10c79a3ba001d1b9ed6",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3262927&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "label": "登山學做人",
                            "name": "登山學做人",
                            "year": "2021",
                            "publisher": "藍藍的天",
                            "author": "曾志成",
                            "ebook": "https://joyread.club/book/6377a0699b6ecd001cb5aa08",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3683704&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "活著回來：<br/>一個香港人由非洲出發的單車之旅",
                            "name": "活著回來：一個香港人由非洲出發的單車之旅",
                            "year": "2016",
                            "publisher": "一丁文化",
                            "author": "雷靖梵",
                            "ebook": "https://joyread.club/book/63779f6a9b6ecd001cb5a91d",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3454376&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "天問：宇宙真貌的探索",
                            "name": "天問：宇宙真貌的探索",
                            "year": "2017",
                            "publisher": "牛津大學出版社（中國）",
                            "author": "陳天機",
                            "ebook": "https://joyread.club/book/63775afcdbab8a0029809aee",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3256870&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        },
        'jenny':{
            name:'珍妮',
            description:"夢想在金融經濟方面發展，為大家創造財富，建構美好和豐足的生活。",
            success:'很好，你已經幫助珍妮向着夢想行近一大步！',
            finish:"九本可以幫助你實踐夢想，成為一位創富扶貧經濟學家的好書：",
            intro:"夢想成為金融經濟學家",
            img:"/character/jenny.png",
            subLevels:[
                {
                    answer:[
                        {
                            "label": "小理財大經濟：<br/>小學生的趣致財務智慧",
                            "name": "小理財大經濟：小學生的趣致財務智慧",
                            "year": "2020",
                            "publisher": "跨版生活圖書出版",
                            "author": "李雪熒，謝燕舞",
                            "ebook": "https://hkpl.nblib.com/product/1028",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3597897&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "理財能力大升級",
                            "name": "理財能力大升級",
                            "year": "2020",
                            "publisher": "新雅文化事業有限公司",
                            "author": "馮漢賢，黃書熙",
                            "ebook": "https://hkpl.nblib.com/product/777",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3608918&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "歷史裡的<br/>現代經濟學",
                            "name": "歷史裡的現代經濟學",
                            "year": "2019",
                            "publisher": "香港中和出版有限公司",
                            "author": "汪凌燕，汪通",
                            "ebook": "https://hkpl.nblib.com/product/702",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3572504&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "label": "人民幣國際化的新進展：<br/>香港交易所的離岸金融產品創新",
                            "name": "人民幣國際化的新進展：香港交易所的離岸金融產品創新",
                            "year": "2018",
                            "publisher": "商務印書館(香港)有限公司",
                            "author": "巴曙松 BaShusong",
                            "ebook": "https://hkpl.nblib.com/product/1424",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3528606&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "亂世黃金 ",
                            "name": "亂世黃金 ",
                            "year": "2021",
                            "publisher": "天窗出版",
                            "author": "林祖、平步青",
                            "ebook": "https://joyread.club/book/6476f25b06c771001db48a37",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3660911&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "獨步股壇：<br/>「投機之王」狙擊價格方程式",
                            "name": "獨步股壇：「投機之王」狙擊價格方程式",
                            "year": "2022",
                            "publisher": "天窗出版",
                            "author": "西‧李佛摩 (Jesse Livermore)",
                            "ebook": "https://joyread.club/book/6476f25b06c771001db48a35",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3668424&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "label": "新世代洞悉先機：<br/>曾淵滄投資七大智慧",
                            "name": "新世代洞悉先機：曾淵滄投資七大智慧",
                            "year": "2022",
                            "publisher": "天窗出版",
                            "author": "曾淵滄",
                            "ebook": "https://joyread.club/book/6476f25b06c771001db48a32",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3668356&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "發掘超強港股",
                            "name": "發掘超強港股",
                            "year": "2021",
                            "publisher": "天窗出版",
                            "author": "弩飛",
                            "ebook": "https://joyread.club/book/6476f8e506c771001db48a60",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3639439&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "股票勝經",
                            "name": "股票勝經",
                            "year": "2018",
                            "publisher": "天窗出版",
                            "author": "龔成",
                            "ebook": "https://joyread.club/book/6103fe5f18271b1fc98e4fd8",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3519118&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        },
        'Tai Keung':{
            name:'大強',
            description:"夢想進入數碼世界，利用AI人工智能，開拓元宇宙的無極限可能。",
            success:'很好，你已經幫助大強向着夢想行近一大步！',
            finish:"九本可以幫助你實踐夢想，成為一位Al人工智能專家的好書：",
            intro:"夢想成為AI人工智能專家",
            img:"/character/Tai Keung.png",
            subLevels:[
                {
                    answer:[
                        {
                            "label": "圖說元宇宙",
                            "name": "圖說元宇宙",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "須彌著 孫垚繪",
                            "ebook": "https://hkpl.nblib.com/product/1231",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3675000&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "元宇宙超入門",
                            "name": "元宇宙超入門",
                            "year": "2022",
                            "publisher": "商務印書館(香港)有限公司",
                            "author": "方軍  ",
                            "ebook": "https://hkpl.nblib.com/product/1045",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3683982&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "元宇宙. <br/>圖說元宇宙",
                            "name": "元宇宙. 圖說元宇宙",
                            "year": "2022",
                            "publisher": "三聯書店(香港)有限公司",
                            "author": "子彌實驗室  ",
                            "ebook": "https://hkpl.nblib.com/product/1265",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3680255&fromLocationLink=false&theme=WEB"
                        },
                        
                    ]
                },
                {
                    answer:[
                        {
                            "label": "科技發展與<br/>資訊素養",
                            "name": "科技發展與資訊素養",
                            "year": "2020",
                            "publisher": "天窗出版",
                            "author": "黃錦輝  ",
                            "ebook": "https://hkpl.nblib.com/product/728",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3679292&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "後就業社會：<br/>誰是科技貴族？誰的人工智能？",
                            "name": "後就業社會：誰是科技貴族？誰的人工智能？",
                            "year": "2018",
                            "publisher": "印象文字",
                            "author": "鄒崇銘, 韓江雪",
                            "ebook": "https://joyread.club/book/636cb33fb095e6002afa3c58",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3538362&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "我們的孩子<br/>可以比AI更聰明嗎？",
                            "name": "我們的孩子可以比AI更聰明嗎？",
                            "year": "2022",
                            "publisher": "紅出版 (青森文化)",
                            "author": "費以民博士",
                            "ebook": "https://joyread.club/book/6476c09406c771001db489b5",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3681317&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "label": "數碼力大提升",
                            "name": "數碼力大提升",
                            "year": "2020",
                            "publisher": "天窗出版",
                            "author": "湛家揚博士",
                            "ebook": "https://joyread.club/book/62ac504a745c424bd5a76a22",
                            "book": "https://webcat.hkpl.gov.hk/search/query?term_1=%E6%95%B8%E7%A2%BC%E5%8A%9B%E5%A4%A7%E6%8F%90%E5%8D%87&theme=WEB"
                        },
                        {
                            "label": "你未來就緒嗎？",
                            "name": "你未來就緒嗎？",
                            "year": "2019",
                            "publisher": "信報出版社",
                            "author": "鄧淑明",
                            "ebook": "https://joyread.club/book/63778d12301207001d0f5e9b",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3570570&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "STEM學習大策略：<br/>啟發孩子的科創思維",
                            "name": "STEM學習大策略：啟發孩子的科創思維",
                            "year": "2019",
                            "publisher": "皇冠出版社(香港)",
                            "author": "黃金耀",
                            "ebook": "https://joyread.club/book/6103fe5f18271b1fc98e4f44",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3575834&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        },
        'Hailey':{
            name:'希希',
            description:"夢想成為一位文化藝術創作人。",
            success:'很好，你已經幫助希希向着夢想行近一大步！',
            finish:"九本可以幫助你實踐夢想，成為一位文化藝術創作人的好書：",
            intro:"夢想成為文化藝術創作人",
            img:"/character/Hailey.png",
            subLevels:[
                {
                    answer:[
                        {
                            "label": "創作，你也能",
                            "name": "創作，你也能",
                            "year": "2020",
                            "publisher": "初文出版社",
                            "author": "蔡益懷",
                            "ebook": "https://hkpl.nblib.com/product/1193",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3596901&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "中華文化論衡",
                            "name": "中華文化論衡",
                            "year": "2022",
                            "publisher": "商務印書館(香港)有限公司",
                            "author": "杜若鴻",
                            "ebook": "https://hkpl.nblib.com/product/700",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3685630&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "城市如何文化",
                            "name": "城市如何文化",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "茹國烈",
                            "ebook": "https://hkpl.nblib.com/product/1141",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3679987&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "label": "水墨設計‧設計水墨：<br/>兩地三代創意三重奏",
                            "name": "水墨設計‧設計水墨：兩地三代創意三重奏",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "靳埭強",
                            "ebook": "https://hkpl.nblib.com/product/1139",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3685736&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "生活是設計的全部",
                            "name": "生活是設計的全部",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "高少康 林慧遠",
                            "ebook": "https://hkpl.nblib.com/product/1288",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3685255&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "日日好玩：<br/>玩好設計",
                            "name": "日日好玩：玩好設計",
                            "year": "2022",
                            "publisher": "三聯書店(香港)有限公司",
                            "author": "邱汛瑜",
                            "ebook": "https://hkpl.nblib.com/product/877",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3661476&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "label": "古典音樂十五講",
                            "name": "古典音樂十五講",
                            "year": "2021",
                            "publisher": "香港中文大學出版社",
                            "author": "李歐梵",
                            "ebook": "https://hkpl.nblib.com/product/813",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3502232&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "情迷現代主義",
                            "name": "情迷現代主義",
                            "year": "2019",
                            "publisher": "牛津大學出版社（中國）",
                            "author": "李歐梵",
                            "ebook": "https://joyread.club/book/63775afcdbab8a0029809b00",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3273703&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "label": "第四十五屆<br/>青年文學獎得獎作品集‧1，<br/>小說、新詩",
                            "name": "第四十五屆青年文學獎得獎作品集‧1，小說、新詩",
                            "year": "2021",
                            "publisher": "突破出版社",
                            "author": "青年文學獎協會",
                            "ebook": "https://joyread.club/book/637206822844e1002ac8ade3",
                            "book": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3632188&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        }
    }));

    const otherBooks = useState('otherBooks',() => [
        "微表情心理學：<br/>入門觀察攻略",
        "你是誰？我是誰？<br/>解讀人心的筆跡秘密",
        "好孕天天練",
        "香港談食錄：<br/>中餐百味",
        "給生活多一顆糖",
        "世界名人故事繪本",
        "不一樣的星級住家飯",
        "劍擊成就了我：<br/>奧運冠軍張家朗",
        "都市人的瑜伽：<br/>創造個人的療癒",
        "養生‧養顏：<br/>讓女人年輕10年的45個好習慣",
        "無難度燜燒杯料理",
        "小學生小食盒",
        "如果我養了一隻……",
       "阿媽這杯茶",
       "輕鬆點吧！",
        "瘦身，也要補身：<br/>60個低卡食譜",
        "Q小子<br/>笑話大全‧1",
        "父母這樣做，成就正面自信孩子！",
        "新丁潮爸湊仔奮戰手記",
        "運動陷阱",
        "壞姿勢：脊醫話你知30<br/>個最易被忽略的痛症元兇",
        "我不怕膽固醇",
        "人生悟語：<br/>劉再復新文體沉思錄‧<br/>卷2，紅樓悟語",
        "三國無常",
        "中國現代小說史",
        "人生悟語：<br/>劉再復新文體沉思錄‧<br/>卷1，三書悟語",
        "且聽下回分解",
    ]);

    const currentLevel = useState('currentLevel',() => "sing-0");

    
    const levelObject = computed(() => {
        const [level,subLevel] = currentLevel.value.split('-');
        return levels.value[level];
    });

    const subLevelNumber = computed(() => {
        const [level,subLevel] = currentLevel.value.split('-');
        return Number(subLevel);
    });
    const subLevelObject = computed(() => {
        const [level,subLevel] = currentLevel.value.split('-');
        return levels.value[level].subLevels[subLevel];
    });

    function isLastSubLevel():boolean {
        const [level,subLevel] = currentLevel.value.split('-');
        return Number(subLevel) === levels.value[level].subLevels.length -1;
    }
    function nextLevel(){
        const [level,subLevel] = currentLevel.value.split('-');
        if(subLevel < levels.value[level].subLevels.length - 1){
            currentLevel.value = `${level}-${Number(subLevel) + 1}`;
        }else {
            const nextLevel = players.value.indexOf(level) + 1;
            if(nextLevel < players.value.length){
                currentLevel.value = `${players.value[nextLevel]}-0`;
            }else {
                router.push({
                    path: '/booklist'
                })
                currentLevel.value = "sing-0";
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return [...array];
    }
    
    function makeSubLevelOptions() {
        // get all answer of current sublevel
        const answer:Option[] = subLevelObject.value.answer.map((answer) => {
            return {
                label: answer.label,
                correct: true,
                hue: randomColor(),
                selected: false,
            }
        });
        const randomNumber = Math.floor(Math.random() * otherBooks.value.length);
        // generate two random number between 0 to otherBooks.length

        
        // combine answer and otherBooks and shuffle
        return shuffle([...answer,
                {
                    label:otherBooks.value[randomNumber],
                    correct:false,
                    hue: randomColor(),
                    selected: false,
                },
                {
                    label:otherBooks.value[randomNumber + 1],
                    correct:false,
                    hue: randomColor(),
                    selected: false,
                }]
        );
    }

    function previousLevel(){
        const [level,subLevel] = currentLevel.value.split('-');
        if(subLevel > 0){
            currentLevel.value = `${level}-${Number(subLevel) - 1}`;
        }else {
            const previousLevel = players.value.indexOf(level) - 1;
            if(previousLevel >= 0){
                const [level,subLevel] = currentLevel.value.split('-');
                currentLevel.value = `${players.value[previousLevel]}-${levels.value[players.value[previousLevel]].subLevels.length - 1}`;
            }else {
                router.push({
                    path: '/'
                })
                currentLevel.value = "sing-0";
            }
        }
    }

    return {
        levels,
        levelObject,
        nextLevel,
        currentLevel,
        subLevelObject,
        otherBooks,
        makeSubLevelOptions,
        isLastSubLevel,
        subLevelNumber,
        previousLevel
    }
}