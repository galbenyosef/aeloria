// assets__index-CBRcanzC 10 — array
// Lines 2687-2721 of readable/assets__index-CBRcanzC.pretty.js (statement-aligned).
function ba(t) {
  const e = new yt(0.012, 0.035, 1, t ? 6 : 4, t ? 4 : 2, !0).translate(
      0,
      0.5,
      0,
    ),
    s = new wt(0.06, t ? 8 : 6, t ? 6 : 4).translate(0, 1.04, 0),
    i = new ae(),
    a = e.attributes.position.count,
    n = [e, s];
  for (const r of ["position", "normal"])
    i.setAttribute(
      r,
      new Pe(
        n.flatMap((o) => Array.from(o.attributes[r].array)),
        3,
      ),
    );
  return (
    i.setAttribute(
      "aBulb",
      new Pe(
        Array.from({ length: a + s.attributes.position.count }, (r, o) =>
          o < a ? 0 : 1,
        ),
        1,
      ),
    ),
    i.setIndex([
      ...Array.from(e.index.array),
      ...Array.from(s.index.array, (r) => r + a),
    ]),
    i
  );
}
