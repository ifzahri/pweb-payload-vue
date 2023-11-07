<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title> Payload CMS - Ionic Vue</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <h3 style="margin-left: 16px">Sign Up</h3>
      <ion-list :inset="true">
        <form @submit.prevent="userSignup">
          <ion-item>
            <ion-input
              v-model="fullName"
              name="fullName"
              label="Full Name"
              label-placement="stacked"
              type="text"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-datetime-button datetime="datetime"> </ion-datetime-button>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime
                id="datetime"
                presentation="date"
                :show-default-buttons="true"
                @ion-change="(event) => {
                    console.log(event.detail.value);
                    birthday = event.detail.value as string;
                }"
              ></ion-datetime>
            </ion-modal>
          </ion-item>
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
            <ion-button type="submit" fill="clear">Sign Up</ion-button>
            <ion-button
              type="button"
              fill="clear"
              @click="router.back()"
              color="danger"
              >Cancel</ion-button
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
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  useIonRouter,
} from "@ionic/vue";
import { ref } from "vue";
import * as AuthService from "../auth-service";

const email = ref("");
const password = ref("");
const fullName = ref("");
const birthday = ref("");
const router = useIonRouter();

const userSignup = async () => {
  try {
    const signUp = await AuthService.userSignup({
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      birthday: birthday.value,
    });

    if (!signUp) {
      throw new Error("Error signing up");
    }

    const signIn = await AuthService.userLogin({
        email: email.value,
        password: password.value
    });

    router.replace("/home");
  } catch (error: any) {
    alert("Sign Up Error " + error.message);
  }
};
</script>
