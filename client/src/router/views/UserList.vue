<!-- views/UserList.vue -->
<script setup>
import { computed, onBeforeMount, ref } from "vue";
const users = ref([]);
const total = computed(() => {
  return users.value.length;
});
// 1. 서버에서 전체 회원 목록 가져오기
const memberList = async () => {
  let list = await fetch(`/api/users`)
    .then((res) => res.json())
    .catch((err) => console.log("전송오류", err));
  users.value = list;
};

const dateFormat = (dateVal) => {
  let newDate = new Date(dateVal);
  let year = newDate.getFullYear();
  let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  let day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

import { useRouter } from "vue-router";
const router = useRouter(); //vue Router 객체를 반환
// 특정 회원을 선택(<tr> 클릭) 시 상세페이지로 이동
const goToDetail = (userNo) => {
  router.push({ name: "userInfo", params: { no: userNo } });
};

onBeforeMount(() => {
  memberList();
});
</script>
<template>
  <div class="container">
    <table class="table text-center">
      <caption>
        Total :
        {{
          total
        }}
      </caption>
      <thead>
        <tr>
          <th>No.</th>
          <th>아이디</th>
          <th>이름</th>
          <th>성별</th>
          <th>가입날짜</th>
          <!-- yyyy-MM-dd-->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="info in users"
          :key="info.user_no"
          @click="goToDetail(info.user_no)"
        >
          <td>{{ info.user_no }}</td>
          <td>{{ info.user_id }}</td>
          <td>{{ info.user_name }}</td>
          <td>{{ info.user_gender == "M" ? "남" : "여" }}</td>
          <td>{{ dateFormat(info.join_date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
