<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title> Payload CMS - Ionic Vue</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <h3 style="margin-left: 16px">Sign In</h3>
      <ion-list :inset="true">
        <form @submit.prevent="userLogin">
          <ion-item>
            <ion-input
              v-model="email"
              name="email"
              label="Email"
              label-placement="stacked"
              autocomplete="email"
              type="email"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              v-model="password"
              name="password"
              label="Password"
              label-placement="stacked"
              autocomplete="new-password"
              type="password"
            ></ion-input>
          </ion-item>
          <div class="ion-text-center">
            <ion-button type="submit" fill="clear">Sign In</ion-button>
            <ion-button
              type="button"
              fill="clear"
              @click="router.push('/signup')"
              >Create A New Account</ion-button
            >
          </div>
        </form>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/vue";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const router = useIonRouter();

const userLogin = async () => {
  try {
    const resp = await fetch("http://localhost:3100/api/customers/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await resp.json();
    console.log(user);

    router.replace("/home");
  } catch (error: any) {
    alert("Sign In Error " + error.message);
  }
};
</script>
