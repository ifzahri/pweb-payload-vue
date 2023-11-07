<template>
 <table>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
        <th>Column 4</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.courses }}</td>
        <td>{{ item.lecturers }}</td>
        <td>{{ item.createdAt }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const data = ref();
const router = useRouter();

onMounted(async () => {
  data.value = await getUser();
  if (!data) {
    router.replace("/signin");
  }
});

const getUser = async () => {
  try {
    const resp = await fetch("http://localhost:3100/api/courses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const errorMsg = (await resp.json())?.errors[0].message;
      throw new Error(errorMsg);
    }
    const user = await resp.json();
    console.log(user);
    return user;
  } catch (error: any) {
    alert("Sign In Error " + error.message);
  }
};
</script>

<style scoped>
  ion-col {
    background-color: #135d54;
    border: solid 1px #fff;
    color: #fff;
    text-align: center;
  }
</style>
