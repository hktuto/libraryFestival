import {randomColor} from "../utils/color";


export type Option = {
    labelHK: string,
    labelEN: string,
    name: string,
    correct: boolean,
    hue: number,
    selected: boolean
}


export const useGame = () => {
    const router = useRouter()
    const players = useState('players',() => (["sing","jenny","Tai Keung","Hailey"]));
    const {currentLang} = useLang({})
    const levels = useState('levels',() => ({
        'sing':{
            nameHK:'阿星',
            nameEN:'Sing',
            descriptionHK:'的夢想是成為一名海陸空宇宙探險家，請為他挑選三本能幫助他達成夢想的書。',
            descriptionEN:' dream is to become an adventurer travelling from land, sea, air and space. Please assist him to pick 3 books that help him achieve his dream.',
            successHK:'很好，你已經幫助阿星向着夢想行近一大步！',
            successEN:'Very good, you have done a great favour to Sing!',
            finishHK:"九本可以幫助你實踐夢想，成為一位海陸空宇宙探險家的書籍：",
            finishEN:"Nine books that can help you achieve your dream and become an adventurer travelling from land, sea, air and space:",
            introHK:"夢想成為海陸空宇宙探險家",
            introEN:"Dream of becoming an adventurer travelling from land, sea, air and space.",
            img:"/character/sing.png",
            subLevels:[
                {
                    answer:[
                        {
                            "labelHK": "蛟龍潛海",
                            "labelEN": "Meet the Oceans",
                            "nameHK": "蛟龍潛海",
                            "nameEN": "Meet the Oceans",
                            "year": "2022",
                            "publisher": "中華教育",
                            "author": "鍾林姣",
                            "ebookHK": "https://hkpl.nblib.com/product/856",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-ocean/page-1/5837620",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3657297&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3631848&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "南極企鵝北極熊：<br/>皇帝企鵝、北極熊和<br/>豎琴海豹的生態記錄",
                            "labelEN": "How to Go Anywhere (And Not Get Lost) : A Guide to Navigation for Young Adventurers",
                            "nameHK": "南極企鵝北極熊：皇帝企鵝、北極熊和豎琴海豹的生態記錄",
                            "nameEN": "How to Go Anywhere (And Not Get Lost) : A Guide to Navigation for Young Adventurers",
                            "year": "2019",
                            "publisher": "天地圖書有限公司",
                            "author": "黃莉娜",
                            "ebookHK": "https://hkpl.nblib.com/product/1413",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-explore%20in%20sky/page-1/4906006",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3568311&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3648631&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "能源保衞戰",
                            "labelEN": "Explorers of the Coldest Places <br/>on Earth",
                            "nameHK": "能源保衞戰",
                            "nameEN": "Explorers of the Coldest Places on Earth",
                            "year": "2018",
                            "publisher": "中華教育",
                            "author": "宋海東工作室",
                            "ebookHK": "https://hkpl.nblib.com/product/1403",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-explore/page-1/5240696",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3514438&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3646399&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "絲綢之路 : <br/>條條絲路通亞歐",
                            "labelEN": "A Journey in Antarctica : Exploring the Future of the White Continent",
                            "nameHK": "絲綢之路 : 條條絲路通亞歐",
                            "nameEN": "A Journey in Antarctica : Exploring the Future of the White Continent",
                            "year": "2021",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "檀傳寶",
                            "ebookHK": "https://hkpl.nblib.com/product/1434",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-explore%20the%20sea/page-1/8771617",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3633747&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3682491&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "三個人在南極尋找北極熊",
                            "labelEN": "Spaced Out",
                            "nameHK": "三個人在南極尋找北極熊",
                            "nameEN": "Spaced Out",
                            "year": "2008",
                            "publisher": "天窗出版",
                            "author": "李孝良, 鄧展翔, 張偉賢",
                            "ebookHK": "https://joyread.club/book/6103fe5f18271b1fc98e4e63",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-space/page-1/4709749",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:2920006&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3570486&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "足足五萬年",
                            "labelEN": "Explorers of the Remotest Places on Earth",
                            "nameHK": "足足五萬年",
                            "nameEN": "Explorers of the Remotest Places on Earth",
                            "year": "2013",
                            "publisher": "皇冠出版社(香港)",
                            "author": "項明生",
                            "ebookHK": "https://joyread.club/book/6377d10c79a3ba001d1b9ed6",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-ocean/page-1/5240700",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3262927&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3645651&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "登山學做人",
                            "labelEN": "World's Strangest Ocean Beasts",
                            "nameHK": "登山學做人",
                            "nameEN": "World's Strangest Ocean Beasts",
                            "year": "2021",
                            "publisher": "藍藍的天",
                            "author": "曾志成",
                            "ebookHK": "https://joyread.club/book/6377a0699b6ecd001cb5aa08",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-ocean/page-1/4231607",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3683704&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3526275&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "活著回來：<br/>一個香港人由非洲出發的單車之旅",
                            "labelEN": "Jungle : <br/>A Harrowing True Story of Survival in the Amazon",
                            "nameHK": "活著回來：一個香港人由非洲出發的單車之旅",
                            "nameEN": "Jungle : A Harrowing True Story of Survival in the Amazon",
                            "year": "2016",
                            "publisher": "一丁文化",
                            "author": "雷靖梵",
                            "ebookHK": "https://joyread.club/book/63779f6a9b6ecd001cb5a91d",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-Mount%20Everest/page-1/3314368",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3454376&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3448481&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "天問：宇宙真貌的探索",
                            "labelEN": "Braver than You Think : <br/>Around the World on the Trip of My (Mother's) Life",
                            "nameHK": "天問：宇宙真貌的探索",
                            "nameEN": "Braver than You Think : Around the World on the Trip of My (Mother's) Life",
                            "year": "2017",
                            "publisher": "牛津大學出版社（中國）",
                            "author": "陳天機",
                            "ebookHK": "https://joyread.club/book/63775afcdbab8a0029809aee",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-explore%20world/page-1/4887469",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3256870&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3608152&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        },
        'jenny':{
            nameHK:'珍妮',
            nameEN:'Jenny',
            descriptionHK:"夢想在金融經濟方面發展，為大家創造財富，建構美好和豐足的生活。請為她挑選三本能幫助她達成夢想的書。",
            descriptionEN:" dream is to enter the financial sector to create wealth, and develop desirable and adequate standards of living for people. Please assist her to pick 3 books that help her achieve her dream.",
            successHK:'很好，你已經幫助珍妮向着夢想行近一大步！',
            successEN:'Very good, you have done a great favour to Jenny!',
            finishHK:"九本可以幫助你實踐夢想，成為一位創富扶貧經濟學家的書籍：",
            finishEN:"Nine books that can help you achieve your dream and become an economist:",
            introHK:"夢想成為金融經濟學家",
            introEN:"Dream of becoming an economist.",
            img:"/character/jenny.png",
            subLevels:[
                {
                    answer:[
                        {
                            "labelHK": "小理財大經濟：<br/>小學生的趣致財務智慧",
                            "labelEN": "Unknown Market Wizards : The Best Traders You've Never Heard of",
                            "nameHK": "小理財大經濟：小學生的趣致財務智慧",
                            "nameEN": "Unknown Market Wizards : The Best Traders You've Never Heard of",
                            "year": "2020",
                            "publisher": "跨版生活圖書出版",
                            "author": "李雪熒，謝燕舞",
                            "ebookHK": "https://hkpl.nblib.com/product/1028",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-stock/page-1/6116893",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3597897&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3634339&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "理財能力大升級",
                            "labelEN": "Your Money Mentors : Expert Advice for Millennials ",
                            "nameHK": "理財能力大升級",
                            "nameEN": "Your Money Mentors : Expert Advice for Millennials ",
                            "year": "2020",
                            "publisher": "新雅文化事業有限公司",
                            "author": "馮漢賢，黃書熙",
                            "ebookHK": "https://hkpl.nblib.com/product/777",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-financial/page-1/8330195",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3608918&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3665231&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "歷史裡的<br/>現代經濟學",
                            "labelEN": "I Will Teach You to Be Rich",
                            "nameHK": "歷史裡的現代經濟學",
                            "nameEN": "I Will Teach You to Be Rich",
                            "year": "2019",
                            "publisher": "香港中和出版有限公司",
                            "author": "汪凌燕，汪通",
                            "ebookHK": "https://hkpl.nblib.com/product/702",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-financial/page-1/4264656",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3572504&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3000980&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "人民幣國際化的新進展：<br/>香港交易所的離岸金融產品創新",
                            "labelEN": "Happy Go Money : Spend Smart, Save Right & Enjoy Life",
                            "nameHK": "人民幣國際化的新進展：香港交易所的離岸金融產品創新",
                            "nameEN": "Happy Go Money : Spend Smart, Save Right & Enjoy Life",
                            "year": "2018",
                            "publisher": "商務印書館(香港)有限公司",
                            "author": "巴曙松 BaShusong",
                            "ebookHK": "https://hkpl.nblib.com/product/1424",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-Financial%2C%20Economic/page-1/4484818",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3528606&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3560101&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "亂世黃金",
                            "labelEN": "The Economic Weapon : The Rise of Sanctions As a Tool of Modern War",
                            "nameHK": "亂世黃金",
                            "nameEN": "The Economic Weapon : The Rise of Sanctions As a Tool of Modern War",
                            "year": "2021",
                            "publisher": "天窗出版",
                            "author": "林祖、平步青",
                            "ebookHK": "https://joyread.club/book/6476f25b06c771001db48a37",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-Economics/page-1/8047705",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3660911&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3696654&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "獨步股壇：<br/>「投機之王」狙擊價格方程式",
                            "labelEN": "Money Changes Everything : How Finance Made Civilization Possible",
                            "nameHK": "獨步股壇：「投機之王」狙擊價格方程式",
                            "nameEN": "Money Changes Everything : How Finance Made Civilization Possible",
                            "year": "2022",
                            "publisher": "天窗出版",
                            "author": "西‧李佛摩 (Jesse Livermore)",
                            "ebookHK": "https://joyread.club/book/6476f25b06c771001db48a35",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-Economics/page-1/3274660",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3668424&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3501513&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "新世代洞悉先機：<br/>曾淵滄投資七大智慧",
                            "labelEN": "Reading Financial Reports For Dummies",
                            "nameHK": "新世代洞悉先機：曾淵滄投資七大智慧",
                            "nameEN": "Reading Financial Reports For Dummies",
                            "year": "2022",
                            "publisher": "天窗出版",
                            "author": "曾淵滄",
                            "ebookHK": "https://joyread.club/book/6476f25b06c771001db48a32",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-Financial%2C%20Economic/page-1/8817103",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3668356&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3677207&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "發掘超強港股",
                            "labelEN": "How Rich People Think",
                            "nameHK": "發掘超強港股",
                            "nameEN": "How Rich People Think",
                            "year": "2021",
                            "publisher": "天窗出版",
                            "author": "弩飛",
                            "ebookHK": "https://joyread.club/book/6476f8e506c771001db48a60",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-Financial%2C%20Economic/page-1/4812666",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3639439&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3590977&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "股票勝經",
                            "labelEN": "Trend Following : How to Make a Fortune in Bull, Bear and Black Swan Markets",
                            "nameHK": "股票勝經",
                            "nameEN": "Trend Following : How to Make a Fortune in Bull, Bear and Black Swan Markets",
                            "year": "2018",
                            "publisher": "天窗出版",
                            "author": "龔成",
                            "ebookHK": "https://joyread.club/book/6103fe5f18271b1fc98e4fd8",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-stock/page-1/2988272",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3519118&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3474413&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        },
        'Tai Keung':{
            nameHK:'大強',
            nameEN:'Tai Keung',
            descriptionHK:"夢想進入數碼世界，利用AI人工智能，開拓元宇宙的無極限可能。請為他挑選三本能幫助他達成夢想的書。",
            descriptionEN:" dream is to enter the digital world, and utilise artificial intelligence to access the infinite possibilities of metaverse. Please assist him to pick 3 books that help him achieve his dream.",
            successHK:'很好，你已經幫助大強向着夢想行近一大步！',
            successEN:'Very good, you have done a great favour to Tai Keung!',
            finishHK:"九本可以幫助你實踐夢想，成為一位Al人工智能專家的書籍：",
            finishEN:"Nine books that can help you achieve your dream and become an AI artificial intelligence expert:",
            introHK:"夢想成為AI人工智能專家",
            introEN:"Dream of becoming an AI artificial intelligence expert.",
            img:"/character/Tai Keung.png",
            subLevels:[
                {
                    answer:[
                        {
                            "labelHK": "圖說元宇宙",
                            "labelEN": "Smarter Data Science : Succeeding with Enterprise-grade Data and AI Projects",
                            "nameHK": "圖說元宇宙",
                            "nameEN": "Smarter Data Science : Succeeding with Enterprise-grade Data and AI Projects",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "須彌著 孫垚繪",
                            "ebookHK": "https://hkpl.nblib.com/product/1231",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-AI/page-1/5128885",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3675000&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3612296&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "元宇宙超入門",
                            "labelEN": "Artificial Intelligence : A Very Short Introduction",
                            "nameHK": "元宇宙超入門",
                            "nameEN": "Artificial Intelligence : A Very Short Introduction",
                            "year": "2022",
                            "publisher": "商務印書館(香港)有限公司",
                            "author": "方軍  ",
                            "ebookHK": "https://hkpl.nblib.com/product/1045",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-artificial%20intelligence/page-1/4962355",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3683982&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3526118&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "元宇宙‧ <br/>圖說元宇宙",
                            "labelEN": "The AI Book : The Artificial Intelligence Handbook for Investors, Entrepreneurs and Fintech Visionaries",
                            "nameHK": "元宇宙‧ 圖說元宇宙",
                            "nameEN": "The AI Book : The Artificial Intelligence Handbook for Investors, Entrepreneurs and Fintech Visionaries",
                            "year": "2022",
                            "publisher": "三聯書店(香港)有限公司",
                            "author": "子彌實驗室  ",
                            "ebookHK": "https://hkpl.nblib.com/product/1265",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-AI/page-1/4926679",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3680255&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3603887&fromLocationLink=false&theme=WEB"
                        },
                        
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "科技發展與<br/>資訊素養",
                            "labelEN": "The AI Advantage : How to Put the Artificial Intelligence Revolution to Work",
                            "nameHK": "科技發展與資訊素養",
                            "nameEN": "The AI Advantage : How to Put the Artificial Intelligence Revolution to Work",
                            "year": "2020",
                            "publisher": "天窗出版",
                            "author": "黃錦輝  ",
                            "ebookHK": "https://hkpl.nblib.com/product/728",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-AI/page-1/4317529",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3679292&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3537193&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "後就業社會：<br/>誰是科技貴族？誰的人工智能？",
                            "labelEN": "How AI Is Transforming the Organization",
                            "nameHK": "後就業社會：誰是科技貴族？誰的人工智能？",
                            "nameEN": "How AI Is Transforming the Organization",
                            "year": "2018",
                            "publisher": "印象文字",
                            "author": "鄒崇銘, 韓江雪",
                            "ebookHK": "https://joyread.club/book/636cb33fb095e6002afa3c58",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-AI/page-1/5579050",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3538362&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3597400&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "我們的孩子<br/>可以比AI更聰明嗎？",
                            "labelEN": "AI Superpowers : China, Silicon Valley, and the New World Order",
                            "nameHK": "我們的孩子可以比AI更聰明嗎？",
                            "nameEN": "AI Superpowers : China, Silicon Valley, and the New World Order",
                            "year": "2022",
                            "publisher": "紅出版 (青森文化)",
                            "author": "費以民博士",
                            "ebookHK": "https://joyread.club/book/6476c09406c771001db489b5",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-AI/page-1/3758806",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3681317&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3561423&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "數碼力大提升",
                            "labelEN": "Navigating the Metaverse : A Guide to Limitless Possibilities in a Web 3.0 World",
                            "nameHK": "數碼力大提升",
                            "nameEN": "Navigating the Metaverse : A Guide to Limitless Possibilities in a Web 3.0 World",
                            "year": "2020",
                            "publisher": "天窗出版",
                            "author": "湛家揚博士",
                            "ebookHK": "https://joyread.club/book/62ac504a745c424bd5a76a22",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-The%20Metaverse/page-1/8967637",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3616551&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3696780&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "你未來就緒嗎？",
                            "labelEN": "The Metaverses Handbook : Innovating for the Internet's Next Tectonic Shift",
                            "nameHK": "你未來就緒嗎？",
                            "nameEN": "The Metaverses Handbook : Innovating for the Internet's Next Tectonic Shift",
                            "year": "2019",
                            "publisher": "信報出版社",
                            "author": "鄧淑明",
                            "ebookHK": "https://joyread.club/book/63778d12301207001d0f5e9b",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-The%20Metaverse/page-1/8953817",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3570570&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3676053&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "STEM學習大策略：<br/>啟發孩子的科創思維",
                            "labelEN": "The Digital Mind : How Science is Redefining Humanity",
                            "nameHK": "STEM學習大策略：啟發孩子的科創思維",
                            "nameEN": "The Digital Mind : How Science is Redefining Humanity",
                            "year": "2019",
                            "publisher": "皇冠出版社(香港)",
                            "author": "黃金耀",
                            "ebookHK": "https://joyread.club/book/6103fe5f18271b1fc98e4f44",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-AI/page-1/3246910",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3575834&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3514278&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        },
        'Hailey':{
            nameHK:'希希',
            nameEN:'Hailey',
            descriptionHK:"夢想成為一位文化藝術創作人。請為她挑選三本能幫助她達成夢想的書。",
            descriptionEN:" dream is to become a creator in culture and arts. Please assist her to pick 3 books that help her achieve her dream.",
            successHK:'很好，你已經幫助希希向着夢想行近一大步！',
            successEN:'Very good, you have done a great favour to Hailey!',
            finishHK:"九本可以幫助你實踐夢想，成為一位文化藝術創作人的書籍：",
            finishEN:"Nine books that can help you achieve your dream and become a creator in culture and arts:",
            introHK:"夢想成為文化藝術創作人",
            introEN:"Dream of becoming a creator in culture and arts.",
            img:"/character/Hailey.png",
            subLevels:[
                {
                    answer:[
                        {
                            "labelHK": "創作，你也能",
                            "labelEN": "Arts Education and Cultural Diversity : Policies, Research, Practices and Critical Perspectives",
                            "nameHK": "創作，你也能",
                            "nameEN": "Arts Education and Cultural Diversity : Policies, Research, Practices and Critical Perspectives",
                            "year": "2020",
                            "publisher": "初文出版社",
                            "author": "蔡益懷",
                            "ebookHK": "https://hkpl.nblib.com/product/1193",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-culture%20and%20art/page-1/4948723",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3596901&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3629296&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "中華文化論衡",
                            "labelEN": "I (Heart) Art : Art We Love from the Metropolitan Museum of Art",
                            "nameHK": "中華文化論衡",
                            "nameEN": "I (Heart) Art : Art We Love from the Metropolitan Museum of Art",
                            "year": "2022",
                            "publisher": "商務印書館(香港)有限公司",
                            "author": "杜若鴻",
                            "ebookHK": "https://hkpl.nblib.com/product/700",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-art/page-1/4385857",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3685630&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3607221&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "城市如何文化",
                            "labelEN": "30-Second Literature : The 50 Most Important Forms, Genres and Styles, Each Explained in Half a Minute",
                            "nameHK": "城市如何文化",
                            "nameEN": "30-Second Literature : The 50 Most Important Forms, Genres and Styles, Each Explained in Half a Minute",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "茹國烈",
                            "ebookHK": "https://hkpl.nblib.com/product/1141",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-theatre/page-1/5338875",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3679987&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3612559&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "水墨設計‧設計水墨：<br/>兩地三代創意三重奏",
                            "labelEN": "Street Art",
                            "nameHK": "水墨設計‧設計水墨：兩地三代創意三重奏",
                            "nameEN": "Street Art",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "靳埭強",
                            "ebookHK": "https://hkpl.nblib.com/product/1139",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-culture%20and%20art/page-1/3293767",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3685736&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3478458&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "生活是設計的全部",
                            "labelEN": "The Art of Chalk : Techniques and Inspiration for Creating Art with Chalk",
                            "nameHK": "生活是設計的全部",
                            "nameEN": "The Art of Chalk : Techniques and Inspiration for Creating Art with Chalk",
                            "year": "2022",
                            "publisher": "中華書局(香港)有限公司",
                            "author": "高少康 林慧遠",
                            "ebookHK": "https://hkpl.nblib.com/product/1288",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-culture%20and%20art/sort-releasedate/page-1/2735107",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3685255&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3435243&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "日日好玩：<br/>玩好設計",
                            "labelEN": "Music",
                            "nameHK": "日日好玩：玩好設計",
                            "nameEN": "Music",
                            "year": "2022",
                            "publisher": "三聯書店(香港)有限公司",
                            "author": "邱汛瑜",
                            "ebookHK": "https://hkpl.nblib.com/product/877",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-music/page-1/3714776",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3661476&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:1749477&fromLocationLink=false&theme=WEB"
                        },
                    ]
                },
                {
                    answer:[
                        {
                            "labelHK": "古典音樂十五講",
                            "labelEN": "How to Paint  : A Complete Beginner's Guide to Watercolors, Acrylics, and Oils",
                            "nameHK": "古典音樂十五講",
                            "nameEN": "How to Paint  : A Complete Beginner's Guide to Watercolors, Acrylics, and Oils",
                            "year": "2021",
                            "publisher": "香港中文大學出版社",
                            "author": "李歐梵",
                            "ebookHK": "https://hkpl.nblib.com/product/813",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-painting/page-1/4644435",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3502232&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3539689&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "情迷現代主義",
                            "labelEN": "Visual Culture",
                            "nameHK": "情迷現代主義",
                            "nameEN": "Visual Culture",
                            "year": "2019",
                            "publisher": "牛津大學出版社（中國）",
                            "author": "李歐梵",
                            "ebookHK": "https://joyread.club/book/63775afcdbab8a0029809b00",
                            "ebookEN": "https://libbyapp.com/search/hkpl/search/query-culture%20and%20art/page-1/5285390",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3273703&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3637680&fromLocationLink=false&theme=WEB"
                        },
                        {
                            "labelHK": "第四十五屆青年文學獎<br/>得獎作品集‧1，小說、新詩",
                            "labelEN": "Chinese Culture : Its Humanity and Modernity",
                            "nameHK": "第四十五屆青年文學獎得獎作品集‧1，小說、新詩",
                            "nameEN": "Chinese Culture : Its Humanity and Modernity",
                            "year": "2021",
                            "publisher": "突破出版社",
                            "author": "青年文學獎協會",
                            "ebookHK": "https://joyread.club/book/637206822844e1002ac8ade3",
                            "ebookEN": "https://libbyapp.com/search/hkpl/creator-1829465/page-1/6042020",
                            "bookHK": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3632188&fromLocationLink=false&theme=WEB",
                            "bookEN": "https://webcat.hkpl.gov.hk/lib/item?id=chamo:3642247&fromLocationLink=false&theme=WEB"
                        }
                    ]
                }
            ]
        }
    }));
    const currentSubLevelAnswer = useState('currentSubLevelAnswer',() => ([]))
    const otherBooks = [
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
    ];
    const otherBooksEN = [
        "Go Get 'Em, Tiger!",
        "This Is Happiness",
        "The Happy Camper",
        "School of Laughs",
        "Don't Behave Like You Live <br/>in a Cave",
        "Get Organized Without Losing It", 
        "Laugh Out Loud",
        "Johnny Boo Finds a Clue?",
        "Accessible Yoga : Poses and Practices for Every Body",
        "What to Eat When : A Strategic Plan to Improve Your Health & Life Through Food",
        "Living Without Plastic : More Than 100 Easy Swaps for Home, Travel, Dining, Holidays, and Beyond",
        "52 Ways to Walk : The Surprising Science of Walking for Wellness and Joy, One Week at a Time",
        "Tai Chi Push Hands : The Martial Foundation of Tai Chi Chuan",
        "The Joy Plan : How I Took 30 Days to Stop Worrying, Quit Complaining, and Find Ridiculous Happiness",
        "Baking with Kim-Joy : Cute and Creative Bakes to Make You Smile",
        "Eat Joy : Stories & Comfort Food from 31 Celebrated Writers",
        "Positive Thinking Pocketbook : Little Exercises for a Happy and Successful Life",
        "Good Vibes, Good Life : How Self-love is the Key to Unlocking Your Greatness",
        "Kid Food : The Challenge of Feeding Children in a Highly-processed World",
        "Food Around the World",
        "How to Live Japanese",
        "Best Lunch Box Ever : Ideas and Recipes for School Lunches Kids Will Love",
        "Boba : Classic, Fun, and Refreshing Bubble Teas to Make at Home",
        "Care for Your Teeth",
    ]

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
                ...answer,
                correct: true,
                hue: randomColor(),
                selected: false,
            }
        });
        const randomNumber = Math.floor(Math.random() * (1 - 23) + 23);
        // generate two random number between 0 to otherBooks.length

        currentSubLevelAnswer.value = shuffle([...answer,
            {
                labelHK: currentLang.value === 'EN' ? otherBooksEN[randomNumber] : otherBooks[randomNumber],
                labelEN: currentLang.value === 'EN' ? otherBooksEN[randomNumber] : otherBooks[randomNumber],
                correct:false,
                hue: randomColor(),
                selected: false,
            },
            {
                labelHK:currentLang.value === 'EN' ? otherBooksEN[randomNumber + 1] : otherBooks[randomNumber + 1],
                labelEN:currentLang.value === 'EN' ? otherBooksEN[randomNumber + 1] : otherBooks[randomNumber + 1],
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
        previousLevel,
        currentSubLevelAnswer
    }
}