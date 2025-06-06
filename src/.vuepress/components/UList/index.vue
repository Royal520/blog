<template>
  <div>
  <div class="app-container">
    <h1 class="main-title">大数据框架</h1>
    <div class="cards-grid">
      <UCard
        v-for="card in cardsData"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        :icon-src="card.iconSrc"
        :icon-alt-text="card.iconAltText"
        :icon-text="card.iconText"
        :icon-bg-color="card.iconBgColor"
        :icon-text-color="card.iconTextColor"
        :link="card.link"
      />
    </div>
  </div>
    <div class="app-container">
    <h1 class="main-title">大数据框架</h1>
    <div class="cards-grid">
      <UCard
        v-for="card in cardsData"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        :icon-src="card.iconSrc"
        :icon-alt-text="card.iconAltText"
        :icon-text="card.iconText"
        :icon-bg-color="card.iconBgColor"
        :icon-text-color="card.iconTextColor"
        :link="card.link"
      />
    </div>
  </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import UCard from '../UCard/index.vue'; // Adjust path if needed

const cardsData = ref([
  {
    id: 1,
    title: 'Flink 深入',
    link:'http://www.baidu.com',
    description: 'Apache Flink 是一个框架和分布式处理引擎, 用...',
    iconSrc: 'https://ddkk.com/icon/bigdata/flink.png', // Path from public folder
    iconAltText: 'Flink Squirrel',
    // iconText: 'Flink',
    iconBgColor: '#6D28D9', // Purple
    iconTextColor: '#FFFFFF',
  },
  {
    id: 2,
    title: 'Flink 入门',
    description: 'Apache Flink 是一个框架和分布式处理引擎, 用...',
    iconSrc: '/icons/flink-squirrel.svg',
    iconAltText: 'Flink Squirrel',
    iconText: 'Flink',
    iconBgColor: '#6D28D9', // Purple
    iconTextColor: '#FFFFFF',
  },
  {
    id: 3,
    title: 'FlinkSQL 入门',
    description: 'Apache Flink 是一个框架和分布式处理引擎, 用...',
    iconSrc: '/icons/flink-squirrel.svg',
    iconAltText: 'Flink Squirrel',
    iconText: 'Flink',
    iconBgColor: '#6D28D9', // Purple
    iconTextColor: '#FFFFFF',
  },
  {
    id: 4,
    title: 'Flink 速成',
    description: 'Apache Flink 是一个框架和分布式处理引擎, 用...',
    iconSrc: '/icons/flink-squirrel.svg',
    iconAltText: 'Flink Squirrel',
    iconText: 'Flink',
    iconBgColor: '#6D28D9', // Purple
    iconTextColor: '#FFFFFF',
  },
  {
    id: 5,
    title: 'Flink 笔记',
    description: 'Apache Flink 是一个框架和分布式处理引擎, 用...',
    iconSrc: '/icons/flink-squirrel.svg',
    iconAltText: 'Flink Squirrel',
    iconText: 'Flink',
    iconBgColor: '#6D28D9', // Purple
    iconTextColor: '#FFFFFF',
  },
  {
    id: 6,
    title: 'Flink 实战',
    description: 'Apache Flink 是一个框架和分布式处理引擎, 用...',
    iconSrc: '/icons/flink-squirrel.svg',
    iconAltText: 'Flink Squirrel',
    iconText: 'Flink',
    iconBgColor: '#6D28D9', // Purple
    iconTextColor: '#FFFFFF',
  },
  {
    id: 7,
    title: 'Hive 实战',
    description: 'hive是基于Hadoop的一个数据仓库工具, 用来进...',
    // iconSrc: '/icons/hive-logo.svg', // Using logo icon instead of just text
    iconAltText: 'Hive Logo',
    iconText: 'Hive',
    iconBgColor: '#F97316', // Orange
    iconTextColor: '#000000', // Black text for better contrast on orange
  },
  {
    id: 8,
    title: 'Hive 教程',
    description: 'hive是基于Hadoop的一个数据仓库工具, 用来进...',
    // iconSrc: '/icons/hive-logo.svg',
    iconAltText: 'Hive Logo',
    iconText: 'Hive',
    iconBgColor: '#F97316', // Orange
    iconTextColor: '#000000',
  },
  {
    id: 9,
    title: 'Hadoop 入门',
    description: 'Hadoop是一个由Apache基金会所开发的分布式...',
    iconSrc: '/icons/hadoop-elephant.svg',
    iconAltText: 'Hadoop Elephant',
    iconText: 'Hadoop',
    iconBgColor: '#EC4899', // Pinkish
    iconTextColor: '#FFFFFF',
  },
  {
    id: 10,
    title: 'Hadoop 教程',
    description: 'Hadoop是一个由Apache基金会所开发的分布式...',
    iconSrc: '/icons/hadoop-elephant.svg',
    iconAltText: 'Hadoop Elephant',
    iconText: 'Hadoop',
    iconBgColor: '#EC4899', // Pinkish
    iconTextColor: '#FFFFFF',
  },
  {
    id: 11,
    title: 'Hadoop 实战',
    description: 'Hadoop是一个由Apache基金会所开发的分布式...',
    iconSrc: '/icons/hadoop-elephant.svg',
    iconAltText: 'Hadoop Elephant',
    iconText: 'Hadoop',
    iconBgColor: '#EC4899', // Pinkish
    iconTextColor: '#FFFFFF',
  },
  {
    id: 12,
    title: 'HBase 教程',
    description: 'HBase是一个分布式的、面向列的开源数据库,...',
    // iconSrc: '/icons/hbase-logo.svg',
    iconAltText: 'HBase Logo',
    iconText: 'HBase', // Or 'APACHE HBASE' if you want multi-line
    iconBgColor: '#10B981', // Green
    iconTextColor: '#FFFFFF',
  },
  {
    id: 13,
    title: 'Storm 教程',
    description: 'Apache Storm 是一个免费开源的分布式实时计...',
    // iconSrc: '/icons/storm-cloud.svg',
    iconAltText: 'Storm Cloud',
    iconText: 'Storm',
    iconBgColor: '#60A5FA', // Light Blue
    iconTextColor: '#FFFFFF',
  },
  {
    id: 14,
    title: 'Spark 深入解析',
    description: 'Spark 是一种与 Hadoop 相似的开源集群计算环...',
    // iconSrc: '/icons/spark-logo.svg',
    iconAltText: 'Spark Logo',
    iconText: 'Spark',
    iconBgColor: '#3B82F6', // Blue
    iconTextColor: '#FFFFFF',
  },
  {
    id: 15,
    title: 'Spark 教程',
    description: 'Spark 是一种与 Hadoop 相似的开源集群计算环...',
    // iconSrc: '/icons/spark-logo.svg',
    iconAltText: 'Spark Logo',
    iconText: 'Spark',
    iconBgColor: '#3B82F6', // Blue
    iconTextColor: '#FFFFFF',
  },
]);
</script>

<style>
/* Global styles (can be in main.css or here) */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

.app-container {
  /* max-width: 1200px; */
  margin: 0 auto;
}

.main-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  padding-left: 10px; /* Align with grid gap */
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

/* For smaller screens, you might want fewer columns */
@media (min-width: 1600px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
  }
   .main-title {
    text-align: center;
    padding-left: 0;
  }
}
</style>