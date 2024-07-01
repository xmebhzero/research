export const isUserAllowedToAccess = (allowedRoles: string[], userRoles: string[]): boolean => {
  const isAllowedToAccess = allowedRoles.some((allowedRole) => userRoles.includes(allowedRole));

  return isAllowedToAccess;
};

export const retryLoader: any = (lazyComponent: any, attemptsLeft: any) =>
  new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error: any) => {
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error);
            return;
          }

          retryLoader(lazyComponent, attemptsLeft - 1).then(resolve, reject);
        }, 1500);
      });
  });
