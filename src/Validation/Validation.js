export const checkName = (name) => {
  if (!name.length) return "*This feild is mandatory";
  var specialCharacter = /^[A-Z a-z]+$/;
  if (!name.match(specialCharacter)) {
    return "This feild should not contain special characters or numbers";
  }
  return true;
};

export const checkInvoiceName = (name) => {
  if (!name.length) return "*This feild is mandatory";
  var specialCharacter = /^[A-Z a-z 0-9]+$/;
  if (!name.match(specialCharacter)) {
    return "This feild should not contain special characters";
  }
  return true;
};

export const checkAmount = (amount) => {
  if (!amount.length) return "*This feild is mandatory";
  if (isNaN(amount)) {
    return "This feild should not contain special characters or letters";
  }
  return true;
};

export const checkEmail = (email) => {
  if (!email.length) return "*This feild is mandatory.";
  const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!email.match(pattern)) {
    return "Please enter a valid email id";
  }
  return true;
};

export const checkPassword = (password) => {
  if (!password.length) return "*This feild is mandatory.";
  if (password.length < 8) {
    return "password must contain more than 7 characters.";
  }
  return true;
};
