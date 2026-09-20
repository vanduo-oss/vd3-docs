# Simplify CBUN preview chrome

## Why

The outer demo cards repeat the Charts and Flowchart headings already present
in the adjacent text columns and consume preview width with padding. The
flowchart's Graph outline also takes space away from this compact showcase.

## What changes

- Render both previews directly in their showcase columns, removing the outer
  card, repeated heading, and padding.
- Hide Graph outline only in the CBUN flowchart preview and give its row back
  to the canvas. Adjust its accessible label to describe available controls.
- Preserve the component toolbar, responsive fitting, and adjacent headings.
- Rebuild, check existing responsive coverage, visually inspect phone/tablet/
  desktop layouts, and refresh the intentionally changed CBUN visual baseline.

No dependency changes.
