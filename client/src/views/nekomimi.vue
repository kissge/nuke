<template>
  <div class="nekomimi">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.930653 7.02527">
      <path d="M43.423532 6.52522h-6.97872l-.32775-.86419-1.89144-4.99236C34.181622.5559 34.101272.5 33.983862.5s-.20014.0559-.24904.16867l-1.95825 4.99236-.339.86419H.507121" fill="none" stroke="#43548f" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<style lang="scss">
  .nekomimi {
    position: absolute;
    z-index: 999;
    width: 80%;
    margin-left: 10%;
    top: calc((100vh - 70px) / 2);
    text-align: center;
    svg {
      width: 440px;
      max-width: 100%;
      path {
        stroke-dasharray: 20 20;
        -webkit-animation: nekomimi 1s linear 0s infinite;
        animation: nekomimi 1s linear 0s infinite;
      }
    }
  }
  @keyframes nekomimi {
    0% { stroke-dashoffset: -40; }
    100% { stroke-dashoffset: 0; }
  }
  @-webkit-keyframes nekomimi {
    0% { stroke-dashoffset: -40; }
    100% { stroke-dashoffset: 0; }
  }
</style>
