// eslint-config-next 16 ships a native flat config, so the FlatCompat shim that
// worked under v14 is no longer needed - and actively breaks, because the old
// eslintrc validator rejects the new config's schema.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "public/**", ".cache/**"],
  },
];

export default eslintConfig;
