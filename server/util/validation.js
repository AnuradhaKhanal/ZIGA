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

export const validateStartupType = (val) => {
  if (val === null || val === "") {
    return false;
  }

  const options = ["0", "1", "2"];
  return options.includes(val);
};

export const validateStartTime = (val) => {
  if (val === null || val === "") {
    return false;
  }

  const options = ["0", "1", "2", "3"];
  return options.includes(val);
};

export const validateWorkarea = (val) => {
  if (val === null || val === "") {
    return false;
  }

  const options = ["Product", "Engineering", "Design", "Sales and Marketing", "Operations"];
  return options.includes(val);
};
