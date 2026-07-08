/**
 * Builds a minimal Lexical rich-text value from a plain string, suitable for
 * `richText` fields. Splits on blank lines into paragraphs. Editors can refine
 * formatting later in the admin.
 */
export function textToLexical(text: string | null | undefined, direction: 'ltr' | 'rtl' = 'rtl') {
  const paragraphs = String(text ?? '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  // Always keep at least one (possibly empty) paragraph so the editor loads.
  const blocks = paragraphs.length ? paragraphs : ['']

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction,
      children: blocks.map((content) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction,
        textFormat: 0,
        children: content
          ? [{ type: 'text', text: content, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }]
          : [],
      })),
    },
  }
}
