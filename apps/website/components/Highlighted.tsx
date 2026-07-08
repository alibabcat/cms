import React from 'react'

interface HighlightedProps {
  /** Full heading text. */
  heading: string
  /** Substring within `heading` to render in the accent gradient. Optional. */
  highlight?: string
  /** Tailwind classes applied to the highlighted <span>. */
  className?: string
}

/**
 * Renders `heading` with the `highlight` substring wrapped in an accent span.
 * Handles highlights that appear anywhere in the heading (start, middle, end).
 * If `highlight` is missing or not found, renders the plain heading.
 */
const Highlighted: React.FC<HighlightedProps> = ({ heading, highlight, className }) => {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }
  const [before, after] = heading.split(highlight)
  return (
    <>
      {before}
      <span className={className}>{highlight}</span>
      {after}
    </>
  )
}

export default Highlighted
