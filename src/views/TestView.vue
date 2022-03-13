<template>
<!-- Search Button with icons -->
  <p>
    with extra class <b>is-loading</b>, your icon is able to rotate 360 deg in 2
    seconds, you can also override this
  </p>
  <el-icon :size="20">
    <edit />
  </el-icon>
  <el-icon color="#409EFC" class="no-inherit">
    <share />
  </el-icon>
  <el-icon>
    <delete />
  </el-icon>
  <el-icon class="is-loading">
    <loading />
  </el-icon>
  <el-button type="primary">
    <el-icon style="vertical-align: middle">
      <search style="isloading"></search>
    </el-icon>
    <span style="vertical-align: middle"> Search </span>
  </el-button>
  
  <!-- Input boxes with using slots -->
  <div class="demo-input-suffix">
    <el-row :gutter="1">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center"
        >Using slots</span
      >
      <el-input v-model="input3" class="w-50 m-2" placeholder="Pick a date" @input="change($event)">
        <template #suffix>
          <el-icon class="el-input__icon"><calendar /></el-icon>
        </template>
      </el-input>
      <el-input v-model="input4" class="w-50 m-2" placeholder="Type something" @input="change($event)">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>
    </el-row>
  </div>

  <div>
    input4: {{ input4 }}
  </div>
</template>



<script>
//import { Vue } from 'vue'
import { ref } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
export default {
  components: {
    'Calendar': Calendar,
    'Search': Search
  },
  data() {
    return{
    i1: input1,
    i2: input2,
    input3: input3,
    input4: input4,
    
    }
  },
  
  change(e) {
    this.$forceUpdate() // 更新视图
    return {
      e: e //返回值
    }
  }
}
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')

//Vue.createApp(input4).mount('#input4')

</script>
