export const checkName = (name) => {
  if (!name.length) return "This feild should not be empty.";
  var specialCharacter = /^[A-Z a-z]+$/;
  if (!name.match(specialCharacter)) {
    return "This feild should not contain special characters or numbers.";
  }
  return true;
};

export const checkAmount = (amount) => {
  if (!amount.length) return "This feild should not be empty.";
  if (isNaN(amount)) {
    return "This feild should not contain special characters or characters.";
  }
  return true;
};

export const checkEmail = (email) => {
  if (!email.length) return "This feild should not be empty.";
  const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!email.match(pattern)) {
    return "Please enter a valid email.";
  }
  return true;
};

export const checkPassword = (password) => {
  if (!password.length) return "This feild should not be empty.";
  if (password.length < 8) {
    return "password mush contain more than 7 characters.";
  }
  return true;
};
