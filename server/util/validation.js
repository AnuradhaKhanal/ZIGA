export const validatePhoneNumber = (val) => {
  if (val === null || val === "") {
    return false;
  }

  let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return pattern.test(val);
};

export const validateGender = (val) => {
  const genders = ["Male", "Female", "Non-Binary"];
  return genders.includes(val);
};

export const validateEmail = (val) => {
  if (val === null || val === "") {
    return false;
  }

  let pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(val);
};
