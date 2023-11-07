export const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const resp = await fetch("http://localhost:3100/api/customers/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!resp.ok) {
    const errorMsg = (await resp.json())?.errors[0].message;
    throw new Error(errorMsg);
  }
  const user = await resp.json();
  console.log(user);
};

export const userSignup = async ({
  fullName,
  birthday,
  email,
  password,
}: {
  fullName: string;
  birthday: string;
  email: string;
  password: string;
}) => {
  const resp = await fetch("http://localhost:3100/api/customers", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
      birthday,
    }),
  });

  if (!resp.ok) {
    const errorMsg = (await resp.json())?.errors[0].message;
    throw new Error(errorMsg);
  }
  const user = await resp.json();
  console.log(user);
  return user;
};
