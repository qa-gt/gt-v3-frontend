<template>
    <el-card align="center" style="width: 70%; margin-left: 15%">
        <div align="center" style="margin-top: 5%">
            <el-button type="text" @click="$router.push({name: 'index'})">
            <el-image lazy src="src\assets\img\logo-lr.png"> </el-image>
            </el-button>
        </div>
        <h2 align="center" style="margin-bottom: 20%; margin-top: 5%">一个匿名的论坛</h2>
        <div align="center" style="margin-bottom: 10%;" justify="space-evenly">
            <el-button
                type="primary"
                plain
                @click="$router.push({ name: 'index' })"
                >论坛入口</el-button
            >
            <el-button
                type="primary"
                plain
                @click="$router.push(`/user/${user.id}`)"
                >用户界面</el-button
            >
            <el-button
                type="primary"
                plain
                @click="$router.push({ name: 'register' })"
                >注册账户</el-button
            >
            <el-button
                type="primary"
                plain
                @click="$router.push({ name: 'gtboard' })"
                >gt留言板</el-button
            >
            <el-button
                type="primary"
                plain
                @click="$router.push({ name: 'dashboard' })"
                >数据报表</el-button
            >
            <el-button
                type="primary"
                plain
                @click="$router.push({ name: 'about' })"
                >关于瓜田</el-button
            >
        </div>
    </el-card>
</template>

<script>
export default {};
</script>

<style></style>
