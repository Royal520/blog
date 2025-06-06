<template>
  <div
    class="ucard"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="openLink(link)"
    :class="{ 'is-hovered': isHovered }"
  >
    <div class="ucard-icon-wrapper" :style="{ backgroundColor: iconBgColor }">
      <img v-if="iconSrc" :src="iconSrc" :alt="iconAltText" class="ucard-icon-img" />
      <span v-if="iconText" class="ucard-icon-text" :style="{ color: iconTextColor }">
        {{ iconText }}
      </span>
    </div>
    <div class="ucard-content">
      <h3 class="ucard-title">{{ title }}</h3>
      <p class="ucard-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link:{
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  iconSrc: { // URL or path to the icon image
    type: String,
    default: '',
  },
  iconAltText: { // Alt text for the icon image
    type: String,
    default: 'icon',
  },
  iconText: { // Text to display below/with the icon (e.g., "Flink")
    type: String,
    default: '',
  },
  iconBgColor: { // Background color for the icon container
    type: String,
    default: '#7c3aed', // A default purple
  },
  iconTextColor: { // Text color for the iconText
    type: String,
    default: '#ffffff',
  }
});

const isHovered = ref(false);

const openLink =(link)=>{
  if (props.link) {
    const newWindow = window.open(props.link, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }
  
}
</script>

<style scoped>
.ucard {
  display: flex;
  align-items: center;
  padding: 16px;
  /* background-color: #c4c4c4; */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border: 2px solid transparent; /* Placeholder for hover border */
  width: 100%; /* Ensure it takes up available grid space */
  min-width: 300px; /* Minimum width */
  max-width: 400px; /* Maximum width, adjust as needed */
  box-sizing: border-box;
}

.ucard.is-hovered {
  transform: scale(1.05);
  border-color: #3b82f6; /* A nice blue for hover, adjust as you like */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.ucard-icon-wrapper {
  flex-shrink: 0; /* Prevent shrinking */
  width: 70px;
  height: 70px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden; /* Ensure content fits */
}

.ucard-icon-img {
  max-width: 36px; /* Adjust based on your icon sizes */
  max-height: 36px;
  object-fit: contain;
  margin-bottom: 4px; /* Space between image and text if both exist */
}
.ucard-icon-img:only-child { /* If only image, no bottom margin */
    margin-bottom: 0;
}


.ucard-icon-text {
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
}

.ucard-content {
  flex-grow: 1;
  min-width: 0; /* Important for flex text truncation */
}

.ucard-title {
  font-size: 19px;
  font-weight: 600;
  margin: 0 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ucard-description {
  font-size: 16px;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Show 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>