
export const findFolder = (folders = [], folderId) =>
    folders.find(folder => folder.id === folderId)

export const findBookmark = (bookmarks = [], bookmarkId) =>
    bookmarks.find(bookmark => bookmark.id + '' === bookmarkId)

export const getBookmarksForFolder = (bookmarks = [], folderId) => (
    (!folderId)
        ? bookmarks
        : bookmarks.filter(bookmark => bookmark.folder_id + '' === folderId)
)

export const countBookmarksForFolder = (bookmarks = [], folderId) =>
    bookmarks.filter(bookmark => bookmark.folder_id === folderId).length
