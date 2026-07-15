import type { Project, Role } from "@/content/types";

/** Newest-first Work order from resume role order. Dates stay on roles only. */
export function sortProjectsByResumeTimeline(
  projects: Project[],
  roles: Role[],
): Project[] {
  const roleRank = new Map(roles.map((role, index) => [role.id, index]));
  const sourceIndex = new Map(projects.map((project, index) => [project.id, index]));

  return [...projects].sort((a, b) => {
    const aRank = a.roleId != null ? (roleRank.get(a.roleId) ?? Number.POSITIVE_INFINITY) : Number.POSITIVE_INFINITY;
    const bRank = b.roleId != null ? (roleRank.get(b.roleId) ?? Number.POSITIVE_INFINITY) : Number.POSITIVE_INFINITY;
    if (aRank !== bRank) return aRank - bRank;
    return (sourceIndex.get(a.id) ?? 0) - (sourceIndex.get(b.id) ?? 0);
  });
}
