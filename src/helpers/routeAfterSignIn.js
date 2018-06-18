export const routeAfterSignIn = (res, $router, workspace_name) => {
    console.log("res", res);
    let isAdmin = res.user.short_roles.indexOf("admins") !== -1;
    let isStudent = res.user.short_roles.indexOf("students") !== -1;
    let isLector = res.user.short_roles.indexOf("lectors") !== -1;
    switch (true) {
        case isAdmin:
            return $router.push(`/${workspace_name}/admin/calendar`);
            break;
        case isLector:
            return $router.push(`/${workspace_name}/lectors`);
            break;
        case isStudent:
            return $router.push(`/${workspace_name}/student`);

        default:
            return $router.push(`/sign-in`);
            break;
    }
}