import { extractorSvelte, presetIcons, presetUno, presetWebFonts } from "unocss"

export default {
  mode: "svelte-scoped",
  extractors: [extractorSvelte],
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        // these will extend the default theme
        sans: "Roboto",
        serif: "Roboto Slab",
        receipt: "Arvo",
        mono: "Roboto Mono",
        chalkboard: "Covered By Your Grace",
        // receipt: 'Noto Sans',
      },
    }),
    presetIcons(),
    {
      name: "unocss-preset-mg",
      shortcuts: [
        [
          /^theme-(.*)$/,
          ([, c]) => `bg-${c} text-on${c}`,
          { layer: "components" },
        ],
        [
          "btn",
          `hover:brightness-95 active:contrast-50 rounded px-5 py-2 flex justify-center items-center gap-2 disabled:text-white disabled:bg-gray-300 hover:disabled:bg-gray-300 transition transform-gpu`,
          { layer: "components" },
        ],
        [
          /^btn((?:-raised)|(?:-outline))-(.*)$/,
          ([, type, c]) => {
            switch (type) {
              case "-raised":
                return `btn theme-${c} shadow hover:shadow-none active:shadow-inner`
              case "-outline":
                return `btn bg-on${c} text-${c} border border-${c}`
            }
            return `btn theme-${type}`
          },
          { layer: "components" },
        ],
        [/^btn-(.*)$/, ([, c]) => `btn theme-${c}`, { layer: "components" }],
        [
          "panel",
          `hover:brightness-95 active:contrast-50 rounded px-5 py-2 flex justify-center items-center gap-2 disabled:text-white disabled:bg-gray-300 hover:disabled:bg-gray-300 transition transform-gpu`,
          { layer: "components" },
        ],
      ],
      // layers: {
      // 	helpers: -2,
      // 	components: -1,
      // 	default: 1,
      // 	utilities: 2,
      // },
      rules: [[/^visibility-(.*)$/, ([, c]) => ({ "content-visibility": c })]],
      theme: {
        colors: {
          primary: "rgb(var(--color-primary, 251, 144, 101))", // electric orange
          secondary: "rgb(var(--color-secondary, 51, 207, 235))", // light blue
          tertiary: "rgb(var(--color-tertiary, 32, 26, 132))", // classic indigo
          background: "rgb(var(--color-background, 77, 44, 251))", // loud purple
          surface: "rgb(var(--color-surface, 255, 255, 255))", // white
          error: "rgb(var(--color-error, 253, 111, 136))", // bold coral

          onprimary: "rgb(var(--color-on-primary, 255, 255, 255))", // white
          onsecondary: "rgb(var(--color-on-secondary, 255, 255, 255))", // white
          ontertiary: "rgb(var(--color-on-tertiary, 255, 255, 255))", // white
          onbackground: "rgb(var(--color-on-background, 255, 255, 255))", // white
          onsurface: "rgb(var(--color-on-surface, 17, 17, 17))", // black
          onerror: "rgb(var(--color-on-error, 255, 255, 255))", // white
        },
      },
    },
  ],
}
