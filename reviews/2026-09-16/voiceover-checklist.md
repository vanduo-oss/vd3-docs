# VoiceOver checklist — flowchart (manual)

Run this against the local preview at http://localhost:8787/canvas/flowchart
with VoiceOver and Safari or Chrome. Automated keyboard and axe coverage is
not a spoken-output claim.

1. Open **Graph outline**. Confirm VoiceOver names the details summary and the
   list "Nodes and connections".
2. Move through the list. Each item should speak the node label plus
   "Connects to …" / "Connected from …" or "No outgoing connections."
3. **Selected node** and **Connection target** should be announced as labelled
   controls, not unnamed pop-up buttons.
4. **Edit selected label** and **Connect nodes** should be spoken with those
   names. With the same node as source and target, Connect should be disabled
   and should not create an edge.
5. Focus the diagram canvas. Arrows, Home, and End should change the selected
   node; the status text should match. Enter should edit the label;
   Ctrl/Cmd+Enter should save.
6. Without a pointer: add a node from the palette (or toolbar), select it,
   edit the label, connect two different nodes from the outline, delete,
   undo.
7. Inspector fields (Type, Text, Width, Height) should be associated with
   their controls.

Record spoken results here after the joint session. Do not mark A09 complete
from the accessibility tree alone.
