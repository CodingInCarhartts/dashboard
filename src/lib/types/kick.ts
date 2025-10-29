export interface KickChannel {
  slug: string;
  stream_title: string;
  stream: {
    is_live: boolean;
    viewer_count: number;
    thumbnail: string;
  };
  category: {
    name: string;
  };
}

export interface KickApiResponse {
  data: KickChannel[];
}
