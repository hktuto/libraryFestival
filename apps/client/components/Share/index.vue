<script setup lang="ts">
    const social = [
      {
        name: "facebook",
        icon:"ion:social-facebook",
        href: ""
      },
      {
        name: "Instagram",
        icon: "ion:logo-instagram",
        href: ""
      },
      {
        name: "youtube",
        icon:"ion:logo-youtube",
        href: ""
      },
    ]
</script>

<template>
  <div class="shareContainer bgGradient">
    <div v-for="item in social" :key="item.name" class="socialContainer">
      <Icon :name="item.icon" size="24px" ></Icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shareContainer{
  padding: calc(var(--app-padding) * 1.5);
  position:fixed;
  right: 0;
  top: 30%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  gap: var(--app-padding);
  z-index: 2;
}
.socialContainer{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  transition: all .3s ease-in-out;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  
  &:hover{
    background-color: var(--primary-color);
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    border: 2px solid #fff;
  }
}
</style>