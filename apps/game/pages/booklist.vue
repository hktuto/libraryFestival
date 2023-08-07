<script lang="ts" setup>
const { levels } = useGame()
</script>

<template>
    <div class="pageContainer">
        <div v-for="char in levels" :key="char.name" class="char">
            <div class="imgContainer">
               
                <img :src="char.img" alt="character" />
                <div class="info">
                    <div class="name">{{ char.name }}</div>
                    <div class="desc">{{  char.description }}</div>
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
    </div>
</template>


<style lang="scss" scoped >
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
        .name{
            font-size: 1.2rem;
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
</style>