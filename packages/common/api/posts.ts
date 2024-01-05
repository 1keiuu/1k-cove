import { client } from "../utils/micro-cms";

export class PostClient {
  get(params?: any) {
    return client.get({
      ...params,
      endpoint: "posts",
    });
  }

  getList(params?: any) {
    return client.getList({
      ...params,
      endpoint: "posts",
      queries: {
        orders: "-date",
        ...params?.queries,
      },
    });
  }
}
