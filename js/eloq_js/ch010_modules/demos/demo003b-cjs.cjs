const fs = require("fs");
const path = require("path");
const nativeRequire = require;

function customRequire(name) {
  // If it's a node_module (like ordinal or date-names), use Node's native require
  if (!name.startsWith(".") && !name.startsWith("/")) {
    return nativeRequire(name);
  }

  if (!(name in customRequire.cache)) {
    let code = fs.readFileSync(name, "utf-8");
    let module = { exports: {} };
    customRequire.cache[name] = module;
    let wrapper = new Function("exports", "require", "module", "__filename", "__dirname", code);
    wrapper(module.exports, customRequire, module, name, path.dirname(name));
  }
  return customRequire.cache[name].exports;
}
customRequire.cache = Object.create(null);

const { format_date } = customRequire("./demo003-cjs.cjs");

console.log(format_date(new Date(2017, 9, 13), "dddd the Do"));
