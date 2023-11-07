<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        Welcome, {{ currentUser }}
        <form @submit.prevent="logout">
          <div class="ion-text-center">
            <ion-button type="submit" fill="clear">Logout</ion-button>
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const currentUser = ref();
const router = useRouter();

onMounted(async () => {
  currentUser.value = await getUser();
  if (!currentUser) {
    router.replace("/signin")
  }
});

const getUser = async () => {
  try {
    const resp = await fetch("http://localhost:3100/api/customers/me", {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = (await resp.json())?.user.full_name;
    console.log(user);
    return user;

  } catch (error: any) {
    alert("Sign In Error " + error.message);
  }
};

const logout = async () => {
  try {
    const resp = await fetch("http://localhost:3100/api/customers/logout", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }

    router.replace("/signin");
  } catch (error: any) {
    alert("Log Out Error " + error.message);
  }
};
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
