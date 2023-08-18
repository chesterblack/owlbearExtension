/**
 * Gets the plugin's ID
 * @param {string} segment Segment to append to ID
 * @returns {string}
 */
export default function getPluginId(segment) {
  const ID = "com.tutorial.health-tracker";
  return `${ID}/${segment}`
}