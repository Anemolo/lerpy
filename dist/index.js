function r(r, t, e, o) {
  void 0 === e && (e = 0.1), void 0 === o && (o = 0.001);
  var a = (t - r) * e;
  return Math.abs(a) < o && (a = t - r), a;
}
(exports.default = r), (exports.lerp = r);
//# sourceMappingURL=index.js.map
