<script setup lang="ts">

</script>

<template>
  <div class="animationContainer mesh">
    
  </div>
</template>

<style scoped lang="scss">
.animationContainer{
  width: 60%;
  max-width: 1024px;
  aspect-ratio: 1/1;
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
}
.mesh {
  background-color: transparent;
  background-image:
      radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
      radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
      radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
      radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
      radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
      radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
  animation: meshPosition 10s ease infinite;
  background-size: 300% 300%;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,1) 90%),
      linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,1) 90%),
      linear-gradient(45deg, rgba(255,255,255,0) 30%, rgba(255,255,255,1) 90%);
    z-index: 2;
  }
}
@keyframes meshPosition {
  0% {
    background-position: 0 20%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 50% 70%;
  }
  100% {
    background-position: 0 20%;
  }
}
</style>