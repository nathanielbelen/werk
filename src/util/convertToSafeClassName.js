export default function convertToSafeClassName(str) {
  const replacedStr = str.replace(/[\s-]/g, '_');
  const sanitizedStr = replacedStr.replace(/[^a-zA-Z0-9_]/g, '');
  const finalStr = sanitizedStr.replace(/^[^a-zA-Z]+/, '');
  return finalStr;
};