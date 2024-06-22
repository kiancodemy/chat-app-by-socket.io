import jwt from "jsonwebtoken";
export const generator = (id) => {
  const token = jwt.sign({ id: id }, process.env.SECRET, {
    expiresIn: "10h",
  });

  return token;
};
