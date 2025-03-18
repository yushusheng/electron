<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>智能穿搭助手<span>1.0版本</span></h1>
      </el-header>
      
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="type-selector">
              <template #header>
                <div class="card-header">
                  <span>选择服装类型</span>
                </div>
              </template>
              <el-radio-group v-model="store.currentType" class="type-list">
                <el-radio label="casual">休闲</el-radio>
                <el-radio label="formal">正式</el-radio>
                <el-radio label="sports">运动</el-radio>
                <el-radio label="party">派对</el-radio>
              </el-radio-group>
            </el-card>
          </el-col>
          
          <el-col :span="16">
            <el-card class="recommendation">
              <template #header>
                <div class="card-header">
                  <span>推荐搭配</span>
                  <el-button type="primary" @click="generateRecommendation" :loading="store.loading">
                    换一换
                  </el-button>
                </div>
              </template>
              
              <div class="recommendation-content" v-if="store.recommendList.length > 0">
                <div v-for="(item, index) in store.recommendList" :key="index" class="outfit-item">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.description }}</p>
                </div>
              </div>
              
              <el-empty v-else description="请选择服装类型并点击生成"></el-empty>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores'

const store = useAppStore()

const outfitRecommendations = {
  casual: [
    { name: '清新休闲搭配', description: '白色T恤 + 浅色牛仔裤 + 小白鞋' },
    { name: '舒适日常风', description: '针织衫 + 休闲裤 + 乐福鞋' },
    { name: '简约文艺风', description: '条纹衬衫 + 九分裤 + 帆布鞋' },
    { name: '休闲街头风', description: 'oversize卫衣 + 工装裤 + 运动鞋' }
  ],
  formal: [
    { name: '商务精英风', description: '深色西装 + 白衬衫 + 皮鞋' },
    { name: '职场通勤风', description: '西装外套 + 针织衫 + 正装裤' },
    { name: '商务休闲风', description: '休闲西装 + 高领毛衣 + 布洛克鞋' },
    { name: '正式场合风', description: '双排扣西装 + 领带 + 牛津鞋' }
  ],
  sports: [
    { name: '运动活力风', description: '速干T恤 + 运动短裤 + 跑步鞋' },
    { name: '健身训练风', description: '运动背心 + 紧身裤 + 训练鞋' },
    { name: '户外运动风', description: '防风外套 + 速干裤 + 登山鞋' },
    { name: '休闲运动风', description: '运动卫衣 + 运动长裤 + 篮球鞋' }
  ],
  party: [
    { name: '派对时尚风', description: '亮片上衣 + 修身裤 + 高跟鞋' },
    { name: '轻奢休闲风', description: '丝绒外套 + 休闲西裤 + 乐福鞋' },
    { name: '夜店潮流风', description: '皮夹克 + 紧身牛仔裤 + 马丁靴' },
    { name: '优雅聚会风', description: '印花衬衫 + 休闲裤 + 切尔西靴' }
  ]
}

const generateRecommendation = () => {
  if (!store.currentType) {
    ElMessage.warning('请先选择服装类型')
    return
  }
  
  store.setLoading(true)
  // 模拟API调用
  setTimeout(() => {
    const typeRecommendations = outfitRecommendations[store.currentType]
    // 随机选择2个不重复的搭配
    const selectedRecommendations = []
    const indices = new Set()
    
    while (selectedRecommendations.length < 2 && indices.size < typeRecommendations.length) {
      const randomIndex = Math.floor(Math.random() * typeRecommendations.length)
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex)
        selectedRecommendations.push(typeRecommendations[randomIndex])
      }
    }
    
    store.setRecommendList(selectedRecommendations)
    store.setLoading(false)
  }, 1000)
}
</script>

<style scoped lang="scss">

.home {
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px !important;
  
  h1 {
    font-size: 22px;
    line-height: 1.1;
    color: #000;
  }
}

.el-main {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
  
  .el-radio {
    margin-right: 0;
    padding: 8px 0;
  }
}

.recommendation-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.outfit-item {
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  transition: all 0.3s ease;;
  border: 1px solid #ebeef5;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}

.el-card {
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

@media screen and (max-width: 768px) {
  .el-main {
    padding: 16px;
  }
  
  .el-row {
    margin: 0 !important;
  }
  
  .el-col {
    padding: 0 !important;
    width: 100% !important;
    margin-bottom: 16px;
  }

  .el-header {
    height: 50px !important;
    
    h1 {
      font-size: 1.5rem;
    }
  }

  .type-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 0;
  }

  .outfit-item {
    padding: 16px;
    
    h3 {
      font-size: 1.1rem;
      margin: 0 0 8px 0;
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
    }
  }
}
</style>