export const useAuthorizations = (roles) => {
    const hasRole = (roleName) => roles?.some((role) => role.name == roleName);

    const hasAnyRole = (roleNames = []) => {
        return roleNames?.some((roleName) => hasRole(roleName));
    };

    return { hasRole, hasAnyRole };
};
