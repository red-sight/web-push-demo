import '@/assets/styles/fonts.css'
import '@/assets/styles/tailwind-base.css'
import '@/assets/styles/variables.css'
import '@/assets/styles/index.scss'
import 'reflect-metadata'
import RadioButton, { type RadioButtonContext, type RadioButtonProps } from 'primevue/radiobutton'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import global from '@/assets/presets/global'
import Ripple from 'primevue/ripple'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import { type ToastMessageOptions, type ToastProps } from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import InputText, { type InputTextContext, type InputTextProps } from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Textarea, { type TextareaContext, type TextareaProps } from 'primevue/textarea'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  global,
  ripple: true,
  pt: {
    global,

    directives: {
      ripple: {
        root: {
          class: ['block absolute rounded-full pointer-events-none bg-surface-200'],
          style: 'transform: scale(0)',
        },
      },
    },

    toolbar: {
      root: 'flex w-full h-full justify-start pb-10 xs:pt-10 sm:pt-32',
      start: 'h-full flex items-center',
      center: 'h-full flex items-center font-bold text-4xl',
      end: 'h-full flex items-center',
    },

    button: {
      root: {
        class: [
          'py-2 px-5 font-semibold text-lg ripple-box border-4 rounded-md border-color',
          'hover:border-primary-500 hover:text-primary-500 active:text-primary-500 active:border-primary-500 dark:active:border-primary-400',
        ],
      },
    },

    floatlabel: {
      root: {
        class: [
          'flex relative',
          '[&>*:last-child]:text-surface-900/60 dark:[&>*:last-child]:text-white/60',
          '[&>*:last-child]:absolute',
          '[&>*:last-child]:top-1/2',
          '[&>*:last-child]:-translate-y-1/2',
          '[&>*:last-child]:left-3',
          '[&>*:last-child]:pointer-events-none',
          '[&>*:last-child]:transition-all',
          '[&>*:last-child]:duration-200',
          '[&>*:last-child]:ease',
          '[&>*:last-child]:has-[:focus]:-top-3',
          '[&>*:last-child]:has-[:focus]:text-sm',
          '[&>*:last-child]:has-[.filled]:-top-3',
          '[&>*:last-child]:has-[.filled]:text-sm',
        ],
      },
    },

    inputtext: {
      root: ({
        props,
        context,
        parent,
      }: {
        props: InputTextProps
        context: InputTextContext
        parent: any
      }) => {
        let _a
        return {
          class: [
            // Font
            'leading-none',
            // Flex
            { 'flex-1 w-[1%]': parent.instance.$name == 'InputGroup' },
            // Spacing
            'm-0',
            { 'w-full': props.fluid },
            // Size
            {
              'py-3 px-3.5': props.size == 'large',
              'py-1.5 px-2': props.size == 'small',
              'py-2 px-3': props.size == null,
            },
            // Shape
            { 'rounded-md': parent.instance.$name !== 'InputGroup' },
            {
              'first:rounded-l-md rounded-none last:rounded-r-md':
                parent.instance.$name == 'InputGroup',
            },
            { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
            {
              'first:ml-0 -ml-px':
                parent.instance.$name == 'InputGroup' && !('showButtons' in props),
            },
            // Colors
            'text-surface-800 dark:text-white/80',
            'placeholder:text-surface-400 dark:placeholder:text-surface-500',
            { 'bg-surface-0 dark:bg-surface-900': !context.disabled },
            'border-4',
            { 'border-surface-300 dark:border-surface-700': !props.invalid },
            // Invalid State
            'invalid:focus:ring-red-200',
            'invalid:hover:border-red-500',
            { 'border-red-500 dark:border-red-400': props.invalid },
            // States
            {
              'hover:border-surface-400 dark:hover:border-surface-600':
                !context.disabled && !props.invalid,
              'focus:outline-none focus:outline-offset-0 focus:border-primary-500 dark:focus:border-primary-400 focus:z-10':
                !context.disabled,
              'bg-surface-200 dark:bg-surface-700 select-none pointer-events-none cursor-default':
                context.disabled,
            },
            // Filled State *for FloatLabel
            {
              filled:
                ((_a = parent.instance) == null ? void 0 : _a.$name) == 'FloatLabel' &&
                context.filled,
            },
            // Misc
            'appearance-none',
            'transition-colors duration-200',
          ],
        }
      },
    },

    textarea: {
      root: ({
        context,
        props,
        parent,
      }: {
        context: TextareaContext
        props: TextareaProps
        parent: any
      }) => {
        let _a, _b
        return {
          class: [
            // Font
            'leading-[normal]',
            // Spacing
            'm-0',
            'p-3',
            // Shape
            'rounded-md',
            // Colors
            'text-surface-800 dark:text-white/80',
            'placeholder:text-surface-400 dark:placeholder:text-surface-500',
            'bg-surface-0 dark:bg-surface-900',
            'border-4',
            { 'border-surface-300 dark:border-surface-700': !props.invalid },
            // Invalid State
            { 'border-red-500 dark:border-red-400': props.invalid },
            // States
            {
              'hover:border-surface-400 dark:hover:border-surface-600':
                !context.disabled && !props.invalid,
              'focus:outline-none focus:outline-offset-0 focus:border-primary-500 dark:focus:border-primary-400 focus:z-10':
                !context.disabled,
              'opacity-60 select-none pointer-events-none cursor-default': context.disabled,
            },
            // Filled State *for FloatLabel
            {
              filled:
                ((_a = parent.instance) == null ? void 0 : _a.$name) == 'FloatLabel' &&
                props.modelValue !== null &&
                ((_b = props.modelValue) == null ? void 0 : _b.length) !== 0,
            },
            // Misc
            'appearance-none',
            'transition-colors duration-200',
          ],
        }
      },
    },

    Toast: {
      root: ({ props }: { props: ToastProps }) => ({
        class: [
          //Size and Shape
          'w-96 rounded-xl',
          // Positioning
          {
            '-translate-x-2/4': props.position == 'top-center' || props.position == 'bottom-center',
          },
        ],
      }),
      message: ({ props }: { props: ToastProps }) => ({
        class: [
          'mb-4 rounded-xl w-full',
          'border border-transparent',
          'backdrop-blur-[10px] shadow-md',
          // Colors
          {
            'bg-blue-50/90 dark:bg-blue-500/20': props.message?.severity == 'info',
            'bg-green-50/90 dark:bg-green-500/20': props.message?.severity == 'success',
            'bg-surface-50 dark:bg-surface-800': props.message?.severity == 'secondary',
            'bg-orange-50/90 dark:bg-orange-500/20': props.message?.severity == 'warn',
            'bg-red-800/70 dark:bg-red-500/20': props.message?.severity == 'error',
            'bg-surface-950 dark:bg-surface-0': props.message?.severity == 'contrast',
          },
          {
            'border-blue-200 dark:border-blue-500/20': props.message?.severity == 'info',
            'border-green-200 dark:border-green-500/20': props.message?.severity == 'success',
            'border-surface-300 dark:border-surface-500/20': props.message?.severity == 'secondary',
            'border-orange-200 dark:border-orange-500/20': props.message?.severity == 'warn',
            'border-red-200 dark:border-red-500/20': props.message?.severity == 'error',
            'border-surface-950 dark:border-surface-0': props.message?.severity == 'contrast',
          },
          {
            'text-blue-700 dark:text-blue-300': props.message?.severity == 'info',
            'text-green-700 dark:text-green-300': props.message?.severity == 'success',
            'text-surface-700 dark:text-surface-300': props.message?.severity == 'secondary',
            'text-orange-700 dark:text-orange-300': props.message?.severity == 'warn',
            'text-red-50 dark:text-red-300': props.message?.severity == 'error',
            'text-surface-0 dark:text-surface-950': props.message?.severity == 'contrast',
          },
        ],
      }),
      messageContent: ({ props }: { props: ToastProps }) => ({
        class: [
          'flex p-3',
          {
            'items-start': props.message?.summary,
            'items-center': !props.message?.summary,
          },
        ],
      }),
      messageIcon: ({ props }: { props: ToastProps }) => ({
        class: [
          // Sizing and Spacing
          props.message?.severity === 'contrast' || props.message?.severity === 'secondary'
            ? 'w-0'
            : 'w-[1.125rem] h-[1.125rem] mr-2',
          'text-lg leading-[normal]',
        ],
      }),
      messageText: {
        class: ['text-base leading-[normal]', 'ml-2', 'flex-1'],
      },
      summary: {
        class: 'font-medium block',
      },
      detail: ({ props }: { props: ToastProps }) => ({
        class: [
          'block',
          'text-xs',
          props.message?.severity === 'contrast'
            ? 'text-surface-0 dark:text-surface-950'
            : 'text-surface-200 dark:text-surface-0',
          { 'mt-2': props.message?.summary },
        ],
      }),
      closeButton: ({ props }: { props: ToastMessageOptions }) => ({
        class: [
          // Flexbox
          'flex items-center justify-center',
          // Size
          'w-7 h-7',
          // Spacing and Misc
          'ml-auto  relative',
          // Shape
          'rounded-full',
          // Colors
          'bg-transparent',
          // Transitions
          'transition duration-200 ease-in-out',
          // States
          'hover:bg-surface-0/30 dark:hover:bg-[rgba(255,255,255,0.03)]',
          'focus:outline-none focus:outline-offset-0 focus:ring-1',
          {
            'focus:ring-blue-500 dark:focus:ring-blue-400': props.severity == 'info',
            'focus:ring-green-500 dark:focus:ring-green-400': props.severity == 'success',
            'focus:ring-surface-500 dark:focus:ring-surface-400': props.severity == 'secondary',
            'focus:ring-orange-500 dark:focus:ring-orange-400': props.severity == 'warn',
            'focus:ring-red-500 dark:focus:ring-red-4000': props.severity == 'error',
            'focus:ring-surface-0 dark:focus:ring-surface-950': props.severity == 'contrast',
          },
          // Misc
          'overflow-hidden',
        ],
      }),
      transition: {
        enterFromClass: 'opacity-0 translate-y-2/4',
        enterActiveClass: 'transition-[transform,opacity] duration-300',
        leaveFromClass: 'max-h-[1000px]',
        leaveActiveClass:
          '!transition-[max-height_.45s_cubic-bezier(0,1,0,1),opacity_.3s,margin-bottom_.3s] overflow-hidden',
        leaveToClass: 'max-h-0 opacity-0 mb-0',
      },
    },

    accordionheader: {
      root: {
        class: 'flex w-full justify-between items-center p-2',
      },
    },

    accordioncontent: {
      root: {
        class: 'pt-5',
      },
    },

    radiobutton: {
      root: {
        class: [
          'relative',
          'inline-flex',
          'align-bottom',
          'w-5 h-5',
          'cursor-pointer',
          'select-none',
        ],
      },
      box: ({ props, context }: { props: RadioButtonProps; context: RadioButtonContext }) => ({
        class: [
          // Flexbox
          'flex justify-center items-center',
          // Size
          'w-5 h-5',
          // Shape
          'border outline-transparent',
          'rounded-full',
          // Transition
          'transition duration-200 ease-in-out',
          // Colors
          {
            'text-surface-700 dark:text-white/80': context.checked,
            'border-surface-300 dark:border-surface-700': !context.checked && !props.invalid,
            'border-primary bg-primary': context.checked && !props.disabled,
          },
          // Invalid State
          { 'border-red-500 dark:border-red-400': props.invalid },
          // States
          {
            'peer-hover:border-surface-400 dark:peer-hover:border-surface-400':
              !props.disabled && !props.invalid && !context.checked,
            'peer-hover:border-primary-emphasis': !props.disabled && !context.checked,
            'peer-hover:[&>*:first-child]:bg-primary-600 dark:peer-hover:[&>*:first-child]:bg-primary-300':
              !props.disabled && !context.checked,
            'peer-focus-visible:ring-1 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400':
              !props.disabled,
            'bg-surface-200 [&>*:first-child]:bg-surface-600 dark:bg-surface-700 dark:[&>*:first-child]:bg-surface-400 border-surface-300 dark:border-surface-700 select-none pointer-events-none cursor-default':
              props.disabled,
          },
        ],
      }),
      input: {
        class: [
          'peer',
          'w-full ',
          'h-full',
          'absolute',
          'top-0 left-0',
          'z-10',
          'p-0',
          'm-0',
          'opacity-0',
          'rounded-md',
          'outline-none',
          'border-1 border-surface-200 dark:border-surface-700',
          'appearance-none',
          'cursor-pointer',
        ],
      },
      icon: ({ context }: { context: RadioButtonContext }) => ({
        class: [
          'block',
          // Shape
          'rounded-full',
          // Size
          'w-3 h-3',
          // Conditions
          {
            'bg-surface-0 dark:bg-surface-900': context.checked,
            'bg-primary': !context.checked,
            'backface-hidden invisible scale-[0.1]': !context.checked,
            'transform visible translate-z-0 scale-[1,1]': context.checked,
          },
          // Transition
          'transition duration-200',
        ],
      }),
    },
  },
})

app.directive('ripple', Ripple)

app.use(ToastService)

app.component('AppButton', Button)
app.component('AppToolbar', Toolbar)
app.component('InputText', InputText)
app.component('FloatLabel', FloatLabel)
app.component('TextArea', Textarea)
app.component('AppAccordion', Accordion)
app.component('AppAccordionPanel', AccordionPanel)
app.component('AppAccordionHeader', AccordionHeader)
app.component('AppAccordionContent', AccordionContent)
app.component('RadioButton', RadioButton)

app.mount('#app')
