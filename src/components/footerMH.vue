<template>
    <footer>
      <div class="footer-content">
        <p>LuDaMa</p>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/"><img src="../assets/Movie_Hoster.png" alt="">© 2023 Movie Hoster, Inc.</router-link>
          <a :href="'mailto:' + 'luisc.martinsjunior5@gmail.com'">Contato</a>
        </nav>
      </div>
    </footer>
  </template>
  <style scoped>
  .nomeSite {
    display: flex;
  }
  img {
    width: 30px;
    padding: 0px;
  }
  footer {
    background-color: #000000;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  nav {
    margin-top: 10px;
    justify-content: center;
  }
  
  router-link {
    color: #ff0000;
    margin: 0 10px;
    text-decoration: none;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
    <script setup>
    </script>