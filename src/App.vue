<script setup>
import { RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.transaction-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(39, 39, 39);
  padding: 150px 100px;
  border-radius: 25px;
}
@media (max-width: 768px) {
  .transaction-box {
    padding: 50px 50px;
    margin-top: 30px;
  }
}
form {
  width: 100%;
}
form > * {
  display: block;
  margin: 0.5rem 0;
  color: grey;
}
form > input {
  width: 340px;
  width: 100%;
  padding: 0.7rem;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: beige;
}
form > button {
  padding: 0.8rem;
  border: 0px;
  border-radius: 5px;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  width: 100%;
  margin-top: 20px;
}
form > button:hover {
  background-color: rgb(4, 160, 108);
}
form > button:disabled {
  background-color: grey;
  color: white;
}
</style>
