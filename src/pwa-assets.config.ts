import { defineConfig } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: {
    maskable: {
      padding: 0.1,
      resizeOptions: {
        background: '#8B5CF6'
      }
    },
    apple: {
      padding: 0.1,
      resizeOptions: {
        background: '#ffffff'
      }
    }
  },
  images: ['public/icon.svg'],
  icons: {
    favicons: {
      source: 'public/icon.svg',
      sizes: [64, 48, 32, 16],
    },
    android: {
      source: 'public/icon.svg',
      sizes: [512, 384, 192, 144, 96, 72, 48],
      resizeOptions: {
        background: 'transparent'
      },
      purpose: ['any', 'maskable']
    },
    apple: {
      source: 'public/icon.svg',
      sizes: [180, 152, 144, 120, 114, 76, 72, 60, 57],
      resizeOptions: {
        background: '#ffffff'
      }
    },
    windows: {
      source: 'public/icon.svg',
      sizes: [512, 384, 192, 144, 96, 72, 48],
      resizeOptions: {
        background: '#8B5CF6'
      }
    }
  }
});