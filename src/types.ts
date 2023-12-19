export type Chapter = {
  time: number;
  title: string;
};
export type Lesson = {
  bookNumber: number;
  unitNumber?: number;
  lessonNumber?: number;
  videoId: string;
  chapters?: Chapter[];
  title?: string;
};
export type Song = {
  bookNumber: number;
  unitNumber: number;
  videoId: string;
  songName: string;
};
export type Book = {
  playlistId: string;
  playlistTitle: string;
  lessons: Lesson[];
  // songs?: Song[];
};
export type YoutubeData = {
  bookAudioPlaylists: Book[];
  supplementVocabPlaylists: Book[];
  phonicsPlaylist: SimplePlaylist;
  songs: CategorizedVideos<SimpleVideo & { lyrics: string }>;
  activities: CategorizedVideos<SimpleVideo & { fullTitle: string }>;
};
export type CategorizedVideos<T extends SimpleVideo> = {
  categories: {
    name: string;
    videos: T[];
  }[];
} & PlaylistMetadata;
export type SimpleVideo = {
  videoId: string;
  title: string;
};
export type SimplePlaylist = {
  videos: SimpleVideo[];
} & PlaylistMetadata;
export type PlaylistMetadata = {
  playlistId: string;
  playlistName: string;
};
export enum BookGridType {
  TextbookAudio,
  Songs,
  VocabSupplement,
  Manipulatives,
}
