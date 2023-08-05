import {randomColor} from "../utils/color";


export type Option = {
    label: string,
    correct: boolean,
    hue: number
}


export const useGame = () => {

    const players = useState('players',() => (["sing","jenny","Tai Keung","Hailey"]));
    const levels = useState('levels',() => ({
        'sing':{
            name:'sing',
            description:'阿星的夢想是成為一名海陸空宇宙探險家，請為他挑選三本能幫助他達成夢想的書。',
            success:'很好，你已經幫助阿星向着夢想行近一大步！',
            img:"/character/sing.png",
            subLevels:[
                {
                    answer:[
                        "中國海洋夢：蛟龍潛海",
                        "極地旅遊系列2： 南極企鵝北極熊",
                        "奇幻科學大探險5：能源保衞戰",
                    ]
                },
                {
                    answer:[
                        "絲綢之路 : 條條絲路通亞歐",
                        "三個人在南極尋找北極熊",
                        "足足五萬年"
                    ]
                },
                {
                    answer:[
                        "登山學做人 ",
                        "活着回來 - 一個香港人由非洲出發的單車之旅",
                        "天問 : 宇宙真貌的探索"
                    ]
                }
            ]
        },
        'jenny':{
            name:'珍妮',
            description:"夢想在金融經濟方面發展，為大家創造財富，建構美好和豐足的生活。",
            success:'很好，你已經幫助Jenny向着夢想行近一大步！',
            img:"/character/jenny.png",
            subLevels:[
                {
                    answer:[
                        "小理財大經濟：小學生的趣致財務智慧",
                        "奇龍族學園：理財能力大升級",
                        "歷史裡的現代經濟學",
                    ]
                },
                {
                    answer:[
                        "人民幣國際化的新進展：香港交易所的離岸金融產品創新",
                        "亂世黃金 ",
                        "獨步股壇 「投機之王」狙擊價格方程式(導讀版",
                    ]
                },
                {
                    answer:[
                        "新世代洞悉先機——曾淵滄投資七大智慧",
                        "發掘超強港股",
                        "股票勝經",
                    ]
                }
            ]
        },
        'Tai Keung':{
            name:'大強',
            description:"夢想進入數碼世界，利用AI人工智能，開拓元宇宙的無極限可能。",
            success:'很好，你已經幫助大強向着夢想行近一大步！',
            img:"/character/Tai Keung.png",
            subLevels:[
                {
                    answer:[
                        "圖說元宇宙",
                        "元宇宙超入門",
                        "元宇宙：圖說元宇宙＋設計元宇宙",
                    ]
                },
                {
                    answer:[
                        "科技發展與資訊素養",
                        "後就業社會 : 誰是科技貴族?誰的人工智能?",
                        "我們的孩子可以比AI更聰明嗎？",
                    ]
                },
                {
                    answer:[
                        "數碼力大提升",
                        "你未來就緒嗎？",
                        "STEM學習大策略──啟發孩子的科創思維",
                    ]
                }
            ]
        },
        'Hailey':{
            name:'希希',
            description:"夢想成為一位文化藝術創作人。",
            success:'很好，你已經幫助希希向着夢想行近一大步！',
            img:"/character/Hailey.png",
            subLevels:[
                {
                    answer:[
                        "創作，你也能",
                        "中華文化論衡",
                        "城市如何文化",
                    ]
                },
                {
                    answer:[
                        "水墨設計 設計水墨",
                        "生活是設計的全部",
                        "日日好玩：玩好設計",
                    ]
                },
                {
                    answer:[
                        "古典音樂十五講（修訂版）",
                        "情迷現代主義",
                        "第四十五屆青年文學獎得獎作品集",
                    ]
                }
            ]
        }
    }));

    const otherBooks = useState('otherBooks',() => [
        "微表情心理學：入門觀察攻略",
        "你是誰？我是誰？解讀人心的筆跡秘密",
        "好孕天天練",
        "香港談食錄：中餐百味",
        "給生活多一顆糖",
        "世界名人故事繪本",
        "不一樣的星級住家飯",
        "劍擊成就了我：奧運冠軍張家朗",
        "都市人的瑜伽：創造個人的療癒",
        "養生‧養顏-讓女人年輕10年",
        "無難度燜燒杯料理",
        "小學生小食盒",
        "低班：如果我養了一隻……",
        "阿媽這杯茶",
        "輕鬆點吧！",
        "瘦身，也要補身──60個低卡食譜",
        "Q小子笑話大全(1)",
        "父母這樣做，成就正面自信孩子！",
        "新丁潮爸湊仔奮戰手記",
        "運動陷阱",
        "壞姿勢──脊醫話你知30個最易被忽略的痛症元兇",
        "我不怕膽固醇",
        "人生悟語—劉再復新文體沉思錄（卷二—紅樓悟語）",
        "三國無常",
        "中國現代小說史 (第二版)",
        "人生悟語—劉再復新文體沉思錄（卷一—三書悟語）",
        "且聽下回分解──阿濃談中國古典小說"
    ]);

    const currentLevel = useState('currentLevel',() => "sing-0");

    
    const levelObject = computed(() => {
        const [level,subLevel] = currentLevel.value.split('-');
        return levels.value[level];
    });

    const subLevelObject = computed(() => {
        const [level,subLevel] = currentLevel.value.split('-');
        return levels.value[level].subLevels[subLevel];
    });

    function nextLevel(){
        const [level,subLevel] = currentLevel.value.split('-');
        if(subLevel < levels.value[level].subLevels.length - 1){
            currentLevel.value = `${level}-${Number(subLevel) + 1}`;
        }else {
            const nextLevel = players.value.indexOf(level) + 1;
            if(nextLevel < players.value.length){
                currentLevel.value = `${players.value[nextLevel]}-0`;
            }else {
                currentLevel.value = "end";
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
    
    const makeSubLevelOptions = computed(() => {
        // get all answer of current sublevel
        const answer:Option[] = subLevelObject.value.answer.map((answer) => {
            return {
                label: answer,
                correct: true,
                hue: randomColor()
            }
        });
        const randomNumber = Math.floor(Math.random() * otherBooks.value.length);
        // generate two random number between 0 to otherBooks.length
        const wrongAnswer1:Option = {
            label:otherBooks.value[randomNumber],
            correct:false,
            hue: randomColor()
        };
        
        // combine answer and otherBooks and shuffle
        const options = shuffle([...answer,
                {
                    label:otherBooks.value[randomNumber],
                    correct:false,
                    hue: randomColor()
                },
                {
                    label:otherBooks.value[randomNumber + 1],
                    correct:false,
                    hue: randomColor()
                }]
        );
        return options;
    })

    return {
        levelObject,
        nextLevel,
        currentLevel,
        subLevelObject,
        otherBooks,
        makeSubLevelOptions,
    }
}