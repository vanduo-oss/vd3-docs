# Responsive CBUN flowchart preview

## Why

At viewport widths from 769 through 1180px the CBUN flowchart canvas collapses
to 33–38px. The preview hides the inspector but retains the full editor's
tablet grid rows. Existing phone and desktop coverage missed those widths.
The diagram also needs to refit when the showcase column changes size.

## What changes

- Make the preview body a single row at every width, with a vertical palette
  wherever the palette is visible.
- Refit the diagram when its actual canvas size changes, including changes
  caused by the containing column or wrapped toolbar; disconnect on unmount.
- Add breakpoint and resize regression coverage to the Chromium smoke suite.
- Preserve before/after measurements and screenshots in the local review record.

This is scoped to the docs showcase. No dependencies or published packages change.
