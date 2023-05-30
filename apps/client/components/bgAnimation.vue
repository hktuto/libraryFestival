<script setup lang="ts">

</script>

<template>
  <div class="animationContainer mesh">
    
  </div>
</template>

<style scoped lang="scss">
.animationContainer{
  width: 100%;
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
      radial-gradient(at 33% 29%, hsla(49,100%,66%,1) 0px, transparent 50%),
      radial-gradient(at 61% 26%, hsla(180,100%,57%,1) 0px, transparent 50%),
      radial-gradient(at 87% 83%, hsla(235,100%,70%,1) 0px, transparent 50%),
      radial-gradient(at 1% 98%, hsla(111,100%,77%,1) 0px, transparent 50%);
  animation: meshPosition 10s ease infinite;
  background-size: 300% 300%;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%),
      linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%),
      linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
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