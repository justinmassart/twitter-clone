export interface TransformedMediaFile {
  url: string;
}

export interface TransformedUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string | null;
  handle: string;
}

export interface TransformedTweet {
  id: string;
  text: string;
  mediaFiles: TransformedMediaFile[];
  author: TransformedUser;
  replies: TransformedTweet[];
  replyTo: TransformedTweet | null;
  repliesCount: number;
  postedAtHuman: string;
}

export interface TweetsResponse {
  tweets: TransformedTweet[];
}

export interface TweetResponse {
  tweet: TransformedTweet;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string | null;
}
