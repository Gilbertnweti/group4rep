<template>
    <PageHead/>
    <router-view/>
    <PageFoot/>
</template>
<script setup>
import PageHead from "../components/PageHead.vue";
import PageFoot from "../components/PageFoot.vue";
</script>