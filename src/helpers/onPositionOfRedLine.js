export const getPosOfRedLine = () => {
  const onePoint = 100 / 60;
  const minutes = new Date().getMinutes();
  return onePoint * minutes + "%";
};
export default getPosOfRedLine;
