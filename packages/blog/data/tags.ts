export type Tag = {
  slug: string;
  name: string;
};
export const TAGS: {
  [key: string]: Tag;
} = {
  // 言語
  NODEJS: { slug: "nodejs", name: "Node.js" },
  NEXTJS: { slug: "nextjs", name: "Next.js" },
  NUXTJS: { slug: "nuxtjs", name: "Nuxt.js" },
  VUEJS: { slug: "vuejs", name: "Vue.js" },
  REACT_NATIVE: { slug: "react-native", name: "React Native" },
  // インフラ
  GCP: { slug: "gcp", name: "Google Cloud Platform" },
  FIREBASE: { slug: "firebase", name: "Firebase" },
  VERCEL: { slug: "vercel", name: "Vercel" },
  TURBO_REPO: { slug: "turbo-repo", name: "Turbo Repo" },
  CLOUD_FUNCTIONS: { slug: "cloud-functions", name: "Cloud Functions" },
  CLOUD_STORAGE: { slug: "cloud-storage", name: "Cloud Storage" },
  COMPUTE_ENGINE: { slug: "compute-engine", name: "Compute Engine" },
  CLOUD_BUILD: { slug: "cloud-build", name: "Cloud Build" },
  SECRET_MANAGER: { slug: "secret-manager", name: "Secret Manager" },
  // ops
  GITHUB_ACTIONS: { slug: "github-actions", name: "Github Actions" },
  // アーキテクチャ
  JAMSTACK: { slug: "jamstack", name: "Jamstack" },
  MONOREPO: { slug: "monorepo", name: "monorepo" },
  // その他
  PERFORMANCE_TUNING: {
    slug: "performance-tuning",
    name: "パフォーマンスチューニング",
  },
  HACKATHON: { slug: "hackathon", name: "ハッカソン" },
};
