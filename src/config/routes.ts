

export const routes = {
  home: "/home",
  createNew: "/create_new",
  openExisting: "/open_existing/:projectId",
  openExistingWithProjectId: (projectId: number) => `/open_existing/${projectId}`,
}