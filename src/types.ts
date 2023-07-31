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
}
export type Song = {
    bookNumber: number;
    unitNumber: number;
    videoId: string;
    songName: string;
}
export type Book = {
    playlistId: string;
    playlistTitle: string;
    lessons: Lesson[];
    songs?: Song[];
}
export type YoutubeData = {
    bookAudioPlaylists: Book[];
    supplementVocabPlaylists: Book[];
    phonicsPlaylist: {
        videos: SimpleVideo[];
        playlistId: string;
        playlistName: string;
    }
};
export type SimpleVideo = {
    videoId: string;
    title: string;
};
export enum BookGridType {
    TextbookAudio,
    Songs,
    VocabSupplement,
    Manipulatives
}