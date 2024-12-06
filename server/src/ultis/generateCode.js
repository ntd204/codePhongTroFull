const generateCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "";
  for (let i = 0; i < i.length - 1; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${code}${numbers.charAt(Math.floor(Math.random() * numbers.length))}`;
};

export default generateCode;
