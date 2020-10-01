<script>
export default {
  name: 'Enter',
}
</script>

<template>
  <div class="wrapper">
    <router-link class="link" to="select">
      <div class="button-card">
        <div>
          <h1>Wähle einen Weg</h1>
        </div>
      </div>
    </router-link>

    <router-link class="link" to="meditations">
      <div class="button-card">
        <div>
          <h1>Erstelle einen Weg</h1>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button-card {
  border: 1px solid var(--border-color);
  background-color: whitesmoke;
  border-radius: var(--border-radius);
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  padding: 7px;
  padding-left: 7vw;
  margin-bottom: 20px;
  text-align: center;
}

.button-card:hover {
  background-color: #5552ff;
}
</style>
