
export function prepareBlogItem(item) {
  const author_url = item._links && item._links.author && item._links.author[0] && item._links.author[0].href
    ? item._links.author[0].href
    : null;

  return {
    ...item,
    author_url
  }
}
