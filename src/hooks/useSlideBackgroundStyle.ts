import { type Ref, computed } from 'vue'
import type { SlideBackground } from '@/types/slides'

// Convert page background data tocssstyle
export default (background: Ref<SlideBackground | undefined>) => {
  const backgroundStyle = computed(() => {
    if (!background.value) return { backgroundColor: '#fff' }

    const {
      type,
      color,
      image,
      gradient,
    } = background.value

    // solid color background
    if (type === 'solid') return { backgroundColor: color }

    // Background image mode
    // include：Background image、background size，Whether to repeat
    else if (type === 'image' && image) {
      const { src, size } = image
      if (!src) return { backgroundColor: '#fff' }
      if (size === 'repeat') {
        return {
          backgroundImage: `url(${src}`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'contain',
        }
      }
      return {
        backgroundImage: `url(${src}`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: size || 'cover',
      }
    }

    // gradient background
    else if (type === 'gradient' && gradient) {
      const { type, colors, rotate } = gradient
      const list = colors.map(item => `${item.color} ${item.pos}%`)

      if (type === 'radial') return { backgroundImage: `radial-gradient(${list.join(',')}` }
      return { backgroundImage: `linear-gradient(${rotate}deg, ${list.join(',')}` }
    }

    return { backgroundColor: '#fff' }
  })

  return {
    backgroundStyle,
  }
}