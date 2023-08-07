<script lang="ts" setup>
const { levels } = useGame()
</script>

<template>
    <div class="pageContainer">
        <h1>可以幫助你行近四大夢想的好書</h1>
        <div v-for="char in levels" :key="char.name" class="char">
            <div class="imgContainer">
               
                <img :src="char.img" alt="character" />
                <div class="info">
                    <div class="desc">{{  char.finish }}</div>
                </div>
            </div>
            <div class="bookList">
                <template class="subLevel" v-for="(books,index) in char.subLevels" :key="index" >
                    <div v-for="book in books.answer" :key="book.label" class="bookName" >
                        <div class="item">
                            <div class="label">書名</div>
                            <div class="name">{{ book.label }}</div>
                        </div>
                        <div class="item">
                            <div class="label">出版年份</div>
                            <div class="year">{{  book.year }}</div>
                        </div>
                        <div class="item">
                            <div class="label">出版社</div>
                            <div class="publisher">{{  book.publisher }}</div>
                        </div>
                        <div class="item">
                            <div class="label">作者</div>
                            <div class="author">{{  book.author }}</div>
                        </div>
                        <div class="actions">
                            <button class="actionBtn" v-if="book.ebook" >
                                <a :href="book.ebook" target="_blank">
                                    電子書
                                </a>
                            </button>
                            <button class="actionBtn" v-if="book.book" >
                                <a :href="book.book" target="_blank">
                                    實體書
                                </a>
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <h1>下次圖書館見！</h1>
        <div class="previousLevelBtn" @click="$router.push({path:'/'})">再玩一次</div>
    </div>
</template>


<style lang="scss" scoped >
h1 {
    color: #fff;
    font-size: 2.2rem;
    text-align: center;
}
.pageContainer{
    overflow: auto;
    display: flex;
    flex-flow: column nowrap;
    gap: 24px;
}
.imgContainer{
    position: absolute;
    z-index: -1;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: flex-start;
    img {
        max-width: 70%;
        @media (max-width: 768px) {
            max-width: 50%;
        }
    }
    .info{
        margin-top: 40px;
        padding: 12px;
        font-weight: 700;
        font-size: 1.4rem;
        color: #fff;
        .name{
            
        }
    }
    // background: #eee;;
}
.char{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    position: relative;
}

.bookList{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
    padding: 300px 24px 24px 24px;
}
.bookName{
    padding: 12px;
    background: #fff;
    border-radius: 12px;
}
.actions{
    display: flex;
    flex-flow: row nowrap;
    gap: 12px;
    margin-block: 12px;
    justify-content: flex-start;
}
.item{
    margin-bottom: 6px;
    font-weight: 700;
    .label{
        font-size: .6rem;
        font-weight: 500;
    }
}
button{
    padding: 6 12px;
    border-radius: 12px;
    border:none;
    background: #10c65c;
    font-size: 1rem;
    a{
        color: #fff;
        text-decoration: none;
    }
}
.previousLevelBtn{
    margin: 24px auto;
    padding: 6px 12px;
   background: #0d930d;
   color: #fff;
   border-radius: 12px;
   box-shadow: 0 0 5px rgba(0,0,0,0.3);
   cursor: pointer;
   font-size: 1.2rem;
}
</style>