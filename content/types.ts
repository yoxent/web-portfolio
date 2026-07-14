export type Tag = "Games" | "Web" | "Mobile" | "AI";

export type Link = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  shortName: string;
  title: string;
  summary: string;
  seeking?: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  githubOrg?: string;
  linkedin: string;
  cvPath: string;
};

export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: Tag[];
  links?: Link[];
};

export type Role = {
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  location: string;
  stack: string[];
  tags: Tag[];
  bullets: string[];
};

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
  tags: Tag[];
};
