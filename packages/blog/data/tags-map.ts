import { TAGS, Tag } from "./tags";

export const TAGS_MAP: {
  [key: string]: Tag[];
} = {
  "jamstack-portfolio21": [
    TAGS.JAMSTACK,
    TAGS.NUXTJS,
    TAGS.FIREBASE,
    TAGS.CLOUD_FUNCTIONS,
    TAGS.CLOUD_STORAGE,
    TAGS.GITHUB_ACTIONS,
  ],
  "jphacks-2020": [TAGS.REACT_NATIVE, TAGS.HACKATHON],
  "light-house-2022": [TAGS.PERFORMANCE_TUNING],
  "gcb-gce": [
    TAGS.NODEJS,
    TAGS.GCP,
    TAGS.COMPUTE_ENGINE,
    TAGS.CLOUD_BUILD,
    TAGS.SECRET_MANAGER,
  ],
  "gcb-vercel": [
    TAGS.NEXTJS,
    TAGS.GCP,
    TAGS.VERCEL,
    TAGS.CLOUD_BUILD,
    TAGS.SECRET_MANAGER,
    TAGS.MONOREPO,
    TAGS.TURBO_REPO,
  ],
};
