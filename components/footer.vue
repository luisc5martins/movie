<template>
    <footer>
      <div class="footer-content">
        <p>Luís C. Martins</p>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">Sobre</router-link>
          <router-link to="/contato">Contato</router-link>
        </nav>
      </div>
    </footer>
  </template>
  <style scoped>
  footer {
    background-color: #000;
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
    <script>
    export default {
      name: 'footer'
    };
    </script>