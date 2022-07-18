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
          primary: "rgb(var(--color-primary, 69, 69, 72))", // onyx
          secondary: "rgb(var(--color-secondary, 99, 26, 134))", //  gray web
          tertiary: "rgb(var(--color-tertiary,  1, 142, 237))", // Bleu De France
          background: "rgb(var(--color-background, 126, 127, 131))", // Bleu De France
          surface: "rgb(var(--color-surface, 241, 237, 238))", // cultured
          error: "rgb(var(--color-error, 154, 3, 30))", // ruby red

          onprimary: "rgb(var(--color-on-primary, 241, 237, 238))", // cultured
          onsecondary: "rgb(var(--color-on-secondary, 241, 237, 238))", // cultured
          ontertiary: "rgb(var(--color-on-tertiary, 241, 237, 238))", // cultured
          onbackground: "rgb(var(--color-on-background, 241, 237, 238))", // cultured
          onsurface: "rgb(var(--color-on-surface, 4, 4, 4))", // black
          onerror: "rgb(var(--color-on-error, 241, 237, 238))", // cultured
        },
      },
    },
  ],
}
