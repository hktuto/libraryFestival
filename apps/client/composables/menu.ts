export type MenuItem = {
    labelEN: string,
    labelHK: string,
    url: string,
    opened: boolean,
    children: MenuItem[]
}
export const useMenu =() => {

    const router = useRouter()
    const route = useRoute()
    const menu = useState<MenuItem[]>('menuData', () => ([
        {
            labelEN: "Home",
            labelHK: "主頁",
            url:"/",
            opened:false,
            children:[]
        },{
            labelEN: "About Summer Library Festival",
            labelHK: "關於夏日圖書館節",
            url:"/page/about-summer-library-festival",
            opened:false,
            children: []
        },
        {
            labelHK: "現場活動",
            labelEN: "Onsite Programmes",
            url: "",
            opened:false,
            children: [
                {
                    labelEN:"Exhibitions",
                    labelHK:"展覽",
                    url:"/category/exhibition",
                    opened:false,
                    children:[]
                },
                {
                    labelEN:"Handicraft Workshops",
                    labelHK:"手藝工作坊",
                    url:"/category/onsite-handicraft-workshops",
                    opened:false,
                    children:[]
                },
                {
                    labelEN:"Story Sharing Sessions",
                    labelHK:"故事分享會",
                    url:"/category/onsite-story-sharing-sessions",
                    opened:false,
                    children:[]
                },
                {
                    labelEN:"Story Theatres",
                    labelHK:"故事劇場",
                    url:"/category/onsite-story-theatres",
                    opened:false,
                    children:[]
                },
                {
                    labelEN:"Subject Talks",
                    labelHK:"專題講座",
                    url:"/category/onsite-subject-talks",
                    opened:false,
                    children:[]
                },{
                    labelEN:"Interactive Storytelling Device",
                    labelHK:"互動故事裝置",
                    url:"/program/11",
                    opened:false,
                    children:[]
                },
            ]
        },
        // {
        //     labelEN: "Online Programmes",
        //     labelHK: "網上活動",
        //     url:"/category/online_videos",
        //     opened:false,
        //     children: []
        // },
        {
            labelEN: "Live Stream",
            labelHK: "直播活動",
            url:"/category/live-stream",
            opened:false,
            children: []
        },{
            labelEN: "Programme Schedule",
            opened:false,
            labelHK: "活動日程",
            url:"/schedule",
            children: []
        },
        // {
        //     labelEN: "Library Resources Guide",
        //     labelHK: "圖書館資源選介",
        //     url:"/resources",
        //     opened:false,
        //     children: []
        // },
        {
            labelEN: "Past Events",
            labelHK: "昔日活動",
            url:"/past",
            opened:false,
            children: []
        },
    ])) ;

    function itemClicked(item:MenuItem) {
        if(item.children.length > 0) {
            item.opened = !item.opened;
            return
        }
        if(item.url) {
            router.push(item.url)
        }
    }

    function isCurrentRoute(item: MenuItem) {
        return route.fullPath === item.url;
    }
    
    return {
        menu,
        itemClicked,
        isCurrentRoute
    }
}