<template>
  <div class="aippt-dialog">
    <div class="header">
      <span class="title">AIPPT</span>
      <span class="subtite" v-if="step === 'template'">Select a template below or <span class="local" v-tooltip="'Upload a .pptist template file'" @click="uploadLocalTemplate()">upload a local template</span> to generate slides.</span>
      <span class="subtite" v-else-if="step === 'outline'">Review the outline below (click to edit items, right-click to add or remove) before choosing a template.</span>
      <span class="subtite" v-else>Enter your presentation topic and include helpful context such as industry, role, subject, or goal.</span>
    </div>
    
    <template v-if="step === 'setup'">
      <Input class="input" 
        ref="inputRef"
        v-model:value="keyword" 
        :maxlength="50" 
        placeholder="Enter your presentation topic, e.g. Career Planning for College Students"
        @enter="createOutline()"
      >
        <template #suffix>
          <span class="count">{{ keyword.length }} / 50</span>
          <div class="submit" type="primary" @click="createOutline()"><IconSend class="icon" /> Generate</div>
        </template>
      </Input>
      <div class="recommends">
        <div class="recommend" v-for="(item, index) in recommends" :key="index" @click="setKeyword(item)">{{ item }}</div>
      </div>
      <div class="configs">
        <div class="config-item">
          <div class="label">Language:</div>
          <Select
            class="config-content"
            style="width: 80px;"
            v-model:value="language"
            :options="[
              { label: 'Chinese', value: '中文' },
              { label: 'English', value: 'English' },
              { label: 'Japanese', value: '日本語' },
            ]"
          />
        </div>
        <div class="config-item">
          <div class="label">Style:</div>
          <Select
            class="config-content"
            style="width: 80px;"
            v-model:value="style"
            :options="[
              { label: 'General', value: 'General' },
              { label: 'Academic', value: 'Academic' },
              { label: 'Professional', value: 'Professional' },
              { label: 'Education', value: 'Education' },
              { label: 'Marketing', value: 'Marketing' },
            ]"
          />
        </div>
        <div class="config-item">
          <div class="label">Model:</div>
          <Select
            class="config-content"
            style="width: 190px;"
            v-model:value="model"
            :options="[
              { label: 'GLM-4.5-Air', value: 'GLM-4.5-Air' },
              { label: 'GLM-4.5-Flash', value: 'GLM-4.5-Flash' },
              { label: 'Doubao-Seed-1.6-flash', value: 'ark-doubao-seed-1.6-flash' },
              { label: 'Doubao-Seed-1.6', value: 'ark-doubao-seed-1.6' },
            ]"
          />
        </div>
        <div class="config-item">
          <div class="label">Images:</div>
          <Select
            class="config-content"
            style="width: 140px;"
            v-model:value="img"
            :options="[
              { label: 'None', value: '' },
              { label: 'Sample Data', value: 'test' },
              { label: 'Wikipedia via MCP', value: 'ai-search' },
              { label: 'AI Generated (coming soon)', value: 'ai-create', disabled: true },
            ]"
          />
        </div>
      </div>
    </template>
    <div class="preview" v-if="step === 'outline'">
      <pre ref="outlineRef" v-if="outlineCreating">{{ outline }}</pre>
      <div class="outline-view" v-else>
        <OutlineEditor v-model:value="outline" />
      </div>
      <div class="btns" v-if="!outlineCreating">
        <Button class="btn" type="primary" @click="step = 'template'">Choose Template</Button>
        <Button class="btn" @click="outline = ''; step = 'setup'">Regenerate Outline</Button>
      </div>
    </div>
    <div class="select-template" v-if="step === 'template'">
      <div class="templates">
        <div class="template" 
          :class="{ 'selected': selectedTemplate === template.id }" 
          v-for="template in templates" 
          :key="template.id" 
          @click="selectedTemplate = template.id"
        >
          <img :src="template.cover" :alt="template.name">
        </div>
      </div>
      <div class="btns">
        <Button class="btn" type="primary" @click="createPPT()">Create Slides</Button>
        <Button class="btn" @click="step = 'outline'">Back to Outline</Button>
      </div>
    </div>

    <FullscreenSpin :loading="loading" tip="Generating slides, please wait ..." />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, useTemplateRef } from 'vue'
import { storeToRefs } from 'pinia'
import api from '@/services'
import useAIPPT from '@/hooks/useAIPPT'
import type { AIPPTSlide } from '@/types/AIPPT'
import type { Slide, SlideTheme } from '@/types/slides'
import message from '@/utils/message'
import { decrypt } from '@/utils/crypto'
import { useMainStore, useSlidesStore } from '@/store'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Select from '@/components/Select.vue'
import FullscreenSpin from '@/components/FullscreenSpin.vue'
import OutlineEditor from '@/components/OutlineEditor.vue'

const mainStore = useMainStore()
const slideStore = useSlidesStore()
const { templates } = storeToRefs(slideStore)
const { AIPPT, presetImgPool, getMdContent } = useAIPPT()

const language = ref('English')
const style = ref('General')
const img = ref('')
const keyword = ref('')
const outline = ref('')
const selectedTemplate = ref('template_1')
const loading = ref(false)
const outlineCreating = ref(false)
const step = ref<'setup' | 'outline' | 'template'>('setup')
const model = ref('GLM-4.5-Air')
const outlineRef = useTemplateRef<HTMLElement>('outlineRef')
const inputRef = useTemplateRef<InstanceType<typeof Input>>('inputRef')

const recommends = ref([
  'Emerging Technology Trends 2025',
  'How Big Data Reshapes Industries',
  'Restaurant Market Insights',
  'AIGC in Education',
  'Social Media and Brand Marketing',
  '5G Innovations for Everyday Life',
  'Annual Business Review and Plan',
  'Blockchain Applications Overview',
  'Career Planning for College Students',
  'Corporate Annual Meeting Strategy',
])

onMounted(() => {
  setTimeout(() => {
    inputRef.value!.focus()
  }, 500)
})

const setKeyword = (value: string) => {
  keyword.value = value
  inputRef.value!.focus()
}

const createOutline = async () => {
  if (!keyword.value) return message.error('Please enter a presentation topic first')

  loading.value = true
  outlineCreating.value = true
  
  const stream = await api.AIPPT_Outline({
    content: keyword.value,
    language: language.value,
    model: model.value,
  })

  loading.value = false
  step.value = 'outline'

  const reader: ReadableStreamDefaultReader = stream.body.getReader()
  const decoder = new TextDecoder('utf-8')
  
  const readStream = () => {
    reader.read().then(({ done, value }) => {
      if (done) {
        outline.value = getMdContent(outline.value)
        outline.value = outline.value.replace(/<!--[\s\S]*?-->/g, '').replace(/<think>[\s\S]*?<\/think>/g, '')
        outlineCreating.value = false
        return
      }
  
      const chunk = decoder.decode(value, { stream: true })
      outline.value += chunk

      if (outlineRef.value) {
        outlineRef.value.scrollTop = outlineRef.value.scrollHeight + 20
      }

      readStream()
    })
  }
  readStream()
}

const createPPT = async (template?: { slides: Slide[], theme: SlideTheme }) => {
  loading.value = true

  const stream = await api.AIPPT({
    content: outline.value,
    language: language.value,
    style: style.value,
    model: model.value,
  })

  if (img.value === 'test') {
    const imgs = await api.getMockData('imgs')
    presetImgPool(imgs)
  }
  else if (img.value === 'ai-search') {
    try {
      const response = await api.MCP_SearchImages({
        topic: keyword.value || outline.value,
        outline: outline.value,
        count: 12,
      })
      const data = await response.json()
      if (Array.isArray(data.images) && data.images.length) {
        presetImgPool(data.images)
      }
      else {
        message.warning('No images returned by the MCP tool')
      }
    }
    catch (error) {
      console.error(error)
      message.error('Unable to load images from the MCP tool')
    }
  }

  let templateData = template
  if (!templateData) templateData = await api.getMockData(selectedTemplate.value)
  const templateSlides: Slide[] = templateData!.slides
  const templateTheme: SlideTheme = templateData!.theme

  const reader: ReadableStreamDefaultReader = stream.body.getReader()
  const decoder = new TextDecoder('utf-8')
  
  const readStream = () => {
    reader.read().then(({ done, value }) => {
      if (done) {
        loading.value = false
        mainStore.setAIPPTDialogState(false)
        slideStore.setTheme(templateTheme)
        return
      }
  
      const chunk = decoder.decode(value, { stream: true })
      try {
        const text = chunk.replace('```json', '').replace('```', '').trim()
        if (text) {
          const slide: AIPPTSlide = JSON.parse(text)
          AIPPT(templateSlides, [slide])
        }
      }
      catch (err) {
        // eslint-disable-next-line
        console.error(err)
      }

      readStream()
    })
  }
  readStream()
}

const uploadLocalTemplate = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.pptist'
  input.click()
  input.addEventListener('change', e => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        try {
          const { slides, theme } = JSON.parse(decrypt(reader.result as string))
          createPPT({ slides, theme })
        }
        catch {
          message.error('The uploaded template file is invalid. Please try another file or use a built-in template.')
        }
      })
      reader.readAsText(file)
    }
  })
}
</script>

<style lang="scss" scoped>
.aippt-dialog {
  margin: -20px;
  padding: 30px;
}
.header {
  margin-bottom: 12px;

  .title {
    font-weight: 700;
    font-size: 20px;
    margin-right: 8px;
    background: linear-gradient(270deg, #d897fd, #33bcfc);
    background-clip: text;
    color: transparent;
    vertical-align: text-bottom;
    line-height: 1.1;
  }
  .subtite {
    color: #888;
    font-size: 12px;

    .local {
      color: $themeColor;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.preview {
  pre {
    max-height: 450px;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #f1f1f1;
    overflow: auto;
  }
  .outline-view {
    max-height: 450px;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #f1f1f1;
    overflow: auto;
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 120px;
      margin: 0 5px;
    }
  }
}
.select-template {
  .templates {
    display: flex;
    margin-bottom: 10px;
    @include flex-grid-layout();
  
    .template {
      border: 2px solid $borderColor;
      border-radius: $borderRadius;
      width: 324px;
      height: 184px;
      margin-bottom: 12px;

      &:not(:nth-child(2n)) {
        margin-right: 12px;
      }

      &.selected {
        border-color: $themeColor;
      }
  
      img {
        width: 100%;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 120px;
      margin: 0 5px;
    }
  }
}
.recommends {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  .recommend {
    font-size: 12px;
    background-color: #f1f1f1;
    border-radius: $borderRadius;
    padding: 3px 5px;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;

    &:hover {
      color: $themeColor;
    }
  }
}
.configs {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

  .config-item {
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
.count {
  font-size: 12px;
  color: #999;
  margin-right: 10px;
}
.submit {
  height: 20px;
  font-size: 12px;
  background-color: $themeColor;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 8px 0 6px;
  border-radius: $borderRadius;
  cursor: pointer;

  &:hover {
    background-color: $themeHoverColor;
  }

  .icon {
    font-size: 15px;
    margin-right: 3px;
  }
}

@media screen and (width <= 800px) {
  .configs {
    margin-top: 15px;
    display: flex;
    flex-direction: column;

    .config-item {
      margin-top: 8px;

      .label {
        flex-shrink: 0;
      }

      .config-content {
        width: 100% !important;
      }
    }
  }
  .select-template {
    .templates {
      max-height: 450px;
      display: block;
      overflow: auto;
    
      .template {
        width: 100%;
        height: unset;
        margin-bottom: 0 !important;
        margin-right: 0 !important;

        & + .template {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>