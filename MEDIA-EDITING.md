# Updating the media player

All artist names, titles, credits, artwork, and media links live in `media-data.js`.
The player design and behavior live separately in `player.js`.

## Add a YouTube video

Copy an existing line inside `videos`, paste it on a new line, and change:

1. YouTube video ID
2. Artist
3. Title
4. Description or performance date

For `https://www.youtube.com/watch?v=IpGp-22t0lU`, the video ID is `IpGp-22t0lU`.

## Add a Bandcamp track

Copy an existing line inside `audio`, paste it on a new line, and change:

1. Bandcamp album ID
2. Artist
3. Release title
4. Shaun's credit
5. Cover-art URL
6. Bandcamp track ID

Bandcamp's album ID appears after `album=` in the code from **Share / Embed this album**.
The track ID appears after `track=` in the code from **Share / Embed this track**.
Always include both IDs. The player intentionally uses the single-track embed so
playback stops after the selected song instead of continuing through the release.

## Reorder or remove something

- Reorder a complete line to change its position in the player.
- Delete a complete line to remove it.
- Every line except the final line in a section must end with a comma.

After saving the file, commit and push it to GitHub. Allow a minute or two for
GitHub Pages to update, then refresh the website.
