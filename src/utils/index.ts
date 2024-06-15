export const getRandomItem = (arr: Array<any>) =>
  arr[Math.floor(Math.random() * arr.length)];

export const AlertCustom = (
  toast: any,
  title: string,
  status = "info",
  position = "bottom",
  duration = 5000,
  isClosable = true,
) => {
  return toast({
    title,
    status,
    position,
    duration,
    isClosable,
  });
};

export const getUID = () => {
  return localStorage.getItem("uid");
};

export const logout = () => {
  localStorage.removeItem("uid");
  window.location.replace("/auth/login");
};
