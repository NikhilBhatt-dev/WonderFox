export const getCurrentPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};

export const buildLoginRedirectUrl = (
  currentPath = getCurrentPath(),
  loginPath = "/login",
) => {
  const safeCurrentPath = currentPath && currentPath.startsWith("/")
    ? currentPath
    : "/";

  const safeLoginPath = loginPath.startsWith("/") ? loginPath : "/login";

  if (
    safeCurrentPath === safeLoginPath ||
    safeCurrentPath.startsWith(`${safeLoginPath}?`)
  ) {
    return safeLoginPath;
  }

  return `${safeLoginPath}?redirect=${encodeURIComponent(safeCurrentPath)}`;
};

export const redirectToLogin = ({
  currentPath = getCurrentPath(),
  loginPath = "/login",
  navigate,
} = {}) => {
  const loginUrl = buildLoginRedirectUrl(currentPath, loginPath);

  if (typeof navigate === "function") {
    navigate(loginUrl);
    return false;
  }

  if (typeof window !== "undefined") {
    window.location.href = loginUrl;
  }

  return false;
};

export const isLoggedIn = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(localStorage.getItem("token"));
};
