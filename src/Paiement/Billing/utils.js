const pourcentage = 50;

export const getMin = (totalAmount, file = "commande") => {
  let minimum = totalAmount;
  if (file === "commande")
    minimum = ((parseInt(totalAmount) || 0) * (pourcentage || 100)) / 100;
  return minimum;
};
