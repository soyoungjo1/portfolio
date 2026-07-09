<template>
  <nav class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
    <div class="pointer-events-auto flex items-center py-3 px-3 gap-1 bg-surface/70 backdrop-blur-2xl rounded-full border border-outline-variant/20 shadow-lg shadow-black/5 w-[calc(100vw-40px)] max-w-md justify-around">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center justify-center px-5 py-2 rounded-full transition-all duration-200"
        :class="isActive(item.to)
          ? 'text-primary bg-secondary-container/60'
          : 'text-secondary hover:text-primary hover:bg-secondary-container/30'"
      >
        <span
          class="material-symbols-outlined text-[22px]"
          :style="isActive(item.to) ? 'font-variation-settings: \'FILL\' 1, \'wght\' 400, \'GRAD\' 0, \'opsz\' 24' : ''"
        >{{ item.icon }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/about',   icon: 'info',        label: 'About'   },
  { to: '/docs',    icon: 'description', label: 'Docs'    },
  { to: '/',        icon: 'home',        label: 'Home'    },
  { to: '/works',   icon: 'grid_view',   label: 'Works'   },
  { to: '/contact', icon: 'mail',        label: 'Contact' },
]

function isActive(path: string) {
  return route.path === path
}
</script>
