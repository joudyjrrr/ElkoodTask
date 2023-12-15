<script>
import AddModal from "./AddModal.vue";
</script>
<template>
  <section class="home">
    <a class="logo"><img src="../assets/logo.webp" alt="" /></a>
    <div class="container">
      <div class="wel">
        <h2 class="text-pop-up-top">Welcome to my Clinic</h2>
        <button
          class="uk-button uk-button-default uk-margin-small-right"
          type="button"
         uk-toggle="target: #my-id"
        >
          Add Reservation
        </button>
      </div>
    </div>
  </section>
</template>
<style>
.home {
  background: url("../assets/26095.jpg");
  min-height: 40rem;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
  position: relative;
  width: 100%;
  color: white;
  padding: 0 10px;
}

.logo {
  width: 139px;
  position: absolute;
  margin: 20px;
  cursor: pointer;
}
.logo img {
  width: 100%;
}
.home .container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  margin: 0 auto;
  min-height: 40rem;
}
.home .wel {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.home .wel h2 {
  font-size: 35px;
  font-weight: bold;
}

.text-pop-up-top {
  -webkit-animation: text-pop-up-top 2s linear 2s infinite alternate-reverse
    both;
  animation: text-pop-up-top 2s linear 2s infinite alternate-reverse both;
}

@-webkit-keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc,
      0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc,
      0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}
@keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc,
      0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc,
      0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}
.home .wel button {
  background: white;
  color: black;
  padding: 20px;
  outline: none;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
}
.home button:hover {
  -webkit-animation: pulsate-fwd 2s linear infinite alternate both;
  animation: pulsate-fwd 2s linear infinite alternate both;
  border: 1px solid white;
  background-color: transparent;
  color: white;
}
@-webkit-keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes pulsate-fwd {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
